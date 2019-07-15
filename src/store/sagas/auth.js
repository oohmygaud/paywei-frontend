import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from "axios";
import { getApi } from "../api";
import { push } from 'connected-react-router'


function* startLogin(action) {
    try {
        const api = getApi();
        const response = yield call(api.post,
            'api/token/',
            {
                username: action.username,
                password: action.password
            },
        )

        console.log(response);
        if (response.status == 200) {
            localStorage.setItem('authToken', response.data.access)
            localStorage.setItem('refreshToken', response.data.refresh)
            localStorage.setItem('tokensCreated', new Date())
            yield put({ type: "LOGIN_SUCCEEDED", username: action.username });
            yield put({ type: "GET_PROFILE" })
        }
        else
            yield put({ type: "LOGIN_DENIED" });

        // this.props.history.push('/home');

    } catch (e) {
        console.log('Error logging in', e);
        yield put({ type: "LOGIN_DENIED" });
    }

}

function* startLogout(action) {
    try {
        const api = getApi();
        const response = yield call(api.post,
            'accounts/logout/')

        if (response.status == 200)
            yield put({ type: "LOGOUT_SUCCEEDED" });

    } catch (e) {
        console.log('Error logging out', e);
    }
    yield put(push('/login'))
    localStorage.removeItem('authToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('tokensCreated')
}

function* getProfile(action) {
    try {
        const api = getApi();
        const response = yield call(api.get, 'accounts/profile/')
        console.log("You're already logged in as", response.data.username)
        yield put({ type: "GET_PROFILE_SUCCEEDED", user: response.data, username: response.data.username, user_id: response.data.id });

    }
    catch (e) {
        console.log('authtoken invalid, deleting')
        localStorage.removeItem('authToken')
    }
}

function* editProfile(action) {
    try {
        const api = getApi()
        const response = yield call(api.put, 'accounts/profile/', action.data)
        yield put({ type: "EDIT_PROFILE_SUCCEEDED", data: response.data })
        yield put(push('/dashboard'))
        yield put({ type: 'GET_PROFILE' })

    }
    catch (e) {
        console.log('Error editing profile', e, e.response, e.message)
        if(e.response)
            yield put({ type: "EDITING_PROFILE_DENIED", errors: e.response.data });
        else if (e.message)
            yield put({ type: "EDITING_PROFILE_DENIED", errors: {'message': e.message} });


    }
}


function* doRefreshToken(action) {
    try {
        const api = getApi();
        const response = yield call(api.post, 'api/token/refresh/', {refresh: localStorage.getItem('refreshToken')})
        localStorage.setItem('authToken', response.data.access)
    }
    catch (e) {
        yield put({ type: "LOGOUT" })
        console.log('error refreshing token')
    }
}


function* register(action) {
    try {
        const api = getApi();
        const response = yield call(api.post, '/accounts/register/', action.form_data,
        )
        if (response.status == 201) {
            console.log('registration succeeded', response.data)
            yield put({ type: "REGISTRATION_SUCCEEDED", username: action.username, user_id: response.data.id });
            yield put({ type: "LOGOUT" })
            yield put(push('/login'))
        }
        else
            yield put({ type: "REGISTRATION_DENIED", errors: response.data });
    } catch(e) {
        console.log('Error registering new user', e)
        yield put({ type: "REGISTRATION_DENIED", errors: e.response.data });
    }
}

function* loadWhitelist(action) {
    console.log('loading whitelist', action)
    try {
        const api = getApi()
        let url = 'whitelist_addresses/?';
        if (action.status) {
            url += 'status=' + action.status
        }
        const response = yield call(api.get, url)
        yield put({ type: "LOAD_WHITELIST_SUCCEEDED", data: response.data })
    }
    catch (e) {
        console.log('Error loading whitelist addresses', e)
    }
    
}

function* addWhitelistAddress(action) {
    console.log('adding whitelist address')
    try {
        const api = getApi()
        let url = '/whitelist_addresses/';
        const response = yield call(api.post, url, action.form_data)
        if (response.status == 201) {
            console.log('add whitelist address succeeded', response.data)
            yield put({ type: "ADD_WHITELIST_ADDRESS_SUCCEEDED", data: response.data })
            yield put({ type: "LOAD_WHITELIST" })
        }
        else
            console.log('Error adding new whitelist address')
        
    }
    catch (e) {
        console.log('Error adding new whitelist address', e)
    }
    
}

function* verifyAddress(action) {
    console.log('verifying whitelist address')
    try {
        const api = getApi()
        let url = '/whitelist_addresses/'+action.id+'/verify/';
        const response = yield call(api.post, url, 
            {secret: action.secret})
        if (response.status == 200) {
            console.log('verify address succeeded', response.data)
            yield put({ type: "VERIFY_ADDRESS_SUCCEEDED", data: response.data })
            yield put(push('/profile'))
        }
        else
            console.log('Error verifying address')
        
    }
    catch (e) {
        console.log('Error verifying address', e)
    }
    
}


function* authSaga() {
    yield takeLatest("LOGIN", startLogin);
    yield takeLatest("LOGOUT", startLogout);
    yield takeLatest("GET_PROFILE", getProfile);
    yield takeLatest("DO_REFRESH_TOKEN", doRefreshToken);
    yield takeLatest("REGISTER", register);
    yield takeLatest("EDIT_PROFILE", editProfile);
    yield takeLatest("LOAD_WHITELIST", loadWhitelist);
    yield takeLatest("ADD_WHITELIST_ADDRESS", addWhitelistAddress);
    yield takeLatest("VERIFY_ADDRESS", verifyAddress);
}

export default authSaga;