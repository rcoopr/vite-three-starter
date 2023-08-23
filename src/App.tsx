import { Suspense, useRef } from 'react'
import threeLogo from './assets/threejs.svg'
import r3fLogo from './assets/r3f.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Canvas, useFrame } from '@react-three/fiber'
import { Shader } from './shader/shader'

export function App() {
  return (
    <>
      <div className='flex justify-center'>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://threejs.org/' target='_blank'>
          <img src={threeLogo} className='logo three' alt='ThreeJs logo' />
        </a>
        <a href='https://github.com/pmndrs/drei#index' target='_blank'>
          <img src={r3fLogo} className='logo r3f' alt='R3F logo' />
        </a>
      </div>
      <h1>Vite + ThreeJs + R3F</h1>
      <div className='relative h-96 w-full'>
        <Suspense
          fallback={
            <div className='flex h-full w-full flex-col items-center justify-center'>
              <svg
                className='-ml-1 mr-3 h-5 w-5 animate-spin text-black'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                />
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                />
              </svg>
            </div>
          }
        >
          <Canvas className='h-full w-full' /* frameloop='demand' */>
            <Cube />
          </Canvas>
        </Suspense>
      </div>
    </>
  )
}

function Cube() {
  const mesh = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta / 2
      mesh.current.rotation.y += delta
    }
  })

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <Shader />
    </mesh>
  )
}
