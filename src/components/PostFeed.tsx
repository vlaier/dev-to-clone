import Link from 'next/link';
import { PostData } from '..';
const PostFeed = ({
  posts,
  admin = false,
}: {
  posts: PostData[] | null | undefined;
  admin?: boolean;
}) => {
  return posts ? (
    <>
      {posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))}
    </>
  ) : (
    <div>No posts to display</div>
  );
};
const PostItem = ({ post, admin }: { post: PostData; admin: boolean }) => {
  // Naive method to calc word count and read time
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);
  return (
    <div className="card">
      <Link href={`/${post.username}`}>
        <strong>By @{post.username}</strong>
      </Link>
      <Link href={`/${post.username}/${post.slug}`}>
        <h2>{post.title}</h2>
      </Link>
      <footer>
        <span>
          {wordCount} words. {minutesToRead} min read
        </span>
        <span className="push-left">{post.heartCount} Hearts</span>
      </footer>
    </div>
  );
};
export default PostFeed;
