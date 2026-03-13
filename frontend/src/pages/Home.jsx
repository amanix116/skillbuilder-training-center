import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { courseAPI } from '../services/api';
import background from '../images/background.jpg'
import './Home.css';

export default function Home() {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await courseAPI.getAll();
        setFeaturedCourses(data.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
         {/* <img src={background}/> */}
          <h1>Transform Your Career in Tech</h1>
          <p>Learn professional skills from industry experts in a flexible, online environment</p>
          <Link to="/apply" className="btn btn-primary btn-lg">Apply Now</Link>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <h2 className='headings'>About Digital Training Center</h2>
          <div className="about-grid">
            <div className="about-card">
              <h3>🎓 Expert Instructors</h3>
              <p>Learn from industry professionals with years of real-world experience</p>
            </div>
            <div className="about-card">
              <h3>💻 Hands-On Projects</h3>
              <p>Build real projects and create a portfolio while learning</p>
            </div>
            <div className="about-card">
              <h3>⏰ Flexible Schedule</h3>
              <p>Study at your own pace with lifetime access to course materials</p>
            </div>
            <div className="about-card">
              <h3>🌍 Global Community</h3>
              <p>Join thousands of students learning together worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="featured-courses">
        <div className="container">
          <h2 className='headings'>Featured Courses</h2>
          {loading ? (
            <p className="loading">Loading courses...</p>
          ) : (
            <div className="courses-grid">
              {featuredCourses.map(course => (
                <div key={course.id} className="course-card">
                  <h3>{course.title}</h3>
                  <p className="course-description">{course.description}</p>
                  <div className="course-info">
                    <span className="duration">📅 {course.duration}</span>
                    <span className="price">${course.price}</span>
                  </div>
                  <Link to="/apply" className="btn btn-secondary">Apply</Link>
                </div>
              ))}
            </div>
          )}
          <div className="view-all">
            <Link to="/courses" className="btn btn-outline">View All Courses</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose">
        <div className="container">
          <h2 className='headings'>Why Choose Our Training Center?</h2>
          <div className="benefits-grid">
            <div className="benefit">
              <div className="benefit-icon">✓</div>
              <h4>Industry-Recognized Certificates</h4>
              <p>Get certified after completing your course with credentials valued by employers</p>
            </div>
            <div className="benefit">
              <div className="benefit-icon">✓</div>
              <h4>Career Support</h4>
              <p>Receive guidance and support for your career advancement in tech</p>
            </div>
            <div className="benefit">
              <div className="benefit-icon">✓</div>
              <h4>Updated Curriculum</h4>
              <p>Our courses are regularly updated with the latest industry standards</p>
            </div>
            <div className="benefit">
              <div className="benefit-icon">✓</div>
              <h4>Affordable Pricing</h4>
              <p>High-quality education at competitive rates with flexible payment options</p>
            </div>
            <div className="benefit">
              <div className="benefit-icon">✓</div>
              <h4>24/7 Support</h4>
              <p>Get help from our support team whenever you need assistance</p>
            </div>
            <div className="benefit">
              <div className="benefit-icon">✓</div>
              <h4>Lifetime Access</h4>
              <p>Access course materials forever and learn at your own pace</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2  className='headings'>What Our Students Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">"The React course was incredibly comprehensive and well-structured. I got my dream job right after completing it!"</p>
              <p className="testimonial-author">- Alex Johnson</p>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">"The instructors are amazing and very responsive. I learned more in these courses than I did in my college."</p>
              <p className="testimonial-author">- Sarah Williams</p>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">"Flexible schedule and high-quality content. Perfect for working professionals like me!"</p>
              <p className="testimonial-author">- Michael Chen</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className='headings'>Ready to Start Your Learning Journey?</h2>
          <p>Join hundreds of students advancing their careers with us</p>
          <Link to="/apply" className="btn btn-primary btn-lg">Get Started Today</Link>
        </div>
      </section>
    </div>
  );
}
