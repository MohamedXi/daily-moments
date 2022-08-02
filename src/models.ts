import firebase from 'firebase/compat';

export interface Entry {
  id: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
  pictureUrl: string;
}

export function toEntry(
  doc: firebase.firestore.DocumentSnapshot
): Entry {
  return {
    id: doc.id,
    ...doc.data(),
  } as Entry;
}
