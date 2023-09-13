import { Canvas } from '@react-three/fiber'
import { OrbitControls, Scroll, ScrollControls } from '@react-three/drei'
import Interfaces from './components/Interfaces'

import { useState } from 'react'
import DonutScene from './components/DonutScene'

function App() {
  const [section, setSection] = useState(0)

  return (
    <>
      <Canvas
        shadows
        camera={{ fov: 3, near: 0.1, far: 1000, position: [3, 3, 5] }}
      >
        <color attach="background" args={['#ececec']} />
        <ScrollControls pages={2} demping={0.1}>
          <DonutScene />
          <Scroll html>
            <Interfaces />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  )
}

export default App