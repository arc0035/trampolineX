import BaseService from "./base";
import { ServiceLifecycleEvents } from "../types/services/types";

export type PermissionRequest = {
    key: string;
    origin: string;
    faviconUrl: string;
    chainID: string;
    title: string;
    state: 'request' | 'allow' | 'deny';
    accountAddress: string;
  };
  
  export type PermissionMap = {
    evm: {
      [chainID: string]: {
        [address: string]: {
          [origin: string]: PermissionRequest;
        };
      };
    };
  };
  
  type Events = ServiceLifecycleEvents & {
    requestPermission: PermissionRequest;
    initializeAllowedPages: PermissionMap;
    setClaimReferrer: string;
    walletConnectInit: string;
  };

  export default class ProviderBridgeService extends BaseService<Events> {

      grantPermission(newPermission:any) {
          
      }

      denyOrRevokePermission(newPermission:any) {
        
      }

      _startService(): Promise<void> {
          throw new Error("Method not implemented.");
      }
      _stopService(): Promise<void> {
          throw new Error("Method not implemented.");
      }
  
  }