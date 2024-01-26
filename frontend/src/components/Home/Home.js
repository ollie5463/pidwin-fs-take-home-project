import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Grow, Paper, Typography, TextField, Button, Box } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { getWagerHistory, placeWager } from "../../actions/wager";
import RadioButtons from "../RadioButtons/RadioButtons";
import { useSelector } from 'react-redux';
import WagerHistory from "../WagerHistory/WagerHistory";
import { styles } from "./styles";

const Home = () => {

  const [choice, setChoice] = useState("tails");
  const [tokens, setTokens] = useState(1);
  const wagerData = useSelector((state) => state.wager?.wagerData);
  const wagerHistory = useSelector((state) => state.wager?.wagerHistory);
  const user = localStorage.getItem("profile")
    ? jwtDecode(JSON.parse(localStorage.getItem("profile")).token)
    : "null";
  const isSingedIn = user;
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(placeWager({ choice, tokens: parseInt(tokens) }));
    dispatch(getWagerHistory());
  };
  const handleTextValueChange = useCallback((event) => {
    setTokens(event.target.value)
  }, []);

  useEffect(() => {
    dispatch(getWagerHistory());
  }, [])

  return (
    <Grow in>
      <Container component="main">
        <Paper elevation={3}  >
          {isSingedIn !== "null" && isSingedIn !== null ? (
            <>
              <Typography sx={styles.heading} variant="h3" align="center" color="primary">
                {`Welcome ${user.name}`}
              </Typography>
              <Box sx={styles.container}>
                <Box sx={styles.wagerContainer}>
                  <TextField sx={styles.wagerInput} value={tokens} onChange={handleTextValueChange} id="outlined-basic" label="Enter Wager!" inputProps={{ type: 'number'}}  variant="outlined" />
                  <Button sx={styles.submitButton} variant="contained" onClick={clickHandler}>Submit</Button>
                 </Box>
                <RadioButtons value={choice} setValue={setChoice}/>
              </Box>
              {wagerData?.isWin === true ? <Typography variant="body1">You Win :)!</Typography> : <></>}
              {wagerData?.isWin === false ? <Typography variant="body1">You Lose :(!</Typography> : <></>}
              {wagerData?.bonusAmount > 0 ? <Typography variant="body1">You Win a Bonus amount of: {wagerData.bonusAmount}</Typography> : <></>}
              {wagerHistory?.transactions ? <WagerHistory rows={wagerHistory?.transactions}/> : <></>}
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
