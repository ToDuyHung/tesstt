import { PublicClientApplication, Configuration } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: 'ĐIỀN_CLIENT_ID_CỦA_BẠN_VÀO_ĐÂY', // VD: '11111111-1111-1111-1111-111111111111'
    authority: 'https://login.microsoftonline.com/ĐIỀN_TENANT_ID_CỦA_BẠN_VÀO_ĐÂY',
    redirectUri: 'http://localhost:3000', // Khớp 100% với Azure Portal
  },
  cache: {
    cacheLocation: 'sessionStorage', // Có thể dùng 'localStorage'
    storeAuthStateInCookie: false,
  }
};

export const msalInstance = new PublicClientApplication(msalConfig);
