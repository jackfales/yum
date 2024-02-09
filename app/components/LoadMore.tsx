'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Spinner from './Spinner';
import Post from './Post';
import ProfilePost from './ProfilePost';
import next from 'next';

export default function LoadMore({ isDashboard }: { isDashboard: boolean }) {
  const [posts, setPosts] = useState<any>([]);
  const [pagesLoaded, setPagesLoaded] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  /*
   * Fetches posts associated with the next page, storing the new posts in
   * 'posts' state array and incrementing the 'pagesLoaded' state counter.
   */
  const loadMorePosts = async () => {
    const nextPage = pagesLoaded + 1;
    // TODO(SWE-67): Grab posts from following users
    // Sends a request to load the next set of posts
    const payload = { userIds: ['428a9b3e-8add-4f77-9375-2a220f612d24'] };
    const res = await fetch(
      `http://localhost:3000/api/posts/users?page=${nextPage}&pageSize=5`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      },
    );

    /*
     * Convert from an array of Post arrays to an array of Post objects, also
     * omitting unneccessary post information (recipe, ingredients, tags, etc.)
     */
    let posts: any = [];
    for (const post of (await res.json())['posts']) {
      const postObj = { imageUrl: post[0], title: post[1], createdBy: post[6] };
      posts.push(postObj);
    }

    if (posts.length > 0) {
      setPosts((prevPosts: Object[]) => [...prevPosts, ...posts]);
      setPagesLoaded(nextPage);
    } else {
      setHasMorePosts(false);
    }
  };

  /*
   * Attaches an in view hook to the spinner, loading more posts when the
   * spinner is in view.
   */
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      loadMorePosts();
    }
  }, [inView]);

  return (
    <>
      {isDashboard
        ? posts.map((post, index) => (
            <Post
              imageUrl={post.imageUrl}
              title={post.title}
              createdBy={posts.createdBy}
              key={index}
            />
          ))
        : posts.map((post, index) => (
            <ProfilePost imageUrl={post.imageUrl} key={index} />
          ))}

      <div
        ref={ref}
        className={
          isDashboard ? '' : 'col-span-3 align-self-center justify-self-center'
        }
      >
        {hasMorePosts ? (
          <Spinner />
        ) : (
          <p className="mt-6 text-lg text-stone-950 text-opacity-40">
            No additional posts to show
          </p>
        )}
      </div>
    </>
  );
}
