import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { courseAPI } from '../services/api';
import './Courses.css';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await courseAPI.getAll();
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="courses-page">
      <div className="courses-header">
        <h1>Our Professional Courses</h1>
        <p>Explore our comprehensive range of tech courses designed for professionals</p>
      </div>

      <div className="container">
        {loading ? (
          <p className="loading">Loading courses...</p>
        ) : (
          <div className="courses-list">
            {courses.map(course => (
              <div key={course.id} className="course-item">
                <div className="course-item-content">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="course-item-info">
                    <span className="info-badge">📅 {course.duration}</span>
                    <span className="info-badge">💰 ${course.price}</span>
                  </div>
                </div>
                <div className="course-item-action">
                  <Link to="/apply" className="btn btn-primary">Apply Now</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
