'use client';

import Latex from './Latex';
import TextoConLatex from './TextoConLatex';

export interface EnunciadoCondicion {
    condicion?: string;
    condicion_latex?: string;
}

export default function Condicion({ enunciado }: { enunciado: EnunciadoCondicion }) {
    if (enunciado.condicion_latex) {
        return (
            <div className="mt-3 inline-flex flex-wrap items-center gap-2 rounded-lg border border-amber-200 bg-amber-50/80 px-3.5 py-1.5 text-xs text-amber-950">
                <span className="font-semibold text-amber-900">Condición:</span>
                <Latex formula={enunciado.condicion_latex} />
            </div>
        );
    }

    const c = enunciado.condicion;
    if (!c) return null;

    // Si ya contiene delimitadores de LaTeX en línea '$'
    if (c.includes('$')) {
        return (
            <div className="mt-3 inline-flex flex-wrap items-center gap-2 rounded-lg border border-amber-200 bg-amber-50/80 px-3.5 py-1.5 text-xs text-amber-950">
                <span className="font-semibold text-amber-900">Condición:</span>
                <span>
                    <TextoConLatex texto={c} />
                </span>
            </div>
        );
    }

    // Texto descriptivo en español sin símbolos matemáticos ni LaTeX
    const hasLatex = /[\\_{}]/.test(c);
    const hasMathSymbols = /[=><^]/.test(c);
    if (!hasLatex && !hasMathSymbols) {
        return (
            <div className="mt-3 inline-flex flex-wrap items-center gap-2 rounded-lg border border-amber-200 bg-amber-50/80 px-3.5 py-1.5 text-xs text-amber-950">
                <span className="font-semibold text-amber-900">Condición:</span>
                <span>{c}</span>
            </div>
        );
    }

    // Caso de punto y coma ';' separando fórmula de texto en español (ej: x \in \mathbb{R}; las raíces...)
    if (c.includes(';')) {
        const [firstPart, ...restParts] = c.split(';');
        const rest = restParts.join(';').trim();
        if (!rest.includes('\\')) {
            const mixto = `$${firstPart.trim()}$; ${rest}`;
            return (
                <div className="mt-3 inline-flex flex-wrap items-center gap-2 rounded-lg border border-amber-200 bg-amber-50/80 px-3.5 py-1.5 text-xs text-amber-950">
                    <span className="font-semibold text-amber-900">Condición:</span>
                    <span>
                        <TextoConLatex texto={mixto} />
                    </span>
                </div>
            );
        }
    }

    // Expresión matemática pura en LaTeX (ej: x > 0, x \neq 1)
    return (
        <div className="mt-3 inline-flex flex-wrap items-center gap-2 rounded-lg border border-amber-200 bg-amber-50/80 px-3.5 py-1.5 text-xs text-amber-950">
            <span className="font-semibold text-amber-900">Condición:</span>
            <Latex formula={c} />
        </div>
    );
}
