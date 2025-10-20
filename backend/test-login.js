import axios from 'axios';

async function testLogin() {
  try {
    console.log('Testing login API...');
    
    const response = await axios.post('http://localhost:5002/api/auth/login', {
      email: 'superadmin@agsghana.org',
      password: 'SuperAdmin123!'
    }, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('SUCCESS! Response status:', response.status);
    console.log('Response data:', JSON.stringify(response.data, null, 2));
    
    // Test if user and token exist
    if (response.data.user && response.data.token) {
      console.log('✅ Login response format is correct');
      console.log('User ID:', response.data.user.id);
      console.log('User Role:', response.data.user.role);
      console.log('Token exists:', !!response.data.token);
    } else {
      console.log('❌ Missing user or token in response');
    }
    
  } catch (error) {
    console.error('ERROR! Status:', error.response?.status);
    console.error('Error data:', error.response?.data);
    console.error('Error message:', error.message);
  }
}

testLogin();
