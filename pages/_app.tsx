import React from "react";

const MyApp: React.FC = ({ Component, pageProps }: any) => {
  return <Component {...pageProps} />;
};

export default MyApp;
