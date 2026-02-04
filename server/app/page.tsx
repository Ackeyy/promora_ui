export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '480px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>Promora API</h1>
      <p style={{ color: '#888', marginBottom: '1rem' }}>
        This is the backend. There is no UI here.
      </p>
      <p>
        Open the <strong>frontend</strong> at{' '}
        <a href="http://localhost:5173" style={{ color: '#a855f7' }}>
          http://localhost:5173
        </a>{' '}
        to use the app.
      </p>
    </div>
  );
}
