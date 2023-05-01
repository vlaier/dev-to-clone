import Loader from '@/components/Loader';
import { firestore, postToJSON } from '@/lib/firebase';
import {
  Timestamp,
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { InferGetStaticPropsType } from 'next';
import toast from 'react-hot-toast';
import { useState } from 'react';
import PostFeed from '@/components/PostFeed';
export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);
  const getMorePosts = async () => {
    setLoading(true);

    const last = posts[posts.length - 1];
    const cursor =
      typeof last.createdAt === 'number'
        ? Timestamp.fromMillis(last.createdAt)
        : last.createdAt;
    const postsQuery = query(
      collectionGroup(firestore, 'posts'),
      where('published', '==', true),
      startAfter(cursor),
      orderBy('createdAt', 'desc'),
      limit(LIMIT)
    );
    const newPosts = (await getDocs(postsQuery)).docs.map((post) =>
      postToJSON(post)
    );
    setPosts((posts) => [...posts, ...newPosts]);
    setLoading(false);
    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };
  return (
    <main>
      <PostFeed posts={posts} />
      {!loading && !postsEnd && (
        <button onClick={getMorePosts}>Load more</button>
      )}
      <Loader show={loading} />
      {postsEnd && <p>You have reached the end!</p>}
    </main>
  );
}
const LIMIT = 5;
export async function getStaticProps() {
  const postsQuery = query(
    collectionGroup(firestore, 'posts'),
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(LIMIT)
  );
  const posts = (await getDocs(postsQuery)).docs.map((post) =>
    postToJSON(post)
  );
  return {
    props: { posts },
  };
}
