import { Dispatch } from "react";
import axios from 'axios';

import createDataContext from "../createDataContext";

import ActionTypes from "../action-types";
import { Actions } from "../actions";

import { ALERT_TIMEOUT } from "../../constants";

// Manage Alert timeouts
let lastAlertTimeoutId: ReturnType<typeof setTimeout>;

interface ContactState {
  email: string;
  subject: string;
  description: string;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: ContactState = {
  email: '',
  subject: '',
  description: '',
  loading: false,
  error: null,
  success: null,
};

const reducer = (state: ContactState, action: Actions): ContactState => {
  switch(action.type) {
    case ActionTypes.SET_CONTACT_EMAIL:
      return { ...state, error: null, success: null, email: action.payload };
    case ActionTypes.SET_CONTACT_SUBJECT:
      return { ...state, error: null, success: null, subject: action.payload };
    case ActionTypes.SET_CONTACT_DESCRIPTION:
      return { ...state, error: null, success: null, description: action.payload };
    case ActionTypes.SET_CONTACT_LOADING:
      return { ...state, error: null, success: null, loading: action.payload };
    case ActionTypes.SET_CONTACT_ERROR:
      return { ...state, success: null, error: action.payload };
    case ActionTypes.SET_CONTACT_SUCCESS:
      return { ...state, error: null, success: action.payload };
    case ActionTypes.RESET_CONTACT_STATE:
      return initialState;
    default: return state;
  }
};

const setContactEmail = (dispatch: Dispatch<Actions>) => ({ email }: { email: string }) => {
  dispatch({ type: ActionTypes.SET_CONTACT_EMAIL, payload: email });
};

const setContactSubject = (dispatch: Dispatch<Actions>) => ({ subject }: { subject: string }) => {
  dispatch({ type: ActionTypes.SET_CONTACT_SUBJECT, payload: subject });
};

const setContactDescription = (dispatch: Dispatch<Actions>) => ({ description }: { description: string }) => {
  dispatch({ type: ActionTypes.SET_CONTACT_DESCRIPTION, payload: description });
};

const removeContactError = (dispatch: Dispatch<Actions>) => () => dispatch({
  type: ActionTypes.SET_CONTACT_ERROR,
  payload: null
});

const removeContactSuccess = (dispatch: Dispatch<Actions>) => () => dispatch({
  type: ActionTypes.SET_CONTACT_SUCCESS,
  payload: null
});

const submitContactRequest = (dispatch: Dispatch<Actions>) => async (
  { email, subject, description }: { email: string, subject: string, description: string }) => {
  dispatch({ type: ActionTypes.SET_CONTACT_LOADING, payload: true });

  try {
    // Validation
    if (!email || !subject || !description) {
      throw new Error("All fields are required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      throw new Error("Email address must be valid");
    }

    await axios({
      method: 'POST',
      url: 'https://api.emailjs.com/api/v1.0/email/send',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        service_id: process.env.REACT_APP_SERVICE_ID,
        template_id: process.env.REACT_APP_TEMPLATE_ID,
        user_id: process.env.REACT_APP_USER_ID,
        template_params: { email, subject, description }
      })
    });

    dispatch({ type: ActionTypes.RESET_CONTACT_STATE });
    dispatch({ type: ActionTypes.SET_CONTACT_SUCCESS, payload: 'Request has been sent!' });
    lastAlertTimeoutId && clearTimeout(lastAlertTimeoutId);
    lastAlertTimeoutId = setTimeout(() => dispatch({ type: ActionTypes.SET_CONTACT_SUCCESS, payload: null }), ALERT_TIMEOUT);
  } catch (e: any) {
    dispatch({ type: ActionTypes.SET_CONTACT_LOADING, payload: false });
    dispatch({ type: ActionTypes.SET_CONTACT_ERROR, payload: e.message });
    lastAlertTimeoutId && clearTimeout(lastAlertTimeoutId);
    lastAlertTimeoutId = setTimeout(() => dispatch({ type: ActionTypes.SET_CONTACT_ERROR, payload: null }), ALERT_TIMEOUT);
  }
};

export const { Provider, Context } = createDataContext(
  initialState,
  { setContactEmail, setContactSubject, setContactDescription, removeContactError, removeContactSuccess, submitContactRequest },
  reducer
);