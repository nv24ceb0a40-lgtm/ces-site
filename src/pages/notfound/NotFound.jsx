import { Link } from 'react-router-dom';
  import useDocumentTitle from '../../hooks/useDocumentTitle';

export default function NotFound() {
useDocumentTitle('Page not found');
  return (
    <main style={{ padding: '96px 32px', minHeight: '60vh', textAlign: 'center' }}>
      <h1>404: Page not found</h1>
      <p>That page doesn't exist.</p>
      <Link to="/">Back to home</Link>
    </main>
  );
}