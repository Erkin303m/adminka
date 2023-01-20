import { Helmet } from 'react-helmet-async';
// @mui
import { Button, Container, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Iconify from '../components/iconify';

export default function BlogPage() {
  const navigation = useNavigate();
  return (
    <>
      <Helmet>
        <title> Чат </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Chat
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => navigation('/dashboard/mainChat')}
          >
            New chat
          </Button>
        </Stack>
      </Container>
    </>
  );
}
