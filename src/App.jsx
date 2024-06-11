import { useState } from 'react'
import { Canvas, extend } from '@react-three/fiber'
import Initialize from './Default/Default'

function App() {

  return (
      <Canvas
        dpr={[1, 2]}
      >
        <Initialize />
      </Canvas>
  )
}

export default App
