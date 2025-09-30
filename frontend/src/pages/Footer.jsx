import './Footer.css';

export default function Footer() {
  return (
    <footer className="profile-footer">
      <div className="profile-footer-content">
        <div className="footer-brand-row">
          <span className="footer-logo">RW</span>
          <span className="footer-title">Remote Work Collaboration Suite</span>
        </div>
        <div className="footer-links-row">
          <a href="/" className="profile-footer-link">Home</a>
          <a href="/docs" className="profile-footer-link">Docs</a>
          <a href="/chat" className="profile-footer-link">Chat</a>
          <a href="/video" className="profile-footer-link">Video</a>
          <a href="/whiteboard" className="profile-footer-link">Whiteboard</a>
          <a href="/tasks" className="profile-footer-link">Tasks</a>
        </div>
        <div className="footer-social-row">
          <a href="mailto:benjamin@example.com" className="footer-social-icon" title="Email">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11Zm2.5-.5a.5.5 0 0 0-.5.5v.217l8 5.333 8-5.333V6.5a.5.5 0 0 0-.5-.5h-15Zm15 13a.5.5 0 0 0 .5-.5V9.217l-7.5 5-7.5-5V17.5a.5.5 0 0 0 .5.5h15Z"/></svg>
          </a>
          <a href="https://github.com/Benjamin-ngiimei" className="footer-social-icon" title="GitHub" target="_blank" rel="noopener noreferrer">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.37-1.342-3.37-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.34-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.36.31.68.92.68 1.855 0 1.338-.012 2.42-.012 2.75 0 .268.18.579.688.481C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z"/></svg>
          </a>
          <a href="https://twitter.com/" className="footer-social-icon" title="Twitter" target="_blank" rel="noopener noreferrer">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.77c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.7-.02-1.36-.21-1.94-.53v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22.46 6Z"/></svg>
          </a>
        </div>
        <div className="footer-meta-row">
          <span>&copy; {new Date().getFullYear()} Remote Work Collaboration Suite. All rights reserved.</span>
          <span className="footer-location">Nairobi, Kenya</span>
        </div>
      </div>
    </footer>
  );
}
