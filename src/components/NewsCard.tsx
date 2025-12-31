import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface NewsItem {
  title: string;
  summary: string;
  source: string;
  url: string;
  imageUrl?: string;
}

interface NewsCardProps {
  item: NewsItem;
  category: string;
}

export function NewsCard({ item, category }: NewsCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white border border-border/50 overflow-hidden hover:shadow-sharp transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row h-full">
        {item.imageUrl && (
          <div className="w-full md:w-1/3 h-48 md:h-auto relative overflow-hidden">
            <img 
              src={item.imageUrl} 
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden" />
          </div>
        )}
        
        <div className="p-6 flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs font-medium px-2 py-1 bg-secondary text-secondary-foreground uppercase tracking-wider">
                {category}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {item.source}
              </span>
            </div>
            
            <h3 className="font-serif text-xl md:text-2xl font-bold leading-tight mb-3 text-foreground group-hover:text-primary transition-colors">
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                {item.title}
              </a>
            </h3>
            
            <p className="text-muted-foreground leading-relaxed line-clamp-3">
              {item.summary}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-primary flex items-center text-sm font-medium">
              Read source <ArrowUpRight className="ml-1 w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
