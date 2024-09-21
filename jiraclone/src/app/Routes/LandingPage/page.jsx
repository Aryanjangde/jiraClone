import LoginComponent from "../../../components/LoginComponent";
import Image from "next/image";


export default function LandingPage(){
    return (
        <div className="flex w-full h-full justify-evenly">
            <div>
                <Image src={"/Designer.png"} className="w-full h-full" width={500} height={500}/>
            </div>
            <div>
            <LoginComponent/>
            </div>
        
        </div>
    )
}