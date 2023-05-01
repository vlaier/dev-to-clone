import Link from 'next/link';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { PostData } from '..';

const PostContent = ({ post }: { post: PostData }) => {
  const createdAt =
    typeof post?.createdAt === 'number'
      ? new Date(post.createdAt)
      : post.createdAt.toDate();
  return (
    <div className="card">
      <h1>{post?.title}</h1>
      <span className="text-sm">
        Written by{' '}
        <Link href={`/${post.username}`} className="text-info">
          @{post.username}
        </Link>{' '}
        on {createdAt.toISOString()}
      </span>
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </div>
  );
};

export default PostContent;