import {
    Box,
    Button,
    Container,
    Paper,
    Stack,
    Typography,
  } from '@mui/material';
  import React from 'react';
  import {
    TransactionConfirmation,
    TransactionConfirmationtProps,
  } from '../../background/types/component';
  import AccountInfo from '../../Popup/components/account-info';
  import OriginInfo from '../../Popup/components/origin-info';
  import { useBackgroundSelector } from '../../background/hooks/redux-hooks';
  import {
    getAccountInfo,
    getActiveAccount,
  } from '../../background/redux-slices/selectors/accountSelectors';
  import { getActiveNetwork } from '../../background/redux-slices/selectors/networkSelectors';
  import { selectCurrentOriginPermission } from '../../background/redux-slices/selectors/dappPermissionSelectors';
  import { selectCurrentPendingSendTransactionRequest } from '../../background/redux-slices/selectors/transactionsSelectors';
  import { ethers } from 'ethers';
import { PermissionRequest } from '../../background/services/provider-bridge';

  
  const TransactionConfirmationComponent: TransactionConfirmation = ({
    userOp,
    context,
    onComplete,
    transaction,
    onReject,
  }: TransactionConfirmationtProps) => {
    const activeAccount = useBackgroundSelector(getActiveAccount);
    const activeNetwork = useBackgroundSelector(getActiveNetwork);
    const accountInfo = useBackgroundSelector((state) =>
      getAccountInfo(state, activeAccount)
    );
  
    const sendTransactionRequest = useBackgroundSelector(
      selectCurrentPendingSendTransactionRequest
    );
  
    const originPermission:PermissionRequest|undefined = useBackgroundSelector((state) =>
      selectCurrentOriginPermission(state, {
        origin: sendTransactionRequest?.origin || '',
        address: activeAccount || '',
      })
    );
  
    console.log('heres');
  
    return (
      <Container>
        <Box sx={{ p: 2 }}>
          <Typography textAlign="center" variant="h6">
            Send transaction request
          </Typography>
        </Box>
        {activeAccount && (
          <AccountInfo activeAccount={activeAccount} accountInfo={accountInfo} />
        )}
        <Stack spacing={2} sx={{ position: 'relative', pt: 2, mb: 4 }}>
          <OriginInfo permission={originPermission} />
          <Typography variant="h6" sx-={{ p: 2 }}>
            Transaction data
          </Typography>
          <Stack spacing={2}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                To:{' '}
                <Typography component="span" variant="body2">
                  {transaction.to}
                </Typography>
              </Typography>
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                Data:{' '}
                <Typography component="span" variant="body2">
                  {transaction.data?.toString()}
                </Typography>
              </Typography>
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                Value:{' '}
                <Typography component="span" variant="body2">
                  {transaction.value
                    ? ethers.utils.formatEther(transaction.value)
                    : 0}{' '}
                  {activeNetwork.baseAsset.symbol}
                </Typography>
              </Typography>
            </Paper>
          </Stack>
        </Stack>
        <Paper
          elevation={3}
          sx={{
            position: 'sticky',
            bottom: 0,
            left: 0,
            width: '100%',
          }}
        >
          <Box
            justifyContent="space-around"
            alignItems="center"
            display="flex"
            sx={{ p: 2 }}
          >
            <Button sx={{ width: 150 }} variant="outlined" onClick={onReject}>
              Reject
            </Button>
            <Button
              sx={{ width: 150 }}
              variant="contained"
              onClick={() => onComplete(context)}
            >
              Send
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  };
  
  export default TransactionConfirmationComponent;