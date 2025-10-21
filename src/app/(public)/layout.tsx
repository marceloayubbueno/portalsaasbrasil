'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/ecommerce/Header'
import Footer from '@/components/ecommerce/Footer'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // Páginas que não devem ter Header/Footer
  const noLayoutPages = ['/saas/login', '/saas/cadastro']
  const shouldHideLayout = noLayoutPages.includes(pathname)
  
  if (shouldHideLayout) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}



