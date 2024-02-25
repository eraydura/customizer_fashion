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
import open from '../assets/open.png';
import closeimage from '../assets/close.png';
import share from '../assets/share.png';
import souls from '../assets/soul.png';
import meshs from '../assets/mesh.png';
import stripeimage from '../assets/stripes.png';
import icon from '../assets/image.png';
import { degToRad } from "three/src/math/MathUtils.js";
import {isMobile} from 'react-device-detect';
import AddTextureModal from './Text';
import * as utils from './utils.jsx';
import * as styles from './style.jsx';

export function Shoe({ onModelLoad, ...props }) {
  const { nodes, materials,scene } = useGLTF("/models/shoes/shoe.gltf");
    // Notify parent component when model is loaded
    React.useEffect(() => {
      if (scene) {
        onModelLoad();
      }
    }, [scene, onModelLoad]);

  return (
    <group {...props} dispose={null}>
      <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={isMobile?0.7:1}>
        <mesh
          material-metalness={1.0}
          material-roughness={1.0}
          geometry={nodes.shoe.geometry}
          material={materials.laces}
          material-color={props.customColors.stripes}
        />
        <mesh
          material-metalness={1.0}
          material-roughness={1.0}
          geometry={nodes.shoe_2.geometry}
          material={materials.caps}
          material-color={props.customColors.soul}
        />
        <mesh
          material-metalness={1.0}
          material-roughness={1.0}
          geometry={nodes.shoe_3.geometry}
          material={materials.inner}
          material-color={props.customColors.soul}
        />
        <mesh
          material-metalness={1.0}
          material-roughness={1.0}
          geometry={nodes.shoe_4.geometry}
          material={materials.sole}
          material-color={props.customColors.soul}
        />
        <mesh
          material-metalness={1.0}
          material-roughness={1.0}
          geometry={nodes.shoe_5.geometry}
          material={materials.stripes}
          material-color={props.customColors.stripes}
        />
        <mesh
          material-metalness={1.0}
          material-roughness={1.0}
          geometry={nodes.shoe_6.geometry}
          material={materials.band}
          material-color={props.customColors.stripes}
        />
        <mesh
          material-metalness={1.0}
          material-roughness={1.0}
          geometry={nodes.shoe_7.geometry}
          material={materials.patch}
          material-color={props.customColors.soul}
        />
        <mesh
          material-metalness={1.0}
          material-roughness={1.0}
          geometry={nodes.shoe_1.geometry}
          material-color={props.customColors.mesh}
        >

            <Decal
              // debug // Makes "bounding box" of the decal visible
              position={props.customColors.pos} // Position of the decal
              rotation={props.customColors.rotation} // Rotation of the decal (can be a vector or a degree in radians)
              scale={props.customColors.scale} // Scale of the decal
            >

              <meshPhongMaterial transparent 
                map={useTexture(props.customColors.texture)}
                normalMap={useTexture("./textures/fabric.png")}
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

function Shoes() {
  const [meshColor, setMeshColor] = useState('#ffffff');
  const [stripeColor, setStripeColor] = useState('#ffffff');
  const [soulColor, setSoulColor] = useState('#ffffff');
  const [display, setDisplay] = useState('none');
  const [texture, setTexture] = useState("./textures/wawa.png");
  const [position, setPosition] = useState([0, 0, 0]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [scale, setScale] = useState([1, 1, 1]);
  const partSelected = ['mesh', 'stripes', 'soul'];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [close, setClose] = useState(true);
  const canvasRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [display2, setDisplay2] = useState('none');

  const handleOkModal = (generatedTexture) => {
    setScale([1,1,1]);
    setDisplay("flex");
    setClose(true);
    setTexture(generatedTexture);
  };

  const lock = {
    display: display2,
    position: 'absolute',
    top: '35%',
    left: '5%' ,
    width:'50px',
    height:'50px'
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
    left: '10%',
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
  dropdownStyle2.gap= dynamicGap + 'px';


  return (
    <div style={styles.body}>
      <Canvas gl={{ preserveDrawingBuffer: true }}  ref={canvasRef} shadows camera={{ position: [3, 3, 3], fov: 30 }}>
        <color attach="background" args={['#ececec']} />
        <OrbitControls />
        <Environment preset="sunset" background blur={4} />
        <ambientLight />
        <Shoe
        onModelLoad={() => utils.handleModelLoad(setModelLoaded)}
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
      
      ({modelLoaded ? 
         <div>
          ({isMobile ? 
          
          <div>
                  <input
                    type="color"
                    style={styles.colorPickerStyle}
                    value={partSelected[selectedIndex] === 'mesh' ? meshColor : partSelected[selectedIndex] === 'stripes' ? stripeColor : soulColor}
                    onChange={(e) => utils.handleColorChange(e.target.value,setMeshColor,selectedIndex,partSelected,setStripeColor,setSoulColor)}
                  />
                  <div style={dropdownStyle2}>
                  {partSelected.map((part, index) => (
                    <button 
                      style={{ 
                        borderRadius: 360,
                        border:0,
                        width: '60px', 
                        height: '60px',
                        backgroundColor: part === partSelected[selectedIndex] ? "green" : "transparent" 
                      }} 
                      key={index} 
                      onClick={() => utils.handlePartChange(index,setDisplay,setClose,texture,setDisplay2,undefined,setSelectedIndex)}
                    >
              <img src={part === 'mesh' ? meshs : part === 'stripes' ? stripeimage : souls} alt={part} style={{width: '100%', height: '100%' }} />
            </button>
          ))}
          </div>
      </div>
      
      : 
      
      <div
        style={dropdownStyle}
      >
        <input
          type="color"
          style={{ width:  '100px', height:  '100px'}}
          value={partSelected[selectedIndex] === 'mesh' ? meshColor : partSelected[selectedIndex] === 'stripes' ? stripeColor : soulColor}
          onChange={(e) => utils.handleColorChange(e.target.value,setMeshColor,selectedIndex,partSelected,setStripeColor,setSoulColor)}
        />
        {partSelected.map((part, index) => (
          <button style={{ backgroundColor: part === partSelected[selectedIndex] ? "green" :"white",border:0, borderRadius:360, display: 'flex', justifyContent: 'center', alignItems: 'center' }} key={index} onClick={() => utils.handlePartChange(index,setDisplay,setClose,texture,undefined,undefined,setSelectedIndex)}>
            <img src={part === 'mesh' ? meshs : part === 'stripes' ? stripeimage : souls} alt={part} style={{ width: '80px', height: '80px' }} />
          </button>
        ))}
      </div> })

      {/* Gallery Button */}
      <div style={styles.gallery}>
            <button style={styles.galleryButtonStyle}  
              onClick={()=>utils.galleryOpen(setDisplay,setClose,setDisplay2,setTexture)}
            > <img src={icon} alt="gallery" style={styles.galleryButtonImageStyle} /></button>
      </div>

      {/* Save Button */}
      <div style={styles.save}>
          <button style={styles.saveButtonStyle} onClick={() => utils.saveCanvasAsImage(canvasRef)}>
            <img src={share} alt="gallery" style={styles.saveButtonImages} 
          />
          </button>
      </div>

      {/* Add Text Button */}
      <div style={styles.addTextButtonStyle}> <button onClick={() => utils.handleAddTexture(setIsModalOpen)}><img src={text}></img></button> </div> 

      {isModalOpen && (
        <AddTextureModal onClose={() => utils.handleModalClose(setIsModalOpen)} onOk={handleOkModal} />
      )}

       {/* Add Lock */}
       ({isMobile && texture!="./textures/wawa.png" && 
              <div style={lock}> <button onClick={()=>utils.handleClose(close,setClose,setDisplay)}><img src={close ? closeimage:open }></img></button> 
       </div> })

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
                  onChange={utils.handleSliderChange((value) =>
                    setPosition((prev) => [value, prev[1], prev[2]])
                  )}
                  style={utils.getBackgroundSize(position[0],-3,3)}
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
                  onChange={utils.handleSliderChange((value) =>
                    setPosition((prev) => [prev[0], value, prev[2]])
                  )}
                  style={utils.getBackgroundSize(position[1],-3,3)}
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
                  onChange={utils.handleSliderChange((value) =>
                    setRotation((prev) => [prev[0], value, prev[2]])
                  )}
                  style={utils.getBackgroundSize(rotation[1],-Math.PI,Math.PI)}
                />
              </div>
              <div>
                <label htmlFor="scale">Scale</label>
                <input
                  type="range"
                  id="scale"
                  min={0.1}
                  max={5}
                  step={0.01}
                  value={scale[0]}
                  onChange={utils.handleSliderChange((value) =>
                    setScale([value, value, value])
                  )}
                  style={utils.getBackgroundSize(scale[0],0.1,5)}
                />
              </div>
          </div>
        </div> 
        
        : 

     <div style={styles.loading}>
          <h1>Loading...</h1>
      </div> 
      
      })
    </div>
  );
}

export default Shoes;
