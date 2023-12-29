import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Text,
  } from '@react-email/components';
  import * as React from 'react';
  
  interface NotionMagicLinkEmailProps {
    loginCode?: string;
  }
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';
  
  export const EmailSignUp = ( email:string, redirect:any ) => {
  
  const signupLink = `${baseUrl}/signup${redirect}`;

  return (
    <Html>
      <Head />
      <Preview>Sign up and create your account</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Sign up</Heading>
            <Text style={{ ...text, marginBottom: '14px' }}>
                You don&apos;t yet have an account
            </Text>
            <code style={code}>
                <Link
                href={signupLink}
                target="_blank"
                style={buttonLink}
                >
                Sign Up Now
                </Link>
            </code>
            <Text
            style={{
              marginTop: '14px',
              marginBottom: '16px',
                }}
            >
            <Link
                href={signupLink}
                target="_blank"
                >
                {signupLink}
                </Link>
          </Text>
            
          <Text
            style={{
              ...text,
              color: '#ababab',
              marginTop: '12px',
              marginBottom: '38px',
            }}
          >
            If you didn&apos;t try to signup, you can safely ignore this email.
          </Text>
          <Img
            src={`${baseUrl}/static/laugh.png`}
            width="32"
            height="32"
            alt="Laugh"
          />
          <Text style={footer}>
            <Link
              href={baseUrl}
              target="_blank"
              style={{ ...link, color: '#898989' }}
            >
              Networks.dev
            </Link>
            , the all-in-one-workspace
            <br />
            for your notes, tasks, wikis, and databases.
          </Text>
        </Container>
      </Body>
    </Html>
  )
  };
  
  export default EmailSignUp;
  
  const main = {
    backgroundColor: '#ffffff',
  };
  
  const container = {
    paddingLeft: '12px',
    paddingRight: '12px',
    margin: '0 auto',
  };
  
  const h1 = {
    color: '#000000',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '40px 0',
    padding: '0',
  };
  
  const link = {
    color: '#333333',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '14px',
    textDecoration: 'underline',
  };
  
  const text = {
    color: '#000000',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '14px',
    margin: '24px 0',
  };
  
  const footer = {
    color: '#898989',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '12px',
    lineHeight: '22px',
    marginTop: '12px',
    marginBottom: '24px',
  };
  
  const code = {
    display: 'inline-block',
    padding: '16px 4.5%',
    backgroundColor: '#000000',
    borderRadius: '5px',
    color: '#ffffff',
  };
  
  const buttonLink = {
    color: '#ffffff',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '18px',
  };