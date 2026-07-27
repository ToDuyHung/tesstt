import { useSsoLogin } from './AuthContext';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';

function AppContent() {
  const { ssoLogin, isPending, error } = useSsoLogin();
  const isAuthenticated = useIsAuthenticated();
  const { accounts } = useMsal();

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Mô hình Test MSAL SSO Login</h1>
      {isAuthenticated ? (
        <div style={{ background: '#e6fffa', padding: '20px', borderRadius: '8px' }}>
          <h2 style={{ color: 'green' }}>✅ Đã đăng nhập thành công!</h2>
          <p>Xin chào, <strong>{accounts[0]?.name}</strong> ({accounts[0]?.username})</p>
          <p><i>Hãy mở tab F12 Console để xem log backend nhận token nhé.</i></p>
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
