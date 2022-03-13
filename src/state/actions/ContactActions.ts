import ActionTypes from "../action-types";

interface SetContactEmailAction {
  type: ActionTypes.SET_CONTACT_EMAIL;
  payload: string;
}

interface SetContactSubjectAction {
  type: ActionTypes.SET_CONTACT_SUBJECT;
  payload: string;
}

interface SetContactDescriptionAction {
  type: ActionTypes.SET_CONTACT_DESCRIPTION;
  payload: string;
}

interface SetContactLoadingAction {
  type: ActionTypes.SET_CONTACT_LOADING;
  payload: boolean;
}

interface SetContactErrorAction {
  type: ActionTypes.SET_CONTACT_ERROR;
  payload: string | null;
}

interface SetContactSuccessAction {
  type: ActionTypes.SET_CONTACT_SUCCESS;
  payload: string | null;
}

interface ResetContactState {
  type: ActionTypes.RESET_CONTACT_STATE;
}

export type ContactActions =
  | SetContactEmailAction
  | SetContactSubjectAction
  | SetContactDescriptionAction
  | SetContactLoadingAction
  | SetContactErrorAction
  | SetContactSuccessAction
  | ResetContactState;
