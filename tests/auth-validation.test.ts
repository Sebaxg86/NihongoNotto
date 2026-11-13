import test from "node:test";
import assert from "node:assert/strict";
import { credentials, callbackDestination, passwordError } from "../lib/auth-validation.ts";
function form(values:Record<string,string>){const f=new FormData();Object.entries(values).forEach(([k,v])=>f.set(k,v));return f;}
test("registro valida correo, nombre y confirmación",()=>{
 const valid={email:" USER@example.com ",password:"a-long-password",confirm_password:"a-long-password",display_name:" Ana "};
 assert.equal(credentials(form(valid),true).email,"user@example.com");
 assert.equal(credentials(form({...valid,confirm_password:"different"}),true).error!==undefined,true);
 assert.equal(credentials(form({...valid,display_name:" "}),true).error!==undefined,true);
 assert.equal(credentials(form({...valid,email:"bad"}),true).error!==undefined,true);
});
test("acceso admite contraseñas existentes sin exigir el mínimo nuevo",()=>{assert.equal(credentials(form({email:"a@b.com",password:"short"})).error,undefined);});
test("callback bloquea redirecciones externas y rutas no autorizadas",()=>{
 for(const value of ["https://evil.example","//evil.example","/admin",null]) assert.equal(callbackDestination(value),"/cuenta");
 assert.equal(callbackDestination("/actualizar-clave"),"/actualizar-clave");
});
test("cambio de contraseña exige confirmación y longitud",()=>{
 assert.ok(passwordError(form({password:"short",confirm_password:"short"})));
 assert.ok(passwordError(form({password:"a-long-password",confirm_password:"other-password"})));
 assert.equal(passwordError(form({password:"a-long-password",confirm_password:"a-long-password"})),null);
});
