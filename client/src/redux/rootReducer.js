import { combineReducers } from "redux";
import { authReducer } from "./auth/reducer";
import { userReducer } from "./users/reducer";
import { propertyReducer } from "./properties/reducer"
import { userPropertyReducer } from './user-properties/reducer'
import { amenityReducer } from "./amenities/reducer";
import { developerReducer } from "./developers/reducer"
import { unitTypeReducer } from "./unit-types/reducer"
import { locationReducer } from "./locations/reducer"
import { blogReducer } from "./blogs/reducer"
import { appraisalReducer } from "./appraisals/reducer"
import { commentReducer } from "./comments/reducer"
import { replyReducer } from "./replies/reducer"
import { likeReducer } from "./likes/reducer"
import { notificationReducer } from "./notifications/reducer"
import { contactReducer } from "./contacts/reducer"

export default combineReducers({
  authReducer,
  userReducer,
  propertyReducer,
  userPropertyReducer,
  amenityReducer,
  developerReducer,
  unitTypeReducer,
  locationReducer,
  blogReducer,
  appraisalReducer,
  commentReducer,
  replyReducer,
  likeReducer,
  notificationReducer,
  contactReducer,
});
