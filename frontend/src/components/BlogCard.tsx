import React from "react";
import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id:string
}

export const BlogCard: React.FC<BlogCardProps> = ({
  authorName,
  title,
  content,
  publishedDate,
  id
}: BlogCardProps) => {
  return (<Link
  to={`/blog/${id}`}
  >
    <div className="cursor-pointer w-full max-w-screen-md mx-auto py-8">
      <div className="flex items-center mb-4">
        <Avatar name={authorName} />
        <div className="ml-2">
          <div className="font-extralight">{authorName}</div>
          <div className="font-thin">{publishedDate}</div>
        </div>
      </div>
      <div className="font-semibold text-xl mb-2">{title}</div>
      <div className="text-lg italic mb-2">{content.slice(0, 100) + "..."}</div>
      <div className="border-b-2 w-full border-red-200">{`${Math.ceil(
        content.length / 100
      )} minutes read`}</div>
    </div>
    </Link>
  );
};

interface AvatarProps {
  name: string;
}

export const Avatar: React.FC<AvatarProps> = ({ name }: AvatarProps) => {
  return (
    <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-400">
      <span className="text-gray-900 dark:text-gray-900">{name[0]}</span>
    </div>
  );
};

