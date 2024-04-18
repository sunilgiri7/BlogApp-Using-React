import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./contact.css";

export default function Contact() {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form.current, {
        publicKey: "YOUR_PUBLIC_KEY",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
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
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="user_email"
                value={formData.email}
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
    </div>
  );
}
