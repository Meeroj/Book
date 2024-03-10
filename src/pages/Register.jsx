import React, { useState } from "react";
import { useNavigate } from "react-router";
import { register } from "../services/auth";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/slices/authSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    key: "",
    secret: "",
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    register(formData)
      .then((res) => {
        console.log(res)
        if(res.status === 200){
          navigate('/')
        }
        dispatch(signIn(formData))
      })
      .catch((err) => console.log("err", err));
  }



  return (
    <div className="flex h-[100vh] items-center justify-center">
      <div className="w-1/2">
        <form
          className="flex flex-col gap-4 px-20 items-start"
          onSubmit={handleSubmit}
        >
          <h2 className="text-6xl font-bold text-center w-full">
            Ro'yxatdan o'tish
          </h2>
          <p className='text-xl font-bold text-blue-500 cursor-pointer ' onClick={()=>navigate('/login')}>Kirish</p>
          <label htmlFor="Name">Name *</label>
          <input
            type="text"
            id="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="outline-none border border-gray-400 rounded-md p-2 w-full"
            placeholder="Name"
          />
          <label htmlFor="Email">Email *</label>
          <input
            type="text"
            id="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="outline-none border border-gray-400 rounded-md p-2 w-full"
            placeholder="Email"
          />
          <label htmlFor="key">Key *</label>
          <input
            type="text"
            id="key"
            name="key"
            value={formData.key}
            onChange={handleInputChange}
            className="outline-none border border-gray-400 rounded-md p-2 w-full"
            placeholder="Key"
          />
          <label htmlFor="password">Password *</label>{" "}
          <input
            type="password"
            id="secret"
            name="secret"
            value={formData.password}
            onChange={handleInputChange}
            className="outline-none border border-gray-400 rounded-md p-2 w-full"
            placeholder="Password"
          />
          <button
            type="submit"
            className="p-2 rounded-md bg-blue-600 uppercase font-medium text-white mt-16 w-full"
          >
            Ro'yxatdan o'tish
          </button>
        </form>
      </div>
      <div className="w-1/2 bg-[url('./images/library.jpeg')] h-[100vh] bg-cover flex items-center text-7xl ps-8 text-white font-bold">
        Online kutubxona!
      </div>
    </div>
  );
};

export default Register;
