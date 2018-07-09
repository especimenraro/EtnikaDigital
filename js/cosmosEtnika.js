var googleBusqueda = {
	init: function () {
																					
													var cx = '010103968636640793823:guwxrblpljo';
												    var gcse = document.createElement('script');
												    gcse.type = 'text/javascript';
												    gcse.async = true;
												    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx ;
												    var s = document.getElementsByTagName('script')[0];
												    s.parentNode.insertBefore(gcse, s);
												    controlPanel.init()
	
	}
}


var myCallback = function() {
  if (document.readyState == 'complete') {
    // Document is ready when CSE element is initialized.
    // Render an element with both search box and search results in div with id 'test'.
    google.search.cse.element.render(
        {
          div: "respuesta",
          tag: 'searchresults-only',
          gname: 'resultados'
         });
         $('#botonBuscar').show()
         console.log('Llego la respuesta desde document.ready')
  } else {
    
    google.setOnLoadCallback(function() {
       // Render an element with both search box and search results in div with id 'test'.
        console.log('Llego la respuesta desde setOnLoad')
        google.search.cse.element.render({
             div: "respuesta",
          tag: 'searchresults-only',
          gname: 'resultados'
            });
             $('#botonBuscar').show()
  })
};
}


$(function() {

		
		window.__gcse = {
																parsetags: 'explicit',
															  callback: myCallback
														};
		googleBusqueda.init()
		cosmos.init()

	}) // FIN DOCUMENT.READY
	

var cosmos = {
	
		init: function () {

		window.addEventListener('click', onMouseClick, false)

		window.addEventListener('mousemove', onMouseMove, false)
		
		var introTime = false
		
		var introTimeDone = false
		
		var ocultarIntroTimeDone = false

		var tsat = 0

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

		var mediaCultura = [{
			url: 'https://player.vimeo.com/video/213932596',
			titulo: 'Guitarras y Voces en Trance: Cantores de Aculeo (Documental completo)',
			autor: 'Guión y Dirección: Raúl Domenech.<br> Producción: Fabiola Videla',
			descripcion: 'En Chile, comuna de Paine, específicamente en la localidad de Aculeo, se conservan tradiciones evangelizadoras que datan desde la época colonial. En estas tierras, se fusionan lo pagano con lo sagrado, por medio de relatos que trascienden en el canto a lo humano y lo divino.'
		}, {
			url: 'https://player.vimeo.com/video/155620151',
			titulo: '<h3>Nütram Lafken Mapu (Trailer)</h3>',
			autor: 'Realización Audiovisual:RaúlDomenech.<br>Producción: Fernando Vasquez.<br> Registro Sonoro: Victor Moris.<br> Asistente Producción: Fabiola Videla',
			descripcion: '<h5>Extracto del cortometraje documental Nütram Lafken Mapu.	El Nütram es el arte de la conversación en la que una persona mayor habla de su vida, de su cultura, de la historia de su pueblo; es una conversación siempre poética, no sólo porque es profunda, sino porque apela también a la memoria. Somos presente porque somos pasado y sólo por ello somos futuro, dice Elicura Chihuailaf - 	Por medio de la música, la poesía y la historia oral, el peñi Vicente Huenupil Huenchuman, nos expresa parte de la tradición del Lafkenmapu en el sector de Cerro Negro, Tirua, Región del Bio-Bio.</h5>'
		}, {
			url: 'https://player.vimeo.com/video/126440099',
			titulo: 'A la mano de Dios (Patrimonio Urbano)',
			autor: 'Realización: Raúl Domenech y Marcia Egert',
			descripcion: 'La indiferencia del ciudadano en Santiago de Chile, sumada a la despreocupación de la institucionalidad encargada de proteger y/o restaurar el patrimonio arquitectónico, ha permitido que las edificaciones de valor patrimonial del casco histórico de Santiago se hayan deteriorado en forma progresiva. Este proyecto centra la mirada en dos iglesias católicas que podemos considerar claves en términos patrimoniales, más allá de su significado religioso, siendo evidente su importancia histórica, singularidad arquitectónica y relevancia en términos de hito urbano.'
		}, {
			url: 'https://player.vimeo.com/video/123357961',
			titulo: 'Fiesta de los Faroles (Santiago de Chile 2015)',
			autor: 'Realización: Raúl Domenech',
			descripcion: 'Cierre de las celebraciones del Año Nuevo Chino a traves de un espectáculo con danzas, tambores e instrumentos Chinos en conmemoración a la fiesta de los faroles.'
		}, {
			url: 'https://player.vimeo.com/video/141494308',
			titulo: 'Guitarra y Voces en Trance (Trailer)',
			autor: 'Guión y Dirección: Raúl Domenech,<br> Producción: Fabiola Videla',
			descripcion: 'En Chile, comuna de Paine, específicamente en la localidad de Aculeo, se conservan tradiciones evangelizadoras que datan desde la época colonial. En estas tierras, se fusionan lo pagano con lo sagrado, por medio de relatos que trascienden en el canto a lo humano y lo divino.'
		}, {
			url: 'https://player.vimeo.com/video/63860663',
			titulo: 'Aguila Sur hace memoria para contar su historia',
			autor: 'Realización: Raúl Domenech y Frank Suarez',
			descripcion: 'Trabajo de rescate patrimonial, que da cuenta del testimonio histórico de los habitantes de la localidad de Águila Sur.'
		}, {
			url: 'https://player.vimeo.com/video/62705702',
			titulo: 'Patrimonio de lo sagrado y popular en las fiestas religiosas de Paine: “La Virgen del cerro”',
			autor: 'Realización: Raúl Domenech y Frank Suarez',
			descripcion: 'Emplazada a 1.700 mts de altura en la cordillera de Angostura de Paine, se encuentra "La Virgen del Cerro", imagen religiosa que convoca todos los años el peregrinaje de cientos de fieles hasta este lugar casi inaccesible. Trabajo realizado el año 2011 con el objetivo de registrar el patrimonio inmaterial de la zona, dando cuenta de los relatos de Fe por parte de arrieros, agricultores y vecinos de las localidades cercanas. La procesión se efectúa todos los años el día 8 de Diciembre, que corresponde a la ascensión de la inmaculada Concepción.'
		}, {
			url: 'https://player.vimeo.com/video/62254263',
			titulo: 'HAY MANA',
			autor: 'Realización: Raúl Domenech y Wladimir Rupcich',
			descripcion: 'Producción documental acerca de los desafíos que plantea la sociedad moderna y la búsqueda por conservar la tradición y la cultura en la isla de Rapa Nui.'
		}, {
			url: 'https://player.vimeo.com/video/103714390',
			titulo: 'Microdocumental: Ex menores Detenidos y Torturados durante la Dictadura Militar en Chile',
			autor: 'Realización: Raúl Domenech ',
			descripcion: 'Se estima que durante la dictadura militar en Chile (1973 - 1990), hubo al menos 6190 menores de edad víctimas de prisión política y tortura, de los que 2036 eran niños y niñas. De estos últimos 57 son detenidos desaparecidos y 91 fueron detenidos junto a sus padres.'
		}]

		var intro = [
			
									{
										texto1: 'La Tierra es un planeta que sostiene una inmensa plataforma ecológica que concentra una diversidad de especies como los Seres Humanos, quienes se agrupan en poblaciones que interactúan en diferentes lenguajes y tradiciones.',
										texto2:'La cultura al igual que la tierra, sostiene la diversidad humana.',
										texto3:'Y con ella se enfrenta y se adapta a sus propios procesos de modernización.'			
									} 	,
					
									{
										texto1: 'El Sol es una estrella de la Vía Láctea, que ilumina sectores de la tierra y despierta la actividad de las especies.',
										texto2:'Como la educación activa nuestra curiosidad por seguir explorando.',
										texto3:'Gracias a la luz y el calor del conocimiento.'			
									} 	,
			 		
									{
										texto1: 'El Satélite orbita entre planetas y estrellas, observando el cosmos...',
										texto2:'Como una extensión de nuestros imaginarios, por alcanzar el espacio exterior.',
										texto3:'Al igual que las tecnologías digitales, las que extienden nuestro sistema nervioso por alcanzar los espacios virtuales.'			
									}	,
			
									{
										texto1: 'Los cometas transitan por el sistema solar, dejando sus destellos de hielo y polvo cósmico',
										texto2:'plasmando su huella en el telar nocturno del cielo',
										texto3:'como una obra de arte que despierta la imaginación y creatividad del observador.'			
									}		
		]
		
		var mouse = new THREE.Vector2()

		var clickPos = new THREE.Vector2()

		var scene = new THREE.Scene(),

			camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 10, 1000),

			renderer = new THREE.WebGLRenderer({
				antialias: true,
				alpha: true
			})

			
		renderer.setClearColor(0x000000)

		renderer.setSize(window.innerWidth, window.innerHeight)

		renderer.shadowMapEnabled = true

		// POSICIONA LA CAMARA

		camera.position.x = 20

		camera.position.y = 30

		camera.position.z = 50

		camera.lookAt(scene.position)

		//AGREGA CONTROL ORBITAL

		var orbitControls = new THREE.OrbitControls(camera)

		orbitControls.autoRotate = true

		orbitControls.autoRotateSpeed = 0.1

		orbitControls.userZoom = false

		var clock = new THREE.Clock();

		creaCosmos()

		// AGREGA RAYCASTING PARA DETECTAR ELEMENTOS DENTRO DE LA ESCENA

		var raycaster = new THREE.Raycaster();
		
		raycaster.far = 180

		document.getElementById('WebGL-output').appendChild(renderer.domElement)
		
		renderScene()


		function renderScene() {

				var delta = clock.getDelta()
				
				orbitControls.update(delta);

				// update the picking ray with the camera and mouse position

				raycaster.setFromCamera(mouse, camera);

				var intersects = raycaster.intersectObjects(scene.children)

				detectaObjetos(intersects)

				requestAnimationFrame(renderScene)
					
					orbitControls.userZoom = false

					renderer.render(scene, camera)
					
					rotaSatelite()

			} // FIN RENDERSCENE


		function rotaSatelite() {

				var x, z, y

				y = 10 * Math.sin(tsat * 2 * Math.PI)

				x = 20 * Math.sin(tsat * 2 * Math.PI)

				z = 20 * Math.cos(tsat * 2 * Math.PI)

				if (tsat == 1) {

					tsat = 0

				} else {

					tsat += 0.001

				}

				scene.children[6].position.x = x

				scene.children[6].position.y = y

				scene.children[6].position.z = z

				scene.children[6].rotation.y = tsat * 2 * Math.PI

				//scene.children[9].position.copy(scene.children[8].position)

				//scene.children[9].rotation.copy(scene.children[8].rotation)

			} // FIN ROTA SATELITE


			
		function creaGaleriaEsferica(linea) {

				var distribucion = [1, 2, 4, 2, 1]

				var h, az, radio, item

				az = 0

				radio = 22

				item = 0

				for (i = 0; i < distribucion.length; i++) {

					for (j = 0; j < distribucion[i]; j++) {

						var PlanoGeometry = new THREE.PlaneGeometry(8, 6, 10, 10)

						var urlImagen = controlPanel.imagenes[item]

						var textureEarth = new THREE.TextureLoader().load(urlImagen)

						var PlanoMaterial = new THREE.MeshLambertMaterial({
							map: textureEarth
						})

						PlanoMaterial.side = THREE.DoubleSide

						var plano = new THREE.Mesh(PlanoGeometry, PlanoMaterial)

						plano.name = 'cultura0' + item

						plano.castShadow = false

						h = (35 * i - 70) * Math.PI / 180

						plano.rotation.y = az

						plano.position.x = radio * Math.sin(az) * Math.cos(h)

						plano.position.y = radio * Math.sin(h)

						plano.position.z = radio * Math.cos(az) * Math.cos(h)
						
						scene.add(plano)
						
						az += 2 * Math.PI / distribucion[i]

						item += 1

					} // FIN FOR

					az = Math.PI * i / distribucion.length

				} // FIN FOR

			} // FIN CREA GALERIA ESFERICA

		function creaCosmos() {

				// AGREGA SATELITE

				var sateliteLoader = new THREE.GLTFLoader()
				
				sateliteLoader.load('./modelos/gltf/Pioneer.gltf', function(object) {

						scene.add(object.scene)

						sateliteDone = true

						var sateliteGeometry = new THREE.OctahedronGeometry(2, 0),

							sateliteTexture = new THREE.TextureLoader().load('./modelos/texture/foil_gold_ramp.png'),

							sateliteMaterial = new THREE.MeshLambertMaterial({
								color: 0x686e68
							})

						var satelite = new THREE.Mesh(sateliteGeometry, sateliteMaterial)
						
						satelite.name = 'satelite'
						
						satelite.material.transparent = false
						
						satelite.material.opacity = 0.0

						satelite.rotation.x = Math.PI / 2

						satelite.castShadow = true

						satelite.receiveShadow = true

						satelite.position.copy(object.scene.position)

						//scene.add(satelite)

					}) // FIN LOADER

				// AGREGA COMETA

				

				//AGREGA ESFERA TIERRA

				var sphereGeometry = new THREE.SphereGeometry(9, 40, 40),

					textureEarth = new THREE.TextureLoader().load('./imagenes/tierra.jpg'),

					sphereMaterial = new THREE.MeshLambertMaterial(
					
					{		map: textureEarth	}
					)

				var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

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

				var LuzSol = new THREE.PointLight(0xffffff)

				LuzSol.position.x = -19

				LuzSol.position.y = 0

				LuzSol.position.z = -60

				LuzSol.intensity = 2

				LuzSol.castShadow = true

				scene.add(LuzSol)

				var textureFlare0 = new THREE.TextureLoader().load('./imagenes/lensflare0.png'),

					textureFlare1 = new THREE.TextureLoader().load('./imagenes/lensflare1.png'),

					textureFlare2 = new THREE.TextureLoader().load('./imagenes/lensflare2.png'),

					textureFlare3 = new THREE.TextureLoader().load('./imagenes/lensflare3.png'),

					flareColor = new THREE.Color(0xffaacc),

					flare = new THREE.LensFlare(textureFlare0, 700, 0.0, THREE.AdditiveBlending, flareColor)

				flare.add(textureFlare3, 70, 0.25, THREE.AdditiveBlending)

				flare.add(textureFlare2, 100, 0.35, THREE.AdditiveBlending)

				flare.position.copy(LuzSol.position)
				
				flare.name = 'flareSol'

				scene.add(flare)

				var solGeometry = new THREE.SphereGeometry(0.7, 40, 40),
				
							textureSol = new THREE.TextureLoader().load('./imagenes/sol.jpg'),

					solMaterial = new THREE.MeshStandardMaterial({
						map: textureSol
					}),

					sol = new THREE.Mesh(solGeometry, solMaterial)

				sol.name = 'sol'

				sol.material.transparent = true

				sol.material.opacity = 1
				
				//sol.material.emissive = new THREE.Color(0xffff00)
				
				sol.material.emissiveMap = textureSol
				
				sol.material.emissiveIntensity = 10

				sol.position.x = -19

				sol.position.y = -1

				sol.position.z = -60

				scene.add(sol)

				// AGREGA LUZ PARA EL LADO OSCURO

				var luzOscura = new THREE.SpotLight(0xffffff)
				
				luzOscura.name= 'luzoscura'

				luzOscura.position.x = 0

				luzOscura.position.y = 0

				luzOscura.position.z = 30

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

				var textureCube = loader.load(urls)

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

				var skybox = new THREE.Mesh(new THREE.BoxGeometry(300, 300, 300), materialEspacio)
				
				skybox.name = 'fondo'

				skybox.rotation.z = Math.PI / 2

				//scene.add(skybox)
				
				scene.background = textureCube
				
				console.log(scene.children)

			} // FIN CREA COSMOS

		function onMouseClick(event) {

				clickPos.x = (event.clientX / window.innerWidth) * 2 - 1

				clickPos.y = -(event.clientY / window.innerHeight) * 2 + 1

				var clickRaytrace = new THREE.Raycaster()

				clickRaytrace.setFromCamera(clickPos, camera)
				
			//	clickRaytrace.far = 150

				var clickIntersects = clickRaytrace.intersectObjects(scene.children)

				detectaClickObjetos(clickIntersects)

			} // FIN ON MOUSE CLICK

		function onMouseMove(event) {

				mouse.x = (event.clientX / window.innerWidth) * 2 - 1

				mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

			} // FIN ON MOUSE MOVE



		function detectaObjetos(intersects) {
			
				

				if (intersects.length > 0) {
					
								
					if (intersects[0].object.name == 'tierra') {

					} else {

					}

					if (intersects[0].object.name == 'sol') {

					} else {

					}

				} // FIN IF 

			} // FIN DETECTA OBJETOS

		function detectaClickObjetos(clickIntersects) {
				
				if (clickIntersects.length > 0) {
					
					

					if (clickIntersects[0].object.name == 'tierra') {

						$('#interfaz-tierra').show()

					}

					if (clickIntersects[0].object.name == 'satelite') {

						

					}

					if (clickIntersects[0].object.name == 'sol') {

						

					}
				}

			} // FIN DETECTA CLICK OBJETOS
			
			
						
	} //FIN INIT

} // FIN COSMOS












