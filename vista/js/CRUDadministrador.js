$(function () {

    var idempresa, datosempresa, jqGridEmpresaExterna;
    var idconvenio, datosconvenio, jqGridConvenio;
    var idpracticai, datospracticai, jqGridPracticai;
    var idpracticae, datospracticae, jqGridPracticae;
    var idprograma, datosprograma, jqGridPrograma;
    var iddepartamento, datosdepartamento, jqgriddepartamento;
    var iddependencia, datosdependencia, jqgriddependencia;
    var idusuario, datosusuario, jqgridusuario;
    var idrol, datosrol, jqgridrol;
    var idrepositorio, datosrepositorio, jqgridrepositorio;

    var idpractica, datospractica, jqgridpractica;
    var rol = 0;


    $('#clickconvenio').on('click', tablaConvenio);
    $('#clickcpracticai').on('click', tablaPracticai);
    $('#clickcpracticae').on('click', tablaPracticae);
    $('#clickcprograma').on('click', tablaprograma);
    $('#clickdepartamento').on('click', tablaDepartamento);
    $('#clickcdependencia').on('click', tablaDependencia);
    $('#clickempresa').on('click', tablaEmpresaExterna);
    $('#clickcrol').on('click', tablaRol);
    $('#clickrepositorio').on('click', tablaRepositorio);
    $('#clickpractica').on('click', tablaPractica);

    //para cambiar el numero del rol y llamas el metodo que llena el jqgrig
    $('#clickestudiante').on('click', cambiarRolEstudiante);
    $('#clickdocente').on('click', cambiarRolDocente);
    $('#clickresponsable').on('click', cambiarRolResponsable);
    $('#clickrepresentante').on('click', cambiarRolRepresentante);
    $('#clickadministrador').on('click', cambiarRolAdministrador);

    $('#clickreporte').on('click', seleccionarReporte);

    $('#clickcertificacion').on('click', crearCertificacion);

    function cambiarRolEstudiante()
    {
        rol = 1;
        tablaUsuarios();
    }

    function cambiarRolDocente()
    {
        rol = 2;
        tablaUsuarios();
    }

    function cambiarRolResponsable()
    {
        rol = 3;
        tablaUsuarios();
    }

    function cambiarRolRepresentante()
    {
        rol = 4;
        tablaUsuarios();
    }

    function cambiarRolAdministrador()
    {
        rol = 5;
        tablaUsuarios();
    }

    function seleccionarReporte()
    {
        limpiar("SELECCION EL REPORTE Y GENERE");

        var select = document.createElement("select");
        select.setAttribute("id", "seleccionar");

        var opcion1 = document.createElement("option");
        opcion1.setAttribute("value", "usuario");
        var texto1 = document.createTextNode("usuario");
        opcion1.appendChild(texto1);

        var opcion2 = document.createElement("option");
        opcion2.setAttribute("value", "convenio");
        var texto2 = document.createTextNode("Convenios");
        opcion2.appendChild(texto2);

        var opcion3 = document.createElement("option");
        opcion3.setAttribute("value", "practica");
        var texto3 = document.createTextNode("Practicas");
        opcion3.appendChild(texto3);

        var opcion4 = document.createElement("option");
        opcion4.setAttribute("value", "empresaexterna");
        var texto4 = document.createTextNode("Empresas Externas");
        opcion4.appendChild(texto4);
        
        var opcion5 = document.createElement("option");
        opcion5.setAttribute("value", "departamento");
        var texto5 = document.createTextNode("Departamentos");
        opcion5.appendChild(texto5);

        select.appendChild(opcion1);
        select.appendChild(opcion2);
        select.appendChild(opcion3);
        select.appendChild(opcion4);
        select.appendChild(opcion5);

        document.getElementById("tablapie1").appendChild(select);

        var boton1 = document.createElement("button");
        boton1.setAttribute("id", "clickgenerar");
        var texto6 = document.createTextNode("Generar reporte");
        boton1.appendChild(texto6);
        document.getElementById("tablapie1").appendChild(boton1);
        $('#clickgenerar').on('click', generarReporte);
    }

    function generarReporte()
    {
        var valor = document.getElementById("seleccionar").value;
        if (valor == "usuario")
        {
            $.post("controlador/fachada.php", {
                clase: 'UtilReportes',
                oper: 'generarReporteUsuario',
                archivo: 'usuario1.xlsx'
            }, function (data) {
                alert(data);
            }, 'json');
        }
        else if (valor == "convenio")
        {

            $.post("controlador/fachada.php", {
                clase: 'UtilReportes',
                oper: 'generarReporteConvenio',
                archivo: 'convenio1.xlsx'})
                    .done(function (data) {
                        alert(data);
                    }, 'json');
        }
        else if (valor == "practica")
        {
            $.post("controlador/fachada.php", {
                clase: 'UtilReportes',
                oper: 'generarReportePractica',
                archivo: 'practica1.xlsx'})
                    .done(function (data) {
                        alert(data);
                    }, 'json');
        }
        else if (valor == "departamento")
        {
            $.post("controlador/fachada.php", {
                clase: 'UtilReportes',
                oper: 'generarReporteDepartamento',
                archivo: 'departamento1.xlsx'})
                    .done(function (data) {
                        alert(data);
                    }, 'json');
        }
        else
        {
            $.post("controlador/fachada.php", {
                clase: 'UtilReportes',
                oper: 'generarReporteEmpresaExterna',
                archivo: 'empresaexterna1.xlsx'})
                    .done(function (data) {
                        alert(data);
                    }, 'json');
        }
    }

    function crearCertificacion()
    {

        $.post("controlador/fachada.php", {
            clase: 'Certificado',
            oper: 'generarPDF',
            uno: 1
        }, function (data) {
            alert(data);
        }, 'json');
    }

    function tablaPractica()
    {
        limpiar("CRUD PRACTICAS");

        jqgridpractica = jQuery("#tablacuerpo1").jqGrid({
            url: 'controlador/fachada.php',
            datatype: "json",
            mtype: 'POST',
            postData: {
                clase: 'PracticaCRUD',
                oper: 'select'
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
            caption: "Practicas",
            editurl: "controlador/fachada.php?clase=PracticaCRUD",
            loadError: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText);
            },
            onSelectRow: function (id) {
                idpractica = id;
                datospractica = $(this).getRowData(idpractica);   // Recuperar los datos de la fila seleccionada
                idpractica = '';
//                crearTablaCiudades()
//                crearTablaZonas()
            }
        }).jqGrid('navGrid', '#tablapie1', {
            refresh: true,
            edit: true,
            add: true,
            del: true,
            search: true
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

    function tablaConvenio()
    {
        limpiar("CRUD CONVENIOS");

        jqGridConvenio = jQuery("#tablacuerpo1").jqGrid({
            url: 'controlador/fachada.php',
            datatype: "json",
            mtype: 'POST',
            postData: {
                clase: 'ConvenioCRUD',
                oper: 'select'
            },
            colNames: ['CODIGO', 'TITULO', 'RAZON', 'FECHA INICIO', 'FECHA FIN', 'CODIGO EMPRESA EXTERNA'],
            colModel: [
                {name: 'codigo', index: 'codigo', width: 55, align: 'center', editable: true, editrules: {required: true, number: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'titulo', index: 'titulo', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'razon', index: 'razon', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
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
                {name: 'codigo_empesa_externa', index: 'codigo_empesa_externa', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }}
            ],
            width: 700,
            sortname: 'codigo',
            pager: "#tablapie1",
            viewrecords: true,
            caption: "Convenios",
            editurl: "controlador/fachada.php?clase=ConvenioCRUD",
            loadError: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText);
            },
            onSelectRow: function (id) {
                idconvenio = id;
                datosconvenio = $(this).getRowData(idconvenio);   // Recuperar los datos de la fila seleccionada
                idconvenio = '';
//                crearTablaCiudades()
//                crearTablaZonas()
            }
        }).jqGrid('navGrid', '#tablapie1', {
            refresh: true,
            edit: true,
            add: true,
            del: true,
            search: true
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

    function tablaPracticai()
    {
        limpiar("CRUD PRACTICAS INTERNAS");

        jqGridPracticai = jQuery("#tablacuerpo1").jqGrid({
            url: 'controlador/fachada.php',
            datatype: "json",
            mtype: 'POST',
            postData: {
                clase: 'PracticaInternaCRUD',
                oper: 'select'
            },
            colNames: ['CODIGO', 'CODIGO DEPENDENCIA', 'CODIGO PRACTICA'],
            colModel: [
                {name: 'codigo', index: 'codigo', width: 55, align: 'center', editable: true, editrules: {required: true, number: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'codigo_dependencia', index: 'codigo_dependencia', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'codigo_practica', index: 'codigo_practica', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }}
            ],
            width: 700,
            sortname: 'codigo',
            pager: "#tablapie1",
            viewrecords: true,
            caption: "Practicas Internas",
            editurl: "controlador/fachada.php?clase=PracticaInternaCRUD",
            loadError: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText);
            },
            onSelectRow: function (id) {
                idpracticai = id;
                datospracticai = $(this).getRowData(idpracticai);   // Recuperar los datos de la fila seleccionada
                idpracticai = '';
//                crearTablaCiudades()
//                crearTablaZonas()
            }
        }).jqGrid('navGrid', '#tablapie1', {
            refresh: true,
            edit: true,
            add: true,
            del: true,
            search: true
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

    function tablaPracticae()
    {
        limpiar("CRUD PRACTICAS EXTERNAS");

        jqGridPracticae = jQuery("#tablacuerpo1").jqGrid({
            url: 'controlador/fachada.php',
            datatype: "json",
            mtype: 'POST',
            postData: {
                clase: 'PracticaExterna',
                oper: 'select'
            },
            colNames: ['CODIGO', 'CODIGO DEPENDENCIA', 'CODIGO PRACTICA'],
            colModel: [
                {name: 'codigo', index: 'codigo', width: 55, align: 'center', editable: true, editrules: {required: true, number: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'codigo_convenio', index: 'codigo_convenio', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'codigo_practica', index: 'codigo_practica', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }}
            ],
            width: 700,
            sortname: 'codigo',
            pager: "#tablapie1",
            viewrecords: true,
            caption: "Practicas Externas",
            editurl: "controlador/fachada.php?clase=PracticaExterna",
            loadError: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText);
            },
            onSelectRow: function (id) {
                idpracticae = id;
                datospracticae = $(this).getRowData(idpracticae);   // Recuperar los datos de la fila seleccionada
                idpracticae = '';
//                crearTablaCiudades()
//                crearTablaZonas()
            }
        }).jqGrid('navGrid', '#tablapie1', {
            refresh: true,
            edit: true,
            add: true,
            del: true,
            search: true
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



    function tablaprograma()
    {
        limpiar("CRUD PROGRAMAS");

        jqGridPrograma = jQuery("#tablacuerpo1").jqGrid({
            url: 'controlador/fachada.php',
            datatype: "json",
            mtype: 'POST',
            postData: {
                clase: 'ProgramaCRUD',
                oper: 'select'
            },
            colNames: ['CODIGO', 'NOMBRE', 'CODIGO DEPARTAMENTO'],
            colModel: [
                {name: 'codigo', index: 'codigo', width: 60, align: 'center', editable: true, editrules: {required: true, number: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'nombre', index: 'nombre', width: 140, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'codigo_departamento', index: 'codigo_departamento', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
            ],
            width: 300,
            sortname: 'codigo',
            pager: "#tablapie1",
            viewrecords: true,
            caption: "Programas",
            editurl: "controlador/fachada.php?clase=ProgramaCRUD",
            loadError: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText);
            },
            onSelectRow: function (id) {
                idprograma = id;
                datosprograma = $(this).getRowData(idprograma);   // Recuperar los datos de la fila seleccionada
                idprograma = '';
//                crearTablaCiudades()
//                crearTablaZonas()
            }
        }).jqGrid('navGrid', '#tablapie1', {
            refresh: true,
            edit: true,
            add: true,
            del: true,
            search: true
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

    function tablaDepartamento()
    {
        limpiar("CRUD DEPARTAMENTO");

        jqgriddepartamento = jQuery("#tablacuerpo1").jqGrid({
            url: 'controlador/fachada.php',
            datatype: "json",
            mtype: 'POST',
            postData: {
                clase: 'DepartamentoCRUD',
                oper: 'select'
            },
            colNames: ['CODIGO', 'NOMBRE'],
            colModel: [
                {name: 'codigo', index: 'codigo', width: 60, align: 'center', editable: true, editrules: {required: true, number: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'nombre', index: 'nombre', width: 240, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
            ],
            width: 300,
            sortname: 'codigo',
            pager: "#tablapie1",
            viewrecords: true,
            caption: "Departamentos",
            editurl: "controlador/fachada.php?clase=DepartamentoCRUD",
            loadError: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText);
            },
            onSelectRow: function (id) {
                iddepartamento = id;
                datosdepartamento = $(this).getRowData(iddepartamento);   // Recuperar los datos de la fila seleccionada
                iddepartamento = '';
//                crearTablaCiudades()
//                crearTablaZonas()
            }
        }).jqGrid('navGrid', '#tablapie1', {
            refresh: true,
            edit: true,
            add: true,
            del: true,
            search: true
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

    function tablaDependencia()
    {
        limpiar("CRUD DEPENDENCIAS");

        jqgriddependencia = jQuery("#tablacuerpo1").jqGrid({
            url: 'controlador/fachada.php',
            datatype: "json",
            mtype: 'POST',
            postData: {
                clase: 'DependenciaCRUD',
                oper: 'select'
            },
            colNames: ['CODIGO', 'NOMBRE', 'CODIGO DEPARTAMENTO'],
            colModel: [
                {name: 'codigo', index: 'codigo', width: 60, align: 'center', editable: true, editrules: {required: true, number: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'nombre', index: 'nombre', width: 140, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'codigo_departamento', index: 'codigo_departamento', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
            ],
            width: 300,
            sortname: 'codigo',
            pager: "#tablapie1",
            viewrecords: true,
            caption: "Dependencias",
            editurl: "controlador/fachada.php?clase=DependenciaCRUD",
            loadError: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText);
            },
            onSelectRow: function (id) {
                iddependencia = id;
                datosdependencia = $(this).getRowData(iddependencia);   // Recuperar los datos de la fila seleccionada
                iddependencia = '';
//                crearTablaCiudades()
//                crearTablaZonas()
            }
        }).jqGrid('navGrid', '#tablapie1', {
            refresh: true,
            edit: true,
            add: true,
            del: true,
            search: true
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

    function tablaEmpresaExterna()
    {
        limpiar("CRUD EMPRESA EXTERNA");

        jqGridEmpresaExterna = jQuery("#tablacuerpo1").jqGrid({
            url: 'controlador/fachada.php',
            datatype: "json",
            mtype: 'POST',
            postData: {
                clase: 'EmpresaExternaCRUD',
                oper: 'select'
            },
            colNames: ['CODIGO', 'NOMBRE', 'NIT', 'TIPO', 'DIRECCION', 'TELEFONO', 'CODIGO REPRESENTANTE LEGAL'],
            colModel: [
                {name: 'codigo', index: 'codigo', width: 55, align: 'center', editable: true, editrules: {required: true, number: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'nombre', index: 'nombre', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'nit', index: 'nit', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'tipo', index: 'tipo', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'direccion', index: 'direccion', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'telefono', index: 'telefono', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'codigo_representante_legal_empresa', index: 'codigo_representante_legal_empresa', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
            ],
            width: 700,
            sortname: 'codigo',
            pager: "#tablapie1",
            viewrecords: true,
            caption: "Empresas Externas",
            editurl: "controlador/fachada.php?clase=EmpresaExternaCRUD",
            loadError: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText);
            },
            onSelectRow: function (id) {
                idempresa = id;
                datosempresa = $(this).getRowData(idempresa);   // Recuperar los datos de la fila seleccionada
                idempresa = '';
//                crearTablaCiudades()
//                crearTablaZonas()
            }
        }).jqGrid('navGrid', '#tablapie1', {
            refresh: true,
            edit: true,
            add: true,
            del: true,
            search: true
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

    function tablaUsuarios()
    {
        limpiar("CRUD USUARIOS");


        jqgridusuario = jQuery("#tablacuerpo1").jqGrid({
            url: 'controlador/fachada.php',
            datatype: "json",
            mtype: 'POST',
            postData: {
                clase: 'UsuarioCRUD',
                oper: 'selectUsuarios',
                rol: rol
            },
            colNames: ['CODIGO', 'NOMBRE USUARIO', 'CONTRASENA', 'NOMBRE', 'APELLIDO', 'CEDULA', 'DIRECCIO', 'TELEFONO', 'CORREO', 'CODIGO ROL'],
            colModel: [
                {name: 'codigo', index: 'codigo', width: 55, align: 'center', editable: true, editrules: {required: true, number: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'nombreusuario', index: 'nombreusuario', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'contrasena', index: 'contrasena', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'nombre', index: 'nombre', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'apellido', index: 'apellido', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'cedula', index: 'cedula', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'direccion', index: 'direccion', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'telefono', index: 'telefono', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'correo', index: 'correo', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'codigo_rol', index: 'codigo_rol', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }}
            ],
            width: 700,
            sortname: 'codigo',
            pager: "#tablapie1",
            viewrecords: true,
            caption: "Tabla",
            editurl: "controlador/fachada.php?clase=UsuarioCRUD",
            loadError: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText);
            },
            onSelectRow: function (id) {
                idusuario = id;
                datosusuario = $(this).getRowData(idusuario);   // Recuperar los datos de la fila seleccionada
                idusuario = '';
//                crearTablaCiudades()
//                crearTablaZonas()
            }
        }).jqGrid('navGrid', '#tablapie1', {
            refresh: true,
            edit: true,
            add: true,
            del: true,
            search: true
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

    function tablaRol()
    {
        limpiar("CRUD ROLES");

        jqgridrol = jQuery("#tablacuerpo1").jqGrid({
            url: 'controlador/fachada.php',
            datatype: "json",
            mtype: 'POST',
            postData: {
                clase: 'RolCRUD',
                oper: 'select'
            },
            colNames: ['CODIGO', 'DESCRIPCION'],
            colModel: [
                {name: 'codigo', index: 'codigo', width: 55, align: 'center', editable: true, editrules: {required: true, number: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'tiporol', index: 'tiporol', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }}
            ],
            width: 700,
            sortname: 'codigo',
            pager: "#tablapie1",
            viewrecords: true,
            caption: "Roles",
            editurl: "controlador/fachada.php?clase=RolCRUD",
            loadError: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText);
            },
            onSelectRow: function (id) {
                idrol = id;
                datosrol = $(this).getRowData(idrol);   // Recuperar los datos de la fila seleccionada
                idrol = '';
//                crearTablaCiudades()
//                crearTablaZonas()
            }
        }).jqGrid('navGrid', '#tablapie1', {
            refresh: true,
            edit: true,
            add: true,
            del: true,
            search: true
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



    function tablaRepositorio()
    {
        limpiar("CRUD REPOSITORIO");

        jqgridrepositorio = jQuery("#tablacuerpo1").jqGrid({
            url: 'controlador/fachada.php',
            datatype: "json",
            mtype: 'POST',
            postData: {
                clase: 'RepositorioCRUD',
                oper: 'select'
            },
            colNames: ['CODIGO', 'TITULO', 'OBSERVACION', 'ARCHIVO', 'CODIGO PRACTICA'],
            colModel: [
                {name: 'codigo', index: 'codigo', width: 55, align: 'center', editable: true, editrules: {required: true, number: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'titulo', index: 'titulo', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'observacion', index: 'observacion', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'archivo', index: 'archivo', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }},
                {name: 'codigo_practica', index: 'codigo_practica', width: 100, editable: true, editrules: {required: true}, editoptions: {size: 37,
                        dataInit: function (elemento) {
                            $(elemento).width(282);
                        }
                    }}
            ],
            width: 700,
            sortname: 'codigo',
            pager: "#tablapie1",
            viewrecords: true,
            caption: "Repositorio de documentos",
            editurl: "controlador/fachada.php?clase=RepositorioCRUD",
            loadError: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText);
            },
            onSelectRow: function (id) {
                idrepositorio = id;
                datosrepositorio = $(this).getRowData(idrepositorio);   // Recuperar los datos de la fila seleccionada
                idrepositorio = '';
//                crearTablaCiudades()
//                crearTablaZonas()
            }
        }).jqGrid('navGrid', '#tablapie1', {
            refresh: true,
            edit: true,
            add: true,
            del: true,
            search: true
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
});