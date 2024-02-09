'use client'

import { create, update } from '@/actions/meetings';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UserMultiSelect as MultiSelect } from '@/components/user-multi-select';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Meeting, User } from '@prisma/client';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarIcon, InfoIcon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import { useModal } from '@/hooks/use-modal';
import { Modal } from '@/components/ui/modal';
import { UserCard } from '@/components/user-card';
import { Separator } from '@/components/ui/separator';



const TIME_OPTIONS = [
  { label: '15 minutes', value: '15' },
  { label: '30 minutes', value: '30' },
  { label: '45 minutes', value: '45' },
  { label: '1 hour', value: '60' },
  { label: '1 hour 30 minutes', value: '90' },
  { label: '2 hours', value: '120' },
]

interface Props {
  usersOptions: User[];
  meeting?: Meeting & { participants: User[] } | null
  host?: User | null
}

const formSchema = z.object({
  title: z.string().min(3, "Name is required (minuimum of 3 characters)."),
  description: z.string().max(255, "Description is too long").optional(),
  startDateTime: z.date(),
  estimatedDuration: z.string().optional(),
  participants: z.array(z.object({
    label: z.string(),
    value: z.string(),
    image: z.string(),
  })),
})

const MeetingForm: React.FC<Props> = ({ usersOptions, meeting, host }) => {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const isOpen = useModal(state => state.isOpen)
  const onOpen = useModal(state => state.onOpen)
  const onClose = useModal(state => state.onClose)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // TODO: fix types error
    defaultValues: {
      title: meeting?.title || '',
      description: meeting?.description || '',
      startDateTime: meeting?.startDateTime ? new Date(meeting.startDateTime) : undefined,
      estimatedDuration: meeting?.estimatedDuration || '30',
      participants: meeting?.participants.map(
        (user: User) =>
          ({ label: user.name!, value: user.id!, image: user.image! })) || []
    }
  });


  const values = form.getValues()


  const onSubmit = form.handleSubmit((values: z.infer<typeof formSchema>) => {
    onOpen()
  });

  const handleConfirm = async () => {
    setLoading(true);
    const payload = {
      ...values,
      participants: values.participants.map((participant: any) => ({ id: participant.value })),
    } as any

    // Hack
    delete payload.host


    const result = meeting ? await update(meeting.id, payload) : await create(payload)

    if (result.success) {
      form.reset();
      toast({
        title: "Success",
        description: result.message,
      })

      router.push('/')

    } else {
      toast({
        title: "Oops",
        description: result.message,
      })
    }
    setLoading(false);
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        title={meeting ? "Update meeting" : " Confirm schedule"}
        description={meeting ? "Update the meeting details" : "You are about to schedule a meeting and send invites to participants. Do you want to proceed?"}
        Icon={CalendarIcon}
        onClose={onClose}
      >
        <Separator className='my-2' />
        <div className="flex flex-col space-y-2">
          <div className="">
            <h1 className=" tracking-tight">{values.title}</h1>
            <p className='text-sm text-muted-foreground'>{values.description}</p>
          </div>
          <div className="flex flex-col space-y-2">
            <h1 className="text-xs font-bold">Participants</h1>
            <div className="flex flex-col space-y-2">
              {
                values.participants.map((user, index) => (
                  <UserCard
                    key={index}
                    user={{
                      name: user.label,
                      image: user.image
                    } as any}
                  />
                ))
              }
            </div>
          </div>
        </div>
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
          <Button variant="outline" disabled={loading} onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={loading} onClick={handleConfirm}>
            Continue
          </Button>
        </div>
      </Modal>
      <Form {...form}>
        <form onSubmit={onSubmit} className="">
          <fieldset disabled={loading} className='flex flex-col space-y-4'>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agenda</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Meeting subject"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="font-light text-xs text-muted-foreground">Whats the agenda of the meeting?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What will be covered in the meeting?"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDateTime"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col space-y-2">
                    <FormLabel>Start date and time</FormLabel>
                    <DateTimePicker
                      date={field.value}
                      setDate={field.onChange}
                    />
                  </div>
                  <FormDescription className="font-light text-xs text-muted-foreground">
                    When is the meeting scheduled to start?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="estimatedDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated duration</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        TIME_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {option.label}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="participants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invites</FormLabel>
                  <MultiSelect
                    selected={field.value || []}
                    onSelect={field.onChange}
                    users={usersOptions}
                    placeholder="select invites"
                  />
                  <FormMessage />
                  <FormDescription className="font-light text-xs text-muted-foreground flex space-x-2">
                    <InfoIcon size={16} />
                    <span>Select members to invite to the meeting. an email notification will be sent to each individual</span>
                  </FormDescription>
                </FormItem>
              )}
            />
          </fieldset>
          <div className="mt-4">
            <Button disabled={loading}>
              Schedule
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default MeetingForm;