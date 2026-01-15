import type { Metadata } from 'next';
import { Titillium_Web } from 'next/font/google';
import './globals.css';
import ReduxProvider from '@/redux/provider';
import { MainContent } from '@/components/layout/MainContent';
import { Toaster } from 'react-hot-toast';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

const titillium = Titillium_Web({
  weight: ['200', '300', '400', '600', '700', '900'],
  subsets: ['latin'],
  variable: '--font-titillium',
});

export const metadata: Metadata = {
  title: 'E-CUBE Esports - Competitive Gaming Platform',
  description:
    'Join the ultimate esports community at E-CUBE. Participate in top-tier tournaments like Valorant Ultimate Showdown Battleground 1.0, compete for prize pools, and rise through the ranks. Registration is open!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${titillium.variable} overflow-hidden font-sans antialiased`}
      >
        <ReduxProvider>
          <MainContent>{children}</MainContent>
        </ReduxProvider>
        <ScrollToTop />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#161d23',
              color: '#fff',
              border: '1px solid #273440',
            },
            success: {
              iconTheme: {
                primary: '#1895fc',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
