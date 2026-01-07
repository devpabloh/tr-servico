
export function Tabela(){
    

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold text-gray-800">Detalhamento do Objeto</h2>
      <h3 className="text-md font-medium text-gray-700 mb-4">Lotes</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
              <th className="px-4 py-3 w-12"></th>
              <th className="px-4 py-3 w-32">Nº do Lote</th>
              <th className="px-4 py-3">Descrição</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-center">
                    <button
                      type="button"
                      className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition text-sm font-bold cursor-pointer"
                      aria-label="Remover lote"
                    >
                      ×
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      placeholder="Nº do Lote"
                      className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      placeholder="Descrição"
                      className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </td>
                </tr>
              
          </tbody>
        </table>
      </div>

      {/* Botão Adicionar */}
      <button
        type="button"
        className="cursor-pointer mt-3 flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        <span className="mr-1 font-bold">+</span>
        Adicionar Lote
      </button>
    </div>
  );
}