import NavBar from '@/components/NavBar'
import { ShoppingCartProvider } from '@/context/ShoppingCartContext'
export default function SharedLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <ShoppingCartProvider>
        {/* Include shared UI here e.g. a header or sidebar */}
        <NavBar />

        <div className=" h-24"></div>

        {children}
      </ShoppingCartProvider>

    </section>

  )
}