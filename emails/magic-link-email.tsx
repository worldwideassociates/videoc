import {
  Body,
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

interface MagicLinkEmailProps {
  magicLink?: string;
  t: any;
}

const baseUrl = process.env.BASE_URL ? process.env.BASE_URL : "";

export const MagicLinkEmail = ({ magicLink, t }: MagicLinkEmailProps) => (
  <Html>
    <Head />
    <Preview>{t.magicLink.subject}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${process.env.BUNNY_CDN_BASE_URL}/assets/logo.jpeg`}
          width={400}
          alt="MbMVio"
        />
        <Heading style={heading}>🪄 {t.magicLink.subject}</Heading>
        <Section style={body}>
          <Text style={paragraph}>
            <Link style={link} href={magicLink}>
              👉 {t.magicLink.link} 👈
            </Link>
          </Text>
          <Text style={paragraph}>{t.magicLink.description}</Text>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />- WWA Team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>World Wide Associates Inc.</Text>
      </Container>
    </Body>
  </Html>
);

export default ({ url, t }: { url: string; t: any }) =>
  render(<MagicLinkEmail magicLink={url} t={t} />);

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 25px 48px",
  backgroundImage: 'url("/assets/logo.png")',
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat, no-repeat",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
};

const body = {
  margin: "24px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const link = {
  color: "#000",
  textDefcoration: "underline",
};

const hr = {
  borderColor: "#dddddd",
  marginTop: "48px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  marginLeft: "4px",
};
