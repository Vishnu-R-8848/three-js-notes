import { Text, useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'

const Experience = () => {

  const meshRef = useRef(null);
  const materialRef = useRef(null);

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 1;
  })

  const { scene, animations } = useGLTF("./model.glb");
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    console.log(actions)
    actions.Death.play()
  }, [actions])

  return (
    <>
      <mesh ref={meshRef}
      // onPointerEnter={(e) => {
      //   e.stopPropagation();
      //   materialRef.current.color.set("yellow");
      // }} onPointerLeave={(e) => {
      //   e.stopPropagation();
      //   materialRef.current.color.set("red");
      // }}
      // position={[-3.5, 0.2, 1]}
      // scale={0.2}
      >
        {/* <boxGeometry args={[1, 1, 1]} /> */}
        {/* <circleGeometry /> */}
        {/* <meshStandardMaterial ref={materialRef} color={"red"} metalness={1} roughness={0.1} /> */}
      </mesh>

      {/* <Text >
        Vishnu Naik Chouhan
      </Text> */}

      <primitive object={scene} scale={0.2} position={[0, 0, 0]} />
    </>
  )
}

export default Experience