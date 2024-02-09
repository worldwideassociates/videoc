"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { UserIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"

import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAccountDetailsModal } from "@/hooks/use-account-details-modal";


import { DateField, DatePicker } from "@/components/ui/datepicker";
import { updateUser } from "@/actions/users";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";
import { createCalendarDate } from "@/lib/utils";

const currentYear = new Date().getFullYear();

const formSchema = z.object({
  name: z.string().min(3, "Full name is required (minuimum of 3 characters)."),
  phone: z.string().min(10, "Invalid phone number."),
  dateOfBirth: z.object({
    year: z.number().min(1900, "Invalid year").max(currentYear, "Invalid year"),
    month: z.number().min(1, "Invalid month").max(12, "Invalid month"),
    day: z.number().min(1, "Invalid day").max(31, "Invalid day"),
  }, { required_error: 'Invalid date of birth' })
});

export const AccountDetailsModal = () => {
  const userDetailsModal = useAccountDetailsModal();
  const { data: session } = useSession()
  const { toast } = useToast()

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      dateOfBirth: createCalendarDate(new Date()),
    },
  });

  const onSubmit = form.handleSubmit((values: z.infer<typeof formSchema>) => {

    startTransition(async () => {
      const email = session?.user?.email!

      const payload = {
        ...values,
        dateOfBirth: new Date(values.dateOfBirth.year, values.dateOfBirth.month - 1, values.dateOfBirth.day)
      }

      const result = await updateUser(email, payload as User);

      if (result.success) return window.location.reload();

      toast({
        title: "Oops",
        description: result.message,
      });
    });
  });

  return (
    <Modal
      title="Onboarding"
      description="Fill in all the required information to proceed"
      Icon={UserIcon}
      isOpen={userDetailsModal.isOpen}
      onClose={userDetailsModal.onClose}
    >
      <div className="">
        <div className="py-2 pb-2">
          <Form {...form}>
            <form onSubmit={onSubmit} className="flex flex-col space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name:</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="your full name"
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
                        disabled={isPending}
                        placeholder="Your phone number"
                        {...field}
                      />
                    </FormControl>
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
                      // date={field.value as any}
                      onChange={field.onChange}
                      label="Pick a date">
                      <DateField {...field}
                        value={field.value as any}
                        onChange={field.onChange} />
                    </DatePicker>
                    <FormDescription>
                      Your date of birth is used to calculate your age.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">

                <Button disabled={isPending} type="submit" className="min-w-[100px]">
                  {isPending ? "..." : "Finish"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};