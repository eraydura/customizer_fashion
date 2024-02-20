import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  OrbitControls,
  Decal, 
  useGLTF,
  useTexture
} from '@react-three/drei';
import down from '../assets/down.png';
import up from '../assets/up.png';
import icon from '../assets/image.png';
import { degToRad } from "three/src/math/MathUtils.js";
import {isMobile} from 'react-device-detect';

export function DDress({ onModelLoad, ...props }) {
  const { nodes, materials,scene } = useGLTF("/models/dress.glb");

    // Notify parent component when model is loaded
    React.useEffect(() => {
      if (scene) {
        onModelLoad();
      }
    }, [scene, onModelLoad]);

  return (

    <group {...props} dispose={null}>
      <group position={isMobile? [0,-1.8,0]:[0,-3,0]} scale={isMobile?0.02 :0.03}>
        <mesh    material-metalness={0.5}
           material-roughness={0.5}  geometry={nodes.dress_Stretch_Denim_FCL1PSD003_FRONT_4181_0.geometry}  material={materials.Cotton_Oxford_FCL1PSC011_FRONT_4175001} material-color={props.customColors.down} >
        <Decal
              
              position={props.customColors.pos2} // Position of the decal
              rotation={props.customColors.rotation2} // Rotation of the decal (can be a vector or a degree in radians)
              scale={props.customColors.scale2} // Scale of the decal
            >

               <meshStandardMaterial
                map={useTexture(props.customColors.downtexture)}
                normalMap={useTexture("./textures/fabric.png")}
                toneMapped={true}
                polygonOffset
                polygonOffsetFactor={-1} // The mesh should take precedence over the original
              />


            </Decal>
        </mesh>
        <mesh            material-metalness={0.5}
           material-roughness={0.5}  geometry={nodes.dress_Cotton_Oxford_FCL1PSC011_FRONT_4174_0.geometry} material={materials.Cotton_Oxford_FCL1PSC011_FRONT_4174} material-color={props.customColors.up} >
        <Decal
              
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
      </group>
    </group>
  )
}

function Dress() {
  const [upColor, setUpColor] = useState('#ffffff');
  const [downColor, setDownColor] = useState('#ffffff');
  const [display, setDisplay] = useState('none');
  const [uptexture, setUpTexture] = useState("./textures/wawa.png");
  const [downtexture, setDownTexture] = useState("./textures/wawa.png");
  const [position, setPosition] = useState([0, 90, 0]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [position2, setPosition2] = useState([0, 90, 0]);
  const [rotation2, setRotation2] = useState([0, 0, 0]);
  const [scale2, setScale2] = useState([0, 0, 0]);
  const [scale, setScale] = useState([0, 0, 0]);
  const partSelected = ['up', 'down'];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modelLoaded, setModelLoaded] = useState(false);

  const handleModelLoad = () => {
    setModelLoaded(true);
    console.log(modelLoaded);
  };

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
        <DDress
        onModelLoad={handleModelLoad}
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
      ({modelLoaded ? <div>
        ({isMobile ?<div>
          <input
          type="color"
          style={{ position: 'absolute',top: '10%',left: '20px', width: '50px', height: '50px'}}
          value={partSelected[selectedIndex] === 'up' ? upColor :  downColor }
          onChange={(e) => handleColorChange(e.target.value)}
        />
        <div style={dropdownStyle2}>
        {partSelected.map((part, index) => (
          <button style={{   backgroundColor:"transparent",border:0 }} key={index} onClick={() => handlePartChange(index)}>
            <img src={part === 'up' ? up : down} alt={part} style={{  width:  '40px' , height:'40px' }} />
          </button>
        ))}
        </div>
      </div>: <div
        style={dropdownStyle}
      >
        <input
          type="color"
          style={{ width:  '100px', height:  '100px'}}
          value={partSelected[selectedIndex] === 'up' ? upColor :  downColor }
          onChange={(e) => handleColorChange(e.target.value)}
        />
        {partSelected.map((part, index) => (
          <button style={{    borderRadius:360 }} key={index} onClick={() => handlePartChange(index)}>
            <img src={part === 'up' ? up : down} alt={part} style={{ width:  '80px', height: '80px' }} />
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
                min={-10}
                max={10}
                step={0.01}
                value={position[0]}
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
                min={90}
                max={150}
                step={0.01}
                value={position[1]}
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
                value={rotation[1]}
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
                min={0.1}
                max={1000}
                step={0.01}
                value={scale[0]}
                onChange={handleSliderChange((value) =>
                  selectedIndex==0 ?  setScale([value, value, value]) : setScale2([value, value, value])
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

export default Dress;
