"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { SubmitButton } from "./submit-button";

const formSchema = z.object({
  email: z.string().min(1, "Email is required."),
});

interface Props {
  t: any;
}

export const SignInForm = ({ t }: Props) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await signIn("email", {
        email: values.email,
        callbackUrl: process.env.NEXT_PUBLIC_BASE_URL,
        redirect: false,
      });
      toast({
        title: t.toast.success.title,
        description: t.toast.success.description,
      });
    } catch (error: any) {
      toast({
        title: "Oops",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <div className="flex flex-col space-y-1 mb-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">{t.label.email}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        disabled={loading}
                        placeholder={t.placeholder.email}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SubmitButton loading={loading} label={t.button} />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
