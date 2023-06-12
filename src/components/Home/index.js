import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'
import {Container} from '../../utilities'
import LoaderSpinner from '../LoaderSpinner'
import CovidDetailsTable from '../CovidDetailsTable'
import CountryWideDetails from '../CountryWideDetails'
import SearchResults from '../SearchResults'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const apiStatusConstants = {
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    searchInput: '',
    apiStatus: apiStatusConstants.progress,
    data: [],
    sortAsc: true,
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const URL = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(URL)
    const data = await response.json()
    const updatedData = statesList.map(item => {
      const state = data[item.state_code]
      const {meta, total} = state
      const {confirmed, recovered, deceased} = total

      return {
        id: item.state_code,
        stateName: item.state_name,
        population: meta.population,
        confirmed,
        recovered,
        deceased,
      }
    })

    this.setState({apiStatus: apiStatusConstants.success, data: updatedData})
  }

  updateSearchInput = e => {
    this.setState({searchInput: e.target.value})
  }

  changeSort = value => {
    this.setState({sortAsc: value})
  }

  renderProgressView = () => (
    <div className="expand-center" testid="homeRouteLoader">
      <LoaderSpinner />
    </div>
  )

  renderSuccessView = () => {
    const {data, sortAsc, searchInput} = this.state
    return (
      <>
        <div>
          <div className="form-control-search">
            <BsSearch />
            <input
              type="search"
              placeholder="Enter the State"
              value={searchInput}
              onChange={this.updateSearchInput}
            />
          </div>
          {searchInput && (
            <SearchResults data={data} searchInput={searchInput} />
          )}
        </div>

        {!searchInput && (
          <>
            <CountryWideDetails data={data} />
            <CovidDetailsTable
              data={data}
              sortAsc={sortAsc}
              changeSort={this.changeSort}
            />
            <Footer />
          </>
        )}
      </>
    )
  }

  renderFailureView = () => (
    <div className="expand-center">
      <img
        className="failure-view__img"
        alt="failure view"
        src="https://res.cloudinary.com/dojcknl66/image/upload/v1686542817/page-not-found_aorfnt.png"
      />
      <h1>PAGE NOT FOUND</h1>
      <p>
        we’re sorry, the page you requested could not be found <br /> Please go
        back to the homepage
      </p>
      <Link to="/">
        <button className="btn btn-primary" type="button">
          Home
        </button>
      </Link>
    </div>
  )

  renderContent = () => {
    const {apiStatus} = this.state
    if (apiStatus === apiStatusConstants.success)
      return this.renderSuccessView()
    return this.renderProgressView()
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <Container className="flex-col gap-2">
            {this.renderContent()}
          </Container>
        </div>
      </>
    )
  }
}

export default Home
