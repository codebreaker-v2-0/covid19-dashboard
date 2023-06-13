import {Component} from 'react'
import {Link} from 'react-router-dom'

import Footer from '../Footer'
import {Container} from '../../utilities'
import LoaderSpinner from '../LoaderSpinner'
import StateWideDetails from '../StateWideDetails'
import LineChartsContainer from '../LineChartsContainer'

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

class StateDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.progress,
    data: [],
    sortBy: 'confirmed',
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const response = await fetch('https://apis.ccbp.in/covid19-state-wise-data')
    const data = await response.json()

    const {match} = this.props
    const {stateCode} = match.params
    const stateData = data[stateCode]
    stateData.stateCode = stateCode
    stateData.name = statesList.find(
      item => item.state_code === stateCode,
    ).state_name

    this.setState({apiStatus: apiStatusConstants.success, data: stateData})
  }

  updateSortBy = value => {
    this.setState({sortBy: value})
  }

  renderProgressView = () => (
    <div className="expand-center" testid="stateDetailsLoader">
      <LoaderSpinner />
    </div>
  )

  renderSuccessView = () => {
    const {data, sortBy} = this.state
    const {name, meta, districts, stateCode} = data

    const date = new Date(meta.last_updated)
    const dateString = date.toLocaleString('en-US', {dateStyle: 'long'})

    const updatedDistrictsData = Object.entries(districts).map(item => {
      const {total} = item[1]
      const {confirmed, deceased, recovered} = total
      const updatedConfirmed = confirmed || 0
      const updatedDeceased = deceased || 0
      const updatedRecovered = recovered || 0
      return {
        districtName: item[0],
        confirmed: updatedConfirmed,
        active: updatedConfirmed - updatedDeceased - updatedRecovered,
        recovered: updatedRecovered,
        deceased: updatedDeceased,
      }
    })
    updatedDistrictsData.sort((a, b) => {
      if (a[sortBy] > b[sortBy]) return -1
      if (a[sortBy] < b[sortBy]) return 1
      return 0
    })
    return (
      <>
        <h1>{name}</h1>
        <p>{`Last update on ${dateString}`}</p>
        <p>Tested</p>
        <p>{data.total.tested}</p>
        <StateWideDetails data={data} updateSortBy={this.updateSortBy} />
        <h1 className="text-danger">Top Districts</h1>
        <ul testid="topDistrictsUnorderedList">
          {updatedDistrictsData.map(item => (
            <li className="flex" key={`top-districts-${item.districtName}`}>
              <p>{item.districtName}</p>
              <p>{item[sortBy]}</p>
            </li>
          ))}
        </ul>
        <LineChartsContainer stateCode={stateCode} sortBy={sortBy} />

        <Footer />
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
        <div className="home-container">
          <Container className="flex-col gap-2">
            {this.renderContent()}
          </Container>
        </div>
      </>
    )
  }
}

export default StateDetails
