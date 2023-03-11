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
