import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectKeyringStatus } from '../redux-slices/selectors/keyringsSelectors';

import { BackgroundDispatch } from '../redux-slices';
import { useDispatch } from 'react-redux';
import { useBackgroundSelector } from './redux-hooks';
import MainServiceManager from '../services/main';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AsyncifyFn<K> = K extends (...args: any[]) => any
  ? (...args: Parameters<K>) => Promise<ReturnType<K>>
  : never;

export const useBackgroundDispatch = (): AsyncifyFn<BackgroundDispatch> =>
  useDispatch<BackgroundDispatch>() as AsyncifyFn<BackgroundDispatch>;

export const useApiContext = ()=>{
    const dispatch = useDispatch();
    const mainServiceManager = MainServiceManager.instance;
    return {dispatch, mainServiceManager};
}

export const useAreKeyringsUnlocked = (
  redirectIfNot: boolean,
  redirectTo: string
): boolean => {
  const keyringStatus = useBackgroundSelector(selectKeyringStatus);
  const location = useLocation();
  const navigate = useNavigate();

  const currentUrl = useMemo(() => location.pathname, [location]);

  let redirectTarget: string | undefined;
  if (keyringStatus === 'uninitialized') {
    redirectTarget = '/keyring/initialize';
  } else if (keyringStatus === 'locked') {
    redirectTarget = '/keyring/unlock';
  }

  useEffect(() => {
    if (
      redirectIfNot &&
      typeof redirectTarget !== 'undefined' &&
      currentUrl !== redirectTarget
    ) {
      navigate(redirectTarget, {
        state: {
          redirectTo,
        },
      });
    }
  });

  return keyringStatus === 'unlocked';
};
