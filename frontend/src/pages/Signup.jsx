
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { SiGithub, SiGoogle } from 'react-icons/si';

import './Signup.css';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError('All fields are required.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    setSuccess(true);
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h2>Sign Up</h2>
        {success ? (
          <div className="signup-success-message">Signup successful! <Link to="/login" className="signup-login-link">Login</Link></div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="signup-form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Full Name"
                required
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="signup-form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="signup-form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="******************"
                required
                value={form.password}
                onChange={handleChange}
              />
            </div>
            <div className="signup-form-group">
              <label htmlFor="confirm">Confirm Password</label>
              <input
                id="confirm"
                name="confirm"
                type="password"
                placeholder="******************"
                required
                value={form.confirm}
                onChange={handleChange}
              />
            </div>
            {error && <div className="signup-error-message">{error}</div>}
            <div className="signup-form-actions">
              <button className="signup-submit-button" type="submit">Sign Up</button>
              <div className="social-logins">
                <button type="button" className="social-button google">
                  <SiGoogle />
                </button>
                <button type="button" className="social-button github">
                  <SiGithub />
                </button>
              </div>
              <p>If already registered, <Link className='signup-link' to="/login">Login</Link></p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
export default Signup;
