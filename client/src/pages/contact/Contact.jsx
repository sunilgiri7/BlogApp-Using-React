import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./contact.css";
import LoadingBar from "../../loadingbar/LoadingBar";
import Modal from "../../loadingbar/modal";

export default function Contact() {
  const form = useRef();
  const [formData, setFormData] = useState({
    user_name: "", // Changed from "name" to "user_name"
    user_email: "", // Changed from "email" to "user_email"
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    title: "",
    body: "",
  });

  if (isLoading) {
    return <LoadingBar />;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    emailjs
      .sendForm("service_64catui", "template_h9to0rw", form.current, {
        from_name: formData.user_name,
        from_email: formData.user_email,
        message: formData.message,
        publicKey: "1j6ossUz8DyDIIDCj",
      })
      .then(
        (response) => {
          setIsLoading(false);
          console.log("SUCCESS!", response.status, response.text);
          setModalMessage({
            title: "Email Sent Successfully",
            body: "Your message has been sent. We will get back to you shortly.",
          });
          setShowModal(true);
          // Reset the form data after successful submission
          setFormData({
            user_name: "",
            user_email: "",
            message: "",
          });
        },
        (error) => {
          console.log("FAILED...", error);
          setModalMessage({
            title: "Error Sending Email",
            body: "There was an error sending your message. Please try again later.",
          });
          setShowModal(true);
        }
      );
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="contact-container">
      <div className="contact-form-wrapper">
        <div className="form-section">
          <h2>Just say Hello !</h2>
          <p>Let us know more about you !</p>
          <form className="contact-form" ref={form} onSubmit={sendEmail}>
            <div className="form-group">
              <input
                type="text"
                name="user_name"
                className="name"
                value={formData.user_name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="user_email"
                value={formData.user_email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                required
              ></textarea>
            </div>
            <button type="submit" value="Send" className="submit-btn">
              SUBMIT
            </button>
          </form>
        </div>
        <div className="contact-info">
          <h1>Contact Information</h1>
          <p>seungiri841@email.com</p>
          <p>+91 8218452987</p>
        </div>
      </div>
      <Modal isOpen={showModal} message={modalMessage} onClose={closeModal} />
    </div>
  );
}
