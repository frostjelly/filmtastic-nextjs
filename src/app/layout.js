import Image from "next/image";
import "./globals.css";
import NavBar from "./components/NavBar";

export const metadata = {
  title: "Filmtasic",
  description: "It's Simply Filmtastic!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="./popcorn.png" />
      <body className={`h-screen max-w-7xl m-auto -50`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
