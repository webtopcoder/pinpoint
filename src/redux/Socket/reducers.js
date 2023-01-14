import Socket from 'socket.io-client';
import toast from "@/components/Toast";
import {
    S_LOGIN
} from './types';

const initialState = {
   socket: Socket("http://localhost:8080")
}

const socketReducer = (state = initialState, action) => {
    switch (action.type) {
    
        case S_LOGIN: {
            state.socket.emit('login', action.payload);
        }
        default:
            return {
                ...state,
            };
    }
};

export default socketReducer;