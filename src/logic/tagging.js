// Assuming we have an image that is 1000px wide and 200px tall
const imageWidth = 1000;
const imageHeight = 200;

// Example position of an individual on the image as a percentage
const individualPosition = {
  x: 42, // 42% of the image width, or 420px
  y: 55.5, // 55.5% of the image height, or 111px
};

function checkIndividualClick(event) {
  // Get the coordinates of the click event relative to the image
  const imageRect = event.target.getBoundingClientRect();
  const clickX = event.clientX - imageRect.left; // Example: if the click is at 300px and the left edge of the image is at 100px, clickX will be 200px
  const clickY = event.clientY - imageRect.top; // Example: if the click is at 50px and the top edge of the image is at 20px, clickY will be 30px

  // Convert the click coordinates to percentages
  const clickPosition = {
    x: (clickX / imageRect.width) * 100, // Example: if the click is at 200px and the image is 500px wide, clickPosition.x will be 40%
    y: (clickY / imageRect.height) * 100, // Example: if the click is at 30px and the image is 100px tall, clickPosition.y will be 30%
  };

  // Check if the click is within a certain distance of the individual's position
  const distance = 5; // Assume the user needs to click within 5% of the individual's position
  const distanceX = Math.abs(clickPosition.x - individualPosition.x);
  const distanceY = Math.abs(clickPosition.y - individualPosition.y);
  if (distanceX <= distance && distanceY <= distance) {
    console.log("Congratulations, you found the individual!");
  } else {
    console.log("Sorry, that's not the individual you're looking for.");
  }
}

// Add a click event listener to the image
const image = document.getElementById("my-image");
image.addEventListener("click", checkIndividualClick);
