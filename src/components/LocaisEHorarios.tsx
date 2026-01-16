import type { FormDataCompleto, LocalHorario } from "../types/types";
import { useState } from "react";


interface LocaisEHorariosProps{
  locaisEHorarios: LocalHorario[];
  setFormData: React.Dispatch<React.SetStateAction<FormDataCompleto>>;
}

export function LocaisEHorarios({locaisEHorarios, setFormData}:LocaisEHorariosProps){
  const [localAtual, setLocalAtual] = useState("")
  const[horarioAtual, setHorarioAtual] = useState("")

  const handleAdicionar = ()=>{
    if(!localAtual.trim() || !horarioAtual.trim()){
      alert("Por favor, preencha o local e o horário.")
      return
    }

    const novoItem: LocalHorario ={
      id: Date.now(),
      local: localAtual,
      horario: horarioAtual
    }

    setFormData(prev => ({
      ...prev, locaisEHorarios: [...prev.locaisEHorarios, novoItem]
    }))

    setLocalAtual("");
    setHorarioAtual("")
  }

  const handleDeletar = (idParaDeletar:number)=>{
    if(window.confirm("Tem certeza que deseja deletar este item?")){
      setFormData(prev => ({
        ...prev,
        locaisEHorarios: prev.locaisEHorarios.filter((item) => item.id !== idParaDeletar)
      }))
    }
  }

  return (
    <fieldset className="p-4 bg-gray-50 rounded-lg shadow-inner my-4">
      <legend className="text-lg font-semibold text-gray-800 mb-3">3.2.1 Os serviços serão prestados em locais e horários</legend>
      <div className="flex gap-4">
        <textarea name="" id=""
          value={localAtual}
          onChange={(e)=> setLocalAtual(e.target.value)}
          placeholder="Endereço..."
          className="flex-grow w-full border border-gray-300 rounded-md shadow-sm p-2"
          rows={3}
        />
        <textarea name="" id=""
          value={horarioAtual}
          onChange={(e)=> setHorarioAtual(e.target.value)}
          placeholder="Horário..."
          className="flex-grow w-full border border-gray-300 rounded-md shadow-sm p-2"
          rows={3}
        />
        <button 
          type="button"
          onClick={handleAdicionar}
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 w-full sm:w-auto"
        >
          Adicionar
        </button>
      </div>
      {locaisEHorarios.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-md font-medium text-gray-700">Locais Adicionados:</h4>
          {locaisEHorarios.map((item) => (
            <div key={item.id} className="p-3 bg-white border border-gray-200 rounded-md flex justify-between items-center shadow-sm">
              <div className="flex-1">
                <p className="font-semibold text-gray-700">{item.local}</p>
                <p className="text-gray-600 text-sm">{item.horario}</p>
              </div>
              <button
                type="button"
                onClick={() => handleDeletar(item.id)}
                className="bg-red-500 text-white px-2 py-0.5 rounded-md hover:bg-red-600 text-xs font-bold ml-4"
              >
                Deletar
              </button>
            </div>
          ))}
        </div>
      )}
    </fieldset>
  )
}