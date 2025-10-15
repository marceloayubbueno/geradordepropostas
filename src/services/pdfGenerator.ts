import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

export async function generatePdfFromHtml(htmlContent: string): Promise<Buffer> {
  // Verificar se está em ambiente serverless (Vercel)
  const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;
  
  let browser;
  
  if (isServerless) {
    // Configuração para Vercel/serverless
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  } else {
    // Configuração para desenvolvimento local
    const puppeteerLocal = await import('puppeteer');
    browser = await puppeteerLocal.default.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }
  
  const page = await browser.newPage();

  // Definir viewport para desktop
  await page.setViewport({ width: 1200, height: 800 });

  // Definir conteúdo e aguardar carregamento
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  // Aguardar um pouco para garantir que tudo foi renderizado
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Gerar PDF
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
    },
  });

  await browser.close();
  return Buffer.from(pdfBuffer);
}
