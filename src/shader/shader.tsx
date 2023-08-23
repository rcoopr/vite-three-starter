import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import vertex from './glsl/shader.vert'
import fragment from './glsl/shader.frag'
import { forwardRef, useImperativeHandle, useRef } from 'react'

type ShaderProps = {
  time: 0
  color: THREE.Color
}

const initialShaderProps: ShaderProps = {
  time: 0,
  color: new THREE.Color(0.05, 0.0, 0.025),
}

const ShaderImpl = shaderMaterial(initialShaderProps, vertex, fragment)

extend({ ShaderImpl })

export const Shader = forwardRef<HTMLElement, Partial<ShaderProps>>(
  (props, ref) => {
    const localRef = useRef<ShaderProps & HTMLElement>(null!)

    useImperativeHandle(ref, () => localRef.current)

    useFrame((_, delta) => {
      if (localRef.current) {
        localRef.current.time += delta
      }
    })
    return (
      // @ts-expect-error custom element comes from `extend` above
      <shaderImpl
        ref={localRef}
        glsl={THREE.GLSL3}
        {...props}
        attach='material'
      />
    )
  },
)
Shader.displayName = 'Shader'
