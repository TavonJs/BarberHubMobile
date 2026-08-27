import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />

        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body {
                margin: 0;
                padding: 0;
                width: 100%;
                min-height: 100%;
                background: #000;
              }

              body {
                overflow-x: hidden;
              }

              #root {
                min-height: 100vh;
              }
            `,
          }}
        />

        <ScrollViewStyleReset />
      </head>

      <body>{children}</body>
    </html>
  );
}
