Action:  Open your web browser and visit 'http://localhost:3000.
STEP 1:  REGISTERING A USER
Expected Results: The registration page with a form for email, password, and name should be displayed.

STEP 2:  Submit Valid Registration Form
Action:  Fill in the registration form with a valid email (e.g., 'testuser@example.com'), password (at least 8 characters), and name (e.g., 'Test User'). Click the 'Register' button.
Expected Results: A success message saying 'User registered successfully' should be displayed.

Step 3:  Submit Registration Form with Invalid Email
Action:  Fill in the registration form with an invalid email (e.g., 'invalid-email'), a valid password (at least 8 characters), and name. Click the 'Register' button.
Expected Results: An error message saying 'Invalid email format' should be displayed.

Step 4:  Submit Registration Form with Short Password
Action:  Fill in the registration form with a valid email, a short password (e.g., 'short'), and name. Click the 'Register' button.
Expected Results: An error message saying 'Password must be at least 8 characters long' should be displayed.

Step 5:  Submit Registration Form with Short Name
Action:  Fill in the registration form with a valid email, a valid password, and a short name (e.g., 'A'). Click the 'Register' button.
Expected Results: An error message saying 'Name must be between 2 and 50 characters' should be displayed.

Step 6:  Submit Registration Form with Long Name
Action:  Fill in the registration form with a valid email, a valid password, and a long name (e.g., 51 characters). Click the 'Register' button.
Expected Results: An error message saying 'Name must be between 2 and 50 characters' should be displayed.


Step 1:  LOGIN A USER
Action:  Open your web browser and visit 'http://localhost:3000/login'.
Expected Results: The login page should be displayed with fields for email and password.

Step 2:  Enter Valid Credentials
Action:  Enter the email and password of a registered user into the login form and click the 'Login' button.
Expected Results: You should be successfully logged in and redirected to the dashboard page.
