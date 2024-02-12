


export const sendInvites = async (participantMeetings: any, message: string) => {
  console.log('-----------------------------------------------------------')
  console.log('sending invites to participants')
  console.log(message)

  participantMeetings.forEach((participant: any) => {
    const meetingUrl = `${process.env.BASE_URL}/meetings/${participant.meetingId}/active?token=${participant.token}`
    console.log(meetingUrl)
  })
}