import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="relative flex min-h-screen flex-col overflow-x-clip">
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute left-[-12rem] top-[-10rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(229,171,130,0.28),transparent_68%)] blur-3xl" />
      <div className="absolute right-[-8rem] top-[18rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(116,149,118,0.16),transparent_70%)] blur-3xl" />
      <div className="absolute bottom-[-10rem] left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(221,146,99,0.12),transparent_72%)] blur-3xl" />
    </div>
    <Header />
    <main className="relative flex-1">{children}</main>
    <Footer />
  </div>
);

export default Layout;
