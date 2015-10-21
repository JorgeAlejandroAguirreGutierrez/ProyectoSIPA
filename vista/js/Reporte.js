/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function () {
    $('#reporteaceptar').on('click', reporte);
    function reporte()
    {
        var selreporte = $("#selreporte").val();
        if (selreporte == "ReportePracticas")
        {
            $.post("controlador/fachada.php", {
                clase: 'UtilReportes',
                oper: 'generarReportePractica',
                archivo: 'practicas.xlsx'
            }, function (data) {
                console.log(data);
            }, 'json');
        }
        else
        {
            $.post("controlador/fachada.php", {
                clase: 'UtilReportes',
                oper: 'generarReporteConvenio',
                archivo: 'convenios.xlsx'
            }, function (data) {
                console.log(data);
            }, 'json');
        }


        
    }

});

