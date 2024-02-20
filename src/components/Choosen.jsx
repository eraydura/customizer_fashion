import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGesture } from "react-use-gesture";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const modelPaths = [
  "/models/baseball_cap.glb",
  "/models/dress.glb",
  "/models/mug.glb",
  "/models/shoes/shoe.gltf",
  "/models/Tshirt.glb",
  "/models/hoodie.glb"
];

const scale =[
    [5,5,5],
    [0.004,0.004,0.004],
    [0.5,0.5,0.5],
    [1.5,1.5,1.5],
    [4.5,4.5,4.5],
    [3, 3, 3]
]

const position =[
    [0,-0.5,0],
    [0,-4,0],
    [0, 0, 0],
    [0,0,0],
    [0, -6, 0],
    [0, -4, 0]
]

export default function Choosen() {
  const [modelIndex, setModelIndex] = useState(0);
  const modelCount = modelPaths.length;

  const bind = useGesture({
    onDrag: ({ direction: [x] }) => {
      if (x > 0.5) setModelIndex((index) => (index - 1 + modelCount) % modelCount);
      else if (x < -0.5) setModelIndex((index) => (index + 1) % modelCount);
    }
  });

  const handlePrevClick = () => {
    setModelIndex((index) => (index - 1 + modelCount) % modelCount);
  };

  const handleNextClick = () => {
    setModelIndex((index) => (index + 1) % modelCount);
  };

    // Inside your component
    const navigateTo = useNavigate();

    const handleOkay = () => {
    switch (modelIndex) {
        case 0:
            navigateTo("/cap");
        break;
        case 1:
            navigateTo("/dress");
        break;
        case 2:
            navigateTo("/mug");
        break;
        case 3:
            navigateTo("/shoes");
        break;
        case 4:
            navigateTo("/tshirt");
        break;
        case 5:
          navigateTo("/hoodie");
        break;
        default:
        break;
    }
    };

  return (
  <div style={{ background: "black", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Canvas style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", background: "black" }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <group position={position[modelIndex]} scale={scale[modelIndex]}>
          <ModelLoader path={modelPaths[modelIndex]} />
        </group>
      </Canvas>
      <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", display: "flex", justifyContent: "space-between", width: "100%", padding: "0 1rem" }}>
        <button onClick={handlePrevClick} style={{ outline: 0, border: 0, backgroundColor: 'transparent' }} disabled={modelIndex === 0}>
          <FaChevronLeft style={{ width:'50px', height:'50px', color: 'white' }} />
        </button>
        <button onClick={handleNextClick} style={{ outline: 0, border: 0, backgroundColor: 'transparent' }} disabled={modelIndex === modelCount - 1}>
          <FaChevronRight style={{ width:'50px', height:'50px',  color: 'white' }} />
        </button>
      </div>
      <div style={{ position: "absolute", top: "10%" , transform: "translateY(-50%)", width: "100%", padding: "0 1rem" }}>
        <button onClick={handleOkay} style={{ color: 'white', outline: 0, border: 0, backgroundColor: 'transparent', marginLeft: "1rem" }}>
          SELECT
        </button>
      </div>
    </div>

    <div style={{ marginTop: "1rem", display: "flex", alignItems: "center" }}>
      {[...Array(modelCount)].map((_, index) => (
        <div
          key={index}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: index === modelIndex ? "#333" : "#ccc",
            margin: "0 0.5rem",
            cursor: "pointer"
          }}
          onClick={() => setModelIndex(index)}
        />
      ))}
    </div>
  </div>
  );
}

function ModelLoader({ path }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} />;
}
