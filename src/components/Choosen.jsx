import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGesture } from "react-use-gesture";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { isMobile } from "react-device-detect";
import '../index.css';

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
  const [loading, setLoading] = useState(true); // State for loading indicator
  const modelCount = modelPaths.length;

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

  useEffect(() => {
    setLoading(true); // Set loading to true when model index changes
    const preloadModel = async () => {
      await useGLTF.preload(modelPaths[modelIndex]);
      setLoading(false); // Set loading to false when model is loaded
    };
    preloadModel();
  }, [modelIndex]);

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

        {loading &&<div style={{  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}><h1>Loading...</h1></div>}
        {!loading && (
          <div style={{ position: "absolute", top: "50%", display: "flex", justifyContent: "space-between", width: "100%", padding: "0 1rem" }}>
            <button onClick={handlePrevClick} style={{ outline: 0, border: 0, backgroundColor: 'transparent' }} disabled={modelIndex === 0}>
              <FaChevronLeft style={{ width:'50px', height:'50px', color: 'white' }} />
            </button>
            <button onClick={handleNextClick} style={{ outline: 0, border: 0, backgroundColor: 'transparent' }} disabled={modelIndex === modelCount - 1}>
              <FaChevronRight style={{ width:'50px', height:'50px',  color: 'white' }} />
            </button>
          </div>
        )}
        {!loading && (
          <div style={{ 
              textAlign: 'center', // Center align the text
              position: 'absolute', 
              left: isMobile ? '5%' : '20%', 
              top: '10%', 
              color: 'white' 
            }}>
              {isMobile ? (
                <h3 style={{ textAlign: 'center', fontSize: '15px', fontFamily: "'Vipnagorgialla', sans-serif" }}>
                  WHICH ONE DO YOU WANT TO CREATE?
                </h3>
              ) : (
                <h1 style={{ fontSize: '35px', fontFamily: "'Vipnagorgialla', sans-serif" }}>
                  WHICH ONE DO YOU WANT TO CREATE?
                </h1>
              )}
            </div>
        )}
      </div>
      {!loading && (
        <div style={ {top:"80%", position: "absolute",  display: "flex", alignItems: "center" }}>
          <button onClick={handleOkay} style={{   backgroundColor: 'red',color: 'white',padding: '10px 20px',borderRadius: '5px',
            cursor: 'pointer',fontSize: '16px',fontWeight: 'bold',textDecoration: 'none',   outline: 0, border: 0,   }}>
            SELECT
          </button>
        </div>
      )}
      {!loading && (
        <div style={isMobile ? { position: "absolute", top:'85%', marginTop: "1.5rem", display: "flex", alignItems: "center" } : { marginTop: "1rem", display: "flex", alignItems: "center" }}>
          {[...Array(modelCount)].map((_, index) => (
            <div
              key={index}
              style={{
                width: isMobile ? "30px":"50px",
                height: isMobile ? "30px":"50px",
                borderRadius: "50%",
                backgroundColor: index === modelIndex ? "#333" : "#ccc",
                margin: "0 0.5rem",
                cursor: "pointer"
              }}
              onClick={() => setModelIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ModelLoader({ path }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} />;
}




