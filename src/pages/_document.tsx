import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Meta tags like description can be here, but not the title */}
        <meta name="description" content="AI Conversational Platform" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="/favicon.ico" as="image" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
