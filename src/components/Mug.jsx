import React, { useState, useRef ,useEffect} from 'react';
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
import icon from '../assets/image.png';
import { degToRad } from "three/src/math/MathUtils.js";
import { isMobile } from 'react-device-detect';
import '../index.css';
import AddTextureModal from './Text';
import * as utils from './utils.jsx';
import * as styles from './style.jsx';
import { Leva ,useControls} from 'leva'

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
        <mesh geometry={nodes.Arc001_1002.geometry} material={materials['01___Default-2.002']} material-color={customColors.mesh} />
        <mesh geometry={nodes.Arc001_1002_1.geometry} material={materials['02___Default-2.002']} material-color={customColors.mesh} />
        <mesh geometry={nodes.Arc001_1002_2.geometry} material={materials['02___Default.002']} material-color={customColors.mesh} />
        <mesh geometry={nodes.Arc001_1002_3.geometry} material={materials['01___Default.002']} material-color={customColors.mesh} />
        <mesh geometry={nodes.Arc001_1002_4.geometry} >
        <meshBasicMaterial transparent opacity={0} />
        <Decal
          // debug // Makes "bounding box" of the decal visible
          position={customColors.pos} // Position of the decal
          rotation={customColors.rotation} // Rotation of the decal (can be a vector or a degree in radians)
          scale={customColors.scale} // Scale of the decal
        >

          <meshStandardMaterial
            map={useTexture(customColors.texture)}
            toneMapped={false}
            transparent
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
  const [position, setPosition] = useState([0, 2, 1]);
  const [texture, setTexture] = useState("./textures/wawa.png");
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [scale, setScale] = useState([1.5, 1.5, 1.5]);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [close, setClose] = useState(true);
  const canvasRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [display2, setDisplay2] = useState('none');

  const handleOkModal = (generatedTexture) => {
    setDisplay("flex");
    setDisplay2(true);
    utils.handleModalClose(setIsModalOpen);
    setTexture(generatedTexture);
  };

  useControls({
    angle: {
      min: degToRad(60),
      max: degToRad(300),
      value: Math.PI / 4,
      step: 0.01,
      onChange: (value) => {
        const x = Math.cos(value);
        const z = Math.sin(value);
        const rot = Math.atan2(x, z);
        setRotation(() => [0, rot, 0]);
        setPosition((pos) => [x, pos[1], z]);
      },
    },
    posY: {
      min: 0,
      max: 3,
      value: 1.8,
      step: 0.01,
      onChange: (value) => {
        setPosition((pos) => [pos[0], value, pos[2]]);
      },
    },
    scale: {
      min: 0.5,
      max: 3,
      value: 1.5,
      step: 0.01,
      onChange: (value) => {
        setScale(() => [value, value, 1.5]);
      },
    },
  })

 
  return (
    <div style={styles.body}>
      <Canvas gl={{ preserveDrawingBuffer: true }} ref={canvasRef} shadows camera={{ position: [3, 3, 3], fov: 30 }}>
        <color attach="background" args={['#ececec']} />
        <OrbitControls />
        <Environment preset="sunset" background blur={4} />
        <ambientLight />
        <Shoe
          onModelLoad={() => utils.handleModelLoad(setModelLoaded)}
          customColors={{
            mesh: meshColor,
            texture: texture,
            pos: position,
            rotation: rotation,
            scale: scale,
          }}
        />
      </Canvas>

      {modelLoaded ? (
        <div>
      <div
        style={styles.dropdownStyle}
      >
        {/* Color Button */}
        {isMobile ? (
          <input
            type="color"
            style={styles.colorPickerStyle}
            value={meshColor}
            onChange={(e) => utils.handleColorChange(e.target.value,setMeshColor)}
          />
        ) : (
          <input
            type="color"
            value={meshColor}
            onChange={(e) => utils.handleColorChange(e.target.value,setMeshColor)}
          />
        )}
      </div>

          {/* Gallery Button */}
          <div style={styles.gallery}>
            <button style={styles.galleryButtonStyle}   onClick={() => utils.galleryOpen(setDisplay, setClose,setDisplay2, setTexture)}>
              <img src={icon} alt="gallery"  style={styles.galleryButtonImageStyle} />
            </button>
          </div>

          {/* Save Button */}
          <div style={styles.save}>
            <button style={styles.saveButtonStyle} onClick={() => utils.saveCanvasAsImage(canvasRef)}>
              <img src={share} alt="gallery"  style={styles.saveButtonImages} />
            </button>
          </div>

          {/* Add Text Button */}
          <div style={styles.addTextButtonStyle}>
            <button onClick={() => utils.handleAddTexture(setIsModalOpen)}><img src={text} alt="add text" /></button>
          </div>


          {isModalOpen && (
            <AddTextureModal onClose={() => utils.handleModalClose(setIsModalOpen)} onOk={handleOkModal} />
          )}


          {texture !== "./textures/wawa.png" ? <Leva />: <Leva hidden  /> }
        </div>
      ) : (
        <div style={styles.loading}>
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
}

export default Mug;