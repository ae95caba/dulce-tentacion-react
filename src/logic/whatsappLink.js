export function createWhatsAppLink(phoneNumber, message) {
  // Remove any non-digit characters from the phone number
  phoneNumber = phoneNumber.replace(/\D/g, "");

  // Encode the message text for use in the URL
  message = encodeURIComponent(message);

  // Create the WhatsApp link with the phone number and pre-filled message
  var link =
    "https://api.whatsapp.com/send?phone=" + phoneNumber + "&text=" + message;

  // Return the link
  return link;
}
// to make a line break use "\n"
//tabs are visible on whatsapp
function message(cartItems, deliveryDetails, userData) {
  console.log(userData.email);
  let itemList = "";
  cartItems.forEach((item) => {
    if (!item.flavoursArr) {
      itemList += `* ${item.name} X ${item.count}\n`;
    } else {
      //flavours
      let flavours = "		Sabores:\n";
      item.flavoursArr.forEach((flavour) => {
        flavours += `			-${flavour.required}\n`;
      });
      //////////
      //extras
      let extras = "		Extras:\n";
      if (item.extras.conos.count > 0) {
        console.log(item.extras.conos.count);
        extras += `			-Conos X ${item.extras.conos.count}\n`;
      }
      if (item.extras.rocklets.isChecked) {
        extras += `			-Rocklets\n`;
      }
      if (item.extras.salsa.type) {
        extras += `			-Salsa de ${item.extras.salsa.type}\n`;
      }
      //////////
      itemList += `* ${item.name}:
${flavours}${extras}`;
    }
  });

  return `Orden:
		
${itemList}	
Datos para el delivery:
		Barrio: ${deliveryDetails.barrio}
		Direccion: ${deliveryDetails.direccion}
		Entrecalles: ${deliveryDetails.entreCalles}${
    deliveryDetails.aditionalInfo
      ? `\n		Extra: ${deliveryDetails.aditionalInfo}`
      : ""
  }

Datos personales:
		Nombre: ${userData.name}
		Email: ${userData.email}
`;
}

/* export const link = createWhatsAppLink("5491121690959", message);
 */
export function link(cartItems, deliveryDetails, userData) {
  return createWhatsAppLink(
    "5491121690959",
    message(cartItems, deliveryDetails, userData)
  );
}
