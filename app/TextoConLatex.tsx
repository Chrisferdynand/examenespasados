import Latex from './Latex';

export default function TextoConLatex({ texto }: { texto: string }) {
    const partes = texto.split(/(\$[^$]+\$)/g);

    return (
        <>
            {partes.map((parte, i) =>
                parte.length > 2 && parte.startsWith('$') && parte.endsWith('$') ? (
                    <Latex key={i} formula={parte.slice(1, -1)} />
                ) : (
                    <span key={i}>{parte}</span>
                )
            )}
        </>
    );
}