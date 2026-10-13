'use client';

import { useState } from 'react';
import Latex from '../../Latex';
import TextoConLatex from '../../TextoConLatex';
import type { PasoSolucion } from '@/lib/problemas';

interface Props {
    pasos: PasoSolucion[];
    resultado: string;
    observaciones?: string;
}

export default function SolucionGuiada({ pasos, resultado, observaciones }: Props) {
    const [visibles, setVisibles] = useState(0);
    const total = pasos.length;
    const terminado = visibles >= total;

    return (
        <section className="mt-6">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Solución guiada</h2>
                <span className="text-xs text-slate-500">
                    {visibles} de {total} pasos
                </span>
            </div>

            <ol className="space-y-4">
                {pasos.slice(0, visibles).map((p, i) => (
                    <li
                        key={p.paso}
                        className={`rounded-xl border bg-white p-5 ${i === visibles - 1 ? 'border-indigo-300 shadow-sm' : 'border-slate-200'
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                                {p.paso}
                            </span>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm text-slate-600">
                                    <TextoConLatex texto={p.nota_teorica} />
                                </p>
                                <div className="mt-3 overflow-x-auto rounded-lg bg-slate-50 p-3 text-indigo-900">
                                    <Latex formula={p.expresion_latex} displayMode />
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ol>

            <div className="mt-5 flex flex-wrap gap-3">
                {!terminado && (
                    <>
                        <button
                            onClick={() => setVisibles((v) => v + 1)}
                            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                        >
                            {visibles === 0 ? 'Ver primer paso' : 'Mostrar siguiente paso'}
                        </button>
                        <button
                            onClick={() => setVisibles(total)}
                            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                        >
                            Mostrar todo
                        </button>
                    </>
                )}
                {visibles > 0 && (
                    <button
                        onClick={() => setVisibles(0)}
                        className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800"
                    >
                        Reiniciar
                    </button>
                )}
            </div>

            {terminado && (
                <div className="mt-6 space-y-4">
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                            Resultado final
                        </h3>
                        <div className="mt-2 overflow-x-auto text-emerald-900">
                            <Latex formula={resultado} displayMode />
                        </div>
                    </div>

                    {observaciones && (
                        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                            <span className="font-semibold">Nota sobre el enunciado: </span>
                            <TextoConLatex texto={observaciones} />
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}