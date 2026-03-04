import React from "react";
import MagazinePostPage from "@/app/components/MagazinePostPage";

const page = async ({ params }) => {
  const { slug } = await params;
  console.log(slug);
  return (
    <div>
      <MagazinePostPage slug={slug} />
    </div>
  );
};

export default page;
