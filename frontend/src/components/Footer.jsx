import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>skillbuilder Training Center</h3>
          <p>Empowering professionals with cutting-edge tech skills through comprehensive online training.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>Email: amanivenuste116@gmail.com.com</p>
          <p>Phone: +250  793 061 810</p>
          <p>Address: 123 Tech Street, Silicon Valley, CA</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="https://www.facebook.com/profile.php?id=61585998013408">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
            <a href="https://www.instagram.com/amanix101/">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Digital Training Center. All rights reserved.</p>
      </div>
    </footer>
  );
}
