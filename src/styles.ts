
import {makeStyles} from '@material-ui/core/styles'

export const useStyles = makeStyles((theme)=>({
  container:{
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0,2),
    maxHeight:'90vh',
    height:'90vh'
  },
  footer:{
    backgroundColor: theme.palette.background.paper,
    padding:'50px 0'
  },
  link: {
    display: 'flex',
    textDecoration: 'none' 
  },
  breadcrumb_icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  icon:{
    marginRight: '20px'
  },
  buttons:{
    marginTop:'40px'
  },
  cardGrid:{
    padding: theme.spacing(2,0)
  },
  card:{
    height: '100%',
    display:'flex',
    flexDirection:"column"
  },
  cardMedia:{
    paddingTop: '56.25%'
  },
  cardContent:{
    flexGrow:1
  },
  tags:{
    justifyContent:"center"
  },
  small_avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  speaker: {
    marginTop: theme.spacing(-3),
    backgroundColor:"rgba(30, 30, 30, 0.75)",
    color:"#fff"
  }
}))
