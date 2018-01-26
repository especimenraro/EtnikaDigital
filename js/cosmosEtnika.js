$(function () {

init()
})

// DECLARA ELEMENTOS DE LA ESCENA


			
function init() {

var scene = new THREE.Scene(),
			camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000),
			renderer = new THREE.WebGLRenderer({antialias: true, alpha: true}),			 
			 stats = initStats(),
			 tiempo = 0			 
			 
			 
renderer.setClearColor(0x000000)
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.shadowMapEnabled = true

// AGREGA EJES PARA REFERENCIA
var axes = new THREE.AxesHelper(20)
scene.add(axes)

//AGREGA PLANO
 var textureGrass = new THREE.TextureLoader().load("./imagenes/grasslight-big.jpg");
        textureGrass.wrapS = THREE.RepeatWrapping;
        textureGrass.wrapT = THREE.RepeatWrapping;
        textureGrass.repeat.set(2, 2);
var  planeGeometry = new THREE.PlaneGeometry(60,20,1,1),
			 planeMaterial = new THREE.MeshLambertMaterial({map:textureGrass}),
			 plane = new THREE.Mesh(planeGeometry,planeMaterial)
plane.rotation.x=-0.5*Math.PI
plane.position.x = 15
plane.position.y = 0
plane.position.z = 0
plane.receiveShadow = true
scene.add(plane)

// AGREGA CUBO

var cubeGeometry = new THREE.BoxGeometry(4,4,4),
			 cubeMaterial = new THREE.MeshLambertMaterial({color:0xff0000, wireframe: false}),
			 cube = new THREE.Mesh(cubeGeometry,cubeMaterial)
cube.castShadow = true
cube.position.x = -4
cube.position.y = 3
cube.position.z = 0

scene.add(cube)

//AGREGA ESFERA
var   sphereGeometry = new THREE.SphereGeometry(4,20,20),
			 sphereMaterial = new THREE.MeshLambertMaterial({color:0x7777ff, wireframe: false}),
			 sphere = new THREE.Mesh(sphereGeometry,sphereMaterial)

sphere.castShadow = false
sphere.position.x = 7
sphere.position.y = 4
sphere.position.z = 0

scene.add(sphere)

// AMBIENTE 
/*
var ambiColor = "#ffffff";
       var ambientLight = new THREE.AmbientLight(ambiColor);
        scene.add(ambientLight);
*/
// AGREGA LUZ
var lampara = new THREE.SpotLight(0xffffff)

lampara.position.x = 0
lampara.position.y =10
lampara.position.z =-60
lampara.castShadow = true
lampara.lookAt(plane)
scene.add(lampara)

var  textureFlare0 =new  THREE.TextureLoader().load('./imagenes/lensflare0.png'),
			textureFlare3 =new  THREE.TextureLoader().load('./imagenes/lensflare3.png'),
		    flareColor = new THREE.Color(0xffaacc),
			 flare = new THREE.LensFlare(textureFlare0,350,0.0,THREE.AdditiveBlending,flareColor)
			 /*
			  flare.add(textureFlare3, 60, 0.6, THREE.AdditiveBlending);
      flare.add(textureFlare3, 70, 0.7, THREE.AdditiveBlending);
        flare.add(textureFlare3, 120, 0.9, THREE.AdditiveBlending);
       flare.add(textureFlare3, 70, 1.0, THREE.AdditiveBlending);
*/
flare.position.copy(lampara.position)
scene.add(flare)

// POSICIONA LA CAMARA

camera.position.x = -30
camera.position.y = 20
camera.position.z = 30
camera.lookAt(scene.position)

document.getElementById('WebGL-output').appendChild(renderer.domElement)
renderScene()


function renderScene() {
	if (tiempo > 2) {tiempo =0} else {
	tiempo += 0.1}
cube.rotation.x += 0.1*Math.PI 
sphere.position.y = 3 * Math.sin(tiempo*Math.PI) + 4

stats.update()
requestAnimationFrame(renderScene)
renderer.render(scene,camera)
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

}








