import {Button, Card, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useState} from "react";
import * as action from "../store/actions";
import {connect} from 'react-redux'
import {useNavigate} from "react-router-dom";

const  CreateUser=(props) =>{
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [city,setCity] = useState('');
    const [hasErrors, setHasErrors] = useState(false)
    let navigate = useNavigate();

   const onChangeName = (e) => {
        setName(e.target.value)
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }
    const onChangeCity = (e) => {
        setCity(e.target.value)
    }

    //change it to a form
    const submit = ()=>{

       if(name.length <= 0 || email.length <= 0 || username.length <= 0 || city.length <= 0) {
           setHasErrors(true);
           return
       } else {
           const ids= props.users.map(user=>
           {
               return user.id
           });
           const maxId = Math.max(...ids);
           const userData={
               name: name,
               email:email,
               address:{
                   city:city
               },
               username:username,
               id:maxId+1,
           };
           props.onCreateUser(userData);

           return navigate('/');
       }
    }

    return(
       <Card>
         <Typography sx={{padding:3}} variant="h5">Form</Typography>
           <hr/>
           <div className="form">
               <TextField error={hasErrors} helperText={hasErrors ? 'Please enter name' : ''} onInput={onChangeName} id="name" label="Name" variant="outlined"/>
               <TextField error={hasErrors} helperText={hasErrors ? 'Please enter a correct email' : ''} onInput={onChangeEmail} id="email" label="Email" variant="outlined"/>
               <TextField error={hasErrors} helperText={hasErrors ? 'Please enter username' : ''} onInput={onChangeUsername} id="username" label="Username" variant="outlined"/>
               <TextField error={hasErrors} helperText={hasErrors ? 'Please enter city' : ''} onInput={onChangeCity} id="city" label="City" variant="outlined"/>
               <div style={{display:'flex',justifyContent:'end'}}>
                   <Link className="link" to="/">
                       <Button style={{marginRight:10}} variant="outlined" color="error">Cancel</Button>
                   </Link>
                   <Button onClick={submit} variant="contained" color="success">Create</Button>
               </div>
           </div>
       </Card>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        onCreateUser: (userData) =>
            dispatch(action.createUser(userData)),
    };
};

const mapStateToProps = (state) => {
    return {
        users: state.users.users,
        loading: state.users.loading,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);