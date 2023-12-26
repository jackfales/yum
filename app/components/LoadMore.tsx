"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Spinner from './Spinner';
import Post from "./Post";
// TODO: Remove import after implementing route handler
import fetchPosts from "../utils/fetchPosts"

/* TODO: Once graphDB is implemented, this function should call a Route Handler
 * instead of using static postsData prop.
 */
export default function LoadMore({postsData}: {postsData: Object[]}) {
  const [posts, setPosts] = useState<Object[]>([]);
  const [pagesLoaded, setPagesLoaded] = useState(0);

  // TODO: Call to Route handler instead of `fetchPosts`
  /**
   * Grabs posts associated with the next page then updates the `pagesLoaded`
   * and `posts` state
   */ 
  const loadMore = () => {
    const nextPage = pagesLoaded + 1;
    const nextPosts = fetchPosts(nextPage, postsData) ?? [];
    setPosts((prevPosts: Object[]) => [...prevPosts, ...nextPosts]);
    setPagesLoaded(nextPage);
  }

  /* 
   * Attaches an in view hook to the spinner, loading more posts when the
   * spinner is in view.
   */
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
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