'use client';

import {
  Container,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

export default function PrivacyPolicyPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom fontWeight="bold">
        Privacy Policy
      </Typography>

      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Last updated: August 08, 2025
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Section title="1. Information We Collect">
        
        When you connect your social media accounts (such as Facebook) to our Service, we may collect:

        Your name and basic profile information

        Facebook Pages you manage (page ID and page name)

        Page access tokens required to publish content on your behalf

        Content you create or schedule using the Service
      </Section>

      <Section title="2. How We Use Your Information">
        <Typography paragraph>
          

          We use your information only to:

          Connect and manage your social media pages

          Publish posts on your behalf when you request it

          Display your connected pages inside the dashboard

          Improve and maintain the Service
        </Typography>

        <List dense>
          {definitions.map((item) => (
            <ListItem key={item.title} alignItems="flex-start">
              <ListItemText
                primary={item.title}
                secondary={item.desc}
              />
            </ListItem>
          ))}
        </List>
      </Section>

      <Section title="3. Data Storage and Security ">

        <Typography variant="subtitle1" fontWeight={600}>
                 </Typography>
        <Typography paragraph>


          Access tokens are stored securely and encrypted

          We take reasonable technical and organizational measures to protect your data

          Data is accessible only to authorized systems required to operate the Service
        </Typography>

        <List>
          <ListItem>• Email address</ListItem>
          <ListItem>• Usage Data</ListItem>
        </List>
      </Section>

      <Section title="4. Facebook Data Use">
        

        Our use of Facebook data fully complies with:

        Facebook Platform Terms

        Facebook Developer Policies

        We only request permissions necessary for core functionality (such as managing and publishing posts to Pages you own or manage).
      </Section>

      <Section title="Use of Your Personal Data">
        <List>
          {uses.map((use) => (
            <ListItem key={use}>• {use}</ListItem>
          ))}
        </List>
      </Section>

      <Section title="5. Data Deletion">
        

        You may disconnect your Facebook account at any time.
        Upon disconnection:

        Stored access tokens are deleted or invalidated

        Associated page data is removed from our system

        If you wish to request full data deletion, you can contact us at:

        Email: [famehyder9999@gmail.com]
      </Section>

      <Section title="6. Third-Party Services">
        

        The Service integrates with third-party platforms (e.g., Facebook).
        Your use of those platforms is also subject to their respective privacy policies.
      </Section>

      <Section title="7. Changes to This Policy">
        

        We may update this Privacy Policy from time to time.
        Any changes will be reflected on this page with an updated effective date.
      </Section>

      <Section title="8. Contact Us">
        

        If you have any questions about this Privacy Policy or your data, contact us at:

        Email: [famehyder9999@gmail.com]
        Website: [Smindruk.vercel.app]
      </Section>

      <Section title="Contact Us">
        <Typography>
          If you have any questions about this Privacy Policy, you can contact
          us at:
        </Typography>
        <Typography sx={{ mt: 1 }}>
          <strong>Email:</strong> famehyder9999@gmail.com
        </Typography>
      </Section>
    </Container>
  );
}

function Section({ title, children }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {children}
      </Typography>
    </Box>
  );
}

const definitions = [
  {
    title: 'Application',
    desc: 'This Privacy Policy describes how our platform (“we”, “our”, or “the Service”) collects, uses, stores, and protects user information. By using our Service, you agree to the collection and use of information in accordance with this policy.',
  },
];

const uses = [
  'To provide and maintain the Service',
  'To manage user accounts and registrations',
  'To communicate updates, security notices, and support messages',
  'To analyze usage and improve the Service',
  'To comply with legal obligations and enforce policies',
];
