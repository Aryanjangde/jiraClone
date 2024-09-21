"use client"

import { useState } from "react"
import { MdClose, MdVerified } from "react-icons/md"
import { VscUnverified } from "react-icons/vsc"
import Login from "./Login"

export default function ProfileModal({setOpenProfile}) {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    photo: "",
    tasksAssigned: 0,
  })
  const [emailVerified, setEmailVerified] = useState(false)

  const handleSignIn = (userData) => {
    // When a user signs in, update the profile data
    setProfileData({
      name: userData.name,
      email: userData.email,
      photo: userData.picture,
      tasksAssigned: 5, // Example: You can update this with actual data
    })
    setEmailVerified(true) // Assuming email is verified after sign-in
  }

  const handleSignOut = () => {
    // Clear the profile data on sign out
    setProfileData({
      name: "",
      email: "",
      photo: "",
      tasksAssigned: 0,
    })
    setEmailVerified(false)
    console.log("Signing out...")
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-orange-400 backdrop-blur-sm bg-opacity-10 z-50">
      <div className="flex flex-col w-[35vw] h-[70vh] bg-gradient-to-r rounded-3xl from-blue-400 bg-cyan-200 justify-start items-center relative p-6 ">
        <h1 className="text-white font-bold text-4xl mb-6">
          {profileData.name ? `${profileData.name}'s Profile` : "User Profile"}
        </h1>

        <div className="w-full space-y-4">
          <div>
            <label className="block mb-2 text-sm font-semibold text-white">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full h-12 border border-gray-300 p-2 rounded-lg bg-white text-sm font-semibold text-black"
              placeholder="Enter your name"
              value={profileData.name}
              readOnly
            />
          </div>

          <div className="relative">
            <label className="block mb-2 text-sm font-semibold text-white">
              Email
            </label>
            <div className="relative flex items-center w-full">
              <input
                type="text"
                className="w-full h-12 border border-gray-300 p-2 pl-10 rounded-lg bg-white text-sm font-semibold text-black"
                value={profileData.email}
                readOnly
              />
              {emailVerified ? (
                <MdVerified className="absolute top-3 left-3 text-green-500" />
              ) : (
                <VscUnverified className="absolute top-3 left-3 text-red-500" />
              )}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-white">
              Profile Photo
            </label>
            <div className="flex items-center space-x-4 gap-8">
              <img
                src={profileData.photo || "/placeholder.svg?height=100&width=100"}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />


            <select
              className="w-full h-12 border border-gray-300 p-2 rounded-lg bg-white text-sm font-semibold text-black"
            >
                <option>DEVELOPER</option>
                <option>MANAGER</option>
            </select>

            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-white">
              Tasks Assigned
            </label>
            <input
              type="text"
              className="w-full h-12 border border-gray-300 p-2 rounded-lg bg-white text-sm font-semibold text-black"
              value={profileData.tasksAssigned}
              readOnly
            />
          </div>
        </div>

        <div className="mt-auto w-full flex justify-between">
          <button
            onClick={() =>  setOpenProfile(false)}
            className="px-6 py-2 rounded-lg border border-white bg-transparent text-white font-semibold"
          >
            Cancel
          </button>
          <button onClick={handleSignOut} className="px-6 py-2 rounded-lg bg-red-500 font-semibold">
          <Login onSignIn={handleSignIn}/>
          </button>
        </div>

        {/* Render the login component and pass handleSignIn as a prop */}
        <div className="mt-4">
          
        </div>
      </div>
    </div>
  )
}
