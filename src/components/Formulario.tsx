import { useState, useEffect } from "react";
import type { FormDataCompleto } from "../types/types"
import {CollapsibleText} from './CollapsibleText'
import {numeroPorExtenso} from '../lib/utils'
import { FieldsetContainer } from "./FieldsetContainer";
import GestaoDeItens from "./GestaoDeItens";
import { LocaisEHorarios } from "./LocaisEHorarios";
import { ListaDeStringsEditavel } from "./ListaDeStringsEditavel";
import { SelectComponent } from "./SelectComponent";
import { InputComponent } from "./InputComponent";
import { GestaoAtoresContrato } from "./GestaoAtoresContrato";
import { GestaoOutrosAnexos } from "./GestaoOutrosAnexos";

interface FormularioProps{
  formData: FormDataCompleto;
  setFormData: React.Dispatch<React.SetStateAction<FormDataCompleto>>;
  className?: string;
}

interface TextAreaComBotaoProps {
  valorInicial: string;
  onSalvar: (valor: string) => void;
  label: string;
  placeholder?: string;
}

function TextAreaComBotao({ valorInicial, onSalvar, label, placeholder }: TextAreaComBotaoProps) {
  const [texto, setTexto] = useState(valorInicial);

  useEffect(() => {
    setTexto(valorInicial);
  }, [valorInicial]);

  return (
    <div className="flex flex-col mt-2">
      <label className="font-semibold mb-2">{label}</label>
      <textarea
        className="border rounded-sm p-2 w-full font-serif text-lg"
        rows={8}
        placeholder={placeholder}
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      <button
        type="button"
        onClick={() => onSalvar(texto)}
        className="mt-3 bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 w-fit"
      >
        Atualizar Especificações no Documento
      </button>
    </div>
  );
}

export function Formulario({formData, setFormData, className}:FormularioProps){
  return(
      <div className={`space-y-6 ${className}`}>
        <FieldsetContainer titleLegend="Termo de referência">
          <CollapsibleText title=" As  novas atualizações da versão  estão destacadas com grifos amarelos ou verdes (ajustes mais relevantes)">
            <p className="orientacoes">
            Atentar que o planejamento de compras deverá considerar a expectativa de consumo anual materializadas no Plano de Contratações Anual específico do órgão/entidade. 
          </p>
          <p className="orientacoes">
            Para a confecção do Termo de Referência, verificar o Documento de Formalização da Demanda (DFD) elaborado pelo setor requisitante, bem como o Estudo Técnico Preliminar (ETP) (se for o caso), mapa de riscos (se for o caso), e confecção do orçamento estimado baseado em pesquisa de preço,  conforme previsão do Art. 2º do Decreto Estadual nº 53.384/ 2022, bem como verificar também se houve Intenção de Registro de Preços (IRP) e quais os órgãos manifestaram interesse em participar, aprensentando o quantitativo total consolidado e individualizado por órgão participante. 
          </p>
          <p className="orientacoes">
            Orientamos ainda que este termo de referência seja preenchido tendo sempre a mão as minutas padronizadas de Edital, ata de registro de preços (se for o caso) e contrato de SERVIÇO, disponíveis no site da PGE-PE (<a        
              href="http://www.pge.pe.gov.br/ProcConsultivaInstrumentoLei14133.aspx"
              className="text-blue-500 hover:text-blue-600"
            >
              http://www.pge.pe.gov.br/ProcConsultivaInstrumentoLei14133.aspx
              </a>), a fim de facilitar a consulta sobre o seus termos, uma vez que são feitas remissões aos citados instrumentos durante o decorrer do texto deste documento.
          </p>
          <p className="orientacoes font-bold">
            REFORÇAMOS que as notas explicativas com letras vermelhas servem ao propósito de orientação e fundamentação e devem ser EXCLUÍDAS da versão definitiva do documento.
          </p>
          </CollapsibleText>
        </FieldsetContainer>
        <FieldsetContainer titleLegend="1. Do objeto da licitação">
          <CollapsibleText title="Orientações para preenchimento" >
              <ul className="list-disc list-inside orientacoes">
                <li>
                  Suprimir o trecho “Formação de Registro de Preços para o eventual”, caso não se trate de registro de preços. Em caso de Registro de preços corporativo, realizar a devida
                </li>
                <li>
                  Citar órgão/entidade demandante. Em caso de Registro de preços corporativo incluir a abrangência. Ex.: dos órgãos da Administração Direta, Fundos Especiais, Autarquias e Fundações Públicas integrantes do Poder Executivo do Estado de Pernambuco OU outro escopo devidamente justificado, conforme art. 45, do Decreto Estadual nº 54.700/2023
                </li>
                <li>
                  Conforme as condições, especificações, quantidades e exigências contidas no Estudo Técnico Preliminar(se for o caso) OU no Extrato dos Estudo Técnico Preliminar (caso seja uma das hipóteses de uso do ETP e este for classificado como sigiloso, conforme art. 9º, do Decreto Estadual nº 53.384/2022
                </li>
                <li>
                  Para uso em processos que gerem Atas de Registro de Preços Corporativas com escopo reduzido, conforme art. 45, do Decreto Estadual nº 54.700/2023
                </li>
              </ul>
          </CollapsibleText>
          <FieldsetContainer titleLegend="1.1 Formação de registro de preços para contratação eventual de prestação de serviços">
            <div>
              <label htmlFor="eRegistroPreco">É Registro de Preços?</label>
              <div>
                <select 
                  name="eRegistroPreco" 
                  id="eRegistroPreco" 
                  value={formData.eRegistroPreco} 
                  onChange={(e) => setFormData({...formData, eRegistroPreco: e.target.value})} 
                  className="border rounded-sm p-2 flex-grow w-1/5"
                >
                  <option value="">Selecionar uma opção</option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
              </div>
              {formData.eRegistroPreco === 'sim' ? (
                <div className="mt-4">
                  <div>
                    <label htmlFor="qualTipoContratacao">Qual o tipo de Registro de Preços?</label>
                    <div>
                      <select 
                        name="qualTipoContratacao" 
                        id="qualTipoContratacao" 
                        className="border rounded-sm p-2 flex-grow w-1/5"
                        value={formData.qualTipoContratacao}
                        onChange={(e) => setFormData({...formData, qualTipoContratacao: e.target.value})}
                      >
                        <option value="">Selecione uma opção</option>
                        <option value="corporativo">Corporativo</option>
                        <option value="simples">Simples</option>
                        <option value="unificadoSaude">Unificado Saúde</option>
                      </select>
                    </div>
                  </div>
                  {formData.qualTipoContratacao === 'corporativo' ? (
                    <div className="flex flex-col mt-4">
                      <label htmlFor="justificaCasoConcretoUmaVezQue">E se justifica no caso concreto, uma vez que?</label>
                      <textarea 
                        name="justificaCasoConcretoUmaVezQue" 
                        id="justificaCasoConcretoUmaVezQue"
                        className='border rounded-sm p-2 w-full'
                        value={formData.justificaCasoConcretoUmaVezQue}
                        onChange={(e) => setFormData({...formData, justificaCasoConcretoUmaVezQue: e.target.value})}
                      />
                    </div>
                  ) : null}
                  <div className="mt-4">
                    <label htmlFor="eEstudosTecnicosPreliminares">Existe ETP?</label>
                    <div>
                      <select 
                        name="eEstudosTecnicosPreliminares" 
                        id="eEstudosTecnicosPreliminares" 
                        value={formData.eEstudosTecnicosPreliminares} 
                        onChange={(e) => setFormData({...formData, eEstudosTecnicosPreliminares: e.target.value})} 
                        className="border rounded-sm p-2 flex-grow w-1/5"
                      >
                        <option value="">Selecionar uma opção</option>
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4">
                  <label htmlFor="eEstudosTecnicosPreliminares">Existe ETP?</label>
                  <div>
                    <select 
                      name="eEstudosTecnicosPreliminares" 
                      id="eEstudosTecnicosPreliminares" 
                      value={formData.eEstudosTecnicosPreliminares} 
                      onChange={(e) => setFormData({...formData, eEstudosTecnicosPreliminares: e.target.value})} 
                      className="border rounded-sm p-2 flex-grow w-1/5"
                    >
                      <option value="">Selecionar uma opção</option>
                      <option value="sim">Sim</option>
                      <option value="nao">Não</option>
                    </select>
                  </div>
                </div>
              )}
              <div className="mt-4">
                <label htmlFor="visandoAtenderNecessidades">Especificar os orgão(s) ou entidade(s) que serão atendidas nessa contratação</label>
                <div>
                    <textarea 
                      name="visandoAtenderNecessidades" 
                      id="visandoAtenderNecessidades"
                      className='border rounded-sm p-2 w-full'
                      value={formData.visandoAtenderNecessidades}
                      onChange={(e)=> setFormData({...formData, visandoAtenderNecessidades: e.target.value})}
                    />
                </div>
              </div>
              
            </div>
          </FieldsetContainer>
        </FieldsetContainer>
        <FieldsetContainer titleLegend="2. Das Justificativas">
          <FieldsetContainer titleLegend="2.1 Justificativa da necessidade da contratação">
              <CollapsibleText title="Orientações para preenchimento">
                <ul className="orientacoes">
                  <li>
                    Sim: Na hipótese de existir ETP ou quando a informação do presente tópico puder ser obtida no extrato do ETP sigiloso (Art. 9º, do decreto Estadual Nº 53.384/2022).
                  </li>
                  <li>
                    Não: Na hipótese de NÂO existir ETP ou quando informação do presente tópico não puder ser obtida no extrato do ETP sigiloso (Art. 9º, do decreto Estadual Nº 53.384/2022).
                  </li>
                </ul>
              </CollapsibleText>
             {/*  <SelectComponent label="Existe ETP ou à informação do presente tópico pode ser obtida no extrato sigiloso?"
              value={formData.existEtpOuInformacaoPresenteExtratoSigiloso}
              onChange={(e)=> setFormData({...formData, existEtpOuInformacaoPresenteExtratoSigiloso: e.target.value})}
              >
                <option value="">Selecione uma opção</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </SelectComponent> */}
              {formData.eEstudosTecnicosPreliminares === 'nao' && (
                <div>
                  <div className="mt-4">
                    <label htmlFor="presenteContratacaoNecessidadeServicos" className="font-semibold">A presente contratação se dará em função da necessidade dos serviços?</label>
                    <input type="text" id='presenteContratacaoNecessidadeServicos' className='border rounded-sm p-2 w-full' value={formData.presenteContratacaoNecessidadeServicos} onChange={(e)=>setFormData({...formData, presenteContratacaoNecessidadeServicos: e.target.value})} />
                  </div>
                  <div className="my-4">
                    <label htmlFor="desempenhoAtribuicoesFuncionais" className="font-semibold">Os quais são essenciais para o desempenho das atribuições funcionais da?</label>
                    <p className="orientacoes mb-2" >Especificar órgão ou entidade.</p>
                    <input type="text" id='desempenhoAtribuicoesFuncionais' className='border rounded-sm p-2 w-full' value={formData.desempenhoAtribuicoesFuncionais} onChange={(e)=>setFormData({...formData, desempenhoAtribuicoesFuncionais: e.target.value})} />
                  </div>
                  <InputComponent label="Expor a finalidade da contratação" orientacoes="Expor a finalidade da contratação." id="umaVezQueAtribuicoesFuncionais" value={formData.umaVezQueAtribuicoesFuncionais} onChange={(e)=> setFormData({...formData,umaVezQueAtribuicoesFuncionais: e.target.value })}/>
                  <InputComponent label="Que tal objeto atenderá o dever legal exposto no?" orientacoes="Citar legislação, se existente, que fundamente o dever do estado de contratar o objeto." value={formData.deverLegalExposto} onChange={(e)=> setFormData({...formData, deverLegalExposto: e.target.value})}/>
                  <InputComponent label="Que determina?" orientacoes="Transcrever ou explicitar o conteúdo do que preconizar o dispositivo legal citado, se for o caso." value={formData.queDeterminaDispositivoLegalCitado} onChange={(e)=> setFormData({...formData, queDeterminaDispositivoLegalCitado: e.target.value})}/>
                </div>
              )}
          </FieldsetContainer>
          <FieldsetContainer titleLegend="2.2 Justificativa do quantitativo estimado">
            {/* <CollapsibleText title="Orientações para preenchimento">
              <p className="orientacoes">
                Redação a ser utilizada na hipótese de Existir ETP ou quando a informação do presente tópico puder ser obtida no extrato do ETP sigiloso (Art. 9º, do decreto Estadual nº 53.384/2022)
              </p>
            </CollapsibleText> */}
            {/* <SelectComponent
              label="Existe ETP ou à informação do presente tópico pode ser obtida no extrato sigiloso? (referente ao item 2.2.1)"
              value={formData.existEtpOuInformacaoPresenteExtratoSigilosoItemDois}
              onChange={(e)=> setFormData({...formData, existEtpOuInformacaoPresenteExtratoSigilosoItemDois: e.target.value})}
            >
              <option value="">Selecione uma opção</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </SelectComponent> */}
              {/* {formData.eEstudosTecnicosPreliminares === 'sim' && (
              <InputComponent
                label="Item do ETP (Quantitativo)"
                orientacoes="Informe o item do ETP referente ao quantitativo (ex: 2.5)"
                id="itemEtpQuantitativo"
                value={formData.itemEtpQuantitativo}
                onChange={(e) => setFormData({...formData, itemEtpQuantitativo: e.target.value})}
              />
            )} */}

            {formData.eEstudosTecnicosPreliminares === 'nao' && (
              <div>
                <InputComponent
                  label="informar os critérios utilizados para definição dos quantitativos a serem contratados, conforme os cálculos apresentados abaixo: apresentar os cálculos realizados ou apontar os documentos que comprovem esses cálculos, se for o caso"
                  onChange={(e)=> setFormData({...formData, osQuantitativosPrecistoDefinidosNoDocumento: e.target.value})}
                  value={formData.osQuantitativosPrecistoDefinidosNoDocumento}
                  
                />
          
                {/* <InputComponent
                  label="Fundamentado em?"
                  orientacoes="informar os critérios utilizados para definição dos quantitativos a serem contratados"
                  onChange={(e)=> setFormData({...formData, fundamentadoEm: e.target.value})}
                  value={formData.fundamentadoEm}
                /> */}
              </div>
            )}
          </FieldsetContainer>
          <FieldsetContainer titleLegend="2.3 Justificativa da escolha da solução">
            <CollapsibleText title="Orientações para preenchimento">
              <p className="orientacoes">
                Redação a ser utilizada na hipótese de Existir ETP ou quando a informação do presente tópico puder ser obtida no extrato do ETP sigiloso (Art. 9º, do decreto Estadual nº 53.384/2022)
              </p>
            </CollapsibleText>
            {/* <SelectComponent label="" value={formData.existEtpOuInformacaoPresenteExtratoSigilosoItemDois_tres} onChange={(e)=> setFormData({...formData, existEtpOuInformacaoPresenteExtratoSigilosoItemDois_tres: e.target.value})}>
              <option value="">Selecione uma opção</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </SelectComponent> */}
            {formData.eEstudosTecnicosPreliminares === "sim" ? (
              <InputComponent
                label="Item do ETP"
                orientacoes="Informe o item do ETP (ex: 3.4)"
                id="itemEtpJustificativaSolucao"
                value={formData.itemEtpJustificativaSolucao}
                onChange={(e) => setFormData({...formData, itemEtpJustificativaSolucao: e.target.value})}
              />
            ): null}
          
            {formData.eEstudosTecnicosPreliminares === "nao" ? (
              <div className="my-4">
                <label htmlFor="justificativaEscolhaSolucaoNaoEtp" className="font-semibold">
                  Justificativa da escolha (uma vez que...)
                </label>
                <p className="orientacoes mb-2">Justificar a razão para escolha desse tipo de serviço frente às demais alternativas.</p>
                <textarea 
                  id="justificativaEscolhaSolucaoNaoEtp" 
                  className='border rounded-sm p-2 w-full'
                  rows={4}
                  value={formData.justificativaEscolhaSolucaoNaoEtp}
                  onChange={(e) => setFormData({...formData, justificativaEscolhaSolucaoNaoEtp: e.target.value})}
                />
              </div>
            ): null}
          </FieldsetContainer>
          <FieldsetContainer titleLegend="2.4 Justificativa para o parcelamento ou não da contratação">
            {/* <SelectComponent
              label="Existe ETP ou à informação pode ser obtida no extrato sigiloso? (2.4.1)"
              value={formData.justificativaParcelamentoEtp}
              onChange={(e) => setFormData({...formData, justificativaParcelamentoEtp: e.target.value})}
            >
              <option value="">Selecione uma opção</option>
              <option value="sim">Sim (ETP)</option>
              <option value="nao">Não (Manual)</option>
            </SelectComponent> */}

            {/* Caso ETP = SIM */}
            {formData.eEstudosTecnicosPreliminares === 'sim' && (
              <InputComponent
                label="Item do ETP"
                orientacoes="Informe o item do ETP referente ao parcelamento (ex: 4.1)"
                id="itemEtpJustificativaParcelamento"
                value={formData.itemEtpJustificativaParcelamento}
                onChange={(e) => setFormData({...formData, itemEtpJustificativaParcelamento: e.target.value})}
              />
            )}

            {/* Caso ETP = NÃO */}
            {formData.eEstudosTecnicosPreliminares === 'nao' && (
              <div className="mt-4 p-4 border-t-2">
                <SelectComponent
                  label="Qual a opção de parcelamento?"
                  value={formData.tipoParcelamentoNaoEtp}
                  onChange={(e) => setFormData({...formData, tipoParcelamentoNaoEtp: e.target.value})}
                >
                  <option value="">Selecione uma opção</option>
                  <option value="item">Parcelamento por Item(ns)</option>
                  <option value="lote">Agrupado em Lote(s)</option>
                </SelectComponent>

                {/* Sub-opção "item" */}
                {formData.tipoParcelamentoNaoEtp === 'item' && (
                  <div className="my-4">
                    <label htmlFor="razoesParcelamentoItem" className="font-semibold">
                      Razões técnicas/econômicas para o parcelamento por item (2.4.3)
                    </label>
                    <p className="orientacoes mb-2">Expor os motivos (ex: elevados percentuais de exigência, especialização, etc.)</p>
                    <textarea 
                      id="razoesParcelamentoItem" 
                      className='border rounded-sm p-2 w-full'
                      rows={4}
                      value={formData.razoesParcelamentoItem}
                      onChange={(e) => setFormData({...formData, razoesParcelamentoItem: e.target.value})}
                    />
                  </div>
                )}

                {/* Sub-opção "lote" */}
                {formData.tipoParcelamentoNaoEtp === 'lote' && (
                   <div className="my-4">
                    <label htmlFor="justificativaAgrupamentoLote" className="font-semibold">
                      Justificativa para agrupamento em lote(s) (2.4.1)
                    </label>
                    <p className="orientacoes mb-2">Apresentar justificativa técnica e/ou econômica (ex: prejuízo com pulverização, regionalização, economia de escala, etc.)</p>
                    <textarea 
                      id="justificativaAgrupamentoLote" 
                      className='border rounded-sm p-2 w-full'
                      rows={4}
                      value={formData.justificativaAgrupamentoLote}
                      onChange={(e) => setFormData({...formData, justificativaAgrupamentoLote: e.target.value})}
                    />
                  </div>
                )}

                {/* Opção Adicional "Lotes Espelhados" (aparece se ETP=NÃO) */}
                <hr className="my-4"/>
                <SelectComponent
                  label="Haverá lotes espelhados / idênticos? (Add-on)"
                  value={formData.usaLotesEspelhados}
                  onChange={(e) => setFormData({...formData, usaLotesEspelhados: e.target.value})}
                >
                  <option value="">Selecione uma opção</option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </SelectComponent>

                {formData.usaLotesEspelhados === 'sim' && (
                  <div className="my-4">
                    <label htmlFor="argumentosLotesEspelhados" className="font-semibold">
                      Argumentos adicionais para o espelhamento (2.4.4)
                    </label>
                    <p className="orientacoes mb-2">Acrescentar argumentos (ex: aproveitamento do mercado local, ampliação da competição, etc.)</p>
                    <textarea 
                      id="argumentosLotesEspelhados" 
                      className='border rounded-sm p-2 w-full'
                      rows={3}
                      value={formData.argumentosLotesEspelhados}
                      onChange={(e) => setFormData({...formData, argumentosLotesEspelhados: e.target.value})}
                    />
                  </div>
                )}
              </div>
            )}
          </FieldsetContainer>
          <fieldset className='p-4 md:p-6 border-2 border-gray-500 rounded-md'>
          <legend className="text-xl font-semibold px-2">2.5 Da previsão vedação ou participação de empresas sob a forma de consórcio</legend>
          <div className='my-4 space-y-2'>      
            <CollapsibleText title="Orientações para preenchimento">
              <p className="orientacoes ">Nos termos do art. 15 da Lei 14.133, de 2021, a regra é a admissibilidade da participação de empresas reunidas em consórcio.A opção pela vedação, a depender da análise do caso concreto, deverá estar devidamente justificada, com base em elementos técnicos e econômicos, a partir das variáveis da complexidade do objeto e das circunstâncias do mercado, tais quais o risco à restrição da competitividade, as dificuldades de gestão da execução do contrato e a capacidade técnica e econômica dos participantes.</p>
              <p className="orientacoes">Em princípio, conforme orientação da PGE no edital padrão de serviços, a execução de serviços especiais, por envolverem objeto dotado de heterogeneidade e complexidade, pode demandar a conjugação de esforços de mais de uma empresa para viabilizar a participação no certame. Em outros casos concretos, a depender do vulto da contratação, mesmo a execução de serviços comuns pode recomendar a participação de consórcio.</p>
            </CollapsibleText>
          </div>
          <div className='grid grid-cols-1 gap-x-6 gap-y-4 pt-4'>
            <div className='flex flex-col space-y-1'>
              <label htmlFor="Permite_consorcios" className="font-semibold">Permite consórcios ?</label>
              <div>
                <select name="permite_consorcios" id="Permite_consorcios" className="border rounded-sm p-2 flex-grow w-1/5" value={formData.descricao} onChange={(e)=> setFormData({...formData, descricao: e.target.value })}>
                  <option value="">Selecione uma opção</option>
                  <option value="sim">Sim</option>
                  <option value="sim_com_numero_limitado_de_fornecedores">Sim, com número limitado de fornecedores</option>
                  <option value="nao">Não</option>
                </select>
              </div>
            </div>
            {/* {formData.descricao === 'sim_com_numero_limitado_de_fornecedores' && (
              <div className='flex flex-col space-y-1'>
                <label htmlFor="quantas_empresas_serao_admitidas_consorcio" className="font-semibold">Quantas empresas serão admitidas em cada consórcio ?</label>
                <input type="number" id='quantas_empresas_serao_admitidas_consorcio' className='border rounded-sm p-2 w-full' value={formData.numeroConsorciadas} onChange={(e)=>setFormData({...formData, numeroConsorciadas: e.target.value})} />
                  {formData.descricao === 'sim_com_numero_limitado_de_fornecedores' && (
                  <p className="text-sm text-gray-500 italic">
                    {numeroPorExtenso(formData.numeroConsorciadas)}
                  </p>
                )}
              </div>
            ) } */}
            {formData.descricao === 'sim_com_numero_limitado_de_fornecedores' && (
              <div className='flex flex-col space-y-1'>
                <label htmlFor="justificativa" className="font-semibold">Justificativa</label>
                <div>
                  <span className="orientacoes">(expor justificativa técnica aprovada pela autoridade competente que viabilize a limitação de participantes no consórcio)</span>
                </div>
                <input type="text" id='justificativa' className='border rounded-sm p-2' value={formData.justificativa} onChange={(e)=>setFormData({...formData, justificativa: e.target.value})} />
              </div>
            ) }
            {formData.descricao === 'nao' && (
              <div className='flex flex-col space-y-1'>
                <label htmlFor="nao_havendo_complexidade_objeto" className='font-semibold'>Justificar ausência de complexidade</label>
                <div>
                  <span className="orientacoes">Adaptar a redação caso haja apenas um dos critérios – vulto ou complexidade</span>
                </div>
                <div>
                  <input type="text" id='nao_havendo_complexidade_objeto' className='border rounded-sm p-2 w-full' value={formData.nao_havendo_complexidade_objeto} onChange={(e)=>setFormData({...formData, nao_havendo_complexidade_objeto: e.target.value})} />
                </div>
              </div>
            )}
            {formData.descricao === 'nao' && (
              <div className='flex flex-col space-y-1'>
                <label htmlFor="nao_havendo_grande_vulto_da_contratacao" className='font-semibold'>Justificar ausência de grande vulto</label>
                <div>
                  <input type="text" id='nao_havendo_grande_vulto_da_contratacao' className='border rounded-sm p-2 w-full' value={formData.nao_havendo_grande_vulto_da_contratacao} onChange={(e)=>setFormData({...formData, nao_havendo_grande_vulto_da_contratacao: e.target.value})} />
                </div>
                <div>
                  <span className="orientacoes">Caso haja outra justificativa cabível, acrescentar, como exemplo: baixa complexidade técnica ou operacional ou ausência de riscos financeiros consideráveis</span>
                </div>
              </div>
            )}
          </div>
        </fieldset>
        <fieldset className='mt-4 p-4 md:p-6 border-2 border-gray-500 rounded-md'>
          <legend className='text-xl font-semibold px-2'>2.6 Da participação ou vedação de profissionais organizados em cooperativa na licitação</legend> 
           <label htmlFor="Permite_consorcios" className="font-semibold">Permite Cooperativa ?</label>
          <div>
              <select 
                name="vedacaoOuParticipacaoCooperativa"
                id="permite_cooperativa" 
                className="border rounded-sm p-2 flex-grow w-1/5" 
                value={formData.vedacaoOuParticipacaoCooperativa} 
                onChange={(e)=> setFormData({...formData, vedacaoOuParticipacaoCooperativa: e.target.value })}
              >
                <option value="">Selecione uma opção</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
          </div>
          {formData.vedacaoOuParticipacaoCooperativa === 'nao' && (
             <div className='mt-4'>
                <label htmlFor="nao_havendo_grande_vulto_da_contratacao" className='font-semibold'>apresentar justificativa para a vedação de Cooperativa.</label>
                <div>
                  <input type="text" id='justificativa_vedacao' className='border rounded-sm p-2 w-full' value={formData.justificativa_vedacao} onChange={(e)=>setFormData({...formData,justificativa_vedacao: e.target.value})} />
                </div>
              </div>
          )}
        </fieldset>
        <fieldset className='mt-4 p-4 md:p-6 border-2 border-gray-500 rounded-md'>
          <legend className='text-xl font-semibold px-2'>2.7 DA PARTICIPAÇÃO OU VEDAÇÃO DE PESSOAS FÍSICAS NA LICITAÇÃO</legend>
          <div className='my-4 space-y-2'>      
            <CollapsibleText title="Orientações para preenchimento">
              <p className="orientacoes ">Cabe salientar, por oportuno, que a vedação a participação de pessoas físicas nas licitações deverá ser objeto de prévia análise e manifestação técnica fundamentada por parte do órgão demandante, na fase de planejamento da contratação. Em geral, a participação deste tipo de licitante deve ser viabilizada em observância aos objetivos da isonomia e da justa competição. No entanto, é vedada a participação de pessoas físicas nas licitações, quando a contratação exigir capital social ou patrimônio líquido mínimos e estrutura mínima, com equipamentos, instalações e equipe de profissionais ou corpo técnico para a execução do objeto incompatíveis com a natureza profissional da pessoa física.</p>
            </CollapsibleText>
          </div> 
           <label htmlFor="Permite_consorcios" className="font-semibold">Permite Pessoa Física ?</label>
          <div>
              <select 
                name="vedacaoOuParticipacaoPessoasFisicas"
                id="vedacaoOuParticipacaoPessoasFisicas"  
                className="border rounded-sm p-2 flex-grow w-1/5" 
                value={formData.vedacaoOuParticipacaoPessoasFisicas} 
                onChange={(e)=> setFormData({...formData, vedacaoOuParticipacaoPessoasFisicas: e.target.value })}
              >
                <option value="">Selecione uma opção</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
          </div>
          {formData.vedacaoOuParticipacaoPessoasFisicas === 'nao' && (
             <div className='mt-4'>
                <label htmlFor="justificativa_vedacao_pessoafisica" className='font-semibold'>apresentar justificativa para a vedação Pessoa Fisica.</label>
                <div>
                  <input type="text" id='justificativa_vedacao_pessoafisica' className='border rounded-sm p-2 w-full' value={formData.justificativa_vedacao_pessoafisica} onChange={(e)=>setFormData({...formData,justificativa_vedacao_pessoafisica: e.target.value})} />
                </div>
              </div>
          )}
        </fieldset>
        </FieldsetContainer>
        <FieldsetContainer titleLegend="3 DAS ESPECIFICAÇÕES DO OBJETO" >
            <CollapsibleText title="Orientações para preenchimento">
              <p className="orientacoes">Este item é de edição livre, podendo ser acrescentados quantos subitens forem necessários para especificar o objeto a ser contratado, devendo estar previstas a descrição detalhada do serviço a ser prestado e as condições de execução dos serviços, de forma a abranger a descrição da solução como um todo.</p>
              <p className="orientacoes">Vale lembrar que sem o conhecimento preciso das particularidades e das necessidades do órgão, o contratado terá dificuldade para dimensionar perfeitamente sua proposta, o que poderá acarretar sérios problemas futuros na execução contratual.</p>
            </CollapsibleText>
            <FieldsetContainer titleLegend="3.1 Descrição dos serviços / Detalhamento do objeto">
              <GestaoDeItens
                itensPorUnidade={formData.itensPorUnidade}
                grupos={formData.grupos}
                setFormData={setFormData}
              />
            </FieldsetContainer>
            <FieldsetContainer titleLegend="3.1.1 Além da descrição apresentada na(s) tabela(s) do quadro resumo  deste Termo de Referência (Anexo xxx), para a prestação dos serviços, deve-se observar as seguintes especificações:">
              <TextAreaComBotao
                label="Especificações Detalhadas"
                placeholder="Digite as especificaçãoes detalhadas aqui..."
                valorInicial={formData.especificacoes}
                onSalvar={(novoValor)=>{
                  setFormData({...formData, especificacoes: novoValor})
                }}
              />
            </FieldsetContainer>
            <FieldsetContainer titleLegend="3.2 Da execução dos serviços">
              <CollapsibleText title="Orientações para preenchimento">
                <ol>
                  <li>Caso haja mais de um endereço, deve-se especificar. Do mesmo modo, se os endereços se modificarem conforme cada etapa/fase do serviço. Ademais, se houver a necessidade de previamente se acordar a data ou hora de prestação do serviço com o contratado, deve-se especificar essa obrigação.</li>
                  <li>Na licitação de serviços de manutenção e assistência técnica, deverá ser definido o local de realização dos serviços, admitida a exigência de deslocamento de técnico ao local da repartição ou a exigência de que o contratado tenha unidade de prestação de serviços em distância compatível com as necessidades da Administração  - Art. 47, §2º, Lei nº 14.133/2021</li>
                </ol>
              </CollapsibleText>
              <div className='flex flex-col'>
                <label htmlFor="osServicosSeraoPrestadosNosSeguintesLocaisEHorarios" className="font-semibold">Os serviços serão prestados em locais e horários fixos?</label>
                <select name="osServicosSeraoPrestadosNosSeguintesLocaisEHorarios" id="osServicosSeraoPrestadosNosSeguintesLocaisEHorarios" value={formData.osServicosSeraoPrestadosNosSeguintesLocaisEHorarios} onChange={(e)=>setFormData({...formData,osServicosSeraoPrestadosNosSeguintesLocaisEHorarios: e.target.value})} className="border rounded-sm p-2 flex-grow w-1/5">
                  <option value="">Selecione uma opção</option>
                  <option value="sim">Sim</option>
                  <option value="nao" >Não, serão prestados nos locais e horários indicados pela contratante</option>
                </select>
              </div>
              <div>
                { formData.osServicosSeraoPrestadosNosSeguintesLocaisEHorarios === 'sim' ? (
                
                < LocaisEHorarios
                  locaisEHorarios={formData.locaisEHorarios}
                  setFormData={setFormData}
                />
              ) : (
                
                <div className="mt-4">
                  <p>
                    3.2.1 Os serviços descritos neste termo de referência serão prestados nos locais e horários indicados pela contratante <span className="orientacoes">(Redação do caso de Ata Corporativa)</span>
                  </p>
                </div>
              )}
              </div>
              <FieldsetContainer titleLegend="3.2.2 O início da execução contratual">
                <CollapsibleText title="Orientações para preenchimento">
                  <p className="orientacoes">
                    Caso haja mais de um endereço, deve-se especificar. Do mesmo modo, se os endereços se modificarem conforme cada etapa/fase do serviço. Ademais, se houver a necessidade de previamente se acordar a data ou hora de prestação do serviço com o contratado, deve-se especificar essa obrigação.
                  </p>
                  <p className="orientacoes">
                    Na licitação de serviços de manutenção e assistência técnica, deverá ser definido o local de realização dos serviços, admitida a exigência de deslocamento de técnico ao local da repartição ou a exigência de que o contratado tenha unidade de prestação de serviços em distância compatível com as necessidades da Administração  - Art. 47, §2º, Lei nº 14.133/2021
                  </p>
                </CollapsibleText>
                <div className="flex flex-col">
                    <label htmlFor="quantas_empresas_serao_admitidas_consorcio" className="font-semibold">deve se dar no prazo máximo de ?</label>
                    <input type="number" id='quantas_empresas_serao_admitidas_consorcio' className='border rounded-sm p-2 w-full' value={formData.prazoExecucaoDoContrato} onChange={(e)=>setFormData({...formData, prazoExecucaoDoContrato: e.target.value})} />
                      {formData.prazoExecucaoDoContrato  && (
                      <p className="text-sm text-gray-500 italic">
                        {numeroPorExtenso(formData.prazoExecucaoDoContrato)}
                      </p>
                    )}
                </div>
              </FieldsetContainer>
            </FieldsetContainer>
            <FieldsetContainer titleLegend="3.2.3 Descrição detalhada dos métodos, rotinas, etapas, tecnologias procedimentos, frequência e periodicidade de execução do trabalho:">
                <div className='flex flex-col space-y-1'>
                  <p>Descrição detalhada:</p>
                  <textarea id='nao_havendo_grande_vulto_da_contratacao' className='border rounded-sm p-2 w-full' value={formData.descricaoDetalhadaMetodosExecucaoTrabalho} onChange={(e)=>setFormData({...formData, descricaoDetalhadaMetodosExecucaoTrabalho: e.target.value})} />
                </div>
            </FieldsetContainer>
            <FieldsetContainer titleLegend="3.2.4 Horário da prestação de serviço">
                <div className='flex flex-col space-y-1'>
                  <p>Qual o horário da prestação do serviço?</p>
                  <input type="text" id='horario_prestaca_servico' className='border rounded-sm p-2 w-full' value={formData.horarioPrestacaoServico} onChange={(e)=>setFormData({...formData, horarioPrestacaoServico: e.target.value})} />
                </div>
            </FieldsetContainer>
            <FieldsetContainer titleLegend="3.2.5 Cronograma de realização dos serviços">
              <SelectComponent label="Existe cronograma para realização dos serviços" value={formData.existeCronograma} onChange={(e)=> setFormData({...formData, existeCronograma: e.target.value})}>
                <option value="">Selecione uma opção</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </SelectComponent>
              {
                formData.existeCronograma === 'sim' && (
                  <div className='flex flex-col space-y-1'>
                      <p>Qual o cronograma ?</p>
                      <textarea id='cronogramaRealizacaoDosServicos' className='border rounded-sm p-2 w-full' value={formData.cronogramaRealizacaoDosServicos} onChange={(e)=>setFormData({...formData, cronogramaRealizacaoDosServicos: e.target.value})} />
                    </div>
                )
              }
            </FieldsetContainer>
            <FieldsetContainer titleLegend="3.2.6 Para a perfeita execução dos serviços, a Contratada deverá disponibilizar os materiais, equipamentos, ferramentas e utensílios necessários, nas quantidades estimadas e qualidades a seguir estabelecidas, promovendo sua substituição quando necessário">
                <div className='flex flex-col space-y-1'>
                  <p>O que se faz necessário para execução perfeita dos serviços ?</p>
                  <textarea id='perfeitaExecucaoservicos' className='border rounded-sm p-2 w-full' value={formData.perfeitaExecucaoservicos} onChange={(e)=>setFormData({...formData, perfeitaExecucaoservicos: e.target.value})} />
                </div>
            </FieldsetContainer>
            <FieldsetContainer titleLegend="3.2.7 O objeto será recebido">
              <CollapsibleText title="Orientações para preenchimento">
                    <p className="orientacoes">
                      (A Lei nº 14.133/21 não trouxe prazo máximo de recebimento provisório ou definitivo. Desse modo, recomenda-se que o prazo seja dimensionado para que corresponda ao período razoável à checagem necessária, sem que traga um ônus excessivo que venha a afastar potenciais interessados)
                    </p>
              </CollapsibleText>
                <div className='flex flex-col'>
                <label htmlFor="objetoSeraRecebido" className="font-semibold">O objeto será recebido?</label>
                <select name="objetoSeraRecebido" id="objetoSeraRecebido" value={formData.objetoSeraRecebido} onChange={(e)=>setFormData({...formData,objetoSeraRecebido: e.target.value})} className="border rounded-sm p-2 flex-grow w-1/5">
                  <option value="">Selecione uma opção</option>
                  <option value="nao">Não</option>
                  <option value="ProvisorioEDefinitivo">Provisorio e Definitivo</option>
                </select>
              </div>
            {
              formData.objetoSeraRecebido === "ProvisorioEDefinitivo" && (
                <>
                  <InputComponent
                    label="qual o prazo para o recebimento definitivo?"
                    id="prazoRecebimentoDefinitivo"
                    type="number"
                    value={formData.prazoRecebimentoDefinitivo}
                    onChange={(e) => setFormData({...formData, prazoRecebimentoDefinitivo: e.target.value})}
                  />
                  <InputComponent
                    label="qual o prazo para o recebimento Provisorio?"
                    id="prazoRecebimentoDefinitivo"
                    type="number"
                    value={formData.prazoRecebimentoProvisorio}
                    onChange={(e) => setFormData({...formData, prazoRecebimentoProvisorio: e.target.value})}
                  />
                  <div className="flex flex-col mt-2">
                  <label htmlFor="recebimentoDefinitivoPoderaSerExcepcionalmente" className="font-semibold">Recebimento Definitivo Poderá Ser Excepcionalmente Prorrogado ?</label>
                  <span className="orientacoes my-1">(Utilizar, se for o caso)</span>
                  <select 
                    name="vedacaoOuParticipacaoPessoasFisicas"
                    id="vedacaoOuParticipacaoPessoasFisicas"  
                    className="border rounded-sm p-2 flex-grow w-1/5" 
                    value={formData.recebimentoDefinitivoPoderaSerExcepcionalmente} 
                    onChange={(e)=> setFormData({...formData, recebimentoDefinitivoPoderaSerExcepcionalmente: e.target.value })}
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>
                  
                </div>
                </>
              )
            }

            </FieldsetContainer>
            <FieldsetContainer titleLegend="3.2.8 O termo detalhado do recebimento provisório, com a análise das ocorrências registradas na execução do contrato serão encaminhados ao gestor para fins de apuração dos descontos e glosas cabíveis na fatura correspondente, em virtude de serviços total ou parcialmente não executados?">
               <div className="flex flex-col mt-2">
                  <label htmlFor="TermoDetalhadoDeRecebimentoProvisorio" className="font-semibold">Foi elaborado o IMR?</label>
                  <span className="orientacoes my-1">(Utilizar, se for o caso)</span>
                  <select 
                    name="TermoDetalhadoDeRecebimentoProvisorio"
                    id="TermoDetalhadoDeRecebimentoProvisorio"  
                    className="border rounded-sm p-2 flex-grow w-1/5" 
                    value={formData.TermoDetalhadoDeRecebimentoProvisorio} 
                    onChange={(e)=> setFormData({...formData, TermoDetalhadoDeRecebimentoProvisorio: e.target.value })}
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>
                </div>
            </FieldsetContainer>
            <FieldsetContainer titleLegend="3.2.10 Condições gerais e específicas para a prestação do serviço?">
              <CollapsibleText title="Orientações para preenchimento">
                <p  className="orientacoes">
                  deve ser incluído, se cabível, condições adicionais de execução do objeto
                </p>
              </CollapsibleText>
              <div className="flex flex-col mt-2">
                  <label htmlFor="mostrarCondicoesAdicionais" className="font-semibold">Será necessário condições adicionais para execução do objeto?</label>
                  <span className="orientacoes my-1">(Utilizar, se for o caso)</span>
                  <select 
                    name="mostrarCondicoesAdicionais"
                    id="mostrarCondicoesAdicionais"  
                    className="border rounded-sm p-2 flex-grow w-1/5" 
                    value={formData.mostrarCondicoesAdicionais} 
                    onChange={(e)=> setFormData({...formData, mostrarCondicoesAdicionais: e.target.value })}
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>
                </div>
                {formData.mostrarCondicoesAdicionais === 'sim' && (
                  <ListaDeStringsEditavel
                    titulo="Condições adicionais"
                    placeholder="Digite uma condição..."
                    labelBotao="Adicionar condição"
                    itens={formData.condicoesAdicionais}
                    onItensChange={(novasCondicoes)=>{
                      setFormData(prev => ({...prev, condicoesAdicionais: novasCondicoes}))
                    }}
                  />
                )}
            </FieldsetContainer>

            <FieldsetContainer titleLegend="3.3 Indicação de marcas ou modelos">
              <CollapsibleText title="Orientações para preenchimento">
                <p className="orientacoes">
                  Embora a contratação seja de serviços, é possível que a Administração indique, de forma excepcional e devidamente justificada, marcas ou modelos de eventuais bens necessários à execução do objeto da contratação, observando as hipóteses previstas no art. 41, inciso I, da Lei nº 14.133/2021. 
                </p>
              </CollapsibleText>
              
                {formData.eEstudosTecnicosPreliminares === 'sim' ? (
                  <div>
                    <div className="flex flex-col mt-2">
                      <label htmlFor="sera_admitida_indicacao" className="font-semibold">Na presente contratação, será admitida a indicão da(s) seguinte(s) marca(s), característica(s) ou modelo(s)?</label>
                      <input type="text" id='sera_admitida_indicacao' className='border rounded-sm p-2 w-full' value={formData.sera_admitida_indicacao} onChange={(e)=>setFormData({...formData, sera_admitida_indicacao: e.target.value})} />
                    </div>
                    <div className="flex flex-col mt-2">
                      <label htmlFor="numero_etp" className="font-semibold">Qual o tópico específico do Estudo Técnico Preliminar (ETP)?</label>
                      <input type="number" id='numero_etp' className='border rounded-sm p-2 w-full' value={formData.numero_etp} onChange={(e)=>setFormData({...formData, numero_etp: e.target.value})} />
                    </div>
                  </div>
                ):(
                  <div>
                    <div>
                      <div className="flex flex-col mt-2">
                        <label htmlFor="marcas_ou_modelos_indicadas" className="font-semibold">Será admitida a indicação da(s) seguinte(s) narca(s) ou modelo(s)?</label>
                        <input type="text" id='marcas_ou_modelos_indicadas' className='border rounded-sm p-2 w-full' value={formData.marcas_ou_modelos_indicadas} onChange={(e)=>setFormData({...formData, marcas_ou_modelos_indicadas: e.target.value})} />
                      </div>
                      <div className="flex flex-col mt-2">
                        <label htmlFor="devido_a" className="font-semibold">Devido a?</label>
                        <p className="orientacoes py-1.5">Justificar com base no art. 41, inciso I, da Lei nº 14.133, de 2021. Por exemplo: necessidade de padronização do objeto, compatibilidade com plataformas e padrões já adotados pela Administração, marca ou modelo comercializados por mais de um fornecedor forem os únicos capazes de atender às necessidades do contratante, quando a descrição do objeto a ser licitado puder ser mais bem compreendida pela identificação de determinada marca ou determinado modelo aptos a servir apenas como referência.</p>
                        <input type="text" id='devido_a' className='border rounded-sm p-2 w-full' value={formData.devido_a} onChange={(e)=>setFormData({...formData, devido_a: e.target.value})} />
                      </div>
                    </div>
                  </div>
                )}
            </FieldsetContainer>
            <FieldsetContainer titleLegend="3.4 Da vedação de utilização de marca / produto na execução do serviço" explicacao="(Se for o caso)">
            <CollapsibleText title="Orientações para preenchimento">
                <p className="orientacoes">
                  Embora a contratação seja de serviços, é possível que a Administração vede o emprego de marca ou produto de bens empregados em sua execução, com base em experiência prévia, registrada em processo administrativo, quando restar comprovado que produtos adquiridos e utilizados anteriormente pela Administração não atendem a requisitos indispensáveis ao pleno adimplemento da obrigação contratual, conforme art. 41, III, da Lei nº 14.133, de 2021.
                </p>
            </CollapsibleText>
                <div className="flex flex-col mt-2">
                  <label htmlFor="preveIndicacaoMarcasOuModelos" className="font-semibold">Prevê vedação a marcas ou modelos?</label>
                  <select 
                    name="preveIndicacaoMarcasOuModelos"
                    id="preveIndicacaoMarcasOuModelos"  
                    className="border rounded-sm p-2 flex-grow w-1/5" 
                    value={formData.necessarioCondicoesAdicionaisParaExecucaoDoObjeto} 
                    onChange={(e)=> setFormData({...formData, necessarioCondicoesAdicionaisParaExecucaoDoObjeto: e.target.value })}
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>
                </div>
                {formData.necessarioCondicoesAdicionaisParaExecucaoDoObjeto === 'sim' && (
                  <TextAreaComBotao
                    label="Não será aceito os seguintes produtos/marcas"
                    placeholder="Digite os produtos/marcas..."
                    valorInicial={formData.condicoesAdicionaisExecucao}
                    onSalvar={(novoValor)=>{
                      setFormData({...formData, condicoesAdicionaisExecucao: novoValor})
                    }}
                  />
                )}
            </FieldsetContainer>
          </FieldsetContainer>
          <FieldsetContainer titleLegend="4. DO VALOR ESTIMADO DA CONTRATAÇÃO">
          
          <FieldsetContainer titleLegend="4.1 Valor estimado da contratação">
            <SelectComponent
              label="Orçamento sigiloso?"
              id="orcamentoSigiloso"
              value={formData.orcamentoSigiloso}
              onChange={(e) => setFormData({...formData, orcamentoSigiloso: e.target.value})}
            >
              <option value="nao">Não</option>
              <option value="sim">Sim</option>
            </SelectComponent>

            {formData.orcamentoSigiloso === 'nao' ? (
              <div className="mt-4">

                <InputComponent
                      label="Valor estimado global"
                      id="valorEstimadoGlobal"
                      type="number"
                      value={formData.valorEstimadoGlobal}
                      onChange={(e) => setFormData({...formData, valorEstimadoGlobal: e.target.value})}
                    />
                    {/* <InputComponent
                      label="Prazo do contrato (meses)"
                      id="prazoMesesContrato"
                      type="number"
                      value={formData.prazoMesesContrato}
                      onChange={(e) => setFormData({...formData, prazoMesesContrato: e.target.value})}
                    /> */}

                {/* <SelectComponent
                  label="Tipo de valor para critério de julgamento"
                  id="tipoValorEstimado"
                  value={formData.tipoValorEstimado}
                  onChange={(e) => setFormData({...formData, tipoValorEstimado: e.target.value})}
                >
                  <option value="">Selecione...</option>
                  <option value="valor_estimado">Valor Estimado</option>
                  <option value="maior_desconto">Maior Desconto</option>
                </SelectComponent> */}

                {/* {formData.tipoValorEstimado === 'valor_estimado' && (
                  <div className="pl-4 border-l-4">
                    <InputComponent
                      label="Valor estimado global"
                      id="valorEstimadoGlobal"
                      type="number"
                      value={formData.valorEstimadoGlobal}
                      onChange={(e) => setFormData({...formData, valorEstimadoGlobal: e.target.value})}
                    />
                    <InputComponent
                      label="Prazo do contrato (meses)"
                      id="prazoMesesContrato"
                      type="number"
                      value={formData.prazoMesesContrato}
                      onChange={(e) => setFormData({...formData, prazoMesesContrato: e.target.value})}
                    />
                  </div>
                )} */}
                
                {/* {formData.tipoValorEstimado === 'maior_desconto' && (
                   <InputComponent
                      label="Valor de referência (Maior Desconto)"
                      id="valorReferenciaMaiorDesconto"
                      type="number"
                      value={formData.valorReferenciaMaiorDesconto}
                      onChange={(e) => setFormData({...formData, valorReferenciaMaiorDesconto: e.target.value})}
                    />
                )} */}
              </div>
            ) : (
              <InputComponent
                      label="Justificar o orçamento sigiloso"
                      id="JustificarOrcamentoSigiloso"
                      type="text"
                      value={formData.justificativaOrcamentoSigiloso}
                      onChange={(e) => setFormData({...formData, justificativaOrcamentoSigiloso: e.target.value})}
                    />
            )}
          </FieldsetContainer>

          <FieldsetContainer titleLegend="4.2 Classificação Orçamentária da Despesa">
            <CollapsibleText title="Orientações">
              <p className="orientacoes">
                No caso de Registro de Preços, apenas o elemento de despesa é necessário para a classificação.
              </p>
            </CollapsibleText>
            <TextAreaComBotao
              label="Elemento de despesa"
              valorInicial={formData.elemento_de_despesa}
              onSalvar={(novoValor)=>{
                setFormData({...formData, elemento_de_despesa: novoValor})
              }}
              
            />
          </FieldsetContainer>

          

          <FieldsetContainer titleLegend="4.3 Justificativa para aplicação ou não do benefício (LC Nº 123/2006)">
            <SelectComponent
              label="justificativa para aplicação ou não do benefício previsto na Lei Complementar Nº 123/2006? (Quando for o caso)"
              onChange={(e)=> setFormData({...formData, aplicarCotaExclusiva: e.target.value})}
              value={formData.aplicarCotaExclusiva}
            >
              <option value="">Selecione uma opção</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </SelectComponent>
             
             {formData.aplicarCotaExclusiva === 'sim' && (
              <>
                {/* <SelectComponent
              label="Aplicação do benefício"
              id="justificativaBeneficioLC123Opcao"
              value={formData.justificativaBeneficioLC123Opcao}
              onChange={(e) => setFormData({...formData, justificativaBeneficioLC123Opcao: e.target.value})}
             >
                <option value="">Selecione uma opção</option>
                <option value="aplicar">Aplicar cota exclusiva (Itens/lotes até R$ 80.000,00)</option>
                <option value="nao_aplicar_sem_enquadramento">Não aplicar (Não há itens/lotes de valor igual ou inferior)</option>
                <option value="nao_aplicar_art_49">Não aplicar (Exceção Art. 49 da LC 123/2006)</option>
                <option value="nao_aplicar_art_4_lei_14133">Não aplicar (Preço anual superior ao limite de EPP - Art. 4º, § 1º, I, Lei 14.133)</option>
             </SelectComponent> */}
             <div className="flex gap-2">
              <input 
                type="checkbox" 
                id="aplicarCotaExclusica" 
                name="justificativaBeneficioLC123Opcao" 
                value="aplicar" 
                checked={formData.justificativaBeneficioLC123Opcao === 'aplicar'}
                onChange={(e) => setFormData({...formData, justificativaBeneficioLC123Opcao: e.target.value})}
              />
              <label htmlFor="aplicarCotaExclusica">Aplicar cota exclusiva (Itens/lotes até R$ 80.000,00)</label>
             </div>
              <div className="flex gap-2">
              <input 
                type="checkbox" 
                id="nao_aplicar_sem_enquadramento" 
                name="justificativaBeneficioLC123Opcao" 
                value="nao_aplicar_sem_enquadramento"
                checked={formData.justificativaBeneficioLC123Opcao === 'nao_aplicar_sem_enquadramento'}
                onChange={(e) => setFormData({...formData, justificativaBeneficioLC123Opcao: e.target.value})} 
              />
              <label htmlFor="nao_aplicar_sem_enquadramento">Não aplicar (Não há itens/lotes de valor igual ou inferior)</label>
             </div>
              <div className="flex gap-2">
                  <input 
                    type="checkbox" 
                    id="nao_aplicar_art_49" 
                    name="justificativaBeneficioLC123Opcao" 
                    value="nao_aplicar_art_49" 
                    checked={formData.justificativaBeneficioLC123Opcao === 'nao_aplicar_art_49'}
                    onChange={(e) => setFormData({...formData, justificativaBeneficioLC123Opcao: e.target.value})} 
                  />
              <label htmlFor="nao_aplicar_art_49">Não aplicar (Exceção Art. 49 da LC 123/2006)</label>
             </div>
              <div className="flex gap-2">
              <input 
                type="checkbox" 
                id="nao_aplicar_art_4_lei_14133" 
                name="justificativaBeneficioLC123Opcao" 
                value="nao_aplicar_art_4_lei_14133" 
                checked={formData.justificativaBeneficioLC123Opcao === 'nao_aplicar_art_4_lei_14133'}
                onChange={(e) => setFormData({...formData, justificativaBeneficioLC123Opcao: e.target.value})}
              />
              <label htmlFor="nao_aplicar_art_4_lei_14133">Não aplicar (Preço anual superior ao limite de EPP - Art. 4º, § 1º, I, Lei 14.133)</label>
             </div>

            {formData.justificativaBeneficioLC123Opcao === 'aplicar' && (
              <InputComponent
                label="Itens OU lotes com cota exclusiva"
                id="itensLotesCotaExclusiva"
                value={formData.itensLotesCotaExclusiva}
                onChange={(e) => setFormData({...formData, itensLotesCotaExclusiva: e.target.value})}
                orientacoes="Citar quais itens ou lotes. Deixe em branco se forem todos."
              />
            )}

            {formData.justificativaBeneficioLC123Opcao === 'nao_aplicar_art_49' && (
              <div className="pl-4 border-l-4">
                 <InputComponent
                  label="Inciso(s) do art. 49 da LC nº 123/2006"
                  id="incisosArt49LC123"
                  value={formData.incisosArt49LC123}
                  onChange={(e) => setFormData({...formData, incisosArt49LC123: e.target.value})}
                />
                 <InputComponent
                  label="Inciso(s) do art. 9º do Decreto nº 45.140/2017"
                  id="incisosArt9Decreto45140"
                  value={formData.incisosArt9Decreto45140}
                  onChange={(e) => setFormData({...formData, incisosArt9Decreto45140: e.target.value})}
                />
                 <InputComponent
                  label="Justificativa robusta para o enquadramento"
                  id="justificativaNaoAplicacaoArt49"
                  value={formData.justificativaNaoAplicacaoArt49}
                  onChange={(e) => setFormData({...formData, justificativaNaoAplicacaoArt49: e.target.value})}
                />
              </div>
            )}

            {formData.justificativaBeneficioLC123Opcao === 'nao_aplicar_art_4_lei_14133' && (
               <InputComponent
                  label="Item(ns) OU lote(s) que superam o valor"
                  id="itensLotesNaoAplicacaoArt4"
                  value={formData.itensLotesNaoAplicacaoArt4}
                  onChange={(e) => setFormData({...formData, itensLotesNaoAplicacaoArt4: e.target.value})}
                />
            )}
              
              </>
             )}

          </FieldsetContainer>

        </FieldsetContainer>
        <FieldsetContainer titleLegend="5. DA LICITAÇÃO">
          <CollapsibleText title="Orientações">
            <p className="orientacoes">
              Indicação da Portaria SAD nº   2.293/2025. O órgão demandante pode alterar o modo de disputa conforme o caso concreto
            </p>
          </CollapsibleText>
          <FieldsetContainer titleLegend="5.1 Modalidade, Critério, Regime e Disputa">
            <SelectComponent
              label="Modalidade de Licitação"
              id="modalidadeLicitacao"
              value={formData.modalidadeLicitacao}
              onChange={(e) => setFormData({...formData, modalidadeLicitacao: e.target.value})}
            >
              <option value="">Selecione...</option>
              <option value="pregao">Pregão Eletrônico</option>
              <option value="concorrencia">Concorrência Eletrônica</option>
            </SelectComponent>
            
            <SelectComponent
              label="Critério de Julgamento"
              id="criterioJulgamento"
              value={formData.criterioJulgamento}
              onChange={(e) => setFormData({...formData, criterioJulgamento: e.target.value})}
            >
              <option value="">Selecione...</option>
              <option value="menor_preco_unitario">Menor Preço Unitário/Por Item</option>
              <option value="menor_preco_global">Menor Preço Global/Por Grupo</option>
              <option value="maior_desconto">Maior Desconto</option>
            </SelectComponent>

             <SelectComponent
              label="Regime de Execução"
              id="regimeExecucao"
              value={formData.regimeExecucao}
              onChange={(e) => setFormData({...formData, regimeExecucao: e.target.value})}
            >
              <option value="">Selecione...</option>
              <option value="empreitada_preco_unitario">Empreitada por Preço Unitário</option>
              <option value="empreitada_preco_global">Empreitada por Preço Global</option>
              <option value="empreitada_integral">Empreitada Integral</option>
              <option value="contratacao_tarefa">Contratação por Tarefa</option>
            </SelectComponent>

            {/* <SelectComponent
              label="Critério de Aceitabilidade de Preços"
              id="criterioAceitabilidadePrecos"
              value={formData.criterioAceitabilidadePrecos}
              onChange={(e) => setFormData({...formData, criterioAceitabilidadePrecos: e.target.value})}
            >
              <option value="unitario">Unitário</option>
              <option value="global">Global</option>
            </SelectComponent> */}

            <SelectComponent
              label="Modo de Disputa"
              id="modoDisputa"
              value={formData.modoDisputa}
              onChange={(e) => setFormData({...formData, modoDisputa: e.target.value})}
            >
              <option value="aberto_fechado">Aberto-Fechado (Padrão)</option>
              <option value="aberto">Aberto</option>
              <option value="fechado_aberto">Fechado-Aberto</option>
            </SelectComponent>

            <InputComponent
              label="Motivação para escolha dos parâmetros"
              id="motivacaoParametrosLicitacao"
              value={formData.motivacaoParametrosLicitacao}
              onChange={(e) => setFormData({...formData, motivacaoParametrosLicitacao: e.target.value})}
              orientacoes="Motivação para escolha do modo de disputa e combinação dos parâmetros (Art. 18, VIII, Lei 14.133)"
            />

            <SelectComponent
              label="Inversão de Fases?"
              id="inversaoFases"
              value={formData.inversaoFases}
              onChange={(e) => setFormData({...formData, inversaoFases: e.target.value})}
            >
              <option value="nao">Não (Regra)</option>
              <option value="sim">Sim (Excepcional)</option>
            </SelectComponent>

            {formData.inversaoFases === 'sim' && (
               <InputComponent
                label="Justificativa da Inversão de Fases"
                id="justificativaInversaoFases"
                value={formData.justificativaInversaoFases}
                onChange={(e) => setFormData({...formData, justificativaInversaoFases: e.target.value})}
                orientacoes="Expor os benefícios decorrentes da inversão."
              />
            )}
          </FieldsetContainer>

          <FieldsetContainer titleLegend="5.2 Proposta">
            <InputComponent
              label="Prazo de Validade da Proposta (em dias)"
              id="prazoValidadePropostaDias"
              type="number"
              value={formData.prazoValidadePropostaDias}
              onChange={(e) => setFormData({...formData, prazoValidadePropostaDias: e.target.value})}
              orientacoes="Mínimo sugerido: 60 dias."
            />

            <SelectComponent
              label="Requer garantia de proposta?"
              id="requeGarantiaProposta"
              value={formData.requeGarantiaProposta}
              onChange={(e) => setFormData({...formData, requeGarantiaProposta: e.target.value})}
            >
              <option value="nao">Não</option>
              <option value="sim">Sim (Excepcional)</option>
            </SelectComponent>
            
            {formData.requeGarantiaProposta === 'sim' && (
              <div className="pl-4 border-l-4">
                <InputComponent
                  label="Percentual de Garantia (0.01 a 1.00%)"
                  id="percentualGarantiaProposta"
                  type="number"
                  step="0.01"
                  min="0.01"
                  max="1"
                  value={formData.percentualGarantiaProposta}
                  onChange={(e) => setFormData({...formData, percentualGarantiaProposta: e.target.value})}
                />
                <InputComponent
                  label="Justificativa da Garantia de Proposta"
                  id="justificativaGarantiaProposta"
                  value={formData.justificativaGarantiaProposta}
                  onChange={(e) => setFormData({...formData, justificativaGarantiaProposta: e.target.value})}
                />
              </div>
            )}

            <SelectComponent
              label="Requer amostra, teste de conformidade ou prova de conceito?"
              id="requeAmostra"
              value={formData.requeAmostra}
              onChange={(e) => setFormData({...formData, requeAmostra: e.target.value})}
            >
              <option value="nao">Não</option>
              <option value="sim">Sim (Excepcional)</option>
            </SelectComponent>

            {formData.requeAmostra === 'sim' && (
              <div className="pl-4 border-l-4">
                <SelectComponent
                  label="Tipo de Teste"
                  id="tipoAmostra"
                  value={formData.tipoAmostra}
                  onChange={(e) => setFormData({...formData, tipoAmostra: e.target.value})}
                >
                  <option value="">Selecione...</option>
                  <option value="amostra">Amostra</option>
                  <option value="exame_conformidade">Exame de Conformidade</option>
                  <option value="prova_conceito">Prova de Conceito</option>
                  <option value="outro">Outro</option>
                </SelectComponent>

                {formData.tipoAmostra === 'outro' && (
                  <InputComponent
                    label="Especifique o tipo de teste"
                    id="outroTipoAmostra"
                    value={formData.outroTipoAmostra}
                    onChange={(e) => setFormData({...formData, outroTipoAmostra: e.target.value})}
                  />
                )}

                <InputComponent
                  label="Justificativa para o teste"
                  id="justificativaAmostra"
                  value={formData.justificativaAmostra}
                  onChange={(e) => setFormData({...formData, justificativaAmostra: e.target.value})}
                  orientacoes="Explicitar as razões pelas quais as especificações técnicas não são suficientes."
                />

                <InputComponent
                  label="Prazo para apresentação (dias úteis)"
                  id="prazoAmostraDiasUteis"
                  type="number"
                  value={formData.prazoAmostraDiasUteis}
                  onChange={(e) => setFormData({...formData, prazoAmostraDiasUteis: e.target.value})}
                />

                <SelectComponent
                  label="Fase de Apresentação"
                  id="faseApresentacaoAmostra"
                  value={formData.faseApresentacaoAmostra}
                  onChange={(e) => setFormData({...formData, faseApresentacaoAmostra: e.target.value})}
                >
                  <option value="julgamento_proposta">Julgamento da Proposta</option>
                  <option value="apos_homologacao">Após Homologação (Condição p/ Assinatura)</option>
                  <option value="vigencia_contratual">Vigência Contratual</option>
                </SelectComponent>

                <InputComponent
                  label="Endereço para apresentação"
                  id="enderecoApresentacaoAmostra"
                  value={formData.enderecoApresentacaoAmostra}
                  onChange={(e) => setFormData({...formData, enderecoApresentacaoAmostra: e.target.value})}
                />
                 <InputComponent
                  label="Horário para apresentação"
                  id="horarioApresentacaoAmostra"
                  value={formData.horarioApresentacaoAmostra}
                  onChange={(e) => setFormData({...formData, horarioApresentacaoAmostra: e.target.value})}
                />
                <InputComponent
                  label="Setor responsável pela análise"
                  id="setorResponsavelAmostra"
                  value={formData.setorResponsavelAmostra}
                  onChange={(e) => setFormData({...formData, setorResponsavelAmostra: e.target.value})}
                />

                <ListaDeStringsEditavel
                  titulo="Critérios / Descrição dos Testes"
                  placeholder="Descreva um critério ou etapa do teste"
                  labelBotao="Adicionar Critério"
                  itens={formData.descricaoTesteAmostra}
                  onItensChange={(novosItens) => setFormData(prev => ({ ...prev, descricaoTesteAmostra: novosItens }))}
                />
              </div>
            )}
            
          </FieldsetContainer>

          <FieldsetContainer titleLegend="5.3 Requisitos específicos de habilitação">
            <FieldsetContainer titleLegend="Habilitação Jurídica" classNameFieldset="border-gray-400">
              <SelectComponent
                label="Requer atendimento de lei especial?"
                id="habilitacaoJuridicaLeiEspecial" 
                value={formData.habilitacaoJuridicaLeiEspecial}
                onChange={(e) => setFormData({...formData, habilitacaoJuridicaLeiEspecial: e.target.value})}
              >
                <option value="nao">Não</option>
                <option value="sim">Sim</option>
              </SelectComponent>

              {formData.habilitacaoJuridicaLeiEspecial === 'sim' && (
                <div className="pl-4 border-l-4">
                   <InputComponent
                    label="Atividade sujeita à autorização"
                    id="atividadeAutorizacaoJuridica"
                    value={formData.atividadeAutorizacaoJuridica}
                    onChange={(e) => setFormData({...formData, atividadeAutorizacaoJuridica: e.target.value})}
                  />
                   <InputComponent
                    label="Órgão competente"
                    id="orgaoAutorizacaoJuridica"
                    value={formData.orgaoAutorizacaoJuridica}
                    onChange={(e) => setFormData({...formData, orgaoAutorizacaoJuridica: e.target.value})}
                  />
                   <InputComponent
                    label="Nº da Lei/Decreto"
                    id="numeroLeiAutorizacaoJuridica"
                    value={formData.numeroLeiAutorizacaoJuridica}
                    onChange={(e) => setFormData({...formData, numeroLeiAutorizacaoJuridica: e.target.value})}
                  />
                </div>
              )}
            </FieldsetContainer>

            <FieldsetContainer titleLegend="Qualificação Técnica" classNameFieldset="border-gray-400 mt-4">
              <SelectComponent
                label="Requer registro em entidade profissional?"
                id="requerRegistroEntidadeProfissional"
                value={formData.requerRegistroEntidadeProfissional}
                onChange={(e) => setFormData({...formData, requerRegistroEntidadeProfissional: e.target.value})}
              >
                <option value="nao">Não</option>
                <option value="sim">Sim</option>
              </SelectComponent>
              
              {formData.requerRegistroEntidadeProfissional === 'sim' && (
                <InputComponent
                  label="Nome completo da entidade profissional"
                  id="nomeEntidadeProfissional"
                  value={formData.nomeEntidadeProfissional}
                  onChange={(e) => setFormData({...formData, nomeEntidadeProfissional: e.target.value})}
                />
              )}

              <SelectComponent
                label="Requer comprovação de aptidão (atestado técnico)?"
                id="requerComprovacaoAptidao"
                value={formData.requerComprovacaoAptidao}
                onChange={(e) => setFormData({...formData, requerComprovacaoAptidao: e.target.value})}
              >
                <option value="nao">Não</option>
                <option value="sim">Sim</option>
              </SelectComponent>

              {formData.requerComprovacaoAptidao === 'sim' && (
                <div className="pl-4 border-l-4">
                  {/* <InputComponent
                    label="Serviços a serem comprovados no atestado"
                    id="servicosComprovacaoAptidao"
                    value={formData.servicosComprovacaoAptidao}
                    onChange={(e) => setFormData({...formData, servicosComprovacaoAptidao: e.target.value})}
                  /> */}
                  <TextAreaComBotao
                    label="Serviços a serem comprovados no atestado"
                    valorInicial={formData.servicosComprovacaoAptidao}
                    onSalvar={(novoValor)=>{
                      setFormData({...formData, servicosComprovacaoAptidao: novoValor})}}
                  />
                  <InputComponent
                    label="Percentual mínimo do atestado (1 a 50%)"
                    id="percentualMinimoAtestadoTecnico"
                    type="number"
                    min="1"
                    max="50"
                    value={formData.percentualMinimoAtestadoTecnico}
                    onChange={(e) => setFormData({...formData, percentualMinimoAtestadoTecnico: e.target.value})}
                  />
                  <InputComponent
                    label="Justificativa do percentual"
                    id="justificativaPercentualAtestadoTecnico"
                    value={formData.justificativaPercentualAtestadoTecnico}
                    onChange={(e) => setFormData({...formData, justificativaPercentualAtestadoTecnico: e.target.value})}
                  />
                </div>
              )}

              <SelectComponent
                label="Prevê vistoria prévia?"
                id="preveVistoriaPrevia"
                value={formData.preveVistoriaPrevia}
                onChange={(e) => setFormData({...formData, preveVistoriaPrevia: e.target.value})}
              >
                <option value="nao">Não</option>
                <option value="sim">Sim (Excepcional)</option>
              </SelectComponent>

              {formData.preveVistoriaPrevia === 'sim' && (
                <div className="pl-4 border-l-4">
                  <InputComponent
                    label="Justificativa da Vistoria"
                    id="justificativaVistoriaPrevia"
                    value={formData.justificativaVistoriaPrevia}
                    onChange={(e) => setFormData({...formData, justificativaVistoriaPrevia: e.target.value})}
                    orientacoes="Justificar por que a avaliação prévia é imprescindível."
                  />
                   <InputComponent
                    label="Setor para agendamento"
                    id="agendamentoVistoriaPreviaSetor"
                    value={formData.agendamentoVistoriaPreviaSetor}
                    onChange={(e) => setFormData({...formData, agendamentoVistoriaPreviaSetor: e.target.value})}
                  />
                   <InputComponent
                    label="Telefone/Email para agendamento"
                    id="agendamentoVistoriaPreviaTelefone"
                    value={formData.agendamentoVistoriaPreviaTelefone}
                    onChange={(e) => setFormData({...formData, agendamentoVistoriaPreviaTelefone: e.target.value})}
                  />
                </div>
              )}

            </FieldsetContainer>

            <FieldsetContainer titleLegend="Qualificação Econômico-Financeira" classNameFieldset="border-gray-400 mt-4">
              <SelectComponent
                label="Exigir comprovação por:"
                id="habilitacaoEconomicaPor"
                value={formData.habilitacaoEconomicaPor}
                onChange={(e) => setFormData({...formData, habilitacaoEconomicaPor: e.target.value})}
              >
                <option value="">Nenhum</option>
                <option value="patrimonio_liquido">Patrimônio Líquido Mínimo</option>
                <option value="capital_social">Capital Social Mínimo</option>
              </SelectComponent>

              {formData.habilitacaoEconomicaPor && (
                 <InputComponent
                    label="Percentual do valor da contratação (1 a 10%)"
                    id="percentualHabilitacaoEconomica"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.percentualHabilitacaoEconomica}
                    onChange={(e) => setFormData({...formData, percentualHabilitacaoEconomica: e.target.value})}
                  />
              )}

              {/* Só mostra acréscimo de consórcio se a seção 2.5 permitir consórcios */
              formData.descricao !== 'nao' && formData.habilitacaoEconomicaPor && (
                 <InputComponent
                    label="Acréscimo para Consórcio (10 a 30%)"
                    id="percentualAcrescimoConsorcio"
                    type="number"
                    min="10"
                    max="30"
                    value={formData.percentualAcrescimoConsorcio}
                    onChange={(e) => setFormData({...formData, percentualAcrescimoConsorcio: e.target.value})}
                    orientacoes="Percentual adicional sobre o valor exigido de licitante individual."
                  />
              )}

              <SelectComponent
                label="Requer índices contábeis (LG, SG, LC)?"
                id="requerIndicesContabeis"
                value={formData.requerIndicesContabeis}
                onChange={(e) => setFormData({...formData, requerIndicesContabeis: e.target.value})}
              >
                <option value="nao">Não</option>
                <option value="sim">Sim</option>
              </SelectComponent>

              {formData.requerIndicesContabeis === 'sim' && (
                <InputComponent
                  label="Justificativa para adoção dos índices"
                  id="justificativaIndicesContabeis"
                  value={formData.justificativaIndicesContabeis}
                  onChange={(e) => setFormData({...formData, justificativaIndicesContabeis: e.target.value})}
                />
              )}

            </FieldsetContainer>

          </FieldsetContainer>

        </FieldsetContainer>
        <FieldsetContainer titleLegend="6. DO REGISTRO DE PREÇOS (SRP)">
  <CollapsibleText title="Orientações">
    <p className="orientacoes">
      Esta seção só se aplica se a contratação for por Sistema de Registro de Preços (SRP).
      Selecione "Sim" no item 1.1 para habilitar.
    </p>
  </CollapsibleText>

  {/* O conteúdo da seção 6 só aparece se for RP */}
  {formData.eRegistroPreco === 'sim' && (
    <div className="space-y-6 mt-4">

      <FieldsetContainer titleLegend="6.1 Justificativa para utilização do SRP">
        <InputComponent
          label="Inciso(s) do Decreto nº 54.700/2023"
          id="incisoDecreto54700"
          value={formData.incisoDecreto54700}
          onChange={(e) => setFormData({...formData, incisoDecreto54700: e.target.value})}
          orientacoes="Ex: I, II"
        />
        <InputComponent
          label="Justificativa (visto que...)"
          id="justificativaUsoSrp"
          value={formData.justificativaUsoSrp}
          onChange={(e) => setFormData({...formData, justificativaUsoSrp: e.target.value})}
          orientacoes="Apresentar argumentos que justifiquem a aplicação."
        />
      </FieldsetContainer>

      <FieldsetContainer titleLegend="6.2 Órgão ou entidade gerenciador(a)">
        <InputComponent
          label="Nome do Órgão Gerenciador"
          id="orgaoGerenciador"
          value={formData.orgaoGerenciador}
          onChange={(e) => setFormData({...formData, orgaoGerenciador: e.target.value})}
        />
      </FieldsetContainer>

      <FieldsetContainer titleLegend="6.3 Órgãos ou entidades participantes">
        <SelectComponent
          label="Tipo de Participação"
          id="texto_orgaos_participantes_tipo"
          value={formData.texto_orgaos_participantes_tipo}
          onChange={(e) => setFormData({...formData, texto_orgaos_participantes_tipo: e.target.value})}
        >
          <option value="">Selecione...</option>
          <option value="unico">Órgão Único</option>
          <option value="multiplos">Múltiplos Órgãos</option>
          <option value="corporativa">Ata Corporativa (Padrão)</option>
        </SelectComponent>

        {formData.texto_orgaos_participantes_tipo === 'unico' && (
          <InputComponent
            label="Nome do Órgão Participante Único"
            id="orgaoParticipanteUnico"
            value={formData.orgaoParticipanteUnico}
            onChange={(e) => setFormData({...formData, orgaoParticipanteUnico: e.target.value})}
          />
        )}
        {formData.texto_orgaos_participantes_tipo === 'multiplos' && (
          <ListaDeStringsEditavel
            titulo="Órgãos Participantes"
            placeholder="Nome do Órgão"
            labelBotao="Adicionar Órgão"
            itens={formData.orgaosParticipantes}
            onItensChange={(novosItens) => setFormData(prev => ({ ...prev, orgaosParticipantes: novosItens }))}
          />
        )}
      </FieldsetContainer>

      <FieldsetContainer titleLegend="6.4 Prazo para assinatura da ARP">
        <InputComponent
          label="Prazo para Assinatura (dias úteis)"
          id="prazoAssinaturaArpDiasUteis"
          type="number"
          value={formData.prazoAssinaturaArpDiasUteis}
          onChange={(e) => setFormData({...formData, prazoAssinaturaArpDiasUteis: e.target.value})}
        />
      </FieldsetContainer>
      
      <FieldsetContainer titleLegend="6.6 Contratação individual de itens em lotes">
        <SelectComponent
          label="Permitir contratação individual de itens de lote?"
          id="permiteContratacaoIndividualItemLote"
          value={formData.permiteContratacaoIndividualItemLote}
          onChange={(e) => setFormData({...formData, permiteContratacaoIndividualItemLote: e.target.value})}
        >
          <option value="nao">Não (Regra Padrão)</option>
          <option value="sim">Sim (Dispensando vantajosidade)</option>
        </SelectComponent>
        {formData.permiteContratacaoIndividualItemLote === 'sim' && (
          <InputComponent
            label="Justificativa (técnica, econômica ou gerencial)"
            id="justificativaContratacaoIndividualItemLote"
            value={formData.justificativaContratacaoIndividualItemLote}
            onChange={(e) => setFormData({...formData, justificativaContratacaoIndividualItemLote: e.target.value})}
          />
        )}
      </FieldsetContainer>

      <FieldsetContainer titleLegend="6.7. PREVISÃO E JUSTIFICATIVA DA POSSIBILIDADE DE ADESÃO POR ÓRGÃOS E ENTIDADES NÃO PARTICIPANTES E CONDIÇÕES DE ADESÃO">
        <SelectComponent
          label="Permite adesão de órgãos não participantes?"
          id="permiteAdesaoOrgaosNaoParticipantes"
          value={formData.permiteAdesaoOrgaosNaoParticipantes}
          onChange={(e) => setFormData({...formData, permiteAdesaoOrgaosNaoParticipantes: e.target.value})}
        >
          <option value="sim">Sim</option>
          <option value="nao">Não</option>
        </SelectComponent>

        {formData.permiteAdesaoOrgaosNaoParticipantes === 'sim' ? (
          <div className="pl-4 border-l-4">
            <InputComponent
              label="Email para solicitação de adesão"
              id="emailAdesao"
              type="email"
              value={formData.emailAdesao}
              onChange={(e) => setFormData({...formData, emailAdesao: e.target.value})}
            />
            <InputComponent
              label="Telefone para solicitação de adesão"
              id="telefoneAdesao"
              value={formData.telefoneAdesao}
              onChange={(e) => setFormData({...formData, telefoneAdesao: e.target.value})}
            />
            <SelectComponent
              label="Usar limites de adesão padronizados (PGE)?"
              id="usarLimitesAdesaoPadronizados"
              value={formData.usarLimitesAdesaoPadronizados}
              onChange={(e) => setFormData({...formData, usarLimitesAdesaoPadronizados: e.target.value})}
            >
              <option value="sim">Sim (Padrão)</option>
              <option value="nao">Não (Definir limites manualmente)</option>
            </SelectComponent>
            
            {formData.usarLimitesAdesaoPadronizados === 'nao' && (
              <div className="pl-4 border-l-4">
                <InputComponent
                  label="Limite por órgão (% dos quantitativos)"
                  id="limiteAdesaoCadaOrgao"
                  type="number"
                  value={formData.limiteAdesaoCadaOrgao}
                  onChange={(e) => setFormData({...formData, limiteAdesaoCadaOrgao: e.target.value})}
                />
                <InputComponent
                  label="Limite total (% dos quantitativos)"
                  id="limiteAdesaoTotal"
                  type="number"
                  value={formData.limiteAdesaoTotal}
                  onChange={(e) => setFormData({...formData, limiteAdesaoTotal: e.target.value})}
                />
              </div>
            )}
          </div>
        ) : (
          <InputComponent
            label="Justificativa da não permissão"
            id="justificativaNaoAdesao"
            value={formData.justificativaNaoAdesao}
            onChange={(e) => setFormData({...formData, justificativaNaoAdesao: e.target.value})}
          />
        )}
      </FieldsetContainer>

      <FieldsetContainer titleLegend="6.9 Obrigações da Gerenciadora da ATA">
        <SelectComponent
          label="Usar redação padronizada (PGE)?"
          id="obrigacoesGerenciadoraUsarPadrao"
          value={formData.obrigacoesGerenciadoraUsarPadrao}
          onChange={(e) => setFormData({...formData, obrigacoesGerenciadoraUsarPadrao: e.target.value})}
        >
          <option value="sim">Sim</option>
          <option value="nao">Não (Usar texto personalizado)</option>
        </SelectComponent>
        <SelectComponent
          label="Incluir obrigações além das padronizadas?"
          id="obrigacoesGerenciadoraIncluirExtras"
          value={formData.obrigacoesGerenciadoraIncluirExtras}
          onChange={(e) => setFormData({...formData, obrigacoesGerenciadoraIncluirExtras: e.target.value})}
        >
          <option value="nao">Não</option>
          <option value="sim">Sim</option>
        </SelectComponent>
        {formData.obrigacoesGerenciadoraIncluirExtras === 'sim' && (
           <ListaDeStringsEditavel
            titulo="Obrigações Extras da Gerenciadora"
            placeholder="Descreva a obrigação"
            labelBotao="Adicionar Obrigação"
            itens={formData.obrigacoesGerenciadoraExtras}
            onItensChange={(novosItens) => setFormData(prev => ({ ...prev, obrigacoesGerenciadoraExtras: novosItens }))}
          />
        )}
      </FieldsetContainer>

      <FieldsetContainer titleLegend="6.10 Obrigações da Detentora da ATA">
        <SelectComponent
          label="Usar redação padronizada (PGE)?"
          id="obrigacoesDetentoraUsarPadrao"
          value={formData.obrigacoesDetentoraUsarPadrao}
          onChange={(e) => setFormData({...formData, obrigacoesDetentoraUsarPadrao: e.target.value})}
        >
          <option value="sim">Sim</option>
          <option value="nao">Não (Usar texto personalizado)</option>
        </SelectComponent>
        <SelectComponent
          label="Incluir obrigações além das padronizadas?"
          id="obrigacoesDetentoraIncluirExtras"
          value={formData.obrigacoesDetentoraIncluirExtras}
          onChange={(e) => setFormData({...formData, obrigacoesDetentoraIncluirExtras: e.target.value})}
        >
          <option value="nao">Não</option>
          <option value="sim">Sim</option>
        </SelectComponent>
        {formData.obrigacoesDetentoraIncluirExtras === 'sim' && (
           <ListaDeStringsEditavel
            titulo="Obrigações Extras da Detentora"
            placeholder="Descreva a obrigação"
            labelBotao="Adicionar Obrigação"
            itens={formData.obrigacoesDetentoraExtras}
            onItensChange={(novosItens) => setFormData(prev => ({ ...prev, obrigacoesDetentoraExtras: novosItens }))}
          />
        )}
      </FieldsetContainer>

    </div>
  )}
</FieldsetContainer>

{/* --- SEÇÃO 7 --- */}
<FieldsetContainer titleLegend="7. DO CONTRATO">
  
  <FieldsetContainer titleLegend="7.1 Prazo de Vigência Contratual">
    <SelectComponent
      label="Tipo de Contrato (Prazo)"
      id="tipoContratoPrazo"
      value={formData.tipoContratoPrazo}
      onChange={(e) => setFormData({...formData, tipoContratoPrazo: e.target.value})}
    >
      <option value="">Selecione...</option>
      <option value="escopo_definido">Serviços com Escopo Definido</option>
      <option value="continuo">Serviços Contínuos</option>
    </SelectComponent>

    {formData.tipoContratoPrazo === 'escopo_definido' && (
      <InputComponent
        label="Prazo de vigência (dias/meses)"
        id="prazoVigenciaEscopoDefinido"
        value={formData.prazoVigenciaEscopoDefinido}
        onChange={(e) => setFormData({...formData, prazoVigenciaEscopoDefinido: e.target.value})}
        orientacoes="Ex: 90 dias, 6 meses"
      />
    )}
    
    {formData.tipoContratoPrazo === 'continuo' && (
      <div className="pl-4 border-l-4">
        <InputComponent
          label="Prazo de vigência (meses/anos)"
          id="prazoVigenciaContinuo"
          value={formData.prazoVigenciaContinuo}
          onChange={(e) => setFormData({...formData, prazoVigenciaContinuo: e.target.value})}
          orientacoes="Ex: 12 meses, 1 ano (Máx 5 anos)"
        />
        <InputComponent
          label="Justificativa (Serviço Continuado)"
          id="justificativaServicoContinuo"
          value={formData.justificativaServicoContinuo}
          onChange={(e) => setFormData({...formData, justificativaServicoContinuo: e.target.value})}
          orientacoes="Justificar por que há necessidade continuada."
        />
        
        <SelectComponent
          label="Contratação com vigência plurianual?"
          id="vigenciaPlurianual"
          value={formData.vigenciaPlurianual}
          onChange={(e) => setFormData({...formData, vigenciaPlurianual: e.target.value})}
          orientacoes="Se vigência inicial for superior a 12 meses."
        >
          <option value="nao">Não</option>
          <option value="sim">Sim</option>
        </SelectComponent>
        {formData.vigenciaPlurianual === 'sim' && (
          <InputComponent
            label="Justificativa da Vantajosidade Plurianual"
            id="justificativaVigenciaPlurianual"
            value={formData.justificativaVigenciaPlurianual}
            onChange={(e) => setFormData({...formData, justificativaVigenciaPlurianual: e.target.value})}
          />
        )}
      </div>
    )}
  </FieldsetContainer>

  <FieldsetContainer titleLegend="7.2 Prazo para Assinatura do Contrato">
    <InputComponent
      label="Prazo para Assinatura (dias úteis)"
      id="prazoAssinaturaContratoDiasUteis"
      type="number"
      value={formData.prazoAssinaturaContratoDiasUteis}
      onChange={(e) => setFormData({...formData, prazoAssinaturaContratoDiasUteis: e.target.value})}
      orientacoes="Prazo padrão: 5 dias úteis."
    />
  </FieldsetContainer>

  <FieldsetContainer titleLegend="7.3 Requisitos da Contratação">
    <SelectComponent
      label="Exigir Carta de Solidariedade?"
      id="requerCartaSolidariedade"
      value={formData.requerCartaSolidariedade}
      onChange={(e) => setFormData({...formData, requerCartaSolidariedade: e.target.value})}
    >
      <option value="nao">Não</option>
      <option value="sim">Sim (Excepcional)</option>
    </SelectComponent>
    {formData.requerCartaSolidariedade === 'sim' && (
      <InputComponent
        label="Justificativa (motivos técnicos)"
        id="justificativaCartaSolidariedade"
        value={formData.justificativaCartaSolidariedade}
        onChange={(e) => setFormData({...formData, justificativaCartaSolidariedade: e.target.value})}
      />
    )}

    <SelectComponent
      label="Exigir Requisitos de Sustentabilidade?"
      id="requerRequisitosSustentabilidade"
      value={formData.requerRequisitosSustentabilidade}
      onChange={(e) => setFormData({...formData, requerRequisitosSustentabilidade: e.target.value})}
    >
      <option value="nao">Não</option>
      <option value="sim">Sim</option>
    </SelectComponent>
    {formData.requerRequisitosSustentabilidade === 'sim' && (
      <InputComponent
        label="Requisitos adicionais e fontes legais"
        id="requisitosSustentabilidade"
        value={formData.requisitosSustentabilidade}
        onChange={(e) => setFormData({...formData, requisitosSustentabilidade: e.target.value})}
      />
    )}
  </FieldsetContainer>

  <FieldsetContainer titleLegend="7.4 Obrigações da Contratante">
    
     <TextAreaComBotao
        label="Obrigações Extras da Contratante"
        valorInicial={formData.obrigacoesContratanteUsarPadrao}
        onSalvar={(novoValor)=>{
          setFormData({...formData, obrigacoesContratanteUsarPadrao: novoValor})
        }}
      />
  </FieldsetContainer>

  <FieldsetContainer titleLegend="7.5 Obrigações da Contratada">
    <SelectComponent
      label="Usar redação padronizada?"
      id="obrigacoesContratadaUsarPadrao"
      value={formData.obrigacoesContratadaUsarPadrao}
      onChange={(e) => setFormData({...formData, obrigacoesContratadaUsarPadrao: e.target.value})}
    >
      <option value="sim">Sim</option>
      <option value="nao">Não (Usar texto personalizado)</option>
    </SelectComponent>

    <SelectComponent
      label="Incluir obrigações extras (além das padronizadas)?"
      id="obrigacoesContratadaIncluirExtras"
      value={formData.obrigacoesContratadaIncluirExtras}
      onChange={(e) => setFormData({...formData, obrigacoesContratadaIncluirExtras: e.target.value})}
    >
      <option value="nao">Não</option>
      <option value="sim">Sim</option>
    </SelectComponent>

    {formData.obrigacoesContratadaIncluirExtras === 'sim' && (
       <ListaDeStringsEditavel
        titulo="Obrigações Extras da Contratada"
        placeholder="Descreva a obrigação"
        labelBotao="Adicionar Obrigação"
        itens={formData.obrigacoesContratadaExtras}
        onItensChange={(novosItens) => setFormData(prev => ({ ...prev, obrigacoesContratadaExtras: novosItens }))}
      />
    )}

  </FieldsetContainer>

  <FieldsetContainer titleLegend="7.6 Garantia Contratual">
    <SelectComponent
      label="Prevê garantia de execução contratual?"
      id="preveGarantiaContratual"
      value={formData.preveGarantiaContratual}
      onChange={(e) => setFormData({...formData, preveGarantiaContratual: e.target.value})}
    >
      <option value="nao">Não</option>
      <option value="sim">Sim</option>
    </SelectComponent>
    {formData.preveGarantiaContratual === 'nao' ? (
      <InputComponent
        label="Justificativa da não-exigência"
        id="justificativaNaoGarantia"
        value={formData.justificativaNaoGarantia}
        onChange={(e) => setFormData({...formData, justificativaNaoGarantia: e.target.value})}
      />
    ) : (
      <InputComponent
        label="Percentual de Garantia (1 a 10%)"
        id="percentualGarantiaContratual"
        type="number"
        min="1" max="10"
        value={formData.percentualGarantiaContratual}
        onChange={(e) => setFormData({...formData, percentualGarantiaContratual: e.target.value})}
      />
    )}
  </FieldsetContainer>

  <FieldsetContainer titleLegend="7.7 Subcontratação">
    <SelectComponent
      label="Permite Subcontratação?"
      id="permiteSubcontratacao"
      value={formData.permiteSubcontratacao}
      onChange={(e) => setFormData({...formData, permiteSubcontratacao: e.target.value})}
    >
      <option value="nao">Não</option>
      <option value="sim_acessorias">Sim, parcelas acessórias</option>
      <option value="sim_tecnicos">Sim, de aspectos técnicos específicos</option>
    </SelectComponent>

    {formData.permiteSubcontratacao === 'nao' && (
       <InputComponent
        label="Justificativa da Vedação"
        id="justificativaNaoSubcontratacao"
        value={formData.justificativaNaoSubcontratacao}
        onChange={(e) => setFormData({...formData, justificativaNaoSubcontratacao: e.target.value})}
      />
    )}
    {formData.permiteSubcontratacao === 'sim_acessorias' && (
      <div className="pl-4 border-l-4">
        <InputComponent
          label="Parcelas Acessórias (atividades)"
          id="parcelasAcessoriasSubcontratacao"
          value={formData.parcelasAcessoriasSubcontratacao}
          onChange={(e) => setFormData({...formData, parcelasAcessoriasSubcontratacao: e.target.value})}
        />
        <InputComponent
          label="Percentual Limite (Ex: 30%)"
          id="percentualLimiteSubcontratacaoAcessorias"
          type="number"
          value={formData.percentualLimiteSubcontratacaoAcessorias}
          onChange={(e) => setFormData({...formData, percentualLimiteSubcontratacaoAcessorias: e.target.value})}
        />
      </div>
    )}
    {formData.permiteSubcontratacao === 'sim_tecnicos' && (
      <div className="pl-4 border-l-4">
        <InputComponent
          label="Aspectos Técnicos Específicos"
          id="aspectosTecnicosSubcontratacao"
          value={formData.aspectosTecnicosSubcontratacao}
          onChange={(e) => setFormData({...formData, aspectosTecnicosSubcontratacao: e.target.value})}
        />
        <InputComponent
          label="Percentual Limite (Máx 25%)"
          id="percentualLimiteSubcontratacaoTecnicos"
          type="number"
          max="25"
          value={formData.percentualLimiteSubcontratacaoTecnicos}
          onChange={(e) => setFormData({...formData, percentualLimiteSubcontratacaoTecnicos: e.target.value})}
        />
      </div>
    )}
    {formData.permiteSubcontratacao !== 'nao' && (
      <div className="mt-2">
        <InputComponent
          label="Fundamentação (viabilidade técnica/econômica)"
          id="fundamentoSubcontratacao"
          value={formData.fundamentoSubcontratacao}
          onChange={(e) => setFormData({...formData, fundamentoSubcontratacao: e.target.value})}
        />
         <InputComponent
          label="Condições para subcontratação"
          id="condicoesSubcontratacao"
          value={formData.condicoesSubcontratacao}
          onChange={(e) => setFormData({...formData, condicoesSubcontratacao: e.target.value})}
          orientacoes="Se houver condições adicionais."
        />
      </div>
    )}
  </FieldsetContainer>
  
      <FieldsetContainer titleLegend="7.8 Modelo de Gestão do Contrato">
        <GestaoAtoresContrato
          atores={formData.atoresGestaoContrato}
          setFormData={setFormData}
        />
        <InputComponent
          label="Meio de comunicação oficial"
          id="meioComunicacaoOficial"
          value={formData.meioComunicacaoOficial}
          onChange={(e) => setFormData({...formData, meioComunicacaoOficial: e.target.value})}
          orientacoes="Ex: Email, Sistema X"
        />
        <InputComponent
          label="Endereço para apresentação da Nota Fiscal"
          id="enderecoEntregaNotaFiscal"
          value={formData.enderecoEntregaNotaFiscal}
          onChange={(e) => setFormData({...formData, enderecoEntregaNotaFiscal: e.target.value})}
        />
        <InputComponent
          label="Setor/Unidade de Gestão"
          id="setorGestaoContrato"
          value={formData.setorGestaoContrato}
          onChange={(e) => setFormData({...formData, setorGestaoContrato: e.target.value})}
        />
        <InputComponent
          label="Setor/Unidade de Fiscalização"
          id="setorFiscalizacaoContrato"
          value={formData.setorFiscalizacaoContrato}
          onChange={(e) => setFormData({...formData, setorFiscalizacaoContrato: e.target.value})}
        />
      </FieldsetContainer>
    </FieldsetContainer>
    <FieldsetContainer titleLegend="8. DOS CRITÉRIOS E PRAZOS PARA PAGAMENTO">
          <SelectComponent
            label="Prever antecipação de pagamento?"
            id="preverAntecipacaoPagamento"
            value={formData.preverAntecipacaoPagamento}
            onChange={(e) => setFormData({...formData, preverAntecipacaoPagamento: e.target.value})}
          >
            <option value="nao">Não (Padrão)</option>
            <option value="sim_total">Sim, total</option>
            <option value="sim_parcial">Sim, parcial</option>
          </SelectComponent>

          {formData.preverAntecipacaoPagamento !== 'nao' && (
            <div className="pl-4 border-l-4">
              <InputComponent
                label="Justificativa da Antecipação"
                id="justificativaAntecipacaoPagamento"
                value={formData.justificativaAntecipacaoPagamento}
                onChange={(e) => setFormData({...formData, justificativaAntecipacaoPagamento: e.target.value})}
                orientacoes="Justificar sensível economia ou condição indispensável."
              />
              <InputComponent
                label="Prazo para pagamento antecipado (dias)"
                id="prazoAntecipacaoPagamento"
                type="number"
                value={formData.prazoAntecipacaoPagamento}
                onChange={(e) => setFormData({...formData, prazoAntecipacaoPagamento: e.target.value})}
              />
              <SelectComponent
                label="Exigir Garantia Adicional?"
                id="requerGarantiaAdicionalAntecipacao"
                value={formData.requerGarantiaAdicionalAntecipacao}
                onChange={(e) => setFormData({...formData, requerGarantiaAdicionalAntecipacao: e.target.value})}
              >
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </SelectComponent>
              {formData.requerGarantiaAdicionalAntecipacao === 'sim' && (
                 <InputComponent
                  label="Percentual da Garantia Adicional (%)"
                  id="percentualGarantiaAdicionalAntecipacao"
                  type="number"
                  value={formData.percentualGarantiaAdicionalAntecipacao}
                  onChange={(e) => setFormData({...formData, percentualGarantiaAdicionalAntecipacao: e.target.value})}
                />
              )}
              {formData.preverAntecipacaoPagamento === 'sim_parcial' && (
                 <InputComponent
                  label="Etapa(s) ou Item(ns) para antecipação"
                  id="etapasItensAntecipacaoParcial"
                  value={formData.etapasItensAntecipacaoParcial}
                  onChange={(e) => setFormData({...formData, etapasItensAntecipacaoParcial: e.target.value})}
                />
              )}
            </div>
          )}
        </FieldsetContainer>
        <FieldsetContainer titleLegend="9. DOS INSTRUMENTOS DE MEDIÇÃO DE RESULTADOS (IMR)">
          <SelectComponent
            label="Usar Instrumento de Medição de Resultado (IMR)?"
            id="usaImr"
            value={formData.usaImr}
            onChange={(e) => setFormData({...formData, usaImr: e.target.value})}
          >
            <option value="nao">Não</option>
            <option value="sim">Sim</option>
          </SelectComponent>

          {formData.usaImr === 'sim' && (
            <div className="pl-4 border-l-4">
              <InputComponent
                label="Quadro de Indicadores (Descrição)"
                id="quadroIndicadoresImr"
                value={formData.quadroIndicadoresImr}
                onChange={(e) => setFormData({...formData, quadroIndicadoresImr: e.target.value})}
                orientacoes="Descreva ou referencie o quadro de indicadores."
              />
              <InputComponent
                label="Prazo para ateste da medição (dias úteis)"
                id="prazoAtesteMedicao"
                type="number"
                value={formData.prazoAtesteMedicao}
                onChange={(e) => setFormData({...formData, prazoAtesteMedicao: e.target.value})}
              />
            </div>
          )}
        </FieldsetContainer>
        <FieldsetContainer titleLegend="10. DAS SANÇÕES GERAIS E ESPECÍFICAS">
          <FieldsetContainer titleLegend="10.1 Sanções (Fase de Licitação)" classNameFieldset="border-gray-400">
            <p className="orientacoes">As sanções desta fase são padronizadas no Edital.</p>
          </FieldsetContainer>

          {formData.eRegistroPreco === 'sim' && (
            <FieldsetContainer titleLegend="10.2 Sanções (Execução da ATA)" classNameFieldset="border-gray-400 mt-4">
              <SelectComponent
                label="Incluir sanções extras (além das padronizadas)?"
                id="sancoesAtaIncluirExtras"
                value={formData.sancoesAtaIncluirExtras}
                onChange={(e) => setFormData({...formData, sancoesAtaIncluirExtras: e.target.value})}
              >
                <option value="nao">Não</option>
                <option value="sim">Sim</option>
              </SelectComponent>
              {formData.sancoesAtaIncluirExtras === 'sim' && (
                <ListaDeStringsEditavel
                  titulo="Sanções Específicas da ATA"
                  placeholder="Descreva a sanção"
                  labelBotao="Adicionar Sanção"
                  itens={formData.sancoesAtaExtras}
                  onItensChange={(novosItens) => setFormData(prev => ({ ...prev, sancoesAtaExtras: novosItens }))}
                />
              )}
            </FieldsetContainer>
          )}

          <FieldsetContainer titleLegend="10.3 Sanções (Execução do Contrato)" classNameFieldset="border-gray-400 mt-4">
            <SelectComponent
              label="Incluir sanções extras (além das padronizadas)?"
              id="sancoesContratoIncluirExtras"
              value={formData.sancoesContratoIncluirExtras}
              onChange={(e) => setFormData({...formData, sancoesContratoIncluirExtras: e.target.value})}
            >
              <option value="nao">Não</option>
              <option value="sim">Sim</option>
            </SelectComponent>
            {formData.sancoesContratoIncluirExtras === 'sim' && (
              <ListaDeStringsEditavel
                titulo="Sanções Específicas do Contrato"
                placeholder="Descreva a sanção"
                labelBotao="Adicionar Sanção"
                itens={formData.sancoesContratoExtras}
                onItensChange={(novosItens) => setFormData(prev => ({ ...prev, sancoesContratoExtras: novosItens }))}
              />
            )}
          </FieldsetContainer>
        </FieldsetContainer>
        <FieldsetContainer titleLegend="11. DAS DEMAIS CONDIÇÕES E ANEXOS">
          <InputComponent
            label="Demais condições necessárias"
            id="demaisCondicoes"
            value={formData.demaisCondicoes}
            onChange={(e) => setFormData({...formData, demaisCondicoes: e.target.value})}
            orientacoes="Incluir cláusulas sobre direitos autorais, sigilo, segurança de dados, etc."
          />
          
          <GestaoOutrosAnexos
            anexos={formData.outrosAnexos}
            setFormData={setFormData}
          />
        </FieldsetContainer>
  </div>
  )
}