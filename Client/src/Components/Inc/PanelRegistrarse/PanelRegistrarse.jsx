import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import style from "./PanelRegistrarse.module.css";
import Alert from "react-bootstrap/Alert";
import { register } from "../../../redux/actions";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import * as Yup from "yup";
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .test("is-not-only-spaces", "Name cannot contain only spaces", (value) => {
      return value && value.trim().length > 0;
    }),
  lastname: Yup.string()
    .required("Last name is required")
    .test("is-not-only-spaces", "Last name cannot contain only spaces", (value) => {
      return value && value.trim().length > 0;
    }),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .test("is-not-only-spaces", "Password cannot contain only spaces", (value) => {
      return value && value.trim().length > 0;
    }),
});

function PanelRegistrarse() {
  const dispatch = useDispatch();
  const redVariant = "danger";
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleClose = () => {
    setShow(false);
    setError(null);
    setFormData({
      email: "",
      password: "",
    });
  };
  const handleShow = () => setShow(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values) => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const sendVerificationEmail = async () => {
        await sendEmailVerification(auth.currentUser);
      };
      sendVerificationEmail().catch((error) => console.log(error));

      const userData = {
        email: values.email,
        name: values.name,
        lastname: values.lastname,
        id: userCredential.user.uid,
      };
      dispatch(register(userData));

      setShow(false);
      setFormData({
        email: "",
        password: "",
        name: "",
        lastname: "",
      });
      setError(null);

      dispatch(login(userData.id));
      navigate("/home");
    } catch (error) {
      const errorMessage = error.message;
      setError(errorMessage);
    }
  };

  return (
    <>
      <a className="link-danger" onClick={handleShow}>
        Sign up
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={style.tittle}>Welcome</Modal.Title>
        </Modal.Header>
        <Modal.Body className={style.body}>
          <Formik
            initialValues={{
              name: "",
              lastname: "",
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <FormikForm className={style.form}>
                <div className={style.register}>
                  <Form.Label className={style.desc}>
                    Please enter your personal info
                  </Form.Label>

                  <Form.Group
                    className={`mb-3 ${style.formGroup}`}
                    controlId="formBasicEmail"
                  >
                    <Field
                      type="text"
                      name="name"
                      placeholder="Name"
                      className={`form-control ${style.inputField}`}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className={`text-danger ${style.errorMessage}`}
                    />
                  </Form.Group>

                  <Form.Group
                    className={`mb-3 ${style.formGroup}`}
                    controlId="formBasicEmail"
                  >
                    <Field
                      type="text"
                      name="lastname"
                      placeholder="Last name"
                      className={`form-control ${style.inputField}`}
                    />
                    <ErrorMessage
                      name="lastname"
                      component="div"
                      className={`text-danger ${style.errorMessage}`}
                    />
                  </Form.Group>

                  <Form.Group
                    className={`mb-3 ${style.formGroup}`}
                    controlId="formBasicEmail"
                  >
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      className={`form-control ${style.inputField}`}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className={`text-danger ${style.errorMessage}`}
                    />
                  </Form.Group>

                  <Form.Group
                    className={`mb-4 ${style.formGroup}`}
                    controlId="formBasicPassword"
                  >
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      className={`form-control ${style.inputField}`}
                    />
                     <ErrorMessage
                      name="password"
                      component="div"
                      className={`text-danger ${style.errorMessage}`}
                    />
                    <Form.Check
                      className="mt-3"
                      type="checkbox"
                      label="Show password"
                      onChange={togglePasswordVisibility}
                    />
                   
                  </Form.Group>

                  {error && <Alert variant={redVariant}>{error}</Alert>}

                  <Button
                    type="submit"
                    variant="danger"
                    disabled={isSubmitting}
                  >
                    Sign Up
                  </Button>
                </div>
              </FormikForm>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PanelRegistrarse;
