import './App.css';
import React, { useState } from 'react';
//import Star from './components/Star'; 
import Textcom from './components/Textcom';  // Import Textcom component
import ResizableText from './components/ResizableText';
import DraggableImageWithText from './components/DraggableImageWithText';
import VideoPlayer from './components/VideoPlayer';
function App() {
  const [text, setText] = useState('');  // State to store the input text

  return (
    <div className="flex flex-row  ">
      <div className="p-3 m-3 w-1/2"> 
        <label>Input values </label>
        <input  
        
             type="text" 
               className="border-2 border-gray-400 p-1 rounded-xl focus:border-blue-500 bg-transparent" 
             value={text}  
             
              onChange={(e) => setText(e.target.value)} 
              placeholder="Enter some text"
           />
           <DraggableImageWithText text={text}/>
            <Textcom text={text} /> 

           <ResizableText text={text} /> 

            
           
             
      {/* <Star />  */}
      </div>
      <div className="w-1/2">
      
       <VideoPlayer text={text}/> 

       </div>

    </div>
  );
}

export default App;
