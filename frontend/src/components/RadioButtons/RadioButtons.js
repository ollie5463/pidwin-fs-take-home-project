import React from "react";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { jwtDecode } from "jwt-decode";

const RadioButtons = ({setValue, value}) => {

  const user = localStorage.getItem("profile")
    ? jwtDecode(JSON.parse(localStorage.getItem("profile")).token)
    : "null";
  const isSingedIn = user;
  const handleChange = (event) => {
    setValue((event.target).value);
  };
  

  return (
        <>
          {isSingedIn !== "null" && isSingedIn !== null && (
              <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Choice</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel value="heads" control={<Radio />} label="heads" />
                <FormControlLabel value="tails" control={<Radio />} label="tails" />
              </RadioGroup>
            </FormControl>
          ) 
          }
        </>
  );
};

export default RadioButtons;
