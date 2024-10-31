"use client"
import { useEffect, useState } from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDataContext } from '@/context/dataContext'


export default function LoginComponent() {
  const {userData, setUserData, isLoggedIn,setIsLoggedIn} = useDataContext()
  const router = useRouter();
  // const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password || !name) { // Ensure email, password, and role fields are filled
      alert("Please fill in all fields before logging in.");
      return;
    }
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action:"login",  
          name,
          "email":email,
          "password":password,
        })
      });

  
      if (response.ok) {
        const data = await response.json();
        const {id , name, email , role} = data.user
        localStorage.setItem('token', data.token); 
        setUserData({id , name, email , role})
        setIsLoggedIn(true);
        router.push("/Routes/Dashboard"); 
      } else {
        const errorData = await response.json();
        console.log(errorData)
        alert(errorData.error || "Login failed");
        if(errorData.error === 'User not found'){
          router.push('/Routes/signup')
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(error)
    }
  }
  
  return (
    <div className="bg-black p-8 rounded-lg w-96 border border-gray-800 shadow-2xl shadow-blue-900">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-200">Login</h2>
      {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-gray-200">Name </label>
          <Input 
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-800 border-gray-700 focus:ring-blue-500 focus:border-blue-500 text-gray-200 placeholder-gray-400"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-gray-200">Email</label>
          <Input 
            id="email"
            type="email" 
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-gray-800 border-gray-700 focus:ring-blue-500 focus:border-blue-500 text-gray-200 placeholder-gray-400"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-gray-200">Password</label>
          <Input 
            id="password"
            type="password" 
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-gray-800 border-gray-700 focus:ring-blue-500 focus:border-blue-500 text-gray-200 placeholder-gray-400"
          />
        </div>
        {/* <div className="space-y-2">
          <label htmlFor="role" className="text-gray-200">Role</label>
          <Select onValueChange={setRole} required>
            <SelectTrigger id="role" className="w-full border-gray-700 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-gray-200">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-gray-200">
              <SelectItem value="DEVELOPER">Developer</SelectItem>
              <SelectItem value="MANAGER">Manager</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
        <Button 
          type="submit"
          className="w-full bg-gray-700 hover:bg-gray-600 focus:ring-blue-500 text-gray-200"
        >
          Sign in
        </Button>
      </form>
      <div className="mt-4 text-center">
        <span className="text-gray-400">Or</span>
      </div>
      {/* <Button 
        className="w-full mt-4 bg-gray-700 hover:bg-gray-600 focus:ring-blue-500 text-gray-200"
        onClick={() => console.log("Sign in with Google")}
      >
        Sign in with Google
      </Button> */}

      <Link href="/Routes/signup" passHref>
        <Button 
          className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white" 
        >
          Sign Up
        </Button>
      </Link>
    </div>
  )
}
