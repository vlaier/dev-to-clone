import { DocumentData } from 'firebase/firestore';

interface PostData extends DocumentData {
  heartCount?: number;
}
