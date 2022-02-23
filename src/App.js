import './index.css';
import Users from "./components/Users";
import {Routes,Route} from "react-router-dom";
import CreateUser from "./components/CreateUser";
import EditUser from "./components/EditUser";
import {Typography} from "@mui/material";

function App() {
  return (
    <div className="App">
        <Typography style={{marginBottom:25}} variant="h4" color="black">
            Dashboard
        </Typography>
       <Routes history={true}>
         <Route exact path="/" element={<Users />}/>
         <Route exact path="/create-user" element={<CreateUser />} />
         <Route exact path="/edit-user" element={<EditUser />} />
       </Routes>
    </div>
  );
}

export default App;
