import * as actionTypes from './actionTypes'
import axios from 'axios'

export const fetchUserSuccess = (users) => {
    return {
        type:actionTypes.FETCH_USERS,
        users:users
    }
}
export const deleteUser =(userId)=>{
    return {
        type: actionTypes.DELETE_USER,
        id:userId
    }
};

export const addUser=(user)=>{
    return {
        type: actionTypes.CREATE_USER,
        user:{...user}
    }
}
export const fetchUsers = () => {
    return (dispatch) => {
        //to change if database is called
        axios
            .get("https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data")
            .then((res) => {
                console.log(res.data);
                dispatch(fetchUserSuccess(res.data));
            })
    };
};
export const createUser =(userData)=>{
    return (dispatch)=>{
        dispatch(addUser(userData));
    }
}