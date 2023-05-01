import Metatags from '@/components/Metatags';
import AuthCheck from '@/components/AuthCheck';
import { collection, orderBy, query } from 'firebase/firestore';
import { auth, firestore } from '@/lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import PostFeed from '@/components/PostFeed';
import { PostData } from '@/index';
export default function AdminPage() {
  return (
    <main>
      <Metatags title="admin page" description="admin page" />
      <AuthCheck>
        <PostList />
        <CreateNewPost />
      </AuthCheck>
    </main>
  );
}
const PostList = () => {
  const ref = collection(
    firestore,
    'users',
    auth.currentUser?.uid as string,
    'posts'
  );
  const postQuery = query(ref, orderBy('createdAt'));
  const [querySnapshot] = useCollection(postQuery);
  const posts: PostData[] | undefined = querySnapshot?.docs.map((doc) =>
    doc.data()
  );
  return (
    <>
      <h1>Manage your Posts</h1>
      <PostFeed posts={posts} admin={true} />
    </>
  );
};
const CreateNewPost = () => {
  return <div>Create New Post</div>;
};
