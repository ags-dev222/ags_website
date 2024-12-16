// Password requirements elements
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const passwordMismatchMessage = document.getElementById('passwordMismatch');
const passwordRequirements = document.getElementById('passwordRequirements');
const lengthCheck = document.getElementById('lengthCheck');
const uppercaseCheck = document.getElementById('uppercaseCheck');
const lowercaseCheck = document.getElementById('lowercaseCheck');
const numberCheck = document.getElementById('numberCheck');
const specialCharCheck = document.getElementById('specialCharCheck');

// Regular expressions for each requirement
const regex = {
  length: /^(?=.{8,})/,
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /\d/,
  specialChar: /[@$!%*?&]/,
};

// Check password requirements as user types
passwordInput.addEventListener('input', function () {
  const password = passwordInput.value;

  // Check each requirement
  const checks = {
    length: regex.length.test(password),
    uppercase: regex.uppercase.test(password),
    lowercase: regex.lowercase.test(password),
    number: regex.number.test(password),
    specialChar: regex.specialChar.test(password),
  };

  // Update checkbox status and apply styles accordingly
  updateRequirement(lengthCheck, checks.length);
  updateRequirement(uppercaseCheck, checks.uppercase);
  updateRequirement(lowercaseCheck, checks.lowercase);
  updateRequirement(numberCheck, checks.number);
  updateRequirement(specialCharCheck, checks.specialChar);

  // Enable submit button only if all requirements are met
  const allRequirementsMet = Object.values(checks).every(Boolean);
  document.querySelector('button[type="submit"]').disabled = !allRequirementsMet;
});

// Check password mismatch when the confirm password field is typed in
confirmPasswordInput.addEventListener('input', function () {
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  // Show mismatch message and highlight the confirm password field
  if (confirmPassword && confirmPassword !== password) {
    confirmPasswordInput.classList.add('border-red-500');
    confirmPasswordInput.classList.remove('border-green-500');
    passwordMismatchMessage.classList.remove('hidden');
  } else {
    confirmPasswordInput.classList.remove('border-red-500');
    confirmPasswordInput.classList.add('border-green-500');
    passwordMismatchMessage.classList.add('hidden');
  }
});

// Function to update the checkbox status
function updateRequirement(checkbox, isValid) {
  if (isValid) {
    checkbox.checked = true;
    checkbox.nextElementSibling.classList.add('text-green-500');
    checkbox.nextElementSibling.classList.remove('text-red-500');
  } else {
    checkbox.checked = false;
    checkbox.nextElementSibling.classList.add('text-red-500');
    checkbox.nextElementSibling.classList.remove('text-green-500');
  }
}

// Toggle password visibility
document.getElementById('togglePassword').addEventListener('click', function () {
  const passwordField = document.getElementById('password');
  const type = passwordField.type === 'password' ? 'text' : 'password';
  passwordField.type = type;
});

// Toggle confirm password visibility
document.getElementById('toggleConfirmPassword').addEventListener('click', function () {
  const confirmPasswordField = document.getElementById('confirmPassword');
  const type = confirmPasswordField.type === 'password' ? 'text' : 'password';
  confirmPasswordField.type = type;
});

// Form submission handler
document.getElementById('registerForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = {
    fullname: e.target.fullname.value,
    email: e.target.email.value,
    username: e.target.username.value,
    password: e.target.password.value,
    confirmPassword: e.target.confirmPassword.value,
  };

  // Log form data
  console.log('Form Data:', formData);

  // Check for password mismatch before submitting the form
  if (formData.password !== formData.confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  // Simulate successful registration
  console.log('Registration Successful!');
  alert('Registration successful!');
  
  // Simulate redirect to login page (you can replace this with actual redirection in a real scenario)
  window.location.href = 'login.html'; 
});
