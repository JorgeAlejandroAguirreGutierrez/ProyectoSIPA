$(function () {

    var idempresa, datosempresa, jqGridEmpresaExterna;
//    var mydata = [
//        {id: "1", invdate: "2010-05-24", name: "test", note: "note", tax: "10.00", total: "2111.00"},
//        {id: "2", invdate: "2010-05-25", name: "test2", note: "note2", tax: "20.00", total: "320.00"},
//        {id: "3", invdate: "2007-09-01", name: "test3", note: "note3", tax: "30.00", total: "430.00"},
//        {id: "4", invdate: "2007-10-04", name: "test", note: "note", tax: "10.00", total: "210.00"},
//        {id: "5", invdate: "2007-10-05", name: "test2", note: "note2", tax: "20.00", total: "320.00"},
//        {id: "6", invdate: "2007-09-06", name: "test3", note: "note3", tax: "30.00", total: "430.00"},
//        {id: "7", invdate: "2007-10-04", name: "test", note: "note", tax: "10.00", total: "210.00"},
//        {id: "8", invdate: "2007-10-03", name: "test2", note: "note2", amount: "300.00", tax: "21.00", total: "320.00"},
//        {id: "9", invdate: "2007-09-01", name: "test3", note: "note3", amount: "400.00", tax: "30.00", total: "430.00"},
//        {id: "11", invdate: "2007-10-01", name: "test", note: "note", amount: "200.00", tax: "10.00", total: "210.00"},
//        {id: "12", invdate: "2007-10-02", name: "test2", note: "note2", amount: "300.00", tax: "20.00", total: "320.00"},
//        {id: "13", invdate: "2007-09-01", name: "test3", note: "note3", amount: "400.00", tax: "30.00", total: "430.00"},
//        {id: "14", invdate: "2007-10-04", name: "test", note: "note", amount: "200.00", tax: "10.00", total: "210.00"},
//        {id: "15", invdate: "2007-10-05", name: "test2", note: "note2", amount: "300.00", tax: "20.00", total: "320.00"},
//        {id: "16", invdate: "2007-09-06", name: "test3", note: "note3", amount: "400.00", tax: "30.00", total: "430.00"},
//        {id: "17", invdate: "2007-10-04", name: "test", note: "note", amount: "200.00", tax: "10.00", total: "210.00"},
//        {id: "18", invdate: "2007-10-03", name: "test2", note: "note2", amount: "300.00", tax: "20.00", total: "320.00"},
//        {id: "19", invdate: "2007-09-01", name: "test3", note: "note3", amount: "400.00", tax: "30.00", total: "430.00"},
//        {id: "21", invdate: "2007-10-01", name: "test", note: "note", amount: "200.00", tax: "10.00", total: "210.00"},
//        {id: "22", invdate: "2007-10-02", name: "test2", note: "note2", amount: "300.00", tax: "20.00", total: "320.00"},
//        {id: "23", invdate: "2007-09-01", name: "test3", note: "note3", amount: "400.00", tax: "30.00", total: "430.00"},
//        {id: "24", invdate: "2007-10-04", name: "test", note: "note", amount: "200.00", tax: "10.00", total: "210.00"},
//        {id: "25", invdate: "2007-10-05", name: "test2", note: "note2", amount: "300.00", tax: "20.00", total: "320.00"},
//        {id: "26", invdate: "2007-09-06", name: "test3", note: "note3", amount: "400.00", tax: "30.00", total: "430.00"},
//        {id: "27", invdate: "2007-10-04", name: "test", note: "note", amount: "200.00", tax: "10.00", total: "210.00"},
//        {id: "28", invdate: "2007-10-03", name: "test2", note: "note2", amount: "300.00", tax: "20.00", total: "320.00"},
//        {id: "29", invdate: "2007-09-01", name: "test3", note: "note3", amount: "400.00", tax: "30.00", total: "430.00"}
//    ];

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
            width: 500,
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
            width: 500,
            afterSubmit: function (response, postdata) {
                var respuesta = jQuery.parseJSON(response.responseText);
                return [respuesta.ok, respuesta.mensaje, ''];
            }
        },
        {modal: true, jqModal: true,
            width: 300,
            afterSubmit: function (response, postdata) {
                var respuesta = jQuery.parseJSON(response.responseText);
                return [respuesta.ok, respuesta.mensaje, ''];
            }
        },
        {multipleSearch: true, multipleGroup: true}
        );
    }
});