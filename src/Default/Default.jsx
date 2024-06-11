import { useFrame, extend, useLoader } from "@react-three/fiber"
import { Text3D, Center } from '@react-three/drei'
import { useRef } from "react"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as three from 'three'


export default function Initialize(){

    const losange = useLoader(GLTFLoader, './model/ArchLogoAkawaka.glb')
    console.log(losange)
    const text3d = useRef()
    const gradientColor = new three.ShaderMaterial({
        uniforms: {
            color1: {
                value: new three.Color("hotpink")
            },
            color2: {
                value: new three.Color("orange")
            }
        },
        vertexShader: `
            varying vec2 vUv;
        
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 color1;
            uniform vec3 color2;
        
            varying vec2 vUv;
            
            void main() {
                gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
            }
      `
    })

    losange.scene.children[0].material = gradientColor

    useFrame((state) => {

        const angle = state.clock.getElapsedTime()/2

        state.camera.position.x = Math.sin(angle) * 8
        state.camera.position.y = Math.sin(angle) * 13
        state.camera.position.z = Math.cos(angle) * 8
        state.camera.lookAt(0, 0, 0)

    })

    return <>

        <directionalLight position={[1, 2, 3]} intensity={ 5 }/>
        <directionalLight position={[1, 2, -3]} intensity={ 5 }/>
        <ambientLight intensity={ 1.5 } />

        <group>
            <mesh scale={1.6} rotation={[1.57, -0.75, 0]} position={[-3.1, -0.15, -0.40]} >
                <primitive object={losange.scene} />
                <meshBasicMaterial color="red" />
            </mesh>
            <Center>
                <Text3D ref={text3d} font="./fonts/Ruler Stencil Thin_Regular.json" size={1.5} curveSegments={12} bevelEnabled bevelThickness={0.05} bevelSize={0.05} bevelOffset={0} bevelSegments={8}>
                    Akawaka
                    <meshStandardMaterial color="lightgrey" />
                </Text3D>
            </Center>
        </group>

        <mesh>
            <points>
                <sphereGeometry args={[20, 48, 64]} />
                <pointsMaterial color="#ff8900" size={0.1} sizeAttenuation wirefra />
            </points>
        </mesh>
        <mesh rotation-y={1.5}>
            <points>
                <sphereGeometry args={[20, 48, 64]} />
                <pointsMaterial color="#ff00ed" size={0.1} sizeAttenuation wirefra />
            </points>
        </mesh>       
    </>

}