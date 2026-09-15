import { Canvas } from '@react-three/fiber'
import React from 'react'
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import Experience from './components/Experience'
import { Environment, OrbitControls } from '@react-three/drei'

const App = () => {

  return (
    <div className='h-screen w-full bg-black text-white'>
      <Canvas >
        {/* <ambientLight intensity={0.1} /> */}
        {/* <directionalLight position={[-5, 2, 8]} intensity={1.2} /> */}
        <Environment preset='sunset' />
        <OrbitControls />
        <Experience />
      </Canvas>
    </div>
  )
}

export default App