$(function () {
    $('#gConvenios').on('click', gConvenios);
    $('#aPracticas').on('click', aPracticas);
    $('#aRoles').on('click', aRoles);
    $('#aRepo').on('click', aRepo); 
 
    function gConvenios(){
        $("#contenido").html('');
        $("#contenido").load("vista/html/AdmAdminCRUDgConvenios.html");
        organizarcontenido();
    }
    
    function aPracticas(){
        $("#contenido").html('');
        $("#contenido").load("vista/html/AdmAdminCRUDpractica.html");
        organizarcontenido();
    }
    
    function aRoles(){
        $("#contenido").html('');
        $("#contenido").load("vista/html/AdmAdminCRUDroles.html");
        organizarcontenido();
    }
    
    function aRepo(){
        $("#contenido").html('');
        $("#contenido").load("vista/html/AdmAdminCRUDrepo.html");
        organizarcontenido();
    }
    
});
