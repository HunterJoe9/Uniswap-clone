"use client"
import Header from "@/components/Header";
import Main from "@/components/Main";
import Bottom from "@/components/Bottom";
import { LoginContext } from "@/components/context/LoginContext";


export default function Home() {
  return (
    <div className="h-screen max-h-screen h-min-screen w-screen bg-[#2D242F] text-white select-none flex flex-col justify-between">
      <Header/>
      <Main/>
      <Bottom/>
    </div>
  )
}
