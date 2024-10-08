import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  LOGOUT,
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_AUTH_FAIL,
} from "./types";

export const checkAuthenticated = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 10000,
    };

    const body = JSON.stringify({ token: localStorage.getItem("access") });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/jwt/verify/`,
        body,
        config
      );

      if (res.data.code !== "token_not_valid") {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
      var err_detail = err.response.statusText;
      var err_status = err.response.status;

      return [0, err_detail, err_status];
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

export const googleAuthenticate = (state, code) => async (dispatch) => {
  if (state && code && !localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      timeout: 10000,
    };

    const details = {
      state: state,
      code: code,
    };
    const formBody = Object.keys(details)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
      )
      .join("&");
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?${formBody}`,
        config
      );
      dispatch({
        type: GOOGLE_AUTH_SUCCESS,
        payload: res.data,
      });
      dispatch(load_user());
    } catch (err) {
      var err_detail = err.response
        ? err.response.statusText
        : "Request Timeout";
      var err_status = err.response ? err.response.status : "408";
      dispatch({
        type: GOOGLE_AUTH_FAIL,
      });
      return [0, err_detail, err_status];
    }
  }
};

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
      timeout: 10000,
    };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/users/me/`,
        config
      );

      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      var err_detail = err.response
        ? err.response.statusText
        : "Request Timeout";
      var err_status = err.response ? err.response.status : "408";
      console.log("ERRRRR");
      dispatch({
        type: USER_LOADED_FAIL,
      });
      return [0, err_detail, err_status];
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 10000,
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(load_user());

    return [1, "Login successful."];
  } catch (err) {
    var err_detail = err.response ? err.response.statusText : "Request Timeout";
    var err_status = err.response ? err.response.status : "408";
    dispatch({
      type: LOGIN_FAIL,
    });

    return [0, err_detail, err_status];
  }
};

export const signup = (email, password, re_password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 10000,
  };
  //name is required, it is latter changed to the user email in the views
  const name = "Placeholder";

  const body = JSON.stringify({ name, email, password, re_password });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/`,
      body,
      config
    );

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });
    return [1, "Singup successfully."];
  } catch (err) {
    dispatch({
      type: SIGNUP_FAIL,
    });
    var err_detail = err.response.statusText;
    var err_status = err.response.status;

    return [0, err_detail, err_status];
  }
};

export const verify = (uid, token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 10000
  };

  const body = JSON.stringify({ uid, token });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/activation/`,
      body,
      config
    );

    dispatch({
      type: ACTIVATION_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: ACTIVATION_FAIL,
    });
    var err_detail = err.response.statusText
    var err_status = err.response.status
    
    return [0, err_detail, err_status]
  }
};

export const reset_password = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 10000,
  };

  const body = JSON.stringify({ email });

  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/reset_password/`,
      body,
      config
    );
    dispatch({
      type: PASSWORD_RESET_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: PASSWORD_RESET_FAIL,
    });
    var err_detail = err.response.statusText
    var err_status = err.response.status
    
    return [0, err_detail, err_status]
  }
};

export const reset_password_confirm =
  (uid, token, new_password, re_new_password) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });
    console.log(body);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`,
        body,
        config
      );
      dispatch({
        type: PASSWORD_RESET_CONFIRM_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: PASSWORD_RESET_CONFIRM_FAIL,
      });
      var err_detail = err.response.statusText
      var err_status = err.response.status
    
      return [0, err_detail, err_status]
    }
  };

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
