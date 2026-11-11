// Contenido 100 % ficticio para la demo corporativa "Nodo Tecnología S.A."
const mods = import.meta.glob('../assets/corp/*.jpg', { eager: true });
export const foto = (id) => mods[`../assets/corp/p${id}.jpg`].default;

export const empresa = {
  nombre: 'Nodo Tecnología S.A.',
  corto: 'Nodo',
  ciudad: 'Montevideo, Uruguay (ficticio)',
  correo: 'hola@nodo-demo.example',
};

export const infra = [
  {
    slug: 'servidores-y-almacenamiento', titulo: 'Servidores y almacenamiento', foto: 36,
    resumen: 'Equipamiento dimensionado a tu carga real, con respaldo y soporte.',
    intro: 'Diseñamos, instalamos y mantenemos servidores y almacenamiento para que tus aplicaciones tengan el rendimiento que necesitan, hoy y cuando crezcas.',
    puntos: ['Relevamiento y dimensionamiento de capacidad', 'Servidores físicos y virtualizados', 'Almacenamiento con redundancia y snapshots', 'Planes de respaldo y recuperación ante desastres'],
  },
  {
    slug: 'redes-y-conectividad', titulo: 'Redes y conectividad', foto: 88,
    resumen: 'Redes cableadas e inalámbricas estables, seguras y documentadas.',
    intro: 'Una red bien diseñada es invisible: simplemente funciona. Planificamos cableado, WiFi y enlaces para que todo tu equipo trabaje sin interrupciones.',
    puntos: ['Cableado estructurado y WiFi empresarial', 'Segmentación por áreas y redes de invitados', 'Enlaces redundantes y balanceo', 'Monitoreo y alertas de disponibilidad'],
  },
  {
    slug: 'ciberseguridad', titulo: 'Ciberseguridad', foto: 84,
    resumen: 'Protección por capas: usuarios, equipos, red y datos.',
    intro: 'La seguridad no es un producto, es un proceso. Evaluamos riesgos, protegemos lo importante y capacitamos a las personas, que son la primera línea de defensa.',
    puntos: ['Diagnóstico de riesgos y vulnerabilidades', 'Protección de equipos y correo', 'Control de accesos y doble factor', 'Concientización y simulacros de phishing'],
  },
  {
    slug: 'nube-y-datacenter', titulo: 'Nube y datacenter', foto: 56,
    resumen: 'Migración y operación en nube pública, privada o híbrida.',
    intro: 'Te ayudamos a decidir qué conviene tener en la nube y qué no, migramos con un plan sin sorpresas y operamos el ambiente después.',
    puntos: ['Evaluación de costos y arquitectura', 'Migración por etapas sin cortes largos', 'Entornos híbridos y conexión segura', 'Optimización continua del gasto'],
  },
];

export const servicios = [
  {
    slug: 'soporte-tecnico', titulo: 'Soporte técnico', foto: 3,
    resumen: 'Mesa de ayuda y soporte en sitio, con tiempos de respuesta acordados.',
    intro: 'Un equipo que responde cuando algo falla y se ocupa de que no vuelva a pasar. Soporte remoto y presencial, con tickets y reportes mensuales.',
    puntos: ['Mesa de ayuda en horario extendido', 'Soporte en sitio en Montevideo y alrededores', 'Acuerdos de nivel de servicio (SLA) por escrito', 'Inventario y gestión de equipos'],
  },
  {
    slug: 'consultoria', titulo: 'Consultoría', foto: 7,
    resumen: 'Planificación tecnológica alineada con los objetivos del negocio.',
    intro: 'Antes de comprar tecnología, conviene saber para qué. Trabajamos con tu equipo para priorizar inversiones y armar un plan realista.',
    puntos: ['Diagnóstico tecnológico integral', 'Hoja de ruta a 12 y 24 meses', 'Selección de proveedores y licencias', 'Gestión de proyectos de TI'],
  },
  {
    slug: 'outsourcing', titulo: 'Outsourcing de TI', foto: 1,
    resumen: 'Tu área de tecnología, operada por especialistas, a costo predecible.',
    intro: 'Sumamos un equipo completo a tu empresa sin los costos y tiempos de armarlo desde cero. Pagás una cuota mensual y nosotros respondemos por el servicio.',
    puntos: ['Responsable técnico dedicado', 'Operación diaria de usuarios y servidores', 'Reportes y reuniones de seguimiento', 'Escalabilidad según el crecimiento'],
  },
  {
    slug: 'desarrollo-de-software', titulo: 'Desarrollo de software', foto: 0,
    resumen: 'Aplicaciones web y móviles a medida, rápidas y mantenibles.',
    intro: 'Construimos herramientas a medida cuando lo que existe no alcanza: sistemas de gestión, portales de clientes e integraciones, con foco en velocidad y simplicidad.',
    puntos: ['Aplicaciones web y móviles', 'Integración con sistemas existentes', 'Interfaces rápidas y accesibles', 'Mantenimiento y evolución continua'],
  },
];

export const casos = [
  {
    slug: 'distribuidora-del-plata', cliente: 'Distribuidora del Plata', sector: 'Distribución', foto: 2,
    titulo: 'Red y servidores nuevos para una distribuidora en crecimiento',
    resumen: 'Modernización de la red de tres depósitos y migración del sistema de gestión.',
    desafio: 'La empresa había crecido de uno a tres depósitos y la red original se caía en horas pico, frenando la facturación.',
    solucion: 'Rediseñamos la red, instalamos enlaces redundantes entre sedes y migramos el sistema de gestión a servidores virtualizados con respaldo diario.',
    resultados: ['Cero cortes de red en horario comercial desde la puesta en marcha', 'Facturación sin demoras en horas pico', 'Recuperación de datos probada con simulacros trimestrales'],
  },
  {
    slug: 'clinica-santa-lucia', cliente: 'Clínica Santa Lucía', sector: 'Salud', foto: 9,
    titulo: 'Ciberseguridad y continuidad para una clínica',
    resumen: 'Protección de historias clínicas y plan de continuidad operativa.',
    desafio: 'Datos sensibles de pacientes, equipos heterogéneos y poca visibilidad sobre quién accedía a qué.',
    solucion: 'Implementamos control de accesos con doble factor, protección de equipos y correo, y un plan de respaldo y recuperación documentado.',
    resultados: ['Accesos auditables por usuario y sistema', 'Capacitación al 100 % del personal administrativo', 'Plan de recuperación con tiempos de restauración definidos'],
  },
  {
    slug: 'estudio-contable-ferrer', cliente: 'Estudio Contable Ferrer', sector: 'Servicios profesionales', foto: 6,
    titulo: 'Del papel a la nube: un estudio contable sin servidor propio',
    resumen: 'Migración a la nube y trabajo remoto seguro para todo el equipo.',
    desafio: 'Archivos dispersos en equipos personales y un servidor viejo que nadie quería tocar.',
    solucion: 'Migramos documentos y correo a la nube, configuramos acceso remoto seguro y dimos soporte durante la transición.',
    resultados: ['Información centralizada y respaldada', 'Equipo trabajando desde cualquier lugar', 'Servidor antiguo retirado, con menor costo mensual'],
  },
];

export const numeros = [
  ['15+', 'años de trayectoria (ficticio)'],
  ['120', 'clientes activos (ficticio)'],
  ['24/7', 'monitoreo de infraestructura'],
  ['98 %', 'tickets resueltos en plazo (ficticio)'],
];

export const clientes = ['Distribuidora del Plata', 'Clínica Santa Lucía', 'Estudio Ferrer', 'Cooperativa Río Negro', 'Hotel Costa Azul', 'Aceros del Este'];

export const faqs = [
  ['¿Atienden empresas pequeñas?', 'Sí. Armamos planes según el tamaño y las necesidades de cada empresa.'],
  ['¿Cuánto tarda un diagnóstico?', 'Entre una y dos semanas, según la cantidad de sedes y sistemas.'],
  ['¿Trabajan fuera de Montevideo?', 'Sí, con soporte remoto y visitas coordinadas en el interior.'],
];
