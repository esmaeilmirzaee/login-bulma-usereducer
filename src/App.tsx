import { useReducer } from "react";
import login from "./utils";

import "./styles.css";

function loginReducer(state: any, action: any) {
  if (action.type === "input") {
    return { ...state, [action.payload.id]: action.payload.value };
  }
  if (action.type === "login") {
    return { ...state, isLoading: true, error: "" };
  }
  if (action.type === "success") {
    return { ...state, isLoggedIn: true };
  }
  if (action.type === "logout") {
    return { ...state, isLoggedIn: false, email: "", password: "" };
  }
  if (action.type === "error") {
    return { ...state, isLoggedIn: false, error: action.payload };
  }
  return state;
}

let initialState = {
  email: "",
  password: "",
  error: "",
  isLoading: false,
  isLoggedIn: false
};

export default function App() {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  async function onSubmit() {
    try {
      dispatch({ type: login });
      await login({ email: state.email, password: state.password });
      dispatch({ type: "success" });
    } catch (err) {
      dispatch({ type: "error", payload: err });
    } finally {
      dispatch({ type: "final" });
    }
  }

  return state.isLoggedIn ? (
    <div className="columns is-mobile is-centered mt-6">
      <div className="column card is-half">
        <h1 className="is-info has-text-centered">
          {state.email} is logged In
        </h1>
        <button
          className="button is-info mt-1 is-full"
          onClick={() => dispatch({ type: "logout" })}
        >
          log out
        </button>
      </div>
    </div>
  ) : (
    <>
      <div className="columns is-mobile is-centered mt-6">
        <div className="column is-half card">
          {state.error ? (
            <h3 className="text is-info has-text-centered">{state.error}</h3>
          ) : (
            ""
          )}
          <h1 className="title has-text-centered">Please login</h1>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <label className="label">Email</label>
              <input
                className="input"
                type="email"
                placeholder="Email"
                value={state.email}
                onChange={(e) =>
                  dispatch({
                    type: "input",
                    payload: { id: "email", value: e.currentTarget.value }
                  })
                }
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                className="input"
                type="password"
                placeholder="Password"
                value={state.password}
                onChange={(e) =>
                  dispatch({
                    type: "input",
                    payload: { id: "password", value: e.currentTarget.value }
                  })
                }
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>

          {/* footer */}
          <footer className="card-footer">
            {state.email && state.password ? (
              <button
                className={`card-footer-item button is-primary is-outlined ${
                  state.isLoading ? "is-loading" : ""
                }`}
                onClick={onSubmit}
              >
                Login
              </button>
            ) : (
              <button
                className={`card-footer-item button is-primary is-outlined`}
                disabled
              >
                Login
              </button>
            )}
          </footer>
        </div>
      </div>
    </>
  );
}
