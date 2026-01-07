import { useState } from "react";
import type { FormDataCompleto, OutroAnexo } from "../types/types";
import { InputComponent } from "./InputComponent";

interface GestaoOutrosAnexosProps {
  anexos: OutroAnexo[];
  setFormData: React.Dispatch<React.SetStateAction<FormDataCompleto>>;
}

const itemVazio: Omit<OutroAnexo, 'id'> = {
  tipo: "",
  descricao: "",
};

export function GestaoOutrosAnexos({ anexos, setFormData }: GestaoOutrosAnexosProps) {
  const [itemAtual, setItemAtual] = useState(itemVazio);

  const handleAdicionar = () => {
    if (!itemAtual.tipo.trim() || !itemAtual.descricao.trim()) {
      alert("Por favor, preencha o tipo e a descrição do anexo.");
      return;
    }

    const novoItem: OutroAnexo = {
      id: Date.now(),
      ...itemAtual
    };

    setFormData(prev => ({
      ...prev,
      outrosAnexos: [...prev.outrosAnexos, novoItem]
    }));

    setItemAtual(itemVazio);
  };

  const handleDeletar = (idParaDeletar: number) => {
    if (window.confirm("Tem certeza que deseja deletar este anexo?")) {
      setFormData(prev => ({
        ...prev,
        outrosAnexos: prev.outrosAnexos.filter((item) => item.id !== idParaDeletar)
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setItemAtual(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-inner my-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Adicionar Outros Anexos</h3>
      

      <div>
        <InputComponent
          label="Tipo de Anexo"
          id="tipo"
          name="tipo"
          value={itemAtual.tipo}
          onChange={handleChange}
          orientacoes="Ex: Check-list, Modelo de Proposta, etc."
        />
        
        <InputComponent
          label="Descrição"
          id="descricao"
          name="descricao"
          value={itemAtual.descricao}
          onChange={handleChange}
        />
      </div>
      <button
        type="button"
        onClick={handleAdicionar}
        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Adicionar Anexo
      </button>

      {anexos.length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="text-md font-medium text-gray-700">Anexos Adicionados:</h4>
          {anexos.map((item) => (
            <div key={item.id} className="p-3 bg-white border border-gray-200 rounded-md shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-700">{item.tipo}</p>
                  <p className="text-sm text-gray-600">{item.descricao}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeletar(item.id)}
                  className="bg-red-500 text-white px-2 py-0.5 rounded-md hover:bg-red-600 text-xs font-bold"
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}