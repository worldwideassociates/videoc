'use client'

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Role, User } from '@prisma/client';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DateField, DatePicker } from '@/components/ui/datepicker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { upsert } from '@/actions/users';
import { DateValue } from 'react-aria';
import { CalendarDate, toCalendarDate } from '@internationalized/date';
import { createCalendarDate } from '@/lib/utils';


interface Props {
  employee?: User | null
  departmentsOptions: { label: string, value: string }[]
  readonly?: boolean
}


const currentYear = new Date().getFullYear();

const formSchema = z.object({
  name: z.string().min(3, "Name is required (minuimum of 3 characters)."),
  email: z.string().min(1, 'Email is required').email(),
  phone: z.string().optional(),
  departmentId: z.string().optional(),
  position: z.string().optional(),
  image: z.string().optional(),
  dateOfBirth: z.object({
    year: z.number().min(1900, "Invalid year").max(currentYear, "Invalid year"),
    month: z.number().min(1, "Invalid month").max(12, "Invalid month"),
    day: z.number().min(1, "Invalid day").max(31, "Invalid day"),
  }, { required_error: 'Invalid date of birth' }).optional()
})

const EmployeeForm: React.FC<Props> = ({ employee, departmentsOptions, readonly = false }) => {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // TODO: fix types error
    defaultValues: employee ? {
      ...employee as any,
      dateOfBirth: employee.dateOfBirth ? createCalendarDate(employee.dateOfBirth) : undefined,
    } : {
      name: '',
      email: '',
      phone: '',
      departmentId: '',
      position: '',
      dateOfBirth: undefined,
      image: '',
    }
  });

  const onSubmit = form.handleSubmit(async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const payload = {
      ...employee,
      ...values,
      dateOfBirth: values.dateOfBirth ? new Date(values.dateOfBirth.year, values.dateOfBirth.month - 1, values.dateOfBirth.day) : null,
      role: Role.EMPLOYEE
    } as any

    const result = await upsert(payload);

    if (result.success) {
      form.reset();
      toast({
        title: "Success",
        description: result.message,
      })

      router.push('/company/employees')

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
        <fieldset disabled={loading || readonly} className='flex flex-col space-y-4'>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="employee full name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="employee email"
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
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="employee phone"
                    type="tel"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="job title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="departmentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a your department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      departmentsOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                {/* TODO: Fix this type issue */}
                <DatePicker
                  value={field.value as any}
                  onChange={field.onChange}
                  label="Pick a date">
                  <DateField value={field.value as any} />
                </DatePicker>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        {
          !readonly && (
            <div className="mt-4">
              <Button disabled={loading}>
                {/* TODO: only show button to admin users */}
                Save
              </Button>
            </div>
          )
        }
      </form>
    </Form>
  )
}



export default EmployeeForm;