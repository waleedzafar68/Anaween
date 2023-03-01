import { all } from "redux-saga/effects";
import authSage from "./auth/saga";
import usersSaga from "./users/saga";
import propertySaga from "./properties/saga"
import userPropertySaga from './user-properties/saga'
import amenitySaga from "./amenities/saga";
import developerSaga from "./developers/saga";
import unitTypeSaga from "./unit-types/saga";
import locationSaga from "./locations/saga";
import blogSaga from './blogs/saga'
import appraisalSaga from './appraisals/saga'
import commentSaga from './comments/saga'
import replySaga from './replies/saga'
import likeSaga from './likes/saga'
import notificationSaga from './notifications/saga'
import contactSaga from './contacts/saga'


export default function* rootSaga() {
  yield all([
    authSage(),
    usersSaga(),
    propertySaga(),
    userPropertySaga(),
    amenitySaga(),
    developerSaga(),
    unitTypeSaga(),
    locationSaga(),
    blogSaga(),
    appraisalSaga(),
    commentSaga(),
    replySaga(),
    likeSaga(),
    notificationSaga(),
    contactSaga(),
  ]);
}
