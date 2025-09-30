import { FileText, Video, PenSquare, ClipboardCheck, MessagesSquare, ArrowRight, Sparkles, Zap } from 'lucide-react';
import './Home.css';

const modules = [
  { name: 'Document Editor', path: '/docs', description: 'Collaborate on documents in real-time.', icon: FileText, color: 'from-purple-500 to-pink-500' },
  { name: 'Video Conference', path: '/video', description: 'Peer-to-peer video and audio calls.', icon: Video, color: 'from-blue-500 to-cyan-500' },
  { name: 'Whiteboard', path: '/whiteboard', description: 'Interactive digital whiteboard for brainstorming.', icon: PenSquare, color: 'from-green-500 to-emerald-500' },
  { name: 'Task Board', path: '/tasks', description: 'Kanban-style task management.', icon: ClipboardCheck, color: 'from-orange-500 to-red-500' },
  { name: 'Team Chat', path: '/chat', description: 'Real-time messaging with your team.', icon: MessagesSquare, color: 'from-violet-500 to-purple-500' },
];

export default function Home() {
  return (
    <div className="home-container">
      {/* Animated Background Elements */}
      <div className="animated-background">
        <div className="shape1"></div>
        <div className="shape2"></div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles className="w-4 h-4" />
            <span>The Future of Remote Collaboration</span>
          </div>
          
          <h1 className="hero-title">
            <span className="highlight-text">
              Work Together,
            </span>
            <span className="highlight-text-2">
              Anywhere
            </span>
          </h1>
          
          <p className="hero-subtitle">
            Experience seamless collaboration with our integrated suite of tools. Built for teams that move fast and think big.
          </p>
          
          <div className="hero-buttons">
            <a href="/login" className="cta-button">
              <span className="button-content">
                Start Free Trial
                <ArrowRight className="arrow-icon" />
              </span>
              <div className="hover-overlay"></div>
            </a>
            
            <button className="demo-button">
              Watch Demo
            </button>
          </div>
          
          <div className="hero-footer">
            <div className="hero-footer-item">
              <Zap className="icon" />
              <span>Lightning Fast</span>
            </div>
            <div className="hero-footer-item">
              <span className="live-indicator"></span>
              <span>99.9% Uptime</span>
            </div>
            <div>
              <span>Trusted by 50K+ Teams</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-content">
          <div className="features-header">
            <h2 className="features-title">
              Everything You Need
            </h2>
            <p className="features-subtitle">
              Five powerful tools, one seamless platform. Stop switching between apps and start getting things done.
            </p>
          </div>
          
          <div className="features-grid">
            {modules.map((module, idx) => {
              const Icon = module.icon;
              return (
                <a
                  href={module.path}
                  key={module.name}
                  className={`feature-card ${idx === 0 ? 'large' : ''}`}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className={`gradient-overlay ${module.color}`}></div>
                  
                  <div className="feature-card-content">
                    <div className={`feature-icon-container ${module.color}`}>
                      <Icon className="feature-icon" />
                    </div>
                    
                    <h3 className="feature-title">
                      {module.name}
                    </h3>
                    
                    <p className="feature-description">
                      {module.description}
                    </p>
                    
                    <div className="feature-link">
                      <span>Explore</span>
                      <ArrowRight className="arrow-icon" />
                    </div>
                  </div>
                  
                  <div className="shine-effect"></div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <div className="cta-box">
            <div className="cta-background"></div>
            
            <div className="cta-inner">
              <h3 className="cta-title">
                Ready to Level Up?
              </h3>
              <p className="cta-subtitle">
                Join thousands of teams already collaborating smarter. No credit card required. Cancel anytime.
              </p>
              
              <a href="/login" className="cta-button-2">
                Get Started Free
                <ArrowRight className="arrow-icon" />
              </a>
              
              <p className="cta-footer">
                14-day free trial • No credit card needed • Setup in minutes
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
