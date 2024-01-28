'use client'

import * as z from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'


import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useToast } from "@/components/ui/use-toast"
import { signIn } from 'next-auth/react'


const formSchema = z.object({
  email: z.string().min(1, 'Email is required.'),
})



export const SignInForm = () => {
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
        title: "You're almost in",
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
            <div className="flex flex-col space-y-1 mb-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Email</FormLabel>
                    <FormControl>
                      <Input type='email' disabled={loading} placeholder='name@example.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={loading}>{loading ? "..." : "Sign in with Email"}</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default SignInForm