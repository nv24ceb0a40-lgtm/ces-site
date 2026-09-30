import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main style={{ padding: '96px 32px', minHeight: '60vh', textAlign: 'center' }}>
      <h1>404: Page not found</h1>
      <p>That page doesn't exist.</p>
      <Link to="/">Back to home</Link>
    </main>
  );
}