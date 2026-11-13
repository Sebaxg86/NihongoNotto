import type { Metadata } from "next";
import "./globals.css";
import "./workspace.css";
export const metadata: Metadata = {title:{default:"NihongoNotto · Tu cuaderno de japonés",template:"%s · NihongoNotto"},description:"Aprende japonés una nota a la vez."};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="es"><body>{children}</body></html>; }
