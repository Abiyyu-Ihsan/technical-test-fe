import "../styles/globals.css";
import "../styles/_form-floating.css";
import "../styles/_btn.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Main App */}
        <ThemeProvider attribute="class" defaultTheme="light">
          <Toaster />
          <Component {...pageProps} />
        </ThemeProvider>
    </>
  );
}
