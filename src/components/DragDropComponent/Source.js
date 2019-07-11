import React, { Component } from "react";
import { DragSource } from "react-dnd";
import "../../App.css";

class Source extends Component {
  render() {
    const { name, connectDragSource } = this.props;
    return connectDragSource(<div className="square">{name}</div>);
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource()
  };
}

const cardSource = {
  beginDrag(props, monitor, component) {
    const item = { id: props.id, country: props.country };
    return item;
  }
};

export default DragSource("SOURCE", cardSource, collect)(Source);
