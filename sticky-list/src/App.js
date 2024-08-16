import React, { useState, useEffect } from "react";
import axios from "axios";
import ListHeader from "./components/ListHeader";
import ListFooter from "./components/ListFooter";

const App = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.example.com/items?page=${page}`);
        setItems((prevItems) => [...prevItems, ...response.data]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
    return () => {
      axios.CancelToken.source().cancel("Operation canceled by the user.");
    };
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
      return;
    }
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div>
      <ListHeader />
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <ListFooter loading={loading} />
    </div>
  );
};

export default App;
