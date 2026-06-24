"use client";

import React, { useState, useRef } from "react";
import axios from "axios";
import { useAuthStore } from "@/StateManagment/Zustand";

const FacebookPosts = () => {
  const { user } = useAuthStore();
  const userId = user?._id;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pageName, setPageName] = useState("");
  const [after, setAfter] = useState(null);

  const loaderRef = useRef(null);

  // 🔥 ONLY BUTTON TRIGGERED FETCH
  const fetchPosts = async (reset = false) => {
    if (!userId) return;

    if (!pageName.trim()) {
      alert("Please enter page name first");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:8000/api/page-posts",
        {
          params: {
            userId,
            pageName: pageName.trim(), // 🔥 STRICT FILTER
            after: reset ? null : after,
          },
        }
      );

      const newPosts = res.data.posts || [];

      setPosts((prev) =>
        reset ? newPosts : [...prev, ...newPosts]
      );

      setAfter(res.data.paging?.cursors?.after || null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ❌ REMOVED AUTO FETCH useEffect (THIS WAS THE BUG)

  // 🔥 SEARCH BUTTON
  const handleSearch = () => {
    setAfter(null);
    setPosts([]); // clean previous posts
    fetchPosts(true);
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
      <h2>Social Feed</h2>

      {/* INPUT */}
      <input
        value={pageName}
        onChange={(e) => setPageName(e.target.value)}
        placeholder="Enter page name..."
        style={{ width: "100%", padding: 10 }}
      />

      <button onClick={handleSearch} style={{ marginTop: 10 }}>
        Get Posts
      </button>

      {/* POSTS */}
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #ddd",
            marginTop: 15,
            padding: 10,
          }}
        >
          {post.full_picture && (
            <img src={post.full_picture} style={{ width: "100%" }} />
          )}

          <p>{post.message}</p>

          <div style={{ fontSize: 12, color: "gray" }}>
            👍 {post.likes?.summary?.total_count || 0} | 💬{" "}
            {post.comments?.summary?.total_count || 0} | 🔁{" "}
            {post.shares?.count || 0}
          </div>

          <small>
            {new Date(post.created_time).toLocaleString()}
          </small>
        </div>
      ))}

      <div ref={loaderRef} style={{ height: 50 }}>
        {loading && "Loading..."}
      </div>
    </div>
  );
};

export default FacebookPosts;