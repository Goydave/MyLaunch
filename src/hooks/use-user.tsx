
"use client";

import * as React from "react";

export type User = {
  name: string;
  email: string;
  avatar: string;
};

type UserProviderState = {
  user: User;
  setUser: (user: User) => void;
};

const initialState: UserProviderState = {
  user: {
    name: "David Paulino",
    email: "david.paulino@example.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  setUser: () => null,
};

const UserProviderContext = React.createContext<UserProviderState>(initialState);

export function UserProvider({
  children,
  storageKey = "mylaunch-user",
}: {
  children: React.ReactNode;
  storageKey?: string;
}) {
  const [user, setUser] = React.useState<User>(() => {
    if (typeof window !== "undefined") {
      try {
        const item = localStorage.getItem(storageKey);
        return item ? JSON.parse(item) : initialState.user;
      } catch (error) {
        console.error("Error reading user from localStorage", error);
        return initialState.user;
      }
    }
    return initialState.user;
  });

  const value = {
    user,
    setUser: (user: User) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, JSON.stringify(user));
      }
      setUser(user);
    },
  };

  return (
    <UserProviderContext.Provider value={value}>
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
