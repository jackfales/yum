"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Spinner from './Spinner';
import Post from "./Post";

/*TODO: Instead of passing in postData as a Prop to this component, this comp.
 * should call an API route that returns the posts.
 */
export default function LoadMore({postsData}: {postsData: Object[]}) {
  // This state keeps track of post data
  const [posts, setPosts] = useState<Object[]>([]);
  // This state keeps track of what page we are on
  const [pagesLoaded, setPagesLoaded] = useState(0);

  function fetchPosts(page: number): Object[] {
    const perPage = 5;
    const posts = postsData.slice(perPage * page, perPage * page + perPage);
    return posts;
  }

  const loadMore = () => {
    const nextPage = pagesLoaded + 1;
    const nextPosts = fetchPosts(nextPage) ?? [];
    setPosts((prevPosts: Object[]) => [...prevPosts, ...nextPosts]);
    setPagesLoaded(nextPage);
  }

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      console.log("Spinner in view");
      loadMore();
    }
  }, [inView]);

  return (<>
    {
      posts.map((post, index) => (
        <Post name={post['name']} key={index}></Post>
      ))
    }
    <div ref={ref}>
      <Spinner/>
    </div>
    </>
  )
}