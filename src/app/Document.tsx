import NavBar from "./pages/components/NavBar";
import "./pages/index.scss";

import { Layout } from "./pages/components/Layout";
export const Document: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Collabjam</title>
      <link rel="modulepreload" href="/src/client.tsx" />
      <link rel="icon" type="image/x-icon" href="../src/app/pages/img/logo.png"></link>
      <link rel="preload" as="style" href="/src/app/pages/index.css" />
      <link rel="stylesheet" href="/src/app/pages/index.css" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="preload"
        as="style"
        href="https://fonts.googleapis.com/css2?family=Rethink+Sans:ital,wght@0,400..800;1,400..800&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Rethink+Sans:ital,wght@0,400..800;1,400..800&display=swap"
      />
      <noscript>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Rethink+Sans:ital,wght@0,400..800;1,400..800&display=swap"
        />
      </noscript>
    </head>
    <body>
      <div id="root">
        <script type="module">
          import("/src/client.tsx");
        </script>
        {/* Layout wraps NavBar and main so it's present on every page */}
        <div id="app-root"><Layout>{children}</Layout></div>
      </div>
      
    </body>
  </html>
);
