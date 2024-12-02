import './globals.css';
import { Inter } from 'next/font/google';
import SessionWrapper from './components/SessionWrapper';





const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '123digit@l',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}