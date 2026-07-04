import { Link } from "react-router-dom";

function Wordmark() {
  return (
    <span className="logo-wordmark" aria-label="Dovroyn logo">
      <span className="logo-mark" aria-hidden="true">
        <span className="logo-orbit" />
      </span>
      <span>DOVROYN</span>
    </span>
  );
}

export default function Header({
  variant = "home",
  backTo = "/",
  backLabel = "Home",
  showNav = false,
}) {
  return (
    <header className="top-nav">
      <Link to="/" className="nav-brand-link" aria-label="Dovroyn home">
        <Wordmark />
      </Link>
      <nav className="top-nav-links">
        {variant === "home" ? (
          <>
            <Link className="nav-link-subtle" to="/pricing">Pricing</Link>
            <Link className="nav-link-subtle" to="/login">Login</Link>
          </>
        ) : (
          <>
            <Link className="nav-link-subtle" to={backTo}>{backLabel}</Link>
            {showNav && (
              <>
                <Link className="nav-link-subtle" to="/pricing">Pricing</Link>
                <Link className="nav-link-subtle" to="/login">Login</Link>
              </>
            )}
          </>
        )}
      </nav>
    </header>
  );
}
