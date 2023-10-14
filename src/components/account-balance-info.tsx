import { Stack, Typography, Chip, Tooltip } from '@mui/material';
import React, { useEffect } from 'react';
import { getActiveNetwork } from '../background/redux-slices/selectors/networkSelectors';
import {useDispatch, useSelector } from 'react-redux';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  AccountData,
  getAccountData,
} from '../background/redux-slices/account';
import { getAccountEVMData } from '../background/redux-slices/selectors/accountSelectors';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiContext } from '../background/hooks/keyring-hooks';

const AccountBalanceInfo = ({ address }: { address: string }) => {
  const navigate = useNavigate();
  const activeNetwork = useSelector(getActiveNetwork);
  const accountData: AccountData | 'loading' = useSelector((state) =>
    getAccountEVMData(state, { address, chainId: activeNetwork.chainID })
  );

  const walletDeployed: boolean = useMemo(
    () => (accountData === 'loading' ? false : accountData.accountDeployed),
    [accountData]
  );

  const apiContext = useApiContext();
  useEffect(() => {
    getAccountData(address, apiContext);
  }, [apiContext, address]);

  return (
    <Stack spacing={1} justifyContent="center" alignItems="center">
      {activeNetwork.baseAsset.image && (
        <img
          height={40}
          src={activeNetwork.baseAsset.image}
          alt={`${activeNetwork.baseAsset.name} asset logo`}
        />
      )}
      {accountData !== 'loading' &&
        accountData.balances &&
        accountData.balances[activeNetwork.baseAsset.symbol] && (
          <Typography variant="h3">
            {parseFloat(
              accountData.balances[activeNetwork.baseAsset.symbol].assetAmount
                .amount
            ).toFixed(4)}{' '}
            {activeNetwork.baseAsset.symbol}
          </Typography>
        )}
      <Tooltip
        title={
          walletDeployed
            ? `Wallet has been deployed on ${activeNetwork.name} chain`
            : `Wallet is not deployed on ${activeNetwork.name} chain, it will be deployed upon the first transaction`
        }
      >
        <Chip
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/deploy-account')}
          variant="outlined"
          color={walletDeployed ? 'success' : 'error'}
          size="small"
          icon={walletDeployed ? <CheckCircleIcon /> : <CancelIcon />}
          label={
            accountData === 'loading'
              ? 'Loading deployment status...'
              : walletDeployed
                ? 'Deployed'
                : 'Not deployed'
          }
        />
      </Tooltip>
    </Stack>
  );
};

export default AccountBalanceInfo;
