import type { Metadata } from 'next';
import { Titillium_Web } from 'next/font/google';
import './globals.css';
import ReduxProvider from '@/redux/provider';
import Navbar from '@/components/layout/Navbar';

const titillium = Titillium_Web({
  weight: ['200', '300', '400', '600', '700', '900'],
  subsets: ['latin'],
  variable: '--font-titillium',
});

export const metadata: Metadata = {
  title: 'Angular Esports - Competitive Gaming Platform',
  description:
    'Join the ultimate esports community at Angular Esports. Participate in top-tier tournaments like Valorant Ultimate Showdown Battleground 1.0, compete for prize pools, and rise through the ranks. Registration is open!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${titillium.variable} font-sans antialiased`}>
        <ReduxProvider>
          <Navbar />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
