import  {useState} from "react"

interface ListaDeStringsEditavelProps {
  itens: string[];
  onItensChange: (novosItens: string[]) => void;
  titulo: string;
  placeholder: string;
  labelBotao: string;
}

export function ListaDeStringsEditavel({itens, labelBotao,onItensChange,placeholder,titulo}:ListaDeStringsEditavelProps){
  const [textoAtual, setTextoAtual] = useState("")

  const handleAdicionar = ()=>{
    if(!textoAtual.trim()){
      alert("Por favor, digite um valor.")
      return;
    }

    const novaLista = [...itens, textoAtual]

    onItensChange(novaLista)

    setTextoAtual("")
  }

  const handleDeletar = (indiceParaDeletar: number)=>{
    if(window.confirm("Tem certeza que deseja deletar este item?")){

      const novaLista = itens.filter((_, index) => index !== indiceParaDeletar);

      onItensChange(novaLista)
    }
  }
  return(
    <div className="p-4 bg-gray-50 rounded-lg shadow-inner mb-6 mt-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{titulo}</h3>
      <div className="flex flex-col gap-3">
        <textarea
          value={textoAtual}
          onChange={(e)=> setTextoAtual(e.target.value)}
          placeholder={placeholder}
          className="lex-grow border border-gray-300 rounded-md shadow-sm p-2"
          rows={3} 
        />
        <button
          type="button"
          onClick={handleAdicionar}
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 h-full"  
        >
          {labelBotao}
        </button>
      </div>
      {itens.length > 0 && (
        <div className="mt-4">
          <h4 className="text-md font-medium text-gray-700 mb-2">Itens Adicionados:</h4>
          <ol type="a" className="list-outside list-decimal pl-5 space-y-2">
            {itens.map((item, index) => (
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