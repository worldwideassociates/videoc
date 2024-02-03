"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { format } from "date-fns";
import { CalendarIcon, UserIcon } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { DatePicker } from "@/components/ui/datepicker";
import { updateUser } from "@/actions/users";

const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear, 0);
const toMonth = new Date(currentYear + 10, 11);

const formSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(10),
  dateOfBirth: z.date({
    required_error: "A date of birth is required.",
  }),
});

export const AccountDetailsModal = () => {
  const userDetailsModal = useAccountDetailsModal();
  const [step, setStep] = useState(0);

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      dateOfBirth: undefined,
    },
  });

  const onSubmit = form.handleSubmit((values: z.infer<typeof formSchema>) => {
    const { toast } = useToast()

    startTransition(async () => {
      try {
        await updateUser(values);

        window.location.reload();
      } catch (error: any) {
        toast({
          title: "Oops",
          description: error.message,
        });
      }
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
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Your date of birth is used to calculate your age.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">

                <Button disabled={isPending} type="submit">
                  Finish
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};