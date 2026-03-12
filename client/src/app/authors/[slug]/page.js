import React from "react";
import AuthorsPostPage from "@/app/components/AuthorsPostPage";

const page = async ({ params }) => {
  const { slug } = await params;
  console.log(slug);

  return (
    <div>
      <AuthorsPostPage slug={slug} />
    </div>
  );
};

export default page;
