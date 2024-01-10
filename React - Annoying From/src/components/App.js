import { useReducer } from "react";
import StartPage from "./StartPage";
import PhonePage1 from "./PhonePage1";
import PhonePage2 from "./PhonePage2";
import PhonePageConfirm from "./PhonePageConfirm";
import PhonePageError from "./PhonePageError";
import PhonePageDontConfirm from "./PhonePageDontConfirm";
import AddressPage from "./AddressPage";
import AddressForeign from "./AddressForeign";
import AddressError from "./AddressError";
import AddressTest from "./AddressTest";
import AddressTestFail from "./AddressTestFail";
import Final from "./Final";
import { usStates } from "./usStates";
import { initialState } from "./InitialState";

function reducer(state, action) {
  switch (action.type) {
    case "start":
      return { ...state, page: "phonePage1" };
    case "updatePhoneNumber1":
      state.phoneNumber1[action.index] += action.payload;
      if (state.phoneNumber1[action.index] > 9) {
        state.phoneNumber1[action.index] = 0;
      } else if (state.phoneNumber1[action.index] < 0) {
        state.phoneNumber1[action.index] = 9;
      }

      return { ...state };
    case "submitPhoneNumber1":
      return { ...state, page: "phonePage2" };
    case "randomizePhoneNumber2":
      state.phoneNumber2 = state.phoneNumber2.map((item) =>
        !item.locked
          ? Object.assign({
              locked: item.locked,
              number: Math.floor(Math.random() * 10),
            })
          : Object.assign({ locked: item.locked, number: item.number })
      );

      return { ...state };

    case "lockPhoneNumber2":
      state.phoneNumber2[action.index]["locked"] = true;
      return { ...state };
    case "unlockPhoneNumber2":
      state.phoneNumber2[action.index]["locked"] = false;
      return { ...state };
    case "submitPhoneNumber2":
      let phoneNumber1Join = state.phoneNumber1.join("");
      let phoneNumber2Join = state.phoneNumber2
        .map(function (el) {
          return el.number;
        })
        .join("");

      if (phoneNumber1Join === phoneNumber2Join) {
        return { ...state, page: "phonePageConfirm" };
      } else {
        return { ...state, page: "phonePageError" };
      }
    case "dontConfirmPhoneNumber":
      return { ...state, page: "phonePageDontConfirm" };
    case "hoverPhoneConfirm":
      return {
        ...state,
        phoneConfirmButtonClass: "phone-page-confirm-buttons-reversed",
      };
    case "blurPhoneConfirm":
      return {
        ...state,
        phoneConfirmButtonClass: "phone-page-confirm-buttons",
      };
    case "confirmPhoneNumber":
      return { ...state, page: "addressPage" };
    case "updateStreetAddress":
      return { ...state, streetAddress: action.payload };
    case "updateCity":
      return { ...state, city: action.payload };
    case "updateState":
      return { ...state, state: action.payload };
    case "addressForeign":
      return { ...state, page: "addressForeign" };
    case "submitAddress":
      if (
        state.streetAddress === "" ||
        state.city === "" ||
        state.state === ""
      ) {
        return { ...state, page: "addressError" };
      }
      return { ...state, page: "testAddress" };
    case "updateStateAbbreviation":
      return { ...state, stateAbbreviation: action.payload };
    case "updateStateCapital":
      return { ...state, stateCapital: action.payload };
    case "updateStateLargest":
      return { ...state, stateLargest: action.payload };
    case "updateStateAdmitted":
      return { ...state, stateAdmitted: action.payload };
    case "submitAddressTest":
      let selectedState = usStates.filter((obj) => {
        return obj.name === state.state;
      })[0];

      if (
        state.stateAbbreviation !== selectedState.abbreviation ||
        state.stateCapital !== selectedState.capitalCity ||
        state.stateLargest !== selectedState.largestCity ||
        state.stateAdmitted !== selectedState.admitted
      ) {
        return { ...state, page: "addressTestFail" };
      }
      return { ...state, page: "final" };
    case "cancel":
      return { ...initialState };
    default:
      throw new Error("unrecognized action");
  }
}

function App() {
  const [
    {
      page,
      phoneNumber1,
      phoneNumber2,
      phoneConfirmButtonClass,
      streetAddress,
      city,
      state,
      stateAbbreviation,
      stateCapital,
      stateLargest,
      stateAdmitted,
    },
    dispatcher,
  ] = useReducer(reducer, initialState);

  return (
    <div>
      <header>
        <h1>Annoying Form</h1>
      </header>

      {page === "startPage" && <StartPage dispatcher={dispatcher} />}

      {page === "phonePage1" && (
        <PhonePage1 dispatcher={dispatcher} phoneNumber={phoneNumber1} />
      )}

      {page === "phonePage2" && (
        <PhonePage2 dispatcher={dispatcher} phoneNumber={phoneNumber2} />
      )}

      {page === "phonePageConfirm" && (
        <PhonePageConfirm
          dispatcher={dispatcher}
          phoneConfirmButtonClass={phoneConfirmButtonClass}
        />
      )}

      {page === "phonePageError" && <PhonePageError dispatcher={dispatcher} />}

      {page === "phonePageDontConfirm" && (
        <PhonePageDontConfirm dispatcher={dispatcher} />
      )}

      {page === "addressPage" && (
        <AddressPage
          dispatcher={dispatcher}
          streetAddress={streetAddress}
          city={city}
          state={state}
          usStates={usStates}
        />
      )}

      {page === "addressForeign" && <AddressForeign dispatcher={dispatcher} />}

      {page === "addressError" && <AddressError dispatcher={dispatcher} />}

      {page === "testAddress" && (
        <AddressTest
          dispatcher={dispatcher}
          state={state}
          stateAbbreviation={stateAbbreviation}
          stateCapital={stateCapital}
          stateLargest={stateLargest}
          stateAdmitted={stateAdmitted}
        />
      )}

      {page === "addressTestFail" && (
        <AddressTestFail dispatcher={dispatcher} state={state} />
      )}

      {page === "final" && <Final dispatcher={dispatcher} />}
    </div>
  );
}

export default App;
