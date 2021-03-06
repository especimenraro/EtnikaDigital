var controlPanel = {
	filtro: [],
	url: '',
	respuesta: [],
	snippets:[],
	imagenes: [],
	titulos: [],
	urls: [],
	cantidadResultados: 0,
	busquedaListo: false,
	init: function () {
		
					$('#respuesta').hide()
					
					$('#x').click(function () {
						
						$('#interfaz-tierra').hide()
					
					})
					
					$('#botonBuscar').click(function () {
						controlPanel.limpia()
						
						$(this).css('color','white')
					})
					
					$('#botonBuscar').mousedown(function () {
						$(this).css('color','red')
					})
					
				
					// EVENTO CLICK PARA BOTÓN BASURA
					
				$('.basura').click(function () {
					var itemBorrar
					for (key in $('.ui-selected')) {
							controlPanel.borraItem($('.ui-selected')[key].innerHTML)			
					} // FIN FOR 
					$('.ui-selected').appendTo($('#origen'))
					$('.movible').draggable({
					containment: '.contenedor-contenido-tabs',
					snap: true,
					snapMode: 'inner',
					revert: 'invalid'
					
				})
									
				})
				
				// USO DRAGGABLE Y DROPPABLE PARA LA TAB LISTA
				
				$('.movible').draggable({
					containment: '.contenedor-contenido-tabs',
					snap: true,
					snapMode: 'inner',
					revert: 'invalid'
					
				})
				
				$('#receptor').droppable({
					acept: '.movible',
					drop: function (event,ui) {
						var categoria = ui.draggable[0].innerHTML 
						var template = '<div class="movible ui-widget-content">' + ui.draggable[0].innerHTML + '</div>'
						var child = ':contains(' + ui.draggable[0].innerHTML + ')'
						$('#receptor').append(template)
						$('#origen').find(child).remove()
						$('.basura').show()
						controlPanel.agregaItem(categoria)
					}
				})
				
				$('#receptor').selectable()
	
	}, // FIN INIT
	limpia: function () {
		controlPanel.snippets = []	
		controlPanel.titulos = []	
		controlPanel.imagenes = []	
		controlPanel.urls = []	
		controlPanel.busquedaListo = false
		controlPanel.creaBusqueda()
		controlPanel.buscar()
	}, // FIN LIMPIA
	agregaItem: function (nuevoItem) {
			controlPanel.filtro.push(nuevoItem)
	}, // FIN AGREGA ITEM
	
	borraItem: function (item) {
		
			var itemTmp = []
			for (key in controlPanel.filtro){
				if (controlPanel.filtro[key] != item) {
					itemTmp.push(controlPanel.filtro[key])				
				}			
			}
			controlPanel.filtro = itemTmp
	
	},//FIN BORRA ITEM
	
	creaBusqueda: function () {
	    
	    var filtroTmp = controlPanel.filtro
	    var busqueda = ''
	    var fechaStart, fechaEnd
	    for (key in filtroTmp) {
					 busqueda += filtroTmp[key] + ' '   	
	    	}
	    fechaStart = $('#fechaInicio').val()
	    fechaEnd = $('#fechaFin').val()
	    controlPanel.url=busqueda
	   
	}, // FIN CREAURL
	
	buscar: function () {
      google.search.cse.element.getElement('resultados').execute(controlPanel.url)
		setTimeout(function () {
			controlPanel.obtieneObjetos($('.gs-webResult'))
			 
		}, 2000)
	  
	}, // FIN BUSCAR
	obtieneObjetos(objetos) {
		if (objetos) {
			for (i=0;i<objetos.length-1 || i<10;i++) {
			controlPanel.titulos.push(objetos[i].childNodes[0].innerText)
			controlPanel.urls.push(objetos[i].childNodes[0].childNodes[0].children[0].href)	
			controlPanel.snippets.push(objetos[i].childNodes[2].childNodes[0].childNodes[0].childNodes[1].innerText)
			if (objetos[i].childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[0]) {
			controlPanel.imagenes.push(objetos[i].childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].src)	
			} else {
				controlPanel.imagenes.push('./imagenes/logo.png')
			}
			
		}
		controlPanel.busquedaListo = true
		} // FIN IF
		else {
		controlPanel.busquedaListo = false
		}
		
	} // FIN OBTIENE OBJETOS

} // FIN CONTROL PANEL


													


