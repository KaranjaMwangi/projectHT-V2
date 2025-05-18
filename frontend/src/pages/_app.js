import { Poppins } from 'next/font/google';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { AuthProvider } from '../context/AuthContext';

config.autoAddCss = false;

const poppins = Poppins({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <main className={poppins.className}>
        <Component {...pageProps} />
      </main>
    </AuthProvider>
  );
}
