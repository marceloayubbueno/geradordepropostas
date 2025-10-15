// Templates de propostas de parceria

export interface ProposalTemplate {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  content: string;
}

export const proposalTemplates: ProposalTemplate[] = [
  {
    id: 'sindipol-original',
    name: 'Proposta de Parceria',
    description: 'Modelo padrão para propostas de parceria',
    color: 'from-green-600 to-emerald-600',
    icon: '📄',
    content: `Proposta de Parceria – SINDIPOL

1. Quem Somos
Sou Kamila Ramos Corrêa, corretora de saúde parceira da Star Life, especializada em planos empresariais, familiares e no público 44+.
A Star Life atua há mais de 20 anos no mercado de saúde, oferecendo soluções confiáveis e personalizadas. Juntas, unimos experiência e credibilidade para trazer aos associados condições diferenciadas e suporte contínuo.
Nosso compromisso é oferecer orientação clara, confiança e cuidado verdadeiro, sempre buscando os melhores benefícios para a associação e seus membros.

2. Objetivo da Parceria
Construir uma relação de cooperação e benefícios mútuos entre a Associação e nossa consultoria, trazendo vantagens exclusivas para os associados e fortalecendo os eventos promovidos pela entidade.

3. Benefícios para a Associação
• Comissionamento de {percentualComissionamento}% sobre a primeira mensalidade paga de cada plano fechado por associados ou indicação da Associação.
• Esse valor poderá ser revertido em:
o Caixinha de patrocínio para o evento de final de ano.
o Desconto para associados na contratação dos planos.

4. Apoio em Eventos
• Presença com estande nos principais eventos da Associação.
• Brindes personalizados para associados.
• Ações de divulgação e engajamento conjuntas (redes sociais, informativos, grupos de comunicação).

5. Vantagens para os Associados
• Condições diferenciadas na contratação de planos de saúde.
• Apoio na escolha do plano mais adequado (empresarial, familiar ou individual).
• Facilidade de contato e suporte personalizado.

6. Fortalecendo a Parceria
• Dia da Saúde → aferição de pressão e glicemia, orientação sobre prevenção e esclarecimento de benefícios dos planos de saúde.
• Campanhas Temáticas de Saúde → apoio em datas como Outubro Rosa, Novembro Azul, Dia do Coração, com ações de conscientização e material educativo.
• Relatórios Periódicos de Impacto → prestação de contas à diretoria sobre quantos associados foram atendidos, benefícios conquistados e valores revertidos para a associação.
• Canal Direto Exclusivo → atendimento prioritário por WhatsApp/e-mail exclusivo para associados.

7. Nossa Proposta é Crescer Juntos
Com essa parceria, a Associação ganha um benefício real para seus membros, enquanto fortalece suas ações internas e eventos.

Contato:
Kamila Ramos Corrêa – Consultora de Saúde
(27) 98889-1991
kamilaramoscorretora@gmail.com
Instagram: @ramos_k`
  }
];
