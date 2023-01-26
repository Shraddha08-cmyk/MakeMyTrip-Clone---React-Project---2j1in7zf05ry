import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { auth } from '../firebase';


export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = (e) => {
    e.preventDefault();
    // createUserWithEmailAndPassword(auth, name, email, password)
    // .then((user) => {
    //   console.log(user);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  };
  const userInputHandler = (e) => {
    setName(e.target.value);
  }
  const emailInputHandler = (e) => {
    setEmail(e.target.value);
  }
  const passInputHandler = (e) => {
    setPassword(e.target.value);
  }
  let loginInfo;
  if (localStorage.getItem("userInfo")===null) {
    loginInfo = [];
  } 
  else {
    loginInfo = JSON.parse(localStorage.getItem("userInfo"))
  }
  const submitHandler = (e) => {
    e.preventDefault();
    if (name !== "" && email != "" && password != "") {
      const storageToLocal = {
        name,
        email,
        password
      }
      if (loginInfo.some((info) => 
        info.name == storageToLocal.name || info.email == storageToLocal.email
      )){
        setInfoExist(true)
        return;
      }
      else {
        loginInfo.push(storageToLocal)
        localStorage.setItem("userInfo", JSON.stringify(loginInfo));
      }
    }
    setName(""), setEmail(""), setPassword("");
  }
  return (
    <div>
      <div className='d-flex aligns-items-center justify-content-center m-5'>
    <div className='container card p-3 mt-2 w-50'>
      <h1 className='text-center bg-danger text-white p-2 mb-2'>Registration Form</h1><hr/>
      <form onSubmit={submitHandler}>
        <div className='form-group p-2'>
            <label htmlFor='name'>Name :</label>
            <input className="form-control" type='text' value={name} onChange={userInputHandler} placeholder='Name'/>
        </div>
        <div className='form-group p-2'>
            <label htmlFor='email'>Email :</label>
            <input className="form-control" type='email' value={email} onChange={emailInputHandler} placeholder='Email'/>
        </div>
        <div className='form-group p-2'>
            <label htmlFor='password'>Password :</label>
            <input className="form-control" type='password' value={password} onChange={passInputHandler} placeholder='Password'/>
        </div>
        <button type='submit' className='btn btn-outline-success fs-5 p-2 mt-2 form-control'>Sign Up</button>
        <Link to='/login'>Already Registered? Log In</Link>
      </form>
    </div>
    </div>
    </div>
  )
}
