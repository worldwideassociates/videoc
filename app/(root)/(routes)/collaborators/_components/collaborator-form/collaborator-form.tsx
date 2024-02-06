'use client';

import * as z from "zod";

import { CardContent, CardFooter } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Company, Role, User } from "@prisma/client";
import { toast } from "@/components/ui/use-toast";
import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { upsert } from "@/actions/users";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Command, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { CheckIcon } from "lucide-react";



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
  logo: z.string().optional(),
})





interface Props {
  collaborator?: User | null
  readonly?: boolean
  localTaxOfficesOptions: { label: string, value: string }[]
}

const CollaboratorForm: React.FC<Props> = ({ collaborator, localTaxOfficesOptions, readonly = false }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: collaborator?.name ?? '',
      vatNumber: collaborator?.vatNumber ?? '',
      localTaxOffice: collaborator?.localTaxOffice ?? '',
      profession: collaborator?.profession ?? '',
      address: collaborator?.address ?? '',
      city: collaborator?.city ?? '',
      postalCode: collaborator?.postalCode ?? '',
      region: collaborator?.region ?? '',
      country: collaborator?.country ?? '',
      websiteUrl: collaborator?.websiteUrl ?? '',
      email: collaborator?.email ?? '',
      phone: collaborator?.phone ?? '',
      logo: collaborator?.logo ?? '',
    },
  });

  const onSubmit = form.handleSubmit(async (values: z.infer<typeof formSchema>) => {

    setLoading(true);

    const payload = {
      ...collaborator,
      ...values,
      role: Role.COLLABORATOR
    } as any

    const result = await upsert(payload);
    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
      })
      router.push('/collaborators');
    } else {
      toast({
        title: "Oops",
        description: result.message,
      });
    }
    setLoading(false);
  });

  return (
    <Form {...form} >
      <form onSubmit={onSubmit} >
        <CardContent>
          <Separator className="mb-4" />

          <fieldset disabled={loading || readonly} className="flex flex-col space-y-4"  >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-medium">Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Add collaborator name"
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
                <FormItem className="flex flex-col">
                  <FormLabel>Local Tax office</FormLabel>
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
                            : "Select Local Tax Office"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[600px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search local tax office..."
                          className="h-9"
                        />
                        <CommandGroup>
                          {localTaxOfficesOptions.map((option) => (
                            <CommandItem
                              value={option.label}
                              key={option.value}
                              onSelect={() => {
                                form.setValue("localTaxOffice", option.value)
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
                      placeholder="Collaborator's address"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-meduim">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="contact@example.com"
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
              name="logo"
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
          {
            !readonly && (
              <Button disabled={loading}>
                Save
              </Button>
            )
          }
        </CardFooter>
      </form>
    </Form >
  );
}


export default CollaboratorForm;