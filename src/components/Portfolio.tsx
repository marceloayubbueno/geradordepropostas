'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, ArrowRight, Code, Globe, Zap, Database, ShoppingCart, ChevronLeft, ChevronRight, Workflow, Smartphone } from 'lucide-react'
import { useState } from 'react'

const Portfolio = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('institucional')

  const projects = [
    // Sites Institucionais
    {
      id: 1,
      title: 'Site Institucional - Plataforma de Indicação',
      category: 'institucional',
      description: 'Site institucional completo para plataforma de indicação de clientes com design moderno e navegação intuitiva',
      technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
      results: ['Design responsivo', 'Performance otimizada', 'SEO otimizado'],
      metrics: { performance: 95, accessibility: 98, seo: 92, bestPractices: 96 },
      icon: Globe,
      color: 'from-green-500 to-emerald-500',
      image: '/images/cases/lp-indicacao.jpg'
    },
    {
      id: 6,
      title: 'Site Institucional - Plataforma de LinkedIn IA',
      category: 'institucional',
      description: 'Site institucional para plataforma de geração de conteúdo com IA para LinkedIn com foco em conversão',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      results: ['Design moderno', 'Performance alta', 'Conversão otimizada'],
      metrics: { performance: 93, accessibility: 96, seo: 94, bestPractices: 95 },
      icon: Globe,
      color: 'from-emerald-500 to-green-500',
      image: null
    },
    {
      id: 7,
      title: 'Site Institucional - Plataforma Agendamento de Consultas',
      category: 'institucional',
      description: 'Site institucional para plataforma de agendamento de consultas médicas com design profissional',
      technologies: ['React', 'Node.js', 'MongoDB'],
      results: ['Design profissional', 'Interface intuitiva', 'Integração de pagamentos'],
      metrics: { performance: 91, accessibility: 97, seo: 90, bestPractices: 94 },
      icon: Globe,
      color: 'from-green-600 to-emerald-600',
      image: null
    },
    // Sistemas Web
    {
      id: 2,
      title: 'Plataforma de Indicação de Clientes',
      category: 'webapp',
      description: 'Sistema completo para gestão de programas de indicação com dashboard e comissões',
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL'],
      results: ['Dashboard completo', 'Gestão de comissões', 'Relatórios detalhados'],
      metrics: { performance: 94, accessibility: 95, seo: 88, bestPractices: 96 },
      icon: Code,
      color: 'from-emerald-500 to-green-500',
      image: '/images/cases/plataforma-indicacao.jpg'
    },
    {
      id: 3,
      title: 'Cardápio Digital Interativo',
      category: 'webapp',
      description: 'Sistema de cardápio digital com QR Code, gestão de produtos e pedidos online integrado',
      technologies: ['React', 'Node.js', 'MongoDB'],
      results: ['Interface intuitiva', 'QR Code integrado', 'Gestão de pedidos'],
      metrics: { performance: 92, accessibility: 94, seo: 87, bestPractices: 93 },
      icon: Smartphone,
      color: 'from-green-600 to-emerald-600',
      image: null
    },
    {
      id: 4,
      title: 'Plataforma de Posts IA - LinkedIn',
      category: 'webapp',
      description: 'Sistema de geração automática de posts para LinkedIn usando inteligência artificial',
      technologies: ['Next.js', 'OpenAI API', 'PostgreSQL'],
      results: ['IA integrada', 'Posts automáticos', 'Agendamento'],
      metrics: { performance: 96, accessibility: 97, seo: 91, bestPractices: 97 },
      icon: Zap,
      color: 'from-emerald-600 to-green-600',
      image: null
    },
    // Automações
    {
      id: 10,
      title: 'Automação de Marketing Digital',
      category: 'automacao',
      description: 'Sistema completo de automação para campanhas de marketing digital com N8N',
      technologies: ['N8N', 'Webhooks', 'APIs', 'Integrações'],
      results: ['Campanhas automáticas', 'Lead nurturing', 'Relatórios em tempo real'],
      metrics: { performance: 98, accessibility: 100, seo: 95, bestPractices: 98 },
      icon: Workflow,
      color: 'from-green-500 to-emerald-500',
      image: null
    },
    {
      id: 11,
      title: 'Automação de E-commerce',
      category: 'automacao',
      description: 'Automações para gestão de estoque, pedidos e atendimento ao cliente',
      technologies: ['N8N', 'Shopify API', 'WhatsApp API', 'Email Marketing'],
      results: ['Gestão automática', 'Atendimento 24/7', 'Redução de erros'],
      metrics: { performance: 97, accessibility: 100, seo: 93, bestPractices: 96 },
      icon: Workflow,
      color: 'from-emerald-500 to-green-500',
      image: null
    },
    // E-commerce
    {
      id: 8,
      title: 'E-commerce de Games e Tecnologia',
      category: 'ecommerce',
      description: 'Loja virtual completa para venda de produtos gamer e tecnologia com catálogo dinâmico',
      technologies: ['Next.js', 'Stripe', 'PostgreSQL'],
      results: ['Catálogo completo', 'Pagamentos seguros', 'Gestão de estoque'],
      metrics: { performance: 90, accessibility: 93, seo: 89, bestPractices: 92 },
      icon: ShoppingCart,
      color: 'from-green-600 to-emerald-600',
      image: '/images/cases/ecommerce.png'
    },
    {
      id: 9,
      title: 'E-commerce de Produtos Digitais',
      category: 'ecommerce',
      description: 'Plataforma de venda de produtos digitais com entrega automática e área de membros',
      technologies: ['React', 'Node.js', 'MongoDB'],
      results: ['Download automático', 'Sistema de afiliados', 'Área de membros'],
      metrics: { performance: 94, accessibility: 95, seo: 91, bestPractices: 94 },
      icon: Zap,
      color: 'from-emerald-600 to-green-600',
      image: null
    }
  ]

  // Filtrar projetos por categoria
  const institucionalProjects = projects.filter(p => p.category === 'institucional')
  const webappProjects = projects.filter(p => p.category === 'webapp')
  const ecommerceProjects = projects.filter(p => p.category === 'ecommerce')
  const automacaoProjects = projects.filter(p => p.category === 'automacao')
  const currentProjects = activeTab === 'institucional' ? institucionalProjects : activeTab === 'webapp' ? webappProjects : activeTab === 'ecommerce' ? ecommerceProjects : automacaoProjects
  
  const itemsPerView = 3 // Desktop: 3 cards, Mobile: 1 card

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.1, 0.05, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
      </div>

      <div className="relative z-10 w-full px-8">
        {/* Header - Minimalist */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            <span className="text-green-400">Projetos</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Projetos reais que desenvolvemos e os resultados alcançados para nossos clientes
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 border border-gray-700/50">
            <button
              onClick={() => {
                setActiveTab('institucional')
                setCurrentIndex(0)
              }}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'institucional'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              Sites Institucionais
            </button>
            <button
              onClick={() => {
                setActiveTab('webapp')
                setCurrentIndex(0)
              }}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'webapp'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              Sistemas Web
            </button>
            <button
              onClick={() => {
                setActiveTab('ecommerce')
                setCurrentIndex(0)
              }}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'ecommerce'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              E-commerce
            </button>
            <button
              onClick={() => {
                setActiveTab('automacao')
                setCurrentIndex(0)
              }}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'automacao'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              Automações
            </button>
          </div>
        </motion.div>

        {/* Projects Carousel */}
        <div className="relative w-full">
          {/* Carousel Container */}
          <div className="overflow-hidden w-full">
            <motion.div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {currentProjects.map((project, index) => {
                const IconComponent = project.icon
                
                return (
                  <motion.div
                    key={project.id}
                    className="w-full md:w-1/3 px-6 flex-shrink-0"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="bg-black/50 backdrop-blur-sm rounded-3xl p-8 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 h-full group">
                      {/* Project Image Section */}
                      <div className="relative mb-8 overflow-hidden rounded-2xl">
                        <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-4">
                          {/* Project Image */}
                          {project.image ? (
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="absolute inset-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <>
                              {/* Placeholder for project image */}
                              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20"></div>
                              <div className="relative z-10 text-center">
                                <div className={`w-20 h-20 bg-gradient-to-br ${project.color} rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                                  <IconComponent className="w-10 h-10 text-white" />
                                </div>
                                <p className="text-gray-400 text-sm">Screenshot do Projeto</p>
                              </div>
                            </>
                          )}
                        </div>
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 right-4 bg-green-500 text-black text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                          {project.category === 'institucional' ? 'Site Institucional' : project.category === 'webapp' ? 'Sistema Web' : project.category === 'ecommerce' ? 'E-commerce' : 'Automação'}
                        </div>
                      </div>
                      
                      {/* Project Info */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-green-400 transition-colors">
                            {project.title}
                          </h3>
                          
                          <p className="text-gray-300 leading-relaxed">
                            {project.description}
                          </p>
                        </div>
                        
                        {/* Lighthouse Metrics */}
                        {project.metrics && (
                          <div className="bg-gray-900/50 rounded-xl p-4 border border-green-500/10">
                            <h4 className="text-sm font-semibold text-green-400 mb-3 uppercase tracking-wider">Performance Metrics</h4>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-white mb-1">{project.metrics.performance}</div>
                                <div className="text-xs text-gray-400">Performance</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-white mb-1">{project.metrics.accessibility}</div>
                                <div className="text-xs text-gray-400">Accessibility</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-white mb-1">{project.metrics.seo}</div>
                                <div className="text-xs text-gray-400">SEO</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-white mb-1">{project.metrics.bestPractices}</div>
                                <div className="text-xs text-gray-400">Best Practices</div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* Technologies */}
                        <div>
                          <h4 className="text-sm font-semibold text-green-400 mb-3 uppercase tracking-wider">Tecnologias</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 3).map((tech, techIndex) => (
                              <span key={techIndex} className="bg-green-500/10 text-green-400 text-sm px-3 py-1 rounded-full border border-green-500/20">
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="bg-gray-500/10 text-gray-400 text-sm px-3 py-1 rounded-full">
                                +{project.technologies.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Results */}
                        <div>
                          <h4 className="text-sm font-semibold text-green-400 mb-3 uppercase tracking-wider">Resultados</h4>
                          <div className="space-y-3">
                            {project.results.map((result, resultIndex) => (
                              <div key={resultIndex} className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span className="text-gray-300">{result}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* CTA */}
                        {project.id === 1 ? (
                          <a 
                            href="https://virallead.com.br/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 group-hover:shadow-lg group-hover:shadow-green-500/25 flex items-center justify-center"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Acessar Site
                          </a>
                        ) : (
                          <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 group-hover:shadow-lg group-hover:shadow-green-500/25">
                            Ver Case Completo
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/50 backdrop-blur-sm border border-green-500/20 rounded-full flex items-center justify-center text-green-400 hover:text-white hover:border-green-500/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed z-10"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          
          <button
            onClick={() => setCurrentIndex(Math.min(Math.ceil(currentProjects.length / itemsPerView) - 1, currentIndex + 1))}
            disabled={currentIndex >= Math.ceil(currentProjects.length / itemsPerView) - 1}
            className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/50 backdrop-blur-sm border border-green-500/20 rounded-full flex items-center justify-center text-green-400 hover:text-white hover:border-green-500/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed z-10"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(currentProjects.length / itemsPerView) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'bg-green-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-24"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.button
            onClick={() => {
              const form = document.getElementById('formulario-contato');
              if (form) form.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-6 px-12 rounded-2xl text-xl shadow-2xl hover:shadow-green-500/25 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Falar com Especialista
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform inline" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Portfolio