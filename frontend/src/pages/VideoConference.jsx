import './VideoConference.css';

export default function VideoConference() {
  return (
    <div className="video-conference-container">
      {/* Main Video Area */}
      <div className="main-video-area">
        <div className="main-video">
          <p>Main Speaker</p>
        </div>
        <div className="controls">
          <button className="control-button">Mute</button>
          <button className="control-button">Stop Video</button>
          <button className="control-button leave-button">Leave Call</button>
        </div>
      </div>

      {/* Participants Sidebar */}
      <div className="participants-sidebar">
        <h2>Participants</h2>
        <div className="participants-list">
          {['You', 'Alice', 'Bob', 'Charlie'].map(user => (
            <div key={user} className="participant-video">
              <p>{user}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}