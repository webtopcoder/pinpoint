import {
   
    CONTACT_REGISTER_SUCCESS,
    CONTACT_REGISTER_REQUEST,
 
} from './types';


const initialState = {
   
}

const contactReducer = (state = initialState, action) => {
    switch (action.type) {
    
        case CONTACT_REGISTER_SUCCESS: {
            return {
                ...state,
                status: action.payload.success
            }
        }
        default:
            return {
                ...state,
            };
    }
};

export default contactReducer;