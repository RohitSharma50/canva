import React, { useEffect, useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Text as KonvaText } from 'react-konva';

const DraggableImageWithText = ({ text }) => {
  const [textPosition, setTextPosition] = useState({ x: 100, y: 100 });
  const [image, setImage] = useState(null);

  // Define the image URL directly in the component
  const imageUrl = "https://foodie-apps.netlify.app/foodie.5b9f6e1b.jpg"; // Example image URL

  useEffect(() => {
    const img = new window.Image();
    img.src = imageUrl;
    img.onload = () => {
      setImage(img); // Set the image when loaded
    };
  }, [imageUrl]); // Fetch the image when the component mounts

  const handleDragMove = (e) => {
    setTextPosition({
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  return (
    <div>
      <Stage width={500} height={200}>
        <Layer>
          {/* Render the fetched image */}
          {image && <KonvaImage image={image} width={300} height={200} />}
          {/* Render draggable text */}
          <KonvaText
            text={text} // Use the text prop
            x={textPosition.x}
            y={textPosition.y}
            draggable
            onDragMove={handleDragMove}
            onDragEnd={() => {}}
            fontSize={24}
            fill="black"
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default DraggableImageWithText;
