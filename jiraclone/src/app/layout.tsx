import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "../components/Navbar";
import ProjectProvider from "@/context/Context";
import DataContextProvider from "@/context/dataContext";
// import { useRouter } from 'next/navigation';

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Jira Clone",
  description: "Jira Clone",
};

export default function RootLayout({
  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <ProjectProvider>
        <DataContextProvider>
          <html lang="en">
            <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
              <Navbar />
              {children}
            </body>
          </html>
        </DataContextProvider>
      </ProjectProvider>
    </GoogleOAuthProvider>
  );
}
