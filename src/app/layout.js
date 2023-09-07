import Image from "next/image";
import "./globals.css";
import NavBar from "./components/NavBar";

export const metadata = {
  title: "Filmtasic",
  description: "THe Best Movie Database",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`h-screen max-w-7xl m-auto -50`}>
        <NavBar />
        {/* <Image src={`movie-bg.svg`} fill={true} alt='site-background' /> */}
        {children}
      </body>
    </html>
  );
}
