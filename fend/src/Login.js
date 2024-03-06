import './App.css';
import { useState } from 'react'
function Login() {
    const [formData, setFormData] = useState({
        password: '',
        email: ''
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    // Event handler to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        
        console.log(formData);
        submitForm(formData);
        
        setFormData({ password: '', password: '' });
    };
    async function submitForm(subdata)
    {

    console.log(subdata)
        try {
            const response = await fetch('http://localhost:3000/app/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({'email':subdata.email,'password':subdata.password}),
          });
          if (!response.ok) {
            console.log(`HTTP error! Status: ${response.status}`);
          }
            var json = await response.json();
            
           } catch (e) {
            console.error(e);
        }
    }


  return (
    <div className="">
      <form onSubmit={handleSubmit}>
      
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        password:
        <input
          type="text"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>

    </div>
  );
}

export default Login;