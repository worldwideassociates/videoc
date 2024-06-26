"use client";

import { create, update } from "@/actions/departments";
import { Button } from "@/components/ui/button";
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
import { Department, User } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Check, ChevronsUpDown, InfoIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { CustomAvatar } from "@/components/custom-avatar";
import { useModal } from "@/hooks/use-modal";
import { useRouter } from "next/navigation";

interface Props {
  usersOptions: User[];
  department?: Department & { members: User[] };
  t: Record<string, any>;
}
const getFormSchema = (t: Record<string, any>) => {
  t = t.form.fields;

  const formSchema = z.object({
    name: z
      .string({
        required_error: t.name.errors.required,
      })
      .min(3, t.name.errors.min),
    email: z.string().optional(),
    phone: z.string().optional(),
    manager: z
      .object(
        {
          label: z.string(),
          value: z.string(),
          image: z.string(),
          role: z.string(),
        },
        {
          required_error: t.manager.errors.required,
        }
      )
      .optional(),
    members: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          image: z.string(),
          role: z.string(),
        })
      )
      .min(1, t.members.errors.min),
  });
  return formSchema;
};

const DepartmentForm: React.FC<Props> = ({ usersOptions, department, t }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const modal = useModal();
  const router = useRouter();

  const formSchema = getFormSchema(t);

  const manager = usersOptions.find((u) => u.id === department?.managerId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // TODO: fix types error
    defaultValues: {
      name: department?.name,
      email: department?.email!,
      phone: department?.phone!,
      manager: manager
        ? {
            label: manager?.name!,
            value: manager?.id!,
            image: manager?.image!,
            role: manager?.role!,
          }
        : undefined,
      members:
        department?.members.map((member) => ({
          label: member.name!,
          value: member.id!,
          image: member.image!,
          role: member.role!,
        })) || [],
    },
  });

  const onSubmit = form.handleSubmit(
    async (values: z.infer<typeof formSchema>) => {
      setLoading(true);
      const payload = {
        ...values,
        members: values.members.map((member: any) => ({ id: member.value })),
        managerId: values.manager?.value,
      } as any;

      // Hack
      delete payload.manager;

      const result = department
        ? await update(department.id, payload)
        : await create(payload);

      if (result?.success) {
        form.reset();
        toast({
          title: "✅",
          description: department ? t.form.toast.updated : t.form.toast.created,
        });
        modal.onClose();
        router.refresh();
      } else {
        toast({
          title: "⚠️",
          description: t.form.toast.error,
        });
      }

      setLoading(false);
    }
  );

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="">
        <fieldset disabled={loading} className="flex flex-col space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.form.fields.name.label}</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder={t.form.fields.name.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormDescription className="font-light text-xs text-muted-foreground">
                  {t.form.fields.name.helpText}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.form.fields.email.label}</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder={t.form.fields.email.placeholder}
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
                <FormLabel>{t.form.fields.phone.label}</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder={t.form.fields.phone.placeholder}
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
              <FormItem className="flex flex-col">
                <FormLabel>{t.form.fields.manager.label}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          <div className="flex space-x-2 pt-2 items-center">
                            <CustomAvatar
                              image={field.value.image || undefined}
                              initials={
                                field.value.label
                                  ?.split(" ")
                                  .map((n: string) => n[0])
                                  .join("") || ""
                              }
                              className="w-8 h-8"
                            />
                            <span className="text-gray-500">
                              {field.value.label}
                            </span>
                          </div>
                        ) : (
                          <p>{t.form.fields.manager.placeholder}</p>
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-[400px] p-0">
                    <Command>
                      <CommandInput
                        placeholder={t.form.fields.members.placeholder}
                      />
                      <CommandEmpty>
                        {t.form.fields.members.errors.notFound}
                      </CommandEmpty>
                      <CommandGroup>
                        {usersOptions.map((user) => {
                          const option = {
                            label: user.name,
                            value: user.id,
                            image: user.image,
                            role: user.role,
                          };
                          return (
                            <CommandItem
                              value={option.value}
                              key={option.value}
                              onSelect={() => {
                                field.onChange(option);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  option.value === field.value?.value
                                    ? "opacity-100"
                                    : "opacity-0"
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

          <FormField
            control={form.control}
            name="members"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t.form.fields.members.label}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[620px] justify-between text-muted-foreground",
                          !field.value && ""
                        )}
                      >
                        {field.value.length + " " + t.form.fields.members.label}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[400px] max-h-[500px] p-0 mb-5"
                    align="start"
                  >
                    <Command>
                      <CommandInput
                        placeholder={t.form.fields.members.placeholder}
                      />
                      <CommandEmpty>
                        {t.form.fields.members.errors.notFound}
                      </CommandEmpty>
                      <CommandGroup>
                        {usersOptions.map((user: User) => {
                          const option = {
                            label: user.name,
                            value: user.id,
                            image: user.image,
                            role: user.role,
                          };

                          const isSelected = field.value.some(
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
                <FormDescription className="font-light text-xs text-muted-foreground flex space-x-2">
                  <InfoIcon size={16} />
                  <p>{t.form.fields.members.helpText}</p>
                </FormDescription>
              </FormItem>
            )}
          />
        </fieldset>
        <div className="mt-4 bg-red-300">
          <Button size="lg" className="w-full" disabled={loading}>
            {/* TODO: only show button to admin users */}
            {department ? t.form.buttons.update : t.form.buttons.create}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DepartmentForm;
