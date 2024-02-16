'use client';

import * as z from "zod";

import { CardContent, CardFooter } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
})





interface Props {
  company: Company
}

const ProfileForm: React.FC<Props> = ({ company, ...props }) => {

  const [isEditMode, setIsEditMode] = useState(false)
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: company.name ?? '',
      vatNumber: company.vatNumber ?? '',
      localTaxOffice: company.localTaxOffice ?? '',
      companyProfession: company.companyProfession ?? '',
      address: company.address ?? '',
      city: company.city ?? '',
      postalCode: company.postalCode ?? '',
      region: company.region ?? '',
      country: company.country ?? '',
      websiteUrl: company.websiteUrl ?? '',
      accountingEmail: company.accountingEmail ?? '',
      generalEmail: company.generalEmail ?? '',
      phone: company.phone ?? '',
      alternativePhone: company.alternativePhone ?? '',
      companyLogo: company.companyLogo ?? '',
    },
  });

  const onSubmit = form.handleSubmit((values: z.infer<typeof formSchema>) => {

    // return console.log(values)
    startTransition(async () => {
      const result = await update(values as Company);
      if (result.success) {
        setIsEditMode(false)
        toast({
          title: "Success",
          description: "Company profile updated successfully",
        })
      } else {
        toast({
          title: "Oops",
          description: result.message,
        });
      }
    })
  });

  const toggleEditMode = () => {
    setIsEditMode(editMode => {
      //TODO: reset form to the original values
      return !editMode
    })
  }

  return (
    <Form {...form} >
      <form onSubmit={onSubmit} >
        <Heading title="Profile" description="information about the company" />
        <CardContent>
          <Separator className="mb-4" />

          <fieldset disabled={!isEditMode} className="flex flex-col space-y-4"  >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-medium">Company Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="add company name"
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
                  <FormLabel className="text-meduim">VAT Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="VAT number"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="font-light text-xs text-muted-foreground">VAT number for invoicing and compliances purposes</FormDescription>
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
                  <FormLabel className="text-meduim">Local tax office</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Local tax office"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="font-light text-xs text-muted-foreground">Tax office where the business files its taxes</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyProfession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-meduim">Company Profession</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Company profession"
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
                  <FormLabel className="text-meduim">Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Company's address"
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
                  <FormLabel className="text-meduim">City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="City"
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
                  <FormLabel className="text-meduim">Region</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Region"
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
                  <FormLabel className="text-meduim">Country</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Country"
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
                  <FormLabel className="text-meduim">Website URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="font-light text-xs text-muted-foreground">Company's landing page URL</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountingEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-meduim">Accounting Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="accounting@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="font-light text-xs text-muted-foreground">
                    An email to contact the accounting department
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
                  <FormLabel className="text-meduim">General Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="accounting@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="font-light text-xs text-muted-foreground">
                    An email to contact company for general inquiries
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
                  <FormLabel className="text-meduim">Phone number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Phone number"
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
                  <FormLabel className="text-meduim">Alternative number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Alternative phone number"
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
                  <FormLabel className="text-meduim">Company Logo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.example.com/logo.png"
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
          <Button type="button" onClick={toggleEditMode} variant="outline" disabled={isPending}>
            {isEditMode ? 'Cancel' : 'Edit'}
          </Button>
          {
            isEditMode && (
              <Button disabled={isPending}>
                {/* TODO: only show button to admin users */}
                Save
              </Button>
            )
          }
        </CardFooter>
      </form>
    </Form >
  );
}


export default ProfileForm;