import React, { useState } from 'react';
import styles from '../FormProperty/FormProperty.module.css';

const FormMyProperty = () => {
  const [user, setUser] = useState({
    image: '',
    name: '',
    type: '',
    address: '',
    country: '',
    guests: '',
    score: '',
    price: '',
    review: '',
    description: '',
    
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevProperty) => ({
      ...prevProperty,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user);
  };

  return (
    <form className={styles['create-property']} onSubmit={handleSubmit}>
      <label>
        Image:
        <input type="file" name="image" value={user.image} onChange={handleChange} required />
      </label>
      <label>
        Name:
        <input type="text" name="name" value={user.name} onChange={handleChange} required />
      </label>
      <label>
        Type:
        <input type="text" name="type" value={user.type} onChange={handleChange} required />
      </label>
      <label>
        Address:
        <input type="tel" name="address" value={user.address} onChange={handleChange} required />
      </label>
      <label>
        Country:
        <input type="text" name="country" value={user.country} onChange={handleChange} required />
      </label>
      <label>
        Guests:
        <input type="text" name="guests" value={user.guests} onChange={handleChange} required />
      </label>
      <label>
        Score:
        <input type="text" name="score" value={user.score} onChange={handleChange} required />
      </label>
      <label>
        Price:
        <input type="text" name="price" value={user.price} onChange={handleChange} required />
      </label>
      <label>
        Review:
        <input type="text" name="review" value={user.review} onChange={handleChange} required />
      </label>
      <label>
        Description:
        <textarea name="description" value={user.description} onChange={handleChange} required />
      </label>

      <button type="submit">Create Property</button>
    </form>
  );
};

export default FormMyProperty;