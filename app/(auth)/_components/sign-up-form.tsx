'use client'

import * as z from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'


import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useToast } from "@/components/ui/use-toast"
import { signIn } from 'next-auth/react'
import { SubmitButton } from './submit-button'


const formSchema = z.object({
  email: z.string().min(1),
})



export const SignUpForm = () => {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      await signIn(
        'email',
        {
          email: values.email,
          callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
          redirect: false
        })
      toast({
        title: "Verify your email",
        description: "a sign in link was sent to your mail box"
      })
    } catch (error: any) {
      toast({
        title: "Oops",
        description: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-1">

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <Input type='email' placeholder='name@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <SubmitButton loading={loading} label='Sign up' />
        </div>
      </form>
    </Form>
  )
}

export default SignUpForm