// Metadata
import type { Metadata } from 'next';

// Stilos y componentes
import './globals.css';
import { Oswald } from 'next/font/google';
import Sidebars from '@/components/Sidebars/Sidebars';
import NavbarDashboard from '@/components/NavbarDashboard/NavbarDashboard';
import Footer from '@/components/Footer/Footer';
import { Mostrar, Ocultar } from '@/components/ui';

const oswald = Oswald({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Consorcify',
    description: 'Tus administraciones en un click',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`bg-fondo text-white ${oswald.className}`}>
                <Ocultar>
                    <Sidebars />
                    <NavbarDashboard />
                </Ocultar>
                {children}
                <Mostrar>
                    <Footer />
                </Mostrar>
            </body>
        </html>
    );
}
