import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';
import { buildStructuredData } from './seo/structuredData';

export function renderHome(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

export { buildStructuredData };
