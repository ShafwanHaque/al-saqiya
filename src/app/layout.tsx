import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Al Saqiya',
  description: 'Best Air Ticket and Visa Agency in Chittagong. Specialized in Hajj & Umrah and Hotel Booking.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}