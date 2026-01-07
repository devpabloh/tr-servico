import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import type { Item, Grupo, FormDataCompleto } from '../types/types';

interface GestaoDeItensProps {
    itensPorUnidade: Item[];
    grupos: Grupo[];
    setFormData: React.Dispatch<React.SetStateAction<FormDataCompleto>>;
  }

export default function GestaoDeItens({itensPorUnidade, grupos,setFormData}: GestaoDeItensProps) {
  const [modo, setModo] = useState('unidade');

  const [itemAtual, setItemAtual] = useState({ nome: '', qtd: '', valor: '', numeroLote: '', numeroItem: '', descricao: '', unidade: '', totalPorItem: '' });

  const [nomeNovoGrupo, setNomeNovoGrupo] = useState('');

  useEffect(()=>{
    if(modo === 'unidade'){
      const qtd = parseFloat(itemAtual.qtd)
      const valorUnitario = parseFloat(itemAtual.valor)

      if(!isNaN(qtd) && !isNaN(valorUnitario)){
        const total = qtd * valorUnitario

        setItemAtual(prev => ({...prev, totalPorItem: total.toFixed(2)}))
      }else{
        setItemAtual(prev => ({...prev, totalPorItem: ''}))
      }
    }
  },[itemAtual.qtd, itemAtual.valor, modo])

  const handleItemAtualChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItemAtual(prev => ({ ...prev, [name]: value }));
  };

  const handleAdicionarItemUnidade = () => {
    if (!itemAtual.numeroLote || !itemAtual.numeroItem || !itemAtual.descricao || !itemAtual.unidade || !itemAtual.qtd || !itemAtual.valor) {
      alert('Preencha todos os campos do item!');
      return;
    }
    const novoItem: Item = { 
      ...itemAtual, 
      id: Date.now(),
      numeroItem: parseInt(itemAtual.numeroItem, 10),
      totalPorItem: parseFloat(itemAtual.totalPorItem),
    }
      
      setFormData(prev => ({
      ...prev,
      itensPorUnidade: [...prev.itensPorUnidade, novoItem]
      }));
      setItemAtual({ nome: '', qtd: '', valor: '', numeroLote: '', numeroItem: '', descricao: '', unidade: '', totalPorItem: '' });
    
  };

  const handleAdicionarGrupo = () => {
    if (!nomeNovoGrupo.trim()) {
      alert('Digite um nome para o grupo!');
      return;
    }
    const novoGrupo: Grupo = {
      id: Date.now(),
      nome: nomeNovoGrupo,
      itens: [],
      itemAtualGrupo: { 
        nome: '', 
        qtd: '', 
        valor: '', 
        numeroLote: '', 
        numeroItem: '', 
        descricao: '', 
        unidade: '', 
        totalPorItem: '' } 
    };
    setFormData(prev => ({
      ...prev,
      grupos: [...prev.grupos, novoGrupo]
    }));
    setNomeNovoGrupo('');
  };

  const handleItemGrupoChange = (grupoId: number, e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    const key = name as keyof Grupo['itemAtualGrupo']
    setFormData(prev => ({
      ...prev,
      grupos: prev.grupos.map(grupo => 
        grupo.id === grupoId 
          ? { ...grupo, itemAtualGrupo: { ...grupo.itemAtualGrupo, [key]: value } }
          : grupo
      )
    }));
  };

  const handleDeletarItemUnidade = (id: number)=>{
    if(window.confirm('Tem certeza que deseja deletar este item?')){
      setFormData(prev => ({
        ...prev,
        itensPorUnidade: prev.itensPorUnidade.filter(item=> item.id !==id)
      }))
    }
  }

  const handleDeletarItemDoGrupo = (grupoId: number, itemId: number) => {
    if (window.confirm('Tem certeza que deseja deletar este item do Grupo?')) {
      setFormData(prev => ({
        ...prev,
        grupos: prev.grupos.map(grupo => 
        
          grupo.id === grupoId
            ? { ...grupo, itens: grupo.itens.filter(item => item.id !== itemId) }
            : grupo 
        )
      }));
    }
  };

  const handleAdicionarItemNoGrupo = (grupoId: number) => {
    const grupoAlvo = grupos.find(g => g.id === grupoId);
    if (!grupoAlvo) return;
    
    const { nome, qtd, valor, descricao, numeroItem,numeroLote,unidade } = grupoAlvo.itemAtualGrupo;

    if (!numeroLote || !numeroItem || !descricao || !unidade || !qtd || !valor ) {
      alert('Preencha todos os campos do item!');
      return;
    }
    
    const qtdNum = parseFloat(qtd) || 0;
    const valorNum = parseFloat(valor) || 0;
    const total = qtdNum * valorNum;

    const novoItem: Item = { 
      id: Date.now(),
      nome: nome,
      qtd: qtd,
      valor: valor,
      totalPorItem: total,
      numeroLote: numeroLote, 
      numeroItem: parseInt(numeroItem, 10),
      descricao: descricao,
      unidade: unidade
    };

    setFormData(prev => ({
      ...prev,
      grupos: prev.grupos.map(grupo =>
        grupo.id === grupoId
          ? { 
              ...grupo, 
              itens: [...grupo.itens, novoItem],
              itemAtualGrupo: { nome: '', qtd: '', valor: '', descricao: '', numeroItem: '', numeroLote: '', totalPorItem: '', unidade: ''}
            }
          : grupo
      )
    }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Adicionar Itens</h1>

        {/* SELEÇÃO DE MODO */}
        <div className="flex items-center space-x-6 mb-8 bg-white p-4 rounded-lg shadow-sm">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="radio" 
              name="modo" 
              value="unidade" 
              checked={modo === 'unidade'} 
              onChange={(e) => setModo(e.target.value)} 
              className="h-5 w-5 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-lg font-semibold text-gray-700">Por Itens</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="radio" 
              name="modo" 
              value="grupo" 
              checked={modo === 'grupo'} 
              onChange={(e) => setModo(e.target.value)} 
              className="h-5 w-5 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-lg font-semibold text-gray-700">Por Grupo</span>
          </label>
        </div>
        
        {/* MODO POR UNIDADE */}
        {modo === 'unidade' && (
          <div className="space-y-6 ">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Adicionar Novo Item</h2>
              <div className="flex flex-wrap gap-2">
                <div className="md:col-span-1">
                  <label htmlFor="numeroLote" className="block text-sm font-medium text-gray-700" >Nº do grupo</label>
                  <input type="text" name="numeroLote" id='numeroLote' value={itemAtual.numeroLote} onChange={handleItemAtualChange} className="mt-1 block border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="numeroItem" className="block text-sm font-medium text-gray-700">Nº do Item</label>
                  <input type="number" name="numeroItem" id='numeroItem' value={itemAtual.numeroItem} onChange={handleItemAtualChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
                  <input type="text" name="descricao" id='descricao' value={itemAtual.descricao} onChange={handleItemAtualChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                  <label htmlFor="unidade" className="block text-sm font-medium text-gray-700">Unidade</label>
                  <input type="text" name="unidade" id='unidade' value={itemAtual.unidade} onChange={handleItemAtualChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                  <label htmlFor="qtd" className="block text-sm font-medium text-gray-700">Quantidade</label>
                  <input type="number" name="qtd" id='qtd' value={itemAtual.qtd} onChange={handleItemAtualChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                  <label htmlFor="valor" className="block text-sm font-medium text-gray-700">Valor Unitário</label>
                  <input type="number" name="valor" id='valor' value={itemAtual.valor} onChange={handleItemAtualChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                  <label htmlFor="totalPorItem" className="block text-sm font-medium text-gray-700">Total por Item</label>
                  <input 
                    type="number" 
                    name="totalPorItem" 
                    id='totalPorItem' 
                    value={itemAtual.totalPorItem} 
                    readOnly
                    onChange={() => {}} 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
                  />
                </div>
              </div>
               <button onClick={handleAdicionarItemUnidade} className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700">
                  Adicionar
                </button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">Itens Adicionados</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nº do grupo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nº do item</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidade</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Unitário</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {itensPorUnidade.map(item => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap">{item.numeroLote}</td>
                           <td className="px-6 py-4 whitespace-nowrap">{item.numeroItem}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.descricao}</td>
                             <td className="px-6 py-4 whitespace-nowrap">{item.unidade}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{item.qtd}</td>
                               <td className="px-6 py-4 whitespace-nowrap">R$ {parseFloat(item.valor).toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">R$ {parseFloat(item.totalPorItem.toString()).toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button
                                    onClick={() => handleDeletarItemUnidade(item.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-xs font-semibold"
                                    type="button"
                                  >
                                    Deletar
                                  </button>
                                </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
          </div>
        )}

        {/* MODO POR GRUPO */}
        {modo === 'grupo' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Criar Novo Grupo</h2>
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  value={nomeNovoGrupo} 
                  onChange={(e) => setNomeNovoGrupo(e.target.value)} 
                  placeholder="Nome do Grupo" 
                  className="flex-grow border border-gray-300 rounded-md shadow-sm p-2"
                />
                <button onClick={handleAdicionarGrupo} className="bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700">
                  Criar Grupo
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {grupos.map(grupo => (
                <div key={grupo.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{grupo.nome}</h3>
                  
                  {/* Formulário para adicionar item DENTRO do grupo */}
                  <div className="flex flex-wrap gap-4 mb-4 p-4 bg-gray-50 rounded-md">
                    <div className="md: w-1/7">
                      <label className="block text-sm font-medium text-gray-700" htmlFor={`numeroLote-${grupo.id}`}>Nº do Grupo</label>
                      <input id={`numeroLote-${grupo.id}`} placeholder="exemplo: 15476" type="number" name="numeroLote" value={grupo.itemAtualGrupo.numeroLote} onChange={(e) => handleItemGrupoChange(grupo.id, e)} className="mt-1 block border border-gray-300 rounded-md shadow-sm p-2 w-full" />
                    </div>
                    <div className="md:w-1/7">
                      <label className="block text-sm font-medium text-gray-700" htmlFor={`numeroItem-${grupo.id}`}>Nº do Item</label>
                      <input id={`numeroItem-${grupo.id}`} placeholder="exemplo: 76" type="number" name="numeroItem" value={grupo.itemAtualGrupo.numeroItem} onChange={(e) => handleItemGrupoChange(grupo.id, e)} className="mt-1 block border border-gray-300 rounded-md shadow-sm p-2 w-full" />
                    </div>
                    <div className="md: w-4/7">
                      <label className="block text-sm font-medium text-gray-700" htmlFor={`descricao-${grupo.id}`}>Descrição</label>
                      <input id={`descricao-${grupo.id}`} placeholder="Informe a descrição do item" type="text" name="descricao" value={grupo.itemAtualGrupo.descricao} onChange={(e) => handleItemGrupoChange(grupo.id, e)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div className="md:w-1/7">
                      <label className="block text-sm font-medium text-gray-700" htmlFor={`unidade-${grupo.id}`}>Unidade</label>
                      <input id={`unidade-${grupo.id}`} placeholder="Ex: UN" type="text" name="unidade" value={grupo.itemAtualGrupo.unidade} onChange={(e) => handleItemGrupoChange(grupo.id, e)} className="mt-1 block border border-gray-300 rounded-md shadow-sm p-2 w-full" />
                    </div>
                    <div className="md:w-1/7">
                      <label className="block text-sm font-medium text-gray-700" htmlFor={`qtd-${grupo.id}`}>Quantidade</label>
                      <input id={`qtd-${grupo.id}`} placeholder="Informe a quantidade" type="number" name="qtd" value={grupo.itemAtualGrupo.qtd} onChange={(e) => handleItemGrupoChange(grupo.id, e)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div className="md:w-1/7">
                      <label className="block text-sm font-medium text-gray-700" htmlFor={`valor-${grupo.id}`}>Valor Unitário</label>
                      <input id={`valor-${grupo.id}`} placeholder="Informe o valor" type="number" name="valor" value={grupo.itemAtualGrupo.valor} onChange={(e) => handleItemGrupoChange(grupo.id, e)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                  </div>
                  <button onClick={() => handleAdicionarItemNoGrupo(grupo.id)} className="mb-4 bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700">
                    Adicionar Item ao Grupo
                  </button>

                  {/* Tabela de itens do grupo */}
                   <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nº do Grupo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nº do item</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidade</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Unitário</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {grupo.itens.map(item => (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{item.numeroLote}</td>
                         <td className="px-6 py-4 whitespace-nowrap">{item.numeroItem}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{item.descricao}</td>
                           <td className="px-6 py-4 whitespace-nowrap">{item.unidade}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.qtd}</td>
                             <td className="px-6 py-4 whitespace-nowrap">R$ {parseFloat(item.valor).toFixed(2)}</td>
                              <td className="px-6 py-4 whitespace-nowrap">R$ {parseFloat(item.totalPorItem.toString()).toFixed(2)}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button 
                                  onClick={() => handleDeletarItemDoGrupo(grupo.id, item.id)}
                                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-xs font-semibold"
                                  type="button"
                                >
                                  Deletar
                                </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}