export const login =(username, password)=>({
    type:'LOGIN',
    username,
    password
});

// Asynchronous login action which will be used in other functions

// export const startLogin = (user)=>{
    

// return ()=>{

// if(user.name=="test"&&user.password=="1234"){
// console.log('user id s',user.uid);
//    login(user.uid);

// }
     
// };

// };

export const logout =()=>({
    type:'LOGOUT',
    
});

export const getProfile =()=>({
    type:'GET_PROFILE',
    
});

export const editProfile =(data)=>({
    type:'EDIT_PROFILE',
    data
    
});

export const doRefreshToken =()=>({
    type:'DO_REFRESH_TOKEN',
});

export const register = (form_data) => ({
    type: "REGISTER",
    form_data
});

export const loadWhitelist = (status) => ({
    type: 'LOAD_WHITELIST',
    status
});

export const addWhitelistAddress = (form_data) => ({
    type: 'ADD_WHITELIST_ADDRESS',
    form_data
});

export const verifyAddress = (id, secret) => ({
    type: 'VERIFY_ADDRESS',
    id,
    secret
});

export const archiveAddress = (id) => ({
    type: 'ARCHIVE_ADDRESS',
    id
});