function PhonePageError({ dispatcher }) {
  return (
    <div>
      <p>
        I'm sorry you entered two different phone numbers. We weren't planning
        on calling you, but we might need to (you never know) and now we won't
        know which number to call. You will have to try again.
      </p>
      <button className="btn" onClick={() => dispatcher({ type: "cancel" })}>
        Restart
      </button>
    </div>
  );
}

export default PhonePageError;
