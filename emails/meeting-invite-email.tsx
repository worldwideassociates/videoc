import { Company, Meeting, User } from "@prisma/client";
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

interface MeetingInvite {
  meeting: Meeting;
  participant: User;
  company: Company;
  t: any;
}

const baseUrl = process.env.BASE_URL ? `https://${process.env.BASE_URL}` : "";

export const MeetingInviteEmail = ({
  meeting,
  participant,
  company,
  t,
}: MeetingInvite) => {
  const meetingUrl = `${process.env.BASE_URL}/meetings/${meeting.id}/active`;

  return (
    <Html>
      <Head />
      <Preview>Meeting invite</Preview>
      <Body style={main}>
        <Container
          style={{
            ...container,
            display: "relative",
          }}
        >
          <Container style={{ display: "absolute", inset: 0 }}>
            <Img
              src="/images/email-bg.png"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 10,
              }}
            />
          </Container>
          <Container
            style={{
              position: "relative",
              zIndex: 20,
              margin: "0 auto",
              bottom: "70px",
            }}
          >
            <Text
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center",
              }}
            >
              {t.inviteMessage.subject}
            </Text>
          </Container>
        </Container>
        <Container style={container}>
          <Heading style={heading}>Dear {participant.name}</Heading>
          <Text
            style={{
              ...paragraph,
              paddingTop: "20px",
              fontWeight: "200",
            }}
          >
            {t.inviteMessage.body1} {company.name} {t.inviteMessage.body2}{" "}
            <span style={{ fontWeight: "bold" }}>
              {meeting.startDateTime.toLocaleDateString()} at{" "}
              {meeting.startDateTime.toLocaleTimeString()}
            </span>{" "}
            {t.inviteMessage.body3}
          </Text>
          <Text style={paragraph}>
            <Link href={meetingUrl} style={button}>
              {t.inviteMessage.link}
            </Link>
          </Text>
          <Hr style={hr} />
          <Section
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Section>
              <Text style={{ textAlign: "center" }}>Powered by</Text>
              <Img
                src="/images/logo.svg"
                style={{
                  width: "200px",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ({
  participant,
  meeting,
  t,
  company,
}: {
  participant: User;
  meeting: Meeting;
  company: Company;
  t: any;
}) =>
  render(
    <MeetingInviteEmail
      participant={participant}
      meeting={meeting}
      company={company}
      t={t}
    />
  );

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
  maxWidth: "560px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#000",
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
