import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { SimpleAuthenticationDetailsProvider, Region } from 'oci-common';
import { AIServiceLanguageClient } from 'oci-ailanguage';
import Kuroshiro from 'kuroshiro';
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji';
let reader: Promise<Kuroshiro> | undefined;
let analyzer: KuromojiAnalyzer;
function getReader() {
 if(!reader) reader=(async()=>{const k=new Kuroshiro();analyzer=new KuromojiAnalyzer({dictPath:path.join(process.cwd(),'node_modules','kuromoji','dict')});await k.init(analyzer);return k;})().catch(e=>{reader=undefined;throw e;});
 return reader;
}
function env(name:string){const value=process.env[name];if(!value)throw new Error(`Missing configuration: ${name}`);return value;}
export async function translate(text:string,source:'es'|'ja') {
 const key=process.env.OCI_PRIVATE_KEY?.replace(/\\n/g,'\n') || await readFile(env('OCI_PRIVATE_KEY_PATH'),'utf8');
 const provider=new SimpleAuthenticationDetailsProvider(env('OCI_TENANCY_OCID'),env('OCI_USER_OCID'),env('OCI_FINGERPRINT'),key,null,Region.fromRegionId(env('OCI_REGION')));
 const client=new AIServiceLanguageClient({authenticationDetailsProvider:provider});
 try {
 const response=await client.batchLanguageTranslation({batchLanguageTranslationDetails:{compartmentId:env('OCI_COMPARTMENT_OCID'),targetLanguageCode:source==='es'?'ja':'es',documents:[{key:'text',text,languageCode:source}]}});
 const data=response.batchLanguageTranslationResult;
 const translated=data.documents?.[0]?.translatedText;
 if(!translated||data.errors?.length)throw new Error('Oracle translation failed');
 const japanese=source==='ja'?text:translated;
 const k=await getReader();
 // Analizar la oración completa para conservar el contexto y el katakana original.
 const tokens=await analyzer.parse(japanese);
 const kanaParts=tokens.map(token=> /[\p{Script=Han}々]/u.test(token.surface_form) && token.reading
   ? token.reading.replace(/[ァ-ヶ]/g,char=>String.fromCharCode(char.charCodeAt(0)-0x60)) : token.surface_form);
 const romaji=await k.convert(japanese,{to:'romaji',mode:'spaced',romajiSystem:'hepburn'});
 return {original:text,source,translated,japanese,kana:kanaParts.join(''),romaji};
 } finally {client.close();}
}
