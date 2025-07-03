import React, { useState } from 'react';

function App() {
  // Form state
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    diners: 1,
    firstName: '',
    lastName: '',
    contact: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Validate form fields
  const validate = () => {
    let tempErrors = {};

    if (!formData.date) tempErrors.date = 'Date is required';
    if (!formData.time) tempErrors.time = 'Time is required';
    if (!formData.diners || formData.diners < 1) tempErrors.diners = 'Number of diners must be at least 1';
    if (!formData.firstName) tempErrors.firstName = 'First name is required';
    if (!formData.lastName) tempErrors.lastName = 'Last name is required';
    if (!formData.contact) tempErrors.contact = 'Contact info is required';
    else {
      // Simple email/phone check
      const contactRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$|^\d{10,}$/;
      if (!contactRegex.test(formData.contact)) tempErrors.contact = 'Enter valid email or phone';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  // Update form data on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
        <h2>Booking Confirmed!</h2>
        <p>
          Thank you, {formData.firstName} {formData.lastName}. Your table for {formData.diners} on {formData.date} at {formData.time} has been booked.
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Book a Table - Little Lemon</h1>
      <form onSubmit={handleSubmit} noValidate>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          aria-describedby="date-error"
          required
        />
        {errors.date && <p id="date-error" style={{ color: 'red' }}>{errors.date}</p>}

        <label>Time:</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          aria-describedby="time-error"
          required
        />
        {errors.time && <p id="time-error" style={{ color: 'red' }}>{errors.time}</p>}

        <label>Number of diners:</label>
        <input
          type="number"
          name="diners"
          min="1"
          value={formData.diners}
          onChange={handleChange}
          aria-describedby="diners-error"
          required
        />
        {errors.diners && <p id="diners-error" style={{ color: 'red' }}>{errors.diners}</p>}

        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          aria-describedby="firstName-error"
          required
        />
        {errors.firstName && <p id="firstName-error" style={{ color: 'red' }}>{errors.firstName}</p>}

        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          aria-describedby="lastName-error"
          required
        />
        {errors.lastName && <p id="lastName-error" style={{ color: 'red' }}>{errors.lastName}</p>}

        <label>Contact (Email or phone):</label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          aria-describedby="contact-error"
          required
        />
        {errors.contact && <p id="contact-error" style={{ color: 'red' }}>{errors.contact}</p>}

        <button type="submit" style={{ marginTop: '1rem' }}>Book Table</button>
      </form>
    </div>
  );
}

export default App;