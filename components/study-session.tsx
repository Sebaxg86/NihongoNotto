"use client";

import {createContext,useContext,useState,type Dispatch,type SetStateAction} from 'react';

export type TranslationResult={original:string;source:string;translated:string;japanese:string;kana:string;romaji:string};
type Draft={direction:string;text:string;result:TranslationResult|null;saved:boolean;saving:boolean};
const StudySession=createContext<{draft:Draft;setDraft:Dispatch<SetStateAction<Draft>>}|null>(null);

// La memoria pertenece al espacio autenticado y se descarta al salir de él.
export function StudySessionProvider({children}:{children:React.ReactNode}){
 const [draft,setDraft]=useState<Draft>({direction:'es',text:'',result:null,saved:false,saving:false});
 return <StudySession.Provider value={{draft,setDraft}}>{children}</StudySession.Provider>;
}
export function useStudySession(){
 const session=useContext(StudySession);
 if(!session)throw new Error('La traducción requiere un espacio de estudio.');
 return session;
}
