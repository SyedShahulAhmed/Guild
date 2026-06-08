import { Outfit } from "next/font/google";
import "../styles/globals.css";
import { Toaster } from "sonner";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.variable}>
        {children}
        <Toaster richColors position="top-right"/>
      </body>
    </html>
  );
}
