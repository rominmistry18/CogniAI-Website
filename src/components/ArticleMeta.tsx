"use client";

import { Calendar, User, Clock, Edit } from "lucide-react";

interface ArticleMetaProps {
  author?: string;
  publishDate?: string;
  lastUpdated?: string;
  readTime?: string;
  showAuthor?: boolean;
  className?: string;
}

export function ArticleMeta({
  author = "Cognaium Research Team",
  publishDate,
  lastUpdated,
  readTime,
  showAuthor = true,
  className = ""
}: ArticleMetaProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`flex flex-wrap items-center gap-4 text-sm text-muted-foreground ${className}`}>
      {showAuthor && author && (
        <span className="flex items-center gap-1.5">
          <User className="w-4 h-4" />
          {author}
        </span>
      )}
      
      {publishDate && (
        <span className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          Published: {formatDate(publishDate)}
        </span>
      )}
      
      {lastUpdated && (
        <span className="flex items-center gap-1.5">
          <Edit className="w-4 h-4" />
          Updated: {formatDate(lastUpdated)}
        </span>
      )}
      
      {readTime && (
        <span className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          {readTime}
        </span>
      )}
    </div>
  );
}

// Simple footer version for end of articles
export function ArticleFooter({
  author = "Cognaium Research Team",
  lastUpdated
}: {
  author?: string;
  lastUpdated?: string;
}) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="mt-8 pt-6 border-t border-border text-sm text-muted-foreground">
      <p>
        {lastUpdated && `Last Updated: ${formatDate(lastUpdated)}`}
        {lastUpdated && author && " | "}
        {author && `Author: ${author}`}
      </p>
    </div>
  );
}
