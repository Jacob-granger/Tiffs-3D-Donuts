import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'
// import { Scroll, ScrollControls } from '@react-three/drei'
import Interfaces from './components/Interfaces.jsx'
import DonutScene from './components/DonutScene.jsx'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  // const [section, setSection] = useState(0)
  const { materials } = useGLTF('./donut_cat/scene.gltf')

  const [glazeColor, setGlazeColor] = useState(
    materials['Material.004'].clone()
  )
  const [baseColor, setBaseColor] = useState(materials['Material.003'].clone())

  const [donutMarginLeft, setDonutMarginLeft] = useState('0px')
  const [donutMarginTop, setDonutMarginTop] = useState('0px')
  const [donutScale, setDonutScale] = useState(1)
  // const [donutAngle, setDonutAngle] = useState(3)
  const donutDivWidth = 800

  const [texture, setTexture] = useState('')

  useEffect(() => {
    const scrollHandler = () => {
      requestAnimationFrame(() => {
        const pageHeight =
          document.height !== undefined
            ? document.height
            : document.body.offsetHeight
        const pageWidth =
          document.width !== undefined
            ? document.width
            : document.body.offsetWidth
        const yOffset = window.scrollY
        const presentage = yOffset / pageHeight
        const maxMargin = pageWidth - donutDivWidth
        setDonutMarginLeft(`${maxMargin * presentage}px`)
        setDonutMarginTop(`${150 * presentage}px`)
        setDonutScale(1 + presentage * 0.08)
        // setDonutAngle(10)
        console.log(`donutAngle:${donutScale}`)
      })
    }
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [donutMarginLeft, donutMarginTop, donutScale])

  function updateGlaze(hex) {
    const newMaterials = glazeColor.clone()

    newMaterials.color = new THREE.Color(hex)
    setGlazeColor(newMaterials)
  }

  function updateBase(hex) {
    const newMaterials = baseColor.clone()
    newMaterials.color = new THREE.Color(hex)
    setBaseColor(newMaterials)
  }

  function updateTexture(newTexture) {
    setTexture(newTexture)
  }

  return (
    <div style={{ position: 'relative', scrollBehavior: 'smooth' }}>
      <Canvas
        shadows
        camera={{
          fov: 3.5,
          near: 0.1,
          far: 1000,
          position: [3, 3, 5],
        }}
        style={{
          position: 'fixed',
          height: '100vh',
          width: `${donutDivWidth}px`,
          marginLeft: donutMarginLeft,
          marginTop: donutMarginTop,
          background: 'white',
          transform: `scale(${donutScale})`,
        }}
      >
        <OrbitControls enableZoom={false} />
        <color attach="background" args={['#ffffff']} />
        {/* <ScrollControls pages={2} demping={0.1}> */}
        <DonutScene
          glazeColor={glazeColor}
          baseColor={baseColor}
          texture={texture}
        />
        {/* <Scroll html>
            <QueryClientProvider client={queryClient}>
              <Interfaces updateGlaze={updateGlaze} updateBase={updateBase} />
            </QueryClientProvider>
          </Scroll> */}
        {/* </ScrollControls> */}
      </Canvas>

      <div style={{ position: 'absolute', top: 0, left: 0 }}>
        <QueryClientProvider client={queryClient}>
          <Interfaces
            updateGlaze={updateGlaze}
            updateBase={updateBase}
            updateTexture={updateTexture}
          />
        </QueryClientProvider>
      </div>
    </div>
  )
}

export default App
