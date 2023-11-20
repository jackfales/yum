"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Spinner from './Spinner';
import Post from "./Post";
import fetchPosts from "../utils/fetchPosts"

/* TODO: Instead of passing in postData as a Prop to this component, this component
 * should call an API route that returns the posts.
 */
export default function LoadMore({postsData}: {postsData: Object[]}) {
  const [posts, setPosts] = useState<Object[]>([]);
  const [pagesLoaded, setPagesLoaded] = useState(0);

  const loadMore = () => {
    const nextPage = pagesLoaded + 1;
    const nextPosts = fetchPosts(nextPage, postsData) ?? [];
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