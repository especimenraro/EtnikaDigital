$(function () {
init()
$('#menu-qs').click(function () {
		$('.contenedor-contenido-menu').toggle()
		$('#qs').toggle()
		})
$('#menu-lineas').click(function () {
		$('.contenedor-contenido-menu').toggle()
		$('#lineas').toggle()
		})
$('#menu-contacto').click(function () {
		$('.contenedor-contenido-menu').toggle()
		$('#contacto').toggle()
		})
$('#menu-acercade').click(function () {
		$('.contenedor-contenido-menu').toggle()
		$('#acercade').toggle()
		})
}) // FIN DOCUMENT.READY




			
function init() {
window.addEventListener('click',onMouseClick,false)
window.addEventListener('mousemove', onMouseMove,false)

var mouse = new THREE.Vector2();
var clickPos = new THREE.Vector2();
var scene = new THREE.Scene(),
			camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,10,1000),
			renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
 //var stats = initStats()
var outerRadius = 9

			 
			 
renderer.setClearColor(0x000000)
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.shadowMapEnabled = true
/*
scene.background = new THREE.CubeTextureLoader()
	.setPath( './imagenesCube/' )
	.load( [
		'right.png',
		'left.png',
		'top.png',
		'bottom.png',
		'front.png',
		'back.png'
	] );
	*/

// AGREGA EJES

var ejes = new THREE.AxesHelper(20,20,20)
scene.add(ejes)



// AGREGA SATELITE

var loaderISS = new THREE.glTFLoader();

        loaderISS.load('./modelos/misc_chair01.json', function (gltf) {
            
            scene.add(gltf.scene);

        });
 // FIN LOADER


//AGREGA ESFERA TIERRA

var   sphereGeometry = new THREE.SphereGeometry(9,40,40),
			 textureEarth =new  THREE.TextureLoader().load('./imagenes/tierra.jpg'),
			 sphereMaterial = new THREE.MeshLambertMaterial({map: textureEarth}),
			 sphere = new THREE.Mesh(sphereGeometry,sphereMaterial)
			 sphere.name = 'tierra'

sphere.castShadow = false
sphere.position.x = 0
sphere.position.y = 0
sphere.position.z = 0
sphere.rotation.y = Math.PI
scene.add(sphere)


//AMBIENTE 

var ambiColor = "#ffffff";
       var ambientLight = new THREE.AmbientLight(ambiColor);
       ambientLight.intensity = 0.5
        scene.add(ambientLight);
		
// AGREGA SOL
var LuzSol = new THREE.DirectionalLight(0xffffff)

LuzSol.position.x = -15
LuzSol.position.y =0
LuzSol.position.z =-60
LuzSol.intensity = 2
LuzSol.castShadow = true
scene.add(LuzSol)

var  textureFlare0 =new  THREE.TextureLoader().load('./imagenes/lensflare0.png'),
			textureFlare1 =new  THREE.TextureLoader().load('./imagenes/lensflare1.png'),
			textureFlare2 =new  THREE.TextureLoader().load('./imagenes/lensflare2.png'),
			textureFlare3 =new  THREE.TextureLoader().load('./imagenes/lensflare3.png'),
		    flareColor = new THREE.Color(0xffaacc),
			 flare = new THREE.LensFlare(textureFlare0,700,0.0,THREE.AdditiveBlending,flareColor)
			 flare.add(textureFlare3, 70, 0.25, THREE.AdditiveBlending);
			 flare.add(textureFlare2, 100, 0.35, THREE.AdditiveBlending);
			 /*
			  flare.add(textureFlare3, 60, 0.6, THREE.AdditiveBlending);
      flare.add(textureFlare3, 70, 0.7, THREE.AdditiveBlending);
        flare.add(textureFlare3, 120, 0.9, THREE.AdditiveBlending);
       flare.add(textureFlare3, 70, 1.0, THREE.AdditiveBlending);
*/
flare.position.copy(LuzSol.position)
scene.add(flare)

var   solGeometry = new THREE.SphereGeometry(0.7,40,40),
			solMaterial = new THREE.MeshLambertMaterial({color:0xffffff}),
			 sol = new THREE.Mesh(solGeometry,solMaterial)
sol.name = 'sol'
sol.material.transparent = true;
sol.material.opacity = 0.1;

sol.position.x = -15
sol.position.y = -1
sol.position.z = -60
scene.add(sol)

// AGREGA LUZ PARA EL LADO OSCURO

var luzOscura = new THREE.SpotLight(0xffffff)

luzOscura.position.x = 0
luzOscura.position.y =0
luzOscura.position.z =30
luzOscura.intensity = 2
luzOscura.castShadow = false
scene.add(luzOscura)


// POSICIONA LA CAMARA

camera.position.x = 20
camera.position.y = 30
camera.position.z = 50
camera.lookAt(scene.position)

//AGREGA CONTROL ORBITAL
 var orbitControls = new THREE.OrbitControls(camera);
        orbitControls.autoRotate = false;
        var clock = new THREE.Clock();
      
// AGREGA CUBEMAP CON LA GALAXIA
		 
        var urls = [
		'right.png',
		'left.png',
		'top.png',
		'bottom.png',
		'front.png',
		'back.png'
	] ;
			var loader = new THREE.CubeTextureLoader()
			loader.setPath('./imagenesCube/')
        var textureCube =loader.load(urls)
       
 
       textureCube.format = THREE.RGBFormat;

        // create a custom shader
        var shader = THREE.ShaderLib["cube"];
        shader.uniforms["tCube"].value = textureCube;

        var materialEspacio = new THREE.ShaderMaterial({

            fragmentShader: shader.fragmentShader,
            vertexShader: shader.vertexShader,
            uniforms: shader.uniforms,
            depthWrite: false,
            side: THREE.DoubleSide

        });

        // create the skybox
        var skybox = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), materialEspacio);
        scene.add(skybox);
        
// AGREGA RAYCASTING PARA DETECTAR ELEMENTOS DENTRO DE LA ESCENA
var raycaster = new THREE.Raycaster();

document.getElementById('WebGL-output').appendChild(renderer.domElement)
renderScene()


function renderScene() {
//stats.update()
var delta = clock.getDelta();
orbitControls.update(delta);
// update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouse, camera );

var intersects = raycaster.intersectObjects( scene.children );
detectaObjetos(intersects);
requestAnimationFrame(renderScene)

renderer.render(scene,camera)

}


function onMouseClick(event) {
	clickPos.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	clickPos.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	var clickRaytrace = new THREE.Raycaster()
	clickRaytrace.setFromCamera(clickPos, camera);
	if (!culturaScene) {
	var clickIntersects = clickRaytrace.intersectObjects( scene.children );
} else {
var clickIntersects = clickRaytrace.intersectObjects( scene2.children );
}
	detectaClickObjetos(clickIntersects);
	
}

function onMouseMove( event ) {

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	
}

function detectaObjetos(intersects) {
if (intersects.length>0 ){
	if (intersects[0].object.name == 'tierra') {
		
	} else {
		
	}
	if (intersects[0].object.name == 'sol') {
	
	} else {
	
	}
}
}

function detectaClickObjetos(clickIntersects) {
	
}

function initStats() {
	var stats = new Stats()
	stats.setMode(0)
	stats.domElement.style.position = 'absolute'
	stats.domElement.style.left = '0px'
	stats.domElement.style.top = '0px'
	document.getElementById('Stats-output').appendChild(stats.domElement)
	return stats

}

} //FIN INIT








