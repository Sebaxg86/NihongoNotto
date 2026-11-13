import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { callbackDestination } from "@/lib/auth-validation";
export async function GET(request: NextRequest) {
 const code=request.nextUrl.searchParams.get("code");
 const origin=new URL(process.env.APP_URL!).origin;
 if(code){
  const supabase=await createClient();
  const {error}=await supabase.auth.exchangeCodeForSession(code);
  if(!error) return NextResponse.redirect(new URL(callbackDestination(request.nextUrl.searchParams.get("next")),origin),{headers:{"Cache-Control":"no-store"}});
 }
 return NextResponse.redirect(new URL("/acceso?error=enlace",origin),{headers:{"Cache-Control":"no-store"}});
}
