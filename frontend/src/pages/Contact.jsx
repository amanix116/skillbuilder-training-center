import { useState } from 'react';
import { contactAPI } from '../services/api';
import './Contact.css';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await contactAPI.create(formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      alert('Failed to send message: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Have questions? We're here to help!</p>
      </div>

      <div className="container">
        <div className="contact-container">
          <form onSubmit={handleSubmit} className="contact-form">
            {submitted && (
              <div className="success-message">
                ✓ Message sent successfully! We'll get back to you soon.
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message..."
                rows="6"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          <div className="contact-info">
            <h3>Get in Touch</h3>
            
            <div className="info-block">
              <h4>📍 Address</h4>
              <p>123 Tech Street<br/>Silicon Valley, CA 94025<br/>United States</p>
            </div>

            <div className="info-block">
              <h4>📞 Phone</h4>
              <p>+1 (555) 123-4567<br/>+1 (555) 123-4568</p>
            </div>

            <div className="info-block">
              <h4>✉️ Email</h4>
              <p>info@trainingcenter.com<br/>support@trainingcenter.com</p>
            </div>

            <div className="info-block">
              <h4>⏰ Office Hours</h4>
              <p>Monday - Friday: 9:00 AM - 6:00 PM<br/>Saturday: 10:00 AM - 4:00 PM<br/>Sunday: Closed</p>
            </div>

            <div className="info-block">
              <h4>🌐 Follow Us</h4>
              <div className="social-links">
                <a href="#">Facebook</a>
                <a href="#">Twitter</a>
                <a href="#">LinkedIn</a>
                <a href="#">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
