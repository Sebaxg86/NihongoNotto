"use client";
export default function ErrorPage({reset}:{reset:()=>void}) {return <main className="fallback"><h1>No pudimos cargar esta página.</h1><p>Comprueba tu conexión e inténtalo de nuevo.</p><button className="primary" onClick={reset}>Volver a intentar</button></main>;}
