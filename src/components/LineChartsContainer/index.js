import {Component} from 'react'

import LineChartItem from '../LineChartItem'
import LoaderSpinner from '../LoaderSpinner'
import BarChartItem from '../BarChartItem'

const apiStatusConstants = {
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class LineChartsContainer extends Component {
  state = {
    apiStatus: apiStatusConstants.progress,
    data: [],
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})

    const {stateCode} = this.props

    const URL = `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`
    const response = await fetch(URL)
    const data = await response.json()
    const updatedData = Object.entries(data[stateCode].dates).map(item => {
      const {total} = item[1]
      const {confirmed, deceased, recovered, tested} = total
      const updatedConfirmed = confirmed || 0
      const updatedDeceased = deceased || 0
      const updatedRecovered = recovered || 0
      const updatedTested = tested || 0

      return {
        date: item[0],
        confirmed: updatedConfirmed,
        active: updatedConfirmed - updatedDeceased - updatedRecovered,
        recovered: updatedRecovered,
        deceased: updatedDeceased,
        tested: updatedTested,
      }
    })

    this.setState({apiStatus: apiStatusConstants.success, data: updatedData})
  }

  renderProgressView = () => (
    <div className="expand-center" testid="timelinesDataLoader">
      <LoaderSpinner />
    </div>
  )

  renderSuccessView = () => {
    const {data} = this.state
    const {sortBy} = this.props
    return (
      <>
        <h1>Success</h1>
        <BarChartItem data={data} sortBy={sortBy} />
        <LineChartItem data={data} type="confirmed" />
        <LineChartItem data={data} type="active" />
        <LineChartItem data={data} type="recovered" />
        <LineChartItem data={data} type="deceased" />
        <LineChartItem data={data} type="tested" />
      </>
    )
  }

  renderContent = () => {
    const {apiStatus} = this.state
    if (apiStatus === apiStatusConstants.success)
      return this.renderSuccessView()
    return this.renderProgressView()
  }

  render() {
    return (
      <>
        <div testid="lineChartsContainer">
          <h1>Daily Spread Trends</h1>
          {this.renderContent()}
        </div>
      </>
    )
  }
}

export default LineChartsContainer
