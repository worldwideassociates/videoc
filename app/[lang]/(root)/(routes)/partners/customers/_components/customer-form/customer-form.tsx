"use client";

import * as z from "zod";

import { CardContent, CardFooter } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { Company, Role, User } from "@prisma/client";
import { toast } from "@/components/ui/use-toast";
import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { upsert } from "@/actions/users";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { CheckIcon, SortAscIcon } from "lucide-react";
import { LocaleContext } from "@/providers/locale-provider";

const formSchema = z.object({
  name: z.string().optional(),
  vatNumber: z.string().optional(),
  localTaxOffice: z.string().optional(),
  profession: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  region: z.string().optional(),
  country: z.string().optional(),
  websiteUrl: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
});

interface Props {
  customer?: User | null;
  readonly?: boolean;
  localTaxOfficesOptions: { label: string; value: string }[];
  t: Record<string, any>;
}

const CustomerForm: React.FC<Props> = ({
  customer,
  localTaxOfficesOptions,
  t,
  readonly = false,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { locale } = use(LocaleContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: customer?.name ?? "",
      vatNumber: customer?.vatNumber ?? "",
      localTaxOffice: customer?.localTaxOffice ?? "",
      profession: customer?.profession ?? "",
      address: customer?.address ?? "",
      city: customer?.city ?? "",
      postalCode: customer?.postalCode ?? "",
      region: customer?.region ?? "",
      country: customer?.country ?? "",
      websiteUrl: customer?.websiteUrl ?? "",
      email: customer?.email ?? "",
      phone: customer?.phone ?? "",
    },
  });

  const onSubmit = form.handleSubmit(
    async (values: z.infer<typeof formSchema>) => {
      setLoading(true);

      const payload = {
        ...customer,
        ...values,
        role: Role.CUSTOMER,
      } as any;

      const result = await upsert(payload);
      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });
        router.push(`/${locale}/partners/customers`);
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
      <form onSubmit={onSubmit}>
        <CardContent>
          <Separator className="mb-4" />

          <fieldset
            disabled={loading || readonly}
            className="flex flex-col space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-medium">
                    {t.form.fields.name.label}
                  </FormLabel>
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
              name="vatNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-meduim">
                    {t.form.fields.vatNumber.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t.form.fields.vatNumber.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="font-light text-xs text-muted-foreground">
                    {t.form.fields.vatNumber.helpText}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="localTaxOffice"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t.form.fields.localTaxOffice.label}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[600px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? localTaxOfficesOptions.find(
                                (language) => language.value === field.value
                              )?.label
                            : t.form.fields.localTaxOffice.placeholder}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[600px] p-0">
                      <Command>
                        <CommandInput
                          placeholder={t.form.fields.localTaxOffice.placeholder}
                          className="h-9"
                        />
                        <CommandGroup>
                          {localTaxOfficesOptions.map((option) => (
                            <CommandItem
                              value={option.label}
                              key={option.value}
                              onSelect={() => {
                                form.setValue("localTaxOffice", option.value);
                              }}
                            >
                              {option.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  option.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
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
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-meduim">
                    {t.form.fields.profession.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t.form.fields.profession.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-meduim">
                    {t.form.fields.address.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t.form.fields.address.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-meduim">
                    {t.form.fields.city.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t.form.fields.city.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-meduim">
                    {t.form.fields.region.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t.form.fields.region.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-meduim">
                    {t.form.fields.country.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t.form.fields.country.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="websiteUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-meduim">
                    {t.form.fields.websiteUrl.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t.form.fields.websiteUrl.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="font-light text-xs text-muted-foreground">
                    Company's landing page URL
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
                  <FormLabel className="text-meduim">
                    {t.form.fields.email.label}
                  </FormLabel>
                  <FormControl>
                    <Input
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
                  <FormLabel className="text-meduim">
                    {t.form.fields.phone.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t.form.fields.phone.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          {!readonly && (
            <Button disabled={loading}>
              {customer ? t.form.buttons.update : t.form.buttons.create}
            </Button>
          )}
        </CardFooter>
      </form>
    </Form>
  );
};

export default CustomerForm;
