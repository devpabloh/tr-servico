import { useState } from "react";
import type { FormDataCompleto, AtorGestaoContrato } from "../types/types";
import { InputComponent } from "./InputComponent";
import { SelectComponent } from "./SelectComponent";

interface GestaoAtoresContratoProps {
  atores: AtorGestaoContrato[];
  setFormData: React.Dispatch<React.SetStateAction<FormDataCompleto>>;
}

const itemVazio: Omit<AtorGestaoContrato, 'id'> = {
  tipo: "",
  nome: "",
  matricula: "",
  setorUnidade: "",
};

export function GestaoAtoresContrato({ atores, setFormData }: GestaoAtoresContratoProps) {
  const [itemAtual, setItemAtual] = useState(itemVazio);

  const handleAdicionar = () => {
    if (!itemAtual.tipo.trim() || !itemAtual.nome.trim() || !itemAtual.matricula.trim() || !itemAtual.setorUnidade.trim()) {
      alert("Por favor, preencha todos os campos do ator.");
      return;
    }

    const novoItem: AtorGestaoContrato = {
      id: Date.now(),
      ...itemAtual
    };

    setFormData(prev => ({
      ...prev,
      atoresGestaoContrato: [...prev.atoresGestaoContrato, novoItem]
    }));

    setItemAtual(itemVazio); // Limpa o formulário
  };

  const handleDeletar = (idParaDeletar: number) => {
    if (window.confirm("Tem certeza que deseja deletar este ator?")) {
      setFormData(prev => ({
        ...prev,
        atoresGestaoContrato: prev.atoresGestaoContrato.filter((item) => item.id !== idParaDeletar)
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
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Adicionar Ator da Gestão</h3>
      
      {/* Formulário de Adição */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <SelectComponent
          label="Tipo"
          id="tipo"
          name="tipo"
          value={itemAtual.tipo}
          onChange={handleChange}
        >
          <option value="">Selecione...</option>
          <option value="Gestor">Gestor</option>
          <option value="Fiscal Técnico">Fiscal Técnico</option>
          <option value="Fiscal Administrativo">Fiscal Administrativo</option>
          <option value="Fiscal Requisitante">Fiscal Requisitante</option>
        </SelectComponent>
        
        <InputComponent
          label="Nome"
          id="nome"
          name="nome"
          value={itemAtual.nome}
          onChange={handleChange}
        />
        <InputComponent
          label="Matrícula"
          id="matricula"
          name="matricula"
          value={itemAtual.matricula}
          onChange={handleChange}
        />
        <InputComponent
          label="Setor/Unidade"
          id="setorUnidade"
          name="setorUnidade"
          value={itemAtual.setorUnidade}
          onChange={handleChange}
        />
      </div>
      <button
        type="button"
        onClick={handleAdicionar}
        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Adicionar Ator
      </button>

      {/* Lista de Itens Adicionados */}
      {atores.length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="text-md font-medium text-gray-700">Atores Adicionados:</h4>
          {atores.map((item) => (
            <div key={item.id} className="p-3 bg-white border border-gray-200 rounded-md shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-700">{item.nome} ({item.tipo})</p>
                  <p className="text-sm text-gray-600">Mat: {item.matricula} | Setor: {item.setorUnidade}</p>
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