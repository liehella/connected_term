import { Inter } from "next/font/google";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={`min-h-screen bg-slate-200 px-10 pt-6 ${inter.className}`}>
      <div className="fixed right-10">
        <Link href={"/"}>STallerBurgs</Link>
      </div>
      <div className="flex flex-col items-center pt-2">{children}</div>
    </div>
  );
}
