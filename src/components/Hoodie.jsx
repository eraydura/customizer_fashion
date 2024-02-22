import React, { useState,useRef,useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  OrbitControls,
  Decal, 
  useGLTF,
  useTexture
} from '@react-three/drei';
import text from '../assets/text.png';
import share from '../assets/share.png';
import souls from '../assets/3.png';
import meshs from '../assets/1.png';
import stripeimage from '../assets/2.png';
import open from '../assets/open.png';
import closeimage from '../assets/close.png';
import icon from '../assets/image.png';
import { degToRad } from "three/src/math/MathUtils.js";
import {isMobile} from 'react-device-detect';
import AddTextureModal from './Text';

export function HoodieMesh({ onModelLoad, ...props }) {
  const { nodes, materials ,scene} = useGLTF("/models/hoodie.glb");
  // Notify parent component when model is loaded
  React.useEffect(() => {
    if (scene) {
      onModelLoad();
    }
  }, [scene, onModelLoad]);
  return (
    <group {...props} dispose={null}>
    <group position={isMobile? [0,-1.8,0]:[0,-4,0]} scale={isMobile? 0.0015: 0.003}>
      <group scale={10}>
        <mesh geometry={nodes.Hoodie_FABRIC_3_FRONT_1850_0.geometry} material={materials.FABRIC_3_FRONT_1850} material-color={props.customColors.mesh} >
        <Decal
              // debug // Makes "bounding box" of the decal visible
              position={props.customColors.pos} // Position of the decal
              rotation={props.customColors.rotation} // Rotation of the decal (can be a vector or a degree in radians)
              scale={props.customColors.scale} // Scale of the decal
            >

              <meshPhongMaterial transparent 
                map={useTexture(props.customColors.texture)}
                toneMapped={true}
                polygonOffset
                polygonOffsetFactor={-1} // The mesh should take precedence over the original
              />


            </Decal>
        </mesh>
        <mesh geometry={nodes.Hoodie_FABRIC_3_FRONT_1850_0004.geometry} material={materials.Knit_Fleece_Terry_FRONT_1944906} material-color={props.customColors.soul}  />
        <mesh geometry={nodes.Hoodie_FABRIC_3_FRONT_1850_0005.geometry} material={materials['Knit_Fleece_Terry_FRONT_1944906.001']} material-color={props.customColors.stripes}  />
      </group>
    </group>
  </group>
  );
}

function Hoodie() {
  const [meshColor, setMeshColor] = useState('#ffffff');
  const [stripeColor, setStripeColor] = useState('#ffffff');
  const [soulColor, setSoulColor] = useState('#ffffff');
  const [display, setDisplay] = useState('none');
  const [texture, setTexture] = useState("./textures/wawa.png");
  const [position, setPosition] = useState([0, 140, 0]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [scale, setScale] = useState([0, 0, 0]);
  const partSelected = ['mesh', 'stripes', 'soul'];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [close, setClose] = useState(true);
  const canvasRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTexture = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleOkModal = (generatedTexture) => {
    setScale([1,1,1]);
    setDisplay("flex");
    handleModalClose();
    setTexture(generatedTexture);
  };

  const handleClose = () => {
    if(close==true){
      setDisplay("none");
      setClose(false);
    }else{
      setDisplay("flex");
      setClose(true);
    }
  };

  const getBackgroundSize = (value, min, max) => {
    return { backgroundSize: `${((value - min) * 100) / (max - min)}% 100%` };
  };

  const handleModelLoad = () => {
    setModelLoaded(true);
    console.log(modelLoaded);
  };

  const handlePartChange = (index) => {
    setSelectedIndex(index);
  };

  const handleColorChange = (color) => {
    switch (partSelected[selectedIndex]) {
      case 'mesh':
        setMeshColor(color);
        break;
      case 'stripes':
        setStripeColor(color);
        break;
      case 'soul':
        setSoulColor(color);
        break;
      default:
        break;
    }
  };

  const galleryOpen = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if(texture!==reader.result){
          setDisplay("flex");
          setScale([38,38,38]);
        }
        setTexture(reader.result);
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const handleSliderChange = (setter) => (event) => {
    setter(parseFloat(event.target.value));
  };

  const BUTTON_HEIGHT = 20;
  const dropdownStyle = {
    position: 'absolute',
    top: '10%',
    left: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  };
  const dropdownStyle2 = {
    position: 'absolute',
    top: '3%',
    right: '10%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%', // Adjust the width as needed
    margin: '0 auto', // This will center the container horizontally
  };

  // Calculate the gap dynamically based on the number of children elements
  const calculateDynamicGap = (containerHeight, numChildren) => {
    const totalGap = containerHeight - (numChildren * BUTTON_HEIGHT); // Assuming BUTTON_HEIGHT is constant
    return totalGap / (numChildren - 1);
  };
  
  // Usage example
  const containerHeight = 200; // Example container height
  const numChildren = 3; // Example number of children
  const dynamicGap = calculateDynamicGap(containerHeight, numChildren);
  dropdownStyle.gap = dynamicGap + 'px';
  dropdownStyle2.gap = dynamicGap + 'px';

  const saveCanvasAsImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL();
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'canvas_image.png';
      link.click();
    }
  };

  return (
    <div style={{overflow:"hidden", width: '100vw', height: '100vh', position: 'relative',backgroundColor:'black' }}>
      <Canvas gl={{ preserveDrawingBuffer: true }}  ref={canvasRef} shadows camera={{ position: [3, 3, 3], fov: 30 }}>
        <color attach="background" args={['#ececec']} />
        <OrbitControls />
        <Environment preset="sunset" background blur={4} />
        <ambientLight />
        <HoodieMesh
        onModelLoad={handleModelLoad}
          customColors={{
            mesh: meshColor,
            stripes: stripeColor,
            soul: soulColor,
            texture: texture,
            pos: position,
            rotation: rotation,
            scale: scale,
          }}
        />
      </Canvas>
      ({modelLoaded ? <div>
        ({isMobile ?<div >
          <input
          type="color"
          style={{ position: 'absolute',top: '10%',left: '20px', width: '50px', height: '50px'}}
          value={partSelected[selectedIndex] === 'mesh' ? meshColor : partSelected[selectedIndex] === 'stripes' ? stripeColor : soulColor}
          onChange={(e) => handleColorChange(e.target.value)}
        />
        <div style={dropdownStyle2}>
        {partSelected.map((part, index) => (
                    <button 
                    style={{ 
                      borderRadius: 360,
                      border:0,
                      width: '100%', height: '100%',
                      backgroundColor: part === partSelected[selectedIndex] ? "green" : "transparent" // Apply green border if selected, otherwise no border
                    }} 
                    key={index} 
                    onClick={() => handlePartChange(index)}
                  >
             <img src={part === 'mesh' ? meshs : part === 'stripes' ? stripeimage : souls} alt={part} style={{ width: '100%', height: '100%' }} />
          </button>
        ))}
        </div>
      </div>: <div
        style={dropdownStyle}
      >
        <input
          type="color"
          style={{ width:  '100px', height:  '100px'}}
          value={partSelected[selectedIndex] === 'mesh' ? meshColor : partSelected[selectedIndex] === 'stripes' ? stripeColor : soulColor}
          onChange={(e) => handleColorChange(e.target.value)}
        />
        {partSelected.map((part, index) => (
          <button style={{ backgroundColor: part === partSelected[selectedIndex] ? "green" :"white",border:0, borderRadius:360, display: 'flex', justifyContent: 'center', alignItems: 'center' }} key={index} onClick={() => handlePartChange(index)}>
          <img src={part === 'mesh' ? meshs : part === 'stripes' ? stripeimage : souls} alt={part} style={{ width: '80px', height: '80px' }} />
        </button>
        ))}
      </div> })
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
        }}
      >
<button 
  style={{ 
    backgroundColor: "white",
    borderRadius: 360,
    width: !isMobile ? '100px' : '60px', 
    height: !isMobile ? '100px' : '60px',
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }}  
  onClick={galleryOpen}
>
  <img 
    src={icon} 
    alt="gallery" 
    style={{ 
      width: !isMobile ? '50px' : '35px', 
      height: !isMobile ? '50px' : '35px'
    }} 
  />
</button>
      </div>

      <div style={{ backgroundColor:"white",borderRadius:360,position: 'absolute', bottom: '20%', right: '5%' }}>
      <button 
  style={{ 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 360,
    width: !isMobile ? '100px' : '60px', 
    height: !isMobile ? '100px' : '60px'
  }} 
  onClick={saveCanvasAsImage}
>
  <img 
    src={share} 
    alt="gallery" 
    style={{ 
      width: !isMobile ? '50px' : '35px', 
      height: !isMobile ? '50px' : '35px'
    }} 
  />
</button>

      </div>
      <div style={{backgroundColor:"white", borderRadius:360,position: 'absolute',top: '25%',right: '5%' ,    width: !isMobile ? '100px' : '60px', height: !isMobile ? '100px' : '60px'}}> <button onClick={handleAddTexture}><img src={text}></img></button> </div> 

{isModalOpen && (
        <AddTextureModal onClose={handleModalClose} onOk={handleOkModal} />
      )}
      ({isMobile && texture!="./textures/wawa.png"  && <div style={{position: 'absolute',top: '35%',left: '5%' ,width:'50px',height:'50px'}}> <button onClick={handleClose}><img src={close ? closeimage:open }></img></button> </div> })
      <div style={{display:display,     position: 'absolute',      top: isMobile? '40%':'90%',
          left: '10%', flexDirection: isMobile?'column':'row',gap: isMobile?'5px':'150px'}}>
            <div>
              <label htmlFor="posX">Position X</label>
              <input
                type="range"
                id="posX"
                min={-30}
                max={30}
                step={0.01}
                value={position[0]}
                onChange={handleSliderChange((value) =>
                  setPosition((prev) => [value, prev[1], prev[2]])
                )}
                style={getBackgroundSize(position[0],-30,30)}
              />
            </div>
            <div>
              <label htmlFor="posY">Position Y</label>
              <input
                type="range"
                id="posY"
                min={80}
                max={200}
                step={0.01}
                value={position[1]}
                onChange={handleSliderChange((value) =>
                  setPosition((prev) => [prev[0], value, prev[2]])
                )}
                style={getBackgroundSize(position[1],80,200)}
              />
            </div>
            <div>
              <label htmlFor="rotation">Rotation</label>
              <input
                type="range"
                id="rotation"
                min={-Math.PI}
                max={Math.PI}
                step={degToRad(1)}
                value={rotation[1]}
                onChange={handleSliderChange((value) =>
                  setRotation((prev) => [prev[0], value, prev[2]])
                )}
                style={getBackgroundSize(rotation[1],-Math.PI,Math.PI)}
              />
            </div>
            <div>
              <label htmlFor="scale">Scale</label>
              <input
                type="range"
                id="scale"
                min={38}
                max={150}
                step={0.01}
                value={scale[0]}
                onChange={handleSliderChange((value) =>
                  setScale([value, value, value])
                )}
                style={getBackgroundSize(scale[0],38,150)}
              />
            </div>
        </div>
        </div> : <div style={{ width: "100%", height: "100%" }}>
  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', padding: '10px 20px', borderRadius: '5px' }}><h1>Loading...</h1></div>
</div> })
    </div>
  );
}

export default Hoodie;
