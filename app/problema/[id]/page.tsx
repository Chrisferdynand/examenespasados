import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buscarProblema } from '@/lib/problemas';
import Latex from '../../Latex';
import TextoConLatex from '../../TextoConLatex';
import Condicion from '../../Condicion';
import SolucionGuiada from './SolucionGuiada';

export default function DetalleProblema({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <Link href="/" className="text-sm font-medium text-indigo-600 hover:underline">
                    &larr; Volver al listado
                </Link>

                <Suspense fallback={<EsqueletoProblema />}>
                    <Problema params={params} />
                </Suspense>
            </div>
        </main>
    );
}

async function Problema({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await buscarProblema(id);

    if (!item) notFound();
    const { problema: p } = item;

    return (
        <>
            <header className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                    {p.metadata.institucion} — {p.metadata.carrera}
                </div>
                <h1 className="mt-1 text-2xl font-extrabold text-slate-900">
                    {p.metadata.problema} · {p.metadata.tema}
                </h1>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-medium text-slate-800">
                        Gestión {p.metadata.anio}
                    </span>
                    {p.metadata.examen && (
                        <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 font-medium text-indigo-700">
                            {p.metadata.examen}
                        </span>
                    )}
                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 font-medium text-amber-800">
                        Dificultad {p.metadata.dificultad}
                    </span>
                </div>

                <div className="mt-5">
                    <p className="text-sm font-medium text-slate-700">
                        <TextoConLatex texto={p.enunciado.texto_markdown} />
                    </p>
                    <div className="mt-2 overflow-x-auto rounded-lg border border-slate-100 bg-slate-50 p-4 text-indigo-900">
                        <Latex formula={p.enunciado.ecuacion_latex} displayMode />
                    </div>
                    <Condicion enunciado={p.enunciado} />
                </div>
            </header>

            <SolucionGuiada
                pasos={p.solucionario_paso_a_paso}
                resultado={p.resultado_final}
            />
        </>
    );
}


function EsqueletoProblema() {
    return (
        <div className="mt-4 animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="h-3 w-1/3 rounded bg-slate-200" />
            <div className="mt-3 h-7 w-2/3 rounded bg-slate-200" />
            <div className="mt-4 flex gap-2">
                <div className="h-5 w-24 rounded-full bg-slate-200" />
                <div className="h-5 w-28 rounded-full bg-slate-200" />
            </div>
            <div className="mt-6 h-20 rounded-lg bg-slate-100" />
        </div>
    );
}