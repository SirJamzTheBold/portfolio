function AddressForeign({ dispatcher }) {
  return (
    <div>
      <p>
        This form does not support international addresses. Please move to the
        USA and then restart the form.
      </p>
      <button
        className="deny-btn btn"
        onClick={() => dispatcher({ type: "cancel" })}
      >
        Ok, I've moved
      </button>
    </div>
  );
}

export default AddressForeign;
