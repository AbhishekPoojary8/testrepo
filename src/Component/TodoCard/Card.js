import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea, CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';


export default function TodoCard(props){
    console.log(props.CardData)
    console.log("hi")
    console.log(props.CardData.length)

    return (
        <Grid container spacing={3}>
      
      {props.CardData.map((row, i) => (
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
     </Grid>
     )
}