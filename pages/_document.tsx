import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />

      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
