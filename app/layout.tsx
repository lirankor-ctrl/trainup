import type { Metadata, Viewport } from "next";
import { Heebo } from "next/font/google";
import { BottomNav } from "@/components/BottomNav";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TrainUp — רצים מסביב לעולם",
  description: "אפליקציית מעקב הליכה וריצה. כל ק״מ הופך למסע בין ציוני דרך מפורסמים בעולם.",
};

export const viewport: Viewport = {
  themeColor: "#2b8fe6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body className="font-sans antialiased">
        <main className="mx-auto max-w-md px-4 pb-28 pt-6">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
