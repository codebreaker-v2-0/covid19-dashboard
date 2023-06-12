import {Link} from 'react-router-dom'

export default function Header() {
  return (
    <nav className="header">
      <ul className="header-container flex">
        <Link className="react-link grow" to="/">
          <li className="logo-text">COVID19INDIA</li>
        </Link>
        <Link className="react-link" to="/">
          <button className="btn-transparent" type="button">
            Home
          </button>
        </Link>
        <Link className="react-link" to="/about">
          <button className="btn-transparent" type="button">
            About
          </button>
        </Link>
      </ul>
    </nav>
  )
}
