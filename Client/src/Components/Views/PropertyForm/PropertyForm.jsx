import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import styles from "./PropertyForm.module.css";
import { Link, useParams } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  type: Yup.string().required("Type is required"),
  address: Yup.string().required("Address is required"),
  country: Yup.string().required("Country is required"),
  guests: Yup.number().required("Guests is required"),
  price: Yup.number().required("Price is required"),
  description: Yup.string().required("Description is required"),
  startDate: Yup.date()
    .required("Start Date is required")
    .min(new Date(), "Start Date must be in the future")
    .max(Yup.ref("endDate"), "Start Date must be before End Date"),
  endDate: Yup.date()
    .required("End Date is required")
    .min(Yup.ref("startDate"), "End Date must be after Start Date"),
});

const PropertyForm = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "aloharsur88");
      formData.append("cloud_name", "dgsnukgdu");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgsnukgdu/image/upload",
        formData
      );

      const imageUrl = response.data.secure_url;
      values.image = imageUrl;

      await axios.post(
        `http://localhost:3001/user/${id}/property`,
        values
      );

      console.log(response.data);
      alert("Created property");
      resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
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

  const submitImage = () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "aloharsur88");
    formData.append("cloud_name", "dgsnukgdu");

    axios
      .post("https://api.cloudinary.com/v1_1/dgsnukgdu/image/upload", formData)
      .then((response) => {
        const imageUrl = response.data.secure_url;
        console.log("Image URL:", imageUrl);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  return (
    <Formik
      initialValues={{
        title: "",
        type: "",
        address: "",
        country: "",
        guests: 0,
        price: 0,
        description: "",
        startDate: "",
        endDate: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <Field type="text" name="title" className="form-control" required />
            <ErrorMessage
              name="title"
              component="div"
              className="error-message"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              required
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className={styles.imagePreview}
              />
            )}

            <ErrorMessage
              name="image"
              component="div"
              className="error-message"
            />
          </div>
          <Button className={styles["btn-green"]} onClick={submitImage}>
            Cargar imagen
          </Button>

          <div className="form-group">
            <label htmlFor="type">Type</label>
            <Field as="select" name="type" className="form-control" required>
              <option value="">Select type</option>
              <option value="Apartment">Apartment</option>
              <option value="Hotel">Hotel</option>
              <option value="House">House</option>
              <option value="Cabin">Cabin</option>
            </Field>
            <ErrorMessage
              name="type"
              component="div"
              className="error-message"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <Field
              type="text"
              name="address"
              className="form-control"
              required
            />
            <ErrorMessage
              name="address"
              component="div"
              className="error-message"
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <Field as="select" name="country" className="form-control" required>
              <option value="">Select country</option>
              <option value="Argentina">Argentina</option>
              <option value="Brasil">Brasil</option>
              <option value="Chile">Chile</option>
              <option value="Uruguay">Uruguay</option>
            </Field>
            <ErrorMessage
              name="country"
              component="div"
              className="error-message"
            />
          </div>

          <div className="form-group">
            <label htmlFor="guests">Guests</label>
            <Field
              type="number"
              name="guests"
              className="form-control"
              required
            />
            <ErrorMessage
              name="guests"
              component="div"
              className="error-message"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <Field
              type="number"
              name="price"
              className="form-control"
              required
            />
            <ErrorMessage
              name="price"
              component="div"
              className="error-message"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <Field
              as="textarea"
              rows={3}
              name="description"
              className="form-control"
              required
            />
            <ErrorMessage
              name="description"
              component="div"
              className="error-message"
            />
          </div>

          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <Field
              type="date"
              name="startDate"
              className="form-control"
              required
            />
            <ErrorMessage
              name="startDate"
              component="div"
              className="error-message"
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <Field
              type="date"
              name="endDate"
              className="form-control"
              required
            />
            <ErrorMessage
              name="endDate"
              component="div"
              className="error-message"
            />
          </div>

          

          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
          <Link to="/home" id="click">
            <Button>Home</Button>
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default PropertyForm;
