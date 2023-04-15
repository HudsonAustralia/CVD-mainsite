import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CustomFonts } from "../styles/CustomFont";
import mantineTheme from "../styles/theme/mantineTheme";
import { MantineProvider } from "@mantine/core";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0"
        ></meta>
      </Head>
      <MantineProvider theme={mantineTheme} withGlobalStyles withNormalizeCSS>
        <CustomFonts />
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
