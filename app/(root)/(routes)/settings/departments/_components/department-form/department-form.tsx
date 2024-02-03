

import { create } from '@/actions/departments';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';


interface Props {
  usersOptions: User[];
}


const formSchema = z.object({
  name: z.string().min(3, "Name is required (minuimum of 3 characters)."),
  description: z.string().max(255, "Description is too long").optional(),
  moderatorId: z.string(),
  members: z.array(z.object({
    label: z.string(),
    value: z.string(),
  })),

})


const DepartmentForm: React.FC<Props> = ({ usersOptions }) => {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      moderatorId: '',
      members: [],
    },
  });



  const onSubmit = form.handleSubmit((values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const payload = {
        ...values,
        members: values.members.map((member: any) => ({ id: member.value }))
      } as any

      const result = await create(payload);

      toast({
        title: "Oops",
        description: result.message,
      });
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="">
        <fieldset disabled={isPending} className='flex flex-col space-y-4'>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
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
            name="moderatorId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Moderator</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="text-gray-500"  >
                      <SelectValue placeholder="Choose a moderator" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {usersOptions.map((user: User) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription className="font-light text-xs text-muted-foreground">
                  Select a moderator to manage this department
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
                <FormLabel>Moderator</FormLabel>
                <MultiSelect
                  selected={field.value || []}
                  onSelect={field.onChange}
                  options={usersOptions?.map((user: User) => ({
                    label: user.name as string,
                    value: user.id,
                  }))}
                  placeholder="Choose members"
                />
                <FormDescription className="font-light text-xs text-muted-foreground">
                  Select a moderator to manage this department
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <div className="mt-4">
          <Button disabled={isPending}>
            {/* TODO: only show button to admin users */}
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}



export default DepartmentForm;