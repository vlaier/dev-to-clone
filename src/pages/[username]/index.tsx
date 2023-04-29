import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import PostFeed from '@/components/PostFeed';
import UserProfile from '@/components/UserProfile';
import { firestore, getUserWithUsername, postToJSON } from '@/lib/firebase';
import {
  DocumentData,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

export default function UserPage({
  user,
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </main>
  );
}

export async function getServerSideProps({
  query: urlQuery,
}: GetServerSidePropsContext) {
  const username = urlQuery.username;
  if (typeof username !== 'string') {
    return {
      notFound: true,
    };
  }
  const userDoc = await getUserWithUsername(username);
  let user = null;
  let posts: DocumentData[] | null = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = query(
      collection(firestore, userDoc.ref.path, 'posts'),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      limit(5)
    );
    posts = (await getDocs(postsQuery)).docs.map((post) => postToJSON(post));
  }
  if (!user) {
    return {
      notFound: true,
    };
  }
  return {
    props: { user, posts },
  };
}
