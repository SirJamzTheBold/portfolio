import { useEffect } from "react";

function PhonePage2({ dispatcher, phoneNumber }) {
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatcher({ type: "randomizePhoneNumber2" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatcher]
  );

  return (
    <div className="phone-page-2">
      <p>Confirm Phone Numbner</p>
      <div className="phone-page-container">
        {phoneNumber.map((item, index) => (
          <div key={`phone-number-2-${index}`}>
            {index === 0 && <span className="phone-page-spacer">(</span>}
            {index === 3 && <span className="phone-page-spacer">)</span>}
            {index === 6 && <span className="phone-page-spacer">&nbsp;</span>}
            <span>
              <input
                type="text"
                className="phone-page-input"
                value={item.number}
                disabled={true}
              />
              <br />
              {item.locked ? (
                <button
                  onClick={() =>
                    dispatcher({
                      type: "unlockPhoneNumber2",
                      index: index,
                    })
                  }
                >
                  Start
                </button>
              ) : (
                <button
                  onClick={() =>
                    dispatcher({
                      type: "lockPhoneNumber2",
                      index: index,
                    })
                  }
                >
                  Stop
                </button>
              )}
            </span>
          </div>
        ))}
      </div>

      <button
        className="btn"
        onClick={() => dispatcher({ type: "submitPhoneNumber2" })}
      >
        Next Page
      </button>

      <button className="btn" onClick={() => dispatcher({ type: "cancel" })}>
        Cancel
      </button>
    </div>
  );
}

export default PhonePage2;
