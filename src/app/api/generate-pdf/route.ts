import { NextRequest, NextResponse } from 'next/server';
import { generatePdfFromHtml } from '@/services/pdfGenerator';
import { generatePDFHTML } from '@/utils/generatePDFHTML';
import { DocumentData } from '@/types/document';

export async function POST(request: NextRequest) {
  try {
    const documentData: DocumentData = await request.json();
    
    // Gerar HTML usando função pura
    const htmlContent = generatePDFHTML(documentData);
    
    // Gerar PDF usando Puppeteer
    const pdfBuffer = await generatePdfFromHtml(htmlContent);

    // Retornar o PDF
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Proposta_${documentData.numeroProposta || 'documento'}_${new Date().getTime()}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });

  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor ao gerar PDF' },
      { status: 500 }
    );
  }
}
