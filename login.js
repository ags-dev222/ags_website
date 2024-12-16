document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = {
      username: e.target.username.value,
      password: e.target.password.value,
      remember: e.target.remember.checked,
  };

  console.log('Login Data Submitted:', formData);

  // Simulate login success or failure
  const success = false; // Simulate failure

  if (success) {
    alert('Login successful!');
    // Redirect or perform actions after login success
  } else {
    document.getElementById('errorMessage').classList.remove('hidden');
  }
});

// Password visibility toggle
document.getElementById('togglePassword').addEventListener('click', () => {
  const passwordField = document.getElementById('password');
  const passwordFieldType = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordField.setAttribute('type', passwordFieldType);
});



