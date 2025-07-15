
"use client";

import * as React from "react";
import { auth } from "@/lib/firebase";
import type { User as FirebaseUser } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";

export type User = {
  uid: string;
  name: string | null;
  email: string | null;
  avatar: string | null;
};

type UserProviderState = {
  user: User | null;
  loading: boolean;
};

const initialState: UserProviderState = {
  user: null,
  loading: true,
};

const UserProviderContext = React.createContext<UserProviderState>(initialState);

export function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = React.useState<UserProviderState>(initialState);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const formattedUser: User = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          avatar: firebaseUser.photoURL,
        };
        setState({ user: formattedUser, loading: false });
      } else {
        setState({ user: null, loading: false });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserProviderContext.Provider value={state}>
      {children}
    </UserProviderContext.Provider>
  );
}

export const useUser = () => {
  const context = React.useContext(UserProviderContext);

  if (context === undefined)
    throw new Error("useUser must be used within a UserProvider");

  return context;
};
