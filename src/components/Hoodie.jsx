import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  OrbitControls,
  Decal, 
  useGLTF,
  useTexture
} from '@react-three/drei';
import souls from '../assets/3.png';
import meshs from '../assets/1.png';
import stripeimage from '../assets/2.png';
import icon from '../assets/image.png';
import { degToRad } from "three/src/math/MathUtils.js";

export function HoodieMesh(props) {
  const { nodes, materials } = useGLTF("/models/hoodie.glb");

  return (
    <group {...props} dispose={null}>
    <group position={[0,-4,0]} scale={0.003}>
      <group scale={10}>
        <mesh geometry={nodes.Hoodie_FABRIC_3_FRONT_1850_0.geometry} material={materials.FABRIC_3_FRONT_1850} material-color={props.customColors.mesh} >
        <Decal
              // debug // Makes "bounding box" of the decal visible
              position={props.customColors.pos} // Position of the decal
              rotation={props.customColors.rotation} // Rotation of the decal (can be a vector or a degree in radians)
              scale={props.customColors.scale} // Scale of the decal
            >

               <meshStandardMaterial
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
  const [position, setPosition] = useState([0, 0, 0]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [scale, setScale] = useState([0, 0, 0]);
  const partSelected = ['mesh', 'stripes', 'soul'];
  const [selectedIndex, setSelectedIndex] = useState(0);

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
        if(texture==="./textures/wawa.png"){
          setScale([1,1,1]);
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
        <HoodieMesh
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
      <div
        style={dropdownStyle}
      >
        <input
          type="color"
          value={partSelected[selectedIndex] === 'mesh' ? meshColor : partSelected[selectedIndex] === 'stripes' ? stripeColor : soulColor}
          onChange={(e) => handleColorChange(e.target.value)}
        />
        {partSelected.map((part, index) => (
          <button style={{borderRadius:360,}} key={index} onClick={() => handlePartChange(index)}>
            <img src={part === 'mesh' ? meshs : part === 'stripes' ? stripeimage : souls} alt={part} style={{ width: '80px', height: '80px' }} />
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
                min={-30}
                max={30}
                step={0.01}
                value={position[0]}
                onChange={handleSliderChange((value) =>
                  setPosition((prev) => [value, prev[1], prev[2]])
                )}
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
              />
            </div>
        </div>
    </div>
  );
}

export default Hoodie;