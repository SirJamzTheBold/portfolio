function AddressPage({ dispatcher, streetAddress, city, state, usStates }) {
  return (
    <div>
      <p>What is your address?</p>
      <label for="address-form-street-address">Street Address:</label>&nbsp;
      <input
        id="address-form-street-address"
        onChange={(e) =>
          dispatcher({ type: "updateStreetAddress", payload: e.target.value })
        }
        value={streetAddress}
        type="text"
      />
      <br />
      <label for="address-form-city">City:</label>&nbsp;
      <input
        id="address-form-city"
        onChange={(e) =>
          dispatcher({ type: "updateCity", payload: e.target.value })
        }
        value={city}
        type="text"
      />
      <br />
      <label for="address-form-state">State:</label>&nbsp;
      <select
        id="address-form-state"
        value={state}
        onChange={(e) =>
          dispatcher({ type: "updateState", payload: e.target.value })
        }
      >
        <option value="">Select State</option>
        {usStates.map((state) => (
          <option key={state.key} value={state.name}>
            {state.name}
          </option>
        ))}
      </select>
      <br />
      <br />
      <button
        className="btn"
        onClick={() => dispatcher({ type: "submitAddress" })}
      >
        Submit
      </button>
      <button className="btn" onClick={() => dispatcher({ type: "cancel" })}>
        Cancel
      </button>
      <br />
      <br />
      <button
        className="btn"
        onClick={() => dispatcher({ type: "addressForeign" })}
      >
        I don't live in the USA
      </button>
    </div>
  );
}

export default AddressPage;
