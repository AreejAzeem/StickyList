import React, { useState, useEffect } from "react";
import axios from "axios";
import ListHeader from "./components/ListHeader";
import ListFooter from "./components/ListFooter";
import UserList from "./components/UserList";
 import AddUserForm from './components/AddUserForm';
import MultiStepForm from "./components/MultiStepForm";

const App = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = React.useState(true);
  const [showStep, setShowStep] = React.useState(true);
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://localhost/items?page=${page}`);
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
      <div>
      <h1>User Management System</h1>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Show Form'}
      </button>
      {showForm && <AddUserForm />}
      <UserList />
      <button onClick={() => setShowStep(!showStep)}>
        {showStep? 'Hide Form' : 'Show Form'}
      </button>
      {showStep && <MultiStepForm />}
    </div>
      <ListFooter loading={loading} />
    </div>
  );
};

export default App;
