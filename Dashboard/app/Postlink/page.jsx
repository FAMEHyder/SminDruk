"use client";

import React, { useState } from "react";
import axios from "axios";

const PostLinksTable = () => {

  const [posts, setPosts] = useState([]);
  const [secretKey, setSecretKey] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {

    if (!secretKey) {
      alert("Enter secret key");
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/api/posts",
        { secretKey }
      );

      setPosts(res.data.posts);

    } catch (err) {

      console.error(err);
      alert("Invalid secret key or server error");

    } finally {

      setLoading(false);

    }
  };

  const copyLink = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 COPY ALL LINKS
  const copyAllLinks = async () => {

    try {

      const allLinks = posts
        .map((post) => post.postLink)
        .join("\n\n");

      await navigator.clipboard.writeText(allLinks);

      alert("All links copied!");

    } catch (err) {

      console.error(err);

    }
  };

  // 🔥 avatar fallback (first letter)
  const getAvatar = (post) => {
    if (post.pageDp) {
      return (
        <img
          src={post.pageDp}
          alt="DP"
          width="40"
          height="40"
          style={{
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      );
    }

    const letter = post.pageName?.charAt(0)?.toUpperCase() || "?";

    return (
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "#333",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        {letter}
      </div>
    );
  };

  return (
    <div style={{ padding: "20px" }}>

      {/* INPUT */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>

        <input
          type="text"
          placeholder="Enter Secret Key"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          style={{ padding: "10px", width: "300px" }}
        />

        <button
          onClick={fetchPosts}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          {loading ? "Loading..." : "Get Posts"}
        </button>

        {/* 🔥 COPY ALL BUTTON */}
        <button
          onClick={copyAllLinks}
          style={{ padding: "10px 20px", cursor: "pointer" }}
          disabled={posts.length === 0}
        >
          Copy All Links
        </button>

      </div>

      {/* TABLE */}
      <table border="1" cellPadding="10" cellSpacing="0" width="100%">

        <thead>
          <tr>
            <th>Sr No</th>
            <th>Page</th>
            <th>Post Link</th>
            <th>Copy</th>
          </tr>
        </thead>

        <tbody>

          {posts.length > 0 ? (
            posts.map((post, index) => (
              <tr key={post._id}>

                {/* SR NO */}
                <td style={{ textAlign: "center" }}>
                  {index + 1}
                </td>

                {/* PAGE (DP + NAME TOGETHER) */}
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {getAvatar(post)}
                    <span>{post.pageName}</span>
                  </div>
                </td>

                {/* POST LINK */}
                <td>
                  <a href={post.postLink} target="_blank" rel="noreferrer">
                    {post.postLink}
                  </a>
                </td>

                {/* COPY */}
                <td style={{ textAlign: "center" }}>
                  <button
                    onClick={() => copyLink(post.postLink)}
                    style={{ cursor: "pointer", padding: "5px 10px" }}
                  >
                    📋
                  </button>
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                No posts found
              </td>
            </tr>
          )}

        </tbody>

      </table>
    </div>
  );
};

export default PostLinksTable;