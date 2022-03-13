import { ContactActions } from "./ContactActions";
import { DTActions } from "./DecisionTreeActions";
import { KNNActions } from "./KNNActions";
import { KMeansActions } from "./KMeansActions";

export type Actions = ContactActions | DTActions | KNNActions | KMeansActions;
