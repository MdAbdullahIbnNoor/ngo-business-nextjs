'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import BlogFilters from './BlogFilters';

export default function BlogList({ initialPosts }: { initialPosts: any[] }) {
    const [filteredPosts, setFilteredPosts] = useState(initialPosts);

    const handleFilter = (category: string) => {
        if (category === 'All') {
            setFilteredPosts(initialPosts);
        } else {
            setFilteredPosts(initialPosts.filter(post => post.category === category));
        }
    };

    return (
        <>
            <BlogFilters onFilterChange={handleFilter} />

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post: any) => (
                        <Link
                            key={post._id}
                            href={`/blog/${post.slug}`}
                            className="group flex flex-col overflow-hidden rounded-[2rem] border bg-card transition-all hover:shadow-2xl hover:shadow-primary/5"
                        >
                            <div className="relative h-48 w-full overflow-hidden">
                                <img
                                    src={post.coverImage}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    alt={post.title}
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-1 flex-col p-8">
                                <div className="mb-4 flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(post.publishedAt).toLocaleDateString()}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" /> {post.readingTime} min read
                                    </span>
                                </div>

                                <h3 className="mb-3 text-xl font-black leading-tight text-slate-900 group-hover:text-primary transition-colors">
                                    {post.title}
                                </h3>

                                <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                                    {post.excerpt}
                                </p>

                                <div className="mt-auto flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
                                    Read Article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center">
                        <p className="text-xl font-bold text-slate-400">No stories found in this category.</p>
                    </div>
                )}
            </div>
        </>
    );
}