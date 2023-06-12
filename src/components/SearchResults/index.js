import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'

const SearchResults = props => {
  const {searchInput, data} = props
  const updatedData = data.filter(item =>
    item.stateName.toLowerCase().includes(searchInput.toLowerCase()),
  )

  return (
    <ul
      className="search-results-container"
      testid="searchResultsUnorderedList"
    >
      {updatedData.map(item => (
        <Link
          className="react-link search-item-link"
          to={`/state/${item.id}`}
          key={`state-${item.id}`}
        >
          <li className="search-item">
            <p className="state-name">{item.stateName}</p>
            <div className="flex search-item-card">
              <p>{item.id}</p>
              <BiChevronRightSquare />
            </div>
          </li>
        </Link>
      ))}
    </ul>
  )
}

export default SearchResults
