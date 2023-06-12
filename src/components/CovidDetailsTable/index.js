import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'

const CovidDetailsTable = props => {
  const {data, sortAsc, changeSort} = props
  const updatedData = [...data]
  if (!sortAsc) {
    updatedData.sort((a, b) => {
      if (a.stateName > b.stateName) return -1
      if (a.stateName < b.stateName) return 1
      return 0
    })
  }

  const setSortAsc = () => {
    changeSort(true)
  }

  const setSortDesc = () => {
    changeSort(false)
  }

  return (
    <div className="covid-details-table" testid="stateWiseCovidDataTable">
      <div className="table-header table-row flex">
        <p className="state-name">
          States/UT
          <button
            className="btn-transparent"
            type="button"
            testid="ascendingSort"
            onClick={setSortAsc}
          >
            <FcGenericSortingAsc />
          </button>
          <button
            className="btn-transparent"
            type="button"
            testid="descendingSort"
            onClick={setSortDesc}
          >
            <FcGenericSortingDesc />
          </button>
        </p>
        <p>Confirmed</p>
        <p>Active</p>
        <p>Recovered</p>
        <p>Deceased</p>
        <p>Population</p>
      </div>
      <ul>
        {updatedData.map(item => {
          const {
            id,
            stateName,
            confirmed,
            recovered,
            deceased,
            population,
          } = item
          return (
            <li key={id} className="table-row flex">
              <p className="text-light state-name">{stateName}</p>
              <p className="text-danger">{confirmed}</p>
              <p className="text-primary">{confirmed - recovered - deceased}</p>
              <p className="text-success">{recovered}</p>
              <p>{deceased}</p>
              <p className="text-light">{population}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CovidDetailsTable
