$(function () {
    $('#gConvenios').on('click', gConvenios);
    $('#aPracticas').on('click', aPracticas);
    $('#aRepo').on('click', aRepo); 
 
    function gConvenios(){
        $("#contenido").html('');
        $("#contenido").load("vista/html/AdmDocenteCoordinadorCRUDgConvenios");
        organizarcontenido();
    }
    
    function aPracticas(){
        $("#contenido").html('');
        $("#contenido").load("vista/html/AdmDocenteCoordinadorCRUDpractica.html");
        organizarcontenido();
    }
    
    
    function aRepo(){
        $("#contenido").html('');
        $("#contenido").load("vista/html/AdmDocenteCoordinadorCRUDrepo.html");
        organizarcontenido();
    }
    
});
