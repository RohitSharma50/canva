import React, { Component } from 'react';
import { Stage, Layer, Text } from 'react-konva';

class Textcom extends Component {
  state = {
    isDragging: false,
    x: 50,
    y: 50,
  };

  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer> 
          
          <Text
            text={this.props.text || "Draggable Text"}  // Fallback to "Draggable Text" if no input
            x={this.state.x}
            y={this.state.y}
            draggable
            fill={this.state.isDragging ? 'green' : 'black'}
            onDragStart={() => {
              this.setState({
                isDragging: true,
              });
            }}
            onDragEnd={(e) => {
              this.setState({
                isDragging: false,
                x: e.target.x(),
                y: e.target.y(),
              });
            }}
          />
        </Layer>
      </Stage>
    );
  }
}

export default Textcom;
