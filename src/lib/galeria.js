// Las 12 imágenes de ejemplo, ordenadas por nombre
const mods = import.meta.glob('../assets/galeria/*.jpg', { eager: true });
export const galeria = Object.keys(mods)
  .sort()
  .map((k, i) => ({ img: mods[k].default, alt: `Ilustración de ejemplo ${i + 1} (generada con degradados)` }));
