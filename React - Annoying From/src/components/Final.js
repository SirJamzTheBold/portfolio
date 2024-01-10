function Final({ dispatcher }) {
  return (
    <div>
      <p>
        Thanks for filling out the form. This site is currently under
        construction. Check back in again later (yes you will have to fill in
        the form again.)
      </p>

      <button className="btn" onClick={() => dispatcher({ type: "cancel" })}>
        Restart
      </button>
    </div>
  );
}

export default Final;
