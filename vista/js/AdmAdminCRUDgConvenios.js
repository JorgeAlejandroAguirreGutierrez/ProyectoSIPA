$(function () {

    var idempresa, datosempresa, jqGridEmpresaExterna;

    tablaEmpresaExterna();

    function tablaEmpresaExterna()
    {
        jqGridEmpresaExterna = jQuery("#empresaexterna1").jqGrid({
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
            width:700,
            sortname:'codigo',
            pager: "#empresaexterna2",
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
        }).jqGrid('navGrid', '#empresaexterna2', {
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