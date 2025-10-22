'use client'

import Link from 'next/link'
import { Menu, X, Search, User } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              PortalSAAS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
              Home
            </Link>
            <Link href="/catalogo" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
              SAAS
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
              Blog
            </Link>
            <Link href="/sobre" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
              Sobre
            </Link>
            <Link href="/contato" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
              Contato
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link href="/saas/login">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
                Acesso SAAS
              </button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-600 hover:text-blue-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="/catalogo" className="text-gray-600 hover:text-blue-600 transition-colors">
                SAAS
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">
                Blog
              </Link>
              <Link href="/sobre" className="text-gray-600 hover:text-blue-600 transition-colors">
                Sobre
              </Link>
              <Link href="/contato" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contato
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}



