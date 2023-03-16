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
function message(cartItems, deliveryDetails) {
  let itemList = "";
  cartItems.forEach((item) => {
    itemList += `${item.name} X ${item.count}\n`;
  });

  return `Orden:
		
${itemList}	
Datos para el delivery:

Barrio: ${deliveryDetails.barrio}
Direccion: ${deliveryDetails.direccion}
Entrecalles: ${deliveryDetails.entreCalles}
${
  deliveryDetails.aditionalInfo
    ? `Extra: ${deliveryDetails.aditionalInfo}`
    : null
}

Datos personales:

Nombre:
Apellido:
Email:
`;
}

/* export const link = createWhatsAppLink("5491121690959", message);
 */
export function link(cartItems, deliveryDetails) {
  return createWhatsAppLink(
    "5491121690959",
    message(cartItems, deliveryDetails)
  );
}
