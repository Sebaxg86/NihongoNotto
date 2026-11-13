import type {MetadataRoute} from 'next';
export default function manifest():MetadataRoute.Manifest {
 return {id:'/',name:'NihongoNotto',short_name:'NihongoNotto',description:'Tu cuaderno de japonés. Traduce, lee y estudia.',lang:'es',start_url:'/traducir',scope:'/',display:'standalone',background_color:'#eef2f5',theme_color:'#eef2f5',icons:[{src:'/icons/icon-192.png',sizes:'192x192',type:'image/png'},{src:'/icons/icon-512.png',sizes:'512x512',type:'image/png'},{src:'/icon.svg',sizes:'any',type:'image/svg+xml',purpose:'any'}]};
}
