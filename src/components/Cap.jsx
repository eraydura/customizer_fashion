import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  OrbitControls,
  Decal, 
  useGLTF,
  useTexture
} from '@react-three/drei';
import text from '../assets/text.png';
import down from '../assets/cap_down.png';
import up from '../assets/cap_up.png';
import icon from '../assets/image.png';
import open from '../assets/open.png';
import closeimage from '../assets/close.png';
import share from '../assets/share.png';
import { degToRad } from "three/src/math/MathUtils.js";
import {isMobile} from 'react-device-detect';
import '../index.css';
import AddTextureModal from './Text';
import * as utils from './utils.jsx';
import * as styles from './style.jsx';

export function CapMesh({ onModelLoad, ...props }) {
  const { nodes, materials, scene } = useGLTF("/models/baseball_cap.glb");

  // Notify parent component when model is loaded
  React.useEffect(() => {
    if (scene) {
      onModelLoad();
    }
  }, [scene, onModelLoad]);

  return (
    <group {...props} dispose={null}>
    <group rotation={[-Math.PI / 2, 0, 0]} scale={0.005}>
      <group position={[0.191, 190, 6.367]} scale={isMobile? [130.168, 130.168, 148,295]: [195.252, 195.252, 222.442]}>
      <mesh geometry={nodes.gorra002__0.geometry} material={materials['White Cotton']} material-color={props.customColors.up} >
                <Decal
              // debug // Makes "bounding box" of the decal visible
              position={props.customColors.pos} // Position of the decal
              rotation={props.customColors.rotation} // Rotation of the decal (can be a vector or a degree in radians)
              scale={props.customColors.scale} // Scale of the decal
            >

              <meshPhongMaterial transparent 
                map={useTexture(props.customColors.uptexture)}
                normalMap={useTexture("./textures/fabric.png")}
                toneMapped={true}
                polygonOffset
                polygonOffsetFactor={-1} // The mesh should take precedence over the original
              />


            </Decal> 
            </mesh>
          <mesh geometry={nodes.gorra002__0001.geometry} material={materials.FABRIC_3_FRONT_1850} material-color={props.customColors.down} >
          <Decal
              // debug // Makes "bounding box" of the decal visible
              position={props.customColors.pos2} // Position of the decal
              rotation={props.customColors.rotation2} // Rotation of the decal (can be a vector or a degree in radians)
              scale={props.customColors.scale2} // Scale of the decal
            >

              <meshPhongMaterial transparent 
                map={useTexture(props.customColors.downtexture)}
                normalMap={useTexture("./textures/fabric.png")}
                toneMapped={true}
                polygonOffset
                polygonOffsetFactor={-1} // The mesh should take precedence over the original
              />


            </Decal> 
          </mesh>
       
      </group>
    </group>
  </group>

  );
}

function Cap() {
  const [upColor, setUpColor] = useState('#ffffff');
  const [downColor, setDownColor] = useState('#ffffff');
  const [display, setDisplay] = useState('none');
  const [display2, setDisplay2] = useState('none');
  const [uptexture, setUpTexture] = useState("./textures/wawa.png");
  const [downtexture, setDownTexture] = useState("./textures/wawa.png");
  const [position, setPosition] = useState([0, 0, 0]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [position2, setPosition2] = useState([0, -1, 0]);
  const [rotation2, setRotation2] = useState([0, 0, 0]);
  const [scale2, setScale2] = useState([2, 2, 2]);
  const [scale, setScale] = useState([1, 1, 1]);
  const partSelected = ['up', 'down'];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [close, setClose] = useState(false);
  const canvasRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOkModal = (generatedTexture) => {
    setDisplay("flex");
    if(selectedIndex==0){
      setDisplay2(true);
      setClose(true);
      setUpTexture(generatedTexture);
    }else{
      setDisplay2(true);
      setClose(true);
      setDownTexture(generatedTexture);
    }
  };

  const lock = {
    display: display2,
    position: 'absolute',
    top: '35%',
    left: '5%' ,
    width:'50px',
    height:'50px'
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
  
  const dropdownStyle2 = {
    position: 'absolute',
    top: '3%',
    left: '10%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%', 
    margin: '0 auto', 
  };

  const containerHeight = 200; // Example container height
  const numChildren = 3; // Example number of children
  const dynamicGap = utils.calculateDynamicGap(containerHeight, numChildren);
  dropdownStyle.gap = dynamicGap + 'px';
  dropdownStyle2.gap = dynamicGap + 'px';

  return (
    <div style={styles.body}>
      <Canvas gl={{ preserveDrawingBuffer: true }}  ref={canvasRef} shadows camera={{ position: [3, 3, 3], fov: 30 }}>
        <color attach="background" args={['#ececec']} />
        <OrbitControls />
        <Environment preset="sunset" background blur={4} />
        <ambientLight />
        <CapMesh
          onModelLoad={()=>utils.handleModelLoad(setModelLoaded)}
          customColors={{
            up: upColor,
            down: downColor,
            uptexture: uptexture,
            downtexture: downtexture,
            pos: position,
            rotation: rotation,
            scale: scale,
            pos2: position2,
            rotation2: rotation2,
            scale2: scale2,
          }}
        />
      </Canvas>

     ({modelLoaded ? 
     
     <div>


      {/* Color Button */}
      ({isMobile ? 
      
              <div>
                <input
                  type="color"
                  style={styles.colorPickerStyle}
                  value={partSelected[selectedIndex] === 'up' ? upColor :  downColor }
                  onChange={(e) => utils.handleColorChange(e.target.value,setDownColor,selectedIndex,partSelected,setUpColor)}
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
                    onClick={() => utils.handlePartChange(index,setDisplay,setClose,uptexture,setDisplay2,downtexture,setSelectedIndex)}
                  >
                    <img src={part === 'up' ? up : down} alt={part} style={{ width: '100%', height: '100%' }} />
                  </button>
                ))}
                </div>
              </div> 
      
      : 
              <div style={dropdownStyle}>
                  <input
                    type="color"
                    style={{ width:  '100px', height:  '100px'}}
                    value={partSelected[selectedIndex] === 'up' ? upColor :  downColor }
                    onChange={(e) => utils.handleColorChange(e.target.value,setDownColor,selectedIndex,partSelected,setUpColor)}
                  />
                  {partSelected.map((part, index) => 
                    (
                        <button style={{ backgroundColor: part === partSelected[selectedIndex] ? "green" :"white",border:0, borderRadius:360, display: 'flex', justifyContent: 'center', alignItems: 'center' }} key={index} onClick={() => utils.handlePartChange(index,setDisplay,setClose,uptexture,setDisplay2,downtexture,setSelectedIndex)}>
                        <img src={part === 'up' ? up : down} alt={part} style={{ width: '80px', height: '80px' }} />
                      </button>
                    )
                    )
                  }
              </div> 
      })


      {/* Gallery Button */}
      <div style={styles.gallery}>
            <button style={styles.galleryButtonStyle}  
              onClick={()=>utils.galleryOpen(setDisplay,setClose,setDisplay2,setUpTexture,setDownTexture,downtexture,uptexture,selectedIndex)}
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
       ({isMobile && (uptexture!="./textures/wawa.png" || downtexture!="./textures/wawa.png" ) && 
              <div style={lock}> <button onClick={()=>utils.handleClose(close,setClose,setDisplay)}><img src={close ? closeimage:open }></img></button> 
       </div> })


       {/* Sliders */}
       <div style={{display:display,position: 'absolute',top: isMobile? '40%':'90%',left: '10%', flexDirection: isMobile?'column':'row',gap: isMobile?'5px':'150px'}}><div>
              <label htmlFor="posX">Position X</label>
              <input
                type="range"
                id="posX"
                min={-10}
                max={10}
                step={0.01}
                value={selectedIndex==0 ? position[0] : position2[0]}
                onChange={utils.handleSliderChange((value) =>
                  selectedIndex==0 ? setPosition((prev) => [value, prev[1], prev[2]]) :setPosition2((prev) => [value, prev[1], prev[2]])
                )}
                style={utils.getBackgroundSize(selectedIndex==0 ? position[0] : position2[0],-10,10)}
              />
            </div>
            <div>
              <label htmlFor="posY">Position Y</label>
              <input
                type="range"
                id="posY"
                min={-2}
                max={2}
                step={0.01}
                value={selectedIndex==0 ? position[1] : position2[1]}
                onChange={utils.handleSliderChange((value) =>
                  selectedIndex==0 ? setPosition((prev) => [prev[0], value, prev[2]]) : setPosition2((prev) => [prev[0], value, prev[2]])
                )}
                style={utils.getBackgroundSize(selectedIndex==0 ? position[1] : position2[1],-2,2)}
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
                value={selectedIndex==0 ? rotation[1] : rotation2[1]}
                onChange={utils.handleSliderChange((value) =>
                  selectedIndex==0 ?setRotation((prev) => [prev[0], value, prev[2]]): setRotation2((prev) => [prev[0], value, prev[2]])
                )}
                style={utils.getBackgroundSize(selectedIndex==0 ? rotation[1] : rotation2[1],-Math.PI,Math.PI)}
              />
            </div>
            <div>
              <label htmlFor="scale">Scale</label>
              <input
                type="range"
                id="scale"
                min={0}
                max={5}
                step={0.01}
                value={selectedIndex==0 ? scale[0]: scale2[0]}
                onChange={utils.handleSliderChange((value) =>
                  selectedIndex==0 ?  setScale([value, value, value]) : setScale2([value, value, value])
                )}
                style={utils.getBackgroundSize(selectedIndex==0 ? scale[0]: scale2[0],0,5)}
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

export default Cap;
