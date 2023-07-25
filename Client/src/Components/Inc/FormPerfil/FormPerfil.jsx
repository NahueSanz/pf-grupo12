import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../redux/actions';
import axios from "axios";
import styles from '../FormPerfil/FormPerfil.module.css';

const FormMyPerfil = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [user, setUser] = useState({
    name: '',
    lastname: '',
    country: '',
    phonenumber: '',
    language: '',
    image: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const id = localStorage.getItem("loggedIn");

    // Se sube la imagen a Cloudinary y obtenemos la URL
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "aloharsur88");
      formData.append("cloud_name", "dgsnukgdu");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dgsnukgdu/image/upload",
          formData
        );
        const imageUrl = response.data.secure_url;
        setUser((prevUser) => ({
          ...prevUser,
          image: imageUrl,
        }));

        // Realizar la actualización del usuario en la base de datos con la URL de la imagen
        dispatch(updateUser(id, { ...user, image: imageUrl }));

        setUser({
          name: '',
          lastname: '',
          country: '',
          phonenumber: '',
          language: '',
          image: '',
        });
      } catch (error) {
        console.error("Error al subir la imagen a Cloudinary:", error);
        return;
      }
    } else {
      // Si no hay imagen seleccionada solo se actualiza el resto de los datos
      dispatch(updateUser(id, user));


      setUser({
        name: '',
        lastname: '',
        country: '',
        phonenumber: '',
        language: '',
        image: '',
      });
    }
  };

  return (
    <form className={styles['create-user-form']} onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={user.name} onChange={handleChange} />
      </label>
      <label>
        Lastname:
        <input type="text" name="lastname" value={user.lastname} onChange={handleChange}  />
      </label>
      <label>
        Country:
        <input type="text" name="country" value={user.country} onChange={handleChange}  />
      </label>
      <label>
        Phonenumber:
        <input type="tel" name="phonenumber" value={user.phonenumber} onChange={handleChange}  />
      </label>
      <label>
        Languaje:
        <input type="text" name="language" value={user.language} onChange={handleChange}  />
      </label>

      <div className={`form-group ${styles.formGroupImg}`}>
        {/* <label htmlFor="image">Image</label> */}
        <input
          type="file"
          name="image"
          onChange={handleImageChange}

        />
        {previewImage && (
          <div className={styles.imageContainer}>
            <img
              src={previewImage}
              alt="Preview"
              className={styles.imagePreview}
            />
          </div>
        )}
      </div>

      <button type="submit">Crear y Enviar</button>
    </form>
  );
};

export default FormMyPerfil;
