function PhonePageConfirm({ dispatcher, phoneConfirmButtonClass }) {
  return (
    <div>
      <p>Did you enter the correct phone number?</p>
      <div
        onMouseOver={() => dispatcher({ type: "hoverPhoneConfirm" })}
        onMouseOut={() => dispatcher({ type: "blurPhoneConfirm" })}
        className={phoneConfirmButtonClass}
      >
        <button
          className="confirm-btn btn"
          onClick={() => dispatcher({ type: "confirmPhoneNumber" })}
        >
          Yes
        </button>
        <button
          className="deny-btn btn"
          onClick={() => dispatcher({ type: "dontConfirmPhoneNumber" })}
        >
          No
        </button>
      </div>
    </div>
  );
}

export default PhonePageConfirm;
