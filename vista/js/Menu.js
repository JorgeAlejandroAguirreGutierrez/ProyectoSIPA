$(function () {
    $('#convenios').on('click', convenios);
    $('#practicas').on('click', practicas);
    $('#usuarios').on('click', usuarios);
    $('#respositorios').on('click', repositorios);
    $('#reportes').on('click', reportes);
 
    function convenios(){
        $("#contenido").html('');
        $("#contenido").load("vista/html/CRUDconvenios.html");
        organizarcontenido();
    }
    
    function practicas(){
        $("#contenido").html('');
        $("#contenido").load("vista/html/CRUDpracticas.html");
        organizarcontenido();
    }
    
    function usuarios(){
        $("#contenido").html('');
        $("#contenido").load("vista/html/CRUDusuarios.html");
        organizarcontenido();
    }
    
    function repositorios(){
        $("#contenido").html('');
        $("#contenido").load("vista/html/CRUDrepositorios.html");
        organizarcontenido();
    }
    
    function reportes(){
        $("#contenido").html('');
        $("#contenido").load("vista/html/Reportes.html");
        organizarcontenido();
    }
});
