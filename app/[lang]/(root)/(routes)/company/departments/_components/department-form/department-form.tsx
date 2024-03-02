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
import { UserMultiSelect as MultiSelect } from "@/components/user-multi-select";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Department, User } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { InfoIcon } from "lucide-react";
import { UserSelect } from "@/components/user-select";
import { CardTitle } from "@/components/ui/card";
import { LocaleContext } from "@/providers/locale-provider";

interface Props {
  usersOptions: User[];
  department?: (Department & { members: User[] }) | null;
  manager?: User | null;
  t: Record<string, any>;
}

const formSchema = z.object({
  name: z.string().min(3, "Name is required (minuimum of 3 characters)."),
  description: z.string().max(255, "Description is too long").optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  manager: z
    .object({
      label: z.string(),
      value: z.string(),
      image: z.string(),
    })
    .optional(),
  members: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
      image: z.string(),
    })
  ),
});

const DepartmentForm: React.FC<Props> = ({
  usersOptions,
  department,
  manager,
  t,
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { locale } = use(LocaleContext);

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
          }
        : undefined,
      members:
        department?.members.map((member) => ({
          label: member.name!,
          value: member.id!,
          image: member.image!,
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

      if (result.success) {
        form.reset();
        toast({
          title: "Success",
          description: result.message,
        });

        router.push(`/${locale}/company/departments`);
      } else {
        toast({
          title: "Oops",
          description: result.message,
        });
      }
      setLoading(false);
    }
  );

  return (
    <Form {...form}>
      <CardTitle className="mb-4">
        {department ? t.form.header.update : t.form.header.create}
      </CardTitle>
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
              <FormItem>
                <FormLabel>{t.form.fields.manager.label}</FormLabel>
                {/* TODO fix these hacks */}
                <UserSelect
                  selected={(field.value as any) || []}
                  onSelect={field.onChange}
                  users={usersOptions}
                />
                <FormDescription className="font-light text-xs text-muted-foreground">
                  {t.form.fields.manager.helpText}
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
                <FormLabel>{t.form.fields.members.label}</FormLabel>
                <MultiSelect
                  selected={field.value || []}
                  onSelect={field.onChange}
                  users={usersOptions}
                  placeholder={t.form.fields.members.placeholder}
                />
                <FormMessage />
                <FormDescription className="font-light text-xs text-muted-foreground flex space-x-2">
                  <InfoIcon size={16} />
                  <p>{t.form.fields.members.helpText}</p>
                </FormDescription>
              </FormItem>
            )}
          />
        </fieldset>
        <div className="mt-4">
          <Button disabled={loading}>
            {/* TODO: only show button to admin users */}
            {department ? t.form.buttons.update : t.form.buttons.create}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DepartmentForm;
