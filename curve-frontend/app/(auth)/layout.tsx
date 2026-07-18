// import { cn } from "@/lib/utils";
// import { Inter } from "next/font/google";
import '../globals.css'
import { Toaster } from "@/components/ui/sonner";

// const inter = Inter({subsets:['latin'],variable:'--font-sans'});


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <>
      <body className="min-h-full flex flex-col">

        <Toaster position="top-right" richColors />
        {/* Navbar */}
        {children}

        {/* Footer */}
      </body>
    </>
  );
}