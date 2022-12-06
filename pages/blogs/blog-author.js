import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Navbar from "@/components/Layout/Navigations/Navbar1";
import AuthorPost from "@/components/Blog/AuthorPost";
import FooterTwo from "@/components/Layout/Footer/FooterTwo";
import Link from "next/link";

const BlogAuthor = () => {
  return (
    <>
      <PageTitle page="Author" />
      <Navbar />
      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <h1>Author: Anna Smith</h1>
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
              <li>Author</li>
            </ul>
          </div>
        </div>
      </div>
      <AuthorPost />
      <FooterTwo />
    </>
  );
};

export default BlogAuthor;
