// src/components/MultiStepForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice'

const MultiStepForm = () => {

  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
  
    if (step === 1 && !formData.name) {
      newErrors.name = 'Name is required';
    }
  
    if (step === 2) {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return newErrors;
  }
    return newErrors;
  };
  

  const handleNext = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
        console.log("line 29",newErrors)
      setStep(step + 1);
      console.log('No errors, moving to next step',step);
    } else {
      setErrors(newErrors);
    }
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    dispatch(addUser({ id: Date.now(), ...formData }));
    alert('User added successfully!');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <h2>Step 1: Enter Name</h2>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          {errors.name && <p>{errors.name}</p>}
          <button onClick={handleNext}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2>Step 2: Enter Email</h2>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          {errors.email && <p>{errors.email}</p>}
          <button onClick={() => setStep(step - 1)}>Back</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
