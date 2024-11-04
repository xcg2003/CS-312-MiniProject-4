import React, { useEffect, useState } from 'react';

function BlogDisplay() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then((response) => response.json())
      .then((data) => setBlogPosts(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      {blogPosts.length > 0 ? (
        blogPosts.map((post) => (
          <div key={post.id}>
            <h2>{post.name}</h2>
            <h3>{post.username}</h3>
            <p>{post.blogPost}</p>
          </div>
        ))
      ) : (
        <p>No blog posts available.</p>
      )}
    </div>
  );
}

export default BlogDisplay;
