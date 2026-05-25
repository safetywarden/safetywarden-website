import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight, Tag } from 'lucide-react';
import { BlogPost } from '../../types/blog';

interface PostCardProps {
  post: BlogPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full">
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            loading="lazy"
            decoding="async"
            width={900}
            height={506}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1 bg-orange-600 text-white text-sm font-semibold rounded-full">
              {post.category}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{post.readingTime} min read</span>
          </div>
        </div>

        <Link to={`/blog/${post.slug}`}>
          <h3 className="text-xl font-bold text-slate-900 mb-3 hover:text-orange-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <p className="text-slate-600 mb-4 line-clamp-2 flex-grow">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <Link
                key={tag}
                to={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded transition-colors"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </Link>
            ))}
          </div>

          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 font-semibold text-sm transition-colors"
          >
            Read more
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
