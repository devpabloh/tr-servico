import { useState, useEffect } from "react";
import type { FormDataCompleto } from "../types/types"
import {CollapsibleText} from './CollapsibleText'
import {numeroPorExtenso} from '../lib/utils'
import { FieldsetContainer } from "./FieldsetContainer";
import GestaoDeItens from "./GestaoDeItens";
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
  const [texto, setTexto] = useState(valorInicial ?? "");

  useEffect(() => {
    setTexto(valorInicial ?? "");
  }, [valorInicial]);

  const handleChange = (val: string) => {
    setTexto(val);
    onSalvar(val);
  };

  return (
    <div className="flex flex-col mt-2">
      <label className="font-semibold mb-2">{label}</label>
      <textarea
        className="border rounded-sm p-2 w-full font-serif text-lg"
        rows={8}
        placeholder={placeholder}
        value={texto}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}

export function Formulario({formData, setFormData, className}:FormularioProps){

  const toggleOpcao = (valor: string)=> {
    const atual = formData.justificativaBeneficioLC123Opcao || [];
    const novo = atual.includes(valor) ? atual.filter(v => v !== valor) : [...atual,valor]
    setFormData({...formData, justificativaBeneficioLC123Opcao: novo})
  }

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
          </CollapsibleText>
        </FieldsetContainer>
        <FieldsetContainer titleLegend="1. Do objeto da licitação">
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
          <FieldsetContainer titleLegend="Objeto">
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
              {formData.eRegistroPreco === 'nao' && (
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
              )}
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
                        <option value="corporativo">corporativo</option>
                        <option value="simples">simples</option>
                        <option value="unificadoSaude">unificado Saúde</option>
                      </select>
                    </div>
                    {
                formData.qualTipoContratacao === 'simples' && (
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
                )
              }
{
formData.qualTipoContratacao === 'corporativo' && (
    <>
    <SelectComponent
      label="Haverá redução de escopo (Conforme art. 45, do Decreto Estadual nº 54.700/2023)?"
      id="reducaoEscopo"
      value={formData.reducaoEscopo}
      onChange={(e) => setFormData({...formData, reducaoEscopo: e.target.value})}
      className="font-normal"
    >
      <option value="">Selecione uma opção</option>
      <option value="sim">Sim</option>
      <option value="nao">Não</option>
    </SelectComponent>
    {formData.reducaoEscopo === 'sim' && (
      <>
        <div className="flex flex-col mt-4">
        <label htmlFor="quaisOrgaosOuEntidades">Quais são os órgão/entidades que serão atendidos nesta contratação? 
        </label>
        <textarea 
          name="quaisOrgaosOuEntidades" 
          id="quaisOrgaosOuEntidades"
          className='border rounded-sm p-2 w-full'
          value={formData.quaisOrgaosOuEntidades}
          onChange={(e) => setFormData({...formData, quaisOrgaosOuEntidades: e.target.value})}
        />
      </div>
      <div>
        <label htmlFor="justificaCasoConcretoUmaVezQue">E se justifica no caso concreto, uma vez que?</label>
        <textarea
          name="justificaCasoConcretoUmaVezQue"
          id="justificaCasoConcretoUmaVezQue"
          className="border rounded-sm p-2 w-full"
          value={formData.justificaCasoConcretoUmaVezQue}
          onChange={(e) => setFormData({...formData, justificaCasoConcretoUmaVezQue: e.target.value})}
        />
      </div>
      </>
    )}
    </>
  )
}
                  </div>
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
            </div>
          </FieldsetContainer>
        </FieldsetContainer>
        <FieldsetContainer titleLegend="2. Das Justificativas">
          <FieldsetContainer titleLegend="2.1 Justificativa da necessidade da contratação">
              {formData.eEstudosTecnicosPreliminares === 'nao' && (
                <div>
                  <InputComponent label="2.1.1. Expor a finalidade da contratação" id="umaVezQueAtribuicoesFuncionais" value={formData.umaVezQueAtribuicoesFuncionais} onChange={(e)=> setFormData({...formData,umaVezQueAtribuicoesFuncionais: e.target.value })}/>
                  <SelectComponent
                    label="Existe algum dispositivo legal que fundamente o dever do Estado de contratar o objeto?"
                    id="atenderaDeverLegalExposto"
                    value={formData.atenderaDeverLegalExposto}
                    onChange={(e) => setFormData({...formData, atenderaDeverLegalExposto: e.target.value})}
                  >
                    <option value="nao">Não</option>
                    <option value="sim">Sim</option>
                  </SelectComponent>
                  {formData.atenderaDeverLegalExposto === 'sim' && (
                    <div>
                    <label htmlFor="textoAdicional" className="orientacoes">Citar legislação que fundamente o dever do estado de contratar o objeto e transcrever ou explicitar o conteúdo do que preconiza o dispositivo legal citado, se for o caso,</label>
                    <textarea 
                      id="textoAdicional" 
                      className='border rounded-sm p-2 w-full'
                      rows={4}
                      value={formData.texto_nao_existEtpOuInformacaoPresenteExtratoSigilosoItemDois}
                      onChange={(e) => setFormData({...formData, texto_nao_existEtpOuInformacaoPresenteExtratoSigilosoItemDois: e.target.value})}
                    />
                  </div>
                  )}
                </div>
              )}
          </FieldsetContainer>
          <FieldsetContainer titleLegend="2.2 Justificativa do quantitativo estimado">

            {formData.eEstudosTecnicosPreliminares === 'nao' && (
              <div>
                <label htmlFor="fundamentadsEm">2.2.1. Informar os critérios utilizados para definição dos quantitativos a serem contratados conforme os cálculos apresentados neste item ou apontar os documentos que comprovem esse cálculo, se for o caso.</label>
                <textarea 
                  name="fundamentadoEm" 
                  id="fundamentadoEm"
                  onChange={(e)=>setFormData({...formData, fundamentadoEm: e.target.value})}
                  value={formData.fundamentadoEm}
                  className='border rounded-sm p-2 w-full'
                  rows={4}
                />
                {/* <InputComponent
                  label="2.2.1. Informar os critérios utilizados para definição dos quantitativos a serem contratados conforme os cálculos apresentados neste item ao apontar os documentos que comprovem esse cálculo, se for o caso."
                  onChange={(e)=> setFormData({...formData, fundamentadoEm: e.target.value})}
                  value={formData.fundamentadoEm}
                  
                /> */}
                {/* <div>
                    <label htmlFor="texto_nao_justificativa_quantitativo_textoDois" className="font-semibold">   Os quantitativos foram definidos em qual documento?</label>
                    <textarea 
                      id="texto_nao_justificativa_quantitativo_textoDois" 
                      className='border rounded-sm p-2 w-full'
                      rows={4}
                      value={formData.texto_nao_justificativa_quantitativo_textoDois}
                      onChange={(e) => setFormData({...formData, texto_nao_justificativa_quantitativo_textoDois: e.target.value})}
                    />
                  </div> */}
               {/*  <InputComponent
                  label=""
                  placeholder="Ex: foram definidos no próprio termo de referência ou em outro documento (citar)"
                  onChange={(e)=> setFormData({...formData, texto_nao_justificativa_quantitativo_textoDois: e.target.value})}
                  value={formData.texto_nao_justificativa_quantitativo_textoDois}
                  
                /> */}
              </div>
            )}
          </FieldsetContainer>
          <FieldsetContainer titleLegend="2.3 Justificativa da escolha da solução">
            {/* <CollapsibleText title="Orientações para preenchimento">
              <p className="orientacoes">
                Redação a ser utilizada na hipótese de Existir ETP ou quando a informação do presente tópico puder ser obtida no extrato do ETP sigiloso (Art. 9º, do decreto Estadual nº 53.384/2022)
              </p>
            </CollapsibleText> */}
          
            {formData.eEstudosTecnicosPreliminares === "nao" && (
              <div className="my-4">
                <label htmlFor="justificativaEscolhaSolucaoNaoEtp" className="font-semibold">
                  2.3.1. Justificar a razão para escolha desse tipo de serviço frente às demais alternativas para a satisfação da necessidade pública 
                </label>
                <p className="orientacoes mb-2">No caso de contratações que envolvam soluções de TIC informar o alinhamento com as necessidades tecnológicas e de negócio</p>
                <textarea 
                  id="justificativaEscolhaSolucaoNaoEtp" 
                  className='border rounded-sm p-2 w-full'
                  rows={4}
                  value={formData.justificativaEscolhaSolucaoNaoEtp}
                  onChange={(e) => setFormData({...formData, justificativaEscolhaSolucaoNaoEtp: e.target.value})}
                  placeholder="Ex: Quando houver a possibilidade de opção entre aquisição ou locação de bens móveis duráveis."
                />
              </div>
            )}
          </FieldsetContainer>
          <FieldsetContainer titleLegend="2.4 Justificativa para o parcelamento ou não da contratação">
            <CollapsibleText title="Orientações para preenchimento">
                      <p className="orientacoes">
                        Os serviços, como regra, devem atender ao princípio do parcelamento quando no caso concreto a divisão for tecnicamente viável e economicamente vantajosa. Para tanto, a Administração Pública deve motivar a sua escolha quanto ao desenho da contratação atentando para as regras do artigo 47, § 1º, da Lei nº 14.133, de 2021, que trata de aspectos a serem considerados na aplicação do mencionado princípio.
                      </p>
                      <p className="orientacoes">
                        Os textos descritos neste documento são apenas sugestões de redação para os casos mais comuns. Caso a situação prática não se enquadre em nenhuma das hipóteses elencadas, o responsável pela confecção do Termo de Referência deve elaborar redação apresentando a justificativa que retrate melhor a sua realidade. 
                      </p>
                      <p className="orientacoes">Atentar que, sempre que possível, a divisão do objeto para adjudicação por item deve ser priorizada.</p>
                      <p className="orientacoes">No caso de grupo, pode-se discorrer sobre o fato de que os itens foram agrupados para não trazer risco ao conjunto do objeto pretendido.</p>
                      <p className="orientacoes">O agrupamento dos itens em grupos deve ser feito com segurança e em plena consonância com a prática de mercado de forma a assegurar ampla competitividade ao certame.</p>
            </CollapsibleText>
            {formData.eEstudosTecnicosPreliminares === 'nao' && (
              <div className="mt-4 p-4 border-t-2">
                <SelectComponent
                  label="Qual a opção de parcelamento?"
                  value={formData.tipoParcelamentoNaoEtp}
                  onChange={(e) => setFormData({...formData, tipoParcelamentoNaoEtp: e.target.value})}
                >
                  <option value="">Selecione uma opção</option>
                  <option value="item">Item(ns)</option>
                  <option value="lote">Grupo(s)</option>
                </SelectComponent>

                {/* Sub-opção "item" */}
                {formData.tipoParcelamentoNaoEtp === 'item' && (
                  <div className="my-4">
                    
                    <label htmlFor="razoesParcelamentoItem" className="font-semibold">
                      Expor os motivos pelos quais a Administração Pública opta pelo parcelamento por item(ns), apresentando argumentos técnicos e/ou econômicos para o parcelamento do objeto em questão. 
                    </label>
                    <textarea 
                      id="razoesParcelamentoItem" 
                      className='border rounded-sm p-2 w-full'
                      rows={4}
                      value={formData.razoesParcelamentoItem}
                      onChange={(e) => setFormData({...formData, razoesParcelamentoItem: e.target.value})}
                      placeholder="Exemplo: Quando os percentuais de exigências de qualificação técnica e econômico-financeira forem elevados ou resultarem em quantias vultosas, especialização, etc
"
                    />
                  </div>
                )}

                {/* Sub-opção "lote" */}
                {formData.tipoParcelamentoNaoEtp === 'lote' && (
                   <div className="my-4">
                    <label htmlFor="justificativaAgrupamentoLote" className="font-semibold">
                     2.4.1. Expor os motivos das razões técnicas/econômicas para o parcelamento por grupo(s) 
                    </label>
                    <textarea 
                      id="justificativaAgrupamentoLote" 
                      className='border rounded-sm p-2 w-full'
                      rows={4}
                      value={formData.justificativaAgrupamentoLote}
                      onChange={(e) => setFormData({...formData, justificativaAgrupamentoLote: e.target.value})}
                      placeholder="Ex: Prejuízo com pulverização, regionalização, economia de escala, etc."
                    />
                  </div>
                )}

                {/* Opção Adicional "Lotes Espelhados" (aparece se ETP=NÃO) */}
                <hr className="my-4"/>
                <SelectComponent
                  label={`Haverá ${formData.tipoParcelamentoNaoEtp === "item" ? "item(s)" : "Grupo(s)"} espelhados e/ou regionalizados e/ou divididos por outro critério?
`}
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
                      2.4.4. Citar ainda outros argumentos que possam forçar o espelhamento
                    </label>
                    <p className="orientacoes">Exemplos: Aproveitamento das peculiaridades do mercado local, a busca pela ampliação da competição, evitar a concentração de mercado, etc.</p>
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
            {formData.descricao === 'sim_com_numero_limitado_de_fornecedores' && (
              <div className='flex flex-col space-y-1'>
                <label htmlFor="quantas_empresas_serao_admitidas_consorcio" className="font-semibold">2.5.2. Quantas empresas serão admitidas em cada consórcio ?</label>
                <input type="number" id='quantas_empresas_serao_admitidas_consorcio' className='border rounded-sm p-2 w-full' value={formData.numeroConsorciadas} onChange={(e)=>setFormData({...formData, numeroConsorciadas: e.target.value})} />
                  {formData.descricao === 'sim_com_numero_limitado_de_fornecedores' && (
                  <p className="text-sm text-gray-500 italic">
                    {numeroPorExtenso(formData.numeroConsorciadas)}
                  </p>
                )}
              </div>
            ) }
            {formData.descricao === 'sim_com_numero_limitado_de_fornecedores' && (
              <div className='flex flex-col space-y-1'>
                <label htmlFor="justificativa" className="font-semibold">2.5.2. Expor justificativa técnica aprovada pela autoridade competente que viabilize a limitação de participantes no consórcio</label>
                <input type="text" id='justificativa' className='border rounded-sm p-2' value={formData.justificativa} onChange={(e)=>setFormData({...formData, justificativa: e.target.value})} />
              </div>
            ) }
            {formData.descricao === 'nao' && (
              <div className='flex flex-col space-y-1'>
                <label htmlFor="nao_havendo_complexidade_objeto" className='font-semibold'>2.5.3. Justificar ausência de complexidade (se houver)</label>
                <div>
                  <input type="text" id='nao_havendo_complexidade_objeto' className='border rounded-sm p-2 w-full' value={formData.nao_havendo_complexidade_objeto} onChange={(e)=>setFormData({...formData, nao_havendo_complexidade_objeto: e.target.value})} 
                  placeholder="Ex: Baixa complexidade técnica ou operacional"/>
                </div>
              </div>
            )}
            {formData.descricao === 'nao' && (
              <div className='flex flex-col space-y-1'>
                <label htmlFor="nao_havendo_grande_vulto_da_contratacao" className='font-semibold'>2.5.3. Justificar ausência de grande vulto (se houver)</label>
                <div>
                  <input type="text" id='nao_havendo_grande_vulto_da_contratacao' className='border rounded-sm p-2 w-full' value={formData.nao_havendo_grande_vulto_da_contratacao} onChange={(e)=>setFormData({...formData, nao_havendo_grande_vulto_da_contratacao: e.target.value})} />
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
                <label htmlFor="nao_havendo_grande_vulto_da_contratacao" className='font-semibold'>2.6.1. Apresentar justificativa para a vedação de coperativa</label>
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
                <label htmlFor="justificativa_vedacao_pessoafisica" className='font-semibold'>2.7.1. Apresentar justificativa para a vedação de Pessoa Fisica</label>
                <div>
                  <input type="text" id='justificativa_vedacao_pessoafisica' className='border rounded-sm p-2 w-full' value={formData.justificativa_vedacao_pessoafisica} onChange={(e)=>setFormData({...formData,justificativa_vedacao_pessoafisica: e.target.value})} 

                  />
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
              {formData.qualTipoContratacao !== 'corporativo' && (
                <div className='flex flex-col'>
                  <label htmlFor="osServicosSeraoPrestadosNosSeguintesLocaisEHorarios" className="font-semibold">Os serviços serão prestados em locais e horários fixos?</label>
                  <textarea id='osServicosSeraoPrestadosNosSeguintesLocaisEHorarios' className='border rounded-sm p-2 w-full' value={formData.locaisEHorarios} onChange={(e)=>setFormData({...formData, locaisEHorarios: e.target.value})} />
                 
                </div>
              )}
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
                    <label htmlFor="quantas_empresas_serao_admitidas_consorcio" className="font-semibold">Qual é o prazo máximo para início da execução contratual?</label>
                    <input 
                      type="number" 
                      min={0}  
                      id='quantas_empresas_serao_admitidas_consorcio' 
                      className='border rounded-sm p-2 w-full' 
                      value={formData.prazoExecucaoDoContrato} 
                      onChange={(e) => {
                        const valor = e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value) || 0).toString();
                        setFormData({...formData, prazoExecucaoDoContrato: valor})
                      }} 
                    />
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
                  <p>3.2.3.Descrição detalhada:</p>
                  <textarea id='nao_havendo_grande_vulto_da_contratacao' className='border rounded-sm p-2 w-full' value={formData.descricaoDetalhadaMetodosExecucaoTrabalho} onChange={(e)=>setFormData({...formData, descricaoDetalhadaMetodosExecucaoTrabalho: e.target.value})} />
                </div>
            </FieldsetContainer>
            <FieldsetContainer titleLegend="3.2.4 Horário da prestação de serviço">
                <div className='flex flex-col space-y-1'>
                  <p>3.2.4. Qual o horário da prestação do serviço?</p>
                  <textarea id='horario_prestaca_servico' className='border rounded-sm p-2 w-full' value={formData.horarioPrestacaoServico} onChange={(e)=>setFormData({...formData, horarioPrestacaoServico: e.target.value})} />
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
            <FieldsetContainer titleLegend="3.2.7 O objeto será recebido (deve ser incluído, se cabível)">
              <CollapsibleText title="Orientações para preenchimento">
                    <p className="orientacoes">
                      (A Lei nº 14.133/21 não trouxe prazo máximo de recebimento provisório ou definitivo. Desse modo, recomenda-se que o prazo seja dimensionado para que corresponda ao período razoável à checagem necessária, sem que traga um ônus excessivo que venha a afastar potenciais interessados)
                    </p>
              </CollapsibleText>
                <div className='flex flex-col'>
                <label htmlFor="objetoSeraRecebido" className="font-semibold mb-1">Haverá topico específico para recebimento do objeto?</label>
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
                    label="Qual o prazo para o recebimento provisório?"
                    id="prazoRecebimentoDefinitivo" 
                    type="number"
                    min="0"
                    value={formData.prazoRecebimentoProvisorio}
                    onChange={(e) => {
                      const valor = e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value) || 0).toString();
                      setFormData({...formData, prazoRecebimentoProvisorio: valor})
                    }}
                  />
                  <InputComponent
                    label=" Qual o prazo para o recebimento definitivo?"
                    id="prazoRecebimentoDefinitivo"
                    type="number"
                    min="0"
                    value={formData.prazoRecebimentoDefinitivo}
                    onChange={(e) => {
                      const valor = e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value) || 0).toString();
                      setFormData({...formData, prazoRecebimentoDefinitivo: valor})
                    }}
                  />
                  <div className="flex flex-col mt-2">
                  <label htmlFor="recebimentoDefinitivoPoderaSerExcepcionalmente" className="font-semibold">Haverá possibilidade de prorrogação do recebimento definitivo?</label>
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
            <FieldsetContainer titleLegend="3.2.8 O termo detalhado do recebimento provisório">
               <div className="flex flex-col mt-2">
                  <label htmlFor="TermoDetalhadoDeRecebimentoProvisorio" className="font-semibold">Foi elaborado o IMR (Instrumento de Medição de Resultado) para auxiliar o recebimento definitivo?</label>
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
            {/* <FieldsetContainer titleLegend="3.2.10 Condições gerais e específicas para a prestação do serviço?">
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
            </FieldsetContainer> */}

            <FieldsetContainer titleLegend="3.3 Indicação de marcas ou modelos (se for o caso)">
              <CollapsibleText title="Orientações para preenchimento">
                <p className="orientacoes">
                  Embora a contratação seja de serviços, é possível que a Administração indique, de forma excepcional e devidamente justificada, marcas ou modelos de eventuais bens necessários à execução do objeto da contratação, observando as hipóteses previstas no art. 41, inciso I, da Lei nº 14.133/2021. 
                </p>
                <p className="orientacoes">
                  Exemplos de justificativas para indicação de marcas e/ou modelos: necessidade de padronização do objeto, compatibilidade com plataformas e padrões já adotados pela Administração, marca ou modelo comercializados por mais de um fornecedor forem os únicos capazes de atender às necessidades do contratante, quando a descrição do objeto a ser licitado puder ser mais bem compreendida pela identificação de determinada marca ou determinado modelo aptos a servir apenas como referência.
                </p>
              </CollapsibleText>
              
                {formData.eEstudosTecnicosPreliminares === 'sim' ? (
                  <div>
                    <div className="flex flex-col mt-2">
                      <label htmlFor="sera_admitida_indicacao" className="font-semibold">Quais marca(s), característica(s) ou modelo(s) serão admitidas nessa contratação?</label>
                      <input type="text" id='sera_admitida_indicacao' className='border rounded-sm p-2 w-full' value={formData.sera_admitida_indicacao} onChange={(e)=>setFormData({...formData, sera_admitida_indicacao: e.target.value})} />
                    </div>
                  </div>
                ):(
                  <div>
                    <div>
                      <div className="flex flex-col mt-2">
                        <label htmlFor="marcas_ou_modelos_indicadas" className="font-semibold">Quais marca(s) ou modelo(s) serão admitidos nessa contratação?</label>
                        <input type="text" id='marcas_ou_modelos_indicadas' className='border rounded-sm p-2 w-full' value={formData.marcas_ou_modelos_indicadas} onChange={(e)=>setFormData({...formData, marcas_ou_modelos_indicadas: e.target.value})} />
                      </div>
                      <div className="flex flex-col mt-2">
                        <label htmlFor="devido_a" className="font-semibold">Justificar com base no art. 41, inciso I, da Lei nº 14.133, de 2021</label>
                        <input type="text" id='devido_a' className='border rounded-sm p-2 w-full' value={formData.devido_a} onChange={(e)=>setFormData({...formData, devido_a: e.target.value})} 
                        placeholder="Ex: Necessidade de padronização do objeto, compatibilidade com plataformas e padrões já adotados pela Administração, marca ou modelo comercializados por mais de um fornecedor forem os únicos capazes de atender às necessidades do contratante, quando a descrição do objeto a ser licitado puder ser mais bem compreendida pela identificação de determinada marca ou determinado modelo aptos a servir apenas como referência."/>
                      </div>
                    </div>
                  </div>
                )}
            </FieldsetContainer>
            <FieldsetContainer titleLegend="3.4 Vedação de utilização de marca / produto na execução do serviço" explicacao="(Se for o caso)">
            <CollapsibleText title="Orientações para preenchimento">
                <p className="orientacoes">
                  Embora a contratação seja de serviços, é possível que a Administração vede o emprego de marca ou produto de bens empregados em sua execução, com base em experiência prévia, registrada em processo administrativo, quando restar comprovado que produtos adquiridos e utilizados anteriormente pela Administração não atendem a requisitos indispensáveis ao pleno adimplemento da obrigação contratual, conforme art. 41, III, da Lei nº 14.133, de 2021.
                </p>
            </CollapsibleText>
                <div className="flex flex-col mt-2">
                  <label htmlFor="preveIndicacaoMarcasOuModelos" className="font-semibold">Prevê vedação de marca(s) ou modelo(s)?</label>
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
                    label="Citar as marca(s)/ produto(s) que serão vedados para esta contratação)"
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
            {formData.orcamentoSigiloso === "sim" && (
              <CollapsibleText title="Orientações para preenchimento">
                <p className="orientacoes">
                  Na hipótese do orçamento sigiloso, não poderá haver prejuízo da divulgação do detalhamento dos quantitativos e das demais informações necessárias para a elaboração das propostas. Além disso, o sigilo não prevalecerá para os órgãos de controle interno e externo. Por fim, atentar que nas hipótese de licitação em que for adotado o critério de julgamento por maior desconto, o preço estimado ou o máximo aceitável constará do edital da licitação.
                </p>
              </CollapsibleText>
            )}
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
                      label="Justificar a vantagem de manter o sigilo do valor do objeto"
                      id="JustificarOrcamentoSigiloso"
                      type="text"
                      value={formData.justificativaOrcamentoSigiloso}
                      onChange={(e) => setFormData({...formData, justificativaOrcamentoSigiloso: e.target.value})}
                    />
            )}
          </FieldsetContainer>

          <FieldsetContainer titleLegend="4.2 Classificação Orçamentária da Despesa">
            <CollapsibleText title="Orientações">
              <ul className="orientacoes">
                <li>No caso de Registro de Preços, apenas o elemento de despesa é necessário para a classificação.</li>
                <li>Se não for registro de preços, informar: </li>
                <li>Fonte: </li>
                <li>Unidade:</li>
                <li>Programa:</li> 
                <li>Ação:</li>
                <li>Elemento de Despesa:</li> 
                <li>Categoria Econômica:</li>
              </ul>
            </CollapsibleText>
            <TextAreaComBotao
              label="Informar a classificação orçamentária da despesa no quadro abaixo"
              valorInicial={formData.elemento_de_despesa}
              onSalvar={(novoValor)=>{
                setFormData({...formData, elemento_de_despesa: novoValor})
              }}
              
            />
          </FieldsetContainer>

          

          <FieldsetContainer titleLegend="4.3 Justificativa para aplicação ou não do benefício (LC Nº 123/2006)">
            {/* <SelectComponent
              label="Haverá aplicação do benefício previsto na Lei Complementar Nº 123/2006?"
              onChange={(e)=> setFormData({...formData, aplicarCotaExclusiva: e.target.value})}
              value={formData.aplicarCotaExclusiva}
            >
              <option value="">Selecione uma opção</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </SelectComponent> */}
             
              <div className="flex gap-2">
              <input 
                type="checkbox" 
                id="aplicarCotaExclusica" 
                name="justificativaBeneficioLC123Opcao" 
                value="aplicar" 
                checked={formData.justificativaBeneficioLC123Opcao?.includes('aplicar') || false}
                onChange={()=> toggleOpcao("aplicar")}
              />
              <label htmlFor="aplicarCotaExclusica">Aplicar cota exclusiva (Itens/grupos até R$ 80.000,00)</label>
             </div>
             {formData.justificativaBeneficioLC123Opcao?.includes('aplicar') && (
              <InputComponent
                label=""
                id="itensLotesCotaExclusiva"
                value={formData.itensLotesCotaExclusiva}
                onChange={(e) => setFormData({...formData, itensLotesCotaExclusiva: e.target.value})}
                orientacoes="Citar quais itens ou lotes. Deixe em branco se forem todos."
              />
            )}
              <div className="flex gap-2">
              <input 
                type="checkbox" 
                id="nao_aplicar_sem_enquadramento" 
                name="justificativaBeneficioLC123Opcao" 
                value="nao_aplicar_sem_enquadramento"
                checked={formData.justificativaBeneficioLC123Opcao?.includes('nao_aplicar_sem_enquadramento') || false}
                onChange={()=> toggleOpcao("nao_aplicar_sem_enquadramento")} 
              />
              <label htmlFor="nao_aplicar_sem_enquadramento">Não aplicar (Não há itens/grupos até R$ 80.000,00)</label>
             </div>
             {formData.justificativaBeneficioLC123Opcao?.includes('nao_aplicar_sem_enquadramento') && (
              <InputComponent
                label=""
                id="nao_aplicar_sem_enquadramento_texto"
                value={formData.nao_aplicar_sem_enquadramento_texto}
                onChange={(e) => setFormData({...formData, nao_aplicar_sem_enquadramento_texto: e.target.value})}
                orientacoes="Citar quais itens ou lotes. Deixe em branco se forem todos."
              />
            )}
              <div className="flex gap-2">
                  <input 
                    type="checkbox" 
                    id="nao_aplicar_art_49" 
                    name="justificativaBeneficioLC123Opcao" 
                    value="nao_aplicar_art_49" 
                    checked={formData.justificativaBeneficioLC123Opcao?.includes('nao_aplicar_art_49') || false}
                    onChange={()=> toggleOpcao("nao_aplicar_art_49")} 
                  />
              <label htmlFor="nao_aplicar_art_49">Não aplicar (Exceção do art. 49 da LC 123/2006 e/ou  do art.9º do Decreto Estadual nº 45.140/2017)</label>
             </div>
              {formData.justificativaBeneficioLC123Opcao?.includes('nao_aplicar_art_49') && (
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
              <div className="flex gap-2">
              <input 
                type="checkbox" 
                id="nao_aplicar_art_4_lei_14133" 
                name="justificativaBeneficioLC123Opcao" 
                value="nao_aplicar_art_4_lei_14133" 
                checked={formData.justificativaBeneficioLC123Opcao?.includes('nao_aplicar_art_4_lei_14133') || false }
                onChange={()=> toggleOpcao("nao_aplicar_art_4_lei_14133")}
              />
              <label htmlFor="nao_aplicar_art_4_lei_14133">Não aplicar (Preço anual superior ao limite de EPP - art. 4º, § 1º, I, Lei nº 14.133/2021)</label>
             </div>

            

           

            {formData.justificativaBeneficioLC123Opcao?.includes('nao_aplicar_art_4_lei_14133') && (
               <InputComponent
                  label="Item(ns) OU lote(s) que superam o valor"
                  id="itensLotesNaoAplicacaoArt4"
                  value={formData.itensLotesNaoAplicacaoArt4}
                  onChange={(e) => setFormData({...formData, itensLotesNaoAplicacaoArt4: e.target.value})}
                />
            )}
              

          </FieldsetContainer>

        </FieldsetContainer>
        <FieldsetContainer titleLegend="5. DA LICITAÇÃO">
          <FieldsetContainer titleLegend="5.1 Modalidade, Critério de Julgamento, Regime de Execução e Modo de Disputa">
            <CollapsibleText title="Orientações">
              <ul className="orientacoes">
                <li>Este termo de referência regulamenta o rito procedimental comum das licitações a serem processadas pelo critério de julgamento de menor preço ou maior desconto, nas modalidades pregão e concorrência. Deste modo, não se aplica às concorrências com critério de julgamento de melhor técnica ou conteúdo artístico, de técnica e preço ou de maior retorno econômico.</li>
                <li>Os serviços especiais caracterizam-se por sua alta heterogeneidade ou complexidade e, por isso, não podem ser definidos objetivamente segundo especificações usuais de mercado (art. 6º, XIV, da Lei 14.133/2021). Nesse caso, a modalidade de licitação aplicável é a concorrência (art. 6º, XXXVIII, da Lei 14.133/2021) e, se o critério de julgamento escolhido na fase preparatória for o menor preço ou maior desconto, o rito procedimental segue a minuta padrão ora apresentada. </li>
                <li>Os serviços comuns, cujos padrões de desempenho e qualidade podem ser objetivamente definidos no edital por meio de especificações usuais de mercado (art. 6º,XIII, da Lei 14.133/2021), devem ser licitados obrigatoriamente mediante pregão, com os critérios de julgamento por menor preço ou maior desconto (art. 6º, XLI, da Lei 14.133/2021), seguindo o rito procedimental constante da minuta padrão ora  apresentada.</li>
              </ul>
            </CollapsibleText>
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
              orientacoes="A escolha do modo aberto-fechado é uma indicação descrita na Portaria SAD nº   2.293/2025. O órgão demandante pode alterar o modo de disputa conforme o caso concreto."
              id="modoDisputa"
              value={formData.modoDisputa}
              onChange={(e) => setFormData({...formData, modoDisputa: e.target.value})}
            >
              <option value="aberto_fechado">Aberto-Fechado (Padrão)</option>
              <option value="aberto">Aberto</option>
              <option value="fechado_aberto">Fechado-Aberto</option>
            </SelectComponent>

            <InputComponent
              label="Apresentar motivação para escolha da forma de combinação dos parâmetros, conforme exigência do art. 18, inciso VIII, da Lei nº 14.133/21 c/c art. 17, inciso XIII, do Decreto Estadual nº 53.384/2022) "
              id="motivacaoParametrosLicitacao"
              value={formData.motivacaoParametrosLicitacao}
              onChange={(e) => setFormData({...formData, motivacaoParametrosLicitacao: e.target.value})}
              
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
              {/* <CollapsibleText title="Orientações">
                <ul className="orientacoes">
                  <li>O Decreto Estadual nº 53.384/2022 dispõe que a Administração Pública poderá prever, excepcionalmente, a apresentação de amostra, exame de conformidade ou prova de conceito, entre outros testes de interesse da Administração, de modo a comprovar a aderência do objeto ofertado pelos licitantes às especificações definidas no termo de referência.Assim, em caso de necessidade justificada da exigência de algum desses testes, a redação exposta neste item deve ser adaptada para contemplar as suas especificidades do caso concreto, garantindo sempre os requisitos básicos contidos no § 2º, do art. 20, do Decreto Estadual nº 53.384/2022. </li>
                  <li>
                    Quanto ao momento da análise das amostras/exame de conformidade/prova de conceito/outros testes, o Decreto nº 53.384/2022 disciplina que poderá ser realizada durante o processamento da licitação, quando do julgamento das propostas; após a homologação, como condição para a assinatura do contrato; ou no período de vigência contratual ou da ata de registro de preços.
                  </li>
                </ul>
              </CollapsibleText> */}
            <InputComponent
              label="Prazo de Validade da Proposta (em dias)"
              id="prazoValidadePropostaDias"
              type="number"
              min={0}
              value={formData.prazoValidadePropostaDias}
              onChange={(e) => setFormData({...formData, prazoValidadePropostaDias: e.target.value})}
              orientacoes="A lei 14.133/21 não prescreve prazo mínimo, cabendo à Administração fixar esse prazo no termo de referência, de acordo com as peculiaridades da licitação."
            />

            <SelectComponent
              label="Haverá algum documento adicional a ser apresentado junto com a proposta?"
              id="requerCondicaoProposta"
              value={formData.requerCondicaoProposta}
              onChange={(e) => setFormData({...formData, requerCondicaoProposta: e.target.value})}
            >
              <option value="nao">Não</option>
              <option value="sim">Sim (Excepcional)</option>
            </SelectComponent>

            {formData.requerCondicaoProposta === 'sim' && (
              <>
                <InputComponent
                  label={`Quais o(s) ${formData.tipoParcelamentoNaoEtp === 'item'? "Item(ns)": "Grupo(s)"} que precisarão de documento(s) adicional(is)`}
                  id="condicoesProposta"
                  value={formData.requerCondicaoPropostaParaos}
                  onChange={(e) => setFormData({...formData, requerCondicaoPropostaParaos: e.target.value})}
                />
                <InputComponent
                  label="Quais documentos acompanham a proposta"
                  id="documentoQueAcompanhaProposta"
                  value={formData.requerCondicaoPropostaAcompanhadaDoSeguinteDocumento}
                  onChange={(e) => setFormData({...formData, requerCondicaoPropostaAcompanhadaDoSeguinteDocumento: e.target.value})}
                />
              </>
            )}

            <SelectComponent
              label="Haverá garantia de proposta?"
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
                  label="(Conforme disposto no artigo 58, 1º, da Lei Federal nº 14.133/2021, o percentual da garantia de proposta não poderá exceder 1% do valor estimado da licitação)"
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

            <FieldsetContainer
              titleLegend="5.2.4 DA PROVA DE CONCEITO"
            >
              <CollapsibleText 
                title="Orientações para preenchimento"
              >
                <p>
                  O Decreto Estadual nº 53.384/2022 dispõe que a Administração Pública poderá prever, excepcionalmente, a apresentação de amostra, exame de conformidade ou prova de conceito, entre outros testes de interesse da Administração, de modo a comprovar a aderência do objeto ofertado pelos licitantes às especificações definidas no termo de referência.Assim, em caso de necessidade justificada da exigência de algum desses testes, a redação exposta neste item deve ser adaptada para contemplar as suas especificidades do caso concreto, garantindo sempre os requisitos básicos contidos no § 2º, do art. 20, do Decreto Estadual nº 53.384/2022. 
                </p>
                <p>
                  Quanto ao momento da análise das amostras/exame de conformidade/prova de conceito/outros testes, o Decreto nº 53.384/2022 disciplina que poderá ser realizada durante o processamento da licitação, quando do julgamento das propostas; após a homologação, como condição para a assinatura do contrato; ou no período de vigência contratual ou da ata de registro de preços.
                </p>
                <p>
                  O presente tópico deve ter sua redação adaptada nos casos de exame de conformidade, amostra ou outros testes de interesse da administração.
                </p>
              </CollapsibleText>
              <div>

                <InputComponent
                  label="Justificativa para a prova de conceito"
                  id="justificativaAmostra"
                  value={formData.justificativaAmostra}
                  onChange={(e) => setFormData({...formData, justificativaAmostra: e.target.value})}
                  orientacoes="Explicitar as razões pelas quais as especificações técnicas não são suficientes para a compreensão do objeto."
                />

                <SelectComponent
                  label="É reputado razoável para as providências de realização da prova de conceito de interesse da?"
                  id="deInteresseDas"
                  value={formData.deInteresseDas}
                  onChange={(e) => setFormData({...formData, deInteresseDas: e.target.value})}
                >
                  <option value="">Selecione uma opção</option>
                  <option value="licitante">Licitante</option>
                  <option value="adjudicataria">Adjudicatária</option>
                  <option value="contratada">Contratada</option>
                  <option value="detentoraDaAtaDeRegistroDePrecos">Detentora da ata de registro de preços</option>
                </SelectComponent>

                <SelectComponent
                  label="Fase de Apresentação"
                  id="faseApresentacaoAmostra"
                  value={formData.faseApresentacaoAmostra}
                  onChange={(e) => setFormData({...formData, faseApresentacaoAmostra: e.target.value})}
                >
                  <option value="julgamento_proposta">Julgamento da Proposta</option>
                  <option value="apos_homologacao">Condição p/ Assinatura do contrato</option>
                  <option value="vigencia_contratual">Fase contratual</option>
                </SelectComponent>

                {
                  formData.faseApresentacaoAmostra === 'julgamento_proposta' && (
                     <InputComponent
                        label="Prazo para apresentação (dias úteis)"
                        id="prazoAmostraDiasUteis"
                        type="number"
                        min={0}
                        value={formData.prazoAmostraDiasUteis}
                        onChange={(e) => setFormData({...formData, prazoAmostraDiasUteis: e.target.value})}
                      />
                  )
                }

                {
                  formData.faseApresentacaoAmostra === 'vigencia_contratual' && (
                    <InputComponent
                      label="Prazo para apresentação das amostras (dias úteis)"
                      id="prazoAmostraDiasUteis"
                      value={formData.prazoAmostraDiasUteis}
                      onChange={(e) => setFormData({...formData, prazoAmostraDiasUteis: e.target.value})}
                  />
                  )
                }

                {
                  formData.faseApresentacaoAmostra === 'apos_homologacao' && (
                    <InputComponent
                      label="Prazo para apresentação das amostras (dias úteis)"
                      id="prazoAmostraDiasUteis"
                      type="number"
                      min={0}
                      value={formData.prazoAmostraDiasUteis}
                      onChange={(e) => setFormData({...formData, prazoAmostraDiasUteis: e.target.value})}
                    />
                  )
                }

                <InputComponent
                  label="Endereço para apresentação"
                  id="enderecoApresentacaoAmostra"
                  value={formData.enderecoApresentacaoAmostra}
                  onChange={(e) => setFormData({...formData, enderecoApresentacaoAmostra: e.target.value})}
                />
                 <InputComponent
                  label="Horário início da apresentação"
                  id="horarioApresentacaoAmostra"
                  type="time"
                  value={formData.horarioApresentacaoAmostra}
                  onChange={(e) => setFormData({...formData, horarioApresentacaoAmostra: e.target.value})}
                />
                <InputComponent
                  label="Horário termino da apresentação"
                  id="horarioTerminoApresentacaoAmostra"
                  type="time"
                  value={formData.horarioTerminoApresentacaoAmostra}
                  onChange={(e) => setFormData({...formData, horarioTerminoApresentacaoAmostra: e.target.value})}
                />

                <InputComponent
                  label="Telefone para agendamento"
                  id="telefoneParaAgendamento"
                  type="tel"
                  value={formData.telefoneParaAgendamento}
                  onChange={(e) => setFormData({...formData, telefoneParaAgendamento: e.target.value})}
                />

                <InputComponent
                  label="Email para agendamento"
                  id="emailParaAgendamento"
                  type="email"
                  value={formData.emailParaAgendamento}
                  onChange={(e) => setFormData({...formData, emailParaAgendamento: e.target.value})}
                />

                <InputComponent
                  label="A prova de conceito (especificar)"
                  id="aProvaDeConceito"
                  value={formData.aProvaDeConceito}
                  onChange={(e) => setFormData({...formData, aProvaDeConceito: e.target.value})}
                />

                <InputComponent
                  label="Duração da prova de conceito"
                  id="duracaoProvaConceitoDiasUteis"
                  type="number"
                  min={0}
                  value={formData.duracaoProvaConceitoDiasUteis}
                  onChange={(e) => setFormData({...formData, duracaoProvaConceitoDiasUteis: e.target.value})}
                />

                <TextAreaComBotao
                  label="A Prova de conceito consistira em"
                  valorInicial={formData.provaDeConceitoConsistiraEm}
                  onSalvar={(valor) => setFormData({...formData, provaDeConceitoConsistiraEm: valor})}
                />

                <InputComponent
                  label="Critérios para comprovação de atendimento"
                  id="comprovacaoAtendimentoPercentual"
                  value={formData.comprovacaoAtendimentoPercentual}
                  onChange={(e)=> setFormData({...formData, comprovacaoAtendimentoPercentual: e.target.value})}
                />

                <InputComponent
                  label="O setor responsável por examinar e avaliar a prova de conceito"
                  id="setorExaminadoreAvaliadorProvaConceito"
                  value={formData.setorExaminadoreAvaliadorProvaConceito}
                  onChange={(e)=> setFormData({...formData, setorExaminadoreAvaliadorProvaConceito: e.target.value})}
                />

                <InputComponent
                  label="Prazo para análise da prova de conceito (dias úteis)"
                  id="prazoAnaliseProvaConceitoDiasUteis"
                  value={formData.prazoAnaliseProvaConceitoDiasUteis}
                  onChange={(e) => setFormData({...formData, prazoAnaliseProvaConceitoDiasUteis: e.target.value})}
                />

                <InputComponent
                  label="Órgão/Entidade responsável pela prova de conceito"
                  id="orgaoEntidadeProvaConceito"
                  value={formData.orgaoEntidadeProvaConceito}
                  onChange={(e) => setFormData({...formData, orgaoEntidadeProvaConceito: e.target.value})}
                />

                <InputComponent
                  label="Percentual de comprovação de atendimento (%)"
                  id="comprovacaoAtendimentoPercentual"
                  type="number"
                  min={0}
                  value={formData.comprovacaoAtendimentoPercentual}
                  onChange={(e) => setFormData({...formData, comprovacaoAtendimentoPercentual: e.target.value})}
                />

                <InputComponent
                  label="Setor responsável pela avaliação"
                  id="setorExaminadoreAvaliadorProvaConceito"
                  value={formData.setorExaminadoreAvaliadorProvaConceito}
                  onChange={(e) => setFormData({...formData, setorExaminadoreAvaliadorProvaConceito: e.target.value})}
                />

                <InputComponent
                  label="Órgão/Entidade responsável pela avaliação"
                  id="orgaoEntidadeProvaConceito"
                  value={formData.orgaoEntidadeProvaConceito}
                  onChange={(e) => setFormData({...formData, orgaoEntidadeProvaConceito: e.target.value})}
                />

                <InputComponent
                  label="Prazo para análise da prova de conceito (dias úteis)"
                  id="prazoAnaliseProvaConceitoDiasUteis"
                  type="number"
                  min={0}
                  value={formData.prazoAnaliseProvaConceitoDiasUteis}
                  onChange={(e) => setFormData({...formData, prazoAnaliseProvaConceitoDiasUteis: e.target.value})}
                />
              </div>   
            </FieldsetContainer>           
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
                    label="Qual atividade sujeita à autorização?"
                    id="atividadeAutorizacaoJuridica"
                    value={formData.atividadeAutorizacaoJuridica}
                    onChange={(e) => setFormData({...formData, atividadeAutorizacaoJuridica: e.target.value})}
                  />
                   <InputComponent
                    label="Citar o órgão competente"
                    id="orgaoAutorizacaoJuridica"
                    value={formData.orgaoAutorizacaoJuridica}
                    onChange={(e) => setFormData({...formData, orgaoAutorizacaoJuridica: e.target.value})}
                  />
                   <InputComponent
                    label="Informar a legislação (Lei, Decreto, etc e os respectivos artigos)"
                    id="numeroLeiAutorizacaoJuridica"
                    value={formData.numeroLeiAutorizacaoJuridica}
                    onChange={(e) => setFormData({...formData, numeroLeiAutorizacaoJuridica: e.target.value})}
                  />
                </div>
              )}
            </FieldsetContainer>

            <FieldsetContainer titleLegend="Qualificação Técnica" classNameFieldset="border-gray-400 mt-4">
              <CollapsibleText title="Orientações para preenchimento">
                <ul className="orientacoes list-disc list-inside">
                  <li>De acordo com a natureza ou o vulto da contratação, o órgão licitante, mediante justificativa prévia neste TR, indicará o rol de documentos a serem apresentados dentre os previstos no art. 67 da Lei federal nº 14.133/2021. </li>
                  <li>Não obstante, serão fornecidas no Edital padrão as redações mais comuns para os requisitos de qualificação técnica corriqueiros. A conveniência e oportunidade de solicitá-los devem ser analisadas pelo demandante no caso concreto, considerando, inclusive, a natureza do objeto contratual. </li>
                  <li>
                    Se for o caso de exigir a experiência prévia, limitá-la ao estritamente necessário, atentando, ainda, para a impossibilidade de requerer a comprovação de fornecimento prévio de objeto idêntico ao licitado.
                  </li>
                </ul>
              </CollapsibleText>
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
                  orientacoes="Tal exigência só deve ser formulada quando, por determinação legal, o exercício de determinada atividade afeta ao objeto contratual esteja sujeita à fiscalização da entidade profissional competente, a ser indicada expressamente no dispositivo. Quando não existir determinação legal atrelando o exercício de determinada atividade ao correspondente conselho de fiscalização profissional, a exigência de registro ou inscrição, para fim de habilitação, torna-se inaplicável. Nessas situações, o referido subitem deve ser excluído."
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
                label="Haverá comprovação atraves do capital social ou patrimônio líquido?"
                id="habilitacaoEconomicaPor"
                value={formData.habilitacaoEconomicaPor}
                onChange={(e) => setFormData({...formData, habilitacaoEconomicaPor: e.target.value})}
              >
                <option value="">Não</option>
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
          label="informar os inciso(s) do Decreto nº 54.700/2023"
          id="incisoDecreto54700"
          value={formData.incisoDecreto54700}
          onChange={(e) => setFormData({...formData, incisoDecreto54700: e.target.value})}
          orientacoes="Com o advento do Decreto nº 54.700/2023, as hipóteses de uso do registro de preços foram ampliadas, podendo encontrar seu fundamento em um ou mais incisos ou no próprio caput do art. 3º do citado diploma"
        />
        <InputComponent
          label="Apresentar argumentos que justifiquem a aplicação das disposições legais ao caso concreto"
          id="justificativaUsoSrp"
          value={formData.justificativaUsoSrp}
          onChange={(e) => setFormData({...formData, justificativaUsoSrp: e.target.value})}

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
          label=""
          id="texto_orgaos_participantes_tipo"
          value={formData.texto_orgaos_participantes_tipo}
          onChange={(e) => setFormData({...formData, texto_orgaos_participantes_tipo: e.target.value})}
        >
          <option value="">Selecione uma opção</option>
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
          min={0}
          value={formData.prazoAssinaturaArpDiasUteis}
          onChange={(e) => setFormData({...formData, prazoAssinaturaArpDiasUteis: e.target.value})}
        />
      </FieldsetContainer>
      
      <FieldsetContainer titleLegend="6.6 Contratação individual de itens registrados em grupo(s)">
        <CollapsibleText title="Orientações">
        <ul className="orientacoes list-disc ml-2">
          <li>A possibilidade decontratação de itens individuais registrados em lotes é assegurada para qualquer ata de registro de preços conforme § 2º, do art. 13, do Decreto nº 54.700/2023, desde que, no momento do consumo/adesão/contratação, seja comprovada a sua vantajosidade, mediante prévia pesquisa de mercado ou demonstração de que o deságio obtido no valor do item é igual ou superior ao do lote globalmente considerado. </li>
          <li>
            Conforme § 3º do citado dispositivo legal, nos caso de atas de registro de preços corporativas e nas atas que centralizem demandas de unidades administrativas diversas vinculadas a mesma unidade gestora, a contratação de itens individuais registrados em lotes pode ser realizada dispensando a citada pesquisa de preço ou a demonstração de deságio de que trata o § 2º mencionado acima, desde que o edital preveja tal possibilidade com base em justificativas técnicas, econômicas ou gerenciais explicitadas no termo de referência. 
          </li>
        </ul>
        </CollapsibleText>
        <SelectComponent
          label="Permitir contratação individual de itens dentro do grupo?"
          id="permiteContratacaoIndividualItemLote"
          value={formData.permiteContratacaoIndividualItemLote}
          onChange={(e) => setFormData({...formData, permiteContratacaoIndividualItemLote: e.target.value})}
        >
          <option value="nao">Não </option>
          <option value="sim">Sim </option>
        </SelectComponent>
        {formData.permiteContratacaoIndividualItemLote === 'sim' && (
          <InputComponent
            label="Expor argumentos para a justificativa (técnica, econômica e/ou gerencial)"
            id="justificativaContratacaoIndividualItemLote"
            value={formData.justificativaContratacaoIndividualItemLote}
            onChange={(e) => setFormData({...formData, justificativaContratacaoIndividualItemLote: e.target.value})}
          />
        )}
      </FieldsetContainer>

      <FieldsetContainer titleLegend="6.7. PREVISÃO E JUSTIFICATIVA DA POSSIBILIDADE DE ADESÃO POR ÓRGÃOS E ENTIDADES NÃO PARTICIPANTES E CONDIÇÕES DE ADESÃO">
        <SelectComponent
          label="Permite adesão de órgão(s) / entidade(s) não participantes?"
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
                  orientacoes="Observar o máximo legal permitido"
                  id="limiteAdesaoCadaOrgao"
                  type="number"
                  min={0}
                  value={formData.limiteAdesaoCadaOrgao}
                  onChange={(e) => setFormData({...formData, limiteAdesaoCadaOrgao: e.target.value})}
                />
                <InputComponent
                  label="A soma de todas as adesões"
                  orientacoes="Observar o máximo legal permitido"
                  id="limiteAdesaoTotal"
                  type="text"
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
          label="Há obrigações especificas além das padronizadas na minuta da ata de registro de preços(PGE)?"
          id="obrigacoesGerenciadoraIncluirExtras"
          value={formData.obrigacoesGerenciadoraIncluirExtras}
          onChange={(e) => setFormData({...formData, obrigacoesGerenciadoraIncluirExtras: e.target.value})}
        >
          <option value="nao">Não</option>
          <option value="sim">Sim</option>
        </SelectComponent>
        {formData.obrigacoesGerenciadoraIncluirExtras === 'sim' && (
           <TextAreaComBotao
              label="Citar as obrigações"
              valorInicial={formData.obrigacoesGerenciadoraExtras}
              onSalvar={(novoValor)=>{
                setFormData({...formData, obrigacoesGerenciadoraExtras: novoValor})
              }}
            />
        )}
      </FieldsetContainer>

      <FieldsetContainer titleLegend="6.10 Obrigações da Detentora da ATA">
        <SelectComponent
          label="Há outras obrigações além das padronizadas na minuta da ata de registro de preços(PGE) ?"
          id="obrigacoesDetentoraIncluirExtras"
          value={formData.obrigacoesDetentoraIncluirExtras}
          onChange={(e) => setFormData({...formData, obrigacoesDetentoraIncluirExtras: e.target.value})}
        >
          <option value="nao">Não</option>
          <option value="sim">Sim</option>
        </SelectComponent>
        {formData.obrigacoesDetentoraIncluirExtras === 'sim' && (
           <ListaDeStringsEditavel
            titulo="Citar as obrigações"
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
      min={0}
      value={formData.prazoAssinaturaContratoDiasUteis}
      onChange={(e) => setFormData({...formData, prazoAssinaturaContratoDiasUteis: e.target.value})}
      orientacoes="Prazo padrão: 5 dias úteis."
    />
  </FieldsetContainer>

  <FieldsetContainer titleLegend="7.3 Requisitos da Contratação">
  <div className="space-y-2">
    {/* 7.3.1 */}
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={formData.requerCartaSolidariedade === 'sim'}
        onChange={() =>
          setFormData({
            ...formData,
            requerCartaSolidariedade: formData.requerCartaSolidariedade === 'sim' ? 'nao' : 'sim'
          })
        }
      />
      <span>Incluir 7.3 Requisitos da contratação</span>
    </label>
    {formData.requerCartaSolidariedade === 'sim' && (
      <TextAreaComBotao
        label="Texto da cláusula 7.3.1"
        valorInicial={formData.texto_carta_solidariedade}
        onSalvar={(v) => setFormData({ ...formData, texto_carta_solidariedade: v })}
      />
    )}
    <label className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={formData.requerRequisitosSustentabilidade === 'sim'}
      onChange={() =>
        setFormData({
          ...formData,
          requerRequisitosSustentabilidade:
            formData.requerRequisitosSustentabilidade === 'sim' ? 'nao' : 'sim'
        })
      }
    />
    <span>Incluir 7.3.2</span>
  </label>
  {formData.requerRequisitosSustentabilidade === 'sim' && (
      <TextAreaComBotao
        label="Texto da cláusula 7.3.2"
        valorInicial={formData.texto_requisitos_sustentabilidade}
        onSalvar={(v) => setFormData({ ...formData, texto_requisitos_sustentabilidade: v })}
      />  
  )}

    {/* 7.3.3 */}
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={formData.requerClausula73_3 === 'sim'}
        onChange={() =>
          setFormData({
            ...formData,
            requerClausula73_3: formData.requerClausula73_3 === 'sim' ? 'nao' : 'sim'
          })
        }
      />
      <span>Incluir 7.3.3 Da exigência de Carta de Solidariedade</span>
    </label>
    {formData.requerClausula73_3 === 'sim' && (
      <TextAreaComBotao
        label="Texto da cláusula 7.3.3"
        valorInicial={formData.texto_73_3}
        onSalvar={(v) => setFormData({ ...formData, texto_73_3: v })}
      />
    )}

    {/* 7.3.4 */}
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={formData.requerClausula73_4 === 'sim'}
        onChange={() =>
          setFormData({
            ...formData,
            requerClausula73_4: formData.requerClausula73_4 === 'sim' ? 'nao' : 'sim'
          })
        }
      />
      <span>Incluir 7.3.4 Requisitos de sustentabilidade</span>
    </label>
    {formData.requerClausula73_4 === 'sim' && (
      <TextAreaComBotao
        label="Texto da cláusula 7.3.4"
        valorInicial={formData.texto_73_4}
        onSalvar={(v) => setFormData({ ...formData, texto_73_4: v })}
      />
    )}
  </div>
</FieldsetContainer>

  <FieldsetContainer titleLegend="7.4 Obrigações da Contratante">
    <SelectComponent
      label="Usar redação padronizada?"
      id="obrigacoesContratantedaUsarPadrao"
      value={formData.obrigacoesContratanteUsarPadrao}
      onChange={(e) => setFormData({...formData, obrigacoesContratanteUsarPadrao: e.target.value})}
    >
      <option value="">Selecione uma opção</option>
      <option value="sim">Sim</option>
      <option value="nao">Não (Usar texto personalizado)</option>
    </SelectComponent>
    
    {formData.obrigacoesContratanteUsarPadrao === 'nao' && (
      <TextAreaComBotao
        label="Obrigações Extras da Contratante"
        valorInicial={formData.obrigacoesContratanteIncluirExtras}
        onSalvar={(novoValor)=>{
          setFormData({...formData, obrigacoesContratanteIncluirExtras: novoValor})
        }}
      />
    )}
  </FieldsetContainer>

  <FieldsetContainer titleLegend="7.5 Obrigações da Contratada">

    <SelectComponent
      label="Usar redação padronizada?"
      id="obrigacoesContratadaIncluirExtras"
      value={formData.obrigacoesContratadaIncluirExtras}
      onChange={(e) => setFormData({...formData, obrigacoesContratadaIncluirExtras: e.target.value})}
    >
      <option value="">Selecone uma opção</option>
      <option value="nao">Não</option>
      <option value="sim">Sim</option>
    </SelectComponent>

    {formData.obrigacoesContratadaIncluirExtras === 'nao' && (
      <TextAreaComBotao
        label="Obrigações Extras da Contratada"
        valorInicial={formData.obrigacoesContratadaExtras}
        onSalvar={(novoValor)=>{
          setFormData({...formData, obrigacoesContratadaExtras: novoValor})
        }}
        placeholder="Descreva a obrigação"
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
    {formData.preveGarantiaContratual === 'nao' && formData.eEstudosTecnicosPreliminares === 'nao' && (
      <InputComponent
        label="Justificativa da não-exigência"
        id="justificativaNaoGarantia"
        value={formData.justificativaNaoGarantia}
        onChange={(e) => setFormData({...formData, justificativaNaoGarantia: e.target.value})}
      />
    ) 
    }
    {formData.preveGarantiaContratual === 'sim' &&(
      <InputComponent
        label="Percentual de Garantia (1 a 10%)"
        id="percentualGarantiaContratual"
        type="number"
        min="1" max="10"
        value={formData.percentualGarantiaContratual}
        onChange={(e) => setFormData({...formData, percentualGarantiaContratual: e.target.value})}
      />
    )
    }
  </FieldsetContainer>

  <FieldsetContainer titleLegend="7.7 Subcontratação">
    <SelectComponent
      label="Permite Subcontratação?"
      id="permiteSubcontratacao"
      value={formData.permiteSubcontratacao}
      onChange={(e) => setFormData({...formData, permiteSubcontratacao: e.target.value})}
    >
      <option value="">Selecione uma opção</option>
      <option value="nao">Não</option>
      <option value="sim">Sim</option>
    </SelectComponent>

    {formData.permiteSubcontratacao === 'sim' && (
      <SelectComponent
        label="Qual será a subcontratação?"
        id="qualsubcontratacao"
        value={formData.qualsubcontratacao}
        onChange={(e) => setFormData({...formData, qualsubcontratacao: e.target.value})}
      >
        <option value="">Selecione uma opção</option>
        <option value="sim_acessorias">Parcelas acessórias</option>
        <option value="sim_tecnicos">Aspectos técnicos específicos</option>
        <option value="ambas_tecnicos_e_acessorias">Ambas opções</option>
      </SelectComponent>
    )}

    {formData.permiteSubcontratacao === 'nao' && (
       <InputComponent
        label="Justificativa da Vedação"
        id="justificativaNaoSubcontratacao"
        value={formData.justificativaNaoSubcontratacao}
        onChange={(e) => setFormData({...formData, justificativaNaoSubcontratacao: e.target.value})}
      />
    )}
    {formData.qualsubcontratacao === 'sim_acessorias' && (
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
          min={0}
          value={formData.percentualLimiteSubcontratacaoAcessorias}
          onChange={(e) => setFormData({...formData, percentualLimiteSubcontratacaoAcessorias: e.target.value})}
        />
      </div>
    )}
    {formData.qualsubcontratacao === 'ambas_tecnicos_e_acessorias' && (
      <div>
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
          min={0}
          value={formData.percentualLimiteSubcontratacaoTecnicos}
          onChange={(e) => setFormData({...formData, percentualLimiteSubcontratacaoTecnicos: e.target.value})}
        />
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
          min={0}
          value={formData.percentualLimiteSubcontratacaoAcessorias}
          onChange={(e) => setFormData({...formData, percentualLimiteSubcontratacaoAcessorias: e.target.value})}
        />
      </div>
    )}

    {formData.qualsubcontratacao === 'sim_tecnicos' && (
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
          min={0}
          max="25"
          value={formData.percentualLimiteSubcontratacaoTecnicos}
          onChange={(e) => setFormData({...formData, percentualLimiteSubcontratacaoTecnicos: e.target.value})}
        />
      </div>
    )}
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
            <option value="sim">Sim</option>
          </SelectComponent>

          {formData.preverAntecipacaoPagamento === 'sim' && (
            <div>
              <InputComponent
                label="Valor total antecipado"
                id="valorAntecipacaoPagamento"
                value={formData.valorAntecipacaoPagamento}
                onChange={(e) => setFormData({...formData, valorAntecipacaoPagamento: e.target.value})}
              />
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
                min={0}
                value={formData.prazoAntecipacaoPagamento}
                onChange={(e) => setFormData({...formData, prazoAntecipacaoPagamento: e.target.value})}
              />
              <InputComponent
                label="Contados do recebimento do?"
                id="contadosDoRecebimento"
                type="text"
                value={formData.contadosDoRecebimento}
                onChange={(e) => setFormData({...formData, contadosDoRecebimento: e.target.value})}
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
                  min={0}
                  value={formData.percentualGarantiaAdicionalAntecipacao}
                  onChange={(e) => setFormData({...formData, percentualGarantiaAdicionalAntecipacao: e.target.value})}
                />
              )}
              
                <SelectComponent
                label="Prever antecipação parcial de pagamento?"
                id="antecipacaoParcialDePagamento"
                value={formData.antecipacaoParcialDePagamento}
                onChange={(e) => setFormData({...formData, antecipacaoParcialDePagamento: e.target.value})}
                        >
                <option value="nao">Não (Padrão)</option>
                <option value="sim">Sim</option>
              </SelectComponent>
              
              {formData.antecipacaoParcialDePagamento === 'sim' && (
                <div>
                  <InputComponent
                  label="Etapa(s) ou Item(ns) para antecipação"
                  id="etapasItensAntecipacaoParcial"
                  value={formData.etapasItensAntecipacaoParcial}
                  onChange={(e) => setFormData({...formData, etapasItensAntecipacaoParcial: e.target.value})}
                />
                <InputComponent
                  label="Quais os respectivos itens?"
                  id="quaisRespectivosItens"
                  value={formData.quaisRespectivosItens}
                  onChange={(e) => setFormData({...formData, quaisRespectivosItens: e.target.value})}
                />
                </div>
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
                min={0}
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
          <SelectComponent
            label="Haverá demais condições necessárias para à Execução do serviço?"
            id="demaisCondicoesIncluir"
            value={formData.demaisCondicoesIncluir}
            onChange={(e) => setFormData({...formData, demaisCondicoesIncluir: e.target.value})}
          >
            <option value="">Selecione uma opção</option>
            <option value="sim">sim</option>
            <option value="nao">não</option>
          </SelectComponent>
          {formData.demaisCondicoesIncluir === 'sim' && (
            <InputComponent
            label="Demais condições necessárias"
            id="demaisCondicoes"
            value={formData.demaisCondicoes}
            onChange={(e) => setFormData({...formData, demaisCondicoes: e.target.value})}
            orientacoes="Incluir cláusulas sobre direitos autorais, sigilo, segurança de dados, etc."
          />
          )}
        </FieldsetContainer>
        <FieldsetContainer
          titleLegend="Anexos Adicionais"
        >
          <GestaoOutrosAnexos
            anexos={formData.outrosAnexos}
            setFormData={setFormData}
          />
        </FieldsetContainer>
  </div>
  )
}
