'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Latex from './Latex';
import TextoConLatex from './TextoConLatex';
import Condicion from './Condicion';
import { DatosTema } from '@/lib/problemas';

const renderEstrellas = (dificultad: string) => {
    const dif = (dificultad || '').toLowerCase();
    let count = 1;
    if (dif === 'media') count = 2;
    if (dif === 'alta') count = 3;

    return (
        <div className="flex items-center space-x-1" title={`Dificultad: ${dificultad}`}>
            {[...Array(3)].map((_, i) => (
                <svg
                    key={i}
                    className={`w-4 h-4 ${i < count ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
            ))}
        </div>
    );
};

export default function ListaProblemas({ temas }: { temas: DatosTema[] }) {
    const router = useRouter();
    const [temaSeleccionadoId, setTemaSeleccionadoId] = useState<string>(
        temas[0]?.id || ''
    );

    const temaActual = temas.find((t) => t.id === temaSeleccionadoId) || temas[0];

    const seleccionarProblema = (id: string) => {
        router.push(`/problema/${id}`);
    };

    if (!temaActual) return null;

    return (
        <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

                {/* Selector de Temas */}
                <div className="mb-6">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                        Temas disponibles:
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {temas.map((t) => {
                            const activo = t.id === temaActual.id;
                            return (
                                <button
                                    key={t.id}
                                    type="button"
                                    onClick={() => setTemaSeleccionadoId(t.id)}
                                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                                        activo
                                            ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                                            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                                    }`}
                                >
                                    <span>{t.metadata.tema}</span>
                                    <span
                                        className={`text-xs px-2 py-0.5 rounded-full ${
                                            activo
                                                ? 'bg-indigo-700 text-indigo-100'
                                                : 'bg-slate-100 text-slate-600'
                                        }`}
                                    >
                                        {t.preguntas.length}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Cabecera / Títulos dinámicos */}
                <header className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
                    <div className="text-xs font-semibold tracking-wider text-indigo-600 uppercase mb-1">
                        {temaActual.metadata.institucion} — {temaActual.metadata.facultad}
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        {temaActual.metadata.materia ?? 'Matemáticas'}: {temaActual.metadata.tema}
                    </h1>
                    <p className="text-sm text-slate-500 mt-2">
                        {temaActual.metadata.descripcion ??
                            'Selecciona un problema de examen para ver su resolución paso a paso y explicaciones guiadas.'}
                    </p>
                </header>

                {/* Pila de Problemas Matemáticos */}
                <div className="space-y-4">
                    {temaActual.preguntas.map((item) => (
                        <div
                            key={item.id_pregunta}
                            onClick={() => seleccionarProblema(item.id_pregunta)}
                            className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer relative group"
                        >
                            {/* Estrellas de Dificultad en la parte superior derecha */}
                            <div className="absolute top-6 right-6 flex items-center space-x-2">
                                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider hidden sm:inline">
                                    {item.metadata.dificultad}
                                </span>
                                {renderEstrellas(item.metadata.dificultad)}
                            </div>

                            {/* Metadatos secundarios de la tarjeta */}
                            <div className="flex flex-wrap items-center gap-2 mb-3 pr-24">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                    {item.metadata.problema}
                                </span>
                                <span className="text-xs text-slate-500 font-medium">
                                    Gestión / Año: {item.metadata.anio}
                                </span>
                                {item.metadata.examen && (
                                    <span className="text-xs text-indigo-600 font-medium bg-indigo-50 px-2.5 py-0.5 rounded-full">
                                        {item.metadata.examen}
                                    </span>
                                )}
                            </div>

                            {/* Enunciado y Ecuación resumida */}
                            <div className="mt-2">
                                <p className="text-sm font-medium text-slate-700 mb-2">
                                    <TextoConLatex texto={item.enunciado.texto_markdown} />
                                </p>
                                <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-indigo-900 overflow-x-auto">
                                    <Latex formula={item.enunciado.ecuacion_latex} displayMode />
                                </div>
                                <Condicion enunciado={item.enunciado} />
                            </div>

                            {/* Pie de tarjeta con indicador de acción */}
                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                                <span>ID: {item.id_pregunta}</span>
                                <span className="font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform inline-flex items-center">
                                    Ver resolución guiada &rarr;
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </main>
    );
}