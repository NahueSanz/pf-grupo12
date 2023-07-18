import React, { useState } from 'react';
import styles from '../FormPerfil/FormPerfil.module.css';

const FormMyPerfil = () => {
  const [user, setUser] = useState({
    name: '',
    lastname: '',
    country: '',
    phonenumber: '',
    language: '',
    description: '',
    image: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    const id = localStorage.getItem("loggedIn")
    event.preventDefault();
    console.log(id);
  };

  return (
    <form className={styles['create-user-form']} onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={user.name} onChange={handleChange} required />
      </label>
      <label>
        Lastname:
        <input type="text" name="lastname" value={user.lastname} onChange={handleChange} required />
      </label>
      <label>
        Country:
        <input type="text" name="country" value={user.country} onChange={handleChange} required />
      </label>
      <label>
      Phonenumber:
        <input type="tel" name="phonenumber" value={user.phonenumber} onChange={handleChange} required />
      </label>
      <label>
        Languaje:
        <input type="text" name="language" value={user.language} onChange={handleChange} required />
      </label>
      <label>
        Description:
        <textarea name="description" value={user.description} onChange={handleChange} required />
      </label>
      <label>
        Image:
        <input type="file" name="image" onChange={handleChange} required />
      </label>
      <button type="submit">Crear y Enviar</button>
    </form>
  );
};

export default FormMyPerfil;