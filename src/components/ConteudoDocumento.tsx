import { FolhaDocumento } from "./FolhaDocumento";
import { numeroPorExtenso } from "../lib/utils";
import { EditableTextarea } from "./EditableTextarea";
import type {FormDataCompleto, AtorGestaoContrato}from '../types/types'

interface ConteudoDocumentoProps {
  readonly formData: FormDataCompleto;
  readonly setFormData: React.Dispatch<React.SetStateAction<FormDataCompleto>>;
  readonly isEditing: boolean;
  readonly onToggleEdit: ()=> void;
  readonly className?: string;
}

type GerarTextoProps = Omit<ConteudoDocumentoProps, 'onToggleEdit'>;

function substituirPlaceholders(texto: string, valores: Record<string, string>): string {
  const textoSubstituido = texto.replace(/\{(\w+)\}/g, (match, key) => {
    const valor = valores[key];
    return valor !== undefined ? `<strong>${valor}</strong>` : match;
  });
  return textoSubstituido.replace(/[ \t]{2,}/g, ' ').trim()
}

export function GerarTextoDoConsorcio({ formData, setFormData, isEditing }: GerarTextoProps) {

  const { descricao } = formData;

  const numStr = formData.numeroConsorciadas || "______";
  const extensoStr = numeroPorExtenso(formData.numeroConsorciadas || ''); 

  const valores = {
    numStr,
    justificativa: formData.justificativa || "________________________________",
    extensoStr,
    nao_havendo_complexidade_objeto: formData.nao_havendo_complexidade_objeto || "________________________________",
    nao_havendo_grande_vulto_da_contratacao: formData.nao_havendo_grande_vulto_da_contratacao || "________________________________",
    justificativa_vedacao: formData.justificativa_vedacao || "______________________",
    justificativa_vedacao_pessoafisica: formData.justificativa_vedacao_pessoafisica || "______________",
    descricaoDetalhadaMetodosExecucaoTrabalho: formData.descricaoDetalhadaMetodosExecucaoTrabalho || "______________",
    qualTipoContratacao: formData.qualTipoContratacao || "______"
  };

  const handleSave = (campo: keyof FormDataCompleto, novoValor: string) => {
    setFormData((prev) => ({
      ...prev,
      [campo]: novoValor
    }));
  };

  switch (descricao) {
    case 'sim':
      return (
        <EditableTextarea
          initialValue={formData.texto_sim}
          onSave={(novoValor: string) => handleSave('texto_sim', novoValor)}
          className="text-lg"
          isEditing={isEditing}
        />
      );
    case 'sim_com_numero_limitado_de_fornecedores': {
      
      const p2_com_valores = substituirPlaceholders(formData.texto_sim_limitado_p2, valores);
      return (
        <>
          <EditableTextarea
            initialValue={formData.texto_sim_limitado_p1}
            onSave={(novoValor: string) => handleSave('texto_sim_limitado_p1', novoValor)}
            className="text-lg"
            isEditing={isEditing}
          />

          {isEditing ? (
            
            <EditableTextarea
              initialValue={formData.texto_sim_limitado_p2}
              onSave={(novoValor: string) => {
                handleSave('texto_sim_limitado_p2', novoValor);
              }}
              className="text-lg"
              isEditing={isEditing}
            /> 
          ) : (
            <p
              className="text-lg p-2 rounded-md transition-colors"
              dangerouslySetInnerHTML={{ __html: p2_com_valores }}
            />
          )}
        </>
      );
    }
    case 'nao': {
      const p3_com_valores = substituirPlaceholders(formData.texto_nao_p3, valores);
      const p3_complemento_com_valores = substituirPlaceholders(formData.texto_nao_p3_complemento, valores);
      return (
        <>
          <EditableTextarea
            initialValue={formData.texto_nao_p1}
            onSave={(novoValor: string) => handleSave('texto_nao_p1', novoValor)}
            className="text-lg"
            isEditing={isEditing}
          />
          <EditableTextarea
            initialValue={formData.texto_nao_p2}
            onSave={(novoValor: string) => handleSave('texto_nao_p2', novoValor)}
            className="text-lg"
            isEditing={isEditing}
          />

          {isEditing ? (
            <>
                <EditableTextarea
                initialValue={formData.texto_nao_p3}
                onSave={(novoValor: string) => {
                  handleSave('texto_nao_p3', novoValor);
                }}
                className="text-lg"
                isEditing={isEditing}
              />

              <EditableTextarea
                initialValue={formData.texto_nao_p3_complemento}
                onSave={(novoValor: string) => {
                  handleSave('texto_nao_p3_complemento', novoValor);
                }}
                className="text-lg"
                isEditing={isEditing}
              />  
            </>
          ) : (
            /* renderiza se um dos dois campos estiver preenchido */
            (formData.nao_havendo_grande_vulto_da_contratacao ||
              formData.nao_havendo_complexidade_objeto) && (
              <>
                    <p
                    className="text-lg p-2 rounded-md"
                    title="Clique para editar"
                    dangerouslySetInnerHTML={{ __html: p3_com_valores }}
                  />
                  <p>
                    <span className="text-lg p-2 rounded-md" dangerouslySetInnerHTML={{ __html: p3_complemento_com_valores }} />
                  </p>
              </>
            )
          )}

           <EditableTextarea
            initialValue={formData.texto_nao_p4}
            onSave={(novoValor: string) => handleSave('texto_nao_p4', novoValor)}
            className="text-lg"
            isEditing={isEditing}
          />
        </>
      );
    }
  }
}

export function ConteudoDocumento({ formData, setFormData, isEditing, onToggleEdit, className }: Readonly<ConteudoDocumentoProps>) {
  return (
    <FolhaDocumento isEditing={isEditing} onToggleEdit={onToggleEdit} className={className}>
      {/* --- SEÇÃO 1 --- */}
      <div>
          <h2 className="text-xl font-bold pb-2 text-justify">1. DO OBJETO DA LICITAÇÃO</h2>
          <GerarTextoObjeto
            formData={formData}
            isEditing={isEditing}
            setFormData={setFormData}
          />
          {formData.qualTipoContratacao === 'corporativo' && formData.reducaoEscopo === 'sim' && (
            <div className="mt-2 space-y-4">
                <GerarTextoItem1_2
                  formData={formData} 
                  setFormData={setFormData} 
                  isEditing={isEditing} 
                />
            </div>
          )}

          <p>
            1.3 As especificações e os quantitativos do objeto desta licitação estão divididos e descritos conforme quadro(s) constante no anexo E.
          </p>
          {/* Item 1.4 */}
          <EditableTextarea
            initialValue={formData.emCasoDiscordanciaExistenteTermoECatser}
            onSave={(novoValor) => setFormData(prev => ({ ...prev, emCasoDiscordanciaExistenteTermoECatser: novoValor }))}
            isEditing={isEditing}
            className="text-lg"
          />
      </div>

      {/* --- SEÇÃO 2 --- */}
      <div>
        <h2 className="text-xl font-bold pb-2 text-justify">2. Das Justificativas</h2>
        
        {/* 2.1 */}
        <div>
          <h3 className="text-lg font-bold pb-2 text-justify">2.1 Justificativa da necessidade da contratação</h3>
          <JustificativaNecessidadeContratacao
            formData={formData}
            isEditing={isEditing}
            setFormData={setFormData}
          />
        </div>
        
        {/* Este bloco 2.2 estava faltando */}
        <div className="mt-4">
          <h3 className="text-lg font-bold pb-2 text-justify">2.2 Justificativa do quantitativo estimado</h3>
          <JustificativaQuantitativo
            formData={formData}
            isEditing={isEditing}
            setFormData={setFormData}
          />
        </div>

        {/* 2.3 */}
        <div className="mt-4">
          <h3 className="text-lg font-bold pb-2 text-justify">2.3 Justificativa da escolha da solução</h3>
          <JustificativaEscolhaSolucao
            formData={formData}
            isEditing={isEditing}
            setFormData={setFormData}
          />
        </div>
        
        {/* 2.4 */}
        <div className="mt-4">
          <h3 className="text-lg font-bold pb-2 text-justify">2.4 Justificativa para o parcelamento ou não da contratação</h3>
           <JustificativaParcelamento
            formData={formData}
            isEditing={isEditing}
            setFormData={setFormData}
          />
        </div>
      </div> 
      {/* FIM DA SEÇÃO 2 */}

      {/* --- RESTANTE DO DOCUMENTO (A PARTIR DA SEÇÃO 2.5) --- */}
      <div className="font-serif max-w-full">
        {/* 2.5 */}
        <h2 className="text-xl font-bold pb-2 text-justify">2.5 DA PREVISÃO DA VEDAÇÃO OU PARTICIPAÇÃO DE EMPRESAS SOB A FORMA DE CONSÓRCIO</h2>
        <div className="mt-2 space-y-4">
          <GerarTextoDoConsorcio formData={formData} setFormData={setFormData} isEditing={isEditing}/>
        </div>
        
        {/* 2.6 */}
       {formData.vedacaoOuParticipacaoCooperativa === 'sim' ? (
         <h2 className="text-xl font-bold pb-2 text-justify">2.6 DA PARTICIPAÇÃO DE PROFISSIONAIS ORGANIZADOS EM COOPERATIVA NA LICITAÇÃO</h2>
       ):(
         <h2 className="text-xl font-bold pb-2 text-justify">2.6 DA VEDAÇÃO DE PROFISSIONAIS ORGANIZADOS EM COOPERATIVA NA LICITAÇÃO</h2>
       )}
        <div className="mt-2 space-y-4">
          <GerarTextoDaCooperativa 
            formData={formData} 
            setFormData={setFormData} 
            isEditing={isEditing}
          />
        </div>
        
        {/* 2.7 */}
        {formData.vedacaoOuParticipacaoPessoasFisicas === 'sim' ? (
         <h2 className="text-xl font-bold pt-6 pb-2 text-justify">2.7 DA PARTICIPAÇÃO DE PESSOAS FÍSICAS NA LICITAÇÃO</h2>
       ):(
         <h2 className="text-xl font-bold pt-6 pb-2 text-justify">2.7 DA VEDAÇÃO DE PESSOAS FÍSICAS NA LICITAÇÃO</h2>
       )}
        <div className="mt-2 space-y-4">
          <GerarTextoDaPessoaFisica 
            formData={formData} 
            setFormData={setFormData} 
            isEditing={isEditing}
          />
        </div>
        
        {/* --- SEÇÃO 3 --- */}
        <h2 className="text-xl font-bold pt-6 pb-2 text-justify">3. DAS ESPECIFICAÇÕES DO OBJETO</h2>
        <p className="pt-4 pb-2 text-justify font-semibold">3.1 DESCRIÇÃO DOS SERVIÇOS / DETALHAMENTO DO OBJETO'</p>
        <div className="mt-2 space-y-4">
          <GerarTabelasDeItens formData={formData} />
        </div>
        <p className="pt-4 pb-2 text-justify">3.1.1 Além da descrição apresentada na(s) tabela(s) do quadro resumo  deste Termo de Referência (Anexo xxx), para a prestação dos serviços, deve-se observar as seguintes especificações:</p>
        <div>
          <GerarEspecificacoes formData={formData} setFormData={setFormData} isEditing={isEditing} />
        </div>
        <div>
          <p className="pt-4 text-justify font-semibold">3.2 DA EXECUÇÃO DOS SERVIÇOS</p>
          {formData.qualTipoContratacao !== 'corporativo' && (
            <div className="mt-2">
              <p className="pb-2 text-justify">3.2.1 Os serviços serão prestados em locais e horários fixos?</p>
              <EditableTextarea
                initialValue={formData.locaisEHorarios}
                onSave={(novoValor) => setFormData(prev => ({ ...prev, locaisEHorarios: novoValor }))}
                isEditing={isEditing}
                className="text-lg"
              />
            </div>
          )}
        </div>
        <div>
          <GerarPrazoDeExecucao formData={formData} setFormData={setFormData} isEditing={isEditing}/>
        </div>
        <div>
          <p className="pt-4 pb-2 text-justify">
                3.2.3 Descrição detalhada dos métodos, rotinas, etapas, tecnologias procedimentos, frequência e periodicidade de execução do trabalho:
              </p>
              <EditableTextarea
                initialValue={formData.descricaoDetalhadaMetodosExecucaoTrabalho}
                onSave={(novoValor) => setFormData(prev => ({...prev, descricaoDetalhadaMetodosExecucaoTrabalho: novoValor}))}
                isEditing={isEditing}
                className="text-lg"
              />
        </div>
        <div>
          <p className="pt-4 pb-2 text-justify">
                3.2.4 Horário da prestação de serviço:
              </p>
              <EditableTextarea
                initialValue={formData.horarioPrestacaoServico}
                onSave={(novoValor) => setFormData(prev => ({...prev, horarioPrestacaoServico: novoValor}))}
                isEditing={isEditing}
                className="text-lg"
              />
        </div>
        <div>
          <CronogramaRealizacaoDosServicos 
            formData={formData} 
            setFormData={setFormData} 
            isEditing={isEditing}
          />
        </div>
        <div>
          <PerfeitaExecucaoDosServicos
            formData={formData}
            setFormData={setFormData}
            isEditing={isEditing}
          />
        </div>
      </div>
      {formData.objetoSeraRecebido !== 'nao' && (
        <div>
          <p className="pt-4 pb-2 text-justify">
            3.2.7 O objeto será recebido:
          </p>
          <GerarTextoRecebimentoObjeto
            formData={formData}
            setFormData={setFormData}
            isEditing={isEditing}
          />
          <RecebimentoDefinitivoPoderaSerExcepcionalmente 
            formData={formData}
            setFormData={setFormData}
            isEditing={isEditing}
          />
        </div>
      )}
         <div>
          <GerarTextoTermoDetalhado
            formData={formData}
            isEditing={isEditing}
            setFormData={setFormData}
          />
        </div>
        <div>
          <ResponsabilidadeEticoProfissional
            formData={formData}
            setFormData={setFormData}
            isEditing={isEditing}
          />
        </div>
        <div>
          <p className="pt-4 text-justify font-semibold">3.3 INDICAÇÃO DE MARCAS OU MODELOS</p>
          <IndicacaoMarcaouModelo
            formData={formData}
            setFormData={setFormData}
            isEditing={isEditing}
          />
        </div>
       
        <div>
          <GerarCondicoesAdicionaisExecucao
            formData={formData}
          />
        </div>
        <h2 className="text-xl font-bold pt-6 pb-2 text-justify">4. DO VALOR ESTIMADO DA CONTRATAÇÃO, CLASSIFICAÇÃO ORÇAMENTÁRIA DA DESPESA E DO BENEFÍCIO PREVISTO NA LEI COMPLEMENTAR Nº 123/2006</h2>
      
      <h3 className="text-lg font-bold pb-2 text-justify">4.1 Valor estimado da contratação</h3>
      <GerarTextoValorEstimado formData={formData} setFormData={setFormData} isEditing={isEditing} />

      <h3 className="text-lg font-bold pt-4 pb-2 text-justify">4.2 Classificação Orçamentária da Despesa</h3>
      <GerarTextoClassificacaoOrcamentaria formData={formData} setFormData={setFormData} isEditing={isEditing} />

      <h3 className="text-lg font-bold pt-4 pb-2 text-justify">4.3 Justificativa para aplicação ou não do benefício (LC Nº 123/2006)</h3>
      <GerarTextoJustificativaLC123 formData={formData} setFormData={setFormData} isEditing={isEditing} />

      {/* --- SEÇÃO 5 --- */}
      <h2 className="text-xl font-bold pt-6 pb-2 text-justify">5. DA LICITAÇÃO</h2>
      
      <h3 className="text-lg font-bold pb-2 text-justify">5.1 Modalidade de licitação, critério de julgamento, regime de execução e modo de disputa</h3>
      <GerarTextoModalidadeLicitacao formData={formData} setFormData={setFormData} isEditing={isEditing} />

      <h3 className="text-lg font-bold pt-4 pb-2 text-justify">5.2 Proposta</h3>
      <GerarTextoProposta formData={formData} setFormData={setFormData} isEditing={isEditing} />

      <h3 className="text-lg font-bold pt-4 pb-2 text-justify">5.3 Requisitos específicos de habilitação</h3>
      <GerarTextoHabilitacao formData={formData} setFormData={setFormData} isEditing={isEditing} />

      <GerarTextoRegistroPrecos formData={formData} setFormData={setFormData} isEditing={isEditing} />
      <GerarTextoContrato formData={formData} setFormData={setFormData} isEditing={isEditing} />        

      <h2 className="text-xl font-bold pt-6 pb-2 text-justify">8. DOS CRITÉRIOS E PRAZOS PARA PAGAMENTO</h2>
      <GerarTextoPagamento formData={formData} setFormData={setFormData} isEditing={isEditing} />

      <h2 className="text-xl font-bold pt-6 pb-2 text-justify">9. DOS INSTRUMENTOS DE MEDIÇÃO DE RESULTADOS (IMR)</h2>
      <GerarTextoIMR formData={formData} setFormData={setFormData} isEditing={isEditing} />

      <h2 className="text-xl font-bold pt-6 pb-2 text-justify">10. DAS SANÇÕES GERAIS E ESPECÍFICAS</h2>
      <GerarTextoSancoes formData={formData} setFormData={setFormData} isEditing={isEditing} />

      <h2 className="text-xl font-bold pt-6 pb-2 text-justify">11. DAS DEMAIS CONDIÇÕES E ANEXOS</h2>
      <GerarTextoDemaisCondicoes formData={formData} setFormData={setFormData} isEditing={isEditing} />

    </FolhaDocumento>
  );
}


function GerarTextoDaCooperativa({ formData, setFormData, isEditing }: GerarTextoProps) {
  const { vedacaoOuParticipacaoCooperativa } = formData;

  const valores = {
    justificativa_vedacao: formData.justificativa_vedacao || "_______________"
  }

  const handleSave = (campo: keyof FormDataCompleto, novoValor: string) => {
    setFormData((prev) => ({
      ...prev,
      [campo]: novoValor
    }));
  };

  switch (vedacaoOuParticipacaoCooperativa) {
    case 'sim': 
      return (
        <EditableTextarea
          initialValue={formData.permitidaParticipacaoCooperativaSim}
          onSave={(novoValor: string) => handleSave('permitidaParticipacaoCooperativaSim', novoValor)}
          className="text-lg"
          isEditing={isEditing}
        />
      );
    case 'nao': {
      const textoComValores = substituirPlaceholders(formData.vedacaoParticipacaoCooperativaNao, valores);

      if (isEditing) {

        return (
          <EditableTextarea
            initialValue={formData.vedacaoParticipacaoCooperativaNao}
            onSave={(novoValor: string) => handleSave('vedacaoParticipacaoCooperativaNao', novoValor)}
            className="text-lg"
            isEditing={isEditing}
          />
        );
      }
      return (
        <p
          className="text-lg p-2 rounded-md"
          dangerouslySetInnerHTML={{ __html: textoComValores }}
        />
      );
    }

      
    default:
      return <p className="text-gray-400 italic">Opção de cooperativa não selecionada.</p>;
  }
}

/* function ObjetoDestaLicitacaoEstaoDivididos({formData, setFormData, isEditing}: GerarTextoProps){
  const {objetoDestaLicitacaoEstaoDivididos, texto_objetoDestaLicitacaoEstaoDivididos} = formData

  const handleSave = (novoValor: string) => {
    setFormData((prev) => ({
      ...prev,
      texto_objetoDestaLicitacaoEstaoDivididos: novoValor 
    }));
  };

  const valores = {
    objetoDestaLicitacaoEstaoDivididos: objetoDestaLicitacaoEstaoDivididos || "___",
  };

  const textoComValores = substituirPlaceholders(texto_objetoDestaLicitacaoEstaoDivididos, valores);

  if (isEditing) {
    return (
      <EditableTextarea
          initialValue={formData.texto_objetoDestaLicitacaoEstaoDivididos}
          onSave={handleSave}
          className="text-lg"
          isEditing={isEditing}
        />
    );
  }

  if(!objetoDestaLicitacaoEstaoDivididos){
    return (
      <p className="text-gray-500 italic">
        [Informações sobre a perfeita execução não especificadas]
      </p>
    )
  }

  return(
      <p
      className="text-lg p-2 rounded-md font-bold"
      dangerouslySetInnerHTML={{ __html: textoComValores }}
    />
  )
} */



function GerarTextoDaPessoaFisica({ formData, setFormData, isEditing }: GerarTextoProps) {
  const { vedacaoOuParticipacaoPessoasFisicas } = formData;

  const valores = {
    justificativa_vedacao_pessoafisica: formData.justificativa_vedacao_pessoafisica || "_______________"
  }

  const handleSave = (campo: keyof FormDataCompleto, novoValor: string) => {
    setFormData((prev) => ({
      ...prev,
      [campo]: novoValor
    }));
  };

  switch (vedacaoOuParticipacaoPessoasFisicas) {
    case 'sim': 
      return (
        <EditableTextarea
          initialValue={formData.vedacaoParticipacaoPessoaFisicaSim}
          onSave={(novoValor: string) => handleSave('vedacaoParticipacaoPessoaFisicaSim', novoValor)}
          className="text-lg"
          isEditing={isEditing}
        />
      );
    case 'nao': {
      const textoComValores = substituirPlaceholders(formData.vedacaoParticipacaoPessoaFisicaNao, valores);

      if (isEditing) {

        return (
          <EditableTextarea
            initialValue={formData.vedacaoParticipacaoPessoaFisicaNao}
            onSave={(novoValor: string) => handleSave('vedacaoParticipacaoPessoaFisicaNao', novoValor)}
            className="text-lg"
            isEditing={isEditing}
          />
        );
      }
      return (
        <p
          className="text-lg p-2 rounded-md font-bold"
          dangerouslySetInnerHTML={{ __html: textoComValores }}
        />
      );
    }

      
    default:
      return <p className="text-gray-400 italic">Opção de cooperativa não selecionada.</p>;
  }
}

const tableClasses = "min-w-full divide-y divide-gray-300 border border-gray-300";
const thClasses = "px-4 py-2 text-left text-sm font-semibold text-gray-700 bg-gray-100";
const tdClasses = "px-4 py-3 text-sm text-gray-800";

function GerarTabelasDeItens({ formData }: { formData: FormDataCompleto }) {
  const { itensPorUnidade, grupos } = formData;

  const temItensUnidade = itensPorUnidade.length > 0;
  
  const temGruposComItens = grupos.some(g => g.itens.length > 0);
  const temGruposSemItens = grupos.length > 0 && !temGruposComItens;

  if (!temItensUnidade && !temGruposComItens && !temGruposSemItens) {
    return <p className="text-gray-500 italic">[Nenhum item ou lote adicionado]</p>;
  }

  return (
    <div className="space-y-6">
      
      {/* Tabela de Itens por Unidade (Modo "Por Itens") */}
      {temItensUnidade && (
        <div>
          <h4 className="text-md font-semibold mb-2">Itens</h4>
          <table className={tableClasses}>
            <thead className="bg-gray-100">
              <tr>
                <th className={thClasses}>Nº Lote</th>
                <th className={thClasses}>Nº Item</th>
                <th className={thClasses}>Descrição</th>
                <th className={thClasses}>UN</th>
                <th className={thClasses}>Qtd</th>
                <th className={thClasses}>Valor Unit.</th>
                <th className={thClasses}>Valor Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {itensPorUnidade.map(item => (
                <tr key={item.id}>
                  <td className={tdClasses}>{item.numeroLote}</td>
                  <td className={tdClasses}>{item.numeroItem}</td>
                  <td className={tdClasses}>{item.descricao}</td>
                  <td className={tdClasses}>{item.unidade}</td>
                  <td className={tdClasses}>{item.qtd}</td>
                  <td className={tdClasses}>R$ {parseFloat(item.valor).toFixed(2)}</td>
                  <td className={tdClasses}>R$ {parseFloat(item.totalPorItem.toString()).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tabelas de Lotes/Grupos (Modo "Por Lotes") */}
      {grupos.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-md font-semibold mb-2">Lotes</h4>
          {grupos.map(grupo => (
            <div key={grupo.id}>
              <h5 className="text-md font-semibold mb-2 text-gray-800">Lote: {grupo.nome}</h5>
              {grupo.itens.length > 0 ? (
                <table className={tableClasses}>
                  <thead className="bg-gray-100">
                    <tr>
                      <th className={thClasses}>Nº Lote</th>
                      <th className={thClasses}>Nº Item</th>
                      <th className={thClasses}>Descrição</th>
                      <th className={thClasses}>UN</th>
                      <th className={thClasses}>Qtd</th>
                      <th className={thClasses}>Valor Unit.</th>
                      <th className={thClasses}>Valor Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {grupo.itens.map(item => (
                      <tr key={item.id}>
                        <td className={tdClasses}>{item.numeroLote}</td>
                        <td className={tdClasses}>{item.numeroItem}</td>
                        <td className={tdClasses}>{item.descricao}</td>
                        <td className={tdClasses}>{item.unidade}</td>
                        <td className={tdClasses}>{item.qtd}</td>
                        <td className={tdClasses}>R$ {parseFloat(item.valor).toFixed(2)}</td>
                        <td className={tdClasses}>R$ {parseFloat(item.totalPorItem.toString()).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500 italic text-sm">[Nenhum item adicionado a este lote]</p>
              )}
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
}

function GerarEspecificacoes({ formData, setFormData, isEditing }: { formData: FormDataCompleto; setFormData: React.Dispatch<React.SetStateAction<FormDataCompleto>>; isEditing: boolean; }) {
  const { especificacoes } = formData;

  const handleSave = (novoValor: string) => {
    setFormData(prev => ({
      ...prev,
      especificacoes: novoValor
    }));
  };

  // Modo de edição: Usa o EditableTextarea
  if (isEditing) {
    return (
      <EditableTextarea
        initialValue={especificacoes}
        onSave={handleSave}
        className="text-lg"
        isEditing={isEditing}
      />
    );
  }

  // Modo de visualização: Exibe o texto ou um aviso se estiver vazio
  if (!especificacoes) {
    return <p className="text-gray-500 italic">[Nenhuma especificação foi adicionada]</p>;
  }

  return (
    <p 
      className="text-lg text-justify whitespace-pre-wrap" 
      style={{ whiteSpace: 'pre-wrap' }}
    >
      {especificacoes}
    </p>
  );
}


/* function GerarLocaisEHorarios({formData}: {formData: FormDataCompleto}){
  const {osServicosSeraoPrestadosNosSeguintesLocaisEHorarios,locaisEHorarios} = formData

  if(osServicosSeraoPrestadosNosSeguintesLocaisEHorarios === 'nao'){
    return (
      <p className="text-blue-600 font-semibold">
        3.2.1Os serviços descritos neste termo de referência serão prestados nos locais e horários indicados pela contratante. <span className="text-red-600">(Redação do caso de Ata Corporativa)</span>
      </p>
    )
  }

  if (locaisEHorarios.length === 0) {
    return <p className="text-gray-500 italic">[Nenhum local ou horário de execução especificado]</p>;
  }

  return (
    <div className="space-y-3">
      {locaisEHorarios.map((item, index) => (
        <div key={item.id} className="text-lg text-justify">
          <p>
            <strong className="font-medium">Local {index + 1}:</strong> {item.local}
          </p>
          <p>
            <strong className="font-medium">Horário(s):</strong> {item.horario}
          </p>
        </div>
      ))}
    </div>
  );
} */

function GerarPrazoDeExecucao({formData, setFormData, isEditing}: GerarTextoProps){
  const {prazoExecucaoDoContrato, texto_prazo_execucao} = formData

  const handleSave = (novoValor: string) => {
    setFormData((prev) => ({
      ...prev,
      texto_prazo_execucao: novoValor
    }));
  };

  const valores = {
    prazoExecucaoDoContrato: prazoExecucaoDoContrato || "___",
    prazoPorExtenso: numeroPorExtenso(prazoExecucaoDoContrato || '') || "_____"
  };

  const textoComValores = substituirPlaceholders(texto_prazo_execucao, valores);

  if (isEditing) {
    return (
      <EditableTextarea
        initialValue={texto_prazo_execucao} 
        onSave={handleSave}
        className="text-lg"
        isEditing={isEditing}
      />
    );
  }

 

  return(
     <p
    className="text-lg p-2 rounded-md"
    dangerouslySetInnerHTML={{ __html: textoComValores }}
    />
  )
}

function CronogramaRealizacaoDosServicos({formData, setFormData, isEditing}: GerarTextoProps){
  const {cronogramaRealizacaoDosServicos, texto_cronograma_realizacao_servicos} = formData

  const handleSave = (novoValor: string) => {
    setFormData((prev) => ({
      ...prev,
      texto_cronograma_realizacao_servicos: novoValor 
    }));
  };

  const valores = {
    cronogramaRealizacaoDosServicos: cronogramaRealizacaoDosServicos || "___",
  };

  const textoComValores = substituirPlaceholders(texto_cronograma_realizacao_servicos, valores);

  if (isEditing) {
    return (
      <EditableTextarea
          initialValue={formData.texto_cronograma_realizacao_servicos}
          onSave={handleSave}
          className="text-lg"
          isEditing={isEditing}
        />
    );
  }

  if(!cronogramaRealizacaoDosServicos){
    return (
      <p className="text-gray-500 italic">
    
      </p>
    )
  }

  return(
      <p
    className="text-lg p-2 rounded-md"
    dangerouslySetInnerHTML={{ __html: textoComValores }}
  />
  )
}

function PerfeitaExecucaoDosServicos({formData, setFormData, isEditing}: GerarTextoProps){
  const {perfeitaExecucaoservicos, texto_para_perfeita_execucao_servicos} = formData

  const handleSave = (novoValor: string) => {
    setFormData((prev) => ({
      ...prev,
      texto_para_perfeita_execucao_servicos: novoValor 
    }));
  };

  const valores = {
    perfeitaExecucaoservicos: perfeitaExecucaoservicos || "___",
  };

  const textoComValores = substituirPlaceholders(texto_para_perfeita_execucao_servicos, valores);

  if (isEditing) {
    return (
      <EditableTextarea
          initialValue={formData.texto_para_perfeita_execucao_servicos}
          onSave={handleSave}
          className="text-lg"
          isEditing={isEditing}
        />
    );
  }
  return(
      <p
      className="text-lg p-2 rounded-md"
      dangerouslySetInnerHTML={{ __html: textoComValores }}
    />
  )
}

/* function GerarTextoRecebimentoObjeto({formData, setFormData, isEditing}: GerarTextoProps){
  const { objetoSeraRecebido } = formData;

  const handleSave = (campo: keyof FormDataCompleto, novoValor: string) => {
    setFormData((prev) => ({
      ...prev,
      [campo]: novoValor
    }));
  };

  // Prepara os valores para substituição
  const valores = {
    ObjetoRecebidoProvisoriamente: formData.ObjetoRecebidoProvisoriamente || "___",
    prazoPorExtenso: numeroPorExtenso(formData.ObjetoRecebidoProvisoriamente || '') || "____",
    ObjetoRecebidoDefinitivamente: formData.ObjetoRecebidoDefinitivamente || "___",
    definitivoPorExtenso: numeroPorExtenso(formData.ObjetoRecebidoDefinitivamente || '') || "____"
  };

  switch (objetoSeraRecebido) {
    case 'provisoriamente': {
      const textoComValores = substituirPlaceholders(formData.texto_recebimento_provisorio, valores);
      return (
        isEditing ? (
          <EditableTextarea
            initialValue={formData.texto_recebimento_provisorio}
            onSave={(novoValor: string) => handleSave('texto_recebimento_provisorio', novoValor)}
            className="text-lg"
            isEditing={isEditing}
          />
        ) : (
          <p
            className="text-lg p-2 rounded-md"
            dangerouslySetInnerHTML={{ __html: textoComValores }}
          />
        )
      );
    }
    case 'definitivamente': {
       const textoComValores = substituirPlaceholders(formData.texto_recebimento_definitivo, valores);
       return (
        isEditing ? (
          <EditableTextarea
            initialValue={formData.texto_recebimento_definitivo}
            onSave={(novoValor: string) => handleSave('texto_recebimento_definitivo', novoValor)}
            className="text-lg"
            isEditing={isEditing}
          />
        ) : (
          <p
            className="text-lg p-2 rounded-md"
            dangerouslySetInnerHTML={{ __html: textoComValores }}
          />
        )
      );
    }
    default:
      return <p className="text-gray-400 italic">Opção de recebimento não selecionada.</p>;
  }
} */

function GerarTextoRecebimentoObjeto({formData, setFormData, isEditing}: GerarTextoProps){
  const { objetoSeraRecebido } = formData;

  const handleSave = (campo: keyof FormDataCompleto, novoValor: string) => {
    setFormData((prev) => ({
      ...prev,
      [campo]: novoValor
    }));
  };

  // Prepara os valores para substituição
  const valores = {
    ObjetoRecebidoProvisoriamente: formData.prazoRecebimentoProvisorio || "___", 
    prazoPorExtenso: numeroPorExtenso(formData.prazoRecebimentoProvisorio || '') || "____",
    ObjetoRecebidoDefinitivamente: formData.prazoRecebimentoDefinitivo || "___",
    definitivoPorExtenso: numeroPorExtenso(formData.prazoRecebimentoDefinitivo || '') || "____"
  };

  // Funções auxiliares para renderizar cada bloco
  const renderProvisorio = () => {
    const textoComValores = substituirPlaceholders(formData.texto_recebimento_provisorio, valores);
    return isEditing ? (
      <EditableTextarea
        initialValue={formData.texto_recebimento_provisorio}
        onSave={(novoValor: string) => handleSave('texto_recebimento_provisorio', novoValor)}
        className="text-lg"
        isEditing={isEditing}
      />
    ) : (
      <p className="text-lg p-2 rounded-md" dangerouslySetInnerHTML={{ __html: textoComValores }} />
    );
  };

  const renderDefinitivo = () => {
    const textoComValores = substituirPlaceholders(formData.texto_recebimento_definitivo, valores);
    return isEditing ? (
      <EditableTextarea
        initialValue={formData.texto_recebimento_definitivo}
        onSave={(novoValor: string) => handleSave('texto_recebimento_definitivo', novoValor)}
        className="text-lg"
        isEditing={isEditing}
      />
    ) : (
      <p className="text-lg p-2 rounded-md" dangerouslySetInnerHTML={{ __html: textoComValores }} />
    );
  };

  // Lógica principal de exibição
  return (
    <div className="space-y-2">
      {(objetoSeraRecebido === 'provisoriamente' || objetoSeraRecebido === 'ProvisorioEDefinitivo') && renderProvisorio()}
      {(objetoSeraRecebido === 'definitivamente' || objetoSeraRecebido === 'ProvisorioEDefinitivo') && renderDefinitivo()}
      {!objetoSeraRecebido && <p className="text-gray-400 italic"></p>}
    </div>
  );
}

function RecebimentoDefinitivoPoderaSerExcepcionalmente({formData, setFormData, isEditing}: GerarTextoProps){
  const { recebimentoDefinitivoPoderaSerExcepcionalmente } = formData;

  const handleSave = (campo: keyof FormDataCompleto, novoValor: string) => {
    setFormData((prev) => ({
      ...prev,
      [campo]: novoValor
    }));
  };

  // prepara valores para placeholders
  const valores = {
    ObjetoRecebidoDefinitivamente: formData.prazoRecebimentoDefinitivo || "___",
    definitivoPorExtenso: numeroPorExtenso(formData.prazoRecebimentoDefinitivo || '') || "____"
  };

  switch (recebimentoDefinitivoPoderaSerExcepcionalmente) {
    case 'sim': {
      const textoComValores = substituirPlaceholders(
        formData.texto_recebimento_definitivo_podera_ser_excepcionalmente,
        valores
      );
      return (
        isEditing ? (
          <EditableTextarea
            initialValue={formData.texto_recebimento_definitivo_podera_ser_excepcionalmente}
            onSave={(novoValor: string) => handleSave('texto_recebimento_definitivo_podera_ser_excepcionalmente', novoValor)}
            className="text-lg"
            isEditing={isEditing}
          />
        ) : (
          <p
            className="text-lg p-2 rounded-md"
            dangerouslySetInnerHTML={{ __html: textoComValores }}
          />
        )
      );
    }
    default:
      return null;
  }
}

function ResponsabilidadeEticoProfissional({formData, setFormData, isEditing}: GerarTextoProps){
  const {responsabilidadeEticoProfissional} = formData

  const handleSave = (novoValor: string) => {
    setFormData((prev) => ({
      ...prev,
      texto_prazo_execucao: novoValor
    }));
  };

  const valores = {
    responsabilidadeEticoProfissional: responsabilidadeEticoProfissional || "___",
    
  };

  const textoComValores = substituirPlaceholders(responsabilidadeEticoProfissional, valores);

  if (isEditing) {
    return (
      <EditableTextarea
        initialValue={responsabilidadeEticoProfissional} 
        onSave={handleSave}
        className="text-lg"
        isEditing={isEditing}
      />
    );
  }

  if(!responsabilidadeEticoProfissional){
    return (
      <p className="text-gray-500 italic">
        [Prazo de início da execução não especificado]
      </p>
    )
  }

  return(
     <p
    className="text-lg p-2 rounded-md"
    dangerouslySetInnerHTML={{ __html: textoComValores }}
    />
  )
}

function IndicacaoMarcaouModelo({formData, setFormData, isEditing}: GerarTextoProps){
  const {eEstudosTecnicosPreliminares, 
    } = formData

  const handleSave = (campo: keyof FormDataCompleto, novoValor: string) => {
    setFormData((prev) => ({
      ...prev,
      [campo]: novoValor
    }));
  };

  const valores = {
    // Valores do caso "Sim"
    sera_admitida_indicacao: formData.sera_admitida_indicacao || "______",
    numero_etp: formData.numero_etp || "__",

    // Valores do caso "Não"
    marcas_ou_modelos_indicadas: formData.marcas_ou_modelos_indicadas || "______",
    devido_a: formData.devido_a || "______",
    nao_texto_preve_indicacao_marcas_ou_modelos: formData.nao_texto_preve_indicacao_marcas_ou_modelos || "_________"
    
  };

  switch (eEstudosTecnicosPreliminares) {
    case 'sim': {
      const primeiroTextoComValores = substituirPlaceholders(formData.sim_texto_preve_indicacao_marcas_ou_modelos, valores);
      return (
        <>
          {isEditing ? (
            <EditableTextarea
              initialValue={formData.sim_texto_preve_indicacao_marcas_ou_modelos}
              onSave={(novoValor: string) => handleSave('sim_texto_preve_indicacao_marcas_ou_modelos', novoValor)}
              className="text-lg"
              isEditing={isEditing}
            />
          ) : (
            <p
              className="text-lg p-2 rounded-md"
              dangerouslySetInnerHTML={{ __html: primeiroTextoComValores }}
            />
          )}

          {isEditing && (
            <EditableTextarea
              initialValue={formData.sim_texto_dois_presente_contratacao_sera_admitida}
              onSave={(novoValor: string) => handleSave('sim_texto_dois_presente_contratacao_sera_admitida', novoValor)}
              className="text-lg"
              isEditing={isEditing}
            />
          )}
        </>
      );
    }
    case 'nao': {
      const textoComValores = substituirPlaceholders(formData.nao_texto_preve_indicacao_marcas_ou_modelos, valores);
      return (
        isEditing ? (
          <EditableTextarea
            initialValue={formData.nao_texto_preve_indicacao_marcas_ou_modelos}
            onSave={(novoValor: string) => handleSave('nao_texto_preve_indicacao_marcas_ou_modelos', novoValor)}
            className="text-lg"
            isEditing={isEditing}
          />
        ) : (
          <p
            className="text-lg p-2 rounded-md"
            dangerouslySetInnerHTML={{ __html: textoComValores }}
          />
        )
      );
    }
  }
  
}

function GerarTextoTermoDetalhado({formData, setFormData, isEditing}: GerarTextoProps){
  const { TermoDetalhadoDeRecebimentoProvisorio } = formData;

  const handleSave = (campo: keyof FormDataCompleto, novoValor: string) => {
    setFormData((prev) => ({
      ...prev,
      [campo]: novoValor
    }));
  };

  switch (TermoDetalhadoDeRecebimentoProvisorio) {
    case 'sim': 
      return (
        <EditableTextarea
          initialValue={formData.texto_termo_detalhado_de_recebimento_provisorio_se_realizado_imr}
          onSave={(novoValor: string) => handleSave('texto_termo_detalhado_de_recebimento_provisorio_se_realizado_imr', novoValor)}
          className="text-lg"
          isEditing={isEditing}
        />
      );
    case 'nao': 
      return (
        <EditableTextarea
          initialValue={formData.texto_termo_detalhado_de_recebimento_provisorio_se_nao_realizado_imr}
          onSave={(novoValor: string) => handleSave('texto_termo_detalhado_de_recebimento_provisorio_se_nao_realizado_imr', novoValor)}
          className="text-lg"
          isEditing={isEditing}
        />
      );
    default:
      return <p className="text-gray-400 italic">Opção de IMR (3.2.8) não selecionada.</p>;
  }
}

function GerarCondicoesAdicionaisExecucao({ formData }: { formData: FormDataCompleto }) {
  const { necessarioCondicoesAdicionaisParaExecucaoDoObjeto, condicoesAdicionaisExecucao } = formData;

  if (necessarioCondicoesAdicionaisParaExecucaoDoObjeto !== 'sim') {
    return null; 
  }

  return (
    <div>
      <p className="pt-4 pb-2 text-justify font-semibold">
        3.4 Da vedação de utilização de marca / produto na execução do serviço
      </p>
      
      {condicoesAdicionaisExecucao ? (
        <p className="text-lg text-justify whitespace-pre-wrap">
            {condicoesAdicionaisExecucao}
         </p>
      ) : (
        <p className="text-gray-500 italic">[Nenhuma condição de vedação foi adicionada]</p>
      )}
    </div>
  );
}

function GerarTextoObjeto({ formData, setFormData, isEditing }: GerarTextoProps) {
  const { 
    eRegistroPreco, 
    eEstudosTecnicosPreliminares,
    sim_texto_e_registro_preco,
    nao_texto_e_registro_preco,
    paraContratacaoEventualPrestacaoServico,
    visandoAtenderNecessidades,
    qualTipoContratacao,
    reducaoEscopo,
    sim_texto_registro_preco_simples,
    sim_texto_registro_preco_unificado_saude,
    sim_texto_registro_preco_corporativo,
    sim_texto_registro_preco_corporativo_e_havera_reducao_escopo,
  } = formData;

  const mapTipoContratacao: Record<string, string> = {
    'corporativo': 'Corporativo',
    'simples': 'Simples',
    'unificadoSaude': 'Unificado da Saúde'
  }

  let template: string;
  let templateKey: keyof FormDataCompleto;

  if (eRegistroPreco === 'sim') {
    if (qualTipoContratacao === 'simples') {
      template = sim_texto_registro_preco_simples;
      templateKey = 'sim_texto_registro_preco_simples';
    } else if (qualTipoContratacao === 'unificadoSaude') {
      template = sim_texto_registro_preco_unificado_saude;
      templateKey = 'sim_texto_registro_preco_unificado_saude';
    } else if (qualTipoContratacao === 'corporativo') {
      if (reducaoEscopo === 'sim') {
        template = sim_texto_registro_preco_corporativo_e_havera_reducao_escopo;
        templateKey = 'sim_texto_registro_preco_corporativo_e_havera_reducao_escopo';
      } else {
        template = sim_texto_registro_preco_corporativo;
        templateKey = 'sim_texto_registro_preco_corporativo';
      }
    } else {
      template = sim_texto_e_registro_preco;
      templateKey = 'sim_texto_e_registro_preco';
    }
  } else if (eRegistroPreco === 'nao') {
    template = nao_texto_e_registro_preco;
    templateKey = 'nao_texto_e_registro_preco';
  } else {
    return <p className="text-gray-400 italic">Selecione se é Registro de Preços.</p>;
  }

  let textoEstudo: string = "";
  if (eEstudosTecnicosPreliminares === 'sim') {
    textoEstudo = "no Estudo Técnico Preliminar";
  } else if (eEstudosTecnicosPreliminares === 'nao') {
    textoEstudo = ""; 
  }
  const valores = {
    paraContratacaoEventualPrestacaoServico: paraContratacaoEventualPrestacaoServico || "______",
    visandoAtenderNecessidades: visandoAtenderNecessidades || "______",
    eEstudosTecnicosPreliminares: textoEstudo || "", 
    qualTipoContratacao: mapTipoContratacao[qualTipoContratacao] || "______",
    quaisOrgaosOuEntidades: formData.quaisOrgaosOuEntidades || "______"
  };

  const textoFinalComValores = substituirPlaceholders(template, valores);

  const handleSave = (novoValor: string) => {
    setFormData((prev) => ({
      ...prev,
      [templateKey]: novoValor
    }));
  };
  
  if (isEditing) {
    return (
      <EditableTextarea
        initialValue={template}
        onSave={handleSave}
        className="text-lg"
        isEditing={isEditing}
      />
    );
  }

  return (
    <p
      className="text-lg p-2 rounded-md"
      dangerouslySetInnerHTML={{ __html: textoFinalComValores }}
    />
  );
}

function GerarTextoItem1_2({ formData, setFormData, isEditing }: GerarTextoProps) {
  
  const templateKey: keyof FormDataCompleto = 'seCoperativa'; 
  const template = formData[templateKey];

  const handleSave = (novoValor: string) => {
    setFormData((prev) => ({
      ...prev,
      [templateKey]: novoValor
    }));
  };

  const valores = {
    quaisOrgaosOuEntidades: formData.quaisOrgaosOuEntidades || "________________________________",
    justificaCasoConcretoUmaVezQue: formData.justificaCasoConcretoUmaVezQue || "________________________________"
  };

  const textoComValores = substituirPlaceholders(template, valores);
  
  if (isEditing) {
    return (
      <EditableTextarea
        initialValue={template}
        onSave={handleSave}
        className="text-lg"
        isEditing={isEditing}
      />
    );
  }

  return (
    <p
      className="text-lg p-2 rounded-md"
      dangerouslySetInnerHTML={{ __html: textoComValores }}
    />
  );
}

function JustificativaNecessidadeContratacao({ formData, setFormData, isEditing }: GerarTextoProps) {
  const { 
    eEstudosTecnicosPreliminares,
    texto_sim_existEtpOuInformacaoPresenteExtratoSigiloso,
    texto_nao_existEtpOuInformacaoPresenteExtratoSigiloso,
    texto_nao_existEtpOuInformacaoPresenteExtratoSigilosoItemDois,
  } = formData;

  const handleSave = (campo: keyof FormDataCompleto, novoValor: string) => {
    setFormData((prev) => ({
      ...prev,
      [campo]: novoValor
    }));
  };

  const valores = {
    itemEtpEstudosTécnicos: formData.itemEtpEstudosTecnicos || "____",
    presenteContratacaoNecessidadeServicos: formData.presenteContratacaoNecessidadeServicos || "____",
    desempenhoAtribuicoesFuncionais: formData.desempenhoAtribuicoesFuncionais || "____",
    umaVezQueAtribuicoesFuncionais: formData.umaVezQueAtribuicoesFuncionais || "____",
    deverLegalExposto: formData.deverLegalExposto || "____",
    queDeterminaDispositivoLegalCitado: formData.queDeterminaDispositivoLegalCitado || "____",
    eEstudosTecnicosPreliminares: formData.eEstudosTecnicosPreliminares || "____",
    visandoAtenderNecessidades: formData.visandoAtenderNecessidades || "______",
    texto_nao_existEtpOuInformacaoPresenteExtratoSigilosoItemDois: formData.texto_nao_existEtpOuInformacaoPresenteExtratoSigilosoItemDois || "____",
    texto_nao_existEtpOuInformacaoPresenteExtratoSigiloso: formData.texto_nao_existEtpOuInformacaoPresenteExtratoSigiloso || "____",
    atenderaDeverLegalExposto: formData.atenderaDeverLegalExposto || "____",
  };

  switch (eEstudosTecnicosPreliminares) {
    case 'sim': {
      const textoComValores = substituirPlaceholders(texto_sim_existEtpOuInformacaoPresenteExtratoSigiloso, valores);
      
      if (isEditing) {
        return (
          <EditableTextarea
            initialValue={texto_sim_existEtpOuInformacaoPresenteExtratoSigiloso}
            onSave={(novoValor: string) => handleSave('texto_sim_existEtpOuInformacaoPresenteExtratoSigiloso', novoValor)}
            className="text-lg"
            isEditing={isEditing}
          />
        );
      }
      
      return (
        <p
          className="text-lg p-2 rounded-md"
          dangerouslySetInnerHTML={{ __html: textoComValores }}
        />
      );
    }
      
    case 'nao': {
      const textoUmComValores = substituirPlaceholders(texto_nao_existEtpOuInformacaoPresenteExtratoSigiloso, valores);
      const textoDoisComValores = substituirPlaceholders(texto_nao_existEtpOuInformacaoPresenteExtratoSigilosoItemDois, valores);

      // 3. CORREÇÃO: Adicionar a lógica "if (isEditing)"
      if (isEditing) {
        return (
         <>
             <EditableTextarea
            initialValue={texto_nao_existEtpOuInformacaoPresenteExtratoSigiloso}
            onSave={(novoValor: string) => handleSave('texto_nao_existEtpOuInformacaoPresenteExtratoSigiloso', novoValor)}
            className="text-lg"
            isEditing={isEditing}
          />
          {formData.atenderaDeverLegalExposto === 'sim' && (
            <EditableTextarea
              initialValue={texto_nao_existEtpOuInformacaoPresenteExtratoSigilosoItemDois}
              onSave={(novoValor: string) => handleSave('texto_nao_existEtpOuInformacaoPresenteExtratoSigilosoItemDois', novoValor)}
              className="text-lg"
              isEditing={isEditing}
            />
          )}
         </>
        );
      }

      return (
        <>
          <p
            className="text-lg p-2 rounded-md"
            dangerouslySetInnerHTML={{ __html: textoUmComValores }}
          />
          {formData.atenderaDeverLegalExposto === 'sim' && (
            <p
              className="text-lg p-2 rounded-md text-blue-700"
              dangerouslySetInnerHTML={{ __html: textoDoisComValores }}
            />
          )}
        </>
      );
    }
      
    default:
      // 4. CORREÇÃO: Mensagem de fallback mais clara
      return <p className="text-gray-400 italic">Opção de ETP (2.1) não selecionada.</p>;
  }
}

function JustificativaEscolhaSolucao({ formData, setFormData, isEditing }: GerarTextoProps) {
  const { 
    eEstudosTecnicosPreliminares,
    texto_sim_justificativa_solucao,
    texto_nao_justificativa_solucao
  } = formData;

  const handleSave = (campo: keyof FormDataCompleto, novoValor: string) => {
    setFormData((prev) => ({
      ...prev,
      [campo]: novoValor
    }));
  };

  const valores = {
    itemEtpJustificativaSolucao: formData.itemEtpJustificativaSolucao || "_______",
    justificativaEscolhaSolucaoNaoEtp: formData.justificativaEscolhaSolucaoNaoEtp || "________________",
  };

  switch (eEstudosTecnicosPreliminares) {
    case 'sim': {
      const textoComValores = substituirPlaceholders(texto_sim_justificativa_solucao, valores);
      return (
        isEditing ? (
          <EditableTextarea
            initialValue={texto_sim_justificativa_solucao}
            onSave={(novoValor: string) => handleSave('texto_sim_justificativa_solucao', novoValor)}
            className="text-lg"
            isEditing={isEditing}
          />
        ) : (
          <p
            className="text-lg p-2 rounded-md"
            dangerouslySetInnerHTML={{ __html: textoComValores }}
          />
        )
      );
    }
    case 'nao': {
      const textoComValores = substituirPlaceholders(texto_nao_justificativa_solucao, valores);
      return (
        isEditing ? (
          <EditableTextarea
            initialValue={texto_nao_justificativa_solucao}
            onSave={(novoValor: string) => handleSave('texto_nao_justificativa_solucao', novoValor)}
            className="text-lg"
            isEditing={isEditing}
          />
        ) : (
          <p
            className="text-lg p-2 rounded-md"
            dangerouslySetInnerHTML={{ __html: textoComValores }}
          />
        )
      );
    }
    default:
      return <p className="text-gray-400 italic">Opção de ETP (2.3.1) não selecionada.</p>;
  }
}

function JustificativaParcelamento({ formData, setFormData, isEditing }: GerarTextoProps) {
  const { 
    eEstudosTecnicosPreliminares,
    tipoParcelamentoNaoEtp,
    usaLotesEspelhados
  } = formData;

  const handleSave = (campo: keyof FormDataCompleto, novoValor: string) => {
    setFormData((prev) => ({
      ...prev,
      [campo]: novoValor
    }));
  };

  const valores = {
    // Caso ETP = Sim
    itemEtpJustificativaParcelamento: formData.itemEtpJustificativaParcelamento || "_____",
    
    // Caso ETP = Não (Item)
    razoesParcelamentoItem: formData.razoesParcelamentoItem || "_________________",
    
    // Caso ETP = Não (Lote)
    justificativaAgrupamentoLote: formData.justificativaAgrupamentoLote || "_________________",

    // Caso Lotes Espelhados
    argumentosLotesEspelhados: formData.argumentosLotesEspelhados || "_________________",
  };

  switch (eEstudosTecnicosPreliminares) {
    case 'sim': {
      const textoComValores = substituirPlaceholders(formData.texto_sim_justificativa_parcelamento, valores);
      return (
        isEditing ? (
          <EditableTextarea
            initialValue={formData.texto_sim_justificativa_parcelamento}
            onSave={(novoValor: string) => handleSave('texto_sim_justificativa_parcelamento', novoValor)}
            className="text-lg"
            isEditing={isEditing}
          />
        ) : (
          <p
            className="text-lg p-2 rounded-md"
            dangerouslySetInnerHTML={{ __html: textoComValores }}
          />
        )
      );
    }
    case 'nao': {
      return (
        <>
          {/* Renderiza a sub-opção (Item ou Lote) */}
          {tipoParcelamentoNaoEtp === 'item' && (
            <>
              <EditableTextarea
                initialValue={formData.texto_nao_parcelamento_item_p1}
                onSave={(novoValor: string) => handleSave('texto_nao_parcelamento_item_p1', novoValor)}
                className="text-lg" isEditing={isEditing}
              />
              <EditableTextarea
                initialValue={formData.texto_nao_parcelamento_item_p2}
                onSave={(novoValor: string) => handleSave('texto_nao_parcelamento_item_p2', novoValor)}
                className="text-lg" isEditing={isEditing}
              />
              <p
                className="text-lg p-2 rounded-md"
                dangerouslySetInnerHTML={{ __html: substituirPlaceholders(formData.texto_nao_parcelamento_item_p3, valores) }}
              />
              <EditableTextarea
                initialValue={formData.texto_nao_parcelamento_item_p4}
                onSave={(novoValor: string) => handleSave('texto_nao_parcelamento_item_p4', novoValor)}
                className="text-lg" isEditing={isEditing}
              />
            </>
          )}
          
          {tipoParcelamentoNaoEtp === 'lote' && (
            <>
              <p
                className="text-lg p-2 rounded-md"
                dangerouslySetInnerHTML={{ __html: substituirPlaceholders(formData.texto_nao_parcelamento_lote_p1, valores) }}
              />
              <EditableTextarea
                initialValue={formData.texto_nao_parcelamento_lote_p2}
                onSave={(novoValor: string) => handleSave('texto_nao_parcelamento_lote_p2', novoValor)}
                className="text-lg" isEditing={isEditing}
              />
            </>
          )}

          {/* Renderiza o Add-on de Lotes Espelhados, se selecionado */}
          {usaLotesEspelhados === 'sim' && (
            <>
              <EditableTextarea
                initialValue={formData.texto_lotes_espelhados_p1}
                onSave={(novoValor: string) => handleSave('texto_lotes_espelhados_p1', novoValor)}
                className="text-lg" isEditing={isEditing}
              />
              <p
                className="text-lg p-2 rounded-md"
                dangerouslySetInnerHTML={{ __html: substituirPlaceholders(formData.texto_lotes_espelhados_p2, valores) }}
              />
              <EditableTextarea
                initialValue={formData.texto_lotes_espelhados_p3}
                onSave={(novoValor: string) => handleSave('texto_lotes_espelhados_p3', novoValor)}
                className="text-lg" isEditing={isEditing}
              />
            </>
          )}
        </>
      );
    }
    default:
      return <p className="text-gray-400 italic">Opção de ETP (2.4.1) não selecionada.</p>;
  }
}

function JustificativaQuantitativo({ formData, setFormData, isEditing }: GerarTextoProps) {
  const { 
    eEstudosTecnicosPreliminares,
    texto_sim_justificativa_quantitativo,
    texto_nao_justificativa_quantitativo,
    texto_nao_justificativa_quantitativo_textoDois
  } = formData;

  const handleSave = (campo: keyof FormDataCompleto, novoValor: string) => {
    setFormData((prev) => ({
      ...prev,
      [campo]: novoValor
    }));
  };

  const valores = {
    // Para 'sim'
    itemEtpQuantitativo: formData.itemEtpQuantitativo || "_______",
    // Para 'nao'
    osQuantitativosPrecistoDefinidosNoDocumento: formData.osQuantitativosPrecistoDefinidosNoDocumento || "________",
    fundamentadoEm: formData.fundamentadoEm || "________",
    texto_nao_justificativa_quantitativo_textoDois: formData.texto_nao_justificativa_quantitativo_textoDois || "________",
  };

  switch (eEstudosTecnicosPreliminares) {
    case 'sim': {
      const textoComValores = substituirPlaceholders(texto_sim_justificativa_quantitativo, valores);
      return (
        isEditing ? (
          <EditableTextarea
            initialValue={texto_sim_justificativa_quantitativo}
            onSave={(novoValor: string) => handleSave('texto_sim_justificativa_quantitativo', novoValor)}
            className="text-lg"
            isEditing={isEditing}
          />
        ) : (
          <p
            className="text-lg p-2 rounded-md"
            dangerouslySetInnerHTML={{ __html: textoComValores }}
          />
        )
      );
    }
    case 'nao': {
      const textoComValores = substituirPlaceholders(texto_nao_justificativa_quantitativo, valores);
      const textoComValoresDois = substituirPlaceholders(texto_nao_justificativa_quantitativo_textoDois, valores);
      return (
        isEditing ? (
          <>
            <EditableTextarea
              initialValue={texto_nao_justificativa_quantitativo}
              onSave={(novoValor: string) => handleSave('texto_nao_justificativa_quantitativo', novoValor)}
              className="text-lg"
              isEditing={isEditing}
            />
            <EditableTextarea
              initialValue={texto_nao_justificativa_quantitativo_textoDois}
              onSave={(novoValor: string) => handleSave('texto_nao_justificativa_quantitativo_textoDois', novoValor)}
              className="text-lg"
              isEditing={isEditing}
            />
          </>
        ) : (
          <>
            <p
            className="text-lg p-2 rounded-md"
            dangerouslySetInnerHTML={{ __html: textoComValores }}
          />
          <p
            className="text-lg p-2 rounded-md text-blue-700"
            dangerouslySetInnerHTML={{ __html: textoComValoresDois }}
          />
          </>
        )
      );
    }
    default:
      return <p className="text-gray-400 italic">Opção de ETP (2.2.1) não selecionada.</p>;
  }
}

function GerarTextoValorEstimado({formData, setFormData, isEditing}: GerarTextoProps) {
  const { orcamentoSigiloso, tipoValorEstimado } = formData;

  const handleSave = (campo: keyof FormDataCompleto, novoValor: string) => {
    setFormData((prev) => ({ ...prev, [campo]: novoValor }));
  };

  const valores = {
    tipoValor: tipoValorEstimado === 'valor_estimado' ? (formData.valorEstimadoMensal ? 'mensal' : 'global') : '',
    valorEstimadoMensal: formData.valorEstimadoMensal,
    valorEstimadoMensalExtenso: numeroPorExtenso(formData.valorEstimadoMensal),
    valorGlobal: formData.valorEstimadoGlobal,
    valorGlobalExtenso: numeroPorExtenso(formData.valorEstimadoGlobal),
    prazoMeses: formData.prazoMesesContrato,
    prazoMesesExtenso: numeroPorExtenso(formData.prazoMesesContrato),
    valorReferencia: formData.valorReferenciaMaiorDesconto,
    valorReferenciaExtenso: numeroPorExtenso(formData.valorReferenciaMaiorDesconto),
    justificativaSigilo: formData.justificativaOrcamentoSigiloso,
  };

  const renderTexto = (template: string, templateKey: keyof FormDataCompleto) => {
    if (isEditing) {
      return (
        <EditableTextarea
          initialValue={template}
          onSave={(v) => handleSave(templateKey, v)}
          isEditing={isEditing}
          className="text-lg"
        />
      );
    }
    return (
      <p
        className="text-lg p-2 rounded-md"
        dangerouslySetInnerHTML={{ __html: substituirPlaceholders(template, valores) }}
      />
    );
  };

 return (
  <>
    {orcamentoSigiloso === 'nao' ? (
      <>
        {renderTexto(formData.texto_valor_estimado_nao_sigiloso, 'texto_valor_estimado_nao_sigiloso')}
        
        {!tipoValorEstimado && !isEditing && (
          <p className="text-gray-400 italic">Selecione o tipo de valor.</p>
        )}
      </>
    ) : (
      <>
        {renderTexto(formData.texto_orcamento_sigiloso, 'texto_orcamento_sigiloso')}
        
      </>
    )}
    {/* Textos comuns a todos os casos */}
    {renderTexto(formData.texto_valor_estimado_todos_casos_p1, 'texto_valor_estimado_todos_casos_p1')}
    {renderTexto(formData.texto_valor_estimado_todos_casos_p2, 'texto_valor_estimado_todos_casos_p2')}
  </>
);
}

function GerarTextoClassificacaoOrcamentaria({formData, setFormData, isEditing}: GerarTextoProps) {
    const { classificacoesOrcamentarias, eRegistroPreco, elemento_de_despesa } = formData;
    const isRP = eRegistroPreco === 'sim';

    const handleSave = (campo: keyof FormDataCompleto, novoValor: string) => {
      setFormData((prev) => ({ ...prev, [campo]: novoValor }));
    };

    return (
        <>
            <EditableTextarea 
              initialValue={formData.texto_classificacao_orcamentaria_p1}
              onSave={(v) => handleSave('texto_classificacao_orcamentaria_p1', v)}
              isEditing={isEditing}
              className="text-lg"
            />

            {/* EXIBE O ELEMENTO DE DESPESA QUE VOCÊ DIGITOU NO FORMULÁRIO */}
            {elemento_de_despesa && (
              <p className="text-lg mt-2 whitespace-pre-wrap">
                {elemento_de_despesa}
              </p>
            )}

            {classificacoesOrcamentarias.length > 0 ? (
                <ul className="list-disc pl-8 mt-2 space-y-2 text-lg">
                    {classificacoesOrcamentarias.map(item => (
                        <li key={item.id}>
                            <strong>Elemento de Despesa:</strong> {item.elementoDespesa || "____"}
                            {!isRP && (
                                <div className="pl-4" style={{ textIndent: '-1em', paddingLeft: '1em' }}>
                                    <strong>Fonte:</strong> {item.fonte || "____"}<br/>
                                    <strong>Unidade:</strong> {item.unidade || "____"}<br/>
                                    <strong>Programa:</strong> {item.programa || "____"}<br/>
                                    <strong>Ação:</strong> {item.acao || "____"}<br/>
                                    <strong>Categoria Econômica:</strong> {item.categoriaEconomica || "____"}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
              !isEditing && <p className="text-gray-500 italic">[Nenhuma classificação orçamentária adicionada]</p>
            )}
        </>
    );
}

function GerarTextoJustificativaLC123({formData, setFormData, isEditing}: GerarTextoProps) {
  const { justificativaBeneficioLC123Opcao } = formData;

  const handleSave = (campo: keyof FormDataCompleto, novoValor: string) => {
    setFormData((prev) => ({ ...prev, [campo]: novoValor }));
  };

  const valores = {
    itensLotesCotaExclusiva: formData.itensLotesCotaExclusiva || "(TODOS)",
    incisosArt49LC123: formData.incisosArt49LC123 || "____",
    incisosArt9Decreto45140: formData.incisosArt9Decreto45140 || "____",
    justificativaNaoAplicacaoArt49: formData.justificativaNaoAplicacaoArt49 || "____",
    itensLotesNaoAplicacaoArt4: formData.itensLotesNaoAplicacaoArt4 || "____",
  };

  const renderTexto = (template: string, templateKey: keyof FormDataCompleto) => {
    if (isEditing) {
      return (
        <EditableTextarea
          initialValue={template}
          onSave={(v) => handleSave(templateKey, v)}
          isEditing={isEditing}
          className="text-lg"
        />
      );
    }
    return (
      <p
        className="text-lg p-2 rounded-md"
        dangerouslySetInnerHTML={{ __html: substituirPlaceholders(template, valores) }}
      />
    );
  };

  const templateByOption: Record<string, { tpl: string; key: keyof FormDataCompleto }> = {
    aplicar: { tpl: formData.texto_cota_exclusiva_sim, key: 'texto_cota_exclusiva_sim' },
    nao_aplicar_sem_enquadramento: { tpl: formData.texto_cota_exclusiva_nao_enquadra, key: 'texto_cota_exclusiva_nao_enquadra' },
    nao_aplicar_art_49: { tpl: formData.texto_cota_exclusiva_nao_art_49, key: 'texto_cota_exclusiva_nao_art_49' },
    nao_aplicar_art_4_lei_14133: { tpl: formData.texto_cota_exclusiva_nao_art_4_lei_14133, key: 'texto_cota_exclusiva_nao_art_4_lei_14133' },
  };

  if (!Array.isArray(justificativaBeneficioLC123Opcao) || justificativaBeneficioLC123Opcao.length === 0) {
    return <p className="text-gray-400 italic">Opção de aplicação do benefício (4.3) não selecionada.</p>;
  }
  return (
    <>
      {justificativaBeneficioLC123Opcao.map((opt) => {
        const entry = templateByOption[opt];
        if (!entry) return null;
        return renderTexto(entry.tpl, entry.key);
      })}
    </>
  );
}

// --- SEÇÃO 5 ---

function GerarTextoModalidadeLicitacao({formData, setFormData, isEditing}: GerarTextoProps) {
  const handleSave = (campo: keyof FormDataCompleto, novoValor: string) => {
    setFormData((prev) => ({ ...prev, [campo]: novoValor }));
  };

  const mapTextos = {
    modalidadeLicitacao: {
      'pregao': 'Pregão Eletrônico',
      'concorrencia': 'Concorrência Eletrônica'
    },
    criterioJulgamento: {
      'menor_preco_unitario': 'Menor Preço Unitário/Por Item',
      'menor_preco_global': 'Menor Preço Global/Por Lote',
      'maior_desconto': 'Maior Desconto'
    },
    regimeExecucao: {
      'empreitada_preco_unitario': 'Empreitada por Preço Unitário',
      'empreitada_preco_global': 'Empreitada por Preço Global',
      'empreitada_integral': 'Empreitada Integral',
      'contratacao_tarefa': 'Contratação por Tarefa'
    },
    modoDisputa: {
      'aberto_fechado': 'Aberto-Fechado',
      'aberto': 'Aberto',
      'fechado_aberto': 'Fechado-Aberto'
    }
  };

  const valores = {
    modalidadeLicitacao: mapTextos.modalidadeLicitacao[formData.modalidadeLicitacao as keyof typeof mapTextos.modalidadeLicitacao] || "____",
    criterioJulgamento: mapTextos.criterioJulgamento[formData.criterioJulgamento as keyof typeof mapTextos.criterioJulgamento] || "____",
    regimeExecucao: mapTextos.regimeExecucao[formData.regimeExecucao as keyof typeof mapTextos.regimeExecucao] || "____",
    modoDisputa: mapTextos.modoDisputa[formData.modoDisputa as keyof typeof mapTextos.modoDisputa] || "____",
    motivacaoParametrosLicitacao: formData.motivacaoParametrosLicitacao || "____",
    justificativaInversaoFases: formData.justificativaInversaoFases || "____",
  };

  const renderTexto = (template: string, templateKey: keyof FormDataCompleto) => {
    if (isEditing) {
      return (
        <EditableTextarea
          initialValue={template}
          onSave={(v) => handleSave(templateKey, v)}
          isEditing={isEditing}
          className="text-lg"
        />
      );
    }
    return (
      <p
        className="text-lg p-2 rounded-md"
        dangerouslySetInnerHTML={{ __html: substituirPlaceholders(template, valores) }}
      />
    );
  };

  return (
    <>
      {renderTexto(formData.texto_licitacao_p1, 'texto_licitacao_p1')}
      {renderTexto(formData.texto_licitacao_p2, 'texto_licitacao_p2')}
      {renderTexto(formData.texto_licitacao_p3, 'texto_licitacao_p3')}
      {renderTexto(formData.texto_licitacao_p4, 'texto_licitacao_p4')}
      {formData.inversaoFases === 'sim' && renderTexto(formData.texto_inversao_fases, 'texto_inversao_fases')}
    </>
  );
}

function GerarTextoProposta({formData, setFormData, isEditing}: GerarTextoProps) {
  const handleSave = (campo: keyof FormDataCompleto, novoValor: string) => {
    setFormData((prev) => ({ ...prev, [campo]: novoValor }));
  };

  const mapTipoAmostra: Record<string, string> = {
    'amostra': 'amostra',
    'exame_conformidade': 'exame de conformidade',
    'prova_conceito': 'prova de conceito',
    'outro': formData.outroTipoAmostra || "teste"
  };

  const valores = {
    prazoValidadePropostaDias: formData.prazoValidadePropostaDias || "__",
    prazoValidadePropostaDiasExtenso: numeroPorExtenso(formData.prazoValidadePropostaDias || ''),
    documentosAdicionaisProposta: formData.documentosAdicionaisProposta || "____",
    percentualGarantiaProposta: formData.percentualGarantiaProposta || "__",
    percentualGarantiaPropostaExtenso: numeroPorExtenso(formData.percentualGarantiaProposta || ''),
    justificativaGarantiaProposta: formData.justificativaGarantiaProposta || "____",
    requerCondicaoPropostaParaos: formData.requerCondicaoPropostaParaos || "____",
  requerCondicaoPropostaAcompanhadaDoSeguinteDocumento: formData.requerCondicaoPropostaAcompanhadaDoSeguinteDocumento || "____",
    tipoAmostra: mapTipoAmostra[formData.tipoAmostra] || "teste",
    justificativaAmostra: formData.justificativaAmostra || "____",
    prazoAmostraDiasUteis: formData.prazoAmostraDiasUteis || "__",
    prazoAmostraDiasUteisExtenso: numeroPorExtenso(formData.prazoAmostraDiasUteis || ''),
    enderecoApresentacaoAmostra: formData.enderecoApresentacaoAmostra || "____",
    horarioApresentacaoAmostra: formData.horarioApresentacaoAmostra || "____",
    setorResponsavelAmostra: formData.setorResponsavelAmostra || "____",
    texto_dois_amostra_fase_julgamento: formData.texto_dois_amostra_fase_julgamento || "____",
    texto_tres_amostra_fase_julgamento: formData.texto_tres_amostra_fase_julgamento || "____",
    prova_conceito_redacao_para_todos_os_casos_texto: formData.prova_conceito_redacao_para_todos_os_casos_texto,
    prova_conceito_redacao_para_todos_os_casos_texto_dois: formData.prova_conceito_redacao_para_todos_os_casos_texto_dois,
    prova_conceito_redacao_para_todos_os_casos_texto_tres: formData.prova_conceito_redacao_para_todos_os_casos_texto_tres,
    prova_conceito_redacao_para_todos_os_casos_texto_quatro: formData.prova_conceito_redacao_para_todos_os_casos_texto_quatro,
    prova_conceito_redacao_para_todos_os_casos_texto_quinto: formData.prova_conceito_redacao_para_todos_os_casos_texto_quinto || "____",
    prova_conceito_redacao_para_todos_os_casos_texto_seis: formData.prova_conceito_redacao_para_todos_os_casos_texto_seis,
    prova_conceito_redacao_para_todos_os_casos_texto_sete: formData.prova_conceito_redacao_para_todos_os_casos_texto_sete,
    prova_conceito_redacao_para_todos_os_casos_texto_oito: formData.prova_conceito_redacao_para_todos_os_casos_texto_oito,
    prova_conceito_redacao_para_todos_os_casos_texto_nove: formData.prova_conceito_redacao_para_todos_os_casos_texto_nove,
    prova_conceito_redacao_para_todos_os_casos_texto_dez: formData.prova_conceito_redacao_para_todos_os_casos_texto_dez,
    prova_conceito_redacao_para_todos_os_casos_texto_onze: formData.prova_conceito_redacao_para_todos_os_casos_texto_onze,
    prova_conceito_redacao_para_todos_os_casos_texto_doze: formData.prova_conceito_redacao_para_todos_os_casos_texto_doze,
    prova_conceito_redacao_para_todos_os_casos_texto_treze: formData.prova_conceito_redacao_para_todos_os_casos_texto_treze,
horarioTerminoApresentacaoAmostra: formData.horarioTerminoApresentacaoAmostra,
  telefoneParaAgendamento: formData.telefoneParaAgendamento,
  emailParaAgendamento: formData.emailParaAgendamento,
  aProvaDeConceito: formData.aProvaDeConceito,
  duracaoProvaConceitoDiasUteis: formData.duracaoProvaConceitoDiasUteis,
  duracaoProvaConceitoDiasUteisPorExtenso: numeroPorExtenso(formData.duracaoProvaConceitoDiasUteis || '___'),
  provaDeConceitoConsistiraEm: formData.provaDeConceitoConsistiraEm,
  comprovacaoAtendimentoPercentualPorExtenso: numeroPorExtenso(formData.comprovacaoAtendimentoPercentual || '___'),
  comprovacaoAtendimentoPercentual: formData.comprovacaoAtendimentoPercentual,
  setorExaminadoreAvaliadorProvaConceito: formData.setorExaminadoreAvaliadorProvaConceito || "____",
  orgaoEntidadeProvaConceito: formData.orgaoEntidadeProvaConceito || "____",
  prazoAnaliseProvaConceitoDiasUteis: formData.prazoAnaliseProvaConceitoDiasUteis || "__",
  prazoAnaliseProvaConceitoDiasUteisExtenso: numeroPorExtenso(formData.prazoAnaliseProvaConceitoDiasUteis || '___'),
  deInteresseDas: formData.deInteresseDas || "____",

  
  };

  const renderTexto = (template: string, templateKey: keyof FormDataCompleto) => {
    if (isEditing) {
      return (
        <EditableTextarea
          initialValue={template}
          onSave={(v) => handleSave(templateKey, v)}
          isEditing={isEditing}
          className="text-lg"
        />
      );
    }
    return (
      <p
        className="text-lg p-2 rounded-md"
        dangerouslySetInnerHTML={{ __html: substituirPlaceholders(template, valores) }}
      />
    );
  };

  return (
    <>
      <p className="font-semibold">5.2.1 prazo de validade da proposta</p>
      {renderTexto(formData.texto_prazo_validade_proposta, 'texto_prazo_validade_proposta')}

      {formData.requerCondicaoProposta === 'sim' && (
        <>
          <p className="font-semibold">5.2.2 Condições da Proposta</p>
          {renderTexto(formData.texto_condicoes_proposta, 'texto_condicoes_proposta')}
        </>
      )}
      
      {/* Garantia de Proposta */}
      {formData.requeGarantiaProposta === 'sim' && (
        <>
          <p className="font-semibold">5.2.3 Garantia da Proposta</p>
          {renderTexto(formData.texto_garantia_proposta_p1, 'texto_garantia_proposta_p1')}
          {renderTexto(formData.texto_garantia_proposta_p2, 'texto_garantia_proposta_p2')}
        </>
      )}

      <>
          <p className="font-semibold">5.2.4 DA AMOSTRA OU EXAME DE CONFORMIDADE OU PROVA DE CONCEITOOU OUTROS TESTES DE INTERESSE DA ADMINISTRAÇÃO (QUANDO FOR O CASO)</p>
          
          {renderTexto(formData.texto_amostra_requisicao_p1, 'texto_amostra_requisicao_p1')}
          {renderTexto(formData.texto_amostra_prazo_p1, 'texto_amostra_prazo_p1')}
          
          {formData.faseApresentacaoAmostra === 'julgamento_proposta' && (
            <>
              {renderTexto(formData.texto_amostra_fase_julgamento, 'texto_amostra_fase_julgamento')}
              {renderTexto(formData.texto_dois_amostra_fase_julgamento, 'texto_dois_amostra_fase_julgamento')}
              {renderTexto(formData.texto_tres_amostra_fase_julgamento, 'texto_tres_amostra_fase_julgamento')}
            </>
          )}

          {formData.faseApresentacaoAmostra === 'vigencia_contratual' && (
            <>
            {renderTexto(formData.texto_amostra_fase_contratual, 'texto_amostra_fase_contratual')}
            </>
          )}

          {formData.faseApresentacaoAmostra === 'apos_homologacao' && (
            <>
            {renderTexto(formData.texto_amostra_fase_condicao_assinatura, 'texto_amostra_fase_condicao_assinatura')}
            </>
          )}

          {renderTexto(formData.prova_conceito_redacao_para_todos_os_casos_texto, 'prova_conceito_redacao_para_todos_os_casos_texto')}
          {renderTexto(formData.prova_conceito_redacao_para_todos_os_casos_texto_dois, 'prova_conceito_redacao_para_todos_os_casos_texto_dois')}
          {renderTexto(formData.prova_conceito_redacao_para_todos_os_casos_texto_tres, 'prova_conceito_redacao_para_todos_os_casos_texto_tres')}
          {renderTexto(formData.prova_conceito_redacao_para_todos_os_casos_texto_quatro, 'prova_conceito_redacao_para_todos_os_casos_texto_quatro')}
          {renderTexto(formData.prova_conceito_redacao_para_todos_os_casos_texto_quinto, 'prova_conceito_redacao_para_todos_os_casos_texto_quinto')}
          {renderTexto(formData.prova_conceito_redacao_para_todos_os_casos_texto_seis, 'prova_conceito_redacao_para_todos_os_casos_texto_seis')}
          {renderTexto(formData.prova_conceito_redacao_para_todos_os_casos_texto_sete, 'prova_conceito_redacao_para_todos_os_casos_texto_sete')}
          {renderTexto(formData.prova_conceito_redacao_para_todos_os_casos_texto_oito, 'prova_conceito_redacao_para_todos_os_casos_texto_oito')}
          {renderTexto(formData.prova_conceito_redacao_para_todos_os_casos_texto_nove, 'prova_conceito_redacao_para_todos_os_casos_texto_nove')}
          {renderTexto(formData.prova_conceito_redacao_para_todos_os_casos_texto_dez, 'prova_conceito_redacao_para_todos_os_casos_texto_dez')}
          {renderTexto(formData.prova_conceito_redacao_para_todos_os_casos_texto_onze, 'prova_conceito_redacao_para_todos_os_casos_texto_onze')}
          {renderTexto(formData.prova_conceito_redacao_para_todos_os_casos_texto_doze, 'prova_conceito_redacao_para_todos_os_casos_texto_doze')}
          {renderTexto(formData.prova_conceito_redacao_para_todos_os_casos_texto_treze, 'prova_conceito_redacao_para_todos_os_casos_texto_treze')}

          {/* Renderiza a lista de critérios */}
          {formData.descricaoTesteAmostra.length > 0 ? (
            <ol type="a" className="list-outside list-[upper-alpha] pl-8 text-lg space-y-2">
              {formData.descricaoTesteAmostra.map((item, index) => (
                <li key={index} className="text-gray-800 text-justify">{item}</li>
              ))}
            </ol>
          ) : !isEditing && <p className="text-gray-500 italic">[Nenhum critério de teste adicionado]</p>}
          
          {renderTexto(formData.texto_amostra_comum_p3, 'texto_amostra_comum_p3')}
        </>
    </>
  );
}

function GerarTextoHabilitacao({formData, setFormData, isEditing}: GerarTextoProps) {
  // Esta função "mãe" apenas estrutura as sub-seções
  return (
    <>
      <GerarTextoHabilitacaoJuridica formData={formData} setFormData={setFormData} isEditing={isEditing} />
      <h4 className="text-md font-bold pt-4 pb-2 text-justify">REQUISITOS DE QUALIFICAÇÃO TÉCNICA</h4>
      <GerarTextoHabilitacaoTecnica formData={formData} setFormData={setFormData} isEditing={isEditing} />
      <h4 className="text-md font-bold pt-4 pb-2 text-justify">REQUISITOS DE QUALIFICAÇÃO ECONÔMICO-FINANCEIRA</h4>
      <GerarTextoHabilitacaoEconomica formData={formData} setFormData={setFormData} isEditing={isEditing} />
    </>
  );
}

function GerarTextoHabilitacaoJuridica({formData, setFormData, isEditing}: GerarTextoProps) {
  const { habilitacaoJuridicaLeiEspecial } = formData;
  if (habilitacaoJuridicaLeiEspecial !== 'sim') return null;

  const handleSave = (campo: keyof FormDataCompleto, novoValor: string) => {
    setFormData((prev) => ({ ...prev, [campo]: novoValor }));
  };

  const valores = {
    atividadeAutorizacaoJuridica: formData.atividadeAutorizacaoJuridica || "____",
    orgaoAutorizacaoJuridica: formData.orgaoAutorizacaoJuridica || "____",
    numeroLeiAutorizacaoJuridica: formData.numeroLeiAutorizacaoJuridica || "____",
  };

  const renderTexto = (template: string, templateKey: keyof FormDataCompleto) => {
    if (isEditing) {
      return (
        <EditableTextarea
          initialValue={template}
          onSave={(v) => handleSave(templateKey, v)}
          isEditing={isEditing}
          className="text-lg"
        />
      );
    }
    return (
      <p
        className="text-lg p-2 rounded-md"
        dangerouslySetInnerHTML={{ __html: substituirPlaceholders(template, valores) }}
      />
    );
  };

  return (
    <>
      <h4 className="text-md font-bold pb-2 text-justify">HABILITAÇÃO JURÍDICA</h4>
      {renderTexto(formData.texto_habilitacao_juridica, 'texto_habilitacao_juridica')}
    </>
  );
}

function GerarTextoHabilitacaoTecnica({formData, setFormData, isEditing}: GerarTextoProps) {
  const { requerRegistroEntidadeProfissional, requerComprovacaoAptidao, preveVistoriaPrevia } = formData;

  const handleSave = (campo: keyof FormDataCompleto, novoValor: string) => {
    setFormData((prev) => ({ ...prev, [campo]: novoValor }));
  };

  const valores = {
    nomeEntidadeProfissional: formData.nomeEntidadeProfissional || "____",
    servicosComprovacaoAptidao: formData.servicosComprovacaoAptidao || "____",
    caracteristicasMinimasAptidao: formData.caracteristicasMinimasAptidao || "____",
    percentualMinimoAtestadoTecnico: formData.percentualMinimoAtestadoTecnico || "__",
    percentualMinimoAtestadoTecnicoExtenso: numeroPorExtenso(formData.percentualMinimoAtestadoTecnico || ''),
    justificativaPercentualAtestadoTecnico: formData.justificativaPercentualAtestadoTecnico || "____",
    parcelaServicoSubcontratado: "____", // Este campo não está no form, então fica como placeholder
    justificativaVistoriaPrevia: formData.justificativaVistoriaPrevia || "____",
  };

  const renderTexto = (template: string, templateKey: keyof FormDataCompleto) => {
    if (isEditing) {
      return (
        <EditableTextarea
          initialValue={template}
          onSave={(v) => handleSave(templateKey, v)}
          isEditing={isEditing}
          className="text-lg"
        />
      );
    }
    return (
      <p
        className="text-lg p-2 rounded-md"
        dangerouslySetInnerHTML={{ __html: substituirPlaceholders(template, valores) }}
      />
    );
  };

  return (
    <>
      {requerRegistroEntidadeProfissional === 'sim' && renderTexto(formData.texto_qualificacao_tecnica_registro, 'texto_qualificacao_tecnica_registro')}
      
      {requerComprovacaoAptidao === 'sim' && (
        <>
          {renderTexto(formData.texto_qualificacao_tecnica_aptidao_p1, 'texto_qualificacao_tecnica_aptidao_p1')}
          {renderTexto(formData.texto_qualificacao_tecnica_aptidao_p2, 'texto_qualificacao_tecnica_aptidao_p2')}
          {renderTexto(formData.texto_qualificacao_tecnica_aptidao_p3, 'texto_qualificacao_tecnica_aptidao_p3')}
          {renderTexto(formData.texto_qualificacao_tecnica_aptidao_p4, 'texto_qualificacao_tecnica_aptidao_p4')}
          {/* Adicionar texto_qualificacao_tecnica_aptidao_p5 (subcontratação) se a lógica for implementada */}
        </>
      )}

      {preveVistoriaPrevia === 'sim' && (
        <>
          {renderTexto(formData.texto_vistoria_previa_p1, 'texto_vistoria_previa_p1')}
          {renderTexto(formData.texto_vistoria_previa_p2, 'texto_vistoria_previa_p2')}
        </>
      )}
    </>
  );
}

function GerarTextoHabilitacaoEconomica({formData, setFormData, isEditing}: GerarTextoProps) {
   const { habilitacaoEconomicaPor, requerIndicesContabeis, descricao } = formData; // 'descricao' vem da seção 2.5 (consórcio)

  const handleSave = (campo: keyof FormDataCompleto, novoValor: string) => {
    setFormData((prev) => ({ ...prev, [campo]: novoValor }));
  };

  const mapHabilitacaoPor: Record<string, string> = {
    'patrimonio_liquido': 'Patrimônio Líquido',
    'capital_social': 'Capital Social'
  };
  
  const valores = {
    habilitacaoEconomicaPor: mapHabilitacaoPor[formData.habilitacaoEconomicaPor as keyof typeof mapHabilitacaoPor] || "____",
    percentualHabilitacaoEconomica: formData.percentualHabilitacaoEconomica || "__",
    percentualHabilitacaoEconomicaExtenso: numeroPorExtenso(formData.percentualHabilitacaoEconomica || ''),
    percentualAcrescimoConsorcio: formData.percentualAcrescimoConsorcio || "__",
    percentualAcrescimoConsorcioExtenso: numeroPorExtenso(formData.percentualAcrescimoConsorcio || ''),
    justificativaIndicesContabeis: formData.justificativaIndicesContabeis || "____",
    valorIndicesContabeis: "1", // Valor Padrão
    justificativaValorIndicesContabeis: "são os valores usuais de mercado", // Valor Padrão
  };

  const renderTexto = (template: string, templateKey: keyof FormDataCompleto) => {
    if (isEditing) {
      return (
        <EditableTextarea
          initialValue={template}
          onSave={(v) => handleSave(templateKey, v)}
          isEditing={isEditing}
          className="text-lg"
        />
      );
    }
    return (
      <p
        className="text-lg p-2 rounded-md"
        dangerouslySetInnerHTML={{ __html: substituirPlaceholders(template, valores) }}
      />
    );
  };

  return (
    <>
      {habilitacaoEconomicaPor && (
        <>
          {renderTexto(formData.texto_habilitacao_economica_p1, 'texto_habilitacao_economica_p1')}
          {/* Só mostra o texto do consórcio se for permitido na seção 2.5 */}
          {descricao !== 'nao' && renderTexto(formData.texto_habilitacao_economica_consorcio, 'texto_habilitacao_economica_consorcio')}
        </>
      )}

      {requerIndicesContabeis === 'sim' && (
        <>
          {renderTexto(formData.texto_habilitacao_economica_indices_p1, 'texto_habilitacao_economica_indices_p1')}
          {renderTexto(formData.texto_habilitacao_economica_indices_p2, 'texto_habilitacao_economica_indices_p2')}
          {/* O texto p3 não é editável, pois os valores são fixos no form, mas pode ser renderizado */}
          {!isEditing && (
            <p
              className="text-lg p-2 rounded-md"
              dangerouslySetInnerHTML={{ __html: substituirPlaceholders(formData.texto_habilitacao_economica_indices_p3, valores) }}
            />
          )}
        </>
      )}
    </>
  );
}

function GerarTextoRegistroPrecos({formData, setFormData, isEditing}: GerarTextoProps) {
  if (formData.eRegistroPreco !== 'sim') return null;

  const handleSave = (campo: keyof FormDataCompleto, novoValor: string) => {
    setFormData((prev) => ({ ...prev, [campo]: novoValor }));
  };

  const valores = {
    incisoDecreto54700: formData.incisoDecreto54700 || "____",
    justificativaUsoSrp: formData.justificativaUsoSrp || "____",
    orgaoGerenciador: formData.orgaoGerenciador || "____",
    orgaoParticipanteUnico: formData.orgaoParticipanteUnico || "____",
    prazoAssinaturaArpDiasUteis: formData.prazoAssinaturaArpDiasUteis || "__",
    prazoAssinaturaArpDiasUteisExtenso: numeroPorExtenso(formData.prazoAssinaturaArpDiasUteis),
    justificativaContratacaoIndividualItemLote: formData.justificativaContratacaoIndividualItemLote || "____",
    emailAdesao: formData.emailAdesao || "____",
    telefoneAdesao: formData.telefoneAdesao || "____",
    limiteAdesaoCadaOrgao: formData.limiteAdesaoCadaOrgao || "__",
    limiteAdesaoCadaOrgaoExtenso: numeroPorExtenso(formData.limiteAdesaoCadaOrgao),
    limiteAdesaoTotal: formData.limiteAdesaoTotal || "__",
    justificativaNaoAdesao: formData.justificativaNaoAdesao || "____",
    textoexistePrazoDeVigenciaAta: formData.textoexistePrazoDeVigenciaAta || "______",
    texto_adesao_sim: formData.texto_adesao_sim || "______",
    texto_adesao_sim_letra_a: formData.texto_adesao_sim_letra_a || "______",
    texto_adesao_sim_letra_b: formData.texto_adesao_sim_letra_b || "______",
    permiteContratacaoIndividualItemLoteNao: formData.permiteContratacaoIndividualItemLote,
    texto_prazo_assinatura_contrato_srp_textodois: formData.texto_prazo_assinatura_contrato_srp_textodois
  };

  const renderTexto = (template: string, templateKey: keyof FormDataCompleto) => {
    if (isEditing) {
      return (
        <EditableTextarea
          initialValue={template}
          onSave={(v) => handleSave(templateKey, v)}
          isEditing={isEditing}
          className="text-lg"
        />
      );
    }
    return (
      <p
        className="text-lg p-2 rounded-md whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: substituirPlaceholders(template, valores) }}
      />
    );
  };
  
  const renderLista = (itens: string[] | string) => {
  const array = Array.isArray(itens)
    ? itens
    : (itens ? itens.split(/\r?\n/).map(s => s.trim()).filter(Boolean) : []);
  if (array.length === 0) return null;
  return (
    <ol type="a" className="list-outside list-[upper-alpha] pl-8 text-lg space-y-2">
      {array.map((item, index) => (
        <li key={index} className="text-gray-800 text-justify">{item}</li>
      ))}
    </ol>
  );
};

  return (
    <div>
      <h2 className="text-xl font-bold pt-6 pb-2 text-justify">6. DO REGISTRO DE PREÇOS</h2>
      
      <h3 className="text-lg font-bold pb-2 text-justify">6.1 Justificativa para utilização do Sistema de Registro de Preços</h3>
      {renderTexto(formData.texto_justificativa_srp, 'texto_justificativa_srp')}

      <h3 className="text-lg font-bold pt-4 pb-2 text-justify">6.2 Órgão ou entidade gerenciador(a)</h3>
      {renderTexto(formData.texto_orgao_gerenciador, 'texto_orgao_gerenciador')}

      <h3 className="text-lg font-bold pt-4 pb-2 text-justify">6.3 Órgãos ou entidades participantes</h3>
      {formData.texto_orgaos_participantes_tipo === 'unico' && renderTexto(formData.texto_orgaos_participantes_unico, 'texto_orgaos_participantes_unico')}
      {formData.texto_orgaos_participantes_tipo === 'corporativa' && renderTexto(formData.texto_orgaos_participantes_corporativa, 'texto_orgaos_participantes_corporativa')}
      {formData.texto_orgaos_participantes_tipo === 'multiplos' && (
        <>
          {renderTexto(formData.texto_orgaos_participantes_p1, 'texto_orgaos_participantes_p1')}
          {renderLista(formData.orgaosParticipantes)}
        </>
      )}

      <h3 className="text-lg font-bold pt-4 pb-2 text-justify">6.4 Prazo para assinatura da Ata de Registro de Preços</h3>
      {renderTexto(formData.texto_prazo_assinatura_arp, 'texto_prazo_assinatura_arp')}

      <h3 className="text-lg font-bold pt-4 pb-2 text-justify">6.5 PRAZO DE VIGÊNCIA DA ATA DE REGISTRO DE PREÇOS</h3>
      {renderTexto(formData.textoexistePrazoDeVigenciaAta, 'textoexistePrazoDeVigenciaAta')}
      
      <h3 className="text-lg font-bold pt-4 pb-2 text-justify">6.6 Possibilidade de contratação individual de itens registrados em lotes</h3>

      {formData.permiteContratacaoIndividualItemLote === 'nao' && (
        <>
        {renderTexto(formData.permiteContratacaoIndividualItemLoteNao, 'permiteContratacaoIndividualItemLoteNao')}
        </>
      )}

      {formData.permiteContratacaoIndividualItemLote === 'sim' && (
        <>
        {renderTexto(formData.texto_contratacao_individual_item_lote, 'texto_contratacao_individual_item_lote')}
        {renderTexto(formData.texto_contratacao_individual_item_lote_dois, 'texto_contratacao_individual_item_lote_dois')}
        </>
      )}

      <h3 className="text-lg font-bold pt-4 pb-2 text-justify">6.7. PREVISÃO E JUSTIFICATIVA DA POSSIBILIDADE DE ADESÃO POR ÓRGÃOS E ENTIDADES NÃO PARTICIPANTES E CONDIÇÕES DE ADESÃO</h3>
      {formData.permiteAdesaoOrgaosNaoParticipantes === 'sim' ? (
        <>
          {renderTexto(formData.texto_adesao_sim, 'texto_adesao_sim')}
          {renderTexto(formData.texto_adesao_sim_p1, 'texto_adesao_sim_p1')}
          {renderTexto(formData.texto_adesao_sim_limites_nao_padronizados_p1, 'texto_adesao_sim_limites_nao_padronizados_p1')}
          {renderTexto(formData.texto_adesao_sim_letra_a, 'texto_adesao_sim_letra_a')}
          {renderTexto(formData.texto_adesao_sim_letra_b, 'texto_adesao_sim_letra_b')}
        </>
      ) : (
        <>
        {renderTexto(formData.texto_adesao_nao, 'texto_adesao_nao')}
        {renderTexto(formData.texto_adesao_nao_texto_dois, 'texto_adesao_nao_texto_dois')}
        </>
      )}
      
      <h3 className="text-lg font-bold pt-4 pb-2 text-justify">6.9 Obrigações e responsabilidades da gerenciadora da ATA</h3>
      
      {formData.obrigacoesGerenciadoraIncluirExtras === 'sim' ? (
        <>
          {renderTexto(formData.texto_obrigacoes_gerenciadora_padrao, 'texto_obrigacoes_gerenciadora_padrao')}
        </>
      ): (
        <>
          {renderTexto(formData.texto_obrigacoes_gerenciadora_extras, 'texto_obrigacoes_gerenciadora_extras')}
          {renderLista(formData.obrigacoesGerenciadoraExtras)}
        </>
      )}

      <h3 className="text-lg font-bold pt-4 pb-2 text-justify">6.10 Obrigações e responsabilidades da detentora da ATA</h3>
      {renderTexto(formData.texto_obrigacoes_detentora_padrao, 'texto_obrigacoes_detentora_padrao')}
      {formData.obrigacoesDetentoraIncluirExtras === 'sim' && (
        <>
          {renderTexto(formData.texto_obrigacoes_detentora_extras, 'texto_obrigacoes_detentora_extras')}
          {renderLista(formData.obrigacoesDetentoraExtras)}
        </>
      )}
    </div>
  );
}

{/* --- FUNÇÕES DE RENDERIZAÇÃO (SEÇÃO 7) --- */}

function GerarTextoContrato({formData, setFormData, isEditing}: GerarTextoProps) {
  
  const handleSave = (campo: keyof FormDataCompleto, novoValor: string) => {
    setFormData((prev) => ({ ...prev, [campo]: novoValor }));
  };

  const valores = {
    prazoVigenciaEscopoDefinido: formData.prazoVigenciaEscopoDefinido || "____",
    prazoVigenciaContinuo: formData.prazoVigenciaContinuo || "____",
    justificativaServicoContinuo: formData.justificativaServicoContinuo || "____",
    justificativaVigenciaPlurianual: formData.justificativaVigenciaPlurianual || "____",
    prazoAssinaturaContratoDiasUteis: formData.prazoAssinaturaContratoDiasUteis || "__",
    prazoAssinaturaContratoDiasUteisExtenso: numeroPorExtenso(formData.prazoAssinaturaContratoDiasUteis),
    justificativaCartaSolidariedade: formData.justificativaCartaSolidariedade || "____",
    requisitosSustentabilidade: formData.requisitosSustentabilidade || "____",
    justificativaNaoGarantia: formData.justificativaNaoGarantia || "____",
    percentualGarantiaContratual: formData.percentualGarantiaContratual || "__",
    percentualGarantiaContratualExtenso: numeroPorExtenso(formData.percentualGarantiaContratual),
    justificativaNaoSubcontratacao: formData.justificativaNaoSubcontratacao || "____",
    parcelasAcessoriasSubcontratacao: formData.parcelasAcessoriasSubcontratacao || "____",
    percentualLimiteSubcontratacaoAcessorias: formData.percentualLimiteSubcontratacaoAcessorias || "__",
    aspectosTecnicosSubcontratacao: formData.aspectosTecnicosSubcontratacao || "____",
    percentualLimiteSubcontratacaoTecnicos: numeroPorExtenso(formData.percentualLimiteSubcontratacaoTecnicos )|| "__",
    fundamentoSubcontratacao: formData.fundamentoSubcontratacao || "____",
    meioComunicacaoOficial: formData.meioComunicacaoOficial || "____",
    enderecoEntregaNotaFiscal: formData.enderecoEntregaNotaFiscal || "____",
    setorGestaoContrato: formData.setorGestaoContrato || "____",
    setorFiscalizacaoContrato: formData.setorFiscalizacaoContrato || "____",
    texto_garantia_contratual_sim_2: formData.texto_garantia_contratual_sim_2 || "____",
    percentualLimiteSubcontratacaoAcessoriasEntenso: numeroPorExtenso(formData.percentualLimiteSubcontratacaoAcessorias),
    texto_prazo_assinatura_contrato: formData.texto_prazo_assinatura_contrato,
    obrigacoesContratanteIncluirExtras: formData.obrigacoesContratanteIncluirExtras,
    texto_subcontratacao_sim_fundamento_texto_dois: formData.texto_subcontratacao_sim_fundamento_texto_dois,
    condicoesSubcontratacao: formData.condicoesSubcontratacao
  };

  const renderTexto = (template: string, templateKey: keyof FormDataCompleto) => {
    if (isEditing) {
      return (
        <EditableTextarea
          initialValue={template}
          onSave={(v) => handleSave(templateKey, v)}
          isEditing={isEditing}
          className="text-lg"
        />
      );
    }
    return (
      <p
        className="text-lg p-2 rounded-md"
        dangerouslySetInnerHTML={{ __html: substituirPlaceholders(template, valores) }}
      />
    );
  };

  const renderLista = (itens: string[] | string) => {
    const texto = Array.isArray(itens) ? itens.join('\n') : itens;

    if (!texto) return null;

    return (
      <p className="text-lg p-2 whitespace-pre-wrap text-justify text-gray-800">
        {texto}
      </p>
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold pt-6 pb-2 text-justify">7. DO CONTRATO</h2>
      
      <h3 className="text-lg font-bold pb-2 text-justify">7.1 Prazo de Vigência Contratual</h3>
      {formData.tipoContratoPrazo === 'escopo_definido' && renderTexto(formData.texto_prazo_vigencia_escopo_definido, 'texto_prazo_vigencia_escopo_definido')}
      {formData.tipoContratoPrazo === 'continuo' && (
        <>
          {renderTexto(formData.texto_prazo_vigencia_continuo_p1, 'texto_prazo_vigencia_continuo_p1')}
          {renderTexto(formData.texto_prazo_vigencia_continuo_p2, 'texto_prazo_vigencia_continuo_p2')}
          {formData.vigenciaPlurianual === 'sim' && renderTexto(formData.texto_vigencia_plurianual, 'texto_vigencia_plurianual')}
        </>
      )}

      <h3 className="text-lg font-bold pt-4 pb-2 text-justify">7.2 Prazo para Assinatura do Contrato</h3>
      {formData.eRegistroPreco === 'sim' && 
        <>
          {renderTexto(formData.texto_prazo_assinatura_contrato_srp, 'texto_prazo_assinatura_contrato_srp')} 
          {renderTexto(formData.texto_prazo_assinatura_contrato_srp_textodois, 'texto_prazo_assinatura_contrato_srp_textodois')}
        </>
      }

      <h3 className="text-lg font-bold pt-4 pb-2 text-justify">7.3 Requisitos da Contratação</h3>
{formData.requerCartaSolidariedade === 'sim' &&
  renderTexto(formData.texto_carta_solidariedade, 'texto_carta_solidariedade')}
{formData.requerRequisitosSustentabilidade === 'sim' &&
  renderTexto(formData.texto_requisitos_sustentabilidade, 'texto_requisitos_sustentabilidade')}
{formData.requerClausula73_3 === 'sim' && (
  <>
    <h3 className="text-lg font-bold pt-4 pb-2 text-justify">
      7.3.3. DA EXIGÊNCIA DE CARTA DE SOLIDARIEDADE
    </h3>
    {renderTexto(formData.texto_73_3, 'texto_73_3')}
  </>
)}
{formData.requerClausula73_4 === 'sim' && (
  <>
    <h3 className="text-lg font-bold pt-4 pb-2 text-justify">
      7.3.4. REQUISITOS DE SUSTENTABILIDADE
    </h3>
    {renderTexto(formData.texto_73_4, 'texto_73_4')}
  </>
)}

      <h3 className="text-lg font-bold pt-4 pb-2 text-justify">7.4 Obrigações da Contratante</h3>
      
      {formData.obrigacoesContratanteUsarPadrao === 'nao' && (
        <>
          {renderTexto(formData.texto_obrigacoes_contratante_extras, 'texto_obrigacoes_contratante_extras')}
          {renderLista(formData.obrigacoesContratanteIncluirExtras)}
        </>
      )}

      {formData.obrigacoesContratanteUsarPadrao === 'sim' && (
        renderTexto(formData.texto_obrigacoes_contratante_padrao, 'texto_obrigacoes_contratante_padrao')
      )}

      <h3 className="text-lg font-bold pt-4 pb-2 text-justify">7.5 Obrigações da Contratada</h3>
      
      {formData.obrigacoesContratadaIncluirExtras === 'sim' ? (
        renderTexto(formData.texto_obrigacoes_contratada_padrao, 'texto_obrigacoes_contratada_padrao')
      ):(
        <>
          {renderTexto(formData.texto_obrigacoes_contratada_extras, 'texto_obrigacoes_contratada_extras')}
          {renderLista(formData.obrigacoesContratadaExtras)}
        </>
      )}

      <h3 className="text-lg font-bold pt-4 pb-2 text-justify">7.6 Previsão e condições de prestação da garantia contratual</h3>
      {formData.preveGarantiaContratual === 'nao' && formData.eEstudosTecnicosPreliminares === 'nao' && (
        renderTexto(formData.texto_garantia_contratual_nao_2, 'texto_garantia_contratual_nao_2') 

      ) 
      }

      {formData.preveGarantiaContratual === 'nao' && formData.eEstudosTecnicosPreliminares === 'sim' &&(
        renderTexto(formData.texto_garantia_contratual_nao, 'texto_garantia_contratual_nao')
      )}

      {formData.preveGarantiaContratual === 'sim' && (
        <>
          {renderTexto(formData.texto_garantia_contratual_sim, 'texto_garantia_contratual_sim')}
          {renderTexto(formData.texto_garantia_contratual_sim_2, 'texto_garantia_contratual_sim_2')}
        </>
      )}

      <h3 className="text-lg font-bold pt-4 pb-2 text-justify">7.7 Da permissão ou vedação da subcontratação</h3>

      {formData.permiteSubcontratacao === 'nao' && renderTexto(formData.texto_subcontratacao_nao, 'texto_subcontratacao_nao')}

      {formData.qualsubcontratacao === 'sim_acessorias' && renderTexto(formData.texto_subcontratacao_sim_acessorias, 'texto_subcontratacao_sim_acessorias')}
      
      {formData.qualsubcontratacao === 'sim_tecnicos' && renderTexto(formData.texto_subcontratacao_sim_tecnicos, 'texto_subcontratacao_sim_tecnicos')}
      
      {formData.qualsubcontratacao === 'ambas_tecnicos_e_acessorias' && (
        <>
          {renderTexto(formData.texto_subcontratacao_sim_acessorias, 'texto_subcontratacao_sim_acessorias')}
          {renderTexto(formData.texto_subcontratacao_sim_tecnicos, 'texto_subcontratacao_sim_tecnicos')}
        </>
      )}

      {formData.permiteSubcontratacao === 'sim' && (
        <>
          {renderTexto(formData.texto_subcontratacao_sim_fundamento, 'texto_subcontratacao_sim_fundamento')}
          {renderTexto(formData.texto_subcontratacao_sim_fundamento_texto_dois, 'texto_subcontratacao_sim_fundamento_texto_dois')}
        </>
      )}


      {/* {formData.permiteSubcontratacao !== 'nao' && renderTexto(formData.texto_subcontratacao_sim_fundamento, 'texto_subcontratacao_sim_fundamento')} */}
      

      <h3 className="text-lg font-bold pt-4 pb-2 text-justify">7.8 Modelo de Gestão do Contrato</h3>
      {renderTexto(formData.texto_gestao_contrato_p1, 'texto_gestao_contrato_p1')}
      <GerarTabelaAtoresGestao atores={formData.atoresGestaoContrato} />
      {renderTexto(formData.texto_gestao_contrato_p2, 'texto_gestao_contrato_p2')}
      {renderTexto(formData.texto_gestao_contrato_p3, 'texto_gestao_contrato_p3')}
      {renderTexto(formData.texto_gestao_contrato_p4, 'texto_gestao_contrato_p4')}
      {renderTexto(formData.texto_gestao_contrato_p5, 'texto_gestao_contrato_p5')}

    </div>
  );
}

function GerarTabelaAtoresGestao({ atores }: { atores: AtorGestaoContrato[] }) {
  if (atores.length === 0) {
    return <p className="text-gray-500 italic">[Nenhum ator de gestão/fiscalização adicionado]</p>;
  }
  
  return (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full divide-y divide-gray-300 border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Tipo</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Nome</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Matrícula</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Setor/Unidade</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {atores.map(ator => (
            <tr key={ator.id}>
              <td className="px-4 py-3 text-sm text-gray-800">{ator.tipo}</td>
              <td className="px-4 py-3 text-sm text-gray-800">{ator.nome}</td>
              <td className="px-4 py-3 text-sm text-gray-800">{ator.matricula}</td>
              <td className="px-4 py-3 text-sm text-gray-800">{ator.setorUnidade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- SEÇÃO 8: PAGAMENTO ---
function GerarTextoPagamento({formData, setFormData, isEditing}: GerarTextoProps) {


  const handleSave = (campo: keyof FormDataCompleto, novoValor: string) => {
    setFormData((prev) => ({ ...prev, [campo]: novoValor }));
  };

  const valores = {
    quaisRespectivosItens: formData.quaisRespectivosItens || "____",
    itensAntecipacaoParcial: formData.itensAntecipacaoParcial || "____",
    valorAntecipacaoPagamento: formData.valorAntecipacaoPagamento || "____",
    contadosDoRecebimento: formData.contadosDoRecebimento || "____",
    justificativaAntecipacaoPagamento: formData.justificativaAntecipacaoPagamento || "____",
    prazoAntecipacaoPagamento: formData.prazoAntecipacaoPagamento || "__",
    percentualGarantiaAdicionalAntecipacao: formData.percentualGarantiaAdicionalAntecipacao || "__",
    etapasItensAntecipacaoParcial: formData.etapasItensAntecipacaoParcial || "____",
  };

  const renderTexto = (template: string, templateKey: keyof FormDataCompleto) => {
    if (isEditing) {
      return <EditableTextarea initialValue={template} onSave={(v) => handleSave(templateKey, v)} isEditing={isEditing} className="text-lg" />;
    }
    return <p className="text-lg p-2 rounded-md" dangerouslySetInnerHTML={{ __html: substituirPlaceholders(template, valores) }} />;
  };

  return (
    <div>
      {/* Seção 8.1 Padrão (se escolhido) ou Antecipação */}

      {formData.preverAntecipacaoPagamento === 'nao' && (
        renderTexto(formData.texto_pagamento_padrao, 'texto_pagamento_padrao')
      )}

      {formData.preverAntecipacaoPagamento === 'sim' && (
        <>
          {renderTexto(formData.texto_antecipacao_pagamento_p1, 'texto_antecipacao_pagamento_p1')}
          {renderTexto(formData.texto_antecipacao_pagamento_p2, 'texto_antecipacao_pagamento_p2')}
        </>
      )}

      {formData.requerGarantiaAdicionalAntecipacao === 'sim' && (
        renderTexto(formData.texto_antecipacao_pagamento_p3, 'texto_antecipacao_pagamento_p3')
      )}

      {formData.antecipacaoParcialDePagamento === 'sim' && (
        renderTexto(formData.texto_antecipacao_pagamento_parcial_p1, 'texto_antecipacao_pagamento_parcial_p1')
      )}

    </div>
  );
}

// --- SEÇÃO 9: IMR ---
function GerarTextoIMR({formData, setFormData, isEditing}: GerarTextoProps) {
  const { usaImr } = formData;

  if (usaImr === 'nao') return <p className="text-gray-500 italic">Não será utilizado Instrumento de Medição de Resultado (IMR).</p>;

  const handleSave = (campo: keyof FormDataCompleto, novoValor: string) => {
    setFormData((prev) => ({ ...prev, [campo]: novoValor }));
  };

  const valores = {
    quadroIndicadoresImr: formData.quadroIndicadoresImr || "____",
    prazoAtesteMedicao: formData.prazoAtesteMedicao || "__",
    prazoAtesteMedicaoExtenso: numeroPorExtenso(formData.prazoAtesteMedicao)
    
  };

  const renderTexto = (template: string, templateKey: keyof FormDataCompleto) => {
    if (isEditing) {
      return <EditableTextarea initialValue={template} onSave={(v) => handleSave(templateKey, v)} isEditing={isEditing} className="text-lg" />;
    }
    return <p className="text-lg p-2 rounded-md" dangerouslySetInnerHTML={{ __html: substituirPlaceholders(template, valores) }} />;
  };

  return (
    <div>
      {renderTexto(formData.texto_imr_p1, 'texto_imr_p1')}
      {renderTexto(formData.texto_imr_p2, 'texto_imr_p2')}
      {renderTexto(formData.texto_imr_p4, 'texto_imr_p4')}
    </div>
  );
}

// --- SEÇÃO 10: SANÇÕES ---
function GerarTextoSancoes({formData, setFormData, isEditing}: GerarTextoProps) {
  const handleSave = (campo: keyof FormDataCompleto, novoValor: string) => {
    setFormData((prev) => ({ ...prev, [campo]: novoValor }));
  };

  const renderTexto = (template: string, templateKey: keyof FormDataCompleto) => {
    if (isEditing) {
      return <EditableTextarea initialValue={template} onSave={(v) => handleSave(templateKey, v)} isEditing={isEditing} className="text-lg" />;
    }
    return <p className="text-lg p-2 rounded-md" dangerouslySetInnerHTML={{ __html: template }} />;
  };

  const renderLista = (itens: string[]) => (
    <ol type="a" className="list-outside list-[upper-alpha] pl-8 text-lg space-y-2">
      {itens.map((item, index) => <li key={index} className="text-gray-800 text-justify">{item}</li>)}
    </ol>
  );

  return (
    <div>
      <h3 className="text-lg font-bold pb-2 text-justify">10.1 Sanções aplicáveis à fase de licitação</h3>
      {formData.eRegistroPreco === 'sim' ? (
        renderTexto(formData.texto_sancoes_licitacao_padrao, 'texto_sancoes_licitacao_padrao')
      ) : (
        renderTexto(formData.texto_sancoes_licitacao_nao_e_registro_preco, 'texto_sancoes_licitacao_nao_e_registro_preco')
      )}

      {formData.eRegistroPreco === 'sim' && (
        <>
           <h3 className="text-lg font-bold pt-4 pb-2 text-justify">10.2 Sanções aplicáveis à Ata de Registro de Preços</h3>
           {renderTexto(formData.texto_sancoes_ata_padrao, 'texto_sancoes_ata_padrao')}
           {formData.sancoesAtaIncluirExtras === 'sim' && (
             <>
               {renderTexto(formData.texto_sancoes_ata_extras, 'texto_sancoes_ata_extras')}
               {renderLista(formData.sancoesAtaExtras)}
             </>
           )}
        </>
      )}

      <h3 className="text-lg font-bold pt-4 pb-2 text-justify">{formData.eRegistroPreco === 'sim' ? '10.3' : '10.2'} Sanções aplicáveis à fase de execução contratual</h3>
      {renderTexto(formData.texto_sancoes_contrato_padrao, 'texto_sancoes_contrato_padrao')}
      {formData.sancoesContratoIncluirExtras === 'sim' && (
        <>
          {renderTexto(formData.texto_sancoes_contrato_extras, 'texto_sancoes_contrato_extras')}
          {renderLista(formData.sancoesContratoExtras)}
        </>
      )}
    </div>
  );
}

// --- SEÇÃO 11: DEMAIS CONDIÇÕES E ANEXOS ---
function GerarTextoDemaisCondicoes({formData, setFormData, isEditing}: GerarTextoProps) {
  const { demaisCondicoes,demaisCondicoesIncluir, outrosAnexos } = formData;

  const handleSave = (novoValor: string) => {
    setFormData((prev) => ({ ...prev, demaisCondicoes: novoValor }));
  };

  return (
    <div>
       {isEditing ? (
         <EditableTextarea initialValue={demaisCondicoes} onSave={handleSave} isEditing={isEditing} className="text-lg" />
       ) : (
         demaisCondicoesIncluir === 'sim' && <p className="text-lg p-2 rounded-md whitespace-pre-wrap">{demaisCondicoes}</p>
       )}

       <h3 className="text-lg font-bold pt-4 pb-2 text-justify">12 Anexos</h3>
       {outrosAnexos.length > 0 && (
         <ul className="list-disc pl-8 text-lg space-y-2">
           {outrosAnexos.map(anexo => (
             <li key={anexo.id}>
               <strong>{anexo.tipo}:</strong> {anexo.descricao}
             </li>
           ))}
         </ul>
       )}
    </div>
  );
}