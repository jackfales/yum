"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Spinner from './Spinner';
import Post from "./Post";

export default function LoadMore() {
  const [posts, setPosts] = useState<Object[]>([]);
  const [pagesLoaded, setPagesLoaded] = useState(0);

  /**
   * Grabs posts associated with the next page then updates the `pagesLoaded`
   * and `posts` state
   */ 
  const loadMore = async () => {
    const nextPage = pagesLoaded + 1;

    // TODO(SWE-36, Potentially): Grab posts from following users
    // Sends a request to load the next set of posts
    const payload = { "userIds": ['dtran', 'jfales', 'sfales'] };
    const res = await fetch(`http://localhost:3000/api/posts/users?page=${nextPage}&pageSize=5`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    });
    const nextPosts = (await res.json())['posts'];

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
        <Post imageUrl={post[0]} title={post[1]} createdBy={post[6]} key={index}></Post>
      ))
    }
    <div ref={ref}>
      <Spinner/>
    </div>
    </>
  )
}