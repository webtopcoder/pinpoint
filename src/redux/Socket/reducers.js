import Socket from 'socket.io-client';
import toast from "@/components/Toast";
import {
    S_LOGIN
} from './types';

const initialState = {
   socket: Socket.connect("http://192.168.116.126:8080")
}

const socketReducer = (state = initialState, action) => {
    state.socket.on('follow', (data) => {
        toast({ type: 'success', message: data.msg });
    })

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