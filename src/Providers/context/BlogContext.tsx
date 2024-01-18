"use client";

import { ReactNode, SetStateAction, createContext, useState } from "react";

interface BlogContextProps {
  blogData: Blog[];
  setBlogData: React.Dispatch<SetStateAction<Blog[] | undefined>>;
}

export const BlogContext = createContext<any>({

});

export function BlogContextProvider({ children }: { children: ReactNode }) {
  const [blogData, setBlogData] = useState<Blog[] | undefined>(undefined);

  return (
    <BlogContext.Provider
      value={{
        blogData,
        setBlogData,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}
