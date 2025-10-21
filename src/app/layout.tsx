import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Portal SAAS Brasil - Encontre a Solução Ideal para Seu Negócio',
  description: 'Descubra, compare e conecte-se com as melhores empresas SAAS do mercado brasileiro. Encontre soluções em nuvem, automação, marketing digital e muito mais.',
  keywords: 'saas, software as a service, soluções em nuvem, automação, marketing digital, crm, erp, gestão empresarial, tecnologia, inovação, startups',
  openGraph: {
    title: 'Portal SAAS Brasil - Encontre a Solução Ideal para Seu Negócio',
    description: 'Descubra, compare e conecte-se com as melhores empresas SAAS do mercado brasileiro. Encontre soluções em nuvem, automação, marketing digital e muito mais.',
    url: 'https://portalsaasbrasil.vercel.app',
    siteName: 'Portal SAAS Brasil',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portal SAAS Brasil - Encontre a Solução Ideal para Seu Negócio',
    description: 'Descubra, compare e conecte-se com as melhores empresas SAAS do mercado brasileiro.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        <div className="min-h-screen bg-white">
          {children}
        </div>
      </body>
    </html>
  )
}


