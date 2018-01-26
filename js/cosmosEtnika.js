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

// AGREGA EJES

var ejes = new THREE.AxesHelper(20,20,20)
scene.add(ejes)


//AGREGA ESFERA
var   sphereGeometry = new THREE.SphereGeometry(9,40,40),
			 textureEarth =new  THREE.TextureLoader().load('./imagenes/tierra.jpg')
			 sphereMaterial = new THREE.MeshLambertMaterial({map: textureEarth}),
			 sphere = new THREE.Mesh(sphereGeometry,sphereMaterial)

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
var sol = new THREE.DirectionalLight(0xffffff)

sol.position.x = -15
sol.position.y =0
sol.position.z =-60
sol.intensity = 2
sol.castShadow = true
scene.add(sol)

var  textureFlare0 =new  THREE.TextureLoader().load('./imagenes/lensflare0.png'),
			textureFlare3 =new  THREE.TextureLoader().load('./imagenes/lensflare3.png'),
		    flareColor = new THREE.Color(0xffaacc),
			 flare = new THREE.LensFlare(textureFlare0,500,0.0,THREE.AdditiveBlending,flareColor)
			 /*
			  flare.add(textureFlare3, 60, 0.6, THREE.AdditiveBlending);
      flare.add(textureFlare3, 70, 0.7, THREE.AdditiveBlending);
        flare.add(textureFlare3, 120, 0.9, THREE.AdditiveBlending);
       flare.add(textureFlare3, 70, 1.0, THREE.AdditiveBlending);
*/
flare.position.copy(sol.position)
scene.add(flare)

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
camera.position.y = 0
camera.position.z = 50
camera.lookAt(scene.position)

var controls = new function () {
            this.x = 0;
            this.y =0;
           
                    };

        var gui = new dat.GUI();
        gui.add(controls, 'y',-60,60)
			gui.add(controls, 'x',-60,60)
      

document.getElementById('WebGL-output').appendChild(renderer.domElement)
renderScene()


function renderScene() {
if (tiempo>2) {tiempo =0} else {tiempo+=0.01}
scene.rotation.y = tiempo*Math.PI
sol.position.x = controls.x
sol.position.y = controls.y
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








