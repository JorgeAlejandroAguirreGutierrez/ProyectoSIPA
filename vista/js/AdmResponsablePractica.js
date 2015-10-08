$(function () {
    $('#aPracticas').on('click', aPracticas);
    $('#aRepo').on('click', aRepo); 
  
    function aPracticas(){
        $("#contenido").html('');
        $("#contenido").load("vista/html/AdmResponsablePracticaCRUDpractica.html");
        organizarcontenido();
    }
    
    function aRepo(){
        $("#contenido").html('');
        $("#contenido").load("vista/html/AdmResponsablePracticaCRUDrepo.html");
        organizarcontenido();
    }
});
