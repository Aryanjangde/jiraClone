import { useDataContext } from "@/context/dataContext"
import { useRouter } from "next/navigation";
export default function ProfileModal({setOpenProfile}) {
  const {userData, setUserData} =useDataContext(); 
  const router = useRouter();
    // setProfileData({
    //   name: "",
    //   email: "",
    //   photo: "",
    //   tasksAssigned: 0,
    // })
    console.log(userData, "gfgf")
    function handleLogout(){
      localStorage.removeItem("token");
      setUserData({})
      router.push("/");
    }

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
                className="w-full h-12 border border-gray-300 p-2 pl-2 rounded-lg bg-white text-sm font-semibold text-black"
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

            <button className="px-6 py-2 rounded-lg bg-red-500 font-semibold" onClick={handleLogout}>
            Logout
            </button>
            

        </div>
        {/* Render the login component and pass handleSignIn as a prop */}
      </div>
    </div>
  )
}
