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
    content: `1. Quem Somos
Sou Kamila Ramos Corrêa, corretora de saúde parceira da Star Life, especializada em planos empresariais, familiares e no público 44+.
A Star Life atua há mais de 20 anos no mercado de saúde, oferecendo soluções confiáveis e personalizadas. Juntas, unimos experiência e credibilidade para trazer aos associados condições diferenciadas e suporte contínuo.
Nosso compromisso é oferecer <strong>Orientação clara, confiança e cuidado verdadeiro</strong>, sempre buscando os melhores benefícios para a associação e seus membros.

2. Objetivo da Parceria
Construir uma relação de <strong>cooperação e benefícios mútuos</strong> entre a Associação e nossa consultoria, trazendo vantagens exclusivas para os associados e fortalecendo os eventos promovidos pela entidade.

3. Benefícios para a Associação
• <strong>Comissionamento de {percentualComissionamento}%</strong> sobre a primeira mensalidade paga de cada plano fechado por associados ou indicação da Associação.
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
Kamila Ramos Corrêa – Consultora de Saúde
(27) 98889-1991
kamilaramoscorretora@gmail.com
Instagram: @ramos_k`
  }
];
