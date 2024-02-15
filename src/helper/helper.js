import axios from 'axios';
import toast from 'react-hot-toast';
axios.defaults.baseURL = 'http://localhost:3000';


export async function register(userData){    
    try {
        // Make a POST request to register the user
        const response = await axios.post('/register', userData);
        console.log(response);
  
        // Registration successful, show success message
        toast.success(response.message);
        // Additional logic as needed
      } catch (error) {
        if (error.response && error.response.status === 409) {
          // Conflict occurred, show error message
          toast.error(error.respons.message);
          // Additional conflict handling logic
        } else {
          // Other error occurred, show generic error message
          toast.error('An error occurred during registration.');
          // Additional error handling logic
        }
      }
        
}