$(function () {

    var idusuario, datosusuario, jqGridUsuario;

    tablaUsuario();

    function tablaUsuario()
    {
        jqGridUsuario = jQuery("#usuario1").jqGrid({
            url: 'controlador/fachada.php',
            datatype: "json",
            mtype: 'POST',
            postData: {
                clase: 'UsuarioCRUD',
                oper: 'select'
            },
            colNames: ['CODIGO', 'NOMBREUSUARIO','CONTRASENA','NOMBRE','APELLIDO','CEDULA','DIRECCION','TELEFONO','CORREO','CODIGO_ROL'],
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
                    }},
            ],
            width:1000,
            sortname:'codigo',
            pager: "#usuario2",
            viewrecords: true,
            caption: "Usuarios",
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
        }).jqGrid('navGrid', '#usuario2', {
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