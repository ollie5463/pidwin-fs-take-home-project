import { theme } from "../../themes/Default";
import { deepPurple } from "@mui/material/colors";

export const styles = {
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px",
  },
  heading: {
    color: "rgba(0,183,255, 1)",
    textDecoration: "none",
    padding: '20px'
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "1000px",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
  },
  container: { 
    display: "flex", 
    justifyContent: "space-evenly", 
    alignItems: "flex-end", 
    marginBottom: "40px" 
  },
  wagerInput: {
    alignItems: "left"
   },
  wagerContainer: {
    display: "flex", 
    alignItems: "center"
   },
   submitButton: {
    margin: "0 10px"
  },
  userName: {
    display: "flex",
    alignItems: "center",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
};