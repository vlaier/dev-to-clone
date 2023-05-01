import PostContent from '@/components/PostContent';
import { PostData } from '@/index';
import { firestore, getUserWithUsername, postToJSON } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useCollectionData } from 'react-firebase-hooks/firestore';
export default function Post(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const postRef = collection(firestore, props.path as string, 'posts');
  const [realtimePost] = useCollectionData(postRef);
  const post = (realtimePost as PostData) || props.post;

  return (
    <main>
      <section>
        <PostContent post={post as PostData} />
      </section>
      <aside className="card">
        <p>
          <strong>{post?.heartCount || 0} 🤍</strong>
        </p>
      </aside>
    </main>
  );
}
export async function getStaticProps({ params }: GetStaticPropsContext) {
  const { username, slug } = params!;
  if (typeof username !== 'string' || typeof slug !== 'string') {
    return {
      notFound: true,
    };
  }
  const userDoc = await getUserWithUsername(username);
  let post: PostData | null = null;
  let path;
  if (userDoc) {
    const postRef = collection(userDoc.ref, 'posts');
    const postQuery = query(postRef, where('slug', '==', slug));
    try {
      post = postToJSON((await getDocs(postQuery)).docs[0]);
    } catch (err) {
      return {
        notFound: true,
      };
    }

    path = postRef.path;
  }
  return {
    props: { post, path },
    revalidate: 5000,
  };
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
