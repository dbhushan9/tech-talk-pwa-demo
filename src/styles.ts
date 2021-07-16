
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

export const useStyles = makeStyles((theme)=>({
  container:{
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0,2),
    height:'91vh',
    overflowX:'auto'
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
  tags2:{
    marginBottom: theme.spacing(3)
  },
  small_avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  speaker: {
    marginTop: theme.spacing(-3),
    backgroundColor:"rgba(30, 30, 30, 0.75)",
    color:"#fff"
  },




  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

}))
