import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilter() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedJournalistId, setSelectedJournalistId] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    try {
      const res = await axios.get('http://localhost:5000/articles');
      setArticles(res.data);
    } catch (err) {
      console.log("Error fetching articles:", err);
    }
  };

  const fetchJournalists = async () => {
    // Fetch journalists from the API
    try {
      const res = await axios.get('http://localhost:5000/journalists') 
      setJournalists(res.data); 
    } catch (err) {
      console.log("Error fetching journalists:", err);
    }
  };

  const fetchCategories = async () => {
    // Fetch categories from the API
    try {
      const res = await axios.get('http://localhost:5000/categories') 
      setCategories(res.data); 
    } catch (err) {
      console.log("Error fetching categories:", err);
    }
  }

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select id="journalistFilter" onChange={(e) => setSelectedJournalistId(e.target.value)}>
          <option value="">All Journalists</option>
          {/* Options for journalists */}
          {journalists.map(j => (
            <option key={j.id} value={j.id}>
              {j.name}
            </option>
          ))}
        </select>

        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select id="categoryFilter" onChange={(e) => setSelectedCategoryId(e.target.value)}>
          <option value="">All Categories</option>
          {/* Options for categories */}
          {categories.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            // Logic to apply filters
            if(selectedJournalistId && selectedCategoryId) {
              axios.get(`http://localhost:5000/articles?journalistId=${selectedJournalistId}&categoryId=${selectedCategoryId}`)
              .then(res => setArticles(res.data))
              .catch(err => console.error("Error fetching filtered articles:", err));
            } else if(selectedJournalistId) {
              axios.get(`http://localhost:5000/journalists/${selectedJournalistId}/articles`)
              .then(res => setArticles(res.data))
            } else if(selectedCategoryId) {
              axios.get(`http://localhost:5000/categories/${selectedCategoryId}/articles`)
              .then(res => setArticles(res.data))
            } else {
              fetchArticles();
            }
          }}
        >Apply Filters</button>
        <button
          onClick={() => {
            // Logic to reset filters
            setSelectedJournalistId('');
            setSelectedCategoryId('');
            fetchArticles();
          }}
        >Reset Filters</button>
      </div>

      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}