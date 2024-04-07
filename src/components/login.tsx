import React, { useState } from "react";
import 'firebase/firestore'
import { initializeApp } from 'firebase/app';
//import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';



export default function Login() {
  const [password, setPassword] = useState(''); // password state
  const [user, setUser] = useState(''); // email state
  //const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const password = e.currentTarget.password.value;

    if (password.length <= 6) {
      return
    }

    const firebaseConfig = {
      apiKey: "AIzaSyAcnRQ4z9EtRvVyc5r006-Ra1bVIPq6SJ8",
      authDomain: "login-system-adf37.firebaseapp.com",
      projectId: "login-system-adf37",
      storageBucket: "login-system-adf37.appspot.com",
      messagingSenderId: "460531130054",
      appId: "1:460531130054:web:5f1ab7066633cb719181c7",
      measurementId: "G-GJ3EVTKV59"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    const auth = getAuth();
    signInWithEmailAndPassword(auth, user, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      console.log(user);
      localStorage.setItem('authToken', user.refreshToken)
      //navigate('/success');
      window.location.href = '/success';
    }).catch((error) => {
      e.preventDefault();
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      alert(errorMessage);
    })

    //console.log(username, password);
    //e.target.reset();
    //window.location.href = '/'; // redirect to home page after login
    //return false; // prevent default form submission behavior
  }
  
  
  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-slate-950'>
      <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl'>Sign In</h1>
        <div className="max-w-sm shadow-lg rounded overflow-hidden p-8 bg-slate-800">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input onChange={e => setUser(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-slate-900 border-slate-950 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                </div>
                <div className="mb-6">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input onChange={e => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-slate-900 border-slate-950 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                    {password.length <= 6 && <p className="text-red-500 text-xs italic">Please solve the password problem,<br/> the password is unless then 6 characteres.</p>}
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Sign In</button>
            </form>
        </div>
    </div>
  )
}
