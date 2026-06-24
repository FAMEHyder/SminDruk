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

export default function UserDataDeletionPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom fontWeight="bold">
        User Data Deletion Instructions
      </Typography>

      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Last updated: August 08, 2025
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Section title="What is this page for?">
        This page explains how you can request deletion of your personal data
        that is collected through our service.
      </Section>

      <Section title="How to Request Data Deletion">
        <Typography paragraph>
          To delete your data, please follow the steps below:
        </Typography>

        <List>
          <ListItem>• Send an email to : <strong>famehyder9999@gmail.com</strong></ListItem>
          <ListItem>• Use subject: <strong>User Data Deletion Request</strong></ListItem>
          <ListItem>• Include your registered email or Facebook ID</ListItem>
          <ListItem>• We will process your request within <strong>7 business days</strong></ListItem>
        </List>
      </Section>

      <Section title="What data will be deleted?">
        Your account information and any personal data associated with your
        usage of the Service will be deleted.
      </Section>

      <Section title="Important Notes">
        <List>
          <ListItem>• Deletion requests are handled manually via email.</ListItem>
          <ListItem>• Some data may remain if required for legal or security reasons.</ListItem>
          <ListItem>• After deletion, you may need to create a new account to use the Service again.</ListItem>
        </List>
      </Section>

      <Section title="Contact">
        <Typography>
          Email: <strong>famehyder9999@gmail.com</strong>
        </Typography>
      </Section>
    </Container>
  );
}

function Section({ title, children }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight="600">
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {children}
      </Typography>
    </Box>
  );
}
