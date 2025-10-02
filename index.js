// Animate skill bars when page loads

window.addEventListener("load", () => {

  document.querySelectorAll(".bar").forEach(bar => {

    let finalWidth = bar.style.width;

    bar.style.width = "0";

    setTimeout(() => {

      bar.style.width = finalWidth;

    }, 500);

  });

});

// Contact Form validation

document.getElementById("contactForm").addEventListener("submit", function(event) {

  event.preventDefault();

  let name = document.getElementById("name").value.trim();

  let email = document.getElementById("email").value.trim();

  let message = document.getElementById("message").value.trim();

  if(name === "" || email === "" || message === "") {

    alert("⚠️ Please fill in all fields.");

  } else {

    alert(`✅ Thank you, ${name}! Your message has been prepared for sending.`);

    // Opens mail client
