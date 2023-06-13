const StateWideDetails = props => {
  const {data, updateSortBy} = props
  const {total} = data
  const {confirmed, deceased, recovered} = total

  return (
    <div className="country-wide-container">
      <button
        className="country-wide-item text-danger"
        testid="stateSpecificConfirmedCasesContainer"
        type="button"
        onClick={() => updateSortBy('confirmed')}
      >
        <p>Confirmed</p>
        <img
          className="icon"
          alt="state specific confirmed cases pic"
          src="https://res.cloudinary.com/dojcknl66/image/upload/v1686565310/Groupconfirmed_uwbykt.png"
        />
        <p className="country-wide-count">{confirmed}</p>
      </button>
      <button
        className="country-wide-item text-primary"
        testid="stateSpecificActiveCasesContainer"
        type="button"
        onClick={() => updateSortBy('active')}
      >
        <p>Active</p>
        <img
          className="icon"
          alt="state specific active cases pic"
          src="https://res.cloudinary.com/dojcknl66/image/upload/v1686565310/protection_1active_trfzip.png"
        />
        <p className="country-wide-count">{confirmed - recovered - deceased}</p>
      </button>
      <button
        className="country-wide-item text-success"
        testid="stateSpecificRecoveredCasesContainer"
        type="button"
        onClick={() => updateSortBy('recovered')}
      >
        <p>Recovered</p>
        <img
          className="icon"
          alt="state specific recovered cases pic"
          src="https://res.cloudinary.com/dojcknl66/image/upload/v1686565310/recovered_1recovered_dsszeh.png"
        />
        <p className="country-wide-count">{recovered}</p>
      </button>
      <button
        className="country-wide-item"
        testid="stateSpecificDeceasedCasesContainer"
        type="button"
        onClick={() => updateSortBy('deceased')}
      >
        <p>Deceased</p>
        <img
          className="icon"
          alt="state specific deceased cases pic"
          src="https://res.cloudinary.com/dojcknl66/image/upload/v1686565310/Outlinedeceased_azdmbb.png"
        />
        <p className="country-wide-count">{deceased}</p>
      </button>
    </div>
  )
}

export default StateWideDetails
