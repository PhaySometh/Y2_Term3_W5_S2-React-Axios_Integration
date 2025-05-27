import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

export default function ArticleForm() {
  const [form, setForm] = useState({
    title: '',
    content: '',
    journalistId: '',
    categoryId: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form data
    if (!form.title || !form.content || !form.journalistId || !form.categoryId) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/articles', form);
      console.log('Article added successfully:', form);
      setForm({
        title: '',
        content: '',
        journalistId: '',
        categoryId: '',
      });
      alert('Article added successfully!');
    } catch (err) {
      alert('Failed to add article.');
    }
  };

  return (

    <div>
      {/* Navigation Links */}
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>📄 View Articles</Link>
        <Link to="/add"> ➕ Add Article</Link>
      </nav>

      <h2>Articles</h2>
      <form onSubmit={handleSubmit}>
        <h3>Add New Article</h3>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required /><br />
        <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" required /><br />
        {/* add type='Number' to not allow user input text in id field */}
        <input name="journalistId" value={form.journalistId} onChange={handleChange} placeholder="Journalist ID" type='Number' required /><br />
        <input name="categoryId" value={form.categoryId} onChange={handleChange} placeholder="Category ID" type='Number' required /><br />
        <button type="submit">Add</button>
      </form>

    </div>
  );
}
