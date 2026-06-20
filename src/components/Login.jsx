export default function Login({ onSignIn, error }) {
  return (
    <div style={{
      fontFamily: "'DM Sans', system-ui, sans-serif", background: '#f4efe6', minHeight: '100vh', color: '#221c17',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <div style={{
        width: 380, maxWidth: '100%', background: '#fffdf9', border: '1.5px solid #ece2d2', borderRadius: 22,
        padding: 36, boxShadow: '0 4px 0 #ece2d2', textAlign: 'center',
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14, background: '#d9603b', display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: '#fff', fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 28,
          boxShadow: '0 3px 0 #b94a28', margin: '0 auto 18px',
        }}>₹</div>
        <h1 style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 26, letterSpacing: '-.02em', margin: '0 0 6px' }}>Tally</h1>
        <div style={{ fontSize: 13, color: '#9b9081', fontWeight: 500, marginBottom: 28 }}>Personal finance, signed in just for you</div>

        <button
          onClick={onSignIn}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%',
            border: '1.5px solid #e6dccb', background: '#fff', color: '#221c17', borderRadius: 12,
            padding: '12px 16px', fontWeight: 700, fontSize: 14, cursor: 'pointer',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
            <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
            <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
          </svg>
          Sign in with Google
        </button>

        {error && (
          <div style={{ fontSize: 13, color: '#c0392b', fontWeight: 600, marginTop: 14 }}>{error}</div>
        )}
      </div>
    </div>
  );
}
