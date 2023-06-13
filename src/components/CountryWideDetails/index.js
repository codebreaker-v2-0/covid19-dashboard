const CountryWideDetails = props => {
  const {data} = props
  let totalConfirmed = 0
  let totalRecovered = 0
  let totalDeceased = 0

  data.forEach(item => {
    const {confirmed, recovered, deceased} = item
    totalConfirmed += confirmed
    totalRecovered += recovered
    totalDeceased += deceased
  })

  return (
    <div className="country-wide-container">
      <div
        className="country-wide-item text-danger"
        testid="countryWideConfirmedCases"
      >
        <p>Confirmed</p>
        <img
          className="icon"
          alt="country wide confirmed cases pic"
          src="https://res.cloudinary.com/dojcknl66/image/upload/v1686565310/Groupconfirmed_uwbykt.png"
        />
        <p className="country-wide-count">{totalConfirmed}</p>
      </div>
      <div
        className="country-wide-item text-primary"
        testid="countryWideActiveCases"
      >
        <p>Active</p>
        <img
          className="icon"
          alt="country wide active cases pic"
          src="https://res.cloudinary.com/dojcknl66/image/upload/v1686565310/protection_1active_trfzip.png"
        />
        <p className="country-wide-count">
          {totalConfirmed - totalRecovered - totalDeceased}
        </p>
      </div>
      <div
        className="country-wide-item text-success"
        testid="countryWideRecoveredCases"
      >
        <p>Recovered</p>
        <img
          className="icon"
          alt="country wide recovered cases pic"
          src="https://res.cloudinary.com/dojcknl66/image/upload/v1686565310/recovered_1recovered_dsszeh.png"
        />
        <p className="country-wide-count">{totalRecovered}</p>
      </div>
      <div className="country-wide-item" testid="countryWideDeceasedCases">
        <p>Deceased</p>
        <img
          className="icon"
          alt="country wide deceased cases pic"
          src="https://res.cloudinary.com/dojcknl66/image/upload/v1686565310/Outlinedeceased_azdmbb.png"
        />
        <p className="country-wide-count">{totalDeceased}</p>
      </div>
    </div>
  )
}

export default CountryWideDetails
