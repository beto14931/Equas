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
    Clb - Codigod de laboratorio
    Grd - Grid panel
    Cbm - Check box model
    Dtp - datos del parametro
    Fds - fieldset
    Nrf - Norma de referencia
*/

var l_lblini = 'Parámetros del lote #';

/*INICIO COMBOBOX PRODUCTO*/
Ext.define('fap_CmbMdlPro', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'glocodc', type: 'int'},
        {name:'glovalc', type: 'string'}
    ]
});
pars = new Object();
pars.tabla='Producto Parametro';        
pars.combo='%';
var fap_CmbStrPro = Ext.create('Ext.data.Store', {
    model:'fap_CmbMdlPro',
    autoload: true,
    proxy: {        
        type: 'ajax',
        startParam:false,
        limitParam:false,
        noCache:false,
        pageParam:false,
        url: 'app/src/ejecutarProcedimiento.php',        
        extraParams: {
            'procedimiento': 'consultarGlosario',
            'parametros': Ext.encode(pars)            
        }, 
        reader: {
            type: 'json', 
            root: 'results',
            totalProperty: 'rows'
        }        
    }
});
var fap_DtpPro = new Ext.form.ComboBox({
    fieldLabel: 'Producto',
    name:'fap_DtpPro',
    id:'fap_DtpPro',
    store: fap_CmbStrPro,
    mode: 'local',
    displayField: 'glovalc',
    valueField: 'glovalc',
    labelWidth: 80,
    editable: false,
    value: '(Ninguno)'
});
/*FIN COMBOBOX PRODUCTO*/

/*INICIO COMBOBOX TIPO DE MATRIZ*/
var fap_MdlTmz = Ext.regModel('fap_MdlTmz', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'glocodc'},
        {name: 'glovalc'}
    ]
});

var pars = new Object();
pars.p_producto = '';/*Todoclass.Global.tipo_producto;*/
pars.p_filtro = '%';
var fap_CmbStrTmz = null;
fap_CmbStrTmz = new Ext.data.Store({
    id:'fap_CmbStrTmz',
    storeId: 'fap_CmbStrTmz',
    model: fap_MdlTmz,
    autoLoad: true,
    pageSize: 100,    
    proxy: {
        type: 'ajax',
        startParam:false,
        limitParam:false,
        noCache:false,
        pageParam:false,        
        url : 'app/src/ejecutarProcedimiento.php',
        extraParams: {
            'procedimiento': 'consultarTipoMatriz',
            'parametros': Ext.encode(pars)
        }, 
        reader: {
            type: 'json', 
            root: 'results',
            totalProperty: 'rows'
        }
    }
});

var fap_DtnTmz = new Ext.form.ComboBox({
    fieldLabel: 'Tipo de matriz',
    name:'fap_DtnTmz',
    id:'fap_DtnTmz',
    store: fap_CmbStrTmz,
    mode: 'local',
    displayField: 'glovalc',
    valueField: 'glocodc',
    labelWidth: 100,
    width: 360,
    editable: false,
    value: '(Ninguno)'
});
/*FIN COMBOBOX TIPO DE MATRIZ*/

/*INICIO COMBOBOX AREAS*/
Ext.define('fap_CmbMdlAre', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'glocodc', type: 'string'},
        {name:'glovalc', type: 'string'}
    ]
});
pars = new Object();
pars.tabla='Areas';
pars.combo='%';
var fap_CmbStrAre = Ext.create('Ext.data.Store', {
    model:'fap_CmbMdlAre',
    autoload: true,
    proxy: {        
        type: 'ajax',
        startParam:false,
        limitParam:false,
        noCache:false,
        pageParam:false,
        url: 'app/src/ejecutarProcedimiento.php',
        extraParams: {
            'procedimiento': 'consultarGlosario',
            'parametros': Ext.encode(pars)
        }, 
        reader: {
            type: 'json', 
            root: 'results',
            totalProperty: 'rows'
        }        
    }
});
var fap_CmbAre = Ext.create('Ext.form.ComboBox', {
    fieldLabel: 'Area',
    name:'fap_DtpAre',
    id:'fap_DtpAre',
    store: fap_CmbStrAre,
    mode: 'local',
    displayField: 'glovalc',
    valueField: 'glovalc',
    labelWidth: 60,
    width: 220,
    editable: false,
    value: '(Ninguno)'
});
/*FIN COMBOBOX AREAS*/

var fap_AgpFdf = {
    xtype:'fieldset',        
    title: 'Filtros',
    defaultType: 'combobox',
    padding: 10,
    defaults: {
        //xtype: 'panel',
        //flex: 1,
        //layout: 'form',
        margins: '0 0 0 20'
    },
    fieldDefaults: {
        labelAlign: 'left'
        //msgTarget: 'side'
    },        
    layout: 'hbox',
    items :[
        fap_DtpPro,
        fap_DtnTmz,
        fap_CmbAre
    ]
};

var fap_AgrPnl = Ext.create('Ext.form.Panel',{
    //layout: 'form',
    region: 'north',
    //height:100,
    autoScroll:true,
    frame: false,
    border: false,
    padding: 5,
    //margins: '5 5 5 5', 
    layout: 'fit',            
    items: [
        fap_AgpFdf
    ],
    buttons: [{
        id: 'fap_id_agre',
        text: 'Buscar',
        //iconCls: 'cargar_archivo',
        handler: function() {     
            var pars = new Object();
            pars.parproc = Ext.getCmp('fap_DtpPro').getValue();
            pars.partmzc = Ext.getCmp('fap_DtnTmz').getValue();
            pars.pararec = Ext.getCmp('fap_DtpAre').getValue();
            
            fap_StrPrm.load({
                params:{
                    'procedimiento': 'consultarParametroFiltro',
                    'parametros': Ext.encode(pars)
                }
            });
        }
    }
    ,'-',{
        id:'fap_id_modi',
        text: 'Limpiar',
        //iconCls: 'cargar_archivo',
        handler: function() { 
            Ext.getCmp('fap_DtpPro').setValue('(Ninguno)');
            Ext.getCmp('fap_DtnTmz').setValue('(Ninguno)');
            Ext.getCmp('fap_DtpAre').setValue('(Ninguno)');  
        }
    }]
});
/*FIN PANEL REGISTRO*/

/*INICIO GRID PANEL*/
var fap_MdlPrm = Ext.regModel('fap_MdlPrm', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'parkeyi'},
        {name: 'parnamc'}
    ]
});

var pars = new Object();
pars.parproc = '';/* Todoclass.Global.tipo_producto;*/
pars.partmzc = '(Ninguno)';
pars.pararec = '(Ninguno)';
var fap_StrPrm = null;
fap_StrPrm = new Ext.data.Store({
    id:'fap_StrPrm',
    storeId: 'fap_StrPrm',
    model: fap_MdlPrm,
    autoLoad:true,
    pageSize: 100,    
    proxy: {
        type: 'ajax',
        url : 'app/src/ejecutarProcedimiento.php',
        extraParams: {
            'procedimiento': 'consultarParametroFiltro',
            'parametros': Ext.encode(pars)
        }, 
        reader: {
            type: 'json', 
            root: 'results',
            totalProperty: 'rows'
        }
    }
});

var smFapSel = new Ext.selection.CheckboxModel({
    checkOnly: true
});

var fap_GrdPrm = Ext.create('Ext.grid.Panel', {
    id:'fap_GrdPrm',         
    header: false,
    anchor: '100% 50%',
    selModel: smFapSel,
    store: fap_StrPrm,
    columns: [
        {xtype: "rownumberer", width:30},
        {text: "IdParametro", dataIndex: "parkeyi", width:60, hidden:true},
        {text: "Nombre", dataIndex: "parnamc", flex:1}
    ],
    viewConfig: {
        forceFit: true,
        emptyText: 'No se encontraron registros.',
        stripeRows: false
    },
    iconCls: 'icon-grid',
    tbar: [{
        xtype: 'tbtext',
        id: 'fap_lblParSel',
        style:'font-weight:bold;',
        text: 'Resultados - Parámetros'
    }],
    listeners:     {
        beforeitemcontextmenu :  function(view,record,item, index, e){
          e.stopEvent();
        },
        beforeitemclick: function(dv, record, item, index, e) {
        },
        beforeitemdblclick: function(dv, record, item, index, e) {
            
        }
    }
});
/* FIN DE GRID PANEL*/

/* INICIO DE GRID PARAMETRO LOTE */
var fap_MdlParSel = Ext.regModel('fap_MdlParSel', {
    extend: 'Ext.data.Model',
    idProperty: 'parkeyi',
    fields: [
        {name: 'lotkeyi'},
        {name: 'parkeyi'},
        {name: 'ltpvolc'},
        {name: 'ltpfilc'},
        {name: 'parnamc'}
    ]
});

var pars = new Object();
pars.lotkeyi = 0;
var fap_StrParSel = null;
fap_StrParSel = new Ext.data.Store({
    id:'fap_StrParSel',
    storeId: 'fap_StrParSel',
    model: fap_MdlParSel,
    autoLoad: true,
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

var smFapParSel = new Ext.selection.CheckboxModel({
    checkOnly: true
});

var fap_GrdParSel = new Ext.grid.GridPanel({
    id:'fap_GrdParSel',
    header: false,
    multiSelect: true,
    selModel: smFapParSel,
    //padding: 10,
    anchor: '100% 50%',
    store: fap_StrParSel, 
    columns: [
        { xtype: 'rownumberer', width:30 },
        { text: "ParKey", dataIndex: "parkeyi", hidden: true },
        { text: "Parámetro", dataIndex: "parnamc", flex:1 },
        { text: "Volumen", dataIndex: "ltpvolc", flex:1 },
        { text: "Filtro", dataIndex: "ltpfilc", flex:1 }
    ],
    viewConfig: {
        forceFit: true,
        emptyText: 'No se encontraron registros.',
        stripeRows: false
    },
    iconCls: 'icon-grid',
    tbar: [{
            xtype: 'tbtext',
            id: 'fap_lblParLot',
            style:'font-weight:bold;',
            text: l_lblini
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
/* FIN DE GRID PARAMETRO LOTE */
var fap_GrdPnl = Ext.create('Ext.panel.Panel',{ 
    header: false,
    border: false,
    id: 'fap_PnlGrdParam',   
    region: 'center',    
    layout: 'anchor',
    items: [fap_GrdPrm, fap_GrdParSel]
});


Ext.create('Ext.panel.Panel', {
    title: 'Agregar parametro',
    name:'frmAgregarParametro',
    id:'frmAgregarParametro',
    itemId: 'frmAgregarParametro',
    layout: 'border',
    bodyStyle: 'padding:0px;',
    closable: false,
    frame: false,
    items: [
        fap_AgrPnl,
        fap_GrdPnl
    ],
    tbar:[{
        id:'fap_id_agr',
        text: 'Agregar',
        //iconCls: 'cargar_archivo',
        handler: function() {
            var sPars = fap_GrdPrm.getSelectionModel().getSelection();

            if (isempty(sPars)) {
                Ext.Msg.alert("Mensaje de EQUAS.", "Seleccione los parámetros que desea agregar.");
                return false;
            }                

            Ext.each(sPars, function (itemPar) {

                l_cmbpro = Ext.getCmp('fap_DtpPro').getValue();
                if (l_cmbpro === 'Aires') {
                    var frmDatPar = new Ext.create('Ext.form.Panel',{
                        url: '/registrarProyecto.php',
                        itemId: 'fap_frmDatPar',
                        frame: true,
                        style: 'border:0px;',
                        bodyStyle: 'padding: 10px;',
                        padding: 0,
                        defaults: {
                            //width: '100%',
                            labelWidth: 60
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Volumen',
                                name: 'fap_txtvol',
                                allowBlank: false
                            },{
                                xtype: 'textfield',
                                fieldLabel: 'Filtro',
                                name: 'fap_txtFil',
                                allowBlank: false
                            }
                        ],
                        buttons: [
                            {
                                text: 'Guardar',
                                minWidth: 75,
                                handler: function(btn) {
                                    pars = null;
                                    pars = new Object();
                                    var frl_procedimiento = null;
                                    frl_procedimiento = 'agregarParLot';

                                    var frm = null;
                                    frm = btn.up('#fap_frmDatPar').getForm();
                                    pars.lotkeyi = Ext.getCmp('frl_DtlKey').getValue();
                                    pars.parkeyi = itemPar.data.parkeyi;
                                    pars.p_vol   = frm.findField('fap_txtvol').getValue();
                                    pars.p_fil   = frm.findField('fap_txtFil').getValue();
                                    pars.s_user = 'admin';

                                    if (isempty(pars.p_vol)) {
                                        Ext.Msg.alert("Mensaje de EQUAS", "Debe ingresar el volumen del parametro.");
                                        return false;
                                    }

                                    if (isempty(pars.p_fil)) {
                                        Ext.Msg.alert("Mensaje de EQUAS", "Debe designar el número de filtro del parametro.");
                                        return false;
                                    }

                                    Ext.Ajax.request({
                                        url: 'app/src/ejecutarProcedimiento.php',
                                        method: 'GET',
                                        async: false,
                                        params : {
                                            'procedimiento': frl_procedimiento,
                                            'parametros': Ext.encode(pars)
                                        },
                                        success: function(response, request){
                                            frm.findField('fap_txtvol').setValue('');
                                            frm.findField('fap_txtFil').setValue('');

                                            var pars = new Object();
                                            pars.lotkeyi = Ext.getCmp('frl_DtlKey').getValue();
                                            fap_StrParSel.load({
                                                params:{
                                                    'procedimiento': 'consultarParametroLote',
                                                    'parametros'   : Ext.encode(pars)
                                                }
                                            });

                                            loginDlg.close();
                                        },
                                        failure : function(response, request){
                                            Ext.Msg.alert("Mensaje de EQUAS.", "Hubo errores en el proceso.");
                                            return false;
                                        }
                                    });
                                }
                            },{
                                text: 'Cancelar',
                                minWidth: 75,
                                handler: function() {
                                    loginDlg.close();
                                    return false;
                                }
                            }
                        ]
                    });

                    var loginDlg = new Ext.Window({
                        height: 120,
                        width: 200,
                        closable: false,
                        closeAction : 'hide',
                        modal: true,
                        title: 'Datos del parámetro: ' + itemPar.data.parnamc,
                        layout: 'fit',
                        items: frmDatPar
                    });
                    loginDlg.show();                    
                } else {

                    pars = null;
                    pars = new Object();
                    var frl_procedimiento = null;
                    frl_procedimiento = 'agregarParLot';

                    var frm = null;
                    pars.lotkeyi = Ext.getCmp('frl_DtlKey').getValue();
                    pars.parkeyi = itemPar.data.parkeyi;
                    pars.p_vol   = '';
                    pars.p_fil   = '';
                    pars.s_user = 'admin';

                    Ext.Ajax.request({
                        url: 'app/src/ejecutarProcedimiento.php',
                        method: 'GET',
                        async: false,
                        params : {
                            'procedimiento': frl_procedimiento,
                            'parametros': Ext.encode(pars)
                        },
                        success: function(response, request){
                            var pars = new Object();
                            pars.lotkeyi = Ext.getCmp('frl_DtlKey').getValue();
                            fap_StrParSel.load({
                                params:{
                                    'procedimiento': 'consultarParametroLote',
                                    'parametros'   : Ext.encode(pars)
                                }
                            });
                        },
                        failure : function(response, request){
                            Ext.Msg.alert("Mensaje de EQUAS.", "Hubo errores en el proceso.");
                            return false;
                        }
                    });

                }
            });
            
        }
    },'-',{
        id:'fap_id_eli',
        text: 'Eliminar',
        //iconCls: 'cargar_archivo',
        handler: function() {

            var sParSels = fap_GrdParSel.getSelectionModel().getSelection();

            if (isempty(sParSels)) {
                Ext.Msg.alert("Mensaje de EQUAS.", "Seleccione los parámetros que desea eliminar.");
                return false;
            }

            Ext.each(sParSels, function (itemPar) {

                var pars = new Object();
                pars.lotkeyi = Ext.getCmp('frl_DtlKey').getValue();
                pars.parkeyi = itemPar.data.parkeyi;
                pars.s_user  = 'admin';
                
                Ext.Ajax.request({
                    async: false,
                    url: 'app/src/ejecutarProcedimiento.php',
                    method: 'GET',
                    params : {
                        'procedimiento': 'eliminarParLote',
                        'parametros': Ext.encode(pars)
                    }
                });
            });

            var pars = new Object();
            pars.lotkeyi = Ext.getCmp('frl_DtlKey').getValue();
            fap_StrParSel.load({
                params:{
                    'procedimiento': 'consultarParametroLote',
                    'parametros'   : Ext.encode(pars)
                }
            });            

        }
    },'-',{
        id:'fap_id_fin',
        text: 'Finalizar',
        //iconCls: 'cargar_archivo',
        handler: function(btn, e) {

            var pars = new Object();
            pars.lotkeyi = Ext.getCmp('frl_DtlKey').getValue();
            frp_StrParSel.load({
                params:{
                    'procedimiento': 'consultarParametroLote',
                    'parametros'   : Ext.encode(pars)
                }
            });

            btn.up('.tabpanel').remove(btn.up('.panel'), false);
        }
    }
    ,{ xtype: 'tbfill' },
    ,'-',{
        id:'fap_id_act',
        text: 'Actualizar',
        //iconCls: 'cargar_archivo',
        handler: function() {       
            fap_GrdPrm.load();
            fap_GrdParSel.load();
        }
    }],
    listeners: {
        afterrender: function() {
            var l_indchr = Ext.getCmp('fap_lblParLot').text.indexOf(Ext.getCmp('frl_DtlCod').getValue());
            var l_prolot = Ext.getCmp('frl_DtmPro').getRawValue();
            if (isempty(l_prolot)) {
                Ext.getCmp('fap_DtpPro').setDisabled(false);
            } else {
                Ext.getCmp('fap_DtpPro').setValue(l_prolot);
                Ext.getCmp('fap_DtpPro').setDisabled(true);
                var pars = new Object();
                pars.parproc = Ext.getCmp('fap_DtpPro').getValue();
                pars.partmzc = Ext.getCmp('fap_DtnTmz').getValue();
                pars.pararec = Ext.getCmp('fap_DtpAre').getValue();
                
                fap_StrPrm.load({
                    params:{
                        'procedimiento': 'consultarParametroFiltro',
                        'parametros': Ext.encode(pars)
                    }
                });                
            }
            

            if (l_indchr <= 0) {
                Ext.getCmp('fap_lblParLot').setText(l_lblini + Ext.getCmp('frl_DtlCod').getValue());
            }
        },

        afterlayout: function() {
            var l_indchr = Ext.getCmp('fap_lblParLot').text.indexOf(Ext.getCmp('frl_DtlCod').getValue());
            var l_prolot = Ext.getCmp('frl_DtmPro').getRawValue();
            if (isempty(l_prolot)) {
                Ext.getCmp('fap_DtpPro').setDisabled(false);
            } else {
                Ext.getCmp('fap_DtpPro').setValue(l_prolot);
                Ext.getCmp('fap_DtpPro').setDisabled(true);
                var pars = new Object();
                pars.parproc = Ext.getCmp('fap_DtpPro').getValue();
                pars.partmzc = Ext.getCmp('fap_DtnTmz').getValue();
                pars.pararec = Ext.getCmp('fap_DtpAre').getValue();
                
                fap_StrPrm.load({
                    params:{
                        'procedimiento': 'consultarParametroFiltro',
                        'parametros': Ext.encode(pars)
                    }
                });                
            }

            if (l_indchr <= 0) {
                Ext.getCmp('fap_lblParLot').setText(l_lblini + Ext.getCmp('frl_DtlCod').getValue());
            }

            var pars = new Object();
            pars.lotkeyi = Ext.getCmp('frl_DtlKey').getValue();
            fap_StrParSel.load({
                params:{
                    'procedimiento': 'consultarParametroLote',
                    'parametros'   : Ext.encode(pars)
                }
            });

        }
    }
});
