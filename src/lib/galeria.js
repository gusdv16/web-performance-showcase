// Las 12 fotos de ejemplo (ver /creditos/), ordenadas por nombre, con su descripción
const mods = import.meta.glob('../assets/galeria/*.jpg', { eager: true });
const info = [
  { alt: 'Bosque de pinos frente a un mar azul con montañas lejanas', titulo: 'Costa y bosque' },
  { alt: 'Valle con un río y neblina entre colinas verdes', titulo: 'Valle del río' },
  { alt: 'Playa de piedras con pinos y el mar al fondo', titulo: 'Playa de piedras' },
  { alt: 'Costa rocosa con el mar en calma', titulo: 'Costa rocosa' },
  { alt: 'Cascada entre rocas cubiertas de musgo', titulo: 'Cascada escondida' },
  { alt: 'Bahía tranquila con rocas y un tronco en la orilla', titulo: 'Bahía tranquila' },
  { alt: 'Sendero de pasto entre árboles florecidos', titulo: 'Sendero florecido' },
  { alt: 'Bosque verde sobre un arroyo con rocas', titulo: 'Arroyo en el bosque' },
  { alt: 'Colinas doradas bajo un cielo despejado', titulo: 'Colinas doradas' },
  { alt: 'Pueblo de casas blancas y molinos frente al mar', titulo: 'Pueblo blanco' },
  { alt: 'Cumbre rocosa entre nubes', titulo: 'Cumbre entre nubes' },
  { alt: 'Playa de arena con rocas oscuras', titulo: 'Playa y rocas' },
];
export const galeria = Object.keys(mods)
  .sort()
  .map((k, i) => ({ img: mods[k].default, alt: info[i].alt, titulo: info[i].titulo }));
