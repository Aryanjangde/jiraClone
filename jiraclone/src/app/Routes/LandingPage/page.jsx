import Image from "next/image";
import { TypewriterEffect } from "../../../components/ui/typewriter-effect";
import {LampDemo1} from "../../../components/landingPageComponets/lampp"


export default function LandingPage(){
    return (
        <div className="flex w-full h-full">
            

            <LampDemo1/>
            
             
            {/* <TypewriterEffect 
  className="text-center text-3xl font-bold py-6" 
  words={[
    { text: "Welcome to the Task Management System!" },
    { text: "Raise Issues, Track Progress, Stay Organized." }
  ]} */}
{/* /> */}

        </div>
    )
}