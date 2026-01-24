import './globals.css';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Providers from '@/app/components/Providers';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata = {
  title: 'NGO Site - Empowering Communities',
  description: 'Building sustainable futures through education and healthcare.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} font-sans min-h-screen flex flex-col bg-background text-foreground transition-colors duration-500`}>
        <Providers>
          <Navbar />
          <main className="flex-1 animate-in fade-in slide-in-from-bottom duration-700">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}