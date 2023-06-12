import {Link} from 'react-router-dom'

export default () => (
  <div className="expand-center">
    <img
      className="failure-view__img"
      alt="not-found-pic"
      src="https://res.cloudinary.com/dojcknl66/image/upload/v1686542817/page-not-found_aorfnt.png"
    />
    <h1>PAGE NOT FOUND</h1>
    <p>we are sorry, the page you requested could not be found</p>
    <p>Please go back to the homepage</p>
    <Link to="/">
      <button className="btn btn-primary" type="button">
        Home
      </button>
    </Link>
  </div>
)
