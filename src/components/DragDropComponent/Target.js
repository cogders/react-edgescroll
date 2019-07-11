import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import '../../App.css';

class Target extends Component{
    render(){
        const { isOver, canDrop, connectDropTarget, droppedItem, id } = this.props;
        let className = "";
        if(isOver && canDrop){
            className = 'green';
        }else if(!isOver && canDrop){
            className = 'yellow';
        }else if(isOver && !canDrop){
            className = 'red'
        }
        return connectDropTarget(
            <div className={`target ${className}`}>
               <span style={{ fontSize: '100px' }}> { id === 1 && droppedItem.id } </span>
               <span style={{ fontSize: '60px' }}> { id === 2 && droppedItem.country}  </span>
            </div>
        )
    }
}

const spec = {
    drop(props, monitor, component){
        const item = monitor.getItem()
        props.onDrop(item)
    }
}
function collect(connect, monitor) {
  return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop()
  };
}

export default DropTarget("SOURCE", spec, collect)(Target);