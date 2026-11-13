import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./workspace.css";
import "./mobile.css";
export const viewport: Viewport = {width:"device-width",initialScale:1,viewportFit:"cover",themeColor:"#eef2f5",colorScheme:"light",interactiveWidget:"resizes-content"};
export const metadata: Metadata = {title:{default:"NihongoNotto · Tu cuaderno de japonés",template:"%s · NihongoNotto"},description:"Aprende japonés una nota a la vez.",applicationName:"NihongoNotto",appleWebApp:{capable:true,title:"NihongoNotto",statusBarStyle:"default"},icons:{apple:"/icons/apple-touch-icon.png"}};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="es"><body>{children}</body></html>; }
