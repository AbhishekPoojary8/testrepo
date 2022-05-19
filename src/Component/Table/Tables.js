
import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from "@mui/material/Paper";
import Checkbox from '@mui/material/Checkbox';


export default function ToTable(props) {

    return(
        <>
        <TableContainer component={Paper} style={{ marginTop: '30px' }}>
          <Table sx={{ minWidth: 800 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">S NO.</TableCell>
                <TableCell align="center">Task Name</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Due Date</TableCell>
                <TableCell align="center">Due Time</TableCell>
                <TableCell align="center">Priority</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
            
              {(props.Tabledata.sort((a, b) => Number(a.expired) - Number(b.expired))).map((row, i) => {
                
               
                if(row.Status == "Not-completed" && row.expired == false ){
                  return(
                    <TableRow key={i}>
                  <TableCell align='center'>
                  <Checkbox
                    color="primary"
                    

                  />
                  </TableCell>
                  <TableCell align="center">{i+1}</TableCell>
                  <TableCell align="center">{row.TaskName}</TableCell>
                  <TableCell align="center">{row.Description}</TableCell>
                  <TableCell align="center">{row.DueDate}</TableCell>
                  <TableCell align="center">{row.DueTime}</TableCell>
                  <TableCell align="center">{row.Priority}</TableCell>
                  </TableRow>
               
                  )
                  
                }
               else if(row.expired == true){
                  
                  return(
                    <TableRow key={i} style={{backgroundColor: "rgb(224 78 114)"}}>
                  <TableCell align='center' >
                  <Checkbox
                    color="primary"
                    disabled={true}

                  />
                  </TableCell>
                  <TableCell align="center">{i+1}</TableCell>
                  <TableCell align="center" >{row.TaskName}</TableCell>
                  <TableCell align="center">{row.Description}</TableCell>
                  <TableCell align="center">{row.DueDate}</TableCell>
                  <TableCell align="center">{row.DueTime}</TableCell>
                  <TableCell align="center">{row.Priority}</TableCell>
                  </TableRow>
               
                  )

                }
               
})
}
 
            </TableBody>
          </Table>
        </TableContainer>

        </>
    )
}