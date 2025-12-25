'use client';

import Link from 'next/link';
import { Wrench, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { tools } from '@/app/tools';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const imageTools = tools.filter(t => t.category === 'Image');
  const pdfTools = tools.filter(t => t.category === 'PDF');
  const otherTools = tools.filter(t => t.category !== 'Image' && t.category !== 'PDF');

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/95 dark:bg-slate-950/95 backdrop-blur supports-backdrop-filter:bg-white/60 dark:supports-backdrop-filter:bg-slate-950/60 shadow-sm">
      <div className="container mx-auto px-4">
        {/* Main nav bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-1.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg group-hover:shadow-lg transition-all">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900 dark:text-white">Tools Herd</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Free Online Tools</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Home
            </Link>
            
            {/* Tools Dropdown */}
            <div className="group relative">
              <button className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2">
                Tools
              </button>
              <div className="absolute left-0 mt-0 w-64 bg-white dark:bg-slate-900 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2">
                {imageTools.length > 0 && (
                  <>
                    <p className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Image Tools</p>
                    {imageTools.map(tool => (
                      <Link key={tool.id} href={tool.path} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors">
                        {tool.name}
                      </Link>
                    ))}
                  </>
                )}
                {pdfTools.length > 0 && (
                  <>
                    <p className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-2">PDF Tools</p>
                    {pdfTools.map(tool => (
                      <Link key={tool.id} href={tool.path} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors">
                        {tool.name}
                      </Link>
                    ))}
                  </>
                )}
                {otherTools.length > 0 && (
                  <>
                    <p className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-2">Other Tools</p>
                    {otherTools.map(tool => (
                      <Link key={tool.id} href={tool.path} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors">
                        {tool.name}
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </div>

            <Link href="#about" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              About
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-700">
            <Link href="/" className="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600">
              Home
            </Link>
            <div className="px-4 py-2">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Image Tools</p>
              {imageTools.map(tool => (
                <Link key={tool.id} href={tool.path} className="block text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 py-1">
                  {tool.name}
                </Link>
              ))}
            </div>
            <div className="px-4 py-2">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">PDF Tools</p>
              {pdfTools.map(tool => (
                <Link key={tool.id} href={tool.path} className="block text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 py-1">
                  {tool.name}
                </Link>
              ))}
            </div>
            {otherTools.length > 0 && (
              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Other Tools</p>
                {otherTools.map(tool => (
                  <Link key={tool.id} href={tool.path} className="block text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 py-1">
                    {tool.name}
                  </Link>
                ))}
              </div>
            )}
            <Link href="#about" className="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600">
              About
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
