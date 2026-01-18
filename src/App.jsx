import './App.css';

function App() {
  return (
    <div className="App">
      <section className="hero">
        <span className="badge">Version 2.0 Released</span>
        
        <h1>Building Digital Experiences That Drive Results</h1>
        
        <p className="description">
          Professional full-stack development with React, modern tooling, 
          and scalable architecture. Delivering high-performance solutions 
          for businesses worldwide.
        </p>
        
        <div className="buttons">
          <a href="#" className="btn btn-primary">View Projects</a>
          <a href="#" className="btn btn-secondary">GitLab Repo</a>
        </div>
        
        <div className="stats">
          <div className="stat">
            <div className="number">50+</div>
            <div className="label">Projects</div>
          </div>
          <div className="stat">
            <div className="number">100%</div>
            <div className="label">Satisfaction</div>
          </div>
          <div className="stat">
            <div className="number">24/7</div>
            <div className="label">Support</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
