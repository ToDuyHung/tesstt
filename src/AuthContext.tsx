import { useEffect, useState, ReactNode } from 'react';
import { useMsal, MsalProvider } from '@azure/msal-react';
import { EventMessage, EventType, AuthenticationResult } from '@azure/msal-browser';
import { msalInstance } from './authConfig';

export const loginRequest = {
  scopes: [
    'User.Read',
    'https://analysis.windows.net/powerbi/api/Report.Read.All',
    'https://analysis.windows.net/powerbi/api/Workspace.Read.All',
    'https://analysis.windows.net/powerbi/api/Dataset.Read.All'
  ],
};

export const useSsoLogin = () => {
  const { instance } = useMsal();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string>('');

  const ssoLogin = async () => {
    setIsPending(true);
    setError('');
    try {
      await instance.loginRedirect(loginRequest);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Azure AD login failed';
      setError(errorMessage);
      console.error('Azure AD login error:', err);
      setIsPending(false);
    }
  };

  return { ssoLogin, isPending, error };
};

// Mock AuthService, Alert and navigate for testing purposes
const AuthService = {
    loginWithSso: async (data: any) => { 
        console.log('API Gọi về Backend với dữ liệu:', data); 
        return true; 
    }
};
const Alert = {
    success: (msg: string) => console.log('✅ SUCCESS Alert:', msg),
    error: (msg: string) => console.error('❌ ERROR Alert:', msg)
};
const navigate = (path: string) => console.log('Chuyển hướng trang (navigate) tới:', path);
const AppRoutes = { HOME: '/' };

interface MsalAuthProviderProps {
    children: ReactNode;
}

export const MsalAuthProvider = ({ children }: MsalAuthProviderProps) => {
  useEffect(() => {
    let callbackId: string | null = null;

    const initializeMsal = async () => {
      callbackId = msalInstance.addEventCallback(async (event: EventMessage) => {
        if (event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS && event.payload) {
          const payload = event.payload as AuthenticationResult;
          msalInstance.setActiveAccount(payload.account);
          try {
            await AuthService.loginWithSso({
              accessToken: payload.idToken,
            });

            Alert.success('Login successful. Welcome to the Admin Portal.');
            navigate(AppRoutes.HOME);
          } catch (err) {
            console.error('Azure AD post-login error:', err);
            Alert.error('Login failed. Please try again.');
          }
        }
      });

      await msalInstance.initialize();

      const accounts = msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        msalInstance.setActiveAccount(accounts[0]);
      }
    };

    initializeMsal();

    return () => {
      if (callbackId) msalInstance.removeEventCallback(callbackId);
    };
  }, []);

  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
};
