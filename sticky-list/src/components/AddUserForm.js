import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice'
import { v4 as uuidv4 } from 'uuid';

const AddUserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("name-->",name)
    console.log("email-->",email)
    const newErrors = {};
    if (!name) {
        console.log("name is required");
        newErrors.name = 'Name is required';
    }
    if (!email) {
        console.log("email is required");
        newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Email is invalid';
    }
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }
    dispatch(addUser({ id: uuidv4(), name, email }));
    setName('');
    setEmail('');
    setErrors({ ...errors, name: '', email: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        width: '200px',
        margin: '0 auto',
    }}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        style={{
            marginBottom: '10px',
            
        }}
      />
         {errors.name && <p>{errors.name}</p>}
         <input
  type="email"
  value={email}
  onChange={(e) => 
setEmail(e.target.value)
    
  }
  placeholder="Email"
  style={{
    marginBottom: '10px',
  }}
/>
{errors.email && <p>{errors.email}</p>}
      <button type="submit" style={{
            padding: '5px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
      }}
      >Add User</button>
    </form>
  );
};

export default AddUserForm;
