$(function () {
    $('#aPracticas').on('click', aPracticas);
    $('#aRepo').on('click', aRepo); 
  
    function aPracticas(){
        $("#contenido").html('');
        $("#contenido").load("vista/html/AdmEstudianteCRUDpractica.html");
        organizarcontenido();
    }
    
    function aRepo(){
        $("#contenido").html('');
        $("#contenido").load("vista/html/AdmEstudianteCRUDrepo.html");
        organizarcontenido();
    }
});
