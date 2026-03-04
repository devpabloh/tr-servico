
import {useState} from 'react' 
import { Modal } from './components/Modal';
import { ConteudoDocumento } from './components/ConteudoDocumento';
import { Formulario } from './components/Formulario';
import type { 
  Item, 
  Grupo, 
  ClassificacaoOrcamentaria, 
  AtorGestaoContrato, 
  OutroAnexo, 
  FormDataCompleto 
} from './types/types';


  const defaultFormData = {
    // 1.1 Formação de registro de preço
    eRegistroPreco: "",
    sim_texto_e_registro_preco: "1.1 Formação de registro de preços {qualTipoContratacao} para contratação eventual de prestação de serviços de (TIPO DE SERVIÇO VAI VIR DO HOME), visando atender as necessidades do(a) (VEM DO HOME, NOME DO ORGÃO OU ENTIDADE SOLICITANTE),conforme as condições, especificações, quantidades e exigências contidas {eEstudosTecnicosPreliminares} e neste Termo de Referência.",

    sim_texto_registro_preco_simples: "1.1 Formação de registro de preços para contratação eventual de prestação de serviços de (TIPO DE SERVIÇO VAI VIR DO HOME), visando atender as necessidades do(a) {visandoAtenderNecessidades},conforme as condições, especificações, quantidades e exigências contidas {eEstudosTecnicosPreliminares} e neste Termo de Referência.",

    sim_texto_registro_preco_unificado_saude: "1.1 Formação de registro de preços {qualTipoContratacao} para contratação eventual de prestação de serviços de (TIPO DE SERVIÇO VAI VIR DO HOME), visando atender as necessidades de todas as unidades vinculadas à pasta integrantes do Poder Executivo do Estado de Pernambuco, conforme as condições, especificações, quantidades e exigências contidas {eEstudosTecnicosPreliminares} e neste Termo de Referência.",

    sim_texto_registro_preco_corporativo: "1.1 Formação de registro de preços corporativo para contratação eventual de prestação de serviços de (TIPO DE SERVIÇO VAI VIR DO HOME), visando atender as necessidades dos órgãos da Administração Direta, Fundos Especiais, Autarquias e Fundações Públicas integrantes do Poder Executivo do Estado de Pernambuco, conforme as condições, especificações, quantidades e exigências contidas no Estudo Técnico Prelimina e neste Termo de Referência.",
    sim_texto_registro_preco_corporativo_e_havera_reducao_escopo: "1.1 Formação de registro de preços corporativo para contratação eventual de prestação de serviços de (TIPO DE SERVIÇO VAI VIR DO HOME), visando atender as necessidades dos {quaisOrgaosOuEntidades}, conforme as condições, especificações, quantidades e exigências contidas no Estudo Técnico Prelimina e neste Termo de Referência.",

    nao_texto_e_registro_preco: "1.1 Contratação de prestação de serviços de (TIPO DE SERVIÇO VAI VIR DO HOME), visando atender as necessidades do(a) {visandoAtenderNecessidades} conforme as condições, especificações, quantidades e exigências contidas {eEstudosTecnicosPreliminares} neste Termo de Referência.",
    paraContratacaoEventualPrestacaoServico: "",
    visandoAtenderNecessidades: "",
    eEstudosTecnicosPreliminares:"",
    seCoperativa:"1.2 O escopo de participantes da Ata Corporativa proveniente da presente contratação teve por base o permissivo legal do art. 45, do Decreto Estadual nº 54.700/2023 e se justifica no caso concreto, uma vez que {justificaCasoConcretoUmaVezQue}.",
    justificaCasoConcretoUmaVezQue: "",
    qualTipoContratacao: "",
    objetoDestaLicitacaoEstaoDivididos: "",
    texto_objetoDestaLicitacaoEstaoDivididos:"1.3 As especificações e os quantitativos do objeto desta licitação estão divididos por {objetoDestaLicitacaoEstaoDivididos} e descritos conforme quadro(s) constante no anexo E.",
    emCasoDiscordanciaExistenteTermoECatser:"1.4 Em caso de discordância existente entre as especificações do objeto descritas no E-fisco/Termo de Referência e no CATSER, prevalecerá a descrição do E-fisco/Termo de Referência.",
    existEtpOuInformacaoPresenteExtratoSigiloso: "",
    itemEtpEstudosTecnicos: "",
    texto_sim_existEtpOuInformacaoPresenteExtratoSigiloso: "2.1.1 A Justificativa e objetivo da contratação encontram-se pormenorizadas em tópico específico do Estudo Técnico Preliminar, anexo deste Termo de Referência.",
    texto_nao_existEtpOuInformacaoPresenteExtratoSigiloso: "2.1.1 A presente contratação se dará em função da necessidade dos serviços de (A INFORMAÇÃO VEM DO HOME), os quais são essenciais para o desempenho das atribuições funcionais do(a) (VEM DO HOME, NOME DO ORGÃO OU ENTIDADE SOLICITANTE), uma vez que {umaVezQueAtribuicoesFuncionais}, de acordo com as especificações e quantidades constantes neste Termo de Referência.",
    texto_nao_existEtpOuInformacaoPresenteExtratoSigilosoItemDois: "Informe-se, por oportuno, que tal objeto atenderá o dever legal exposto no __________________________, que determina _______________________________________________________________.",
    atenderaDeverLegalExposto: "",
    presenteContratacaoNecessidadeServicos: "",
    desempenhoAtribuicoesFuncionais: "",
    umaVezQueAtribuicoesFuncionais: "",
    deverLegalExposto: "",
    queDeterminaDispositivoLegalCitado: "",
    existEtpOuInformacaoPresenteExtratoSigilosoItemDois:"",
    osQuantitativosPrecistoDefinidosNoDocumento:"",
    fundamentadoEm:"",
    texto_sim_justificativa_quantitativo: "2.2.1 A Justificativa para o quantitativo necessário ao atendimento da necessidade pública encontra-se pormenorizada em tópico específico do Estudo Técnico Preliminar, anexo deste Termo de Referência.",
    itemEtpQuantitativo: "",
    texto_nao_justificativa_quantitativo: "2.2.1 Os quantitativos previstos no presente Termo de Referência está fundamentado em {fundamentadoEm}, conforme os cálculos apresentados a seguir:",
    texto_nao_justificativa_quantitativo_textoDois: " Os quantitativos previstos no presente Termo de Referência foram definidos no documento _______.",
    // 2.3.1
    existEtpOuInformacaoPresenteExtratoSigilosoItemDois_tres: "",
    texto_sim_justificativa_solucao: "2.3.1 A Justificativa da escolha da solução a ser licitada encontra-se pormenorizada em tópico específico do Estudo Técnico Preliminar, anexo deste Termo de Referência.",
    itemEtpJustificativaSolucao: "",
    texto_nao_justificativa_solucao: "2.3.1 Visando atender à necessidade pública do demandante já exposta no item acima, uma vez que se mostra como essencial para o desenvolvimento de suas atividades, a Administração Pública optou por contratar o serviço em tela, uma vez que {justificativaEscolhaSolucaoNaoEtp}",
    justificativaEscolhaSolucaoNaoEtp: "",

    // 2.4.1
    justificativaParcelamentoEtp: "", // 'sim' ou 'nao' (para ETP)
    texto_sim_justificativa_parcelamento: "2.4.1 A Justificativa para o parcelamento OU para o não parcelamento do objeto encontra-se pormenorizada em tópico específico do Estudo Técnico Preliminar, anexo deste Termo de Referência, de modo a permitir a ampliação da competitividade, diante das particularidades do caso concreto.",
    itemEtpJustificativaParcelamento: "",
    
    tipoParcelamentoNaoEtp: "lote",
    
    // Textos para 'nao' ETP -> 'item'
    texto_nao_parcelamento_item_p1: "2.4.1 A regra a ser observada pela Administração nas licitações é a do parcelamento do objeto quando, no caso concreto, a divisão for tecnicamente viável e economicamente vantajosa, de modo a ampliar a competição e evitar a concentração de mercado. (Art. 47, inciso II combinado com §1º do mesmo artigo, da Lei 14.1333/2021).",
    texto_nao_parcelamento_item_p2: "2.4.2 Na presente contratação, resta demonstrado que o parcelamento por item(ns) buscou permitir a participação de maior número de interessados, fomentando, assim, o princípio da ampla concorrência.",
    texto_nao_parcelamento_item_p3: "2.4.3 A(s) razão(ões) técnica(s) e/ou econômica(s) para a preservação do objeto parcelado por item(ns) foram {razoesParcelamentoItem}.",
    razoesParcelamentoItem: "",
    texto_nao_parcelamento_item_p4: "2.4.4 Conclui-se, portanto, que o modelo definido para esta contratação é o mais adequado tanto técnica quanto economicamente, sem restringir ou prejudicar a competitividade do certame e, consequentemente, o mais adequado para promover a maior vantajosidade para o Estado.",
    
    // Textos para 'nao' ETP -> 'lote'
    texto_nao_parcelamento_lote_p1: "2.4.1 Neste caso em concreto, em virtude da natureza do serviço a ser contratado, a opção pelo agrupamento dos itens em grupo(s) é a mais vantajosa para a Administração, uma vez que {justificativaAgrupamentoLote}.",
    justificativaAgrupamentoLote: "",
    texto_nao_parcelamento_lote_p2: "2.4.2 Conclui-se, portanto, que o modelo definido para esta contratação é o mais adequado tanto técnica, quanto economicamente, sem restringir ou prejudicar a competitividade do certame e, consequentemente, o mais propício para promover maior vantajosidade para o Estado.",

    // Textos para 'lotes espelhados' (add-on)
    usaLotesEspelhados: "", // 'sim' ou 'nao'
    texto_lotes_espelhados_p1: "2.4.3 Por fim, o objeto da licitação está disposto em itens/grupos idênticos, diante do vulto da contratação, a fim de ampliar ainda mais a competitividade do certame.",
    texto_lotes_espelhados_p2: "2.4.4 Ressalte-se que {argumentosLotesEspelhados}",
    argumentosLotesEspelhados: "",
    texto_lotes_espelhados_p3: "2.4.5 Dessa forma, entende-se que a licitação está disposta com vistas ao melhor aproveitamento dos recursos disponíveis no mercado e à ampliação da competitividade, sem perda da economia de escala.",
    reducaoEscopo: "",

    descricao: 'sim',
    numeroConsorciadas: '',
    justificativa: '',
    nao_havendo_complexidade_objeto: '',
    nao_havendo_grande_vulto_da_contratacao: '',
    texto_sim: "2.5.1 No caso vertente, é permitida a participação de empresas sob a forma de consórcio, na forma do art. 15, da Lei nº 14.133/2021.",
    texto_sim_limitado_p1: "2.5.1 No caso vertente, é permitida a participação de empresas sob a forma de consórcio, na forma do art. 15, da Lei nº 14.133/2021.",
    texto_sim_limitado_p2: "2.5.2 O número máximo de empresas admitidas em cada consórcio será de {numStr} ({extensoStr}), uma vez que {justificativa}.",
    texto_nao_p1: "2.5.1. De acordo com o art. 15 da Lei nº 14.133/2021, a participação de empresas reunidas em consórcio poderá ser vedada, segundo discricionariedade da Administração, com base em justificativa técnica que leve em consideração as peculiaridades do caso concreto.",
    texto_nao_p2: "2.5.2 Assim, não poderá participar desta licitação consórcio de empresa, qualquer que seja sua forma de constituição, visto que não se faz necessária a conjugação de esforços para a prestação do presente serviço.",
    texto_nao_p3: "2.5.3. Além disso, no caso vertente, não se faz presente a premissa da complexidade do objeto, uma vez que {nao_havendo_complexidade_objeto}. E ainda não está presente o grande vulto da contratação, pois {nao_havendo_grande_vulto_da_contratacao}.",
    texto_nao_p4: "2.5.4.Por todo o exposto, conclui-se que a vedação da participação de empresas sob a forma de consórcio é a medida que melhor atende o interesse público, por prestigiar os princípios da competitividade, economicidade e moralidade. ",
    vedacaoOuParticipacaoCooperativa: "sim",
    vedacaoParticipacaoCooperativaNao: "2.6.1 É vedada a participação de profissionais organizados em cooperativas na presente licitação, uma vez que {justificativa_vedacao}.",
    permitidaParticipacaoCooperativaSim: "2.6.1 É permitida a participação de profissionais organizados em cooperativas, na forma do disposto no art. 16, da Lei nº 14.133/2021, na presente licitação.",
    vedacaoParticipacaoPessoaFisicaSim: "2.7.1 É permitida a participação de pessoas físicas na presente licitação.",
    vedacaoParticipacaoPessoaFisicaNao: "2.7.1 É vedada a participação de pessoas físicas na presente licitação, uma vez que {justificativa_vedacao_pessoafisica}.",
    vedacaoOuParticipacaoPessoasFisicas: "sim",
    justificativa_vedacao_pessoafisica: "",
    justificativa_vedacao: "",
    itensPorUnidade: [] as Item[],
    grupos: [] as Grupo[],
    especificacoes: "",
    osServicosSeraoPrestadosNosSeguintesLocaisEHorarios: "sim",
    locaisEHorarios: "",
    texto_locais_e_horarios_contratante: "3.2.1 Os serviços serão prestados nos locais e horários indicados pela contratante, conforme demanda.",
    
    prazoExecucaoDoContrato: "",
    texto_prazo_execucao: "3.2.2 O início da execução contratual deve se dar no prazo máximo de {prazoExecucaoDoContrato} ({prazoPorExtenso}) dias úteis, contados a partir da assinatura do contrato.",
    /* 3.2.3 descrição detalhada dos métodos */
    texto_descricao_detalhada: "3.2.3 Descrição detalhada dos métodos, rotinas, etapas, tecnologias procedimentos, frequência e periodicidade de execução do trabalho: {descricaoDetalhadaMetodosExecucaoTrabalho}",
    descricaoDetalhadaMetodosExecucaoTrabalho: "",
    /* 3.2.4 Horário da prestação de serviço: */
    texto_horario_prestacao: "3.2.4 Horário da prestação de serviço: {horarioPrestacaoServico}",
    horarioPrestacaoServico: "",
    /* 3.2.5 cronograma de realização dos serviços */
    existeCronograma: "",
    texto_cronograma_realizacao_servicos: "3.2.5 Cronograma de realização dos serviços: {cronogramaRealizacaoDosServicos}",
    cronogramaRealizacaoDosServicos: "",

    texto_para_perfeita_execucao_servicos: "3.2.6 Para a perfeita execução dos serviços, a Contratada deverá disponibilizar os materiais, equipamentos, ferramentas e utensílios necessários, nas quantidades estimadas e qualidades a seguir estabelecidas, promovendo sua substituição quando necessário: {perfeitaExecucaoservicos}",
    perfeitaExecucaoservicos: "",

    objetoSeraRecebido: "",
    ObjetoRecebidoProvisoriamente: "",
    ObjetoRecebidoDefinitivamente: "",
    texto_recebimento_provisorio: "A. Provisoriamente, pelo fiscal do CONTRATO no prazo de {ObjetoRecebidoProvisoriamente} ({prazoPorExtenso}) dias, mediante termo detalhado que ateste o cumprimento das exigências de caráter técnico e administrativo e a comprovação da prestação dos serviços;",
    texto_recebimento_definitivo: "B. Definitivamente, por servidor ou comissão designada pela autoridade competente, no prazo de {ObjetoRecebidoDefinitivamente} ({definitivoPorExtenso}) dias úteis, contados...",

    texto_recebimento_definitivo_podera_ser_excepcionalmente: "b.1.) O prazo para recebimento definitivo poderá ser excepcionalmente prorrogado, de forma justificada, por igual período, quando houver necessidade de diligências para a aferição do atendimento das exigências contratuais. (Utilizar, se for o caso)",
    recebimentoDefinitivoPoderaSerExcepcionalmente:"",

    //3.2.7 
    prazoRecebimentoProvisorio: "",
    prazoRecebimentoDefinitivo: "",
    ProvisorioEDefinitivo: "",

    //3.2.8 O termo detalhado
    TermoDetalhadoDeRecebimentoProvisorio: "",
    texto_termo_detalhado_de_recebimento_provisorio_se_realizado_imr:"3.2.8 O termo detalhado do recebimento provisório, com a análise das ocorrências registradas na execução do CONTRATO serão encaminhados ao gestor para fins de apuração dos descontos e glosas cabíveis na fatura correspondente, em virtude de serviços total ou parcialmente não executados ou, se for o caso, da pontuação obtida na avaliação da qualidade dos serviços em consonância com os indicadores previstos no Instrumento de Medição de Resultado (IMR)",
    texto_termo_detalhado_de_recebimento_provisorio_se_nao_realizado_imr:"3.2.8 O termo detalhado do recebimento provisório, com a análise das ocorrências registradas na execução do CONTRATO serão encaminhados ao gestor para fins de apuração dos descontos e glosas cabíveis na fatura correspondente, em virtude de serviços total ou parcialmente não executados",

    // 3.2.9 responsabilidade ético-profissional
    responsabilidadeEticoProfissional: "3.2.9 O recebimento provisório ou definitivo do objeto não exclui a responsabilidade ético-profissional da contratada pela perfeita execução da contratação, nem a responsabilidade pelos prejuízos resultantes da sua incorreta execução;",

    //3.2.10 condições adicionais de execução do objeto
    mostrarCondicoesAdicionais: "nao",
    condicoesAdicionais: [] as string[],
    texto_condicoes_adicionais: '3.2.10 Condições gerais e específicas para a prestação do serviço: (deve ser incluído, se cabível, condições adicionais de execução do objeto)',
    //3.3 Indocação de marcas ou modelos
    preveIndicacaoMarcasOuModelos: "nao",
    sim_texto_preve_indicacao_marcas_ou_modelos: "3.3.1 Na presente contratação será admitida a indicação da(s) seguinte(s) marca(s) ou modelo(s): {sera_admitida_indicacao}.",
    sera_admitida_indicacao: "",
    sim_texto_dois_presente_contratacao_sera_admitida: "3.3.2 A Justificativa para a indicação de marca(s) ou modelo(s) encontra-se pormenorizada em tópico específico do Estudo Técnico Preliminar, apêndice deste Termo de Referência.",
    numero_etp: "",
    nao_texto_preve_indicacao_marcas_ou_modelos: "3.3.1 Na presente contratação será admitida a indicação da(s) seguinte(s) marca(s) ou modelo(s): {marcas_ou_modelos_indicadas}, devido a {devido_a}",
    marcas_ou_modelos_indicadas: "",
    devido_a: "",

    // 3.4 da vedação de utilização de marca/produto na execução do serviço
    necessarioCondicoesAdicionaisParaExecucaoDoObjeto: "",
    condicoesAdicionaisExecucao: "",
    orcamentoSigiloso: "nao",
    tipoValorEstimado: "",
    texto_valor_estimado_nao_sigiloso: "4.1.1 O valor estimado global da contratação é de R$ {valorGlobal} ({valorGlobalExtenso}).",
    valorEstimadoMensal: "",
    valorEstimadoGlobal: "",
    prazoMesesContrato: "",
    texto_maior_desconto: "4.1.1 O valor de referência para aplicação do maior desconto corresponde a R$ {valorReferencia} ({valorReferenciaExtenso})",
    valorReferenciaMaiorDesconto: "",
    texto_orcamento_sigiloso: "4.1.1 O valor estimado da presente contratação é de caráter sigiloso e consta de anexo classificado acostado ao presente processo, conforme dispõe o art. 24 da Lei Federal nº 14.133/2021, uma vez que {justificativaSigilo}.",
    justificativaOrcamentoSigiloso: "",
    texto_valor_estimado_todos_casos_p1: "4.1.2 No preço total do objeto deverão estar inclusos todos os tributos (impostos, taxas e contribuições), sejam federais, estaduais e municipais, bem como frete, comissões, pessoal, embalagem, seguros, encargos sociais e trabalhistas, assim como demais insumos inerentes que incidam ou venham a incidir sobre o objeto, sejam de que naturezas forem.",
    texto_valor_estimado_todos_casos_p2: "4.1.3 Os preços ﬁnais unitários e totais propostos pelos licitantes não poderão ultrapassar o preço unitário e total estimado pela Administração, sob pena de desclassiﬁcação da proposta.",

    // 4.2 Classificação Orçamentária
    classificacoesOrcamentarias: [] as ClassificacaoOrcamentaria[],
    texto_classificacao_orcamentaria_p1: "4.2.1 As despesas decorrentes desta licitação serão incluídas no orçamento do Estado de Pernambuco, para o presente exercício, na classificação abaixo:", 
    elemento_de_despesa:"",

    // 4.3 Justificativa LC 123/2006
    aplicarCotaExclusiva: "nao",
    cotaReservadaNaturezaDivisivel: "nao",
    justificativaBeneficioLC123Opcao: [] as string[],
    texto_cota_exclusiva_sim: "4.3.2 Considerando que os itens OU lotes {itensLotesCotaExclusiva} desta licitação possuem valor igual ou inferior a R$ 80.000,00 (oitenta mil) reais, serão estes considerados de participação exclusiva de microempresa ou empresa de pequeno porte ou microempreendedor individual.", 
    itensLotesCotaExclusiva: "",
    texto_cota_exclusiva_nao_enquadra: "4.3.1 Considerando que não há itens ou lotes de valor igual ou inferior a R$ 80.000,00 (oitenta mil reais), a presente licitação não possui itens oulotes exclusivo à participação de microempresa, empresa de pequeno porte ou microempreendedor individual.", 
    texto_cota_exclusiva_nao_art_49: "4.3.1 O presente processo se enquadra no(s) inciso(s) {incisosArt49LC123} do art. 49 da Lei Complementar nº 123/2006 E/OU {incisosArt9Decreto45140} do art. 9º do Decreto nº 45.140/2017 citado(s) acima , uma vez que {justificativaNaoAplicacaoArt49}.", 
    incisosArt49LC123: "",
    incisosArt9Decreto45140: "",
    justificativaNaoAplicacaoArt49: "",
    texto_cota_exclusiva_nao_art_4_lei_14133: "4.3.1 Uma vez que o(s) preço(s) anual(is) estimado(s) do(s) item(ns) OU lote(s) {itensLotesNaoAplicacaoArt4} deste processo super(am) individualmente o valor da receita bruta máxima admitida para fins de enquadramento como empresa de pequeno porte (art. 3º, inciso II, da Lei Complementar nº 123/2006), não serão aplicados a tal(is)item(ns) OU lote(s) os benefícios presentes nos arts. 42 a 49 da Lei Complementar nº 123/2006 e arts. 5º ao 7º do Decreto nº 45.140/2017, por disposição expressa no inciso I, do § 1º, do art. 4º, da lei nº 14.133/2021.", 
    itensLotesNaoAplicacaoArt4: "",
    nao_aplicar_art_4_lei_14133: "",
    nao_aplicar_art_49: "",
    aplicarCotaExclusica: "",
    nao_aplicar_sem_enquadramento: "",

    // 5.1 Modalidade
    modalidadeLicitacao: "",
    criterioJulgamento: "",
    regimeExecucao: "",
    criterioAceitabilidadePrecos: "unitario",
    modoDisputa: "aberto_fechado",
    motivacaoParametrosLicitacao: "",
    inversaoFases: "nao",
    justificativaInversaoFases: "",
    texto_licitacao_p1: "5.1.1 A licitação será processada na modalidade {modalidadeLicitacao}, tendo como critério de julgamento o {criterioJulgamento}.",
    texto_licitacao_p2: "5.1.2 O objeto será executado por meio do regime de {regimeExecucao}.",
    texto_licitacao_p3: "5.1.3 O modo de disputa a ser utilizado é o {modoDisputa}.", 
    texto_licitacao_p4: "5.1.4 A combinação dos parâmetros modalidade de licitação, critério de julgamento e modo de disputa descritos neste Termo de Referência se mostram adequadas e eficientes para seleção da proposta apta a gerar o resultado de contratação mais vantajoso para a Administração Pública, uma vez que {motivacaoParametrosLicitacao}.",
    texto_inversao_fases: "5.1.5 A fase de habilitação antecederá, excepcionalmente, a fase de apresentação das propostas e lances, tendo em vista que {justificativaInversaoFases}.", 

    // 5.2 Proposta
    prazoValidadePropostaDias: "60",
    texto_prazo_validade_proposta: "5.2.1.1 As propostas deverão ter validade de, no mínimo, {prazoValidadePropostaDias} ({prazoValidadePropostaDiasExtenso}) dias, contados da data de abertura da sessão pública, independente de declaração da licitante.", 
    requerDocumentoAdicionalProposta: "nao",
    documentosAdicionaisProposta: "",
    requerCondicaoProposta: "nao",
    requerCondicaoPropostaParaos: "",
    requerCondicaoPropostaAcompanhadaDoSeguinteDocumento: "",
    texto_condicoes_proposta: "5.2.2.1 Para o(s) item(ns) ou lote(s) {requerCondicaoPropostaParaos}, a(s) proposta(s)enviada(s) deverá(ão) ser acompanhada(s) do(s) seguinte(s) documento(s): {requerCondicaoPropostaAcompanhadaDoSeguinteDocumento}",
    requeGarantiaProposta: "nao",
    texto_garantia_proposta_p1: "5.2.3.1 Será exigida, no ato da apresentação da proposta, a prestação de garantia, no percentual de {percentualGarantiaProposta}% ({percentualGarantiaPropostaExtenso}) por cento do valor estimado da contratação...",
    texto_garantia_proposta_p2: "5.2.3.2 A solicitação da garantia de proposta se justifica no presente caso, uma vez que {justificativaGarantiaProposta}",
    percentualGarantiaProposta: "",
    justificativaGarantiaProposta: "",

    requeAmostra: "nao",
    tipoAmostra: "",
    outroTipoAmostra: "",
    justificativaAmostra: "",
    prazoAmostraDiasUteis: "",
    faseApresentacaoAmostra: "julgamento_proposta",
    enderecoApresentacaoAmostra: "",
    horarioApresentacaoAmostra: "",
    agendamentoAmostra: "",
    duracaoAmostraDiasUteis: "",
    descricaoTesteAmostra: [] as string[],
    percentilMinimoAprovacaoAmostra: "",
    setorResponsavelAmostra: "",
    prazoAnaliseAmostraDiasUteis: "",
    prazoRetiradaAmostraDiasUteis: "",
    texto_amostra_fase_julgamento: "5.2.4.3 Havendo o aceite da proposta, o licitante classificado provisoriamente em primeiro lugar deverá passar por uma avaliação prática, no prazo de {prazoAmostraDiasUteis} ({prazoAmostraDiasUteisExtenso}) dias úteis, contados a partir do primeiro dia útil subsequente à convocação realizada pelo agente de contratação, sem hipótese de prorrogação, sob pena de desclassificação.",
    texto_dois_amostra_fase_julgamento: "5.2.4.4 O licitante será desclassificado automaticamente do certame se descumprir os prazos e horários, desde que o descumprimento tenha sido ocasionado por situação de sua responsabilidade.",
    texto_tres_amostra_fase_julgamento: "5.2.4.5Caso os prazos definidos acima não sejam cumpridos pelo LICITANTE, será feita a convocação do licitante classificado em segundo lugar e assim sucessivamente, até que seja encontrado licitante aprovada ou não haja mais licitantes a serem avaliados.",
    texto_amostra_fase_contratual: "5.2.4.3 No prazo de {prazoAmostraDiasUteis} ({prazoAmostraDiasUteisExtenso}) dias contados da assinatura do CONTRATO e antes da emissão da primeira ordem de serviço (OU contados da assinatura da ata de registro de preços), a contratada OU detentora da ata deverá fornecer amostra para fins de verificação das especificações contidas no Termo de Referência.", 
    texto_amostra_fase_condicao_assinatura: "5.2.4.3 No prazo de {prazoAmostraDiasUteis} ({prazoAmostraDiasUteisExtenso}) dias contados da homologação do certame (OU convocação pela Administração Pública), como condição para a assinatura do contrato, a adjudicatária deverá fornecer amostra para fins de verificação das especificações contidas no Termo de Referência.",
    
    texto_amostra_requisicao_p1: "5.2.4.1 Visando realizar análise conclusiva da adequação e conformidade do produto/solução ofertado(a) para o atendimento da necessidade pública, será exigida(o), no presente certame, prova de conceito em virtude de {justificativaAmostra}.", 
    texto_amostra_prazo_p1: "5.2.4.2 O prazo definido para sua apresentação, conforme definido no subitem abaixo, é reputado razoável para as providências de realização da prova de conceito pelo {deInteresseDas}.", 
    texto_amostra_requisicao_p2: "5.2.4.1 Visando realizar análise conclusiva da adequação e conformidade do produto/solução ofertado(a) para o atendimento da necessidade pública, será exigida amostra em virtude de {justificativaAmostra}.",
    prova_conceito_redacao_para_todos_os_casos_texto: "5.2.4.4 A prova de conceito __________ de interesse da Administração deverá ser apresentado(a) no endereço {enderecoApresentacaoAmostra}, no horário das {horarioApresentacaoAmostra}h às{horarioTerminoApresentacaoAmostra}h, mediante agendamento através dos números {telefoneParaAgendamento} e-mail {emailParaAgendamento}. A prova de conceito {aProvaDeConceito} de interesse da Administração terá duração de {duracaoProvaConceitoDiasUteis} ({duracaoProvaConceitoDiasUteisPorExtenso}) dias úteis.",
    horarioTerminoApresentacaoAmostra: "",
    telefoneParaAgendamento: "",
    emailParaAgendamento: "",
    aProvaDeConceito: "",
    duracaoProvaConceitoDiasUteis: "",
    prova_conceito_redacao_para_todos_os_casos_texto_dois:"5.2.4.5 Quando o objeto for enviado por via postal, a postagem deverá ser realizada no prazo previsto, devendo a licitante comunicar ao pregoeiro a data da postagem;",
    prova_conceito_redacao_para_todos_os_casos_texto_tres:"5.2.4.6 A Prova de Conceito {aProvaDeConceito} de interesse da Administração consistirá em: {provaDeConceitoConsistiraEm}",
    provaDeConceitoConsistiraEm: "",
    prova_conceito_redacao_para_todos_os_casos_texto_quatro:"5.2.4.7 Na análise da Prova de Conceito {aProvaDeConceito} de interesse da Administraçãoserão observados os critérios objetivos descritos no check-list deste Termo de Referência.",
    prova_conceito_redacao_para_todos_os_casos_texto_quinto:"5.2.4.8 Para fins de comprovação de atendimento, o licitante deve demonstrar, pelo menos, {comprovacaoAtendimentoPercentual}% ({comprovacaoAtendimentoPercentualPorExtenso}) por cento) dos itens constantes no subitem deste termo de referência.",
    comprovacaoAtendimentoPercentual: "",
    prova_conceito_redacao_para_todos_os_casos_texto_seis:"5.2.4.9 A Prova de Conceito {aProvaDeConceito} de interesse da Administraçãoserá acompanhada, examinada e avaliada pelo Setor {setorExaminadoreAvaliadorProvaConceito} do Órgão/Entidade {orgaoEntidadeProvaConceito} OU por Comissão de Avaliação, sendo de sua exclusiva responsabilidade a análise e APROVAÇÃO ou REPROVAÇÃO",
    deInteresseDas: "",
    setorExaminadoreAvaliadorProvaConceito: "",
    orgaoEntidadeProvaConceito: "",
    prova_conceito_redacao_para_todos_os_casos_texto_sete:"5.2.4.10 A apresentação da Prova de Conceito {aProvaDeConceito} de interesse da Administração ocorrerá em sessão pública, para a qual todos os demais licitantes poderão comparecer.",
    prova_conceito_redacao_para_todos_os_casos_texto_oito:"5.2.4.11 Os licitantes OU empresas que forem assistir à Prova de Conceito {aProvaDeConceito} de interesse da Administração não poderão interrompê-la de nenhum modo, sendo-lhes permitido fazer constar pronunciamento em ata.",
    prova_conceito_redacao_para_todos_os_casos_texto_nove:"5.2.4.12 O Setor {setorExaminadoreAvaliadorProvaConceito} do Órgão/Entidade {orgaoEntidadeProvaConceito}OUa Comissão de Avaliação realizará a avaliação da prova de conceito, em prazo não superior a {prazoAnaliseProvaConceitoDiasUteis} ({prazoAnaliseProvaConceitoDiasUteisExtenso}) dias úteis,após o término da sua apresentação, emitindo relatório técnico contendo a conclusão final de APROVAÇÃO ou REPROVAÇÃO da prova de conceito.",
    prazoAnaliseProvaConceitoDiasUteis:"",
    prova_conceito_redacao_para_todos_os_casos_texto_dez:"5.2.4.13 No caso da APROVAÇÃO ou REPROVAÇÃO, o relatório técnico deverá apresentar as justificativas que fundamentaram a decisão, identificando, em caso de reprovação, as exigências não atendidas.",
    prova_conceito_redacao_para_todos_os_casos_texto_onze:"5.2.4.14 Depois de vencido o prazo de apresentação da prova de conceito, nos termos estabelecidos neste Termo de Referência e seu(s) Anexo(s), não será permitida nova apresentação por parte do {deInteresseDas}.",
    prova_conceito_redacao_para_todos_os_casos_texto_doze:"5.2.4.15 Os custos pela realização da Prova de Conceito {aProvaDeConceito} de interesse da Administraçãoserão de responsabilidade exclusiva do {deInteresseDas}.",
    prova_conceito_redacao_para_todos_os_casos_texto_treze:"5.2.4.16 A APROVAÇÃO ou REPROVAÇÃO da Prova de Conceito {aProvaDeConceito} de interesse da Administraçãoé de responsabilidade exclusiva do Setor {setorExaminadoreAvaliadorProvaConceito} do Órgão/Entidade {orgaoEntidadeProvaConceito} OU da Comissão de Avaliação.",

    texto_amostra_comum_p1: "5.2.8 A {tipoAmostra} deverá ser apresentado(a) no endereço {enderecoApresentacaoAmostra}, no horário das {horarioApresentacaoAmostra}, mediante agendamento (...).", 
    texto_amostra_comum_p2: "5.2.9 A {tipoAmostra} consistirá em: (descrito na lista abaixo).", 
    texto_amostra_comum_p3: "5.2.10 A {tipoAmostra} será acompanhada, examinada e avaliada pelo Setor {setorResponsavelAmostra} (...).", 

    // 5.3 Habilitação
    habilitacaoJuridicaLeiEspecial: "nao",
    texto_habilitacao_juridica: "5.3.1 Ato de autorização para o exercício da atividade de {atividadeAutorizacaoJuridica}, expedido por {orgaoAutorizacaoJuridica} nos termos do {numeroLeiAutorizacaoJuridica}.", 
    atividadeAutorizacaoJuridica: "",
    orgaoAutorizacaoJuridica: "",
    artigoLeiAutorizacaoJuridica: "",
    numeroLeiAutorizacaoJuridica: "",
    objetoExigeRegistroFuncionamento: "nao",

    // 5.3.2 Qualificação Técnica
    requerRegistroEntidadeProfissional: "nao",
    nomeEntidadeProfissional: "",
    texto_qualificacao_tecnica_registro: "5.3.2.1 Registro ou inscrição da empresa na entidade profissional {nomeEntidadeProfissional}, em plena validade;", 
    requerComprovacaoAptidao: "nao",
    texto_qualificacao_tecnica_aptidao_p1: "5.3.2.2  Comprovação de aptidão para execução de serviço de complexidade tecnológica e operacional equivalente ou superior ao objeto desta contratação, ou ao item pertinente, por meio da apresentação de certidões ou atestados, em nome da licitante, expedidos por pessoa(s) de direito público ou privado ou regularmente emitido(s) pelo conselho profissional competente, quando for o caso", 
    servicosComprovacaoAptidao: "",
    caracteristicasMinimasAptidao: "",
    texto_qualificacao_tecnica_aptidao_p2: "5.3.2.2.2 Será considerado compatível com a quantidade os atestados ou certidões que apresentarem, no mínimo, {percentualMinimoAtestadoTecnico}% ({percentualMinimoAtestadoTecnicoExtenso}) por cento das quantidades estimadas na licitação  para cada lote OU item", 
    percentualMinimoAtestadoTecnico: "",
    texto_qualificacao_tecnica_aptidao_p3: "5.3.2.2.3 Para fins de aferição do percentual mínimo de {percentualMinimoAtestadoTecnico}% ({percentualMinimoAtestadoTecnicoExtenso}) por centro relativo à qualificação técnica, em sendo obtido resultado cujo número possua casas decimais, deverá ser realizado arredondamento para o primeiro menor número inteiro.", 
    texto_qualificacao_tecnica_aptidao_p4: "5.3.2.2.4 Justifica-se o percentual fixado para fins de qualificação técnica, no que se refere à comprovação das quantidades a serem indicadas em atestados/certidões, por {justificativaPercentualAtestadoTecnico}.", 
    justificativaPercentualAtestadoTecnico: "",
    texto_qualificacao_tecnica_aptidao_p5: "5.3.2.2.5 Será admitida a apresentação de atestados relativos a potencial subcontratado em relação à parcela do serviço de {parcelaServicoSubcontratado}, cuja subcontratação foi expressamente autorizada no presente termo de referência.", 
    parcelaServicoSubcontratado: "",

    preveVistoriaPrevia: "nao",
    texto_vistoria_previa_p1: "5.3.2.4 A avaliação prévia do local de execução dos serviços é imprescindível para o conhecimento pleno das condições e peculiaridades do objeto a ser contratado, pois {justificativaVistoriaPrevia}, sendo assegurado ao interessado o direito de realização de vistoria prévia, acompanhado por servidor designado para esse fim.", 
    justificativaVistoriaPrevia: "",
    horarioVistoriaPrevia: "",
    agendamentoVistoriaPreviaSetor: "",
    agendamentoVistoriaPreviaTelefone: "",
    agendamentoVistoriaPreviaEmail: "",
    texto_vistoria_previa_p2: "5.3.9 Caso a licitante opte por não realizar a vistoria, deverá apresentar declaração formal assinada por seu responsável técnico acerca do conhecimento pleno das condições e peculiaridades da contratação, (...).", 

    // 5.3.3 Qualificação Econômico-Financeira
    habilitacaoEconomicaPor: "",
    percentualHabilitacaoEconomica: "",
    texto_habilitacao_economica_p1: "5.3.10 Comprovação do {habilitacaoEconomicaPor} Mínimo correspondente a {percentualHabilitacaoEconomica}% ({percentualHabilitacaoEconomicaExtenso} por cento) do valor estimado da licitação (...).", 
    percentualAcrescimoConsorcio: "10",
    texto_habilitacao_economica_consorcio: "5.3.11 Quando permitida a participação na licitação de pessoas jurídicas organizadas em consórcio, este deve apresentar o somatório dos valores de {habilitacaoEconomicaPor} Mínimo de cada consorciado, constituindo-se de um acréscimo de {percentualAcrescimoConsorcio}% ({percentualAcrescimoConsorcioExtenso} por cento) sobre o valor exigido de licitante individual, não sendo tal acréscimo aplicável aos consórcios compostos, em sua totalidade, por microempresas e empresas de pequeno porte.", 
    requerIndicesContabeis: "nao",
    texto_habilitacao_economica_indices_p1: "5.3.12 Comprovação da boa situação financeira da licitante através do cumprimento dos índices de Liquidez Geral (LG), Solvência Geral (SG) e Liquidez Corrente, (...) = igual ou superior a 1", 
    texto_habilitacao_economica_indices_p2: "5.3.13 A adoção dos índices acima se mostra suficiente ao cumprimento das obrigações decorrentes da presente licitação, uma vez que {justificativaIndicesContabeis}.", 
    justificativaIndicesContabeis: "",
    texto_habilitacao_economica_indices_p3: "5.3.14 Ademais, os seus valores iguais ou superiores a {valorIndicesContabeis} foram adotados para o presente certame, pois {justificativaValorIndicesContabeis}.", 
    valorIndicesContabeis: "1",
    justificativaValorIndicesContabeis: "são os valores usuais de mercado",

    texto_justificativa_srp: "6.1.1 A opção pelo sistema de registro de preços para a contratação do objeto constante deste Termo de Referência tem fundamentação no art. 3º, caput E/OU inciso {incisoDecreto54700} do Decreto nº 54.700/2023, visto que {justificativaUsoSrp}.",
    incisoDecreto54700: "", 
    justificativaUsoSrp: "", 
    texto_orgao_gerenciador: "6.2.1 {orgaoGerenciador} é o(a) órgão OU entidade gerenciador(a)deste Registro de Preços;",
    orgaoGerenciador: "", 
    texto_orgaos_participantes_tipo: "corporativa", 
    texto_orgaos_participantes_p1: "6.3.1 Figuram como órgãos OU entidades participantes deste Registro de Preços:", 
    orgaosParticipantes: [] as string[], 
    texto_orgaos_participantes_unico: "6.3.1 {orgaoParticipanteUnico} é o(a) único(a) órgão OU entidade participante deste Registro de Preços;", 
    orgaoParticipanteUnico: "", 
    texto_orgaos_participantes_corporativa: "6.3.1 Figuram como PARTICIPANTES da presente Ata de Registro de Preços Corporativa todos os órgãos da Administração Direta, fundos especiais, Autarquias e Fundações Públicas integrantes do Poder Executivo do Estado de Pernambuco .", 
    texto_prazo_assinatura_arp: "6.4.1 Após a homologação do resultado desta licitação, a adjudicatária será convocada para assinar a Ata de Registro de Preços, no prazo de {prazoAssinaturaArpDiasUteis} ({prazoAssinaturaArpDiasUteisExtenso}) dias úteis, contados da convocação, sob pena de decair o direito à contratação.",
    quaisOrgaosOuEntidades: "",
    prazoAssinaturaArpDiasUteis: "5", 
    permiteContratacaoIndividualItemLote: "nao", 
    permiteContratacaoIndividualItemLoteNao: "6.6.1 Não haverá a possibilidade de contratação individual de itens dentro do lote.",
    textoexistePrazoDeVigenciaAta: "6.5.1.O prazo de vigência da ata será de 1 (um) ano, contado da data de sua assinatura, podendo ser prorrogado por igual período, facultada a renovação dos quantitativos previstos, inclusive para fins de adesão por não participantes, desde que seja comprovada a vantajosidade dos preços registrados.",
    texto_contratacao_individual_item_lote: "6.6.1 Os Participantes poderão fazer a contratação individual de itens registrados de forma aglutinada, ficando dispensada a comprovação da vantajosidade mediante pesquisa de preço ou de demonstração de que o deságio obtido no valor do item é igual ou superior ao do lote globalmente considerado, conforme § 3º, do art. 13, do Decreto nº 54.700/2023.",
    texto_contratacao_individual_item_lote_dois: "6.6.2 A previsão acima se justifica técnica, econômica e/ou gerencialmente, uma vez que {justificativaContratacaoIndividualItemLote}.",
    justificativaContratacaoIndividualItemLote: "", 
    permiteAdesaoOrgaosNaoParticipantes: "sim", 
    texto_adesao_sim_p1: "6.7.2 As possíveis solicitações de adesão deverão ser encaminhadas à gerenciadora da ata de registro de preços, por meio do telefone: (81) {telefoneAdesao}, e-mail: {emailAdesao}, para autorização.",
    emailAdesao: "", 
    telefoneAdesao: "", 
    usarLimitesAdesaoPadronizados: "sim", 
    texto_adesao_sim_limites_nao_padronizados_p1: "6.7.3 Para a estimativa de quantidades a serem adquiridas por órgãos não participantes serão observados os seguintes limites:",
    somaDeTodasAsAdesões: "",
    justificativaParaAplicacao: "",
    limiteAdesaoCadaOrgao: "", 
    limiteAdesaoTotal: "",
    texto_adesao_sim: "6.7.1.Será permitida a adesão por órgãos não participantes à Ata de Registro de preços oriunda deste Termo de Referência.",
    texto_adesao_sim_letra_a: "a) A adesão de cada órgão não poderá exceder a {limiteAdesaoCadaOrgao} % ({limiteAdesaoCadaOrgaoExtenso} por cento) dos quantitativos registrados na Ata de Registro de Preços",
    texto_adesao_sim_letra_b: "b) A soma de todas as adesões à Ata de Registro de Preços, não poderá exceder o {limiteAdesaoTotal} do quantitativo registrado.",
    texto_adesao_nao: "6.7.1 Não serão admitidas adesões à Ata de Registro de Preços resultante da presente licitação por órgãos ou entidades não participantes.",
    texto_adesao_nao_texto_dois: "A não previsão de adesão por órgãos não participantes se justifica devido a {justificativaNaoAdesao}.",
    justificativaNaoAdesao: "", 
    obrigacoesGerenciadoraUsarPadrao: "sim", 
    obrigacoesGerenciadoraIncluirExtras: "nao", 
    texto_obrigacoes_gerenciadora_padrao: "6.9.1 As obrigações do órgão OU entidade gerenciador(a) da ata de registro de preços serão dispostas em item específico da minuta da ata de registro de preços do presente processo.",
    texto_obrigacoes_gerenciadora_extras: "6.9.1 Além das obrigações que serão dispostas na minuta da ata de registro de preços, são requeridas as seguintes obrigações específicas da gerenciadora da ata na presente contratação:",
    obrigacoesGerenciadoraExtras: "", 
    obrigacoesDetentoraUsarPadrao: "sim", 
    obrigacoesDetentoraIncluirExtras: "nao", 
    texto_obrigacoes_detentora_padrao: "6.10.1 As obrigações da detentora da ata de registro de preços serão dispostas em item específico da minuta da ata de registro de preços do presente processo.",
    texto_obrigacoes_detentora_extras: "6.10.1 Além das obrigações que serão dispostas na minuta da ata de registro de preços, são requeridas as seguintes obrigações específicas da gerenciadora da ata na presente contratação:",
    obrigacoesDetentoraExtras: [] as string[], 
    
    // ADIÇÃO - SEÇÃO 7
    tipoContratoPrazo: "", 
    prazoVigenciaEscopoDefinido: "", 
    texto_prazo_vigencia_escopo_definido: "7.1.1 O prazo de vigência do contrato será de {prazoVigenciaEscopoDefinido}, contados a partir da data de sua assinatura, na forma do art. 105 da Lei nº 14.133, de 2021.",
    prazoVigenciaContinuo: "", 
    justificativaServicoContinuo: "", 
    texto_prazo_vigencia_continuo_p1: "7.1.1 O prazo de vigência do contrato é de {prazoVigenciaContinuo} contados a partir da data de sua assinatura, prorrogável até 10 (dez) anos, na forma dos arts. 106 e 107 da Lei nº 14.133, de 2021.",
    texto_prazo_vigencia_continuo_p2: "7.1.2 O serviço é enquadrado como continuado tendo em vista que {justificativaServicoContinuo}.",
    vigenciaPlurianual: "nao", 
    texto_vigencia_plurianual: "7.1.3 A contratação com vigência plurianual torna-se mais vantajosa no caso em tela considerando que {justificativaVigenciaPlurianual}.",
    justificativaVigenciaPlurianual: "", 
    prazoAssinaturaContratoDiasUteis: "5", 
    texto_prazo_assinatura_contrato: "7.2.1 Após a homologação da licitação, a adjudicatária será convocada para assinatura do termo de contrato (...) no prazo de {prazoAssinaturaContratoDiasUteis} ({prazoAssinaturaContratoDiasUteisExtenso}) dias úteis, contados a partir da convocação, sob pena de decair o direito à contratação.", 
    texto_prazo_assinatura_contrato_srp: "7.2.1 O Detentor da Ata será convocada para assinatura do contrato, no prazo de {prazoAssinaturaContratoDiasUteis} ({prazoAssinaturaContratoDiasUteisExtenso}) dias úteis, contados a partir da convocação, sob pena de decair o direito à contratação.", 
    texto_prazo_assinatura_contrato_srp_textodois: "7.2.2.O prazo de convocação poderá ser prorrogado 1 (uma) vez, por igual período, mediante solicitação da parte durante seu transcurso, devidamente justificada, e desde que o motivo apresentado seja aceito pela Administração.",
    requerCartaSolidariedade: "nao", 
    texto_carta_solidariedade: "7.3.1 Ao final da presente contratação, a empresa deverá {justificativaCartaSolidariedade} a fim de garantir a prestação de serviço pela sua sucessora;",
    justificativaCartaSolidariedade: "", 
    requerRequisitosSustentabilidade: "nao", 
    texto_requisitos_sustentabilidade: "7.3.2 Além dos critérios de sustentabilidade inseridos na descrição do objeto, devem ser atendidos, no momento da assinatura do contrato, os seguintes requisitos adicionais previstos {requisitosSustentabilidade}",
    requerClausula73_3: "nao",
    texto_73_3: "7.3.3.1 Em caso de fornecedor revendedor ou distribuidor, será exigida, no momento da assinatura do contrato, carta de solidariedade emitida pelo fabricante, que assegure a execução do contrato. A exigência se faz necessária em virtude de ______________.",
    requerClausula73_4: "nao",
    texto_73_4: "7.3.4.1 Além dos critérios de sustentabilidade inseridos na descrição do objeto, devem ser atendidos, no momento da assinatura do contrato, os seguintes requisitos adicionais previstos {requisitosSustentabilidade}",
    requisitosSustentabilidade: "", 
    obrigacoesContratanteUsarPadrao: "", 
    obrigacoesContratanteIncluirExtras: "", 
    texto_obrigacoes_contratante_padrao: "7.4.1 As obrigações da Contratante serão detalhadas na minuta do contrato anexa ao Edital da presente licitação.",
    texto_obrigacoes_contratante_extras: "7.4.1 Além das obrigações que serão dispostas na minuta do contrato anexa ao Edital da presente licitação, são requeridas as seguintes obrigações específicas na presente contratação:",
    obrigacoesContratanteExtras: "", 
    obrigacoesContratadaUsarPadrao: "", 
    obrigacoesContratadaIncluirExtras: "", 
    texto_obrigacoes_contratada_padrao: "7.5.1 As obrigações da Contratada encontram-se detalhadas na minuta do contrato anexa ao Edital da presente licitação.",
    texto_obrigacoes_contratada_extras: "7.5.1 Além das obrigações que serão dispostas na minuta do contrato anexa ao Edital da presente licitação, são requeridas as seguintes obrigações específicas na presente contratação:",
    obrigacoesContratadaExtras: "", 
    preveGarantiaContratual: "", 
    qualsubcontratacao: "",
    texto_garantia_contratual_nao: "7.6.1. Não haverá exigência da garantia contratual da execução (art. 96 e seguintes da Lei nº 14.133,de 2021), pelas razões constantes do Estudo Técnico Preliminar.",
    texto_garantia_contratual_nao_2: "7.6.1. Não haverá exigência da garantia contratual da execução (art. 96 e seguintes da Lei nº 14.133,de 2021), pelas seguintes razões expostas neste termo de referência: {justificativaNaoGarantia}.",
    justificativaNaoGarantia: "", 
    texto_garantia_contratual_sim: "7.6.1 A CONTRATADA prestará garantia de execução contratual, no percentual de {percentualGarantiaContratual}% ({percentualGarantiaContratualExtenso} por cento) do valor total OU anual do CONTRATO, nos termos dos artigos 96 a 98 da Lei nº 14.133, de 2021.",
    texto_garantia_contratual_sim_2: "7.6.2.As demais disposições sobre o tema serão detalhadas na minuta do contrato, anexo do Edital do presente certame.",
    percentualGarantiaContratual: "5", 
    permiteSubcontratacao: "", 
    texto_subcontratacao_nao: "7.7.1 Não será permitida a subcontratação de qualquer parcela do objeto da presente licitação, uma vez que {justificativaNaoSubcontratacao} Ademais, neste caso, a subcontratação não se mostra vantajosa técnica e economicamente para a Administração Pública.",
    justificativaNaoSubcontratacao: "", 
    texto_subcontratacao_sim_acessorias: "7.7.1 É permitida a subcontratação de parcela do objeto objeto do presente certame correspondente à/ao {parcelasAcessoriasSubcontratacao}, tendo em vista que se trata de prestação acessória, até o limite de {percentualLimiteSubcontratacaoAcessorias}% ({percentualLimiteSubcontratacaoAcessoriasEntenso} por cento) do valor total do contrato, e que não equivale à parcela de maior relevância técnica ou econômica do presente objeto.",
    parcelasAcessoriasSubcontratacao: "", 
    percentualLimiteSubcontratacaoAcessorias: "", 
    texto_subcontratacao_sim_tecnicos: "7.7.2 É permitida a subcontratação de parcela do objeto do presente certame correspondente à/ao {aspectosTecnicosSubcontratacao}, tendo em vista que se trata de aspectos técnicos específicos do serviço, até o limite de {percentualLimiteSubcontratacaoTecnicos}% ({percentualLimiteSubcontratacaoTecnicos} por cento) do valor total do contrato.",
    aspectosTecnicosSubcontratacao: "", 
    percentualLimiteSubcontratacaoTecnicos: "", 
    texto_subcontratacao_sim_fundamento: "7.7.3 Tal permissão se fundamenta em {fundamentoSubcontratacao}.",
    texto_subcontratacao_sim_fundamento_texto_dois: "7.7.4 São requeridas as seguintes condições para a subcontratação: {condicoesSubcontratacao}",
    fundamentoSubcontratacaoTextoDois: "",
    fundamentoSubcontratacao: "", 
    condicoesSubcontratacao: "", 
    atoresGestaoContrato: [] as AtorGestaoContrato[],
    meioComunicacaoOficial: "", 
    enderecoEntregaNotaFiscal: "", 
    setorGestaoContrato: "", 
    setorFiscalizacaoContrato: "", 
    texto_gestao_contrato_p1: "7.8.1 As obrigações dos agentes responsáveis pela gestão e fiscalização da presente contratação estão detalhadas no Decreto Estadual nº 51.651/2021, bem como, serão dispostas na minuta do contrato, anexo ao Edital deste certame.",
    texto_gestao_contrato_p2: "7.8.2 (Atores da Gestão/Fiscalização - ver tabela)",
    texto_gestao_contrato_p3: "7.8.3 A comunicação entre a Contratante e a Contratada se dará por meio de {meioComunicacaoOficial}, sem prejuízo de outros meios disponíveis.",
    texto_gestao_contrato_p4: "7.8.4 A contratada deverá apresentar a Nota Fiscal ou fatura para atesto da Administração no seguinte endereço: {enderecoEntregaNotaFiscal}.",
    texto_gestao_contrato_p5: "7.8.5 A Gestão da presente contratação ficará a cargo do(a) {setorGestaoContrato}. A Fiscalização da presente contratação ficará a cargo do(a) {setorFiscalizacaoContrato}.",

    // --- Seções 8, 9, 10, 11 e Anexos (ainda não implementados no Formulario) ---
    pagamentoUsarPadrao: "sim",
    texto_pagamento_padrao: "8.1.1. As disposições sobre o tema serão detalhadas na minuta do contrato, anexo do Edital do presente certame.",
    preverAntecipacaoPagamento: "nao",
    texto_antecipacao_pagamento_p1: "8.1.1. A presente contratação permite a antecipação do pagamento do valor {valorAntecipacaoPagamento} da contratação e se justifica devido a {justificativaAntecipacaoPagamento}.",
    valorAntecipacaoPagamento: "",
    quaisRespectivosItens: "",
    justificativaAntecipacaoPagamento: "",
    antecipacaoParcialDePagamento: "nao",
    texto_antecipacao_pagamento_p2: "8.1.2 O pagamento antecipado será efetuado no prazo de {prazoAntecipacaoPagamento} dias, contados do recebimento do {contadosDoRecebimento}.",
    prazoAntecipacaoPagamento: "",
    requerGarantiaAdicionalAntecipacao: "nao",
    texto_antecipacao_pagamento_p3: "8.1.3 A CONTRATADA deverá, como condição para a realização de pagamento antecipado, apresentar garantia adicional nas modalidades de que trata o art. 96 da Lei nº 14.133, de 2021, no percentual de {percentualGarantiaAdicionalAntecipacao} %.",
    percentualGarantiaAdicionalAntecipacao: "",
    texto_antecipacao_pagamento_parcial_p1: "8.1.4. A(s) etapa(s) {etapasItensAntecipacaoParcial} e seu(s) respectivo(s) item(ns) {quaisRespectivosItens} podem ser objeto de pagamento antecipado.",
    etapasItensAntecipacaoParcial: "",
    contadosDoRecebimento: "",
    usaImr: "nao",
    texto_imr_p1: "9.1 Os indicadores abaixo serão utilizados para avaliação dos serviços prestados: {quadroIndicadoresImr}",
    quadroIndicadoresImr: "",
    texto_imr_p2: "9.2.O pagamento será parcial ou totalmente glosado, de acordo com os indicadores previstos neste item  quando a CONTRATADA não produzir os resultados, deixar de executar, ou não executar com a qualidade mínima exigida as atividades contratadas ou quando deixar de utilizar materiais e recursos humanos exigidos para a execução do serviço, ou, ainda, quando os utilizar com qualidade ou quantidade inferior à demandada.",
    texto_imr_p3: "9.3 O pagamento será parcial ou totalmente glosado...",
    texto_imr_p4: "9.3.Após a conferência dos quantitativos e valores apresentados, a CONTRATANTE, através do fiscal do CONTRATO, atestará a medição mensal, no prazo de {prazoAtesteMedicao} ({prazoAtesteMedicaoExtenso}) dias úteis contados do recebimento do relatório, comunicando à CONTRATADA o valor aprovado e autorizando a emissão da correspondente Nota fiscal ou documento de cobrança equivalente.",
    prazoAtesteMedicao: "",
    sancoesLicitacaoUsarPadrao: "sim",
    sancoesLicitacaoIncluirExtras: "nao",
    texto_sancoes_licitacao_padrao: "10.1.1 As disposições sobre sanções administrativas aplicáveis durante a licitação e aquelas praticadas no período situado entre a adjudicação e a assinatura da ata serão previstas no Edital do presente certame.",
    texto_sancoes_licitacao_nao_e_registro_preco: "10.1.1 As disposições sobre sanções administrativas aplicáveis durante a licitação e aquelas praticadas no período situado entre a adjudicação e a assinatura da instrumento contratual serão previstas no Edital do presente certame.",
    sancoesAtaUsarPadrao: "sim",
    sancoesAtaIncluirExtras: "nao",
    texto_sancoes_ata_padrao: "10.2.1 As disposições sobre sanções administrativas aplicáveis em relação à detentora da ata de registro de preços estarão previstas na Minuta da Ata, anexo do Edital do presente certame.",
    texto_sancoes_ata_extras: "10.2.1 Além das sanções que serão dispostas na minuta da ata (...), são requeridas as seguintes sanções específicas:",
    sancoesAtaExtras: [] as string[],
    sancoesContratoUsarPadrao: "sim",
    sancoesContratoIncluirExtras: "nao",
    texto_sancoes_contrato_padrao: "10.3.1 As penalidades relativas a infrações cometidas no curso da contratação serão devidamente consignadas na minuta do contrato, anexa ao Edital do presente certame.",
    texto_sancoes_contrato_extras: "10.3.1 Além das sanções que serão dispostas na minuta do contrato (...), são requeridas as seguintes sanções específicas:",
    sancoesContratoExtras: [] as string[],
    demaisCondicoes: "",
    outrosAnexos: [] as OutroAnexo[],
    demaisCondicoesIncluir: "",

  }

function App() {
  const [formData, setFormData] = useState<FormDataCompleto>(defaultFormData as FormDataCompleto)

  const [isEditing, setIsEditing] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const toggleEditMode = () =>{
    if(isEditing){
      setIsEditing(false)
    }else{
      setIsConfirmModalOpen(true)
    }
  }

  const handleConfirmEdit = ()=>{
    setIsEditing(true)
    setIsConfirmModalOpen(false)
  }

  const handleCancelEdit = ()=>{
    setIsConfirmModalOpen(false)
  }

  return (
    <div className='p-4 flex flex-col md:flex-row gap-4'>
      <Formulario formData={formData} setFormData={setFormData} className='w-full md:w-1/2'/> 
      <ConteudoDocumento formData={formData} setFormData={setFormData} isEditing={isEditing} onToggleEdit={toggleEditMode} className='w-full md:w-1/2'/>
      <Modal isOpen={isConfirmModalOpen} onClose={handleCancelEdit}>
        <div className='bg-white p-6 rounded-lg shadow-xl max-w-md mx-auto'>
          <h3 className='text-xl font-semibold text-gray-900 mb-4'>Deseja entrar no modo edição de documento?</h3>
          <p className='text-gray-700 mb-6'>Este sistema disponibiliza os modelos padronizados de Termo de Referência (TR), elaborados pela Secretaria de Administração (SAD), de uso obrigatório na elaboração do seu documento, conforme estabelecido nos Decretos nº 53.384/2022 e nº 54.884/2023.
          As alterações no modelo devem ser realizadas apenas para eventuais necessidades de adequação às peculiaridades do caso concreto e ao objeto da licitação, de forma devidamente justificada, ficando registradas no sistema.
          Ao prosseguir com a alteração, o usuário declara ciência e concordância com essas regras.</p>
          <div className='flex justify-end space-x-4'>
            <button type='button' onClick={handleCancelEdit} className="px-4 py-2 bg-red-300 text-white rounded-md hover:bg-red-400 font-medium cursor-pointer">Cancelar</button>
            <button type='button' onClick={handleConfirmEdit} className="px-4 py-2 bg-green-300 text-white rounded-md hover:bg-green-400 font-medium cursor-pointer">Confirmar</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default App
