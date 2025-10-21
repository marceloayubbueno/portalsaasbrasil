import Header from '@/components/ecommerce/Header'
import Footer from '@/components/ecommerce/Footer'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}



