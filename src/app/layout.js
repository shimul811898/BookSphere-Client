import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "BookSphere",
  description: "Explore the world of books and knowledge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-bangla text-slate-800">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
