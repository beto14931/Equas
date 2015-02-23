/*
    **NOMENCLATURA**
    fac - formulario agregar codigo de laboratorio
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

/*INICIO COMBOBOX TIPO DE MATRIZ*/
var fac_MdlMdm = Ext.regModel('fac_MdlMdm', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'glocodc'},
        {name: 'glovalc'}
    ]
});

var pars = new Object();
pars.p_producto = '%';/*Todoclass.Global.tipo_producto;*/
pars.p_filtro = '%';
var fac_CmbStrMdm = null;
fac_CmbStrMdm = new Ext.data.Store({
    id:'fac_CmbStrMdm',
    storeId: 'fac_CmbStrMdm',
    model: fac_MdlMdm,
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

var fac_PtmMdm = new Ext.form.ComboBox({
    fieldLabel: 'Matriz de muestra',
    name:'fac_PtmMdm',
    id:'fac_PtmMdm',
    store: fac_CmbStrMdm,
    mode: 'local',
    displayField: 'glovalc',
    valueField: 'glocodc'
});
/*FIN COMBOBOX TIPO DE MATRIZ*/

var fac_PtmTpm = generarCombobox('Tipo de muestra', 'fac_PtmTpm', 'consultarGlosario', { tabla: 'Tipo Muestra', filtro: '%' }, 'homo');
fac_PtmTpm.setDisabled(true);
fac_PtmMdm.on('select', function(ele, rec, idx) {
    if (Ext.getCmp('frl_DtmPro').getRawValue() != 'Aires') {
        fac_PtmTpm.setDisabled(false);
    }
}); 

var fac_DtuDep = generarCombobox('Departamento', 'fac_DtuDep', 'obtenerUbigeoDep', null, 'homo', 'remote', 'fac_DtuPro', 'obtenerUbigeoPro');
var fac_DtuPro = generarCombobox('Provincia', 'fac_DtuPro', 'obtenerUbigeoPro', { parpro: null }, 'homo', 'local', 'fac_DtuDis', 'obtenerUbigeoDis');
var fac_DtuDis = generarCombobox('Distrito', 'fac_DtuDis', 'obtenerUbigeoDis', { pardis: null }, 'homo', 'local');

var fac_DtpPdm = {
    xtype:'fieldset',        
    title: 'Puntos de muestreo',
    defaultType: 'combobox',
    padding: 10,
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 130,
        msgTarget: 'side'
    },        
    layout: 'form',                
    items :[{
            fieldLabel: 'Key Cod. Lab.',
            name: 'fac_DtpKey',
            id: 'fac_DtpKey',
            xtype: 'textfield',
            hidden: true,
            readOnly:true
        },{
            fieldLabel: 'Código laboratorio',
            name: 'fac_DtpCod',
            id: 'fac_DtpCod',
            xtype: 'textfield',
            readOnly:true,
            fieldStyle: "background:none #C3D3DE;"            
        },
        fac_PtmMdm,
        fac_PtmTpm,
        {
            fieldLabel: 'Fecha de muestreo',
            name: 'fac_DtpFmu',
            id: 'fac_DtpFmu',
            xtype: 'datefield',
            format: 'd/m/Y',
            submitFormat: 'Y-m-d H:i:s',
            blankText: 'Debe seleccionar una fecha de muestreo.'

        },{
            fieldLabel: 'Hora de muestreo',
            name: 'fac_DtpHmu',
            id: 'fac_DtpHmu',
            xtype: 'textfield'
        },{
            fieldLabel: 'Coordenada este',
            name: 'fac_DtpCoe',
            id: 'fac_DtpCoe',
            xtype: 'textfield'
        },{
            fieldLabel: 'Coordenada norte',
            name: 'fac_DtpCon',
            id: 'fac_DtpCon',
            xtype: 'textfield'
        },{
            fieldLabel: 'Código cliente/Campo',
            name: 'fac_DtpCli',
            id: 'fac_DtpCli',
            xtype: 'textfield'
        },{   
            fieldLabel: 'Observaciones',
            name: 'fac_DtpObs',
            id: 'fac_DtpObs',
            xtype: 'textareafield',
            grow: true,
            listeners: {
                afterComponentLayout: function() {
                    return false;
                }
            }
        }
    ] 
};

var fac_DtpUbi = {
    xtype:'fieldset',        
    title: 'Ubicación',
    padding: 10,
    fieldDefaults: {
        labelAlign: 'left',
        //msgTarget: 'side'
    },        
    layout: 'form',                
    items :[    fac_DtuDep,
                fac_DtuPro,
                fac_DtuDis,
        {   
            fieldLabel: 'Comentario',
            name: 'fac_DtpCmt',
            id: 'fac_DtpCmt',
            xtype: 'textareafield',
            grow: true
        }
    ] 
};


var fac_RegCod = Ext.create('Ext.form.Panel',{
    region: 'north',
    autoScroll:true,
    frame: false,
    //margins: '5 5 5 5', 
    defaults: {
        //border: false,
        xtype: 'panel',
        flex: 1,
        //layout: 'form',
        margins: 10
    },        
    layout: 'hbox',            
    items: [    fac_DtpPdm,
                fac_DtpUbi
    ],
    buttons: [{
        text: 'Ocultar',
        handler: function (btn) {
            fac_RegCod.hide();
        }
    }]
});
/*FIN PANEL REGISTRO*/

/*INICIO GRID PANEL*/
var fac_MdlPtm = Ext.regModel('fac_MdlPtm', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'ltckeyi'},
        {name: 'ltclotkeyi'},
        {name: 'ltccodc'},
        {name: 'ltcmtmc'},
        {name: 'ltctmtc'},
        {name: 'ltcfcmd'},
        {name: 'ltchrmt'},
        {name: 'ltccoec'},
        {name: 'ltcconc'},
        {name: 'ltcclic'},
        {name: 'ltcdepc'},
        {name: 'ltcproc'},
        {name: 'ltcdisc'}
    ]
});

var pars = new Object();
pars.lotkeyi = Ext.getCmp('frl_DtlKey').getValue();
var fac_StrPtm = null;
fac_StrPtm = new Ext.data.Store({
    id:'fac_StrPtm',
    storeId: 'fac_StrPtm',
    model: fac_MdlPtm,
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
            'procedimiento': 'consultarCodigoLote',
            'parametros': Ext.encode(pars)
        }, 
        reader: {
            type: 'json', 
            root: 'results',
            totalProperty: 'rows'
        }
    }
});

var smPtm = new Ext.selection.CheckboxModel({
    checkOnly: true
});

var fac_GrdPtm = Ext.create('Ext.grid.Panel', {
    id:'fac_GrdPtm',
    header: false,
    selModel: smPtm,
    store: fac_StrPtm,
    columns: [
        {xtype: 'rownumberer', width:30},
        {text: "IdCbl", dataIndex: "ltckeyi", width:60, hidden:true},
        {text: "Codigo laboratorio", dataIndex: "ltccodc", width: 120},
        {text: "Matriz de la muestra", dataIndex: "ltcmtmc"},
        {text: "Tipo de muestra", dataIndex: "ltctmtc"},
        {text: "Fecha de muestreo", dataIndex: "ltcfcmd"},
        {text: "Hora de muestreo", dataIndex: "ltchrmt"},
        {text: "Coordenada este", dataIndex: "ltccoec"},
        {text: "Coordenada norte", dataIndex: "ltcconc"},
        {text: "Código cliente/Campo", dataIndex: "ltcclic", flex:1},
        {text: "Departamento", dataIndex: "ltcdepc", flex:1},
        {text: "Provincia", dataIndex: "ltcproc", flex:1},
        {text: "Distrito", dataIndex: "ltcdisc", flex:1}
    ],
    viewConfig: {
        forceFit: true,
        emptyText: 'No se encontraron registros.',
        stripeRows: false
    },
    iconCls: 'icon-grid',
    tbar: [{
            xtype: 'tbtext',
            id: 'fac_lblCodLot',
            style:'font-weight:bold;',
            text: l_lblini
    }],    
    listeners:     {
        beforeitemcontextmenu :  function(view,record,item, index, e){
          e.stopEvent();
          //mngpro_btnmenu.showAt(e.getXY());
        },
        beforeitemclick: function(dv, record, item, index, e) {

        },
        beforeitemdblclick: function(dv, record, item, index, e) {

        }
    }
});

var fac_GrdPnl = Ext.create('Ext.panel.Panel',{ 
    header: false,
    border: false,
    id: 'fac_PnlGrdParam',
    margins: '10 0 0 0',
    region: 'center',
    layout: 'fit',       
    items: [fac_GrdPtm]
});
/* 	FIN DE GRID PANEL*/

/*PANEL PRINCIPAL*/
Ext.create('Ext.form.Panel', {
    title: 'Agregar código laboratorio',
    name:'frmAgregarCodLab',
    id:'frmAgregarCodLab',
    itemId: 'frmAgregarCodLab',
    layout: 'border',
    closable: false,
    frame: false,
    border: false,
    //autoScroll:true,
    items: [
        fac_RegCod,
        fac_GrdPnl
    ],
    tbar:[{
	id: 'fac_id_nue',
        text: 'Nuevo',
        //iconCls: 'cargar_archivo',
        handler: function() {
            fac_RegCod.show();
            fac_RegCod.getForm().reset();

            var pars = new Object();
            pars.lotkeyi = Ext.getCmp('frl_DtlKey').getValue();
            
            Ext.Ajax.request({
                url: 'app/src/ejecutarProcedimiento.php',
                method: 'GET',
                async: false,
                params : {
                    'procedimiento': 'obtenerKeyCodLote',
                    'parametros'   : Ext.encode(pars)
                },            
                success: function(response, request){
                    var resobj = Ext.decode(response.responseText);
                    if (resobj.status == false) {
                        return false;
                    }
                    
                    var item = resobj.results[0];
                    Ext.getCmp('fac_DtpKey').setValue(item.clbkeyi);
                    Ext.getCmp('fac_DtpCod').setValue(item.clbcodc);

                },
                failure : function(response, request){
                    Ext.Msg.alert("Mensaje de WKBOOK.", "Hubo errores en el proceso.");
                    return false;
                }
            });

        }
    }
    ,'-',{
        id:'fac_id_gua',
        text: 'Guardar',
        //iconCls: 'cargar_archivo',
        handler: function() { 
            
            pars = new Object();
            pars.p_lot = Ext.getCmp('frl_DtlKey').getValue();
            pars.p_clb = Ext.getCmp('fac_DtpKey').getValue();
            pars.p_cod = Ext.getCmp('fac_DtpCod').getValue();
            pars.p_mtm = Ext.getCmp('fac_PtmMdm').getValue();
            pars.p_tmt = Ext.getCmp('fac_PtmTpm').getValue();
            pars.p_fcm = Ext.getCmp('fac_DtpFmu').getValue();
            pars.p_hrm = Ext.getCmp('fac_DtpHmu').getValue();
            pars.p_coe = Ext.getCmp('fac_DtpCoe').getValue();
            pars.p_con = Ext.getCmp('fac_DtpCon').getValue();
            pars.p_cli = Ext.getCmp('fac_DtpCli').getValue();
            pars.p_obs = Ext.getCmp('fac_DtpObs').getValue();
            pars.p_dep = Ext.getCmp('fac_DtuDep').getValue();
            pars.p_pro = Ext.getCmp('fac_DtuPro').getValue();
            pars.p_dis = Ext.getCmp('fac_DtuDis').getValue();
            pars.p_cmt = Ext.getCmp('fac_DtpCmt').getValue();
            pars.s_user = 'admin';

            Ext.Ajax.request({
                url: 'app/src/ejecutarProcedimiento.php',
                method: 'GET',
                async: false,
                params : {
                    'procedimiento': 'agregarCodLot',
                    'parametros'   : Ext.encode(pars)
                },            
                success: function(response, request){
                    fac_RegCod.getForm().reset();

                    var pars = new Object();
                    pars.lotkeyi = Ext.getCmp('frl_DtlKey').getValue();
                    
                    Ext.Ajax.request({
                        url: 'app/src/ejecutarProcedimiento.php',
                        method: 'GET',
                        async: false,
                        params : {
                            'procedimiento': 'obtenerKeyCodLote',
                            'parametros'   : Ext.encode(pars)
                        },            
                        success: function(response, request){
                            var resobj = Ext.decode(response.responseText);
                            if (resobj.status == false) {
                                return false;
                            }
                            
                            var item = resobj.results[0];
                            Ext.getCmp('fac_DtpKey').setValue(item.clbkeyi);
                            Ext.getCmp('fac_DtpCod').setValue(item.clbcodc);

                        },
                        failure : function(response, request){
                            Ext.Msg.alert("Mensaje de WKBOOK.", "Hubo errores en el proceso.");
                            return false;
                        }
                    });

                    var pars = new Object();
                    pars.lotkeyi = Ext.getCmp('frl_DtlKey').getValue();
                    fac_StrPtm.load({
                        params:{
                            'procedimiento': 'consultarCodigoLote',
                            'parametros'   : Ext.encode(pars)
                        }
                    });

                },
                failure : function(response, request){
                    Ext.Msg.alert("Mensaje de WKBOOK.", "Hubo errores en el proceso.");
                    return false;
                }
            });

        }
    }
    ,'-',{
        id:'fac_id_edi',
        text: 'Editar',
        //iconCls: 'cargar_archivo',
        handler: function() {
            fac_RegCod.show();
        }
    }
    ,'-',{
        id:'fac_id_eli',
        text: 'Eliminar',
        //iconCls: 'cargar_archivo',
        handler: function() {
            //fac_StrPrm.load();
        }
    },'-',{
        id:'fac_id_fin',
        text: 'Finalizar',
        //iconCls: 'cargar_archivo',
        handler: function(btn, e) {

            var pars = new Object();
            pars.lotkeyi = Ext.getCmp('frl_DtlKey').getValue();
            frp_StrCodSel.load({
                params:{
                    'procedimiento': 'consultarCodigoLote',
                    'parametros'   : Ext.encode(pars)
                }
            });

            btn.up('.tabpanel').remove(btn.up('.panel'), false);
        }
    }, { xtype: 'tbfill' } 
    ,'-',{
        id:'fac_id_act',
        text: 'Actualizar',
        //iconCls: 'cargar_archivo',
        handler: function() {       
            var pars = new Object();
            pars.lotkeyi = Ext.getCmp('frl_DtlKey').getValue();
            fac_StrPtm.load({
                params:{
                    'procedimiento': 'consultarCodigoLote',
                    'parametros'   : Ext.encode(pars)
                }
            });
        }
    }],
    listeners: {
        afterrender: function() {
            var l_indchr = Ext.getCmp('fac_lblCodLot').text.indexOf(Ext.getCmp('frl_DtlCod').getValue());

            if (l_indchr <= 0) {
                Ext.getCmp('fac_lblCodLot').setText(l_lblini + Ext.getCmp('frl_DtlCod').getValue());
            }
        },

        afterlayout: function() {
            var pars = new Object();
            pars.lotkeyi = Ext.getCmp('frl_DtlKey').getValue();
            
            Ext.Ajax.request({
                url: 'app/src/ejecutarProcedimiento.php',
                method: 'GET',
                async: false,
                params : {
                    'procedimiento': 'obtenerKeyCodLote',
                    'parametros'   : Ext.encode(pars)
                },            
                success: function(response, request){
                    var resobj = Ext.decode(response.responseText);
                    if (resobj.status == false) {
                        return false;
                    }
                    
                    var item = resobj.results[0];
                    Ext.getCmp('fac_DtpKey').setValue(item.clbkeyi);
                    Ext.getCmp('fac_DtpCod').setValue(item.clbcodc);

                },
                failure : function(response, request){
                    Ext.Msg.alert("Mensaje de WKBOOK.", "Hubo errores en el proceso.");
                    return false;
                }
            });

            var l_indchr = Ext.getCmp('fac_lblCodLot').text.indexOf(Ext.getCmp('frl_DtlCod').getValue());

            if (l_indchr <= 0) {
                Ext.getCmp('fac_lblCodLot').setText(l_lblini + Ext.getCmp('frl_DtlCod').getValue());
            }

            var pars = new Object();
            pars.lotkeyi = Ext.getCmp('frl_DtlKey').getValue();
            fac_StrPtm.load({
                params:{
                    'procedimiento': 'consultarCodigoLote',
                    'parametros'   : Ext.encode(pars)
                }
            });

        }
    }
});
