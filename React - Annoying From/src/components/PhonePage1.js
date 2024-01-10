function PhonePage1({ dispatcher, phoneNumber }) {
  return (
    <div className="phone-page-1">
      <p>Enter your Phone Number</p>

      <div className="phone-page-container">
        {phoneNumber.map((number, index) => (
          <div key={`phone-number-1-${index}`}>
            {index === 0 && <span className="phone-page-spacer">(</span>}
            {index === 3 && <span className="phone-page-spacer">)</span>}
            {index === 6 && <span className="phone-page-spacer">&nbsp;</span>}
            <span className="phone-page-button">
              <button
                onClick={() =>
                  dispatcher({
                    type: "updatePhoneNumber1",
                    index: index,
                    payload: -1,
                  })
                }
              >
                -
              </button>
              <input
                type="text"
                className="phone-page-input"
                value={number}
                disabled={true}
              />
              <button
                onClick={() =>
                  dispatcher({
                    type: "updatePhoneNumber1",
                    index: index,
                    payload: 1,
                  })
                }
              >
                +
              </button>
            </span>
          </div>
        ))}
      </div>

      <button
        className="btn"
        onClick={() => dispatcher({ type: "submitPhoneNumber1" })}
      >
        Next Page
      </button>

      <button className="btn" onClick={() => dispatcher({ type: "cancel" })}>
        Cancel
      </button>
    </div>
  );
}

export default PhonePage1;
