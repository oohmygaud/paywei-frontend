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

export const loadWhitelist = () => ({
    type: 'LOAD_WHITELIST',
});