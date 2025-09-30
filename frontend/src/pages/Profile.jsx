import './Profile.css';

import { useState } from 'react';

export default function Profile() {
  // Example static user data (replace with real data as needed)
  const [user, setUser] = useState({
    avatar: 'https://ui-avatars.com/api/?name=Benjamin+Ngiimei&background=6366f1&color=fff&size=128',
    name: 'Benjamin Ngiimei',
    email: 'benjamin@example.com',
    role: 'Team Lead',
    bio: 'Remote work enthusiast. Loves building collaborative tools and leading distributed teams. Passionate about productivity and design.',
    phone: '+1 555-123-4567',
    location: 'Nairobi, Kenya',
  });
  const [showEdit, setShowEdit] = useState(false);
  const [editForm, setEditForm] = useState(user);

  const handleEdit = () => {
    setEditForm(user);
    setShowEdit(true);
  };
  const handleClose = () => setShowEdit(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSave = (e) => {
    e.preventDefault();
    setUser(editForm);
    setShowEdit(false);
  };

  return (
    <>
      <div className="profile-container">
        <div className="profile-card">
          <img className="profile-avatar" src={user.avatar} alt={user.name} />
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-role">{user.role}</p>
          <p className="profile-email">{user.email}</p>
          <p className="profile-phone">{user.phone}</p>
          <p className="profile-location">{user.location}</p>
          <p className="profile-bio">{user.bio}</p>
          <button className="profile-edit-btn" onClick={handleEdit}>Edit Profile</button>
        </div>
      </div>
    </>
  );
}