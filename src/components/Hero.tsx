'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { Code, Terminal, Cpu, Database, ArrowRight, Play, Star, Zap, CheckCircle, Github, ExternalLink } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

const Hero = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const router = useRouter()
  const pathname = usePathname()

  const stats = [
    { number: '10+', label: 'Projetos entregues', icon: Code },
    { number: '95+', label: 'Performance Score', icon: Cpu },
    { number: '50+', label: 'Integrações criadas', icon: Terminal },
    { number: '3+', label: 'Anos de experiência', icon: Database }
  ]

  return (
    <section className="relative overflow-hidden bg-black min-h-screen flex items-center" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'grid-move 20s linear infinite'
          }}></div>
        </div>
        
        {/* Floating Code Elements */}
        <motion.div 
          className="absolute top-20 left-10 text-green-400 font-mono text-sm opacity-30"
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          &lt;Uixweb&gt;
        </motion.div>
        <motion.div 
          className="absolute top-40 right-20 text-green-400 font-mono text-sm opacity-30"
          animate={{ y: [0, 20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          const innovation = true;
        </motion.div>
        <motion.div 
          className="absolute bottom-40 left-20 text-green-400 font-mono text-sm opacity-30"
          animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          return &lt;Success /&gt;;
        </motion.div>
        
        {/* Animated Background Shapes */}
        <motion.div 
          className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Zap className="w-4 h-4 mr-2" />
              Front-end Developer | React & Next.js Specialist
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              DESENVOLVEDOR{' '}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                FRONT-END
              </span>{' '}
              QUE ENTENDE DE GROWTH
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              className="text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Criando interfaces modernas e otimizadas com React, Next.js e TypeScript. 
              Foco em performance, integrações e resultados mensuráveis.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.button
                onClick={() => {
                  const portfolio = document.getElementById('portfolio');
                  if (portfolio) portfolio.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-2xl hover:shadow-green-500/25 transition-all duration-300 group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Projetos
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform inline" />
              </motion.button>
              
              <motion.button
                onClick={() => {
                  window.open('https://www.linkedin.com/in/seu-perfil', '_blank');
                }}
                className="bg-transparent border-2 border-green-500 hover:bg-green-500/10 text-green-400 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                LinkedIn
                <ExternalLink className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform inline" />
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 gap-6 pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {stats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <IconComponent className="w-6 h-6 text-green-400 mr-2" />
                      <span className="text-3xl font-bold text-white">
                        <CountUp end={parseInt(stat.number.replace(/[^\d]/g, ''))} duration={2} delay={1.5 + index * 0.2} />
                        {stat.number.includes('%') ? '%' : stat.number.includes('M') ? 'M+' : '+'}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Elements */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Main Terminal Window */}
            <motion.div 
              className="relative bg-black/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-green-500/30 overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between p-4 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-green-400 text-sm font-mono">Uixweb Terminal</div>
              </div>

              {/* Terminal Content */}
              <div className="p-6 space-y-4">
                <motion.div 
                  className="text-green-400 font-mono text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2 }}
                >
                  <div className="flex items-center mb-2">
                    <span className="text-emerald-400">$</span>
                    <span className="ml-2">npm create uixweb-app</span>
                  </div>
                  <div className="text-gray-300 text-xs">
                    ✓ Instalando dependências...<br/>
                    ✓ Configurando ambiente...<br/>
                    ✓ Criando estrutura do projeto...<br/>
                    ✓ Aplicando otimizações...<br/>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-green-500/10 border border-green-500/30 rounded-lg p-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 2.5 }}
                >
                  <div className="text-green-400 text-sm font-mono mb-2">🚀 Projeto iniciado com sucesso!</div>
                  <div className="text-gray-300 text-xs">
                    Performance: 98%<br/>
                    Tempo de carregamento: 2.3s<br/>
                    SEO Score: 95/100
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div 
              className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Code className="w-8 h-8 text-white" />
            </motion.div>

            <motion.div 
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg"
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Terminal className="w-6 h-6 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
      `}</style>
    </section>
  )
}

export default Hero