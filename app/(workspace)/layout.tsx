import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { WorkspaceShell } from "@/components/workspace-shell";
export default async function Layout({children}:{children:React.ReactNode}) {
 const db=await createClient(); const {data:{user},error}=await db.auth.getUser();
 if(error||!user) redirect("/acceso");
 return <WorkspaceShell>{children}</WorkspaceShell>;
}
