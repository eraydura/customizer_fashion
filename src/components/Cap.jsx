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

export function CapMesh(props) {
  const { nodes, materials } = useGLTF("/models/baseball_cap.glb");

  return (
    <group {...props} dispose={null}>
    <group rotation={[-Math.PI / 2, 0, 0]} scale={0.005}>
      <group position={[0.191, 190, 6.367]} scale={[195.252, 195.252, 222.442]}>
        <mesh            material-metalness={0.5}
           material-roughness={0.5}  geometry={nodes.gorra002__0.geometry} material={materials['Material.001']} material-color={props.customColors.mesh} >
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
  </group>

  );
}

function Cap() {
  const [meshColor, setMeshColor] = useState('#ffffff');
  const [display, setDisplay] = useState('none');
  const [texture, setTexture] = useState("./textures/wawa.png");
  const [position, setPosition] = useState([0, 1, 0]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [scale, setScale] = useState([0, 0, 0]);

  const galleryOpen = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if(texture==="./textures/wawa.png"){
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
    top: '20px',
    left: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }}>
        <color attach="background" args={['#ececec']} />
        <OrbitControls />
        <Environment preset="sunset" background blur={4} />
        <ambientLight />
        <CapMesh
          customColors={{
            mesh: meshColor,
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
          value={meshColor }
          onChange={(e) => handleColorChange(e.target.value)}
        />
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
                min={-3}
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
        
    </div>
  );
}

export default Cap;
