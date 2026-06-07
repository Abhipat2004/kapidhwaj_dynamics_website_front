import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LogoIntro from '@/components/LogoIntro';
import GlobalBackground from '@/components/GlobalBackground';

import CursorSparkle from '@/components/CursorSparkle';

export const metadata: Metadata = {
  title: 'KapiDhwaj Dynamics — Next-Gen Drone Detection Systems',
  description: 'KapiDhwaj Dynamics builds cutting-edge drone detection and counter-drone systems for military, research labs, and enterprise deployments. Defend your airspace with AI-powered precision.',
  keywords: 'drone detection, counter-drone, UAV detection, defence technology, military robotics, airspace security, KapiDhwaj Dynamics',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GlobalBackground />
        <CursorSparkle />
        <LogoIntro />
        <Navbar />
        <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
