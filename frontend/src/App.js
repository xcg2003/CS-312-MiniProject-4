import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BlogForm from './BlogForm'; 
import BlogDisplay from './BlogDisplay'; 

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/posts">Add Blog Post</Link>
          <Link to="/viewPosts">View Blog Posts</Link>
        </nav>
        
        <Routes>
          <Route path="/posts" element={<BlogForm />} />
          <Route path="/viewPosts" element={<BlogDisplay />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
