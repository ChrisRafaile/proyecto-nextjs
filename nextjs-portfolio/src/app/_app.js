// pages/_app.js
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "../context/AuthContext"; // Tu contexto de autenticación personalizado

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </SessionProvider>
  );
}

export default MyApp;
