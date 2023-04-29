import { DocumentData } from 'firebase/firestore';
import Link from 'next/link';
const PostFeed = ({ posts }: { posts: DocumentData[] | null }) => {
  return posts ? (
    <>
      {posts.map((post) => (
        <PostItem post={post} key={post.slug} />
      ))}
    </>
  ) : (
    <div>No posts to display</div>
  );
};
const PostItem = ({ post }: { post: DocumentData }) => {
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
