import { useState } from "react";

interface CollapsibleTextProps {
  title: string;
  children: React.ReactNode;
}

export function CollapsibleText({title, children}: CollapsibleTextProps){
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = ()=>{
    setIsVisible(!isVisible)
  }

  return (
    <div className="border border-slate-200 rounded-md mb-3 overflow-hidden">
      <button onClick={toggleVisibility} className="w-full flex justify-between items-center p-4 bg-blue-100 hover:bg-blue-200 focus:outline-none">
        <span className="font-semibold text-slate-800">{title}</span>
        <span className="text-xl text-slate-500">
          {isVisible ? ' ▲' : ' ▼'}
        </span>
      </button>

      {isVisible && (
        <div className="p-4 bg-white border-t border-blue-200 orientacoes">
          <div className=" leading-relaxed">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}