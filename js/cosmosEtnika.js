var cosmos = {
	
		scene: '',
		
		camera: '',
		
		renderer: '',
		
		orbitControls: '',
		
		clock: '',
		
		raycaster: '',
		
		tsat: '',
		
		mouse: '',
		
		punterox:'',
		
		punteroy:'',
		
		clickPos: '',
	
		init: function () {

		window.addEventListener('click',cosmos.onMouseClick, false)

		window.addEventListener('mousemove', cosmos.onMouseMove, false)
		
		cosmos.tsat = 0

		cosmos.mouse = new THREE.Vector2()

		cosmos.clickPos = new THREE.Vector2()

		cosmos.scene = new THREE.Scene()

		cosmos.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 10, 1000)

		cosmos.renderer = new THREE.WebGLRenderer({
				antialias: true,
				alpha: true
			})

			
		cosmos.renderer.setClearColor(0x000000)

		cosmos.renderer.setSize(window.innerWidth, window.innerHeight)

		cosmos.renderer.shadowMapEnabled = true

		// POSICIONA LA CAMARA

		cosmos.camera.position.x = 20

		cosmos.camera.position.y = 30

		cosmos.camera.position.z = 50

		cosmos.camera.lookAt(cosmos.scene.position)

		//AGREGA CONTROL ORBITAL

		cosmos.orbitControls = new THREE.OrbitControls(cosmos.camera)

		cosmos.orbitControls.autoRotate = true

		cosmos.orbitControls.autoRotateSpeed = 0.1

		cosmos.orbitControls.userZoom = false

		cosmos.clock = new THREE.Clock();

		cosmos.creaCosmos()

		// AGREGA RAYCASTING PARA DETECTAR ELEMENTOS DENTRO DE LA ESCENA

		cosmos.raycaster = new THREE.Raycaster();
		
		cosmos.raycaster.far = 180

		document.getElementById('WebGL-output').appendChild(cosmos.renderer.domElement)
		
		cosmos.renderScene()

		}, // FIN INIT 

		renderScene: function () {

				var delta = cosmos.clock.getDelta()
				
				cosmos.orbitControls.update(delta);

				// update the picking ray with the camera and mouse position

				cosmos.raycaster.setFromCamera(cosmos.mouse, cosmos.camera);

				var intersects = cosmos.raycaster.intersectObjects(cosmos.scene.children)

				cosmos.detectaObjetos(intersects)

				requestAnimationFrame(cosmos.renderScene)
					
				cosmos.orbitControls.userZoom = false

				cosmos.renderer.render(cosmos.scene, cosmos.camera)
					
				cosmos.rotaSatelite()
				
				if (controlPanel.busquedaListo) {
					cosmos.creaGaleriaEsferica(1)				
				}

			}, // FIN RENDERSCENE


		rotaSatelite: function () {

				var x, z, y

				y = 10 * Math.sin(cosmos.tsat * 2 * Math.PI)

				x = 20 * Math.sin(cosmos.tsat * 2 * Math.PI)

				z = 20 * Math.cos(cosmos.tsat * 2 * Math.PI)

				if (cosmos.tsat == 1) {

					cosmos.tsat = 0

				} else {

					cosmos.tsat += 0.001

				}

				cosmos.scene.children[6].position.x = x

				cosmos.scene.children[6].position.y = y

				cosmos.scene.children[6].position.z = z

				cosmos.scene.children[6].rotation.y = cosmos.tsat * 2 * Math.PI

				//scene.children[9].position.copy(scene.children[8].position)

				//scene.children[9].rotation.copy(scene.children[8].rotation)

			}, // FIN ROTA SATELITE


			
		creaGaleriaEsferica: function (linea) {
			
				controlPanel.busquedaListo = false

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

						plano.name = 'resultadoBusqueda'
												
						plano.userData = { imagen: controlPanel.imagenes[item],
																		  titulo: controlPanel.titulos[item],
																		  url: controlPanel.urls[item],
																		  snippet: controlPanel.snippets[item]
																		  }

						plano.castShadow = false

						h = (35 * i - 70) * Math.PI / 180

						plano.rotation.y = az

						plano.position.x = radio * Math.sin(az) * Math.cos(h)

						plano.position.y = radio * Math.sin(h)

						plano.position.z = radio * Math.cos(az) * Math.cos(h)
						
						cosmos.scene.add(plano)
						
						az += 2 * Math.PI / distribucion[i]

						item += 1

					} // FIN FOR

					az = Math.PI * i / distribucion.length

				} // FIN FOR

			}, // FIN CREA GALERIA ESFERICA

		creaCosmos: function () {

				// AGREGA SATELITE

				var sateliteLoader = new THREE.GLTFLoader()
				
				sateliteLoader.load('./modelos/gltf/Pioneer.gltf', function(object) {

						cosmos.scene.add(object.scene)

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

				cosmos.scene.add(sphere)


				//AMBIENTE 

				var ambiColor = "#ffffff"

				var ambientLight = new THREE.AmbientLight(ambiColor)

				ambientLight.intensity = 0.5

				cosmos.scene.add(ambientLight)

				// AGREGA SOL

				var LuzSol = new THREE.PointLight(0xffffff)

				LuzSol.position.x = -19

				LuzSol.position.y = 0

				LuzSol.position.z = -60

				LuzSol.intensity = 2

				LuzSol.castShadow = true

				cosmos.scene.add(LuzSol)

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

				cosmos.scene.add(flare)

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

				cosmos.scene.add(sol)

				// AGREGA LUZ PARA EL LADO OSCURO

				var luzOscura = new THREE.SpotLight(0xffffff)
				
				luzOscura.name= 'luzoscura'

				luzOscura.position.x = 0

				luzOscura.position.y = 0

				luzOscura.position.z = 30

				luzOscura.intensity = 2

				luzOscura.castShadow = false

				cosmos.scene.add(luzOscura)

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
				
				cosmos.scene.background = textureCube
				
				console.log(cosmos.scene.children)

			}, // FIN CREA COSMOS

		onMouseClick: function (event) {

				cosmos.clickPos.x = (event.clientX / window.innerWidth) * 2 - 1

				cosmos.clickPos.y = -(event.clientY / window.innerHeight) * 2 + 1

				var clickRaytrace = new THREE.Raycaster()

				clickRaytrace.setFromCamera(cosmos.clickPos, cosmos.camera)
				
			//	clickRaytrace.far = 150

				var clickIntersects = clickRaytrace.intersectObjects(cosmos.scene.children)

				cosmos.detectaClickObjetos(clickIntersects)

			}, // FIN ON MOUSE CLICK

		onMouseMove: function (event) {

				cosmos.mouse.x = (event.clientX / window.innerWidth) * 2 - 1

				cosmos.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
				
				cosmos.punterox = event.clientX
				
				cosmos.punteroy = event.clientY

			}, // FIN ON MOUSE MOVE



		detectaObjetos: function (intersects) {
			
				

				if (intersects.length > 0) {
					
								
					if (intersects[0].object.name == 'resultadoBusqueda' && $('#descriptor').css('display')=='none') {
						
						//$('#descriptor').css('top',cosmos.punteroy)
						
						//$('#descriptor').css('left',cosmos.punterox)
						
						$('#titulo-card').text(intersects[0].object.userData.titulo)
						
						$('#imagen-card').attr('src',  intersects[0].object.userData.imagen)
						
						$('#snippet').text(intersects[0].object.userData.snippet)
						
						$('#descriptor').show()

					}  // FIN IF 
				} // FIN IF 
				else {
				$('#descriptor').hide()
				}

			}, // FIN DETECTA OBJETOS

		detectaClickObjetos: function (clickIntersects) {
				
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
				
	
} // FIN COSMOS












