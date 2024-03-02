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
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Company } from "@prisma/client";
import { update } from "@/actions/company";
import { toast } from "@/components/ui/use-toast";
import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  name: z.string().optional(),
  vatNumber: z.string().optional(),
  localTaxOffice: z.string().optional(),
  companyProfession: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  region: z.string().optional(),
  country: z.string().optional(),
  websiteUrl: z.string().optional(),
  accountingEmail: z.string().optional(),
  generalEmail: z.string().optional(),
  phone: z.string().optional(),
  alternativePhone: z.string().optional(),
  companyLogo: z.string().optional(),
});

interface Props {
  company: Company;
  t: Record<string, any>;
}

const ProfileForm: React.FC<Props> = ({ company, t }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: company.name ?? "",
      vatNumber: company.vatNumber ?? "",
      localTaxOffice: company.localTaxOffice ?? "",
      companyProfession: company.companyProfession ?? "",
      address: company.address ?? "",
      city: company.city ?? "",
      postalCode: company.postalCode ?? "",
      region: company.region ?? "",
      country: company.country ?? "",
      websiteUrl: company.websiteUrl ?? "",
      accountingEmail: company.accountingEmail ?? "",
      generalEmail: company.generalEmail ?? "",
      phone: company.phone ?? "",
      alternativePhone: company.alternativePhone ?? "",
      companyLogo: company.companyLogo ?? "",
    },
  });

  const onSubmit = form.handleSubmit((values: z.infer<typeof formSchema>) => {
    // return console.log(values)
    startTransition(async () => {
      const result = await update(values as Company);
      if (result.success) {
        setIsEditMode(false);
        toast({
          title: "Success",
          description: "Company profile updated successfully",
        });
      } else {
        toast({
          title: "Oops",
          description: result.message,
        });
      }
    });
  });

  const toggleEditMode = () => {
    setIsEditMode((editMode) => {
      //TODO: reset form to the original values
      return !editMode;
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <CardContent>
          <Heading
            title={t.form.header.title}
            description={t.form.header.subTitle}
          />
          <Separator className="mb-4" />

          <fieldset disabled={!isEditMode} className="flex flex-col space-y-4">
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
                      disabled={isPending}
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
            {/* ToDO: use select component */}
            <FormField
              control={form.control}
              name="localTaxOffice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-meduim">
                    {t.form.fields.localTaxOffice.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t.form.fields.localTaxOffice.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="font-light text-xs text-muted-foreground">
                    {t.form.fields.localTaxOffice.helpText}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyProfession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-meduim">
                    {t.form.fields.companyProfession.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t.form.fields.companyProfession.placeholder}
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
                    {t.form.fields.websiteUrl.helpText}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountingEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-meduim">
                    {t.form.fields.accountingEmail.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t.form.fields.accountingEmail.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="font-light text-xs text-muted-foreground">
                    {t.form.fields.accountingEmail.helpText}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="generalEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-meduim">
                    {t.form.fields.generalEmail.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t.form.fields.generalEmail.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="font-light text-xs text-muted-foreground">
                    {t.form.fields.generalEmail.helpText}
                  </FormDescription>
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
            <FormField
              control={form.control}
              name="alternativePhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-meduim">
                    {t.form.fields.alternativePhone.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t.form.fields.alternativePhone.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyLogo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-meduim">
                    {t.form.fields.companyLogo.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t.form.fields.companyLogo.placeholder}
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
          <Button
            type="button"
            onClick={toggleEditMode}
            variant="outline"
            disabled={isPending}
          >
            {isEditMode ? t.form.buttons.cancel : t.form.buttons.edit}
          </Button>
          {isEditMode && (
            <Button disabled={isPending}>
              {/* TODO: only show button to admin users */}
              t.form.buttons.save
            </Button>
          )}
        </CardFooter>
      </form>
    </Form>
  );
};

export default ProfileForm;
