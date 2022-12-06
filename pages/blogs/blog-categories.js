import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Navbar from "@/components/Layout/Navigations/Navbar1";
import CategoriePost from "@/components/Blog/CategoriePost";
import FooterTwo from "@/components/Layout/Footer/FooterTwo";
import Link from "next/link";

const BlogCategories = () => {
  return (
    <>
      <PageTitle page="Category" />
      <Navbar />
      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <h1>Category: Startup</h1>
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
              <li>Startup</li>
            </ul>
          </div>
        </div>
      </div>
      <CategoriePost />
      <FooterTwo />
    </>
  );
};

export default BlogCategories;
