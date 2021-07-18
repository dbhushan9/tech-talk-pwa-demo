import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    textDecoration: "none",
  },
  breadcrumb_icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  buttons: {
    marginTop: theme.spacing(5),
  },
  cardGrid: {
    padding: theme.spacing(2, 0),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%",
  },
  cardContent: {
    flexGrow: 1,
  },
  date: {
    marginTop: theme.spacing(-3),
    backgroundColor: "rgba(30, 30, 30, 0.75)",
    color: "#fff",
  },
  toggle_btn_grp_paper: {
    display: "flex",
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: "wrap",
  },
  header_container: {
    justifyContent: "center",
    [theme.breakpoints.up("sm")]: {
      justifyContent: "space-between",
    },
  },
}));
