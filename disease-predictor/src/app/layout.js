import "./globals.css";
import Navbar from "@/components/NavBar";
import { AnimateProvider } from '@/context/context';
import { AiChatDataProvider } from "@/context/aiChatContext";
import FloatingChat from "@/components/FloatingChat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-montserrat`}>
        <AnimateProvider>
          <Navbar />
          {children}
          <AiChatDataProvider>
            <FloatingChat />
          </AiChatDataProvider>
        </AnimateProvider>
      </body>
    </html>
  );
}

