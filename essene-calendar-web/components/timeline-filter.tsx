"use client"

interface TimelineFilterProps {
  categories: Array<{ id: string; label: string; color: string }>
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
}

export default function TimelineFilter({ categories, selectedCategory, onCategoryChange }: TimelineFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          selectedCategory === null
            ? "bg-accent text-accent-foreground"
            : "bg-card text-muted-foreground hover:bg-card/80"
        }`}
      >
        All Events
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(selectedCategory === category.id ? null : category.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedCategory === category.id
              ? `${category.color} text-foreground`
              : "bg-card text-muted-foreground hover:bg-card/80"
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}
