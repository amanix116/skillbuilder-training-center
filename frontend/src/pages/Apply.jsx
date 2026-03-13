import { useState, useEffect } from 'react';
import { applicationAPI, courseAPI } from '../services/api';
import './Apply.css';

export default function Apply() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    course_id: '',
    message: ''
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await courseAPI.getAll();
        setCourses(data);
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, course_id: data[0].id }));
        }
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await applicationAPI.create({
        ...formData,
        course_id: parseInt(formData.course_id)
      });
      setSubmitted(true);
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        course_id: courses.length > 0 ? courses[0].id : '',
        message: ''
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      alert('Failed to submit application: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apply-page">
      <div className="apply-header">
        <h1>Apply for a Course</h1>
        <p>Join our community of learners and advance your career</p>
      </div>

      <div className="container">
        <div className="apply-container">
          <form onSubmit={handleSubmit} className="apply-form">
            {submitted && (
              <div className="success-message">
                ✓ Application submitted successfully! We'll contact you soon.
              </div>
            )}

            <div className="form-group">
              <label htmlFor="full_name">Full Name *</label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                placeholder="John Doe"
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
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="form-group">
              <label htmlFor="course_id">Select Course *</label>
              <select
                id="course_id"
                name="course_id"
                value={formData.course_id}
                onChange={handleChange}
                required
              >
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your background and goals..."
                rows="5"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>

          <div className="apply-info">
            <h3>Why Apply?</h3>
            <div className="info-item">
              <h4>🎓 Learn from Experts</h4>
              <p>Get trained by industry professionals with years of experience</p>
            </div>
            <div className="info-item">
              <h4>💼 Career Support</h4>
              <p>Receive guidance and support throughout your learning journey</p>
            </div>
            <div className="info-item">
              <h4>📜 Get Certified</h4>
              <p>Earn recognized certificates upon course completion</p>
            </div>
            <div className="info-item">
              <h4>🌐 Global Network</h4>
              <p>Connect with learners from around the world</p>
            </div>
            <div className="info-item">
              <h4>💡 Real Projects</h4>
              <p>Work on real-world projects and build your portfolio</p>
            </div>
            <div className="info-item">
              <h4>⏰ Flexible Learning</h4>
              <p>Learn at your own pace with lifetime access to materials</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
