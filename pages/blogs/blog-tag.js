import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Navbar from "@/components/Layout/Navigations/Navbar1";
import TagsPost from "@/components/Blog/TagsPost";
import FooterTwo from "@/components/Layout/Footer/FooterTwo";
import Link from "next/link";

const BlogTags = () => {
  return (
    <>
      <PageTitle page="Tags" />
      <Navbar />
      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <h1>Tag: Technology</h1>
            <ul>
              <li>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li>
                <Link href="/blogs/blog-grid">
                  <a>Blog</a>
                </Link>
              </li>
              <li>Technology</li>
            </ul>
          </div>
        </div>
      </div>
      <TagsPost />
      <FooterTwo />
    </>
  );
};

export default BlogTags;
