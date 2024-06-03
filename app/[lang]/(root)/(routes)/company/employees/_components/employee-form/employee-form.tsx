"use client";

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
import { Role, User } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { upsert } from "@/actions/users";
import { DateValue } from "react-aria";
import { CalendarDate, toCalendarDate } from "@internationalized/date";
import { createCalendarDate } from "@/lib/utils";
import { DatePicker } from "@/components/ui/date-picker";
import { LocaleContext } from "@/providers/locale-provider";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  employee?: User | null;
  departmentsOptions: { label: string; value: string }[];
  readonly?: boolean;
  t: Record<string, any>;
}

const currentYear = new Date().getFullYear();

const formSchema = z.object({
  name: z.string().min(3, "Name is required (minuimum of 3 characters)."),
  email: z.string().min(1, "Email is required").email(),
  phone: z.string().optional(),
  departmentId: z.string().optional(),
  position: z.string().optional(),
  image: z.string().optional(),
  dateOfBirth: z.date().optional(),
  isAdmin: z.boolean().default(false),
});

const EmployeeForm: React.FC<Props> = ({
  employee,
  departmentsOptions,
  t,
  readonly = false,
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { locale } = use(LocaleContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // TODO: fix types error
    defaultValues: employee
      ? ({ ...employee, isAdmin: employee.role == Role.ADMIN } as any)
      : {
          name: "",
          email: "",
          phone: "",
          departmentId: "",
          position: "",
          dateOfBirth: undefined,
          image: "",
          isAdmin: false,
        },
  });

  const onSubmit = form.handleSubmit(
    async (values: z.infer<typeof formSchema>) => {
      setLoading(true);
      const payload = {
        ...employee,
        ...values,
        dateOfBirth: values.dateOfBirth ?? undefined,
        role: values.isAdmin ? Role.ADMIN : Role.EMPLOYEE,
      } as any;

      //Hack
      delete payload.departmentId;
      delete payload.isAdmin;

      const result = await upsert(payload);

      if (result.success) {
        form.reset();
        toast({
          title: "Success",
          description: result.message,
        });

        router.push(`/${locale}/company/employees`);
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
      <form onSubmit={onSubmit} className="">
        <fieldset
          disabled={loading || readonly}
          className="flex flex-col space-y-4"
        >
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
                <FormLabel>{t.form.fields.position.label}</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder={t.form.fields.position.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Only for display we can not edit department from this form */}
          {employee ? (
            <FormField
              disabled={true}
              control={form.control}
              name="departmentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.form.fields.department.label}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={true}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t.form.fields.department.placeholder}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {departmentsOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                  <FormDescription>
                    {t.form.fields.department.helpText}
                  </FormDescription>
                </FormItem>
              )}
            />
          ) : null}
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t.form.fields.dateOfBirth.label}</FormLabel>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={t.form.fields.dateOfBirth.placeholder}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isAdmin"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{t.form.fields.isAdmin.label}</FormLabel>
                  <FormDescription>
                    {t.form.fields.isAdmin.helpText}
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </fieldset>
        {!readonly && (
          <div className="mt-4">
            <Button disabled={loading}>
              {/* TODO: only show button to admin users */}
              {employee ? t.form.buttons.update : t.form.buttons.create}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default EmployeeForm;
