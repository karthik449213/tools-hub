import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tool } from '@/types/tool';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const IconComponent = tool.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Link href={tool.path}>
        <Card className="h-full cursor-pointer transition-shadow hover:shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <IconComponent className="h-6 w-6" />
              <CardTitle className="text-lg">{tool.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>{tool.description}</CardDescription>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
