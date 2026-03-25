import React, { useState } from "react";
import type { FormDataCompleto } from "../types/types";

interface EspecificacoesProps {
  especificacoes: string;
  setFormData: React.Dispatch<React.SetStateAction<FormDataCompleto>>
}

export function Especificacoes({especificacoes, setFormData}: EspecificacoesProps){
  const [textoAtual, setTextoAtual] = useState("")

  const handleAdicionar = ()=>{
    if(!textoAtual.trim()){
      alert("Por favor, digite uma espeficicação.")
        return;
    }

    setFormData(prev => ({
      ...prev,
      especificacoes: prev.especificacoes
        ? `${prev.especificacoes}${prev.especificacoes.trim() ? "\n" : ""}${textoAtual}`
        : textoAtual
    }))

    setTextoAtual("")
  }

  const handleDeletar = (indiceParaDeletar: number) => {
    if (window.confirm("Tem certeza que deseja deletar esta especificação?")) {
      setFormData(prev => {
        const itens = (prev.especificacoes || "")
          .split("\n")
          .filter((linha: string) => linha.trim() !== "");
        const novosItens = itens.filter((_: string, index: number) => index !== indiceParaDeletar);
        return {
          ...prev,
          especificacoes: novosItens.join("\n")
        };
      });
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-inner mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1.1. Especificações Detalhadas</h3>
      <div className="flex flex-col gap-3">
        <textarea
          value={textoAtual}
          onChange={(e)=> setTextoAtual(e.target.value)}
          className="lex-grow border border-gray-300 rounded-md shadow-sm p-2"
          rows={3}
        />
        <button
          type="button"
          onClick={handleAdicionar}
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 h-full"
        >Adicionar especificação</button>
      </div>
      {(especificacoes && especificacoes.trim().length > 0) && (
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-2">Itens Adicionados:</h4>
          <ol type="a" className="list-outside list-decimal pl-5 space-y-2">
            {especificacoes
              .split("\n")
              .filter((linha: string) => linha.trim() !== "")
              .map((item: string, index: number) => (
              <li key={index} className="text-gray-700 flex justify-between items-center">
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => handleDeletar(index)}
                  className="bg-red-500 text-white px-2 py-0.5 rounded-md hover:bg-red-600 text-xs font-bold ml-4"
                >
                  Deletar
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}