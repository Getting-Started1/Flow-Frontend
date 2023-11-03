import React, {useState, useEffect} from 'react'
import { InputText } from 'primereact/inputtext';

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
   async function loginUser(event){
    event.preventDefault();
    const response =  await fetch("http://localhost:5000/login",{
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
  
        },
        body: JSON.stringify({
          email,
          password
        }),
      })
  
      const data = await response.json()

      if(data.user){
        alert('Login successful')
        window.location.href = '/'
      }else{
        alert('Invalid credentials')
      }
      
  
    }





  return (
    <form onSubmit={loginUser}>
    <div className="card">
        <div className="flex flex-column md:flex-row">
            <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                    <label className="w-6rem">Email</label>
                    <InputText 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email" type="email" className="w-12rem" 
                    
                    placeholder="Email"
                    
                    />
                </div>
                <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                    <label className="w-6rem">Password</label>
                    <InputText 
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    id="password" type="password" className="w-12rem"
                    placeholder="Password"/>
                </div>
                <input type="submit" label="Login" icon="pi pi-user" className="w-10rem mx-auto"
                value="Login"
                ></input>
            </div>          
        </div>
    </div>
    </form>
  )
}

export default Login