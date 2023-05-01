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

const zona1 = ["El Hornero", "La Loma", "Rayito de Sol"];
const zona2 = [
  "Los Aromos",
  "San Patricio",
  "Don Rolando",
  "Santa Catalina",
  "Santa Isabel",
  "Sarmiento",
  "El Zorzal",
  "Bicentenario",
  /* "La Milagrosa(por Paraguay)", */
  "La Milagrosa",
  "La Paz",
];
const zona3 = [
  "El Lucero",
  "Cuatro Esquinas",
  "La Recova",
  "La Capilla",
  "Martin Fierro",
  "El Prado",

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

//function to get price from barrio
export function priceFromBarrio(barrio) {
  let price = undefined;
  switch (true) {
    case zona1.includes(barrio):
      price = 0;
      break;
    case zona2.includes(barrio):
      price = 100;
      break;
    case zona3.includes(barrio):
      price = 200;
      break;
    case zona4.includes(barrio):
      price = 300;
      break;
    case zona5.includes(barrio):
      price = 400;
      break;
    default:
      // code to execute if barrio is not in any of the zones
      break;
  }
  console.log(barrio);
  console.log(price);
  return price;
}
