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
