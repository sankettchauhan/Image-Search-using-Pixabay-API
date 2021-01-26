import {
  Dialog,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Button,
} from "@material-ui/core";
import React, { Component } from "react";
import {
  GetApp as GetAppIcon,
  ThumbUpAlt,
  ChatBubble,
  ZoomIn,
} from "@material-ui/icons";

export default class ImageResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      currentImage: "",
    };
  }
  handleOpen = (img) => this.setState({ open: true, currentImage: img });
  handleClose = () => this.setState({ open: false });
  render() {
    const { images } = this.props;
    if (images.length > 0) {
      return (
        <>
          <GridList cellHeight={250} cols={3}>
            {images.map((image, index) => {
              console.log(image);
              return (
                <GridListTile key={index}>
                  <img src={image.largeImageURL} alt="" />
                  <GridListTileBar
                    title={image.tags}
                    subtitle={
                      <span>
                        <IconButton style={{ color: "white" }}>
                          {image.likes}
                          <ThumbUpAlt />
                        </IconButton>
                        <IconButton style={{ color: "white" }}>
                          {image.comments}
                          <ChatBubble />
                        </IconButton>
                        <IconButton style={{ color: "white" }}>
                          {image.downloads}
                          <GetAppIcon />
                        </IconButton>
                      </span>
                    }
                    actionIcon={
                      <IconButton>
                        <ZoomIn
                          onClick={() => this.handleOpen(image.largeImageURL)}
                        />
                      </IconButton>
                    }
                  />
                </GridListTile>
              );
            })}
          </GridList>
          <Dialog
            modal={false}
            onClose={this.handleClose}
            open={this.state.open}
          >
            <img src={this.state.currentImage} alt="" />
            <Button onClick={this.handleClose}>Close</Button>
          </Dialog>
        </>
      );
    } else {
      return <div>no images found!!</div>;
    }
  }
}
