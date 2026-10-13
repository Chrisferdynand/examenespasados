import katex from 'katex';
import 'katex/dist/katex.min.css';

interface LatexProps {
    formula: string;
    displayMode?: boolean;
}

// Macros matemáticas habituales en español
const MACROS_ES: Record<string, string> = {
    '\\sen': '\\operatorname{sen}',
    '\\arcsen': '\\operatorname{arcsen}',
    '\\tg': '\\operatorname{tg}',
    '\\arctg': '\\operatorname{arctg}',
    '\\ctg': '\\operatorname{ctg}',
    '\\arcctg': '\\operatorname{arcctg}',
    '\\cosec': '\\operatorname{cosec}',
    '\\senh': '\\operatorname{senh}',
};

export default function Latex({ formula, displayMode = false }: LatexProps) {
    const html = katex.renderToString(formula || '', {
        throwOnError: false,
        displayMode,
        macros: { ...MACROS_ES },
    });

    return <span dangerouslySetInnerHTML={{ __html: html }} />;
}