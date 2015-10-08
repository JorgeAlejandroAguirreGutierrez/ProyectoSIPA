$(function () {
    $('#gConvenios').on('click', gConvenios);
    $('#aRepo').on('click', aRepo); 
 
    function gConvenios(){
        $("#contenido").html('');
        $("#contenido").load("vista/html/AdmRepresentanteLegalCRUDgConvenios.html");
        organizarcontenido();
    }
    
    function aRepo(){
        $("#contenido").html('');
        $("#contenido").load("vista/html/AdmRepresentanteLegalCRUDrepo.html");
        organizarcontenido();
    }
});
