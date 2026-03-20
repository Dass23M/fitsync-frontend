import { Geist } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata = {
  title: "FitSync",
  description: "Track your fitness journey",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geist.variable} data-scroll-behavior="smooth">
      <body className="antialiased bg-gray-50 text-gray-900">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}