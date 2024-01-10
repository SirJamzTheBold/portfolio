function AddressTestFail({ dispatcher, state }) {
  return (
    <div>
      <p>
        I knew you were lying about living in {state}. Fill out the form again
        and this time be honest about where you live.
      </p>

      <button className="btn" onClick={() => dispatcher({ type: "cancel" })}>
        Restart
      </button>
    </div>
  );
}

export default AddressTestFail;
