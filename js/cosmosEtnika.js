$(function () {
	
init()

}) // FIN DOCUMENT.READY


function init() {
	
window.addEventListener('click',onMouseClick,false)

window.addEventListener('mousemove', onMouseMove,false)

var tsat=0

var sateliteDone = false

var tcomet = 0

var mediaCulturaSnap = [
	'./imagenes/vlcsnap00.png',
	'./imagenes/vlcsnap01.png',
	'./imagenes/vlcsnap02.png',
	'./imagenes/vlcsnap03.png',
	'./imagenes/vlcsnap04.png',
	'./imagenes/vlcsnap05.png',
	'./imagenes/vlcsnap06.png',
	'./imagenes/vlcsnap07.png',
	'./imagenes/vlcsnap08.png'
]

var mediaCultura = [
	{
		url: 'https://player.vimeo.com/video/213932596',
		titulo: 'Guitarras y Voces en Trance: Cantores de Aculeo (Documental completo)',
		autor: 'Guión y Dirección: Raúl Domenech.<br> Producción: Fabiola Videla',
		descripcion: 'En Chile, comuna de Paine, específicamente en la localidad de Aculeo, se conservan tradiciones evangelizadoras que datan desde la época colonial. En estas tierras, se fusionan lo pagano con lo sagrado, por medio de relatos que trascienden en el canto a lo humano y lo divino.'
	},
	{
		url: 'https://player.vimeo.com/video/155620151',
		titulo: '<h3>Nütram Lafken Mapu (Trailer)</h3>',
		autor: 'Realización Audiovisual:RaúlDomenech.<br>Producción: Fernando Vasquez.<br> Registro Sonoro: Victor Moris.<br> Asistente Producción: Fabiola Videla',
		descripcion:'<h5>Extracto del cortometraje documental Nütram Lafken Mapu.	El Nütram es el arte de la conversación en la que una persona mayor habla de su vida, de su cultura, de la historia de su pueblo; es una conversación siempre poética, no sólo porque es profunda, sino porque apela también a la memoria. Somos presente porque somos pasado y sólo por ello somos futuro, dice Elicura Chihuailaf - 	Por medio de la música, la poesía y la historia oral, el peñi Vicente Huenupil Huenchuman, nos expresa parte de la tradición del Lafkenmapu en el sector de Cerro Negro, Tirua, Región del Bio-Bio.</h5>'
	},
	{
		url:'https://player.vimeo.com/video/126440099',
		titulo:'A la mano de Dios (Patrimonio Urbano)',
		autor:'Realización: Raúl Domenech y Marcia Egert',
		descripcion:'La indiferencia del ciudadano en Santiago de Chile, sumada a la despreocupación de la institucionalidad encargada de proteger y/o restaurar el patrimonio arquitectónico, ha permitido que las edificaciones de valor patrimonial del casco histórico de Santiago se hayan deteriorado en forma progresiva. Este proyecto centra la mirada en dos iglesias católicas que podemos considerar claves en términos patrimoniales, más allá de su significado religioso, siendo evidente su importancia histórica, singularidad arquitectónica y relevancia en términos de hito urbano.'
	},
	{
		url: 'https://player.vimeo.com/video/123357961',
		titulo: 'Fiesta de los Faroles (Santiago de Chile 2015)',
		autor: 'Realización: Raúl Domenech',
		descripcion: 'Cierre de las celebraciones del Año Nuevo Chino a traves de un espectáculo con danzas, tambores e instrumentos Chinos en conmemoración a la fiesta de los faroles.'	
	},
	{
		url: 'https://player.vimeo.com/video/141494308',
		titulo: 'Guitarra y Voces en Trance (Trailer)',
		autor: 'Guión y Dirección: Raúl Domenech,<br> Producción: Fabiola Videla',
		descripcion: 'En Chile, comuna de Paine, específicamente en la localidad de Aculeo, se conservan tradiciones evangelizadoras que datan desde la época colonial. En estas tierras, se fusionan lo pagano con lo sagrado, por medio de relatos que trascienden en el canto a lo humano y lo divino.'
	},
	{
		url: 'https://player.vimeo.com/video/63860663',
		titulo: 'Aguila Sur hace memoria para contar su historia',
		autor: 'Realización: Raúl Domenech y Frank Suarez',
		descripcion: 'Trabajo de rescate patrimonial, que da cuenta del testimonio histórico de los habitantes de la localidad de Águila Sur.'
	},
	{
		url: 'https://player.vimeo.com/video/62705702',
		titulo: 'Patrimonio de lo sagrado y popular en las fiestas religiosas de Paine: “La Virgen del cerro”',
		autor: 'Realización: Raúl Domenech y Frank Suarez',
		descripcion: 'Emplazada a 1.700 mts de altura en la cordillera de Angostura de Paine, se encuentra "La Virgen del Cerro", imagen religiosa que convoca todos los años el peregrinaje de cientos de fieles hasta este lugar casi inaccesible. Trabajo realizado el año 2011 con el objetivo de registrar el patrimonio inmaterial de la zona, dando cuenta de los relatos de Fe por parte de arrieros, agricultores y vecinos de las localidades cercanas. La procesión se efectúa todos los años el día 8 de Diciembre, que corresponde a la ascensión de la inmaculada Concepción.'
	},
	{
		url:'https://player.vimeo.com/video/62254263',
		titulo:'HAY MANA',
		autor:'Realización: Raúl Domenech y Wladimir Rupcich',
		descripcion: 'Producción documental acerca de los desafíos que plantea la sociedad moderna y la búsqueda por conservar la tradición y la cultura en la isla de Rapa Nui.'
	},
	{
		url:'https://player.vimeo.com/video/103714390',
		titulo:'Microdocumental: Ex menores Detenidos y Torturados durante la Dictadura Militar en Chile',
		autor:'Realización: Raúl Domenech ',
		descripcion:'Se estima que durante la dictadura militar en Chile (1973 - 1990), hubo al menos 6190 menores de edad víctimas de prisión política y tortura, de los que 2036 eran niños y niñas. De estos últimos 57 son detenidos desaparecidos y 91 fueron detenidos junto a sus padres.'
	}
]

var mouse = new THREE.Vector2()

var clickPos = new THREE.Vector2()

var scene = new THREE.Scene(),
			sceneCultura = new THREE.Scene(),
			sceneEducacion = new THREE.Scene(),
			sceneTecnologia = new THREE.Scene(),
			camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,10,1000),
			renderer = new THREE.WebGLRenderer({antialias: true, alpha: true}),
			sceneCulturaVisible = false,
			sceneTecnologiaVisible = false,
			sceneEducacionVisible = false,
			sceneVisible = true
 //var stats = initStats()
	 
			 
renderer.setClearColor(0x000000)

renderer.setSize(window.innerWidth,window.innerHeight)

renderer.shadowMapEnabled = true

// POSICIONA LA CAMARA

camera.position.x = 20

camera.position.y = 30

camera.position.z = 50

camera.lookAt(scene.position)

//AGREGA CONTROL ORBITAL

 var orbitControls = new THREE.OrbitControls(camera)
 
 orbitControls.autoRotate = true
 
 orbitControls.autoRotateSpeed = 0.3
 
 orbitControls.userZoom = false
       
 var clock = new THREE.Clock();
      
creaCosmos()

creaCultura()

creaTecnologia()
        
// AGREGA RAYCASTING PARA DETECTAR ELEMENTOS DENTRO DE LA ESCENA

var raycaster = new THREE.Raycaster();

document.getElementById('WebGL-output').appendChild(renderer.domElement)

renderScene()


function renderScene() {
	
//stats.update()

var delta = clock.getDelta()

if (sateliteDone) { rotaSatelite() }

rotaCometa()

orbitControls.update(delta);

// update the picking ray with the camera and mouse position

raycaster.setFromCamera( mouse, camera );

var intersects = raycaster.intersectObjects( scene.children )

detectaObjetos(intersects)

requestAnimationFrame(renderScene)

if (sceneVisible) {
	
	orbitControls.userZoom = false
	
	renderer.render(scene,camera)
}

if (sceneCulturaVisible) {
	
	orbitControls.userZoom = true
	
	renderer.render(sceneCultura,camera)
	
}

if (sceneTecnologiaVisible) {
	
	orbitControls.userZoom = true;
	renderer.render(sceneTecnologia,camera)
	
}

} // FIN RENDERSCENE


function rotaSatelite() {
	
		var x,z,y
		
		y = 10*Math.sin(tsat*2*Math.PI)
		
		x = 20*Math.sin(tsat*2*Math.PI)
		
		z= 20*Math.cos(tsat*2*Math.PI)
		
		if (tsat==1) {
			
				tsat=0
				
				} 
				
		else {
			
			tsat +=0.001
			
			}
			
		scene.children[9].position.x = x
		
		scene.children[9].position.y = y
		
		scene.children[9].position.z = z
		
		scene.children[9].rotation.y =  tsat*2*Math.PI
		
		scene.children[10].position.copy(scene.children[9].position)
		
} // FIN ROTA SATELITE


function rotaCometa() {
	
			var x,z,y,e,a,b,r
			
			a=164
			
			b=143
			
			e= Math.sqrt(1-((b*b) /(a*a) ))
			
			r = (a*(1-e*e))/(1+e*Math.cos(2*tcomet*Math.PI))
			
			y = 10*Math.sin(tcomet*2*Math.PI)
			
			x = r*Math.sin(tcomet*2*Math.PI)
			
			z= r*Math.cos(tcomet*2*Math.PI)
			
			if (tcomet==1) {
				
			tcomet=0
			
			} 
			
			else {
				
				tcomet +=0.001
				
				}
			scene.children[0].position.x = x
			
			scene.children[0].position.y = 0
			
			scene.children[0].position.z = z
			
			scene.children[1].position.copy(scene.children[0].position)

} // FIN ROTA COMETA

function creaTecnologia() {
	
				// AGREGA SATELITE
			
			var sateliteLoader = new THREE.OBJLoader()
			
			sateliteLoader.load('./modelos/PioneerX.obj', function (object) {
				
				object.name='satelite'
				
				object.scale.x = 0.3
				
				object.scale.y = 0.3
				
				object.scale.z =0.3
				
				object.castShadow = true
				
				object.receiveShadow = true
				
				sceneTecnologia.add(object)
			
				sateliteDone = true
				
			})  // FIN LOADER
			
			
			//AMBIENTE 
			
			var ambiColor = "#ffffff"
			
			var ambientLight = new THREE.AmbientLight(ambiColor)
			
			ambientLight.intensity = 0.8
			
			sceneTecnologia.add(ambientLight)
			
			// AGREGA LUZ ZENITAL
			
			var LuzSol = new THREE.DirectionalLight(0xffffff)
			
			LuzSol.position.x = 0
			
			LuzSol.position.y =30
			
			LuzSol.position.z =0
			
			LuzSol.intensity = 1
			
			LuzSol.castShadow = true
			
			sceneTecnologia.add(LuzSol)
			
			// AGREGA LUZ PARA EL LADO OSCURO
			
			var luzOscura = new THREE.SpotLight(0xffffff)
			
			luzOscura.position.x = 0
			
			luzOscura.position.y =0
			
			luzOscura.position.z =30
			
			luzOscura.intensity = 2
			
			luzOscura.castShadow = false
			
			sceneTecnologia.add(luzOscura)
			
			creaGaleriaEsferica()

}  // FIN CREA TECNOLOGIA


function creaCultura() {
	
			//AGREGA ESFERA TIERRA
			
			var   sphereGeometry = new THREE.SphereGeometry(5,40,40),
			
						 textureEarth =new  THREE.TextureLoader().load('./imagenes/tierra.jpg'),
						 
						 sphereMaterial = new THREE.MeshLambertMaterial({map: textureEarth}),
						 
						 sphere = new THREE.Mesh(sphereGeometry,sphereMaterial)
						 
			sphere.name = 'tierraCultura'
			
			sphere.castShadow = false
			
			sphere.position.x = 0
			
			sphere.position.y = 0
			
			sphere.position.z = 0
			
			sphere.rotation.y = Math.PI
			
			sceneCultura.add(sphere)
			
			//AMBIENTE 
			
			var ambiColor = "#ffffff"
			
			var ambientLight = new THREE.AmbientLight(ambiColor)
			
			ambientLight.intensity = 0.8
			
			sceneCultura.add(ambientLight)
			
			// AGREGA LUZ LADO DIA
			
			var LuzSol = new THREE.DirectionalLight(0xffffff)
			
			LuzSol.position.x = -15
			
			LuzSol.position.y =0
			
			LuzSol.position.z =-60
			
			LuzSol.intensity = 2
			
			LuzSol.castShadow = true
			
			sceneCultura.add(LuzSol)
			
			// AGREGA LUZ PARA EL LADO OSCURO
			
			var luzOscura = new THREE.SpotLight(0xffffff)
			
			luzOscura.position.x = 0
			
			luzOscura.position.y =0
			
			luzOscura.position.z =30
			
			luzOscura.intensity = 2
			
			luzOscura.castShadow = false
			
			sceneCultura.add(luzOscura)
			
			creaGaleriaEsferica()

} // FIN CREA CULTURA

function creaGaleriaEsferica() {
	
			var distribucion = [1,2,3,2,1]
			
			var h,az, radio,item
			
			az=0
			
			radio = 22 
			
			item = 0
			
			for (i=0;i<distribucion.length;i++) {
				
				for (j=0;j<distribucion[i];j++) {
					
						var   PlanoGeometry = new THREE.PlaneGeometry(8,6,10,10)
						
						var urlImagen = mediaCulturaSnap[item]
						
						var textureEarth =new  THREE.TextureLoader().load(urlImagen)
						
						 var PlanoMaterial = new THREE.MeshLambertMaterial({map: textureEarth})
						 
						 PlanoMaterial.side = THREE.DoubleSide
						 
						var plano = new THREE.Mesh(PlanoGeometry,PlanoMaterial)
						
						plano.name = 'cultura0' + item
						
						plano.castShadow = false
						
						h = (35*i -70) * Math.PI/180
						
						plano.rotation.y = az 
						
						plano.position.x = radio * Math.sin(az)*Math.cos(h)
						
						plano.position.y = radio * Math.sin(h)
						
						plano.position.z = radio * Math.cos(az)*Math.cos(h)
						
						sceneCultura.add(plano)
						
						sceneTecnologia.add(plano)
						
						az += 2*Math.PI/distribucion[i] 
						
						item += 1
						
				}// FIN FOR
				
				az=Math.PI*i/distribucion.length
				
			} // FIN FOR

} // FIN CREA GALERIA ESFERICA

function creaCosmos() {
	
// AGREGA SATELITE

			var sateliteLoader = new THREE.OBJLoader()
			
			sateliteLoader.load('./modelos/PioneerX.obj', function (object) {
				
				object.scale.x = 0.1
				
				object.scale.y = 0.1
				
				object.scale.z =0.1
				
				object.position.x = 20
				
				object.rotation.y = Math.PI/2
				
				object.castShadow = true
				
				object.receiveShadow = true
				
				scene.add(object)
				
				sateliteDone = true
				
				var   sateliteGeometry = new THREE.OctahedronGeometry(1.5,1),
				
				sateliteMaterial = new THREE.MeshLambertMaterial({color: 0xffffff})
						 
				var	 satelite = new THREE.Mesh(sateliteGeometry,sateliteMaterial)
				
				satelite.name = 'satelite'
						 
				satelite.position.copy(object.position)
						 
				scene.add(satelite)
				
			}) // FIN LOADER
			
			// AGREGA COMETA
			
			var   cometaGeometry = new THREE.OctahedronGeometry(1,1),
			
						 cometaMaterial = new THREE.MeshLambertMaterial({color: 0xffffff})
						 
			var	 cometa = new THREE.Mesh(cometaGeometry,cometaMaterial)
			
						 cometa.name = 'cometa'
						 
						 cometa.position.x = -20
						 
						 scene.add(cometa)
			
			var  textureFlareCometa =new  THREE.TextureLoader().load('./imagenes/cometa.png'),
			
					    flareColorCometa = new THREE.Color(0xffffff),
					    
						 flareCometa = new THREE.LensFlare(textureFlareCometa,70,0.0,THREE.AdditiveBlending,flareColorCometa)
						 
			flareCometa.position.copy(cometa.position)
			
			scene.add(flareCometa)
			
			//AGREGA ESFERA TIERRA
			
			var   sphereGeometry = new THREE.SphereGeometry(9,40,40),
			
						 textureEarth =new  THREE.TextureLoader().load('./imagenes/tierra.jpg'),
						 
						 sphereMaterial = new THREE.MeshLambertMaterial({map: textureEarth})
						 
			var	 sphere = new THREE.Mesh(sphereGeometry,sphereMaterial)
			
			sphere.name = 'tierra'
			
			sphere.castShadow = false
			
			sphere.position.x = 0
			
			sphere.position.y = 0
			
			sphere.position.z = 0
			
			sphere.rotation.y = Math.PI
			
			scene.add(sphere)
			
			
			//AMBIENTE 
			
			var ambiColor = "#ffffff"
			
			var ambientLight = new THREE.AmbientLight(ambiColor)
			
			ambientLight.intensity = 0.5
			
			scene.add(ambientLight)
					
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
			
			flare.add(textureFlare3, 70, 0.25, THREE.AdditiveBlending)
			
			flare.add(textureFlare2, 100, 0.35, THREE.AdditiveBlending)
				
			flare.position.copy(LuzSol.position)
			
			scene.add(flare)
			
			var solGeometry = new THREE.SphereGeometry(0.7,40,40),
			
						solMaterial = new THREE.MeshStandardMaterial({color:0xffffff}),
						
						sol = new THREE.Mesh(solGeometry,solMaterial)
						
			sol.name = 'sol'
			
			sol.material.transparent = true
			
			sol.material.opacity = 0.1
			
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
			
			// AGREGA CUBEMAP CON LA GALAXIA
			
			var urls = [
					'right.png',
					'left.png',
					'top.png',
					'bottom.png',
					'front.png',
					'back.png'
				] 
				
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
			
			        })
			
			// create the skybox
			        
			var skybox = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), materialEspacio)
			        
			skybox.rotation.z = Math.PI/2
			        
			scene.add(skybox)
        
}  	// FIN CREA COSMOS

function onMouseClick(event) {
	
	clickPos.x = ( event.clientX / window.innerWidth ) * 2 - 1
	
	clickPos.y = - ( event.clientY / window.innerHeight ) * 2 + 1
	
	var clickRaytrace = new THREE.Raycaster()
	
	clickRaytrace.setFromCamera(clickPos, camera)
	
	if (sceneVisible) {
		
	var clickIntersects = clickRaytrace.intersectObjects( scene.children )
	
	}
	
	if (sceneCulturaVisible) {
		
	var clickIntersects = clickRaytrace.intersectObjects( sceneCultura.children )
	
	}
	
	if (sceneTecnologiaVisible) {
		
	var clickIntersects = clickRaytrace.intersectObjects( sceneTecnologia.children )
	
	}
	
	detectaClickObjetos(clickIntersects)
	
} // FIN ON MOUSE CLICK

function onMouseMove( event ) {

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1
	
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1
	
}// FIN ON MOUSE MOVE



function detectaObjetos(intersects) {
	
if (intersects.length>0 ){
	
	if (intersects[0].object.name == 'tierra') {
		
	} else {
		
	}
	
	if (intersects[0].object.name == 'sol') {
	
	} else {
	
	}
	
} // FIN IF 

} // FIN DETECTA OBJETOS

function detectaClickObjetos(clickIntersects) {
	
	if (clickIntersects.length>0) {
		
		if (clickIntersects[0].object.name == 'tierra') {
			
			sceneTecnologiaVisible = false
			
			sceneCulturaVisible = true
			
			sceneEducacionVisible = false
			
			sceneVisible = false
			
			orbitControls.autoRotate = true
			
			orbitControls.autoRotateSpeed = 2
			
		}
		
		if (clickIntersects[0].object.name == 'satelite') {
			
			sceneTecnologiaVisible = true
			
			sceneCulturaVisible = false
			
			sceneEducacionVisible = false
			
			sceneVisible = false
			
			orbitControls.autoRotate = true
			orbitControls.autoRotateSpeed = 2
			
		}
		
		if (clickIntersects[0].object.name == 'cometa') {
			
			sceneTecnologiaVisible = false
			
			sceneCulturaVisible = false
			
			sceneEducacionVisible = true
			
			sceneVisible = false
			
			orbitControls.autoRotate = true
			
			orbitControls.autoRotateSpeed = 2
			
		}
		if (clickIntersects[0].object.name == 'tierraCultura') {
			
			sceneCulturaVisible = false
			
			sceneVisible = true
			
			orbitControls.autoRotate = true
			
			orbitControls.autoRotateSpeed = 0.5
			
		}
		
		if (clickIntersects[0].object.name.substr(0,7) == 'cultura') {
			
			let longitudIndice = clickIntersects[0].object.name.length - 7
			
			let indice = Number(clickIntersects[0].object.name.substr(7,longitudIndice))
			
			let fuente = mediaCultura[indice].url
			
			let titulo = mediaCultura[indice].titulo
			
			let autor = mediaCultura[indice].autor
			
			let descripcion = mediaCultura[indice].descripcion
			
			$('.media').attr('src',fuente)
			
			$('#titulo-credito').html(titulo)
			
			$('#autor-credito').html(autor)
			
			$('#descripcion-credito').html(descripcion)
			
			$('.contenedor-media').show('fade',500,function () {
				
				$	('#titulo-credito').show('drop',2000,function () {
					
						$('#autor-credito').show('fade',1000,function () {
							
							$('#descripcion-credito').show('fade',1000)					
							
						})			
						
				})		
				
			}) // FIN SHOW CONTENDOR MEDIA
			
		}
		
	} // FIN IF
	
} // FIN DETECTA CLICK OBJETOS

} //FIN INIT








