import React from "react";
import { AppProvider } from "@shopify/polaris";
import { Provider } from "@shopify/app-bridge-react";
import { AppProps } from "next/app";
import Head from "next/head";
import Cookies from "js-cookie";

import "@shopify/polaris/dist/styles.css";
import translations from "@shopify/polaris/locales/en.json";

function App({ Component, pageProps }: AppProps): React.ReactNode {
  const config = { apiKey: API_KEY, shopOrigin: Cookies.get("shopOrigin") as string, forceRedirect: true };
  return (
    <React.Fragment>
      <Head>
        <title>Sample Application</title>
        <meta charSet="utf-8" />
      </Head>
      <Provider config={config}>
        <AppProvider i18n={translations}>
          <Component {...pageProps} />
        </AppProvider>
      </Provider>
    </React.Fragment>
  );
}
export default App;
