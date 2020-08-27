import { persistReducer } from "redux-persist";
import { put, takeLatest } from "redux-saga/effects";
import storage from "redux-persist/lib/storage";
import { getUserByToken, register, login } from '../../crud/auth.crud';


export const actionTypes = {
    Login: "[Login] Action",
    Logout: "[Logout] Action",
    Register: "[Register] Action",
    UserLoaded: "[Load User] Auth API",
    UserRequested: "[Request User] Action"
};

const initialAuthState = {
    user: undefined,
    authToken: undefined
}

export const reducer = persistReducer(
    { storage, key: 'chat-node', whitelist: ['user', 'authToken'] },
    (state = initialAuthState, action) => {
        switch (action.type) {
            case actionTypes.Login: {
                const { authToken } = action.payload;

                return { authToken, user: undefined };
            }

            case actionTypes.Register: {
                const { authToken } = action.payload;
                return { authToken, user: undefined };
            }

            case actionTypes.Logout: {
                return initialAuthState;
            }

            case actionTypes.UserLoaded: {
                const { user } = action.payload;
                return { ...state, user };
            }

            default: {
                return { ...state };
            }
        }
    }
)

export const actions = {
    login: authToken => ({ type: actionTypes.Login, payload: { authToken } }),
    register: authToken => ({ type: actionTypes.Register, payload: { authToken } }),
    logout: () => ({ type: actionTypes.Logout }),
    requestUser: (user) => ({ type: actionTypes.UserRequested, payload: { user } }),
    fulfillUser: (user) => ({ type: actionTypes.UserLoaded, payload: { user } })

}

export function* saga() {
    yield takeLatest(actionTypes.Login, function* loginSaga(data) {
        yield put(actions.requestUser(data.payload.authToken));
    });

    yield takeLatest(actionTypes.UserRequested, function* userRequested(data) {
        const { data: user } = yield getUserByToken(data.payload.user);
        if (user.signal) {
            yield put(actions.fulfillUser(user.data));
        } else {
            yield put(actions.logout());
        }
    })
}