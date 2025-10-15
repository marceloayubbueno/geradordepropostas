// Types para o sistema de geração de documentos/propostas

export interface DocumentData {
  // Informações do Corretor de Saúde
  nomeCorretor: string;
  telefoneCorretor: string;
  emailCorretor: string;
  instagramCorretor: string;

  // Dados da Parceria
  nomeResponsavel: string;
  cargoResponsavel: string;
  tituloParceria: string;
  
  // Informações da Proposta
  numeroProposta: string;
  dataProposta: string;
  validadeProposta: string;
  
  // Percentual de Comissionamento
  percentualComissionamento: number;
  
  // Observações
  observacoes: string;
}

export interface FieldConfig {
  name: keyof DocumentData;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'date' | 'email' | 'tel' | 'currency' | 'url' | 'array';
  placeholder?: string;
  required?: boolean;
  editable: boolean; // Campo editável ou fixo
  category: 'corretor' | 'parceria' | 'proposta' | 'comissionamento' | 'observacoes';
}

export const documentFields: FieldConfig[] = [
  // 1º CARD - Dados do Corretor
  { name: 'nomeCorretor', label: 'Nome do Corretor', type: 'text', editable: true, category: 'corretor', required: true, placeholder: 'Ex: João Silva' },
  { name: 'telefoneCorretor', label: 'Telefone', type: 'tel', editable: true, category: 'corretor', placeholder: '(00) 00000-0000' },
  { name: 'emailCorretor', label: 'E-mail', type: 'email', editable: true, category: 'corretor', placeholder: 'seuemail@exemplo.com' },
  { name: 'instagramCorretor', label: 'Instagram', type: 'text', editable: true, category: 'corretor', placeholder: '@seuusuario' },
  
  // 2º CARD - Dados da Parceria
  { name: 'nomeResponsavel', label: 'Nome do Responsável', type: 'text', editable: true, category: 'parceria', required: true, placeholder: 'Ex: João Silva' },
  { name: 'cargoResponsavel', label: 'Cargo do Responsável', type: 'text', editable: true, category: 'parceria', required: true, placeholder: 'Ex: Presidente' },
  { name: 'tituloParceria', label: 'Título da Parceria', type: 'text', editable: true, category: 'parceria', required: true, placeholder: 'Ex: SINDIPOL' },
  
  // 3º CARD - Dados da Proposta
  { name: 'numeroProposta', label: 'Número da Proposta', type: 'text', editable: false, category: 'proposta', required: true },
  { name: 'dataProposta', label: 'Data da Proposta', type: 'date', editable: true, category: 'proposta', required: true },
  { name: 'validadeProposta', label: 'Validade', type: 'text', editable: true, category: 'proposta', placeholder: 'Ex: 30 dias' },
  
  // 4º CARD - Percentual de Comissionamento
  { name: 'percentualComissionamento', label: 'Percentual de Comissionamento', type: 'number', editable: true, category: 'comissionamento', placeholder: '10' },
  
  // 5º CARD - Observações
  { name: 'observacoes', label: 'Observações Adicionais', type: 'textarea', editable: true, category: 'observacoes' },
];

// Removido: defaultCompanyData (empresa foi removida)

// Função para obter o texto do template selecionado
export const getProposalText = (templateId?: string): string => {
  const { proposalTemplates } = require('./templates');
  const template = proposalTemplates.find((t: any) => t.id === templateId);
  return template ? template.content : proposalTemplates[0].content;
};

// Texto fixo da proposta de parceria para corretores de saúde (template padrão)
export const fixedProposalText = `1. Quem Somos

Sou [Nome do Corretor], corretora de saúde parceira da Star Life, especializada em planos empresariais, familiares e no público 44+.

A Star Life atua há mais de 20 anos no mercado de saúde, oferecendo soluções confiáveis e personalizadas.

Juntas, unimos experiência e credibilidade para trazer aos associados condições diferenciadas e suporte contínuo.

Nosso compromisso é oferecer <strong>Orientação clara, confiança e cuidado verdadeiro</strong>, sempre buscando os melhores benefícios para a associação e seus membros.

2. Objetivo da Parceria

Construir uma relação de <strong>cooperação e benefícios mútuos</strong> entre a Associação e nossa consultoria, trazendo vantagens exclusivas para os associados e fortalecendo os eventos promovidos pela entidade.

3. Benefícios para a Associação

• <strong>Comissionamento de 10%</strong> sobre a primeira mensalidade paga de cada plano fechado por associados ou indicação da Associação.

• Esse valor poderá ser revertido em:
o <strong>Caixinha de patrocínio</strong> para o evento de final de ano.
o <strong>Desconto para associados</strong> na contratação dos planos.

4. Apoio em Eventos

• Presença com <strong>estande</strong> nos principais eventos da Associação.

• <strong>Brindes personalizados</strong> para associados.

• Ações de <strong>divulgação e engajamento</strong> conjuntas (redes sociais, informativos, grupos de comunicação).

5. Vantagens para os Associados

• Condições diferenciadas na contratação de planos de saúde.

• Apoio na escolha do plano mais adequado (empresarial, familiar ou individual).

• Facilidade de contato e suporte personalizado.

6. Fortalecendo a Parceria

• <strong>Dia da Saúde</strong> → aferição de pressão e glicemia, orientação sobre prevenção e esclarecimento de benefícios dos planos de saúde.

• <strong>Campanhas Temáticas de Saúde</strong> → apoio em datas como Outubro Rosa, Novembro Azul, Dia do Coração, com ações de conscientização e material educativo.

• <strong>Relatórios Periódicos de Impacto</strong> → prestação de contas à diretoria sobre quantos associados foram atendidos, benefícios conquistados e valores revertidos para a associação.

• <strong>Canal Direto Exclusivo</strong> → atendimento prioritário por WhatsApp/e-mail exclusivo para associados.

7. Nossa Proposta é Crescer Juntos

Com essa parceria, a Associação ganha um benefício real para seus membros, enquanto fortalece suas ações internas e eventos.

Contato
[Nome do Corretor] <strong>– Consultora de Saúde</strong>
[Telefone do Corretor]
[E-mail do Corretor]
<strong>Instagram:</strong> [Instagram do Corretor]`;
