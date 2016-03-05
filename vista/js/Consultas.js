/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(function () {


    var idconsulta1, datosconsulta1, jqgridconsulta1;

    $('#clickconsulta').on('click', seleccionarConsulta);



    function seleccionarConsulta()
    {
        limpiar("SELECCION LA CONSULTA");

        var select = document.createElement("select");
        select.setAttribute("id", "seleccionar");

        var opcion1 = document.createElement("option");
        opcion1.setAttribute("value", "practicasd");
        var texto1 = document.createTextNode("Practica del docente");
        opcion1.appendChild(texto1);

//        var opcion2 = document.createElement("option");
//        opcion2.setAttribute("value", "convenio");
//        var texto2 = document.createTextNode("Convenios");
//        opcion2.appendChild(texto2);
//
//        var opcion3 = document.createElement("option");
//        opcion3.setAttribute("value", "practicai");
//        var texto3 = document.createTextNode("Practicas Internas");
//        opcion3.appendChild(texto3);
//
//        var opcion4 = document.createElement("option");
//        opcion3.setAttribute("value", "practicae");
//        var texto4 = document.createTextNode("Practicas Externas");
//        opcion4.appendChild(texto4);

        select.appendChild(opcion1);
//        select.appendChild(opcion2);
//        select.appendChild(opcion3);
//        select.appendChild(opcion4);

        document.getElementById("tablapie1").appendChild(select);

        var boton1 = document.createElement("button");
        boton1.setAttribute("id", "clickgenerar");
        var texto5 = document.createTextNode("Generar consulta");
        boton1.appendChild(texto5);
        document.getElementById("tablapie1").appendChild(boton1);
        $('#clickgenerar').on('click', generarConsulta);
    }

    function generarConsulta()
    {
        var valor = document.getElementById("seleccionar").value;
        if (valor == "practicasd")
        {
            limpiar("CRUD PRACTICAS DOCENTE");

            jqgridconsulta1 = jQuery("#tablacuerpo1").jqGrid({
                url: 'controlador/fachada.php',
                datatype: "json",
                mtype: 'POST',
                postData: {
                    clase: 'PracticaCRUD',
                    oper: 'selectConsulta1'
                },
                colNames: ['CODIGO', 'FECHA INICIO', 'FECHA FIN', 'SALARIO', 'ESTADO', 'OBSERVACION', 'CODIGO ESTUDIANTE', 'CODIGO DOCENTE COORDINADOR', 'CODIGO RESPONSABLE PRACTICA'],
                colModel: [
                    {name: 'codigo', index: 'codigo', width: 55, align: 'center', editable: true, editrules: {required: true, number: true}, editoptions: {size: 37,
                            dataInit: function (elemento) {
                                $(elemento).width(282);
                            }
                        }},
                    {name: 'fecha_inicio', index: 'fecha_inicio', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                            dataInit: function (elemento) {
                                $(elemento).width(282);
                            }
                        }},
                    {name: 'fecha_fin', index: 'fecha_fin', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                            dataInit: function (elemento) {
                                $(elemento).width(282);
                            }
                        }},
                    {name: 'salario', index: 'salario', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                            dataInit: function (elemento) {
                                $(elemento).width(282);
                            }
                        }},
                    {name: 'estado', index: 'estado', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                            dataInit: function (elemento) {
                                $(elemento).width(282);
                            }
                        }},
                    {name: 'observacion', index: 'observacion', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                            dataInit: function (elemento) {
                                $(elemento).width(282);
                            }
                        }},
                    {name: 'codigo_estudiante', index: 'codigo_estudiante', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                            dataInit: function (elemento) {
                                $(elemento).width(282);
                            }
                        }},
                    {name: 'codigo_docente_coordinador', index: 'codigo_docente_coordinador', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                            dataInit: function (elemento) {
                                $(elemento).width(282);
                            }
                        }},
                    {name: 'codigo_responsable_practica', index: 'codigo_responsable_practica', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                            dataInit: function (elemento) {
                                $(elemento).width(282);
                            }
                        }},
                ],
                width: 700,
                sortname: 'codigo',
                pager: "#tablapie1",
                viewrecords: true,
                caption: "Practicas Docente",
                editurl: "controlador/fachada.php?clase=PracticaCRUD",
                loadError: function (jqXHR, textStatus, errorThrown) {
                    alert(jqXHR.responseText);
                },
                onSelectRow: function (id) {
                    idconsulta1 = id;
                    datosconsulta1 = $(this).getRowData(idconsulta1);   // Recuperar los datos de la fila seleccionada
                    idconsulta1 = '';
//                crearTablaCiudades()
//                crearTablaZonas()
                }
            }).jqGrid('navGrid', '#tablapie1', {
                refresh: true,
                edit: false,
                add: false,
                del: false,
                search: false
            },
            {// Antes de enviar a Departamento->edit(...) se agrega un POST
                modal: true, jqModal: true,
                width: 700,
                beforeSubmit: function (postdata) {
//              acceder a los datos de la fila seleccionada:
//              var fila = $(this).getRowData($(this).getGridParam("selrow"));

//              agregar un parámetro a los datos enviados (ej. el ID introducido en el formulario de edición)
//                postdata.idNuevo = $('#id').val();
                    return[true, ''];
                },
                afterSubmit: function (response, postdata) {
                    var respuesta = jQuery.parseJSON(response.responseText);
                    return [respuesta.ok, respuesta.mensaje, ''];
                }
            },
            {// Antes de enviar a Departamento->add(...) se agrega un POST
                modal: true, jqModal: true,
                width: 700,
                afterSubmit: function (response, postdata) {
                    var respuesta = jQuery.parseJSON(response.responseText);
                    return [respuesta.ok, respuesta.mensaje, ''];
                }
            },
            {modal: true, jqModal: true,
                width: 700,
                afterSubmit: function (response, postdata) {
                    var respuesta = jQuery.parseJSON(response.responseText);
                    return [respuesta.ok, respuesta.mensaje, ''];
                }
            },
            {multipleSearch: true, multipleGroup: true}
            );
        }
    }

    function limpiar(texto)
    {
        $("#contenedor").empty();

        var h2 = document.createElement("h2");
        var texto = document.createTextNode(texto);
        h2.appendChild(texto);
        var hr = document.createElement("hr");
        var br1 = document.createElement("br");
        var br2 = document.createElement("br");

        var tablacuerpo1 = document.createElement("table");
        tablacuerpo1.setAttribute("id", "tablacuerpo1");
        var tablapie1 = document.createElement("div");
        tablapie1.setAttribute("id", "tablapie1");

        var contenedor = document.getElementById("contenedor");
        contenedor.appendChild(h2);
        contenedor.appendChild(hr);
        contenedor.appendChild(br1);
        contenedor.appendChild(br2);
        contenedor.appendChild(tablacuerpo1);
        contenedor.appendChild(tablapie1);
    }

});
