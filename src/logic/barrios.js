export const barriosMP = [
  "Sarmiento",
  "El Hornero",
  "Rayito de Sol",
  "La Loma",
  "Santa Catalina",
  "El Zorzal",
  "Bicentenario",
  "El Lucero",
  "La Milagrosa",
  "La Paz",
  "La Recova",
  "Los Aromos",
  "San Patricio",
  "Don Rolando",
  "Cuatro Esquinas",
  "La Capilla",
  "Santa María",
  "El Palenque",
  "Independencia",
  "Killys",
  "Sánchez",
  "Gándara",
  "El Pinar",
  "Malvinas",
  "La Sofia",
  "La Escondida",
  "San Eduardo",
  "La Trocha",
  "Martín Fierro",
  "El Prado",
  "Las Talitas",
  "El Tonel",
  "Güemes",
  "Fonavi",
];

const zona1 = ["El Hornero", "La Loma"];
const zona2 = [
  "Los Aromos",
  "San Patricio",
  "Don Rolando",
  "Santa Catalina",
  "El Zorzal",
  "Bicentenario",
  "La Milagrosa",
];
const zona3 = [
  "El Lucero",
  "Cuatro Esquinas",
  "La Recova",
  "La Capilla",
  "Martin Fierro",
  "El Prado",
  "Sarmiento",
  "Güemes",
  "La Trocha",
  "Las Talitas",
  "El Tonel",
  "Fonavi",
  "Independencia",
];

const zona4 = [
  "Santa María",
  "El Palenque",

  "Killys",
  "Sánchez",
  "Gándara",
  "El Pinar",

  "La Sofia",
  "La Escondida",
  "San Eduardo",
  "Las Talitas",
];

const zona5 = ["Malvinas"];

export const options = barriosMP.sort().map((barrio) => ({
  value: barrio.toLowerCase(),
  label: barrio,
}));
