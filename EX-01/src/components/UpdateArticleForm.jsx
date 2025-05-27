import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function UpdateArticleForm() {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: '',
    content: '',
    journalistId: '',
    categoryId: '',
  });


  // Fetch to prefill a form and update an existing article
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/articles/${id}`);
        setForm(response.data);
      } catch (err) {
        alert('Failed to fetch article for update.');
      }
    }

    fetchArticle();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update article with axios
    try {
      await axios.put(`http://localhost:5000/articles/${id}`, form);
      setForm({
        title: '',
        content: '',
        journalistId: '',
        categoryId: '',
      });
      alert('Article updated successfully!');
    } catch (err) {
      alert('Failed to update article.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Article</h3>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required /><br />
      <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" required /><br />
      {/* add type='Number' to not allow user input text in id field */}
      <input name="journalistId" value={form.journalistId} onChange={handleChange} placeholder="Journalist ID" type='Number' required /><br />
      <input name="categoryId" value={form.categoryId} onChange={handleChange} placeholder="Category ID" type='Number' required /><br />
      <button type="submit">Update</button>
    </form>
  );
}
