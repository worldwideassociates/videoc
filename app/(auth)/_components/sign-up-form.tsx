'use client'

import * as z from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'


import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useToast } from "@/components/ui/use-toast"


const formSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(5).max(16),
  confirmPassword: z.string()
})



export const SignUpForm = () => {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [isPasswordScreen, setIsPasswordScreen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    }
  })
  const password = form.watch('password')
  const confirmPassword = form.watch('confirmPassword')

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    try {
      setLoading(true)

      const response: any = '' // use the fetch api

      // window.location.assign(`/${response.data.id}`)
    } catch (error: any) {
      toast({
        title: "Oops",
        description: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  const submitButtonWrapper = (e: any) => {
    e.preventDefault()
    form.clearErrors()
    if (confirmPassword !== password) {
      form.setError('confirmPassword', { type: 'manual', message: 'Password did not match' })
    } else {
      form.handleSubmit(onSubmit)(e)
    }
  }

  const resetForm = () => {
    form.reset({ password: '', email: '', confirmPassword: '' })
    setIsPasswordScreen(false)
  }

  return (
    <Form {...form} >
      <form onSubmit={submitButtonWrapper}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            {
              isPasswordScreen ? (
                <div className="flex flex-col space-y-1">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Password</FormLabel>
                        <FormControl>
                          <Input type='password' disabled={loading} placeholder='secure password.' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">ConfirmPassword</FormLabel>
                        <FormControl>
                          <Input type="password" disabled={loading} placeholder='confirm password.' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Email</FormLabel>
                      <FormControl>
                        <Input placeholder='name@example.com' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
            }
          </div>
          {
            isPasswordScreen ? (
              <Button>Submit</Button>
            ) : (
              <Button type='button' onClick={() => setIsPasswordScreen(true)}>Continue</Button>
            )
          }
          <div className="flex justify-center items-center">
            <p className="text-sm text-muted-foreground">This is not my email</p>
            <Button type='button' onClick={resetForm} variant="link" className="px-2">Change</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default SignUpForm