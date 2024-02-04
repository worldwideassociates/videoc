'use client'

import { create } from '@/actions/departments';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UserMultiSelect as MultiSelect } from '@/components/user-multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import { useDepartmentFormModal } from '@/hooks/use-department-form-modal';
import { UserSelect } from '../user-select';


interface Props {
  usersOptions: User[];
}

const formSchema = z.object({
  name: z.string().min(3, "Name is required (minuimum of 3 characters)."),
  description: z.string().max(255, "Description is too long").optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  manager: z.object({
    label: z.string(),
    value: z.string(),
    image: z.string(),
  }),
  members: z.array(z.object({
    label: z.string(),
    value: z.string(),
    image: z.string(),
  })),
})

const DepartmentForm: React.FC<Props> = ({ usersOptions }) => {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const onClose = useDepartmentFormModal((state) => state.onClose);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      members: [],
      manager: undefined,
    },
  });

  const onSubmit = form.handleSubmit(async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const payload = {
      ...values,
      members: values.members.map((member: any) => ({ id: member.value })),
      managerId: values.manager.value
    } as any

    // Hack
    delete payload.manager

    const result = await create(payload);

    if (result.success) {
      form.reset();
      toast({
        title: "Success",
        description: result.message,
      })

      onClose();
      location.reload();
    } else {
      toast({
        title: "Oops",
        description: result.message,
      })
    }
    setLoading(false);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="">
        <fieldset disabled={loading} className='flex flex-col space-y-4'>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Department name"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="font-light text-xs text-muted-foreground">Department names must be unique</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department email</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Department email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department phone</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Department phone"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="manager"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manager</FormLabel>
                <UserSelect
                  selected={field.value || []}
                  onSelect={field.onChange}
                  users={usersOptions}
                />
                <FormDescription className="font-light text-xs text-muted-foreground">
                  Select a manager to manage this department
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="members"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Members</FormLabel>
                <MultiSelect
                  selected={field.value || []}
                  onSelect={field.onChange}
                  users={usersOptions}
                  placeholder="select members"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <div className="mt-4">
          <Button disabled={loading}>
            {/* TODO: only show button to admin users */}
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}



export default DepartmentForm;