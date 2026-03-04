export interface Item {
  id: number;
  nome: string;
  qtd: string;
  valor: string;
  numeroLote: string;
  numeroItem: number;
  descricao: string;
  unidade: string;
  totalPorItem: number;
}

export interface Grupo {
  id: number;
  nome: string;
  itens: Item[];
  itemAtualGrupo: {
    nome: string;
    qtd: string;
    valor: string;
    numeroLote: string;
    numeroItem: string;
    descricao: string;
    unidade: string;
    totalPorItem: string;
  };
}

export interface LocalHorario {
  id: number;
  local: string;
  horario: string;
}

export interface ClassificacaoOrcamentaria {
  id: number;
  fonte: string;
  unidade: string;
  programa: string;
  acao: string;
  elementoDespesa: string;
  categoriaEconomica: string;
}

export interface AtorGestaoContrato {
  id: number;
  tipo: string;
  nome: string;
  matricula: string;
  setorUnidade: string;
}

export interface OutroAnexo {
  id: number;
  tipo: string;
  descricao: string;
}

export type FormDataCompleto = {

  // 1.1 formação de registro de preço
  eRegistroPreco: string;
  sim_texto_e_registro_preco: string;
  sim_texto_registro_preco_simples: string;          
  sim_texto_registro_preco_unificado_saude: string;  
  sim_texto_registro_preco_corporativo: string;
  paraContratacaoEventualPrestacaoServico: string;
  visandoAtenderNecessidades: string;
  eEstudosTecnicosPreliminares: string;
  nao_texto_e_registro_preco: string;
  seCoperativa: string; 
  justificaCasoConcretoUmaVezQue: string;
  qualTipoContratacao: string;
  objetoDestaLicitacaoEstaoDivididos: string;
  texto_objetoDestaLicitacaoEstaoDivididos: string;
  emCasoDiscordanciaExistenteTermoECatser: string;
  existEtpOuInformacaoPresenteExtratoSigiloso: string;
  texto_sim_existEtpOuInformacaoPresenteExtratoSigiloso: string;
  itemEtpEstudosTecnicos: string;
  texto_nao_existEtpOuInformacaoPresenteExtratoSigiloso: string;
  texto_nao_existEtpOuInformacaoPresenteExtratoSigilosoItemDois: string;
  presenteContratacaoNecessidadeServicos: string;
  desempenhoAtribuicoesFuncionais: string;
  umaVezQueAtribuicoesFuncionais: string;
  deverLegalExposto: string;
  queDeterminaDispositivoLegalCitado: string;
  // 2.2.1
  existEtpOuInformacaoPresenteExtratoSigilosoItemDois: string
  osQuantitativosPrecistoDefinidosNoDocumento:string
  fundamentadoEm: string
  // 2.2
  texto_sim_justificativa_quantitativo: string;
  itemEtpQuantitativo: string;
  texto_nao_justificativa_quantitativo: string;
  texto_nao_justificativa_quantitativo_textoDois:string
  // 2.3.1
  existEtpOuInformacaoPresenteExtratoSigilosoItemDois_tres: string // Você já tinha este
  texto_sim_justificativa_solucao: string;
  itemEtpJustificativaSolucao: string;
  texto_nao_justificativa_solucao: string;
  justificativaEscolhaSolucaoNaoEtp: string;

  // 2.4.1 (NOVOS CAMPOS)
  justificativaParcelamentoEtp: string; // 'sim' ou 'nao' (para ETP)
  texto_sim_justificativa_parcelamento: string;
  itemEtpJustificativaParcelamento: string;
  
  tipoParcelamentoNaoEtp: string; // 'item', 'lote'
  
  // Textos para 'nao' ETP -> 'item'
  texto_nao_parcelamento_item_p1: string;
  texto_nao_parcelamento_item_p2: string;
  texto_nao_parcelamento_item_p3: string;
  razoesParcelamentoItem: string;
  texto_nao_parcelamento_item_p4: string;
  
  // Textos para 'nao' ETP -> 'lote'
  texto_nao_parcelamento_lote_p1: string;
  justificativaAgrupamentoLote: string;
  texto_nao_parcelamento_lote_p2: string;

  // Textos para 'lotes espelhados' (add-on)
  usaLotesEspelhados: string; // 'sim' ou 'nao'
  texto_lotes_espelhados_p1: string;
  texto_lotes_espelhados_p2: string;
  argumentosLotesEspelhados: string;
  texto_lotes_espelhados_p3: string;
  reducaoEscopo: string;


  descricao: string;
  numeroConsorciadas: string;
  justificativa: string;
  nao_havendo_complexidade_objeto: string;
  nao_havendo_grande_vulto_da_contratacao: string;
  texto_sim: string;
  texto_sim_limitado_p2: string;
  texto_sim_limitado_p1: string;
  texto_nao_p2: string;
  texto_nao_p1: string;
  texto_nao_p3: string;
  texto_nao_p3_complemento: string;
  texto_nao_p4: string;
  vedacaoOuParticipacaoCooperativa: string;
  vedacaoParticipacaoCooperativaNao: string;
  permitidaParticipacaoCooperativaSim: string;
  justificativa_vedacao: string;
  vedacaoOuParticipacaoPessoasFisicas: string;
  justificativa_vedacao_pessoafisica: string;
  vedacaoParticipacaoPessoaFisicaNao: string;
  vedacaoParticipacaoPessoaFisicaSim: string;

  itensPorUnidade: Item[];
  grupos: Grupo[];
  atenderaDeverLegalExposto: string;

  especificacoes: string;

  osServicosSeraoPrestadosNosSeguintesLocaisEHorarios: string;
  locaisEHorarios: string;
  texto_locais_e_horarios_contratante: string;
  prazoExecucaoDoContrato: string;
  
  
  texto_prazo_execucao: string; 

  /* 3.2.3 Descrição detalhada */
  texto_descricao_detalhada: string;
  descricaoDetalhadaMetodosExecucaoTrabalho: string;
  /* 3.2.4 Horário da prestação de serviço: */
  texto_horario_prestacao: string;
  horarioPrestacaoServico: string;
  /* 3.2.5 cronograma de realização dos serviços */
  existeCronograma: string;
  cronogramaRealizacaoDosServicos: string;
  texto_cronograma_realizacao_servicos: string;
  /* 3.2.6 Execução dos serviços, a contratada deverá disponibilizar os materiais, equipamentos */
  texto_para_perfeita_execucao_servicos: string;
  perfeitaExecucaoservicos: string;

  objetoSeraRecebido: string;
  ObjetoRecebidoProvisoriamente: string;
  ObjetoRecebidoDefinitivamente: string;
  texto_recebimento_provisorio: string;
  texto_recebimento_definitivo: string;

  recebimentoDefinitivoPoderaSerExcepcionalmente: string;
  texto_recebimento_definitivo_podera_ser_excepcionalmente: string;

  //3.2.7
  prazoRecebimentoProvisorio: string;
  prazoRecebimentoDefinitivo: string;
  ProvisorioEDefinitivo: string;

  // 3.2.8 O termo detalhado do recebimento provisório
  TermoDetalhadoDeRecebimentoProvisorio: string;
  texto_termo_detalhado_de_recebimento_provisorio_se_realizado_imr: string;
  texto_termo_detalhado_de_recebimento_provisorio_se_nao_realizado_imr: string;

  // 3.2.9 responsabilidade ético-profissional
  responsabilidadeEticoProfissional: string

  //3.2.10 condições adicionais de execução do objeto
    mostrarCondicoesAdicionais: string;
    condicoesAdicionais: string[];
    texto_condicoes_adicionais: string;

  // 3.3 Indicação de Marcas ou Modelos 
    preveIndicacaoMarcasOuModelos:string;
    sim_texto_preve_indicacao_marcas_ou_modelos:string;
    sera_admitida_indicacao:string;
    sim_texto_dois_presente_contratacao_sera_admitida:string;
    numero_etp:string;
    nao_texto_preve_indicacao_marcas_ou_modelos:string;
    marcas_ou_modelos_indicadas: string;
    devido_a: string;

    // 3.4 da vedação de utilização de marca/produto na execução do serviço
    necessarioCondicoesAdicionaisParaExecucaoDoObjeto: string;
    condicoesAdicionaisExecucao: string;

    // 4.1 Valor estimado da contratação
  orcamentoSigiloso: string; // 'sim' ou 'nao'
  tipoValorEstimado: string; // 'valor_estimado' ou 'maior_desconto'
  
  texto_valor_estimado_nao_sigiloso: string;
  valorEstimadoMensal: string;
  valorEstimadoGlobal: string; 
  prazoMesesContrato: string; 
  
  texto_maior_desconto: string;
  valorReferenciaMaiorDesconto: string;
  
  texto_orcamento_sigiloso: string;
  justificativaOrcamentoSigiloso: string;

  texto_valor_estimado_todos_casos_p1: string;
  texto_valor_estimado_todos_casos_p2: string;

  // 4.2 Classificação Orçamentária
  classificacoesOrcamentarias: ClassificacaoOrcamentaria[];
  texto_classificacao_orcamentaria_p1: string;
  elemento_de_despesa: string;
  
  // 4.3 Justificativa LC 123/2006
  aplicarCotaExclusiva: string; // 'sim' ou 'nao'
  cotaReservadaNaturezaDivisivel: string; // 'sim' ou 'nao'
  nao_aplicar_art_4_lei_14133: string;
  nao_aplicar_art_49: string;
  aplicarCotaExclusica: string;
  nao_aplicar_sem_enquadramento: string;
  somaDeTodasAsAdesões: string
  justificativaParaAplicacao: string;
  
  justificativaBeneficioLC123Opcao: string[]; // 'aplicar', 'nao_aplicar_sem_enquadramento', 'nao_aplicar_art_49', 'nao_aplicar_art_4_lei_14133'
  
  texto_cota_exclusiva_sim: string;
  itensLotesCotaExclusiva: string;
  
  texto_cota_exclusiva_nao_enquadra: string;
  
  texto_cota_exclusiva_nao_art_49: string;
  incisosArt49LC123: string; 
  incisosArt9Decreto45140: string; 
  justificativaNaoAplicacaoArt49: string;

  texto_cota_exclusiva_nao_art_4_lei_14133: string;
  itensLotesNaoAplicacaoArt4: string;

  // 5.1 Modalidade, Critério, Regime, Modo de Disputa
  modalidadeLicitacao: string; 
  criterioJulgamento: string; 
  regimeExecucao: string; 
  criterioAceitabilidadePrecos: string; 
  modoDisputa: string; 
  motivacaoParametrosLicitacao: string; 
  inversaoFases: string; 
  justificativaInversaoFases: string; 

  texto_licitacao_p1: string;
  texto_licitacao_p2: string;
  texto_licitacao_p3: string;
  texto_licitacao_p4: string;
  texto_inversao_fases: string;

  // 5.2 Proposta
  prazoValidadePropostaDias: string; 
  texto_prazo_validade_proposta: string; 
  
  requerDocumentoAdicionalProposta: string; 
  documentosAdicionaisProposta: string; 
  
  requerCondicaoProposta: string;
  texto_condicoes_proposta: string;
  requerCondicaoPropostaParaos: string;
  requerCondicaoPropostaAcompanhadaDoSeguinteDocumento: string;

  requeGarantiaProposta: string; 
  percentualGarantiaProposta: string; 
  justificativaGarantiaProposta: string; 
  texto_garantia_proposta_p1: string;
  texto_garantia_proposta_p2: string;

  requeAmostra: string; 
  tipoAmostra: string; 
  outroTipoAmostra: string; 
  justificativaAmostra: string; 
  prazoAmostraDiasUteis: string; 
  faseApresentacaoAmostra: string; 
  enderecoApresentacaoAmostra: string; 
  horarioApresentacaoAmostra: string; 
  agendamentoAmostra: string; 
  duracaoAmostraDiasUteis: string; 
  descricaoTesteAmostra: string[]; 
  percentilMinimoAprovacaoAmostra: string; 
  setorResponsavelAmostra: string; 
  prazoAnaliseAmostraDiasUteis: string; 
  prazoRetiradaAmostraDiasUteis: string; 

  texto_amostra_requisicao_p1: string;
  texto_amostra_requisicao_p2: string;
  texto_amostra_prazo_p1: string;
  texto_amostra_comum_p1: string;
  texto_amostra_comum_p2: string;
  texto_amostra_comum_p3: string;

  texto_vistoria_previa_p2: string;

  texto_amostra_fase_julgamento: string;
  texto_dois_amostra_fase_julgamento: string;
  texto_tres_amostra_fase_julgamento: string;
  texto_amostra_fase_contratual: string;
  texto_amostra_fase_condicao_assinatura: string;
  prova_conceito_redacao_para_todos_os_casos_texto: string;
  comprovacaoAtendimentoPercentualPorExtenso: string;
  horarioTerminoApresentacaoAmostra: string;
  telefoneParaAgendamento: string;
  emailParaAgendamento: string;
  aProvaDeConceito: string;
  duracaoProvaConceitoDiasUteis: string;
  prova_conceito_redacao_para_todos_os_casos_texto_dois: string;
  prova_conceito_redacao_para_todos_os_casos_texto_tres: string;
  provaDeConceitoConsistiraEm: string;
  prova_conceito_redacao_para_todos_os_casos_texto_quatro: string;
  prova_conceito_redacao_para_todos_os_casos_texto_quinto: string;
  comprovacaoAtendimentoPercentual: string;
  prova_conceito_redacao_para_todos_os_casos_texto_seis: string;
  setorExaminadoreAvaliadorProvaConceito: string;
  orgaoEntidadeProvaConceito: string;
  prazoAnaliseProvaConceitoDiasUteis: string;
  prova_conceito_redacao_para_todos_os_casos_texto_sete: string;
  prova_conceito_redacao_para_todos_os_casos_texto_oito: string;
  prova_conceito_redacao_para_todos_os_casos_texto_nove: string;
  prova_conceito_redacao_para_todos_os_casos_texto_dez: string;
  prova_conceito_redacao_para_todos_os_casos_texto_onze: string;
  prova_conceito_redacao_para_todos_os_casos_texto_doze: string;
  prova_conceito_redacao_para_todos_os_casos_texto_treze: string;
  deInteresseDas: string;
  texto_sancoes_licitacao_nao_e_registro_preco: string;

  
  
  // 5.3 Habilitação
  habilitacaoJuridicaLeiEspecial: string; 
  texto_habilitacao_juridica: string;
  atividadeAutorizacaoJuridica: string; 
  orgaoAutorizacaoJuridica: string; 
  artigoLeiAutorizacaoJuridica: string; 
  numeroLeiAutorizacaoJuridica: string; 

  objetoExigeRegistroFuncionamento: string; 

  // 5.3.2 Qualificação Técnica
  requerRegistroEntidadeProfissional: string; 
  nomeEntidadeProfissional: string; 
  texto_qualificacao_tecnica_registro: string;

  requerComprovacaoAptidao: string; 
  texto_qualificacao_tecnica_aptidao_p1: string;
  servicosComprovacaoAptidao: string; 
  caracteristicasMinimasAptidao: string; 
  
  texto_qualificacao_tecnica_aptidao_p2: string;
  percentualMinimoAtestadoTecnico: string; 
  
  texto_qualificacao_tecnica_aptidao_p3: string; 
  
  texto_qualificacao_tecnica_aptidao_p4: string; 
  justificativaPercentualAtestadoTecnico: string; 

  texto_qualificacao_tecnica_aptidao_p5: string; 
  parcelaServicoSubcontratado: string; 

  preveVistoriaPrevia: string; 
  texto_vistoria_previa_p1: string;
  justificativaVistoriaPrevia: string; 
  horarioVistoriaPrevia: string; 
  agendamentoVistoriaPreviaSetor: string; 
  agendamentoVistoriaPreviaTelefone: string; 
  agendamentoVistoriaPreviaEmail: string; 

  // 5.3.3 Qualificação Econômico-Financeira
  habilitacaoEconomicaPor: string; 
  percentualHabilitacaoEconomica: string; 
  texto_habilitacao_economica_p1: string;
  
  percentualAcrescimoConsorcio: string; 
  texto_habilitacao_economica_consorcio: string;
  
  requerIndicesContabeis: string; 
  texto_habilitacao_economica_indices_p1: string; 
  texto_habilitacao_economica_indices_p2: string;
  justificativaIndicesContabeis: string; 
  texto_habilitacao_economica_indices_p3: string;
  valorIndicesContabeis: string; 
  justificativaValorIndicesContabeis: string; 

  // 6. Registro de Preços
  texto_justificativa_srp: string;
  incisoDecreto54700: string; 
  justificativaUsoSrp: string; 
  
  texto_orgao_gerenciador: string;
  orgaoGerenciador: string; 
  
  texto_orgaos_participantes_tipo: string; 
  quaisOrgaosOuEntidades: string;
  texto_orgaos_participantes_p1: string; 
  orgaosParticipantes: string[]; 
  texto_orgaos_participantes_unico: string; 
  orgaoParticipanteUnico: string; 
  texto_orgaos_participantes_corporativa: string; 
  sim_texto_registro_preco_corporativo_e_havera_reducao_escopo: string;

  texto_prazo_assinatura_arp: string;
  prazoAssinaturaArpDiasUteis: string;
  
  textoexistePrazoDeVigenciaAta: string;

  permiteContratacaoIndividualItemLote: string; 
  permiteContratacaoIndividualItemLoteNao: string; 
  texto_contratacao_individual_item_lote: string;
  texto_contratacao_individual_item_lote_dois: string;
  justificativaContratacaoIndividualItemLote: string; 

  permiteAdesaoOrgaosNaoParticipantes: string; 
  
  texto_adesao_sim_p1: string;
  emailAdesao: string; 
  telefoneAdesao: string; 
  usarLimitesAdesaoPadronizados: string; 
  texto_adesao_sim_limites_nao_padronizados_p1: string;
  limiteAdesaoCadaOrgao: string; 
  limiteAdesaoTotal: string; 
  
  texto_adesao_sim: string;
  texto_adesao_sim_letra_a: string;
  texto_adesao_sim_letra_b: string;
  texto_adesao_nao: string;
  texto_adesao_nao_texto_dois: string;
  justificativaNaoAdesao: string; 
  
  obrigacoesGerenciadoraUsarPadrao: string; 
  obrigacoesGerenciadoraIncluirExtras: string; 
  texto_obrigacoes_gerenciadora_padrao: string;
  texto_obrigacoes_gerenciadora_extras: string;
  obrigacoesGerenciadoraExtras: string; 
  
  obrigacoesDetentoraUsarPadrao: string; 
  obrigacoesDetentoraIncluirExtras: string; 
  texto_obrigacoes_detentora_padrao: string;
  texto_obrigacoes_detentora_extras: string;
  obrigacoesDetentoraExtras: string[]; 
  
  // 7. Do Contrato
  tipoContratoPrazo: string; 
  
  prazoVigenciaEscopoDefinido: string; 
  texto_prazo_vigencia_escopo_definido: string;

  prazoVigenciaContinuo: string; 
  justificativaServicoContinuo: string; 
  texto_prazo_vigencia_continuo_p1: string;
  texto_prazo_vigencia_continuo_p2: string;
  
  vigenciaPlurianual: string; 
  texto_vigencia_plurianual: string;
  justificativaVigenciaPlurianual: string; 
  
  prazoAssinaturaContratoDiasUteis: string; 
  texto_prazo_assinatura_contrato: string; 
  texto_prazo_assinatura_contrato_srp: string;
  texto_prazo_assinatura_contrato_srp_textodois: string; 

  requerCartaSolidariedade: string; 
  texto_carta_solidariedade: string;
  justificativaCartaSolidariedade: string; 
  
  requerRequisitosSustentabilidade: string; 
  texto_requisitos_sustentabilidade: string;
  requisitosSustentabilidade: string; 

  requerClausula73_3: string;
  texto_73_3: string;
  requerClausula73_4: string;
  texto_73_4: string;

  obrigacoesContratanteUsarPadrao: string; 
  obrigacoesContratanteIncluirExtras: string; 
  texto_obrigacoes_contratante_padrao: string;
  texto_obrigacoes_contratante_extras: string;
  obrigacoesContratanteExtras: string; 
  
  obrigacoesContratadaUsarPadrao: string; 
  obrigacoesContratadaIncluirExtras: string; 
  texto_obrigacoes_contratada_padrao: string;
  texto_obrigacoes_contratada_extras: string;
  obrigacoesContratadaExtras: string; 

  preveGarantiaContratual: string; 
  
  texto_garantia_contratual_nao: string;
  texto_garantia_contratual_nao_2: string;
  qualsubcontratacao: string;
  justificativaNaoGarantia: string; 
  
  texto_garantia_contratual_sim: string;
  texto_garantia_contratual_sim_2: string;
  percentualGarantiaContratual: string; 

  permiteSubcontratacao: string; 
  
  texto_subcontratacao_nao: string;
  justificativaNaoSubcontratacao: string; 
  
  texto_subcontratacao_sim_acessorias: string;
  parcelasAcessoriasSubcontratacao: string; 
  percentualLimiteSubcontratacaoAcessorias: string; 
  
  texto_subcontratacao_sim_tecnicos: string;
  aspectosTecnicosSubcontratacao: string; 
  percentualLimiteSubcontratacaoTecnicos: string; 

  texto_subcontratacao_sim_fundamento: string;
  texto_subcontratacao_sim_fundamento_texto_dois: string;
  fundamentoSubcontratacao: string; 
  fundamentoSubcontratacaoTextoDois: string;
  condicoesSubcontratacao: string; 
  
  atoresGestaoContrato: AtorGestaoContrato[];
  meioComunicacaoOficial: string; 
  enderecoEntregaNotaFiscal: string; 
  setorGestaoContrato: string; 
  setorFiscalizacaoContrato: string; 
  
  texto_gestao_contrato_p1: string;
  texto_gestao_contrato_p2: string;
  texto_gestao_contrato_p3: string;
  texto_gestao_contrato_p4: string;
  texto_gestao_contrato_p5: string;

  // 8. Pagamento
  pagamentoUsarPadrao: string; 
  texto_pagamento_padrao: string;
  
  preverAntecipacaoPagamento: string; 
  
  texto_antecipacao_pagamento_p1: string;
  justificativaAntecipacaoPagamento: string; 
  antecipacaoParcialDePagamento: string;
  quaisRespectivosItens: string;
  contadosDoRecebimento: string;
  valorAntecipacaoPagamento: string;
  texto_antecipacao_pagamento_p2: string;
  prazoAntecipacaoPagamento: string; 
  itensAntecipacaoParcial: string;
  
  requerGarantiaAdicionalAntecipacao: string; 
  texto_antecipacao_pagamento_p3: string;
  percentualGarantiaAdicionalAntecipacao: string; 
  
  texto_antecipacao_pagamento_parcial_p1: string;
  etapasItensAntecipacaoParcial: string; 

  // 9. IMR
  usaImr: string; 
  texto_imr_p1: string;
  quadroIndicadoresImr: string; 
  texto_imr_p2: string;
  texto_imr_p3: string;
  texto_imr_p4: string;
  prazoAtesteMedicao: string; 

  // 10. Sanções
  sancoesLicitacaoUsarPadrao: string; 
  sancoesLicitacaoIncluirExtras: string; 
  texto_sancoes_licitacao_padrao: string;
  
  sancoesAtaUsarPadrao: string; 
  sancoesAtaIncluirExtras: string; 
  texto_sancoes_ata_padrao: string;
  texto_sancoes_ata_extras: string;
  sancoesAtaExtras: string[]; 
  
  sancoesContratoUsarPadrao: string; 
  sancoesContratoIncluirExtras: string; 
  texto_sancoes_contrato_padrao: string;
  texto_sancoes_contrato_extras: string;
  sancoesContratoExtras: string[]; 

  // 11. Demais Condições
  demaisCondicoes: string;
  demaisCondicoesIncluir: string 

  // Anexos
  outrosAnexos: OutroAnexo[];
};