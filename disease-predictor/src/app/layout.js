import "./globals.css";
import Navbar from "@/components/NavBar";
import { AnimateProvider } from '@/context/context';

export const metadata = {
  title: "MedNexus",
  description: "providing accurate and reliable disease predictions using advanced machine learning algorithms",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-montserrat">
        {/* Only one Navbar inside AnimateProvider */}
        <AnimateProvider>
          <Navbar />
          {children}
        </AnimateProvider>
      </body>
    </html>
  );
}
