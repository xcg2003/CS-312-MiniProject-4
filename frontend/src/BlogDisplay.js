import React, { useEffect, useState } from 'react';

function BlogDisplay() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editContent, setEditContent] = useState("");

  // Fetch posts from the server
  useEffect(() => {
    fetch('/api/posts')
      .then((response) => response.json())
      .then((data) => setBlogPosts(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  console.log("Current blog posts in render:", blogPosts);


  // Handle delete action
  const handleDelete = (id) => {
    fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        // Update state to remove deleted post
        setBlogPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      })
      .catch((error) => console.error('Error:', error));
  };

  // Handle edit action
  const handleEdit = (id) => {
    const post = blogPosts.find((post) => post.id === id);
    setIsEditing(id);
    setEditContent(post.blogPost);
  };

  // Handle save after editing
  const handleSave = (id) => {
    fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blogPost: editContent }),
    })
      .then((response) => response.json())
      .then((updatedPost) => {
        
        setBlogPosts((prevPosts) =>
          prevPosts.map((post) => (post.id === id ? updatedPost : post))
        );
        setIsEditing(null);
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Blog Posts</h1>
      {blogPosts.length > 0 ? (
        blogPosts.map((post) => (
          <div key={`${post.id}-${post.username}-${post.name}`}>
            <h2>{post.name}</h2>
            <h3>{post.username}</h3>
            {isEditing === post.id ? (
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
            ) : (
              <p>{post.blogPost}</p>
            )}
            <button onClick={() => handleDelete(post.id)}>Delete</button>
            {isEditing === post.id ? (
              <button onClick={() => handleSave(post.id)}>Save</button>
            ) : (
              <button onClick={() => handleEdit(post.id)}>Edit</button>
            )}
          </div>
        ))
      ) : (
        <p>No blog posts available.</p>
      )}
    </div>
  );
}

export default BlogDisplay;
