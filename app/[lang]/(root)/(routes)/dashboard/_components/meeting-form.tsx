"use client";

import { upsert } from "@/actions/meetings";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
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
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Meeting, User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { Calendar as CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import * as z from "zod";
import { use, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { LocaleContext } from "@/providers/locale-provider";
import { TimePicker } from "./time-picker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchUserOptions } from "@/actions/users";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from "@/components/ui/command";
import { CommandItem } from "cmdk";
import { CustomAvatar } from "@/components/custom-avatar";
import { useModal } from "@/hooks/use-modal";

interface Props {
  meeting?: Meeting | null;
  host?: User | null;
}

const getFormSchema = (t: Record<string, any>) => {
  t = t.form.fields;
  const formSchema = z
    .object({
      title: z
        .string({
          required_error: t.title.errors.required,
        })
        .min(3, t.title.errors.min),
      description: z.string().max(255, t.description.errors.max).optional(),
      startDateTime: z.date({
        required_error: t.startDateTime.errors.required,
      }),
      participants: z
        .array(
          z.object({
            label: z.string(),
            value: z.string(),
            role: z.string(),
            image: z.string().optional(),
          })
        )
        .min(1, t.participants.errors.min),
    })
    .refine(
      (data) => {
        const currentDate = new Date();
        const timeDifference =
          data.startDateTime.getTime() - currentDate.getTime();

        return timeDifference > 300_000;
      },
      {
        message: t.startDateTime.errors.futureDate,
        path: ["startDateTime"],
      }
    );
  return formSchema;
};

const MeetingForm: React.FC<Props> = ({ meeting }) => {
  const [userOptions, setUserOptions] = useState<any | User[]>([]);
  const closeModal = useModal((state) => state.onClose);
  const { dictionary: t } = use(LocaleContext);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const formSchema = getFormSchema(t);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      startDateTime: undefined,
      participants: [],
    },
  });

  const onSubmit = form.handleSubmit(
    async (values: z.infer<typeof formSchema>) => {
      setLoading(true);
      const updatedParticipants = values.participants.map((employee) => ({
        id: employee.value,
      }));

      const payload = {
        ...values,
        participants: updatedParticipants,
      } as any;

      const result = await upsert(payload, meeting?.id);
      if (result?.success) {
        form.reset();
        toast({
          title: "✅",
          description: t.form.toast.success,
        });
        form.reset();
        closeModal();
      } else {
        toast({
          title: "⚠️",
          description: t.form.toast.error,
        });
      }

      setLoading(false);
    }
  );

  const setupUserOptions = async () => {
    const users = await fetchUserOptions();
    setUserOptions(users);
  };

  useEffect(() => {
    setupUserOptions();
  }, []);

  return (
    <>
      <Form {...form}>
        <form onSubmit={onSubmit} className="">
          <fieldset disabled={loading} className="flex flex-col space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.form.fields.title.label}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={t.form.fields.title.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="font-light text-xs text-muted-foreground">
                    {t.form.fields.title.helpText}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.form.fields.description.label}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t.form.fields.description.placeholder}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex space-x-2">
              <FormField
                control={form.control}
                name="startDateTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-left">Date and Time</FormLabel>
                    <Popover>
                      <FormControl>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-[620px] justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP HH:mm:ss")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                      </FormControl>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date.setHours(0, 0, 0, 0) <
                            new Date().setHours(0, 0, 0, 0)
                          }
                          initialFocus
                        />
                        <div className="p-3 border-t border-border">
                          <TimePicker
                            setDate={field.onChange}
                            date={field.value}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="participants"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t.form.fields.participants.label}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[620px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value.length +
                            " " +
                            t.form.fields.participants.label}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-[400px] p-0 mb-5 max-h-[600px]"
                      side="right"
                      align="start"
                    >
                      <Command>
                        <CommandInput
                          placeholder={t.form.fields.participants.placeholder}
                        />
                        <CommandEmpty>
                          {t.form.fields.participants.errors.notFound}
                        </CommandEmpty>
                        <CommandGroup>
                          {userOptions.map((user: User) => {
                            const option = {
                              label: user.name,
                              value: user.id,
                              image: user.image || undefined,
                              role: user.role,
                            };

                            const isSelected = field.value.find(
                              (s) => s.value === option.value
                            );

                            return (
                              <CommandItem
                                key={option.value}
                                className={"cursor-pointer"}
                                onSelect={() => {
                                  if (isSelected) {
                                    const newOptions = field.value.filter(
                                      (s) => s.value !== option.value
                                    );
                                    field.onChange(newOptions);
                                  } else {
                                    field.onChange([...field.value, option]);
                                  }
                                }}
                              >
                                <div className="flex space-x-2 py-1 items-center">
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      isSelected ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  <CustomAvatar
                                    image={option.image || undefined}
                                    initials={
                                      option.label
                                        ?.split(" ")
                                        .map((n: string) => n[0])
                                        .join("") || ""
                                    }
                                    className="w-8 h-8"
                                  />
                                  <div className="flex flex-col">
                                    <span className="text-gray-500">
                                      {option.label}
                                    </span>
                                    <span className="text-[10px] text-gray-900">
                                      {option.role}
                                    </span>
                                  </div>
                                </div>
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
          <div className="mt-4">
            <Button disabled={loading} size="lg" className="w-full h-14">
              {meeting ? t.form.update.button : t.form.create.button}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default MeetingForm;
