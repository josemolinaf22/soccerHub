import { useState } from "react";
import { NewPostForm } from "~/Components/NewPostForm";
import { type NextPage } from "next";
import { api } from "~/utils/api";
import InfinitePostList from "../Components/InfinitePostList";
import { useSession } from "next-auth/react";

const TABS = ["Recent", "Following"] as const;

const Home: NextPage = () => {
  const [selectedTab, setSelectedTab] =
    useState<(typeof TABS)[number]>("Recent");

  const session = useSession();

  return (
    <>
      <header className="bg-red sticky top-0 z-10 bg-gray-900 pt-2">
        <h1 className="backdrop-blur=xl mb-2 px-4 text-center text-8xl	font-bold ">
          The Soccer Hub
        </h1>
        {session.status === "authenticated" && (
          <div className="flex">
            {TABS.map((tab) => {
              return (
                <button
                  key={tab}
                  className={`hover: flex-grow p-2 hover:bg-gray-200 hover:text-black focus-visible:bg-gray-200 ${
                    tab === selectedTab
                      ? "border-b-4 border-b-green-500 font-bold"
                      : ""
                  }`}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        )}
      </header>
      <NewPostForm />
      {selectedTab === "Recent" ? <RecentPosts /> : <FollowingPosts />}
    </>
  );
};

const RecentPosts = () => {
  const posts = api.post.infiniteFeed.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  return (
    <InfinitePostList
      posts={posts.data?.pages.flatMap((page) => page.posts)}
      isError={posts.isError}
      isLoading={posts.isLoading}
      hasMore={posts.hasNextPage}
      fetchNewPosts={posts.fetchNextPage}
    />
  );
};

const FollowingPosts = () => {
  const posts = api.post.infiniteFeed.useInfiniteQuery(
    { onlyFollowing: true },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  return (
    <InfinitePostList
      posts={posts.data?.pages.flatMap((page) => page.posts)}
      isError={posts.isError}
      isLoading={posts.isLoading}
      hasMore={posts.hasNextPage}
      fetchNewPosts={posts.fetchNextPage}
    />
  );
};

export default Home;
