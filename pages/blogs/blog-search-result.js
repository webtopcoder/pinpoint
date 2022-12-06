import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Navbar from "@/components/Layout/Navigations/Navbar1";
import SearchResultPost from "@/components/Blog/SearchResultPost";
import FooterTwo from "@/components/Layout/Footer/FooterTwo";
import Link from "next/link";

const BlogSearchResult = () => {
  return (
    <>
      <PageTitle page="Search result" />
      <Navbar />
      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <h1>Search result for: Design</h1>
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
              <li>Design</li>
            </ul>
          </div>
        </div>
      </div>
      <SearchResultPost />
      <FooterTwo />
    </>
  );
};

export default BlogSearchResult;
