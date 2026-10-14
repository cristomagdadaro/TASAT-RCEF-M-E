import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ph.gov.philrice.rcef.tasat',
  appName: 'TASAT-RCEF M&E',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
