import { useDataContext } from "@/context/dataContext"
export default function ProfileModal({setOpenProfile}) {
  const {userData} =useDataContext(); 
  // const handleSignOut = () => {
  //   // Clear the profile data on sign out
  //   setProfileData({
  //     name: "",
  //     email: "",
  //     photo: "",
  //     tasksAssigned: 0,
  //   })
  //   setEmailVerified(false)
  //   console.log("Signing out...")
  // }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-orange-400 backdrop-blur-sm bg-opacity-10 z-50">
      <div className="flex flex-col w-[35vw] h-[70vh] bg-gradient-to-r rounded-3xl from-blue-400 bg-cyan-200 justify-start items-center relative p-6 ">
        <h1 className="text-white font-bold text-4xl mb-6">
          {userData.name ? `${userData.name}'s Profile` : "User Profile" }
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
              value={userData.name || ""}
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
                value={userData.email || ""}
                readOnly
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-white">
              Profile Photo
            </label>
            <div className="flex items-center space-x-4 gap-8">
              <img
                src={userData.picture || "/placeholder.svg?height=100&width=100"}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />


            <select
              className="w-full h-12 border border-gray-300 p-2 rounded-lg bg-white text-sm font-semibold text-black"
            >
                <option>{userData.role}</option>
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
              value={userData.tasksAssigned || ""}
              readOnly
            />
          </div>
        </div>

        <div className="mt-auto w-full flex justify-between">
          <button
            onClick={() => setOpenProfile(false)}
            className="px-6 py-2 rounded-lg border border-white bg-transparent text-white font-semibold"
          >
            Cancel
          </button>
          <a className="px-6 py-2 rounded-lg bg-red-500 font-semibold">
            Logout
          </a>
        </div>
        {/* Render the login component and pass handleSignIn as a prop */}
      </div>
    </div>
  )
}
