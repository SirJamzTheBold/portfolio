function AddressTest({
  dispatcher,
  state,
  stateAbbreviation,
  stateCapital,
  stateLargest,
  stateAdmitted,
}) {
  return (
    <div>
      <p>
        So you're from {state}, huh? Can you prove it by answering the following
        questions about your state correctly?
      </p>
      <label for="state-abbreviation">
        What is the abbreviation for {state}?
      </label>
      &nbsp;
      <input
        id="state-abbreviation"
        type="text"
        value={stateAbbreviation}
        onChange={(e) =>
          dispatcher({
            type: "updateStateAbbreviation",
            payload: e.target.value,
          })
        }
      />
      <br />
      <label for="state-capital">What is the capital city of {state}?</label>
      &nbsp;
      <input
        id="state-capital"
        type="text"
        value={stateCapital}
        onChange={(e) =>
          dispatcher({
            type: "updateStateCapital",
            payload: e.target.value,
          })
        }
      />
      <br />
      <label for="state-largest">What is the largest city in {state}?</label>
      &nbsp;
      <input
        id="state-largest"
        type="text"
        value={stateLargest}
        onChange={(e) =>
          dispatcher({
            type: "updateStateLargest",
            payload: e.target.value,
          })
        }
      />
      <br />
      <label for="state-admitted">
        When was {state} admitted to the Union?
      </label>
      &nbsp;
      <input
        id="state-admitted"
        type="date"
        value={stateAdmitted}
        onChange={(e) =>
          dispatcher({
            type: "updateStateAdmitted",
            payload: e.target.value,
          })
        }
      />
      <br />
      <br />
      <button
        className="btn"
        onClick={() => dispatcher({ type: "submitAddressTest" })}
      >
        Submit
      </button>
      <button className="btn" onClick={() => dispatcher({ type: "cancel" })}>
        Cancel
      </button>
    </div>
  );
}

export default AddressTest;
