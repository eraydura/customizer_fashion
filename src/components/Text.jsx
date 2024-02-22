import React, { useState,useRef,useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import '../index.css';
import {isMobile} from 'react-device-detect';

function getRandomColor() {
  return '#' + Math.floor(Math.random()*16777215).toString(16);
}

function AddTextureModal({ onClose, onOk }) {
    const [text, setText] = useState('');
    const [color, setColor] = useState(getRandomColor());
    const [fontSize, setFontSize] = useState(36);
    const [strokeWidth, setStrokeWidth] = useState(2);
    const [strokeColor, setStrokeColor] = useState(getRandomColor()); 
    const [fontFamily, setFontFamily] = useState("'Sofachrome Rg', sans-serif");// Default font family


    const canvasRef = useRef(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const width = 512;
      const height = 256;
  
      canvas.width = width;
      canvas.height = height;
  
      // Draw text on canvas
      context.clearRect(0, 0, width, height);
      context.fillStyle = color;
      context.font = `${fontSize}px ${fontFamily}`;
      context.textAlign = 'center';
      context.lineWidth = strokeWidth;
      context.strokeStyle = strokeColor; // Set stroke color
      context.strokeText(text, width / 2, height / 2);
      context.fillText(text, width / 2, height / 2);
    }, [text, color, fontSize, strokeWidth, strokeColor, fontFamily]);
  
    const handleOk = () => {
      const canvas = canvasRef.current;
      const texture = canvas.toDataURL();
  
      // Pass texture data back to parent component
      onOk(texture);
      onClose();
    };
  
    return (
      <div style={{ position: 'absolute', width: isMobile? '90%':'40%',height:isMobile? '70%':'90%',  display: 'flex',flexDirection: 'column',  alignItems:'center', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '50px',zIndex: 1000000 }}>
              <div style={{ position: 'absolute', top: '10px', right: '20px', cursor: 'pointer' }} onClick={onClose}><MdClose size={24} /></div>
      <div style={{ padding: '20px', borderRadius: '5px', backgroundColor: 'white' }}></div>
        <canvas ref={canvasRef} />
        <input
          style={{borderRadius: '50px', width:'100%', height:'10%'}}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text"
        />

          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            style={{ width:'100%',  height:'10%' , marginTop:'5%',fontFamily: fontFamily, borderRadius: '50px',textAlign: 'center' }}
          >
            <option value="'Sofachrome Rg', sans-serif">Sofachrome Rg</option>
            <option value="'Plasma Drip BRK', sans-serif">Plasma Drip BRK</option>
            <option value="'Reglisse', sans-serif">Reglisse</option>
            <option value="'Yet Another Ransom Note', sans-serif">Yet Another Ransom Note</option>
            <option value="'AnotherStudent', sans-serif">AnotherStudent</option>
            <option value="'Vipnagorgialla', sans-serif">Vipnagorgialla</option> {/* Sample Google Font */}
            <option value="'UltraCondensedSansSerif', sans-serif">UltraCondensedSansSerif</option>  {/* Sample Google Font */}
            <option value="'Toxigenesis', sans-serif">Toxigenesis</option>  {/* Sample Google Font */}
            <option value="'Tribal', sans-serif">Tribal</option>  {/* Sample Google Font */}
            <option value="'The Signature', sans-serif">The Signature</option>  {/* Sample Google Font */}
            <option value="'New Super Mario Font U', sans-serif">Super Mario</option>  {/* Sample Google Font */}
            <option value="'Minecraft', sans-serif">Minecraft</option>  {/* Sample Google Font */}
            <option value="'Handkids', sans-serif">Handkids</option>  {/* Sample Google Font */}
            <option value="'Parry Hotter', sans-serif">Harry Potter</option>
            <option value="'Ferro Rosso', sans-serif">Ferro Rosso</option>
            <option value="'Pricedown Bl', sans-serif">Pricedown Bl</option>
            <option value="'Star Wars', sans-serif">Star Wars</option>
            <option value="'Dolce Vita', sans-serif">Dolce Vita</option>
            <option value="'Olde English', sans-serif">Olde English</option>
            <option value="'a Alloy Ink', sans-serif">A Alloy Ink</option>
            {/* Add more Google Fonts as needed */}
          </select>

        <div style={{ display: 'flex', marginTop:'5%', marginLeft:isMobile?'25%':'50%',width:'100%',flexDirection: 'row' }}>
          <input
            type="color"
            style={{marginRight:'10%'}}
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <input
            type="color"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', marginTop:'5%', flexDirection: 'row' }}>
        <input
            type="range"
            min="12"
            max="72"
            style={{marginRight:'5%'}}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}

          />
          <input
            type="range"
            min="1"
            max="10"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            style={{ marginLeft: '10px', marginRight: '10px' }}
          />
          </div>
          <button 
  onClick={handleOk}
  style={{
    color: 'white',
    marginTop: '3%',
    backgroundColor: 'black',
    borderRadius: '50px',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer'
  }}
>
  OK
</button>
      </div>
    );
  }

export default AddTextureModal;