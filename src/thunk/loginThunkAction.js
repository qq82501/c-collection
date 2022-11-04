// import { wait } from "../helper/helper";

export function login(loggedUser) {
  return async function loginThunk(dispatch, getState) {
    dispatch({ type: "LOGIN", payload: loggedUser });
    // const day = 1000 * 60 * 3;
    // await wait(60000);
    // dispatch({ type: "LOGOUT" });
  };
}
