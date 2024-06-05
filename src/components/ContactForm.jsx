import "./ContactFormModule.css";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ContactForm = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const initialValues = {
    fname: '',
    lname: '',
    email: '',
    query: '',
    message: '',
    consent: false,
  };

  const validationSchema = Yup.object({
    fname: Yup.string().required("First Name is required"),
    lname: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    query: Yup.string().required("Query type is required"),
    message: Yup.string().required("Message is required"),
    consent: Yup.bool().oneOf([true], "Consent is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    // Simulate form submission
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      resetForm();
    }, 3000);
  };

  return (
    <>
      <div id="success-message" className={`success-message ${showSuccessMessage ? "" : "hidden"}`}>
        <p>Message Sent!</p>
        <p>Thanks for completing the form. We'll be in touch soon!</p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <h1>Contact Us</h1>
          <div className="nameContainer">
            <div className="firstNameContainer">
              <label htmlFor="fname">First Name</label>
              <br />
              <Field type="text" id="fname" name="fname" />
              <ErrorMessage name="fname" component="div" className="error" />
            </div>

            <div className="lastNameContainer">
              <label htmlFor="lname">Last Name</label>
              <br />
              <Field type="text" id="lname" name="lname" />
              <ErrorMessage name="lname" component="div" className="error" />
            </div>
          </div>

          <div className="emailContainer">
            <label htmlFor="email">Email Address</label>
            <br />
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div className="form-group">
            <label className="queryType">Query Type</label>
            <div className="radioContainer">
              <label>
                <Field type="radio" name="query" value="General Enquiry" /> General Enquiry
              </label>
              <label>
                <Field type="radio" name="query" value="Support Request" /> Support Request
              </label>
            </div>
            <ErrorMessage name="query" component="div" className="error" />
          </div>

          <div className="messageContainer">
            <label className="message" htmlFor="message">Message</label>
            <Field as="textarea" id="message" name="message" />
            <ErrorMessage name="message" component="div" className="error" />
          </div>

          <div className="consentMsgContainer">
            <Field type="checkbox" id="consent" name="consent" />
            <label htmlFor="consent">I consent to being contacted by the team</label>
            <ErrorMessage name="consent" component="div" className="error" />
          </div>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default ContactForm;
