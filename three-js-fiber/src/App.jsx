import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import React from 'react';
import Experience from './components/Experience';

const App = () => {
  return (
    <div className="h-screen w-full bg-[#0a0a0a] text-white">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        
        <OrbitControls makeDefault enableDamping dampingFactor={0.05} />
        <Experience />
      </Canvas>
    </div>
  );
};

export default App;