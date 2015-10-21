$(function () {

    var iddepartamento, datosdepartamento, jqgriddepartamento;

    var idprograma, datosprograma, jqgridprograma;
    
    var iddependencia,datosdependencia,jqgriddependencia;

    tablaPrograma();
    tablaDepartamento();
    tablaDependencia();


    function tablaDepartamento()
    {
        jqgriddepartamento = jQuery("#departamento1").jqGrid({
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
            pager: "#departamento2",
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
        }).jqGrid('navGrid', '#departamento2', {
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

    function tablaPrograma()
    {
        jqgridprograma = jQuery("#programa1").jqGrid({
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
            pager: "#programa2",
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
        }).jqGrid('navGrid', '#programa2', {
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
        jqgridprograma = jQuery("#dependencia1").jqGrid({
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
            pager: "#dependencia2",
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
        }).jqGrid('navGrid', '#dependencia2', {
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