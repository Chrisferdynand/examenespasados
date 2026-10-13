import teoriaExponentesData from '@/data/teoria_exponentes.json';
import logaritmosData from '@/data/logaritmos.json';
import trigonometriaData from '@/data/trigonometria.json';

export interface MetadataTema {
    institucion: string;
    facultad: string;
    materia?: string;
    tema: string;
    total_preguntas?: number;
    descripcion?: string;
}

export interface PasoSolucion {
    paso: number;
    nota_teorica: string;
    expresion_latex: string;
}

export interface Pregunta {
    id_pregunta: string;
    metadata: {
        institucion: string;
        facultad: string;
        carrera: string;
        materia: string;
        tema: string;
        anio: string;
        problema: string;
        dificultad: string;
        examen?: string;
    };
    enunciado: {
        texto_markdown: string;
        ecuacion_latex: string;
        condicion?: string;
        condicion_latex?: string;
    };
    opciones: unknown[];
    respuesta_correcta: string;
    solucionario_paso_a_paso: PasoSolucion[];
    resultado_final: string;
    observaciones?: string;
}

export interface DatosTema {
    id: string;
    metadata: MetadataTema;
    preguntas: Pregunta[];
}

export const TEMAS: Record<string, DatosTema> = {
    'teoria-exponentes': {
        id: 'teoria-exponentes',
        metadata: teoriaExponentesData.metadata,
        preguntas: teoriaExponentesData.preguntas as Pregunta[],
    },
    'logaritmos': {
        id: 'logaritmos',
        metadata: logaritmosData.metadata,
        preguntas: logaritmosData.preguntas as Pregunta[],
    },
    'trigonometria': {
        id: 'trigonometria',
        metadata: trigonometriaData.metadata,
        preguntas: trigonometriaData.preguntas as Pregunta[],
    }
};

export async function obtenerTemas(): Promise<DatosTema[]> {
    return Object.values(TEMAS);
}

export async function cargarTema(idTema?: string): Promise<DatosTema> {
    if (idTema && TEMAS[idTema]) {
        return TEMAS[idTema];
    }
    return Object.values(TEMAS)[0];
}

export async function buscarProblema(
    idPregunta: string
): Promise<{ problema: Pregunta; tema: DatosTema } | null> {
    for (const tema of Object.values(TEMAS)) {
        const problema = tema.preguntas.find((q) => q.id_pregunta === idPregunta);
        if (problema) {
            return { problema, tema };
        }
    }
    return null;
}