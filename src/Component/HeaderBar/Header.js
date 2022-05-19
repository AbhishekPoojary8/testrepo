import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import "../HeaderBar/Header.css"


export default function Header(props) {
  console.log(props.CardData.length)
    const handleicon= () =>{
        props.CardHandler(true)

    }
    const handleForm=()=>{
        
    props.ModalHandler(true);
    }

    return (
        <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" >
        <Toolbar variant="dense" >
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <div className= "HeaderContent">
          <Typography variant="h6" color="inherit" component="div" className="MainHeading">
            <h4>To-Do-List</h4>
          </Typography>
          </div>

          <Button variant="contained" size="large" onClick={handleForm}>AddTask</Button>
          <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={props.CardData.length} color="error" onClick={handleicon} >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
        
        
                
    )

}