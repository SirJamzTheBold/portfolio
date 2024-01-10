function PhonePageDontConfirm({ dispatcher }) {
  return (
    <div>
      <p>
        Ok, since you're not sure if you submitted the correct phone number,
        let's start over.
      </p>

      <button className="btn" onClick={() => dispatcher({ type: "cancel" })}>
        Restart
      </button>
    </div>
  );
}

export default PhonePageDontConfirm;
