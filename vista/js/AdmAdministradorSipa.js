$(function () {
    $('#gConvenios').on('click', gConvenios);
    $('#aPracticas').on('click', aPracticas);
    $('#aRoles').on('click', aRoles);
    $('#cerrar').on('click', cerrar);
 
    function gConvenios(){
        $("#contenido").html('');
        $("#contenido").load("vista/html/AdmAdminCRUDgConvenios.html");
        $("#banner").css("background",'transparent url("../../sipa/vista/images/fformulario.png") no-repeat fixed 0% 0% / cover')
    }
    
    function aPracticas(){
    
    }
    
    function aRoles(){
    
    }
    
    function cerrar(){
    
    }
    
});
