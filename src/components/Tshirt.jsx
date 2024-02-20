import React, { useState } from 'react';
import { Canvas,useLoader } from '@react-three/fiber';
import {
  Environment,
  OrbitControls,
  Decal, 
  useGLTF,
  useTexture
} from '@react-three/drei';
import arms from '../assets/arms.png';
import body from '../assets/body.png';
import neck from '../assets/neck.png';
import icon from '../assets/image.png';
import { degToRad } from "three/src/math/MathUtils.js";
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import {isMobile} from 'react-device-detect';

export function TshirtMesh({ onModelLoad, ...props }) {
  const { nodes, materials,scene } = useGLTF("/models/Tshirt.glb");
    // Notify parent component when model is loaded
    React.useEffect(() => {
      if (scene) {
        onModelLoad();
      }
    }, [scene, onModelLoad]);

  return (
    <group {...props} dispose={null} position={isMobile?[0, -2.5, 0]:[0, -4, 0]}  scale={isMobile?2:3}>
      <mesh   material-metalness={0.5}
           material-roughness={0.5} geometry={nodes.tshirt5Pattern2D_2210268.geometry} material={materials['Fabric']} position={[0, 0.001, 0]} material-color={props.customColors.mesh} >
      <Decal
              // debug // Makes "bounding box" of the decal visible
              position={props.customColors.pos} // Position of the decal
              rotation={props.customColors.rotation} // Rotation of the decal (can be a vector or a degree in radians)
              scale={props.customColors.scale} // Scale of the decal
            >

               <meshStandardMaterial
                map={useTexture(props.customColors.texture)}
                normalMap={useLoader(TextureLoader,"./textures/fabric.png")}
                toneMapped={true}
                polygonOffset
                polygonOffsetFactor={-1} // The mesh should take precedence over the original
              />


            </Decal> 
      </mesh>
      <mesh   material-metalness={0.5} material-roughness={0.5} geometry={nodes.tshirt5Pattern2D_2210268001.geometry} material={materials['Fabric1']} position={[0, 0.001, 0]} material-color={props.customColors.arm}></mesh>
      <mesh   material-metalness={0.5} material-roughness={0.5} geometry={nodes.tshirt5Pattern2D_2210268002.geometry} material={materials['Fabric2']} position={[0, 0.001, 0]} material-color={props.customColors.arm}></mesh>
      <mesh   material-metalness={0.5} material-roughness={0.5} geometry={nodes.tshirt5Pattern2D_2210268003.geometry} material={materials['Fabric3']} position={[0, 0.001, 0]} material-color={props.customColors.neck}></mesh>
    </group>
  );
}

function Tshirt() {
  const [meshColor, setMeshColor] = useState('#ffffff');
  const [armColor, setArmColor] = useState('#ffffff');
  const [neckColor, setNeckColor] = useState('#ffffff');
  const [display, setDisplay] = useState('none');
  const [texture, setTexture] = useState("./textures/wawa.png");
  const [position, setPosition] = useState([0, 0, 0]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [scale, setScale] = useState([0, 0, 0]);
  const partSelected = ['mesh', 'arm', 'neck'];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modelLoaded, setModelLoaded] = useState(false);

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
      case 'arm':
        setArmColor(color);
        break;
      case 'neck':
        setNeckColor(color);
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
    left: '25%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%', // Adjust the width as needed
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


  return (
    <div style={{overflow:"hidden", width: '100vw', height: '100vh', position: 'relative',backgroundColor:'black' }}>
      <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }}>
        <color attach="background" args={['#ececec']} />
        <OrbitControls />
        <Environment preset="sunset" background blur={4} />
        <ambientLight />
        <TshirtMesh
        onModelLoad={handleModelLoad}
          customColors={{
            mesh: meshColor,
            arm: armColor,
            neck: neckColor,
            texture: texture,
            pos: position,
            rotation: rotation,
            scale: scale,
          }}
        />
      </Canvas>
      ({modelLoaded ? <div>
        ({isMobile ? <div>
        <input
          type="color"
          style={{ position: 'absolute',top: '10%',left: '20px', width: '50px', height: '50px'}}
          value={partSelected[selectedIndex] === 'mesh' ? meshColor : partSelected[selectedIndex] === 'arm' ? armColor : neckColor}
          onChange={(e) => handleColorChange(e.target.value)}
        />
        <div style={dropdownStyle2}>
        {partSelected.map((part, index) => (
          <button style={{   backgroundColor:"transparent",border:0 }} key={index} onClick={() => handlePartChange(index)}>
              <img src={part === 'mesh' ? body : part === 'arm' ? arms : neck} alt={part} style={{ width: '40px', height: '40px' }} />
          </button>
        ))}
        </div>
      </div>: <div
        style={dropdownStyle}
      >
        <input
          type="color"
          style={{ width:  '100px', height:  '100px'}}
          value={partSelected[selectedIndex] === 'mesh' ? meshColor : partSelected[selectedIndex] === 'arm' ? armColor : neckColor}
          onChange={(e) => handleColorChange(e.target.value)}
        />
        {partSelected.map((part, index) => (
          <button style={{    borderRadius:360 }} key={index} onClick={() => handlePartChange(index)}>
            <img src={part === 'mesh' ? body : part === 'arm' ? arms : neck} alt={part} style={{ width: '80px', height: '80px' }} />
          </button>
        ))}
      </div> })
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: isMobile?'70%':'90%',
        }}
      >
        <button style={{ borderRadius:360,width: !isMobile? '100px'  :'60px', height: !isMobile?'100px':'60px'}}  onClick={galleryOpen}>
          <img src={icon} alt="gallery" style={{ width: !isMobile? '50px' : '35px', height: !isMobile? '50px' :'35px'}} />
        </button>
      </div>

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
              />
            </div>
            <div>
              <label htmlFor="posY">Position Y</label>
              <input
                type="range"
                id="posY"
                min={1}
                max={3}
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
                min={0.1}
                max={5}
                step={0.01}
                value={scale[0]}
                onChange={handleSliderChange((value) =>
                  setScale([value, value, value])
                )}
              />
            </div>
        </div>
        </div> : <div style={{ width: "100%", height: "100%" }}>
  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', padding: '10px 20px', borderRadius: '5px' }}><h1>Loading...</h1></div>
</div> })
    </div>
  );
}

export default Tshirt;
