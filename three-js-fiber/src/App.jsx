import { Canvas } from '@react-three/fiber'
import React from 'react'
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'

const App = () => {
  return (
    <div className='min-h-screen w-full bg-black text-white'>
      <Canvas>
        <mesh>
          <boxGeometry />
          <meshBasicMaterial color={"red"} />
        </mesh>
      </Canvas>
    </div>
  )
}

export default App