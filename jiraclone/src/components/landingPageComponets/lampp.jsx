// LampDemo1 component
"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampDemo } from "../ui/lamp";
import LoginComponent from "../UserLogin";
 
export function LampDemo1() {
  return (
    // <LampDemo classname="w-screen h-screen"/>
    <div className="bg-black flex justify-center w-screen h-screen items-center">

        <LoginComponent/>

    </div>
  );
}
