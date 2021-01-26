import { Grid, Select, MenuItem, TextField } from "@material-ui/core";
import React, { Component } from "react";
import ImageResults from "./ImageResults";
import axios from "axios";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      amount: 15,
      images: [],
    };
  }
  handleChange = (e) => {
    const searchText = e.target.value;
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        if (searchText !== "") {
          const { searchText, amount } = this.state;
          const apiUrl = "https://pixabay.com/api/";
          const apiKey = "18537201-91322fe6f802eb55b93212bf6";
          const link = `${apiUrl}?key=${apiKey}&q=${searchText}&image_type=photo&per_page=${amount}&safesearch=true`;
          axios
            .get(link)
            .then((res) => this.setState({ images: res.data.hits }))
            .catch((err) => console.log(err));
        } else this.setState({ images: [] });
      }
    );
  };
  render() {
    const { searchText, images } = this.state;
    return (
      <div>
        <Grid container>
          <Grid item xs={false} md={2} />
          <Grid item xs={12} md={8}>
            {/* content */}
            <Grid container justify="space-around">
              <Grid item>
                <TextField
                  placeholder="Enter search text"
                  onChange={this.handleChange}
                  value={this.state.searchText}
                  name="searchText"
                  color="primary"
                  fullWidth
                />
              </Grid>
              <Grid item>
                <Select
                  name="amount"
                  value={this.state.amount}
                  onChange={this.handleChange}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={24}>24</MenuItem>
                  <MenuItem value={60}>60</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={false} md={2} />
        </Grid>
        {searchText.length > 0 ? <ImageResults images={images} /> : null}
      </div>
    );
  }
}
