export function createWhatsAppLink(phoneNumber, messageString) {
  // Remove any non-digit characters from the phone number
  phoneNumber = phoneNumber.replace(/\D/g, "");

  // Encode the message text for use in the URL
  const encodedMessage = encodeURIComponent(messageString);

  // Create the WhatsApp link with the phone number and pre-filled message
  var link =
    "https://api.whatsapp.com/send?phone=" +
    phoneNumber +
    "&text=" +
    encodedMessage;

  // Return the link
  return link;
}
// to make a line break use "\n"
//tabs are visible on whatsapp
function getMessageString(cartItems, deliveryInfo, totalPrice) {
  function getCartItemsList() {
    let cartItemsList = "";
    //fill itemList
    cartItems.forEach((cartItem) => {
      const product = cartItem.product;
      if (!product.flavoursArr) {
        cartItemsList += `\u{1F6D2} ${product.name} X ${
          cartItem.count
        } | $${cartItem.getTotalPrice()}\n`;
      } else {
        //flavours
        let flavours = "		*Sabores*:\n";
        product.flavoursArr.forEach((flavour) => {
          if (flavour.required) {
            flavours += `			-${flavour.required}\n`;
          }
        });
        //////////
        //extras
        let extras = "		*Extras*:\n";
        if (
          !product.extras.conos.count &&
          !product.extras.rocklets.isChecked &&
          !product.extras.salsa.type
        ) {
          extras = "";
        }
        if (product.extras.conos.count > 0) {
          console.log(product.extras.conos.count);
          extras += `			-Conos X ${product.extras.conos.count}\n`;
        }
        if (product.extras.rocklets.isChecked) {
          extras += `			-Rocklets\n`;
        }
        if (product.extras.salsa.type) {
          extras += `			-Salsa de ${product.extras.salsa.type}\n`;
        }
        //////////
        cartItemsList += `\u{1F6D2} ${product.name} | $${product.price}:
  ${flavours}${extras}`;
      }
    });
    cartItemsList += `*Total: $${totalPrice}*`;
    return cartItemsList;
  }

  return `*Orden*:		
${getCartItemsList()}	

${
  deliveryInfo.isChecked
    ? `*Datos para el delivery*:
		Barrio: ${deliveryInfo.neighborhood}
		Direccion: ${deliveryInfo.address}
		Entrecalles: ${deliveryInfo.crossStreets}${
        deliveryInfo.aditionalInfo
          ? `\n		Extra: ${deliveryInfo.aditionalInfo}`
          : ""
      }`
    : `*Retira en el local*`
}
`;
}

/* export const link = createWhatsAppLink("5491121690959", message);
 */
export function link(cartItems, deliveryInfo, totalPrice) {
  const messageString = getMessageString(cartItems, deliveryInfo, totalPrice);
  return createWhatsAppLink("5491121690959", messageString);
}
