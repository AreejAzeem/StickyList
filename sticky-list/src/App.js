import React, { useState, useEffect } from "react";
import axios from "axios";
import ListHeader from "./components/ListHeader";
import ListFooter from "./components/ListFooter";
import UserList from "./components/UserList";
 import AddUserForm from './components/AddUserForm';
import MultiStepForm from "./components/MultiStepForm";
// import { Router, Routes } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = React.useState(true);
  const [showStep, setShowStep] = React.useState(true);
  //home page
  const Home = () =><>
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
      {/* <button onClick={() => setShowStep(!showStep)}>
        {showStep? 'Hide Form' : 'Show Form'}
      </button>
      {showStep && <MultiStepForm />} */}
    </div>
      <ListFooter loading={loading} />
    </div>
  </>;
  //multi step page
  const MultiStep = () =><>
        <ListHeader />
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
     
      <button onClick={() => setShowStep(!showStep)}>
        {showStep? 'Hide Form' : 'Show Form'}
      </button>
      {showStep && <MultiStepForm />}

      <ListFooter loading={loading} />
  </>;
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
    <Router>
      <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/multi-step" element={<MultiStep />} />
    </Routes>
    </Router>

  );
};

export default App;
