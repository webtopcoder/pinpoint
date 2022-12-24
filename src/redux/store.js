import { createStore, applyMiddleware, compose } from 'redux'
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import hardSet from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import rootReducer from "./rootReducer";

const composeEnhancers =
    (process.env.NODE_ENV === 'development' &&
        global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const makeStore = ({ isServer }) => {
    if (isServer) {
        return createStore(
            rootReducer,
            composeEnhancers(applyMiddleware(thunk))
        )
    } else {
        const { persistStore, persistReducer } = require('redux-persist')
        const storage = require('redux-persist/lib/storage').default

        const persistConfig = {
            key: 'root',
            storage,
            stateReconciler: hardSet
        }

        const persistedReducer = persistReducer(persistConfig, rootReducer)

        const store = createStore(
            persistedReducer,
            composeEnhancers(applyMiddleware(thunk))
        )

        store.__persistor = persistStore(store)

        return store
    }
}


export const wrapper = createWrapper(makeStore, { debug: true })

