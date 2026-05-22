import React from 'react';
import { BlogPost } from '../../types/blog';
import PostCard from './PostCard';

interface RelatedPostsProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ currentPost, allPosts }) => {
  const relatedPosts = allPosts
    .filter(post => post.slug !== currentPost.slug)
    .filter(post =>
      post.category === currentPost.category ||
      post.tags.some(tag => currentPost.tags.includes(tag))
    )
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-16 border-t border-slate-200">
      <h2 className="text-3xl font-bold text-slate-900 mb-8">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedPosts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
