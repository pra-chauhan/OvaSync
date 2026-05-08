import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { Input } from '@/components/ui/input';
import { Search, BookOpen, PlayCircle } from 'lucide-react';



const ARTICLES = [
  {
    id: 1,
    title: "What is PCOS? Complete Beginner Guide",
    description: "Understand symptoms, causes, and how it affects your body.",
    category: "Basics",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309",
    readTime: "5 min",
    type: "article",
    content: "PCOS (Polycystic Ovary Syndrome) is a hormonal disorder...",
  },
  {
    id: 2,
    title: "Best Diet for PCOS",
    description: "Foods that help balance hormones naturally.",
    category: "Diet",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
    readTime: "4 min",
    type: "article",
    content: "A low glycemic index diet helps manage insulin levels...",
  },
  {
    id: 3,
    title: "Yoga for PCOS (Follow Along)",
    description: "Simple yoga routine to reduce stress and regulate hormones.",
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3",
    readTime: "Video",
    type: "video",
    videoUrl: "https://www.youtube.com/embed/4pKly2JojMw",
  },
];



const EducationPage = () => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<any>(null);



  const filtered = ARTICLES.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">

      {/* HEADER */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display text-foreground flex items-center gap-2">
          <BookOpen className="text-primary" size={24} />
          PCOS Education Hub
        </h1>
        <p className="text-sm text-muted-foreground">
          Learn, understand, and take control of your health 🌸
        </p>
      </motion.div>

      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-3 top-3 text-muted-foreground" size={16} />
        <Input
          placeholder="Search articles, diet, yoga..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* ARTICLES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelected(item)}
            className="cursor-pointer"
          >
            <GlassCard className="overflow-hidden">
              {/* IMAGE */}
              <div className="relative h-40 overflow-hidden rounded-xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                {item.type === 'video' && (
                  <PlayCircle className="absolute inset-0 m-auto text-white" size={40} />
                )}
              </div>

              {/* CONTENT */}
              <div className="p-3">
                <p className="text-xs text-primary">{item.category}</p>
                <h3 className="font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
                <span className="text-[10px] text-muted-foreground">
                  {item.readTime}
                </span>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* MODAL VIEW */}

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

          <div className="bg-background rounded-2xl max-w-2xl w-full p-5 overflow-y-auto max-h-[90vh]">

            <button
              onClick={() => setSelected(null)}
              className="text-sm text-muted-foreground mb-3"
            >
              ← Back
            </button>

            <h2 className="text-xl font-bold mb-2">{selected.title}</h2>

            {/* VIDEO */}
            {selected.type === 'video' ? (
              <iframe
                src={selected.videoUrl}
                className="w-full h-60 rounded-lg"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src={selected.image}
                  className="w-full h-52 object-cover rounded-lg mb-3"
                />
                <p className="text-sm text-foreground leading-relaxed">
                  {selected.content}
                </p>
              </>
            )}

          </div>
        </div>
      )}

      
      <GlassCard className="border-l-4 border-primary">
        <p className="text-xs text-primary font-semibold mb-1">
          🤖 CHATBOT Coming Soon
        </p>
        <p className="text-sm text-foreground">
          Ask questions like "What foods help PCOS?" and get instant AI guidance.
        </p>
      </GlassCard>

    </div>
  );
};

export default EducationPage;