import { Meeting, User } from "@prisma/client";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  render,
} from "@react-email/components";
import * as React from "react";

interface MeetingInvite {
  meeting: Meeting
  participant: User,
  message: string
  token: string
}

const baseUrl = process.env.BASE_URL
  ? `https://${process.env.BASE_URL}`
  : "";

export const MeetingInviteEmail = ({
  meeting,
  participant,
  message,
  token
}: MeetingInvite) => {

  const meetingUrl = `${process.env.BASE_URL}/meetings/${meeting.id}/active?token=${token}`

  return (
    <Html>
      <Head />
      <Preview>Meeting invite</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${baseUrl}/assets/logo.png`}
            width="42"
            height="42"
            alt="WWA"
            style={logo}
          />
          <Heading style={heading}>You're invited to a meeting</Heading>
          <Section style={buttonContainer}>
            <Button style={button} href={meetingUrl}>
              Join Meeting
            </Button>
          </Section>
          <Text style={paragraph}>Agenda: {meeting.title}</Text>
          <Text style={paragraph}>
            {message}
          </Text>
          <hr />
          <Text style={paragraph}>
            Scheduled For: <code style={code}>{meeting.startDateTime.toLocaleDateString()}</code>
          </Text>
          <Hr style={hr} />
          <Link href={baseUrl} style={reportLink}>
            World Wide Associates Inc.
          </Link>
        </Container>
      </Body>
    </Html>
  );
}


export default ({ message, participant, meeting, token }: { message: string, participant: User, meeting: Meeting, token: string }) =>
  render(<MeetingInviteEmail message={message} participant={participant} meeting={meeting} token={token} />)

const logo = {
  borderRadius: 21,
  width: 42,
  height: 42,
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#000",
  padding: "17px 0 0",
};

const paragraph = {
  margin: "0 0 15px",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149",
};

const buttonContainer = {
  padding: "27px 0 27px",
};

const button = {
  backgroundColor: "#000",
  borderRadius: "3px",
  fontWeight: "600",
  color: "#fff",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "11px 23px",
};

const reportLink = {
  fontSize: "14px",
  color: "#b4becc",
};

const hr = {
  borderColor: "#dfe1e4",
  margin: "42px 0 26px",
};

const code = {
  fontFamily: "monospace",
  fontWeight: "700",
  padding: "1px 4px",
  backgroundColor: "#dfe1e4",
  letterSpacing: "-0.3px",
  fontSize: "21px",
  borderRadius: "4px",
  color: "#3c4149",
};
