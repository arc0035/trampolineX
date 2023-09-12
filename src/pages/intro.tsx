import React from 'react';
import {
  Box,
  CardActions,
  CardContent,
  Link,
  Stack,
  Typography,
  Button
} from '@mui/material';
import logo from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../components/PrimaryButton';


export default function Intro(){
    const navigate = useNavigate();

    return (
      <Stack
        spacing={2}
        sx={{ height: '100vh'}}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          component="span"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: '600',
            p: 4,
            border: '1px solid #d6d9dc',
            borderRadius: 5,
            background: 'white',
          }}
        >
          <CardContent>
            <Typography textAlign="center" variant="h3" gutterBottom>
              Start your eth journey
            </Typography>
            <Typography textAlign="center" variant="body1" color="text.secondary">
              Your smart contract account with unlimited possibilities,{' '}
              <Link href="https://github.com/eth-infinitism/trampoline">
                learn more
              </Link>
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ p: 5
                }}
            >
              <img  src={logo} alt="logo" />
            </Box>
            <Typography
              textAlign="center"
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Ethereum Foundation
            </Typography>
          </CardContent>
          <CardActions sx={{ pl: 4, pr: 4, width: '100%' }}>
            <Stack spacing={2} sx={{ width: '100%' }}>
              <Button
                size="large"
                variant="contained"
                onClick={() => navigate('/accounts/new')}
              >
                Create/recover new account
              </Button>
            </Stack>
          </CardActions>
        </Box>
      </Stack>
    );
}