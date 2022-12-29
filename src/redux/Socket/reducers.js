import Socket from 'socket.io-client';
import {
    S_LOGIN
} from './types';



const initialState = {
   
}

const socketReducer = (state = initialState, action) => {
    const socket = Socket.connect("http://192.168.116.126:8080");
    switch (action.type) {
    
        case S_LOGIN: {
            socket.emit('login', action.payload);
            return {
                ...state,
            }
        }
        default:
            return {
                ...state,
            };
    }
};

export default socketReducer;