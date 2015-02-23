/*
    **NOMENCLATURA**
    frl - formulario registro lote
    Apl - Asignacion de parametros de lote
    Acp - Aceptar
    Can - Cancelar
    Btn - Boton
    Pnl - Panel
    Cmb - Combobox
    Rdb - Radio 
    Chk - Check option
    Ltc - Codigod de laboratorio
    Grd - Grid panel
    Cbm - Check box model
*/

var frp_MdlParSel = Ext.regModel('frp_MdlParSel', {
    extend: 'Ext.data.Model',
    idProperty: 'parkeyi',
    fields: [
        {name: 'lotkeyi'},
        {name: 'parkeyi'},
        {name: 'parnamc'}
    ]
});

var pars = new Object();
pars.lotkeyi = 0;
var frp_StrParSel = null;
frp_StrParSel = new Ext.data.Store({
    id:'frp_StrParSel',
    storeId: 'frp_StrParSel',
    model: frp_MdlParSel,
    autoLoad: false,
    pageSize: 100,    
    proxy: {
        type: 'ajax',
        startParam:false,
        limitParam:false,
        noCache:false,
        pageParam:false,        
        url : 'app/src/ejecutarProcedimiento.php',
        extraParams: {
            'procedimiento': 'consultarParametroLote',
            'parametros': Ext.encode(pars)
        }, 
        reader: {
            type: 'json', 
            root: 'results',
            totalProperty: 'rows',
            idProperty: 'parkeyi'
        }
    }
});

var smParSel = new Ext.selection.CheckboxModel({
    checkOnly: true
});

var frp_GrdParSel = new Ext.grid.GridPanel({
    id:'frp_GrdParSel',
    header: false,
    multiSelect: true, 
    selModel: smParSel,
    padding: 10,
    store: frp_StrParSel, 
    columns: [
        { xtype: 'rownumberer', width:30 },
        { text: "ParKey", dataIndex: "parkeyi", hidden: true },
        { text: "Parámetro", dataIndex: "parnamc", flex:1 }
    ],
    viewConfig: {
        forceFit: true,
        emptyText: 'No se encontraron registros.',
        stripeRows: false
    },
    iconCls: 'icon-grid',
    tbar: [{
            xtype: 'tbtext',
            id: 'lblParLot',
            style:'font-weight:bold;',
            text: 'Parámetros'
        }],    
    listeners: {
        beforeitemcontextmenu:  function(view,record,item, index, e){
          e.stopEvent();
        },
        beforeitemclick: function(dv, record, item, index, e) {
        },
        beforeitemdblclick: function(dv, record, item, index, e) {
                        
        }
    }
});

var frp_MdlCodSel = Ext.regModel('frp_MdlCodSel', {
    extend: 'Ext.data.Model',
    idProperty: 'ltckeyi',
    fields: [
        {name: 'lotkeyi'},
        {name: 'ltckeyi'},
        {name: 'ltccodc'}
    ]
});

var pars = new Object();
pars.lotkeyi = 0;
var frp_StrCodSel = null;
frp_StrCodSel = new Ext.data.Store({
    id:'frp_StrCodSel',
    storeId: 'frp_StrCodSel',
    model: frp_MdlCodSel,
    autoLoad: false,
    pageSize: 100,    
    proxy: {
        type: 'ajax',
        startParam:false,
        limitParam:false,
        noCache:false,
        pageParam:false,        
        url : 'app/src/ejecutarProcedimiento.php',
        extraParams: {
            'procedimiento': 'consultarCodlabLote',
            'parametros': Ext.encode(pars)
        }, 
        reader: {
            type: 'json', 
            root: 'results',
            totalProperty: 'rows',
            idProperty: 'ltckeyi'
        }
    }
});

var smCodSel = new Ext.selection.CheckboxModel({
    checkOnly: true,
    mode: 'SINGLE'
});

var frp_GrdCodSel = new Ext.grid.GridPanel({
    id:'frp_GrdCodSel', 
    header: false, 
    selModel: smCodSel,
    padding: 10, 
    store: frp_StrCodSel, 
    columns: [
        { xtype: 'rownumberer', width:30 },
        { text: "CodKey", dataIndex: "ltckeyi", hidden: true },
        { text: "Código laboratorio", dataIndex: "ltccodc", flex:1 }
    ],
    viewConfig: {
        forceFit: true,
        emptyText: 'No se encontraron registros.',
        stripeRows: false
    },
    iconCls: 'icon-grid',
    tbar: [{
            xtype: 'tbtext',
            id: 'lblCodLab',
            style:'font-weight:bold;',
            text: 'Código de laboratorio'
        }],
    listeners: {
        beforeitemcontextmenu:  function(view,record,item, index, e){
          e.stopEvent();
        },
        beforeitemclick: function(dv, record, item, index, e) {
        },
        beforeitemdblclick: function(dv, record, item, index, e) {
                        
        }
    }
});


var frp_MdlCodPar = Ext.regModel('frp_MdlCodPar', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'lcpkeyi'},
        {name: 'lotkeyi'},
        {name: 'lotcodc'},
        {name: 'ltckeyi'},
        {name: 'ltccodc'},
        {name: 'parnamc'},
        {name: 'ltcfcmd'}
    ]
});

var pars = new Object();
pars.lotkeyi = 0;
var frp_StrCodPar = null;
frp_StrCodPar = new Ext.data.Store({
    id:'frp_StrCodPar',
    storeId: 'frp_StrCodPar',
    model: frp_MdlCodPar,
    autoLoad: false,
    pageSize: 100,    
    proxy: {
        type: 'ajax',
        startParam:false,
        limitParam:false,
        noCache:false,
        pageParam:false,
        url : 'app/src/ejecutarProcedimiento.php',
        extraParams: {
            'procedimiento': 'consultarCodParLote',
            'parametros': Ext.encode(pars)
        }, 
        reader: {
            type: 'json', 
            root: 'results',
            totalProperty: 'rows'
        }
    }
});

var smCodPar = new Ext.selection.CheckboxModel({
    checkOnly: true,
    mode: 'SINGLE'
});

var frp_GrdCodPar = new Ext.grid.GridPanel({
    id:'frp_GrdCodPar', 
    header: false, 
    padding: 10, 
    selModel: smCodPar,
    flex: 2,
    store: frp_StrCodPar, 
    columns: [
        { xtype: 'rownumberer', width:30 },
        { text: "LcpKey", dataIndex: "lcpkeyi", hidden: true },
        { text: "Lote", dataIndex: "lotcodc", width:80 },
        { text: "Código laboratorio", dataIndex: "ltccodc", width:200 },
        { text: "Fecha de muestreo", dataIndex: "ltcfcmd", width:120 },
        { text: "Parámetros", dataIndex: "parnamc", width:200, flex:1 }
    ],
    viewConfig: {
        forceFit: true,
        emptyText: 'No se encontraron registros.',
        stripeRows: false
    },
    iconCls: 'icon-grid',
    tbar: [{
            xtype: 'tbtext',
            id: 'lblCodGen',
            style:'font-weight:bold;',
            text: 'Registros generados'
        },{ 
            xtype: 'tbfill' 
        },{
            text: 'Editar',
            //iconCls: 'cargar_archivo',
            handler: function() {

                var sCodPars = frp_GrdCodPar.getSelectionModel().getSelection();

                if (isempty(sCodPars)) {
                    Ext.Msg.alert("Mensaje de EQUAS.", "Seleccione el registro que desea editar.");
                    return false;
                }

                Ext.each(sCodPars, function (itemCodPar) {
                    var pars = new Object();
                    pars.lotkeyi = itemCodPar.data.lotkeyi;
                    pars.codkeyi = itemCodPar.data.ltckeyi;
                    pars.s_user  = 'admin';

                    Ext.Ajax.request({
                        url: 'app/src/ejecutarProcedimiento.php',
                        method: 'GET',
                        async: false,
                        params : {
                            'procedimiento': 'consultarMatrizPar',
                            'parametros': Ext.encode(pars)
                        },            
                        success: function(response, request){
                            frp_GrdCodSel.getSelectionModel().deselectAll();
                            frp_GrdParSel.getSelectionModel().deselectAll();

                            var l_rowcod = frp_GrdCodSel.store.indexOfId(pars.codkeyi);
                            frp_GrdCodSel.selModel.select(l_rowcod, true);

                            var resobj = Ext.decode(response.responseText);
                            var items = resobj.results;
                            Ext.each(items, function (item) {
                                var l_rowind = frp_GrdParSel.store.indexOfId(item.lcpparkeyi);
                                frp_GrdParSel.selModel.select(l_rowind, true);
                            });
                            
                        },
                        failure : function(response, request){
                            Ext.Msg.alert("Mensaje de EQUAS.", "Hubo algún error en el proceso.");
                            return false;
                        }
                    });
                });
            }

        },'-',{
            text: 'Guardar',
            //iconCls: 'cargar_archivo',
            handler: function() {
                var sCods = frp_GrdCodSel.getSelectionModel().getSelection();
                var sPars = frp_GrdParSel.getSelectionModel().getSelection();
                var sCodPars = frp_GrdCodPar.getSelectionModel().getSelection();

                if (isempty(sCods) || isempty(sPars) || isempty(sCodPars)) {
                    Ext.Msg.alert("Mensaje de EQUAS.", "Debe editar un registro para actualizarlo.");
                    return false;
                }

                Ext.each(sCodPars, function (itemCodPar) {
                    l_ltckeyi = itemCodPar.data.ltckeyi
                });

                Ext.each(sCods, function (itemCod) {
                    var pars = new Object();
                    pars.lotkeyi = itemCod.data.lotkeyi;
                    pars.ltckeyi = itemCod.data.ltckeyi;

                    if (pars.ltckeyi != l_ltckeyi) {
                        Ext.Msg.alert("Mensaje de EQUAS.", "Por favor, antes de guardar los cambios cargue nuevamente los datos del registro.");
                        return false;
                    }

                    Ext.Ajax.request({
                        async: false,
                        url: 'app/src/ejecutarProcedimiento.php',
                        method: 'GET',
                        params : {
                            'procedimiento': 'eliminarCodParLote',
                            'parametros': Ext.encode(pars)
                        }
                    });

                    Ext.each(sPars, function (itemPar) {
                        pars = new Object();
                        pars.lotkeyi = itemCod.data.lotkeyi;
                        pars.codkeyi = itemCod.data.ltckeyi;
                        pars.parkeyi = itemPar.data.parkeyi;
                        pars.s_user  = 'admin';

                        Ext.Ajax.request({
                            url: 'app/src/ejecutarProcedimiento.php',
                            method: 'GET',
                            params : {
                                'procedimiento': 'asignarMatriz',
                                'parametros': Ext.encode(pars)
                            }
                        });
                    });
                });

                var pars = new Object();
                pars.lotkeyi = Ext.getCmp('frl_DtlKey').getValue();
                frp_StrCodPar.load({
                    params:{
                        'procedimiento': 'consultarCodParLote',
                        'parametros'   : Ext.encode(pars)
                    }
                });

        }
    },'-',{
            text: 'Eliminar',
            //iconCls: 'cargar_archivo',
            handler: function() {
                var sCodPars = frp_GrdCodPar.getSelectionModel().getSelection();

                if (isempty(sCodPars)) {
                    Ext.Msg.alert("Mensaje de EQUAS.", "Seleccione el registro que desea eliminar.");
                    return false;
                }                

                Ext.each(sCodPars, function (itemCodPar) {

                    var pars = new Object();
                    pars.lotkeyi = itemCodPar.data.lotkeyi;
                    pars.ltckeyi = itemCodPar.data.ltckeyi;
                    
                    Ext.Ajax.request({
                        async: false,
                        url: 'app/src/ejecutarProcedimiento.php',
                        method: 'GET',
                        params : {
                            'procedimiento': 'eliminarCodParLote',
                            'parametros': Ext.encode(pars)
                        }
                    });

                    var pars = new Object();
                    pars.lotkeyi = itemCodPar.data.lotkeyi;
                    frp_StrCodPar.load({
                        params:{
                            'procedimiento': 'consultarCodParLote',
                            'parametros'   : Ext.encode(pars)
                        }
                    });

                });
        }
    }],
    listeners: {
        beforeitemcontextmenu:  function(view,record,item, index, e){
          e.stopEvent();
        },
        beforeitemclick: function(dv, record, item, index, e) {
        },
        beforeitemdblclick: function(dv, record, item, index, e) {
                        
        }
    }
});


Ext.create('Ext.panel.Panel',{
    title: 'Generar matriz',    
    id:'frmGenerarMatriz',
    name:'frmGenerarMatriz',
    itemId: 'frmGenerarMatriz',
    layout: 'fit',
    bodyStyle: 'padding:5px;',
    closable: false,
    border: true,
    items: [
        {
            border: false,
            frame: false,
            defaults: {
                flex: 1
            },        
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [ frp_GrdCodSel, frp_GrdParSel, frp_GrdCodPar ]
        }
    ],
    listeners: {
        afterlayout: function() {
            var pars = new Object();
            pars.lotkeyi = Ext.getCmp('frl_DtlKey').getValue();
            frp_StrParSel.load({
                params:{
                    'procedimiento': 'consultarParametroLote',
                    'parametros'   : Ext.encode(pars)
                }
            });

            frp_StrCodSel.load({
                params:{
                    'procedimiento': 'consultarCodlabLote',
                    'parametros'   : Ext.encode(pars)
                }
            });

            frp_StrCodPar.load({
                params:{
                    'procedimiento': 'consultarCodParLote',
                    'parametros'   : Ext.encode(pars)
                }
            });
        }
    },
    tbar: [{
            text: 'Generar',
            //iconCls: 'cargar_archivo',
            handler: function() {
                var sCods = frp_GrdCodSel.getSelectionModel().getSelection();
                var sPars = frp_GrdParSel.getSelectionModel().getSelection();
                                
                if (isempty(sCods)) {
                    Ext.Msg.alert("Mensaje de EQUAS.", "Debe seleccionar al menos un código de laboratorio.");
                    return false;
                }

                if (isempty(sPars)) {
                    Ext.Msg.alert("Mensaje de EQUAS.", "Debe seleccionar al menos un parámetro.");
                    return false;
                }

                Ext.each(sCods, function (itemCod) {
                    Ext.each(sPars, function (itemPar) {                    
                        pars = new Object();
                        pars.lotkeyi = Ext.getCmp('frl_DtlKey').getValue();
                        pars.codkeyi = itemCod.data.ltckeyi;
                        pars.parkeyi = itemPar.data.parkeyi;
                        pars.s_user  = 'admin';

                        Ext.Ajax.request({
                            url: 'app/src/ejecutarProcedimiento.php',
                            method: 'GET',
                            async: false,
                            params : {
                                'procedimiento': 'asignarMatriz',
                                'parametros': Ext.encode(pars)
                            }
                        });
                    });
                });

                var pars = new Object();
                pars.lotkeyi = Ext.getCmp('frl_DtlKey').getValue();
                frp_StrCodPar.load({
                    params:{
                        'procedimiento': 'consultarCodParLote',
                        'parametros'   : Ext.encode(pars)
                    }
                });

            }
        },'-',{
            text: 'Agregar cod. laboratorio',
            //iconCls: 'cargar_archivo',
            handler: function() {
                addNewTab("todo-tab-panel", "frmAgregarCodLab", "Agregar Código Laboratorio");

            }
        },'-',{
            text: 'Agregar parámetro',
            //iconCls: 'cargar_archivo',
            handler: function() {
                addNewTab("todo-tab-panel", "frmAgregarParametro", "Agregar parámetro");
            }
        },'-',{
            text: 'Finalizar',
            //iconCls: 'cargar_archivo',
            handler: function(btn, e) {
                btn.up('.tabpanel').remove(btn.up('.panel'), false);
            }
        },{ 
        xtype: 'tbfill' 
        },{
            text: 'Actualizar',
            handler: function() {
                var pars = new Object();
                pars.lotkeyi = Ext.getCmp('frl_DtlKey').getValue();

                frp_StrParSel.load({
                    params:{
                        'procedimiento': 'consultarParametroLote',
                        'parametros'   : Ext.encode(pars)
                    }
                });

                frp_StrCodSel.load({
                    params:{
                        'procedimiento': 'consultarCodlabLote',
                        'parametros'   : Ext.encode(pars)
                    }
                });

                frp_StrCodPar.load({
                    params:{
                        'procedimiento': 'consultarCodParLote',
                        'parametros'   : Ext.encode(pars)
                    }
                });
            }
        }
    ]
});