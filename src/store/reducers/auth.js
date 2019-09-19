export default (state = {}, action) => {
    switch (action.type) {

        case 'LOGOUT': return {};

        case 'LOGIN_SUCCEEDED':
            console.log('Login success, welcome', action.username);
            return { ...state, username: action.username };

        case 'LOGIN_DENIED':
            return { ...state, loginError: true };

        case 'LOGOUT_SUCCEEDED':
            console.log('Logout success');
            return { ...state, loginError: false, username: null };

        case 'GET_PROFILE_SUCCEEDED':
            console.log('Welcome back');
            return { ...state, user: action.user, username: action.username, user_id: action.user_id };

        case 'REGISTRATION_SUCCEEDED':
            console.log('Welcome');
            return { ...state };

        case 'REGISTRATION_DENIED':
            console.log('Registration Denied');
            return { ...state, registration_errors: action.errors}

        case 'EDIT_PROFILE_SUCCEEDED':
            console.log('Profile Edited');
            return { ...state, edit_profile_succeeded: true}

        case 'EDIT_PROFILE_DENIED':
            console.log('Edit Profile Denied');
            return { ...state, edit_profile_errors: action.errors, edit_profile_succeeded: false}
    

        case 'LOAD_WHITELIST_SUCCEEDED':
            console.log('Loaded Whitelist');
            const with_status = action.status ? { ['whitelist_'+action.status]: action.data} : {};
            return { ...state, whitelist: action.data, ...with_status }

        case 'ADD_WHITELIST_ADDRESS_SUCCEEDED':
            console.log('Added Whitelist Address');
            return { ...state, address: action.data }
            
        case 'ARCHIVE_ADDRESS_SUCCEEDED':
            console.log('Archived Whitelist Address');
            return { ...state, id: action.id}

        default: return state;
    }
};