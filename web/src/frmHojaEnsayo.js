/*
    **NOMENCLATURA**
    frhe - formulario registro Hoja de Ensayo
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

/*INICIO COMBOBOX UNIDADES*/

/*FIN COMBOBOX UNIDADES*/

/*INICIO COMBOBOX AREAS*/

/*FIN COMBOBOX AREAS*/

/*INICIO COMBOBOX HOJA RESULTADOS*/

/*FIN COMBOBOX HOJA RESULTADOS*/


/*INICIO COMBOBOX ESTADOS*/

/*FIN COMBO ESTADOS*/

/*INICIO COMBOBOX PRODUCTO*/

/*
    **NOMENCLATURA**
    frhe - formulario registro Hoja de Ensayo
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

/*INICIO COMBOBOX UNIDADES*/

/*FIN COMBOBOX UNIDADES*/

/*INICIO COMBOBOX AREAS*/

/*FIN COMBOBOX AREAS*/

/*INICIO COMBOBOX HOJA RESULTADOS*/

/*FIN COMBOBOX HOJA RESULTADOS*/


/*INICIO COMBOBOX ESTADOS*/

/*FIN COMBO ESTADOS*/

/*INICIO COMBOBOX PRODUCTO*/
Ext.define('frhe_CmbMdlprd', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'prdkeyi', type: 'int'},
        {name:'prdnamc', type: 'string'}
    ]
});

var frhe_CmbStrPrd = Ext.create('Ext.data.Store', {
    model:'frhe_CmbMdlprd',
    autoload: true,
    proxy: {        
        type: 'ajax',
        startParam:false,
        limitParam:false,
        noCache:false,
        pageParam:false,
        url: 'app/src/ejecutarProcedimiento.php',        
        extraParams: {
            'procedimiento': 'cargaProductoHe'
        }, 
        reader: {
            type: 'json', 
            root: 'results',
            totalProperty: 'rows'
        }        
    }
});

/*
fieldLabel: p_label,
        name: p_name,
        id: p_name,
        store: snkCorStrGlo,
        queryMode: p_qmode,
        typeAhead: true,
        triggerAction: 'all',
        displayField: 'glovalc',    
*/        
        
var frhe_DtpPrd = new Ext.form.ComboBox({
    fieldLabel: 'Producto',
    name:'frhe_DtpPrd',
    id:'frhe_DtpPrd',
    store: frhe_CmbStrPrd,
    mode: 'local',
    displayField: 'prdnamc',
    //valueField: 'prdkeyi',
    valueField: 'prdnamc',
    editable: false,
    listeners: {
        select: function(ele, reg, ind) {
            if('frhe_DtpPrd' != null){
                frhe_CmbStrNmr.removeAll();
                var pcbpar = new Object();
                pcbpar.prod=Ext.getCmp('frhe_DtpPrd').getValue(); 
                frhe_CmbStrTpa.load({
                    params:{
                       'procedimiento': 'cargaParametroHe',
                       'parametros'   : Ext.encode(pcbpar)
                        }
                    });
            }
        }
        ,afterrender: function (combo) {
            combo.setValue('Seleccione');
        }
    }
});

Ext.define('frhe_CmbMdlpar', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'parkeyi', type: 'int'},
        {name:'parnamc', type: 'string'}
    ]
});

var ppar = new Object();
ppar=null;
//ppar.prod='';//Ext.getCmp('frhe_DtpPrm').getValue();

var frhe_CmbStrTpa = Ext.create('Ext.data.Store', {
    model:'frhe_CmbMdlpar',
    autoload: false,
    proxy: {        
        type: 'ajax',
        startParam:false,
        limitParam:false,
        noCache:false,
        pageParam:false,
        url: 'app/src/ejecutarProcedimiento.php',        
        extraParams: {
            'procedimiento': 'cargaParametroHe'
            ,'parametros': Ext.encode(ppar)
        }, 
        reader: {
            type: 'json', 
            root: 'results',
            totalProperty: 'rows'
        }        
    }
});

var frhe_DtpPrm = new Ext.form.ComboBox({
    fieldLabel: 'Parametro',
    name:'frhe_DtpPrm',
    id:'frhe_DtpPrm',
    store: frhe_CmbStrTpa,
    mode: 'local',
    displayField: 'parnamc',
    valueField: 'parkeyi',
    queryMode:'local',
    editable: false,
    listeners: {
        select: function(ele, reg, ind) {
            if('frhe_DtpNmr' != null){
                var pcbnmr = new Object();
                pcbnmr.filtro=Ext.getCmp('frhe_DtpPrm').getValue(); 
                frhe_CmbStrNmr.load({
                    params:{
                       'procedimiento': 'cargaMetEnsayoHe',
                       'parametros'   : Ext.encode(pcbnmr)
                        }
                    });
                }
        }
        ,afterrender: function (combo) {
            combo.setValue('Seleccione');
        }
    }
});


Ext.define('frhe_CmbMdlNmr', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'nmrkeyi', type: 'int'},
        {name:'nmrcodc', type: 'string'}
    ]
});

pars = new Object();
pars.filtro=0;//Ext.getCmp('frhe_DtpPrm').getValue();

var frhe_CmbStrNmr = Ext.create('Ext.data.Store', {
    model:'frhe_CmbMdlNmr',
    autoload: true,
    proxy: {        
        type: 'ajax',
        startParam:false,
        limitParam:false,
        noCache:false,
        pageParam:false,
        url: 'app/src/ejecutarProcedimiento.php',        
        extraParams: {
            'procedimiento': 'cargaMetEnsayoHe',
	        'parametros':Ext.encode(pars)
        }, 
        reader: {
            type: 'json', 
            root: 'results',
            totalProperty: 'rows'
        }        
    }
});

var frhe_DtpNmr = new Ext.form.ComboBox({
    fieldLabel: 'Metodo de Ensayo',
    name:'frhe_DtpNmr',
    id:'frhe_DtpNmr',
    store: frhe_CmbStrNmr,
    mode: 'local',
    displayField: 'nmrcodc',
    valueField: 'nmrkeyi'
});
/*FIN COMBOBOX PRODUCTO*/

/*INICIO COMBOBOX TIPO DE MATRIZ*/

/*FIN COMBOBOX TIPO DE MATRIZ*/

var frhe_DtpFds = {
    xtype:'fieldset',
    autoHeight: true,    
    title: 'Datos de la Hoja de Ensayo ',
    defaultType: 'combobox',
    padding: 10,
    defaults: {
        border: false
    },
    fieldDefaults: {
        labelAlign: 'left'
    },        
    layout: 'form',
    items :[{   
            fieldLabel: 'Id',
            name: 'frhe_DtpId',
            id: 'frhe_DtpId',
            xtype: 'textfield',
            editable:false,
            hidden:true,
            labelWidth: 120
        },
    frhe_DtpPrd,
	frhe_DtpPrm,
	frhe_DtpNmr
	
    ] 
};

var frhe_RegPnl = Ext.create('Ext.form.Panel',{
    region: 'north',
    hidden: true,
    autoScroll: true,
    frame: false,
    margins: '5 5 5 5', 
    defaults: {
        border: true,
        xtype: 'panel',
        flex: 1,
        margins: '10 10 10 10'
    },        
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [frhe_DtpFds],
    buttons: [{
        text: 'Ocultar',
        handler: function () {
            Ext.getCmp('frhe_id_nuev').enable();
            frhe_RegPnl.hide();
            frhe_RegPnl.getForm().reset();
        }
    }]
});
/*FIN PANEL REGISTRO*/

/*INICIO GRID PANEL*/
var frhe_MdlPrm = Ext.regModel('frhe_MdlPrm', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'henkeyi'},
        {name: 'henplakeyi'},
        {name: 'fprfrmid'},
        {name: 'parproc'},        
        {name: 'fprparid'},
        {name: 'parnamc'},
        {name: 'hennmrkeyi'},
        {name: 'nmrcodc'},
        {name: 'syshenfecd'},
        {name: 'syshenusrc'},
        {name: 'syshenvigi'}
    ]
});

var pars1 = new Object();
pars1.nombre = '%';

var frhe_StrPrm = null;
frhe_StrPrm = new Ext.data.Store({
    id:'frhe_StrPrm',
    storeId: 'frhe_StrPrm',
    model: frhe_MdlPrm,
    autoLoad:true,
    pageSize: 100,    
    proxy: {
        type: 'ajax',
        url : 'app/src/ejecutarProcedimiento.php',
        extraParams: {
            'procedimiento': 'consultarHojaEnsayo'
            ,'parametros': Ext.encode(pars1)
        }, 
        reader: {
            type: 'json', 
            root: 'results',
            totalProperty: 'rows'
        }
    }
});


var frhe_GrdPrm = Ext.create('Ext.grid.Panel', {
    id:'frhe_GrdPrm',         
    header: false,
    store: frhe_StrPrm,
    columns: [
        {xtype: "rownumberer", width:30},        
        {text: "Producto", dataIndex: "parproc", flex:1},
        {text: "Parámetro", dataIndex: "parnamc", flex:1},
        {text: "IdHen", dataIndex: "henkeyi",width:60,hidden:true},
        {text: "Parámetro", dataIndex: "parnamc", flex:1},
        {text: "Metodo Ensayo", dataIndex: "nmrcodc", flex:1},
        {text: "Fec. Creación", dataIndex: "syshenfecd"},
        //{text: "Hora Creación", dataIndex: "syshenusrc"},
        {text: "Usuario", dataIndex: "syshenusrc", flex:3},
        {text: "Formulario", dataIndex: "fprfrmid", flex:3}
    ],
    viewConfig: {
        forceFit: true,
        emptyText: 'No se encontraron registros.',
        stripeRows: false
    },
    iconCls: 'icon-grid',
    listeners:     {
        beforeitemcontextmenu :  function(view,record,item, index, e){
          e.stopEvent();
        },
        beforeitemclick: function(dv, record, item, index, e) {
        },
        beforeitemdblclick: function(dv, record, item, index, e) {
            /*
            frp_RegPnl.show(); 
            Ext.getCmp('frhe_DtpId').setValue(record.get('henkeyi'));
            Ext.getCmp('frhe_DtpNom').setValue(record.get('henkeyi'));       
            Ext.getCmp('frhe_DtpAra').setValue(record.get('henkeyi'));  
            Ext.getCmp('frhe_DtpPrm').setValue(record.get('henkeyi'));*/
        }
    }
});


var frhe_GrdPnl = Ext.create('Ext.panel.Panel',{ 
    header: false,
    id: 'frhe_PnlGrdParam',   
    region: 'center',    
    layout: 'fit',       
    items: [frhe_GrdPrm]
});
/*  FIN DE GRID PANEL*/

/*PANEL PRINCIPAL*/
var frhe_txtBusPar = Ext.create('Ext.form.TextField',{
    fieldLabel:'   Buscar Hojas de Ensayo',
    name:'frhe_txtBusPar',
    id: 'frhe_txtBusPar',
    labelWidth: 100,
    width: 300,
    margins: '0 0 0 10'
});

var frhe_BtnFlt = Ext.create('Ext.Action', {
    id: 'frhe_BtnFlt',
    text: '',
    iconCls: 'filtro',
    handler: function(){
        pargrd = new Object();
        pargrd.nombre=Ext.getCmp('frhe_txtBusPar').getValue();
        frhe_StrPrm.load({
            params:{
                'procedimiento': 'consultarHojaEnsayo',
                'parametros': Ext.encode(pargrd)
            }
        });
    }
});

var frhe_BtnCanFlt = Ext.create('Ext.Action', {
    id: 'frhe_BtnCanFlt',
    text: '',
    iconCls: 'filtro_quitar',
    handler: function(){
        
        var ppars = new Object();        
        ppars.nombre='%';
        Ext.getCmp('frhe_txtBusPar').reset();
        frhe_StrPrm.load({
            params:{
                'procedimiento': 'consultarHojaEnsayo',
                'parametros': Ext.encode(ppars)
            }
        });
    }
});

Ext.create('Ext.form.Panel', {
    title: 'Registrar Hoja de Ensayo',    
    name:'frmHojaEnsayo',
    id:'frmHojaEnsayo',
    itemId:'frmHojaEnsayo',
    layout: 'border',
    closable: true,
    frame: true,
    items: [
            frhe_RegPnl
        ,
            frhe_GrdPnl
    ],
    tbar:[
        {
            id: 'frhe_id_nuev',
                text: 'Nuevo',
                handler: function() {
                    frhe_RegPnl.getForm().reset();
                    frhe_RegPnl.show();
            }
        },'-',
        {
            id: 'frhe_id_guar',
            text: 'Guardar',
            handler: function() {
                pars = new Object();
                var fhe_procedimiento=null;
                var fhe_valCmp=Ext.getCmp('frhe_DtpId').getValue();

                if (isempty(fhe_valCmp)) {                
                    pars.heid=0;
                    fhe_procedimiento='guardarHojaEnsayo';
                } else{
                    pars.heid=fhe_valCmp;//Ext.getCmp('frhe_DtpId').getValue();                
                    fhe_procedimiento='actualizarHojaEnsayo';
                };
                pars.prdid=Ext.getCmp('frhe_DtpPrd').getValue();
                pars.parid=Ext.getCmp('frhe_DtpPrm').getValue();
                pars.nmrid=Ext.getCmp('frhe_DtpNmr').getValue();
                pars.user='admin';

                Ext.Ajax.request({
                    url: 'app/src/ejecutarProcedimiento.php',
                    method: 'GET',
                    async:false,
                    params : {
                        'procedimiento': fhe_procedimiento,
                        'parametros': Ext.encode(pars)
                    },            
                    success: function(response, request){
                        frhe_RegPnl.hide();
                        frhe_RegPnl.getForm().reset();
                        //frhe_RegPnl.load();

                        frhe_StrPrm.load();
                        //frhe_GrdPnl.show();
                        
                        var resobj = Ext.decode(response.responseText);
                        if (resobj.status == false) {
                                return false;
                        }                            
                        Ext.Msg.alert('Mensaje de EQUAS:',resobj.results[0].mensaje);
                
                    },
                    failure : function(response, request){
                        Ext.Msg.alert("Mensaje de EQUAS.", "Hubo algún error en el proceso.");
                        return false;
                    }
                });

            }
        },'-',
        {
            id:'frhe_id_modi',
            text: 'Modificar'
        }
        ,'-',
        {
            text: 'Cargar Hoja',
            handler: function() {
                var s = frhe_GrdPrm.getSelectionModel().getSelection();
                if (isempty(s)) {
                    Ext.Msg.alert("Mensaje de EQUAS.", "Debe seleccionar una Hoja de Ensayo.");
                    return false;
                }
                //alert(vardump(s[0]));
                //alert(s[0].get('henkeyi'));
                //alert(s[0].get('parnamc'));
                //alert(s[0].get('nmrcodc'));
		        addNewTabAux("todo-tab-panel", "frmCargaHojaEnsayo", "Cargar Hoja de Ensayo",s[0]);
                //Ext.Msg.alert("Mensaje de EQUAS.", "Hoja Cargada.");
            }
        }
        ,'-',frhe_txtBusPar
        ,'-',frhe_BtnFlt
        ,'-',frhe_BtnCanFlt,{ xtype: 'tbfill' },
        ,'-',{
            text: 'Exportar',
            handler: function() {

                var hiddenForm = Ext.create('Ext.form.Panel', {
                  title:'hiddenForm',
                  standardSubmit: true,
                  url: '/equas/app/src/generarReporte.php',
                  timeout: 120000,
                  height:0,
                  width: 0,
                  hidden:true,
                  items:[
                    {xtype:'hiddenField', name:'field1', value:'field1Value'}
                  ]
                });
                hiddenForm.getForm().submit();
            }
        }
        ,'-',{
            text: 'Actualizar',
            handler: function() {
                Ext.getCmp('frhe_txtBusPar').reset();
                frhe_StrPrm.load();    
                frhe_RegPnl.hide();
            }
        }
    ],
    dockedItems: [{    
        xtype: 'pagingtoolbar',
        store: frhe_StrPrm,
        dock: 'bottom',
        displayInfo: true
    }]
});
