import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  OrbitControls,
  Decal, 
  useGLTF,
  useTexture
} from '@react-three/drei';
import icon from '../assets/image.png';
import { degToRad } from "three/src/math/MathUtils.js";
import {isMobile} from 'react-device-detect';

export function Shoe({ onModelLoad, ...props }) {
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
      material-roughness={0.5} geometry={nodes.Arc001_1002.geometry} material={materials['01___Default-2.002']} material-color={props.customColors.mesh} />
        <mesh      material-metalness={0.5}
      material-roughness={0.5} geometry={nodes.Arc001_1002_1.geometry} material={materials['02___Default-2.002']} material-color={props.customColors.mesh} />
        <mesh      material-metalness={0.5}
      material-roughness={0.5} geometry={nodes.Arc001_1002_2.geometry} material={materials['02___Default.002']} material-color={props.customColors.mesh} />
        <mesh      material-metalness={0.5}
      material-roughness={0.5} geometry={nodes.Arc001_1002_3.geometry} material={materials['01___Default.002']} material-color={props.customColors.mesh} />
<mesh geometry={nodes.Arc001_1002_4.geometry} material={materials['printable.002']}>
        
        <meshBasicMaterial transparent opacity={0} />

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
      </group>
    </group>
  );
}

function Mug() {
  const [meshColor, setMeshColor] = useState('#ffffff');
  const [display, setDisplay] = useState('none');
  const [texture, setTexture] = useState("./textures/wawa.png");
  const [position, setPosition] = useState([0, 1, 0]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [scale, setScale] = useState([0, 0, 0]);
  const [modelLoaded, setModelLoaded] = useState(false);

  const getBackgroundSize = (value, min, max) => {
    return { backgroundSize: `${((value - min) * 100) / (max - min)}% 100%` };
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

  return (
    <div style={{overflow:"hidden", width: '100vw', height: '100vh', position: 'relative',backgroundColor:'black' }}>
      <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }}>
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
          left: isMobile?'70%':'90%',
        }}
      >
        <button style={{borderRadius:360,width: isMobile? '50px':'100px', height: isMobile? '50px':'100px'}}  onClick={galleryOpen}>
          <img src={icon} alt="gallery" style={{ width: isMobile? '25px':'50px', height: isMobile? '25px':'50px' }} />
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
                min={0.1}
                max={5}
                step={0.01}
                value={scale[0]}
                onChange={handleSliderChange((value) =>
                  setScale([value, value, value])
                )}
                style={getBackgroundSize(scale[0],0.1,5)}
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
