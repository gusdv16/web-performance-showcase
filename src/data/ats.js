// Datos 100 % inventados para la demo del ATS (vacantes y candidatos)
const areas = ['Tecnología', 'Ventas', 'Marketing', 'Finanzas', 'Operaciones', 'Personas'];
const puestos = {
  Tecnología: ['Desarrollador/a Frontend', 'Desarrollador/a Backend', 'Analista QA', 'Líder de Datos', 'DevOps'],
  Ventas: ['Ejecutivo/a de Cuentas', 'Representante Comercial', 'Gerente de Ventas'],
  Marketing: ['Especialista SEO', 'Diseñador/a Gráfico', 'Community Manager'],
  Finanzas: ['Analista Contable', 'Controller'],
  Operaciones: ['Coordinador/a Logístico', 'Jefe/a de Planta'],
  Personas: ['Analista de Selección', 'Business Partner de RRHH'],
};
const ciudades = ['Montevideo', 'Canelones', 'Maldonado', 'Remoto', 'Híbrido'];
const estados = ['Activa', 'Activa', 'Activa', 'Pausada', 'Cerrada'];

let seed = 2026;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
const pick = (a) => a[Math.floor(rnd() * a.length)];

export const vacantes = [];
let n = 1;
for (const area of areas) {
  for (const puesto of puestos[area]) {
    vacantes.push({
      id: n++,
      titulo: puesto,
      area,
      ciudad: pick(ciudades),
      estado: pick(estados),
      postulantes: Math.floor(rnd() * 90) + 2,
      dias: Math.floor(rnd() * 60) + 1,
    });
  }
}

const nombres = ['Lucía', 'Martín', 'Camila', 'Joaquín', 'Valentina', 'Santiago', 'Florencia', 'Mateo', 'Sofía', 'Nicolás', 'Agustina', 'Facundo'];
const apellidos = ['Pereira', 'Rodríguez', 'Silva', 'Fernández', 'Gómez', 'Díaz', 'Acosta', 'Méndez', 'Techera', 'Cabrera', 'Olivera', 'Núñez'];
export const etapas = ['Nuevos', 'Preselección', 'Entrevista', 'Oferta', 'Contratados'];
export const candidatos = Array.from({ length: 22 }, (_, i) => {
  const nombre = `${nombres[i % nombres.length]} ${apellidos[(i * 5 + 3) % apellidos.length]}`;
  return {
    id: i + 1,
    nombre,
    iniciales: nombre.split(' ').map((p) => p[0]).join(''),
    puesto: vacantes[(i * 3) % vacantes.length].titulo,
    etapa: etapas[Math.min(Math.floor(rnd() * 5), 4)],
    hue: (i * 47) % 360,
  };
});
