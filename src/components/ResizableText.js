import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Text, Transformer } from 'react-konva';

const ResizableText = ({ text }) => {
  const textRef = useRef();
  const transformerRef = useRef();
  const [fontSize, setFontSize] = useState(20);

  useEffect(() => {
    if (transformerRef.current && textRef.current) {
      transformerRef.current.nodes([textRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, []);

  const handleTransform = () => {
    const node = textRef.current;

    // Get the scale and apply it to the fontSize
    const newScaleX = node.scaleX();
    const newScaleY = node.scaleY();
    const newFontSize = Math.max(10, fontSize * Math.max(newScaleX, newScaleY)); // Scaling based on both X and Y

    // Reset scale to 1 (since we're manually adjusting the size)
    node.setAttrs({
      scaleX: 1,
      scaleY: 1,
    });

    // Update the font size
    setFontSize(newFontSize);
  };

  return (
    <div className="flex justify-center items-center m-0 p-0 bg-gray-100">
      <div className="w-full"> 
        
        <Stage width={window.innerWidth * 0.5} height={window.innerHeight * 0.6} className="p-0">
          <Layer text={text}>
            <Text
              ref={textRef}
              x={50}
              y={60}
              fontSize={fontSize}
              text={text || 'Resizable Text'} // Fallback text
              draggable
              width={200} 
              onTransform={handleTransform}
            />
            <Transformer
              ref={transformerRef}
              padding={1}
              flipEnabled={false}
              enabledAnchors={[
                'top-left',
                'top-right',
                'bottom-left',
                'bottom-right',
                'middle-left',
                'middle-right',
                'top-center',
                'bottom-center',
              ]} 
              boundBoxFunc={(oldBox, newBox) => {
                if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 3) {
                  return oldBox;
                }
                return newBox;
              }}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default ResizableText;
