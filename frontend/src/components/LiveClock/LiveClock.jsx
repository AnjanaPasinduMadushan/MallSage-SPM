import { Box } from "@mui/material";
import React, { Component } from "react";

class LiveClockUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <Box
      sx={{
        borderRadius:"40px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        width:"16vw",
        border: "20px solid black",
        padding: "10px",
        marginLeft:"3vw",
        marginTop:"5vh"
      }}
      >
        <h2>{this.state.date.toLocaleTimeString()}</h2>
      </Box>
    );
  }
}

export default LiveClockUpdate;
