import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseAPI, applicationAPI, trainerAPI, contactAPI } from '../services/api';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [courses, setCourses] = useState([]);
  const [applications, setApplications] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingTrainer, setEditingTrainer] = useState(null);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', duration: '', price: '' });
  const [newTrainer, setNewTrainer] = useState({ name: '', role: '', photo: '' });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchAllData();
  }, [navigate]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [coursesRes, applicationsRes, trainersRes, contactsRes] = await Promise.all([
        courseAPI.getAll(),
        applicationAPI.getAll(),
        trainerAPI.getAll(),
        contactAPI.getAll()
      ]);

      setCourses(coursesRes.data);
      setApplications(applicationsRes.data);
      setTrainers(trainersRes.data);
      setContacts(contactsRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  // Course functions
  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      await courseAPI.create(newCourse);
      setNewCourse({ title: '', description: '', duration: '', price: '' });
      fetchAllData();
    } catch (error) {
      alert('Failed to add course: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    try {
      await courseAPI.update(editingCourse.id, editingCourse);
      setEditingCourse(null);
      fetchAllData();
    } catch (error) {
      alert('Failed to update course: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await courseAPI.delete(id);
        fetchAllData();
      } catch (error) {
        alert('Failed to delete course: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  // Trainer functions
  const handleAddTrainer = async (e) => {
    e.preventDefault();
    try {
      await trainerAPI.create(newTrainer);
      setNewTrainer({ name: '', role: '', photo: '' });
      fetchAllData();
    } catch (error) {
      alert('Failed to add trainer: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleUpdateTrainer = async (e) => {
    e.preventDefault();
    try {
      await trainerAPI.update(editingTrainer.id, editingTrainer);
      setEditingTrainer(null);
      fetchAllData();
    } catch (error) {
      alert('Failed to update trainer: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDeleteTrainer = async (id) => {
    if (window.confirm('Are you sure you want to delete this trainer?')) {
      try {
        await trainerAPI.delete(id);
        fetchAllData();
      } catch (error) {
        alert('Failed to delete trainer: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  if (loading) return <div className="admin-loading">Loading dashboard...</div>;

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="btn btn-logout">Logout</button>
      </div>

      <div className="admin-content">
        <div className="admin-nav">
          <button
            className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button
            className={`nav-btn ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            📚 Courses
          </button>
          <button
            className={`nav-btn ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            📋 Applications
          </button>
          <button
            className={`nav-btn ${activeTab === 'trainers' ? 'active' : ''}`}
            onClick={() => setActiveTab('trainers')}
          >
            👨‍🏫 Trainers
          </button>
          <button
            className={`nav-btn ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            💬 Messages
          </button>
        </div>

        <div className="admin-main">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="tab-content">
              <h2>Dashboard Overview</h2>
              <div className="stats-grid">
                <div className="stat-box">
                  <h3>{courses.length}</h3>
                  <p>Total Courses</p>
                </div>
                <div className="stat-box">
                  <h3>{applications.length}</h3>
                  <p>Applications</p>
                </div>
                <div className="stat-box">
                  <h3>{trainers.length}</h3>
                  <p>Trainers</p>
                </div>
                <div className="stat-box">
                  <h3>{contacts.length}</h3>
                  <p>Contact Messages</p>
                </div>
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div className="tab-content">
              <h2>Manage Courses</h2>

              {editingCourse ? (
                <form onSubmit={handleUpdateCourse} className="form-container">
                  <h3>Edit Course</h3>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      value={editingCourse.title}
                      onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={editingCourse.description}
                      onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                      rows="4"
                    ></textarea>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Duration</label>
                      <input
                        type="text"
                        value={editingCourse.duration}
                        onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Price</label>
                      <input
                        type="number"
                        step="0.01"
                        value={editingCourse.price}
                        onChange={(e) => setEditingCourse({ ...editingCourse, price: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="form-buttons">
                    <button type="submit" className="btn btn-primary">Update Course</button>
                    <button type="button" onClick={() => setEditingCourse(null)} className="btn btn-secondary">Cancel</button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleAddCourse} className="form-container">
                  <h3>Add New Course</h3>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      value={newCourse.title}
                      onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                      placeholder="Course title"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={newCourse.description}
                      onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                      placeholder="Course description"
                      rows="4"
                    ></textarea>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Duration</label>
                      <input
                        type="text"
                        value={newCourse.duration}
                        onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                        placeholder="e.g., 8 weeks"
                      />
                    </div>
                    <div className="form-group">
                      <label>Price</label>
                      <input
                        type="number"
                        step="0.01"
                        value={newCourse.price}
                        onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">Add Course</button>
                </form>
              )}

              <div className="table-container">
                <h3>Courses List</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Duration</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map(course => (
                      <tr key={course.id}>
                        <td>{course.title}</td>
                        <td>{course.duration}</td>
                        <td>${course.price}</td>
                        <td>
                          <button onClick={() => setEditingCourse(course)} className="btn btn-small">Edit</button>
                          <button onClick={() => handleDeleteCourse(course.id)} className="btn btn-small btn-danger">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Applications Tab */}
          {activeTab === 'applications' && (
            <div className="tab-content">
              <h2>Student Applications</h2>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Course</th>
                      <th>Message</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.length === 0 ? (
                      <tr><td colSpan="6" style={{ textAlign: 'center' }}>No applications yet</td></tr>
                    ) : (
                      applications.map(app => (
                        <tr key={app.id}>
                          <td>{app.full_name}</td>
                          <td>{app.email}</td>
                          <td>{app.phone}</td>
                          <td>{app.course_title}</td>
                          <td>{app.message?.substring(0, 50)}...</td>
                          <td>{new Date(app.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Trainers Tab */}
          {activeTab === 'trainers' && (
            <div className="tab-content">
              <h2>Manage Trainers</h2>

              {editingTrainer ? (
                <form onSubmit={handleUpdateTrainer} className="form-container">
                  <h3>Edit Trainer</h3>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      value={editingTrainer.name}
                      onChange={(e) => setEditingTrainer({ ...editingTrainer, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Role</label>
                    <input
                      type="text"
                      value={editingTrainer.role}
                      onChange={(e) => setEditingTrainer({ ...editingTrainer, role: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Photo URL</label>
                    <input
                      type="text"
                      value={editingTrainer.photo || ''}
                      onChange={(e) => setEditingTrainer({ ...editingTrainer, photo: e.target.value })}
                      placeholder="Photo URL"
                    />
                  </div>
                  <div className="form-buttons">
                    <button type="submit" className="btn btn-primary">Update Trainer</button>
                    <button type="button" onClick={() => setEditingTrainer(null)} className="btn btn-secondary">Cancel</button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleAddTrainer} className="form-container">
                  <h3>Add New Trainer</h3>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      value={newTrainer.name}
                      onChange={(e) => setNewTrainer({ ...newTrainer, name: e.target.value })}
                      placeholder="Trainer name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Role</label>
                    <input
                      type="text"
                      value={newTrainer.role}
                      onChange={(e) => setNewTrainer({ ...newTrainer, role: e.target.value })}
                      placeholder="Trainer role"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Photo URL</label>
                    <input
                      type="text"
                      value={newTrainer.photo}
                      onChange={(e) => setNewTrainer({ ...newTrainer, photo: e.target.value })}
                      placeholder="Photo URL"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Add Trainer</button>
                </form>
              )}

              <div className="table-container">
                <h3>Trainers List</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trainers.map(trainer => (
                      <tr key={trainer.id}>
                        <td>{trainer.name}</td>
                        <td>{trainer.role}</td>
                        <td>
                          <button onClick={() => setEditingTrainer(trainer)} className="btn btn-small">Edit</button>
                          <button onClick={() => handleDeleteTrainer(trainer.id)} className="btn btn-small btn-danger">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <div className="tab-content">
              <h2>Contact Messages</h2>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Message</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.length === 0 ? (
                      <tr><td colSpan="4" style={{ textAlign: 'center' }}>No messages yet</td></tr>
                    ) : (
                      contacts.map(contact => (
                        <tr key={contact.id}>
                          <td>{contact.name}</td>
                          <td>{contact.email}</td>
                          <td>{contact.message?.substring(0, 50)}...</td>
                          <td>{new Date(contact.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
