import React, { useMemo } from 'react';
import { Canvas } from 'react-three-fiber';
import { TextureLoader } from 'three';
import { OrbitControls, Decal, useGLTF, useTexture } from '@react-three/drei';

export function Shoe({ onModelLoad, customColors, ...props }) {
    const { nodes, materials } = useGLTF("/models/mug.glb");
    
    return (
        <group {...props} dispose={null}>
            <group position={[0, -0.5, 0]} scale={0.3}>
                <mesh
                    material-metalness={0.5}
                    material-roughness={0.5}
                    geometry={nodes.Arc001_1002.geometry}
                    material={materials['01___Default-2.002']}
                />
                <mesh
                    material-metalness={0.5}
                    material-roughness={0.5}
                    geometry={nodes.Arc001_1002_1.geometry}
                    material={materials['02___Default-2.002']}
                />
                <mesh
                    material-metalness={0.5}
                    material-roughness={0.5}
                    geometry={nodes.Arc001_1002_2.geometry}
                    material={materials['02___Default.002']}
                />
                <mesh
                    material-metalness={0.5}
                    material-roughness={0.5}
                    geometry={nodes.Arc001_1002_3.geometry}
                    material={materials['01___Default.002']}
                />
                <mesh geometry={nodes.Arc001_1002_4.geometry}>
                <meshPhongMaterial transparent   map={customColors.texture} toneMapped={true} polygonOffset polygonOffsetFactor={-1} />
                </mesh>
            </group>
        </group>
    );
}

function Text() {
    const texture = useMemo(() => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const width = 512;
        const height = 256;

        canvas.width = width;
        canvas.height = height;

        // Draw text on canvas
        context.fillStyle = 'white';
        context.font = 'Bold 36px Arial';
        context.textAlign = 'center';
        context.fillText('Your Text Here', width / 2, height / 2);

        // Create a TextureLoader and load the canvas as a texture
        const textureLoader = new TextureLoader();
        const texture = textureLoader.load(canvas.toDataURL());

        return texture;
    }, []);

    return (
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {/* Add OrbitControls for navigation */}
            <OrbitControls />
            {/* Render the Shoe component */}
            <Shoe customColors={{ texture: texture }} />
        </Canvas>
    );
}

export default Text;
