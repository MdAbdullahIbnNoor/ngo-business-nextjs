'use client';

import { useState } from 'react';

const categories = ['All', 'Impact Story', 'Education', 'Sustainability', 'Health', 'News'];

export default function BlogFilters({ onFilterChange }: { onFilterChange: (cat: string) => void }) {
    const [active, setActive] = useState('All');

    const handleSelect = (cat: string) => {
        setActive(cat);
        onFilterChange(cat);
    };

    return (
        <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => handleSelect(cat)}
                    className={`rounded-full px-6 py-2 text-sm font-bold transition-all ${active === cat
                        ? 'bg-primary text-white shadow-lg shadow-primary/25'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}