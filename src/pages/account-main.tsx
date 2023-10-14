import {
    Box,
    Card,
    CardActions,
    CardContent,
    Container,
    Typography
  } from '@mui/material';
  import React, { useEffect } from 'react';
  import { getActiveAccount } from '../background/redux-slices/selectors/accountSelectors';
  import { useSelector } from 'react-redux';

  import AccountBalanceInfo from '../components/account-balance-info';
  import AccountInfo from '../components/account-info';
  import Header from '../components/header';
  import TransferAssetButton from '../components/transfer-asset-button';

  
  const AccountMain = () => {
    const activeAccount = useSelector(getActiveAccount)??"0xdeadbeaf";
    
    return (
      <Container sx={{ width: '62vw' }}>
        <Header />
        <Card sx={{ ml: 4, mr: 4, mt: 2, mb: 2}}>
          <CardContent>
            {activeAccount && activeAccount!=='0xdeadbeaf' && <AccountInfo address={activeAccount}></AccountInfo>}
            <Box
              component="div"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              sx={{ m: 2 }}
            >
              <AccountBalanceInfo address={activeAccount} />
            </Box>
            <Box
              component="div"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              sx={{ m: 4 }}
            >
              <TransferAssetButton activeAccount={activeAccount || ''} />
            </Box>
          </CardContent>
        </Card>
      </Container>
    );
  };
  
  export default AccountMain;
  