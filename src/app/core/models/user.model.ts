import { User as FirebaseUser } from "firebase/auth";

export interface User {
    uid: string;
    email: string;
}

export function fromFirebaseUser(firebaseUser: FirebaseUser | null): User | null {
    if (firebaseUser == null) return null;
    return {
        uid: firebaseUser.uid,
        email: firebaseUser.email ?? '',
    };
}