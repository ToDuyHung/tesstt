import { useState, useEffect } from 'react';
import { useSsoLogin, loginRequest } from './AuthContext';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';

function AppContent() {
  const { ssoLogin, isPending, error } = useSsoLogin();
  const isAuthenticated = useIsAuthenticated();
  const { accounts, instance } = useMsal();
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    if (isAuthenticated && accounts.length > 0) {
      // Yêu cầu token ngầm từ cache để hiển thị lên màn hình
      instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0]
      }).then((response) => {
        setToken(response.accessToken);
      }).catch((err) => {
        console.error('Lỗi khi lấy token ngầm:', err);
      });
    }
  }, [isAuthenticated, accounts, instance]);

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Mô hình Test MSAL SSO Login</h1>
      {isAuthenticated ? (
        <div style={{ background: '#e6fffa', padding: '20px', borderRadius: '8px' }}>
          <h2 style={{ color: 'green' }}>✅ Đã đăng nhập thành công!</h2>
          <p>Xin chào, <strong>{accounts[0]?.name}</strong> ({accounts[0]?.username})</p>
          
          <div style={{ marginTop: '20px', padding: '15px', background: '#333', color: '#fff', borderRadius: '8px', wordBreak: 'break-all' }}>
            <h3>Access Token của bạn:</h3>
            <p style={{ fontSize: '12px', fontFamily: 'monospace' }}>
              {token ? token : 'Đang tải token...'}
            </p>
          </div>
        </div>
      ) : (
        <div>
          <button 
            onClick={ssoLogin} 
            disabled={isPending} 
            style={{ padding: '10px 20px', cursor: 'pointer', fontSize: '16px', background: '#0078d4', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            {isPending ? 'Đang chuyển hướng (Redirecting)...' : 'Đăng nhập với Microsoft'}
          </button>
          {error && <p style={{ color: 'red', marginTop: '20px' }}>Lỗi: {error}</p>}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
