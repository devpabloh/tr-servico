import type React from "react"

interface FieldsetContainerProps {
  children: React.ReactNode;
  titleLegend: string;
  explicacao?: string;
  classNameFieldset?: string;
}


export function FieldsetContainer({children, titleLegend, explicacao, classNameFieldset}: FieldsetContainerProps){
  return (
    <fieldset className={`p-4 md:p-6 border-2 border-gray-500 rounded-md ${classNameFieldset}`}>
      <legend className="text-xl font-semibold px-2">{titleLegend} <span className="orientacoes">{explicacao}</span></legend>
      {children}
    </fieldset>
  )
}