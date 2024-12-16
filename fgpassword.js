document.getElementById('forgotPasswordForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting

  const email = document.querySelector('input[name="email"]').value;

  // Basic email validation
  if (!email) {
      alert('Please enter a valid email address.');
      return;
  }

  // Show loading or processing message
  const submitButton = document.querySelector('button');
  submitButton.disabled = true;
  submitButton.innerText = "Sending...";

  // Call the API to send password reset link
  fetch('https://your-api-endpoint.com/reset-password', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }), // Sending email as JSON data
  })
  .then(response => response.json())
  .then(data => {
      // If the API responds successfully
      if (data.success) {
          alert('A password reset link has been sent to ' + email);
      } else {
          alert('Error: ' + data.message);
      }
  })
  .catch(error => {
      // If there's an error in the request
      console.error('Error:', error);
      alert('Something went wrong. Please try again later.');
  })
  .finally(() => {
      // Reset the button after request is complete
      submitButton.disabled = false;
      submitButton.innerText = "Send Reset Link";
  });
});
