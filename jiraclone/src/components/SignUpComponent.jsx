"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function Component() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    
    // Validate password and confirmPassword match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // Reset error message before API call
    setErrorMessage("");

    // Make API call to the signup endpoint
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "signup",
            name: name,
            email: email,
            password: password,
            role: role,
          }),
        }
      );

      const data = await response.json();
      if (data) {
        router.push("/Routes/LandingPage");
      }
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      console.log("Signup successful", data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="bg-black p-8 rounded-lg w-96 border border-gray-800 shadow-2xl shadow-blue-500/50">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-200">
        Sign Up
      </h2>
      {errorMessage && (
        <p className="text-red-500 text-center mb-4">{errorMessage}</p>
      )}
      <form onSubmit={handleSignup} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-gray-200">
            Name
          </label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-gray-800 border-gray-700 focus:ring-blue-500 focus:border-blue-500 text-gray-200 placeholder-gray-400"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-gray-200">
            Email
          </label>
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
          <label htmlFor="password" className="text-gray-200">
            Password
          </label>
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
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-gray-200">
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full bg-gray-800 border-gray-700 focus:ring-blue-500 focus:border-blue-500 text-gray-200 placeholder-gray-400"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="role" className="text-gray-200">
            Role
          </label>
          <Select onValueChange={setRole} required>
            <SelectTrigger
              id="role"
              className="w-full border-gray-700 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-gray-200"
            >
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-gray-200">
              <SelectItem value="DEVELOPER">Developer</SelectItem>
              <SelectItem value="MANAGER">Manager</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 focus:ring-blue-500 text-white"
        >
          Sign Up
        </Button>
      </form>
      <div className="mt-4 text-center">
        <span className="text-gray-400">Or</span>
      </div>
      

      <Link href="/Routes/LandingPage" passHref>
        <Button className="w-full mt-4 bg-gray-700 hover:bg-gray-600 focus:ring-blue-500 text-gray-200">
          Already have an account? Log In
        </Button>
      </Link>
    </div>
  );
}
