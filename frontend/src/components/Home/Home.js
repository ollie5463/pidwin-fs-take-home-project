import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Grow, Paper, Typography, TextField, Button } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { placeWager } from "../../actions/wager";
import RadioButtons from "../RadioButtons/RadioButtons";
import { useSelector } from 'react-redux';

const Home = () => {

  const [choice, setChoice] = useState("tails");
  const [tokens, setTokens] = useState(0);
  // const [winOrLoss, setWinOrLoss] = useState("");
  const wagerData = useSelector((state) => state.wager?.wagerData);
  console.log("wagerData: ", wagerData);
  const user = localStorage.getItem("profile")
    ? jwtDecode(JSON.parse(localStorage.getItem("profile")).token)
    : "null";
  const isSingedIn = user;
  const dispatch = useDispatch();

  const clickHandler = useCallback(() => {
    console.log("Choice: ", choice);
    console.log("Tokens: ", tokens);
    dispatch(placeWager({ choice, tokens: parseInt(tokens) }));
  }, [choice, tokens, dispatch])

  ;
  const handleTextValueChange = useCallback((event) => {
    setTokens(event.target.value)
  }, [])

  return (
    <Grow in>
      <Container component="main" maxWidth="sm">
        <Paper elevation={3}  >
          {isSingedIn !== "null" && isSingedIn !== null ? (
            <>
              <Typography variant="h4" align="center" color="primary">
                {`Welcome ${user.name}`}
              </Typography>
              <TextField value={tokens} onChange={handleTextValueChange} id="outlined-basic" label="Enter Wager!" inputProps={{ type: 'number'}}  variant="outlined" />
              <Button variant="contained" onClick={clickHandler}>Submit</Button>
              <RadioButtons value={choice} setValue={setChoice}/>
              {wagerData?.isWin === true ? <Typography variant="body1">You Win :)!</Typography> : <></>}
              {wagerData?.isWin === false ? <Typography variant="body1">You Lose :(!</Typography> : <></>}
            </>

          ) : (
            <Typography variant="h4" align="center" color="primary">
              Login to Play
            </Typography>
          )}
        </Paper>
      </Container>
    </Grow>
  );
};

export default Home;
