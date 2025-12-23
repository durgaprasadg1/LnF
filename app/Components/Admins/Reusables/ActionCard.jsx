import React from 'react'
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
const ActionCard = ({ title, desc, btn, link }) => {
  const router = useRouter();    
    const handleClick = (link) => { 
        router.push(link)
    }
    return (
  <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg">
    <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
    <p className="text-gray-400 text-sm mb-4">{desc}</p>
    <Button className="bg-gray-700 text-white hover:bg-black" onClick={() =>{handleClick(link)}}>{btn}</Button>
  </div>

);
}
export default ActionCard;