function AddressError({ dispatcher }) {
  return (
    <div>
      <p>
        Error: Address is incomplete. How are we supposed to sell your address
        to junkmail companies if you don't enter it?
      </p>

      <button className="btn" onClick={() => dispatcher({ type: "cancel" })}>
        Restart
      </button>
    </div>
  );
}

export default AddressError;
