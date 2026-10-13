import { obtenerTemas } from '@/lib/problemas';
import ListaProblemas from './ListaProblemas';

export const instant = false;

export default async function Page() {
  const temas = await obtenerTemas();

  return <ListaProblemas temas={temas} />;
}