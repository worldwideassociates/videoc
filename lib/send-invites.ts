


export const sendInvites = async (participantMeetings: any) => {
  console.log('-----------------------------------------------------------')
  console.log('senging invites to participants')

  participantMeetings.forEach((participant: any) => {
    const meetingUrl = `${process.env.BASE_URL}/meetings/${participant.meetingId}/active?token=${participant.token}`
    console.log(meetingUrl)
  })
}