"use client";

import DocumentEditor from '@/components/DocumentEditor/Editor';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Gerador de Propostas - Crie Propostas Profissionais em PDF</title>
        <meta name="description" content="Gerador de propostas profissionais em PDF para corretores de saúde. Crie documentos personalizados com marca d'água, logos e formatação profissional." />
        <meta name="keywords" content="gerador de propostas, PDF profissional, corretores de saúde, propostas comerciais, documentos personalizados" />
        <meta property="og:title" content="Gerador de Propostas - Crie Propostas Profissionais em PDF" />
        <meta property="og:description" content="Gerador de propostas profissionais em PDF para corretores de saúde. Sistema completo para propostas de parceria." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gerador de Propostas - Crie Propostas Profissionais em PDF" />
        <meta name="twitter:description" content="Gerador de propostas profissionais em PDF para corretores de saúde." />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <DocumentEditor />
      </main>
    </>
  );
}
