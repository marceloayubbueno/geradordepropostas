import type { Metadata } from 'next'
import './globals.css'
import PixelAndConsentProvider from '../components/PixelAndConsentProvider';

export const metadata: Metadata = {
  title: 'Gerador de Propostas - Crie Propostas Profissionais em PDF',
  description: 'Gerador de propostas profissionais em PDF para corretores de saúde. Crie documentos personalizados com marca d\'água, logos e formatação profissional. Sistema completo para propostas de parceria.',
  keywords: 'gerador de propostas, PDF profissional, corretores de saúde, propostas comerciais, documentos personalizados, gerador de PDF, propostas de parceria, Star Life',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-0P6BBWC2L1"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0P6BBWC2L1');
          `,
        }} />
        {/* Meta Pixel será controlado por componente client-side */}
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <div className="min-h-screen bg-white">
          {children}
        </div>
        {/* <PixelAndConsentProvider /> */}
      </body>
    </html>
  )
} 