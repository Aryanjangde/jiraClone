import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function LoginComponent() {
  const [role, setRole] = useState("")

  const handleLogin = () => {
    if (!role) {
      alert("Please select a role before logging in.")
      return
    }
    // Here you would typically handle the login logic
    console.log(`Logging in as ${role}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-blue-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Login</h2>
        <div className="space-y-4">
          <Select onValueChange={setRole} required>
            <SelectTrigger className="w-full border-blue-200 focus:ring-blue-300 focus:border-blue-300">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="developer">Developer</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
            onClick={handleLogin}
          >
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  )
}