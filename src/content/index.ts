

import {
    AA_EXTENSION_CONFIG,
    EXTERNAL_PORT_NAME,
    PROVIDER_BRIDGE_TARGET,
    WINDOW_PROVIDER_TARGET,
  } from '../background/constants'
  
  const windowOriginAtLoadTime = window.location.origin;
  
  export function connectProviderBridge(): void {
  }
  
  function injectWindowProvider(): void {
  }
  
  injectWindowProvider();
  connectProviderBridge();
  