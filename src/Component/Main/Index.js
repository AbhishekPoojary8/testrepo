import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import TodoCard from "../TodoCard/Card"

import ToDOTable from "../Table/Tables"



import Header from "../HeaderBar/Header"
import "../Main/index.css"





function createData(
  TaskName,
  Description,
  Date,
  Time,
  Priority,
) {
  return {
    TaskName,
    Description,
    Date,
    Time,
    Priority,
  };
}
const label = { inputProps: { 'aria-label': 'Switch demo' } };


const gridStyling = { padding: "30px" };
const modalStyling = {
  position: "absolute",
  bottom: "10%",
  left: "10%",
  width: 1000,
  height: 1000
};
const eachGridStyling = {};
const createBtn = { margin: "auto" }


export default function ButtonAppBar() {

  const [searched, setSearched] = React.useState("");
  let Checkboxhandler = false;
 
  const [Tablestate, setTablestate] = React.useState([]);
  const [CardData, setCardData] = React.useState([]);
  const [Table2, setTable2] = React.useState(false);
  const [Tablestate2, setTablestate2] = React.useState(Tablestate);
  const [sendData, setSendData] = React.useState("");
  let i = 0;
  const [open, setOpen] = React.useState(false);

  const [opencard, setOpencard] = React.useState(false)
  let LocalStorageData = [];

  //on page reload
  useEffect(() => {

    if (localStorage.getItem("Tablevalue") != null) {

      setTablestate(JSON.parse(localStorage.getItem("Tablevalue")));
      setTablestate2(JSON.parse(localStorage.getItem("Tablevalue")));
      let tempArray=[];
  LocalStorageData =   JSON.parse(localStorage.getItem("Tablevalue")).map((row, i) => {
        const duedate = new Date(`${row.DueDate}, ${row.DueTime}`)
        const Duedatemilli = duedate.getTime();
        var currentdate = new Date();

        var Currentdatetime = "Last Sync: " + (currentdate.getMonth() + 1) + "/"
          + (currentdate.getDate()) + "/"
          + currentdate.getFullYear() + " @ "
          + currentdate.getHours() + ":"
          + currentdate.getMinutes() + ":"
          + currentdate.getSeconds();

        var Dt = new Date(Currentdatetime);
        var milliseconds = Dt.getTime();
        var percent = (((Duedatemilli - milliseconds) * 100) / (Duedatemilli - row.Millsecondvalue));
        if(percent<0){
          
          return{
            ...row,
            expired: true
          }
        }
      if(percent>0){
        if(percent<100){
        tempArray.push(row) ;
        setCardData(tempArray);
        }
        console.log(tempArray,"if per>0")
        return{
          ...row
        }
      }
      }
      )
    }
   
    localStorage.setItem("Tablevalue", JSON.stringify(LocalStorageData));
  }, [])
 
  
  console.log(i)
  const handleChange = (e) => {
    var currentdate2 = new Date();
    var Currentdatetime2 = "Last Sync: " + (currentdate2.getMonth() + 1) + "/"
      + (currentdate2.getDate()) + "/"
      + currentdate2.getFullYear() + " @ "
      + currentdate2.getHours() + ":"
      + currentdate2.getMinutes() + ":"
      + currentdate2.getSeconds();
    var Dt2 = new Date(Currentdatetime2);
    var MilliSecond = Dt2.getTime();
    setSendData({ ...sendData, [e.target.name]: e.target.value, Millsecondvalue: MilliSecond, Status: "Not-completed",
  expired: false })

  };

  const handleSubmit = (e) => {
    setOpen(false);
    e.preventDefault();
    let todosToStore = [...Tablestate, sendData];
    setItemInLocalStorage(todosToStore)

    setTablestate(todosToStore);
    setTablestate2([...Tablestate2, sendData]);
  
  };
  const requestSearch = (e) => {
    if (e.target.value != "") {

      const filteredRows = Tablestate2.filter((row) => {
        var taskname = row.TaskName;
        if (taskname.toLowerCase().includes(e.target.value.toLowerCase())) {
          return Object.keys(row).some((key) =>
            row[key].toLowerCase().includes(e.target.value.toLowerCase())
          );

        }
      });
      setTablestate(filteredRows);


    } else {
      setTablestate(Tablestate2)
    }
  };
  const cancelSearch = () => {

    setSearched("");
    requestSearch(searched);
  };
  
  const handleselectinp = (e) => {
    if (e.target.value != "") {
  const filteredRows = Tablestate2.filter((row) => {
        var Priority = row.Priority;

        if (Priority == e.target.value) {
          return row

        }
        
      });
      
      setTablestate(filteredRows);
      if(e.target.value == "All"){
        setTablestate(Tablestate2)
      }
      


    }  
  }
  const handleStatusSearch= (e) =>{
    const filteredRows = Tablestate2.filter((row) => {
      console.log(row.Status)
      if(row.Status == e.target.value){
      return row
      }
     

    })
    setTablestate(filteredRows);
    if(e.target.value == "All"){
      setTablestate(Tablestate2)
    }

  }

  function setItemInLocalStorage(data) {
    localStorage.setItem("Tablevalue", JSON.stringify(data));

  }

  function removeItemFromLocalStorage(name) {
    localStorage.removeItem(name);
  }
  const handlemodalclose = () => {
    setOpen(false)


  }
  const handlemodalclose2 = () => {
    setOpencard(false);
  }
 const  ModalhandleCallback = (ModalData) =>{
   console.log(ModalData)
   setOpen(true)
}
const CardHandler=(CardData)=>{
  setOpencard(true)
}





  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Header ModalHandler = {ModalhandleCallback} CardHandler={CardHandler} CardData={CardData}></Header>
        
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

              
                <Modal
                  sx={modalStyling}
                  open={open}
                  onClose={handlemodalclose}

                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Paper elevation={10}>
                    <h1>To Do List</h1>

                    <form>
                      <Grid sx={gridStyling} container rowSpacing={2} spacing={2}>
                        <Grid item xs={12} sx={eachGridStyling}>
                          <TextField
                            id="outlined-basic"
                            label="Task Name"
                            variant="outlined"
                            name="TaskName"
                            required
                            fullWidth
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id="outlined-multiline-static"
                            label="Description"
                            multiline
                            variant="outlined"
                            name="Description"
                            rows={5}
                            fullWidth
                            onChange={handleChange}
                          />
                        </Grid>

                        <Grid item xs={3}>

                          <TextField
                            id="date"
                            label="Due Date"
                            type="date"
                            fullWidth
                            name="DueDate"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={handleChange}
                          />
                        </Grid>

                        <Grid item xs={3} >

                          <TextField
                            id="time"
                            label="Due Time"
                            type="time"
                            defaultValue="07:30"
                            fullWidth
                            name="DueTime"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={handleChange}

                          />
                        </Grid>
                        

                        <Grid item xs={12} sm={6} >
                          <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              label="priority"
                              name="Priority"
                              fullWidth
                              onChange={handleChange}>

                              <MenuItem value={"High"}>High</MenuItem>
                              <MenuItem value={"Moderate"}>Moderate</MenuItem>
                              <MenuItem value={"Low"}>Low</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>


                          <Button variant="contained" type="close" onClick={() => setOpen(false)}
                            fullWidth>Cancle</Button>


                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Button variant="contained" type="submit" onClick={handleSubmit} fullWidth>Submit</Button>

                        </Grid>
                      </Grid>
                    </form>
                  </Paper>
                </Modal>

              

            </Box>
          
        <Box sx={{ flexGrow: 1 }} style={{ marginTop: "15px" }} >
          <Grid container rowSpacing={2} spacing={3} className="InputBox">
            <Grid item sm={12} md={2}  xs={12}>
              <FormControl style={{minWidth: 200}}>
                <InputLabel id="demo-simple-select-label">Check For Priority</InputLabel>
                <Select
                  size='small'
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Check for Priority"
                  onChange={handleselectinp}
                // onChange={handleChange()}
                >
                  <MenuItem value={"All"}>Show All</MenuItem>
                  <MenuItem value={"High"}>High</MenuItem>
                  <MenuItem value={"Moderate"}>Moderate</MenuItem>
                  <MenuItem value={"Low"}>Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={2} md={2} xs={12}>
              <FormControl>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <TextField
                    id="search-bar"
                    className="text"
                    // value={searched}
                    onChange={requestSearch}

                    label="Enter the task Name"
                    variant="outlined"
                    placeholder="Search..."
                    size="small"
                  />
               

                </div>
              </FormControl>
            </Grid>
            <Grid item sm={12} md={2}  xs={12}>
              <FormControl style={{minWidth: 200}}>
                <InputLabel id="demo-simple-select-label">Check based on Task Status</InputLabel>
                <Select
                  size='small'
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Check for Status"
                  onChange={handleStatusSearch}
                // onChange={handleChange()}
                >
                  <MenuItem value={"All"}>Show All</MenuItem>
                  <MenuItem value={"Not-completed"}>Not-Completed</MenuItem>
                  <MenuItem value={"Completed"}>Completed</MenuItem>
                  <MenuItem value={true}>Expired</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
          </Grid>
        </Box>
        <ToDOTable Tabledata={Tablestate}/>
      </Box>
      <Modal
        sx={modalStyling}
        open={opencard}
        onClose={handlemodalclose2}

        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper elevation={10} className="OuterPaper">
      <h1>Task less than 20%</h1>
      <TodoCard  CardData={CardData}></TodoCard>
      
      {/* <Grid container spacing={3}>
        
      
      {CardData.map((row, i) => (
        <Grid item xs={4} className="OuterGrid">
        <Card sx={{ maxWidth: 365}} className="CardComponent">

        <CardActionArea>
        <CardContent>
          <div className='TopBannerContent'>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Task Name
        </Typography>
        <Typography variant="h5" component="div">
          {row.TaskName}
        </Typography>
        </div>
        <div className='TopBannerContent'>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {row.Description}
        </Typography>
        </div>
        <div className='TopBannerContent'>
        <Typography variant="body2">
          Status: {row.expired}
        
         
        </Typography>
        </div>
      </CardContent>
        </CardActionArea>
        </Card>
        </Grid>
      )
     ) }
     
     </Grid> */}
          <Grid item xs={2} className="ButtonDiv">


            <Button variant="contained" type="close" onClick={() => setOpencard(false)}
             >Cancle</Button>


          </Grid>


        </Paper>
      </Modal>
    </div>
  );
}
