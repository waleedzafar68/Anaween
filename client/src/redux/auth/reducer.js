import * as types from "./types"
import { canAccessSessionStorage } from '../../utils/canAccessSessionStorage'
import toast from 'react-hot-toast'

const initialState = {
  token: canAccessSessionStorage() ? sessionStorage.getItem('accessToken') : '',
  isAuthenticated: null,
  loading: true,
  errors: null,
//   user:canAccessSessionStorage()
//   ? sessionStorage.getItem('userId') === undefined
//     ? null
//     : JSON.parse(sessionStorage.getItem('userId'))
//   : ''
}
export const authReducer = (state = initialState, action) =>{
    const response = action.response;
    let toastId = null;
    
    switch (action.type) {
        case types.LOGIN_REQUEST:
            toastId = toast.loading('Loading...');
            return { ...state, toastId: toastId }

        case types.LOGIN_SUCCESS:
            if(response.data.Role==="Admin"){
                if (response.data.token){
                    sessionStorage.setItem('adminToken', response.data.token);                
                }
                window.location.replace(`/admin/viewAllProperties`)
            }else{
                window.location.replace(`/`)
            }

            if (response.data.token) {
                sessionStorage.setItem('accessToken', response.data.token);                
                sessionStorage.setItem('userId', response.data._id); 
                if(response.data.isPro){
                    sessionStorage.setItem('isPro', `${response.data.isPro}`);                
                }               
            }
            toast.success("Authentication Successful!", { id: state.toastId });            
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.response.data,
                errors: null
            };
        case types.LOGIN_ERROR:
            toast.error(action.error?.message || "Unexpected Error Occurred", { id: state.toastId, });

            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                errors: action.error
            };

            case types.LOG_OUT_REQUEST:
                toastId = toast.loading('Loading...');
                return { ...state, toastId: toastId }

        case types.LOG_OUT_SUCCESS:
            sessionStorage.removeItem('userId');
            window.location.replace(`/auth/login`)
            toast.success("Logout Successful!", { id: state.toastId });

            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null,
                errors: null
            };
        case types.LOG_OUT_ERROR:
            toast.error(action.error, { id: state.toastId, });

            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                errors: action.error
            };
      
        case types.REGISTER_REQUEST:
            toastId = toast.loading('Loading...');            
            return { ...state, toastId: toastId }

        case types.REGISTER_SUCCESS:
            if (response.data.token) {
                sessionStorage.setItem('accessToken', response.data.token);                
                sessionStorage.setItem('userId', response.data._id);                
            }
            toast.success("Logout Successful!", { id: state.toastId });
            return { ...state, response };
        case types.REGISTER_ERROR:
            toast.error(action.error, { id: state.toastId, });
            return { ...state, response };
        default:
            return state;
    }
};


// import {
//     FIELDS_SUCCESS,
//     FIELDS_FAIL
//   } from '../types'
  
 
//   export default function (state = initialState, action) {
//     const { type, payload } = action
  
//     switch (type) {
//       case USER_LOADED:
//         return {
//           ...state,
//           isAuthenticated: true,
//           loading: false,
//           user: payload,
//         }
//       case GET_TRIAL_ENDS_ON_SUCCESS:
//         return {
//           ...state,
//           user: { ...state.user, ...payload },
//         }
//       case FIELDS_SUCCESS: {
      
//         validFields = [...validFields, ...payload]
  
//         const errors = state.errors
//           ? state.errors.filter(error => {
//               for (let i = 0; i < payload.length; i++) {
//                 if (Object.keys(payload[i])[0] === Object.keys(error)[0]) return false
//               }
//               return true
//             })
//           : []
  
//         return {
//           ...state,
//           validFields,
//           errors,
//         }
//       }
//       case FIELDS_FAIL: {
//         let errors = []
//         if (state.errors) {
//           errors = state.errors.filter(error => {
//             for (let i = 0; i < payload.length; i++) {
//               if (Object.keys(payload[i])[0] === Object.keys(error)[0]) return false
//             }
  
//             return true
//           })
//         }
//         errors = [...errors, ...payload]
  
//         return {
//           ...state,
//           errors,

//         }
//       }
  
  
//       default:
//         return state
//     }
//   }