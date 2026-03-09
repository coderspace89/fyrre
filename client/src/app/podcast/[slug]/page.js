import React from "react";
import PodcastPostPage from "@/app/components/PodcastPostPage";

const page = async ({ params }) => {
  const { slug } = await params;
  console.log(slug);
  return (
    <div>
      <PodcastPostPage slug={slug} />
    </div>
  );
};

export default page;
