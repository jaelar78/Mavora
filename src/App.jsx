import './index.css';

const features = [
  {
    title: 'Fast by default',
    description: 'Built with Vite for instant development feedback and optimized production builds.',
  },
  {
    title: 'Ready to deploy',
    description: 'Works out of the box on Vercel, Netlify, and other static hosting providers.',
  },
  {
    title: 'Easy to customize',
    description: 'A clean React starting point for building the Mavora experience.',
  },
];

function App() {
  return (
    <main className="app-shell">
      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">Mavora</p>
        <h1 id="hero-title">Launch your next modern web experience.</h1>
        <p className="hero-copy">
          Mavora is a lightweight Vite React app prepared for rapid iteration,
          polished presentation, and simple deployment.
        </p>
        <div className="actions" aria-label="Primary actions">
          <a className="button button-primary" href="https://vitejs.dev/guide/" target="_blank" rel="noreferrer">
            Vite docs
          </a>
          <a className="button button-secondary" href="https://react.dev/" target="_blank" rel="noreferrer">
            React docs
          </a>
        </div>
      </section>

      <section className="feature-grid" aria-label="Mavora features">
        {features.map((feature) => (
          <article className="feature-card" key={feature.title}>
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;
