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
import open from '../assets/open.png';
import closeimage from '../assets/close.png';
import icon from '../assets/image.png';
import { degToRad } from "three/src/math/MathUtils.js";
import {isMobile} from 'react-device-detect';
import '../index.css'; 
import AddTextureModal from './Text';

export function Shoe({ onModelLoad, customColors, ...props }) {
  const { nodes, materials,scene } = useGLTF("/models/mug.glb");
  // Notify parent component when model is loaded
  React.useEffect(() => {
    if (scene) {
      onModelLoad();
    }
  }, [scene, onModelLoad]);
  return (
    <group  {...props} dispose={null}>
      <group position={[0, -0.5, 0]} scale={0.3}>
        <mesh      material-metalness={0.5}
      material-roughness={0.5} geometry={nodes.Arc001_1002.geometry} material={materials['01___Default-2.002']} material-color={customColors.mesh} />
        <mesh      material-metalness={0.5}
      material-roughness={0.5} geometry={nodes.Arc001_1002_1.geometry} material={materials['02___Default-2.002']} material-color={customColors.mesh} />
        <mesh      material-metalness={0.5}
      material-roughness={0.5} geometry={nodes.Arc001_1002_2.geometry} material={materials['02___Default.002']} material-color={customColors.mesh} />
        <mesh      material-metalness={0.5}
      material-roughness={0.5} geometry={nodes.Arc001_1002_3.geometry} material={materials['01___Default.002']} material-color={customColors.mesh} />
<mesh geometry={nodes.Arc001_1002_4.geometry} >
<meshBasicMaterial transparent opacity={0} />
            <Decal
              // debug // Makes "bounding box" of the decal visible
              position={customColors.pos} // Position of the decal
              rotation={customColors.rotation} // Rotation of the decal (can be a vector or a degree in radians)
              scale={customColors.scale} // Scale of the decal
            >
              <meshBasicMaterial transparent 
                map={useTexture("./textures/fabric_ao.png")}
                toneMapped={true}
                polygonOffset
                polygonOffsetFactor={-1} // The mesh should take precedence over the original
              />
            <meshBasicMaterial transparent 
                map={useTexture(customColors.texture)}
                toneMapped={true}
                polygonOffset
                polygonOffsetFactor={-1} // The mesh should take precedence over the original
              />


            </Decal>
   
        </mesh>
      </group>
    </group>
  );
}

function Mug() {
  const [meshColor, setMeshColor] = useState('#ffffff');
  const [display, setDisplay] = useState('none');
  const [position, setPosition] = useState([0, 1, 0]);
  const [texture, setTexture] = useState("./textures/wawa.png");
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [scale, setScale] = useState([0, 0, 0]);
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
    setScale([5,5,5]);
    setDisplay("flex");
    handleModalClose();
    setTexture(generatedTexture);
  };

  const getBackgroundSize = (value, min, max) => {
    return { backgroundSize: `${((value - min) * 100) / (max - min)}% 100%` };
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

  const handleModelLoad = () => {
    setModelLoaded(true);
    console.log(modelLoaded);
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
          setScale([5,5,5]);
          setDisplay("flex");
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

  const handleColorChange = (color) => {
        setMeshColor(color);
  };

  const dropdownStyle = {
    position: 'absolute',
    top: '10%',
    left: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  };

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
        <Shoe
        onModelLoad={handleModelLoad}
          customColors={{
            mesh: meshColor,
            texture: texture,
            pos: position,
            rotation: rotation,
            scale: scale,
          }}
        />
      </Canvas>
      ({modelLoaded ? <div>
      <div
        style={dropdownStyle}
      >

        {isMobile ? (
          <input
            type="color"
            style={{ position: 'absolute', top: '10%', left: '20px', width: '50px', height: '50px' }}
            value={meshColor}
            onChange={(e) => handleColorChange(e.target.value)}
          />
        ) : (
          <input
            type="color"
            value={meshColor}
            onChange={(e) => handleColorChange(e.target.value)}
          />
        )}
      </div>
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
                min={-3}
                max={3}
                step={0.01}
                value={position[0]}
                onChange={handleSliderChange((value) =>
                  setPosition((prev) => [value, prev[1], prev[2]])
                )}
                style={getBackgroundSize(position[0],-3,3)}
              />
            </div>
            <div>
              <label htmlFor="posY">Position Y</label>
              <input
                type="range"
                id="posY"
                min={-3}
                max={3}
                step={0.01}
                value={position[1]}
                onChange={handleSliderChange((value) =>
                  setPosition((prev) => [prev[0], value, prev[2]])
                )}
                style={getBackgroundSize(position[1],-3,3)}
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
                min={4}
                max={10}
                step={0.01}
                value={scale[0]}
                onChange={handleSliderChange((value) =>
                  setScale([value, value, value])
                )}
                style={getBackgroundSize(scale[0],3,10)}
              />
            </div>
        </div>
        </div> : <div style={{ width: "100%", height: "100%" }}>
  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', padding: '10px 20px', borderRadius: '5px' }}><h1>Loading...</h1></div>
</div> })
    </div>
  );
}

export default Mug;
