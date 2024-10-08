import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Text as KonvaText } from 'react-konva';
import DraggableImageWithText from "./DraggableImageWithText";

const VideoPlayer = ({ text }) => {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoDimensions, setVideoDimensions] = useState({ width: 0, height: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [animFrame, setAnimFrame] = useState(null);
  const layerRef = useRef();
  const [textPosition, setTextPosition] = useState({ x: 100, y: 100 });

  useEffect(() => {
    // Create video element
    const video = document.createElement('video');
    video.src = 'https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c4/Physicsworks.ogv/Physicsworks.ogv.240p.vp9.webm';
    videoRef.current = video;

    // Set up event listeners
    video.addEventListener('loadedmetadata', () => {
      setVideoDimensions({ width: video.videoWidth, height: video.videoHeight });
      setVideoLoaded(true);
    });

    return () => {
      video.removeEventListener('loadedmetadata', () => {});
      cancelAnimationFrame(animFrame); // Cleanup on unmount
    };
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        cancelAnimationFrame(animFrame);
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
          drawVideo(); // Start drawing the video frames only after video starts playing
        }).catch(error => {
          console.error("Error playing video:", error);
        });
      }
    }
  };

  const drawVideo = () => {
    const layer = layerRef.current;
    const video = videoRef.current;

    if (layer && video) {
      layer.getContext().clearRect(0, 0, layer.width(), layer.height());
      layer.getContext().drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      setAnimFrame(requestAnimationFrame(drawVideo));
    }
  };

  const handleDragMove = (e) => {
    setTextPosition({
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100"> 
      {/* <DraggableImageWithText text={text} /> */}

      <button 
        className="bg-slate-600 text-white rounded-md w-20 mb-2" 
        onClick={togglePlayPause} 
        disabled={!videoLoaded}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      <div style={{ maxWidth: '90%', overflow: 'hidden' }}>
        <Stage width={videoDimensions.width} height={videoDimensions.height}>
          <Layer ref={layerRef}>
            {!videoLoaded && (
              <KonvaText
                text="Loading video..."
                width={videoDimensions.width}
                height={videoDimensions.height}
                align="center"
                verticalAlign="middle"
              />         
            )}
            {videoLoaded && isPlaying && (
              <KonvaText
                text="Press Pause to stop..."
                width={videoDimensions.width}
                height={videoDimensions.height}
                align="center"
                verticalAlign="middle"
                fontSize={20}
                fill="red"
              /> 
            )}
            <KonvaText
              text={text}
              x={textPosition.x}
              y={textPosition.y}
              draggable
              onDragMove={handleDragMove}
              fontSize={24}
              fill="black"
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default VideoPlayer;
