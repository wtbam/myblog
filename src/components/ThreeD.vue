<template>

    <canvas class="e-canvas"></canvas>

</template>

<style scoped>
canvas{
    overflow: hidden;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

</style>

<script setup>
import * as THREE from "three"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";


import { onMounted,ref } from "vue";
import GSAP from 'gsap'
var mm=null
var rrr=null
class Exppp{

    
    constructor(){
        const canvas=document.querySelector(".e-canvas")
        var aspect=width/height;
        const pixelRatio=Math.min(window.devicePixelRatio,1.2);
        const frustrum=5;
        const scene = new THREE.Scene()
        // const axesHelper = new THREE.AxesHelper(5);
        // scene.add(axesHelper);
        // 创建一个摄像机
        /**
         * 相机设置
         */
        var width = Math.max(window.innerWidth*0.86,720); //窗口宽度
        var height = Math.max(window.innerHeight*0.86,680); //窗口高度
        var k = width / height; //窗口宽高比
        var s = 3; //三维场景显示范围控制系数，系数越大，显示的范围越大
        //创建相机对象
        var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s*0.95, 1, 1000);
        camera.position.set(-Math.PI/6, 110, 220); //设置相机位置
        camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

        /**
         * 光源设置
         */
            //点光源

        const sunlight=new THREE.DirectionalLight('#ffffff',3);
        sunlight.castShadow='true';
        sunlight.shadow.camera.far=10;
        sunlight.shadow.mapSize.set(1024,1024);
        sunlight.shadow.normalBias=0.05;
        sunlight.position.set(1.5,7,3);
        scene.add(sunlight);
        //scene.add(new THREE.CameraHelper(sunlight.shadow.camera));
        const light=new THREE.AmbientLight("#ffffff",1);
        scene.add(light);
        var point = new THREE.PointLight(0xffffff,3);
        point.position.set(400, 200, 300); //点光源位置
        scene.add(point); //点光源添加到场景中
        //环境光
        // var ambient = new THREE.AmbientLight(0x444444,3);
        // scene.add(ambient);

        // const rectLight = new THREE.RectAreaLight( 0xffffff, 2,  0.25, 0.5 );
        // rectLight.position.set( 1.1, 0.83, -0.18 );
        // rectLight.lookAt( 0, 0, 0 );
        // rectLight.rotation.y=-Math.PI/99;
        // rectLight.rotation.z=Math.PI/4;
        // rectLight.rotation.x=-Math.PI/2;
        // scene.add(rectLight)
        // const rectLightHelper = new RectAreaLightHelper( rectLight );
        // rectLight.add( rectLightHelper );

        //diban

        const geometry=new THREE.PlaneGeometry(120,120);
        const material=new THREE.MeshStandardMaterial({
            color:0x70a1ff,side: THREE.BackSide
        });
        const plane=new THREE.Mesh(geometry,material);
        
        scene.add(plane);
        plane.rotation.x=Math.PI/2;
        // plane.rotation.z=Math.PI/4;
        plane.receiveShadow=true;
        plane.position.y=-8.3;
        plane.position.x=-19.3;
        // plane.position.z=-9.3;

        const loader = new GLTFLoader();
        const dracoloader=new DRACOLoader();
        dracoloader.setDecoderPath("/draco/");
        loader.setDRACOLoader(dracoloader);
        loader.load( 'models/forweb-house.glb', function ( gltf ) {
            var model =  gltf.scene
            mm=model
            model.scale.set(1,1,1)
            model.position.set(0,-1,0)
            model.castShadow=true
            model.receiveShadow=true
            
            
            scene.add(model);
        
            // 执行一个渲染函数
            const renderer=new THREE.WebGLRenderer({
            canvas: canvas,antialias: true
            });
            renderer.useLegacyLightstrue;
            renderer.outputColorSpace=THREE.SRGBColorSpace;
            renderer.toneMapping=THREE.CineonToneMapping;
            renderer.toneMappingExposure=1.75;
            renderer.shadowMap.enabled=true;
            renderer.shadowMap.type=THREE.PCFShadowMap;
            renderer.setSize(width,height)
            renderer.setPixelRatio(pixelRatio)
            
            
            
            
            renderer.setViewport(0,0,width,height);
            renderer.render( scene, camera );
            rrr=renderer
            const controls = new OrbitControls(camera,renderer.domElement)
            controls.enableDamping=true;
            controls.enableZoom=false;
            controls.enableRotate = false;
            // controls.addEventListener('change',function(){
            //     renderer.render(scene,camera)
               
            // });
            

        }, undefined, function ( error ) {
        
            console.error( error );
        
        } );
        const lerp={
            current:0,
            target:0,
            ease: 0.1
        };
        canvas.addEventListener("mousemove",(e)=>{
                const rotation=(e.clientX-window.innerWidth/2)/window.innerWidth;
                lerp.current=GSAP.utils.interpolate(
                    lerp.current,
                    lerp.target,
                    lerp.ease
                );
                lerp.target=rotation*0.5;
                mm.rotation.y=lerp.current;
                rrr.render(scene,camera)
        });
        

    }
    
}




onMounted(()=>{
    // const experience=new Experience(document.querySelector(".e-canvas"))
    new Exppp()

})



</script>