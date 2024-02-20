import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  OrbitControls,
  Decal, 
  useGLTF,
  useTexture
} from '@react-three/drei';
import down from '../assets/cap_down.png';
import up from '../assets/cap_up.png';
import icon from '../assets/image.png';
import { degToRad } from "three/src/math/MathUtils.js";

export function CapMesh(props) {
  const { nodes, materials } = useGLTF("/models/baseball_cap.glb");

  return (
    <group {...props} dispose={null}>
    <group rotation={[-Math.PI / 2, 0, 0]} scale={0.005}>
      <group position={[0.191, 190, 6.367]} scale={[195.252, 195.252, 222.442]}>
      <mesh geometry={nodes.gorra002__0.geometry} material={materials.Fabric_1} material-color={props.customColors.up} >
                <Decal
              // debug // Makes "bounding box" of the decal visible
              position={props.customColors.pos} // Position of the decal
              rotation={props.customColors.rotation} // Rotation of the decal (can be a vector or a degree in radians)
              scale={props.customColors.scale} // Scale of the decal
            >

               <meshStandardMaterial
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

               <meshStandardMaterial
                map={useTexture(props.customColors.downtexture)}
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
  const [uptexture, setUpTexture] = useState("./textures/wawa.png");
  const [downtexture, setDownTexture] = useState("./textures/wawa.png");
  const [position, setPosition] = useState([0, 0, 0]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [position2, setPosition2] = useState([0, 0, 0]);
  const [rotation2, setRotation2] = useState([0, 0, 0]);
  const [scale2, setScale2] = useState([0, 0, 0]);
  const [scale, setScale] = useState([0, 0, 0]);
  const partSelected = ['up', 'down'];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePartChange = (index) => {
    if(index==0 && uptexture=="./textures/wawa.png"){
      setDisplay("none");
    }else if(index==1 && downtexture=="./textures/wawa.png"){
      setDisplay("none");
    }
    setSelectedIndex(index);
  };

  const handleColorChange = (color) => {
    switch (partSelected[selectedIndex]) {
      case 'up':
        setUpColor(color);
        break;
      case 'down':
        setDownColor(color);
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
        if(uptexture==="./textures/wawa.png"&&selectedIndex==0){
          setDisplay("flex");
          setUpTexture(reader.result);
        }else if(downtexture==="./textures/wawa.png"&&selectedIndex==1){
          setDisplay("flex");
          setDownTexture(reader.result);
        }
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
    top: '20px',
    left: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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


  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }}>
        <color attach="background" args={['#ececec']} />
        <OrbitControls />
        <Environment preset="sunset" background blur={4} />
        <ambientLight />
        <CapMesh
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
      <div
        style={dropdownStyle}
      >
        <input
          type="color"
          value={partSelected[selectedIndex] === 'up' ? upColor :  downColor }
          onChange={(e) => handleColorChange(e.target.value)}
        />
        {partSelected.map((part, index) => (
          <button style={{borderRadius:360, backgroundColor:''}} key={index} onClick={() => handlePartChange(index)}>
            <img src={part === 'up' ? up : down} alt={part} style={{ width: '80px', height: '80px' }} />
          </button>
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '90%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <button style={{borderRadius:360,width: '100px', height: '100px'}}  onClick={galleryOpen}>
          <img src={icon} alt="gallery" style={{ width: '50px', height: '50px' }} />
        </button>
      </div>

        <div style={{display:display,     position: 'absolute',      top: '90%',
          left: '10%', flexDirection: 'row',gap: '150px'}}>
 <div>
              <label htmlFor="posX">Position X</label>
              <input
                type="range"
                id="posX"
                min={-10}
                max={10}
                step={0.01}
                value={selectedIndex==0 ? position[0] : position2[0]}
                onChange={handleSliderChange((value) =>
                  selectedIndex==0 ? setPosition((prev) => [value, prev[1], prev[2]]) :setPosition2((prev) => [value, prev[1], prev[2]])
                )}
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
                onChange={handleSliderChange((value) =>
                  selectedIndex==0 ? setPosition((prev) => [prev[0], value, prev[2]]) : setPosition2((prev) => [prev[0], value, prev[2]])
                )}
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
                onChange={handleSliderChange((value) =>
                  selectedIndex==0 ?setRotation((prev) => [prev[0], value, prev[2]]): setRotation2((prev) => [prev[0], value, prev[2]])
                )}
              />
            </div>
            <div>
              <label htmlFor="scale">Scale</label>
              <input
                type="range"
                id="scale"
                min={1.5}
                max={5}
                step={0.01}
                value={selectedIndex==0 ? scale[0]: scale2[0]}
                onChange={handleSliderChange((value) =>
                  selectedIndex==0 ?  setScale([value, value, value]) : setScale2([value, value, value])
                )}
              />
            </div>
        </div>
        
    </div>
  );
}

export default Cap;
