$(function () {
$('.contenedor-interfaz').css('height',window.innerHeight)
window.__gcse = {
																parsetags: 'explicit',
															  callback: myCallback
														};
		googleBusqueda.init()
		cosmos.init()
}) // FIN DOCUMENT.READY

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





