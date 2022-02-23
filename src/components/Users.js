import {useEffect , useState} from "react";
import {connect} from 'react-redux'
import * as action from '../store/actions/index'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import {
    Button,
    Card, Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import '../index.css'
import axios from 'axios'
import {Link} from "react-router-dom";
import * as actions from '../store/actions/index'

const Users = (props) => {
    //const [users , setUsers] = useState([])
  //  function getUsers() {
   //     axios.get('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data').then(res=>{
     //       setUsers(res.data)
    //    }).catch(err=>{
     //       console.log(err)
     //   })
   // }
    useEffect(()=>{
        props.onFetchUsers();
    },[]);

    const deleteFromState = (id) => {
        props.onDeleteUser(id)
    };
    const deleteHandler = (id) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteFromState(id)
                },
                {
                    label: 'No',
                    onClick: () => false
                }
            ]
        });
    }

    return (
        <div className="users-table">
            <Card sx={{padding:2}}>
              <div className="card-header">
                  <Typography>User List</Typography>
                  <Link className="link" to="/create-user">
                      <Button variant="contained">Add User</Button>
                  </Link>
              </div>
                <TableContainer sx={{marginTop:3}} component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead sx={{background:'#4f4444'}}>
                            <TableRow>
                                <TableCell sx={{color:'white'}}>ID</TableCell>
                                <TableCell sx={{color:'white'}} align="left">Name</TableCell>
                                <TableCell sx={{color:'white'}} align="left">Username</TableCell>
                                <TableCell sx={{color:'white'}} align="left">Email</TableCell>
                                <TableCell sx={{color:'white'}} align="left">City</TableCell>
                                <TableCell sx={{color:'white'}} align="center">Edit</TableCell>
                                <TableCell sx={{color:'white'}} align="center">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.users.map((user) => (
                                <TableRow
                                    key={user.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {user.id}
                                    </TableCell>
                                    <TableCell align="left">{user.name}</TableCell>
                                    <TableCell align="left">{user.username}</TableCell>
                                    <TableCell align="left">{user.email}</TableCell>
                                    <TableCell align="left">{user.address.city}</TableCell>
                                    <TableCell align="center">
                                        <Button sx={{background:"#EEAC56"}} variant="contained">Edit</Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button onClick={()=>deleteHandler(user.id)} variant="contained" color="error">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchUsers: () =>
            dispatch(action.fetchUsers()),

        onDeleteUser: (id) =>
            dispatch(action.deleteUser(id)),
    };
};

const mapStateToProps = (state) => {
    return {
        users: state.users.users,
        loading: state.users.loading,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Users);
