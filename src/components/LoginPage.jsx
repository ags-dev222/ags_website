import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
       event.preventDefault();
    
       //  this will just check if the username and password are not empty
       if (username === '' || password === '') {
    
       setError('Please enter both username and password');
       } else {
    
       console.log('Login successful!');
         // Redirect to dashboard or next page
       }
     };

     return (
         <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
              <h2 className="text-2xl font-bold mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                 <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </div>
                <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password:
            </label>
            <input
             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             id="password"
             type="password"
             value={password}
             onChange={(event) => setPassword(event.target.value)}
           />
           </div>
           {error && (
           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
             <span className="block sm:inline">{error}</span>
           </div>
         )}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          > 
           Login
           </button>
         </form>
       </div>
     </div>
  );
}

export default LoginPage;