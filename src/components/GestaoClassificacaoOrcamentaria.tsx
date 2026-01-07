import { useState } from "react";
import type { FormDataCompleto, ClassificacaoOrcamentaria } from "../types/types";
import { InputComponent } from "./InputComponent";

interface GestaoClassificacaoOrcamentariaProps {
  formData: FormDataCompleto;
  setFormData: React.Dispatch<React.SetStateAction<FormDataCompleto>>;
}

const itemVazio: Omit<ClassificacaoOrcamentaria, 'id'> = {
  fonte: "",
  unidade: "",
  programa: "",
  acao: "",
  elementoDespesa: "",
  categoriaEconomica: "",
};

export function GestaoClassificacaoOrcamentaria({ formData, setFormData }: GestaoClassificacaoOrcamentariaProps) {
  const [itemAtual, setItemAtual] = useState(itemVazio);

  const handleAdicionar = () => {
    
    if (!itemAtual.elementoDespesa.trim()) {
      alert("Pelo menos o Elemento de Despesa deve ser preenchido.");
      return;
    }

    const novoItem: ClassificacaoOrcamentaria = {
      id: Date.now(),
      ...itemAtual
    };

    setFormData(prev => ({
      ...prev,
      classificacoesOrcamentarias: [...prev.classificacoesOrcamentarias, novoItem]
    }));

    setItemAtual(itemVazio);
  };

  const handleDeletar = (idParaDeletar: number) => {
    if (window.confirm("Tem certeza que deseja deletar esta classificação?")) {
      setFormData(prev => ({
        ...prev,
        classificacoesOrcamentarias: prev.classificacoesOrcamentarias.filter((item) => item.id !== idParaDeletar)
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItemAtual(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isRegistroPreco = formData.eRegistroPreco === 'sim';

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-inner my-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Adicionar Classificação</h3>
      
      {/* Formulário de Adição */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <InputComponent
          label="Elemento de Despesa"
          id="elementoDespesa"
          name="elementoDespesa"
          value={itemAtual.elementoDespesa}
          onChange={handleChange}
        />
        {!isRegistroPreco && (
          <>
            <InputComponent
              label="Fonte"
              id="fonte"
              name="fonte"
              value={itemAtual.fonte}
              onChange={handleChange}
            />
            <InputComponent
              label="Unidade"
              id="unidade"
              name="unidade"
              value={itemAtual.unidade}
              onChange={handleChange}
            />
            <InputComponent
              label="Programa"
              id="programa"
              name="programa"
              value={itemAtual.programa}
              onChange={handleChange}
            />
            <InputComponent
              label="Ação"
              id="acao"
              name="acao"
              value={itemAtual.acao}
              onChange={handleChange}
            />
            <InputComponent
              label="Categoria Econômica"
              id="categoriaEconomica"
              name="categoriaEconomica"
              value={itemAtual.categoriaEconomica}
              onChange={handleChange}
            />
          </>
        )}
      </div>
      <button
        type="button"
        onClick={handleAdicionar}
        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Adicionar Classificação
      </button>

      {/* Lista de Itens Adicionados */}
      {formData.classificacoesOrcamentarias.length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="text-md font-medium text-gray-700">Classificações Adicionadas:</h4>
          {formData.classificacoesOrcamentarias.map((item) => (
            <div key={item.id} className="p-3 bg-white border border-gray-200 rounded-md shadow-sm">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-700">Elemento: {item.elementoDespesa}</p>
                <button
                  type="button"
                  onClick={() => handleDeletar(item.id)}
                  className="bg-red-500 text-white px-2 py-0.5 rounded-md hover:bg-red-600 text-xs font-bold"
                >
                  Deletar
                </button>
              </div>
              {!isRegistroPreco && (
                <div className="grid grid-cols-2 gap-x-4 text-sm text-gray-600 mt-2">
                  <span><strong>Fonte:</strong> {item.fonte}</span>
                  <span><strong>Unidade:</strong> {item.unidade}</span>
                  <span><strong>Programa:</strong> {item.programa}</span>
                  <span><strong>Ação:</strong> {item.acao}</span>
                  <span><strong>Categoria:</strong> {item.categoriaEconomica}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}