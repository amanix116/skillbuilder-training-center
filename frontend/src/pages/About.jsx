import { useEffect, useState } from 'react';
import { trainerAPI } from '../services/api';
import './About.css';

export default function About() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const { data } = await trainerAPI.getAll();
        setTrainers(data);
      } catch (error) {
        console.error('Failed to fetch trainers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  return (
    <div className="about-page">
      {/* Hero */}
      <div className="about-hero">
        <h1>About Digital Training Center</h1>
        <p>Building the future of tech education</p>
      </div>

      <div className="container">
        {/* Mission, Vision, Values */}
        <section className="mission-section">
          <div className="mission-card">
            <h2>🎯 Our Mission</h2>
            <p>To provide affordable, accessible, and high-quality tech education that empowers professionals to advance their careers and make a positive impact in the digital world.</p>
          </div>

          <div className="mission-card">
            <h2>👁️ Our Vision</h2>
            <p>To become the leading digital training platform trusted by thousands of professionals worldwide for their continuous learning and career development.</p>
          </div>

          <div className="mission-card">
            <h2>💎 Our Values</h2>
            <ul>
              <li>Excellence in education and training</li>
              <li>Student success is our priority</li>
              <li>Innovation and continuous improvement</li>
              <li>Integrity and transparency</li>
              <li>Accessibility for all learners</li>
            </ul>
          </div>
        </section>

        {/* Trainers Section */}
        <section className="trainers-section">
          <h2>Meet Our Expert Trainers</h2>
          <p className="section-subtitle">Learn from professionals with real-world experience in the tech industry</p>
          
          {loading ? (
            <p className="loading">Loading trainers...</p>
          ) : (
            <div className="trainers-grid">
              {trainers.map(trainer => (
                <div key={trainer.id} className="trainer-card">
                  <div className="trainer-image">
                    {trainer.photo ? (
                      <img src={trainer.photo} alt={trainer.name} />
                    ) : (
                      <div className="trainer-placeholder">👤</div>
                    )}
                  </div>
                  <h3>{trainer.name}</h3>
                  <p className="trainer-role">{trainer.role}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stat-card">
            <h3>5000+</h3>
            <p>Active Students</p>
          </div>
          <div className="stat-card">
            <h3>50+</h3>
            <p>Professional Courses</p>
          </div>
          <div className="stat-card">
            <h3>95%</h3>
            <p>Student Satisfaction</p>
          </div>
          <div className="stat-card">
            <h3>100+</h3>
            <p>Expert Trainers</p>
          </div>
        </section>
      </div>
    </div>
  );
}
