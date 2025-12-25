'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import ToolCard from '@/components/ToolCard';
import { tools } from '@/app/tools';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const filteredTools = useMemo(() => {
    return tools.filter(tool =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Tools Herd",
            "description": "Free online converter tools for images, PDFs, and videos",
            "url": "https://toolsherd.in",
            "applicationCategory": "Utility",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "USD",
              "price": "0",
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "1000",
            },
          }),
        }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
          Tools Herd: Free Online Conversion Tools
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-4">
          Convert, Compress & Organize Images, PDFs & Videos Instantly
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
          100% client-side processing. No signup required. No limits. Completely secure and private.
        </p>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          <select
            onChange={(e) => router.push(e.target.value)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            defaultValue=""
            aria-label="Select a tool"
          >
            <option value="" disabled>Select a tool...</option>
            {tools.map((tool) => (
              <option key={tool.id} value={tool.path}>
                {tool.name}
              </option>
            ))}
          </select>
          {tools.slice(0, 4).map((tool) => (
            <Link
              key={tool.id}
              href={tool.path}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm md:text-base"
            >
              {tool.name}
            </Link>
          ))}
        </motion.div>

        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search tools... (e.g., compress, convert, PDF)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            aria-label="Search tools"
          />
        </div>
      </motion.div>

      {/* Featured Tools Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Popular Tools</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Choose from our collection of free online conversion and compression tools</p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredTools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ToolCard tool={tool} />
          </motion.div>
        ))}
      </motion.div>

      {filteredTools.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-muted-foreground">No tools found matching your search.</p>
        </motion.div>
      )}
    </div>
  );
}
