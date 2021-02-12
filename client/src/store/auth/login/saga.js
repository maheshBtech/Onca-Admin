import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from './actionTypes';
import { loginSuccess, logoutUserSuccess, apiError } from './actions';

//AUTH related methods
import { getLoginuser , logoutuser} from '../../../helpers/authUtils';

function* loginUser({ payload: { user, history } }) {
    try {
        const response = yield call(getLoginuser, user.email, user.password);
        yield put(loginSuccess(response));
        history.push('/dashboard');
    } catch (error) {
        yield put(apiError(error));
    }
}

function* logoutUser({ payload: { history } }) {
    try {
        const response = yield call(logoutuser);
        yield put(logoutUserSuccess(response));
        history.push('/login');
    } catch (error) {
        yield put(apiError(error));
    }
}


export function* watchUserLogin() {
    yield takeEvery(LOGIN_USER, loginUser)
}

export function* watchUserLogout() {
    yield takeEvery(LOGOUT_USER, logoutUser)
}

function* authSaga() {
    yield all([
        fork(watchUserLogin),
        fork(watchUserLogout),
    ]);
}

export default authSaga;