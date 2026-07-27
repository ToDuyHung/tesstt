import { PublicClientApplication, Configuration } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID || '',
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID || ''}`,
    redirectUri: import.meta.env.VITE_AZURE_REDIRECT_URI || 'http://localhost:3000',
  },
  cache: {
    cacheLocation: 'sessionStorage', // Có thể dùng 'localStorage'
    storeAuthStateInCookie: false,
  }
};

export const msalInstance = new PublicClientApplication(msalConfig);
