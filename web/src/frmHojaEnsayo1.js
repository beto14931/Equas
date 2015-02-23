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
Ext.define('frhe_CmbMdlTpa', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'parkeyi', type: 'int'},
        {name:'parnamc', type: 'string'}
    ]
});
pars = new Object();
pars.tabla='Parametro';
pars.combo = '%';
/*
pars.tabla='Parametro';
pars.combo='%';*/
var frhe_CmbStrTpa = Ext.create('Ext.data.Store', {
    model:'frhe_CmbMdlTpa',
    autoload: true,
    proxy: {        
        type: 'ajax',
        startParam:false,
        limitParam:false,
        noCache:false,
        pageParam:false,
        url: 'app/src/ejecutarProcedimiento.php',        
        extraParams: {
            'procedimiento': 'cargaParametro',
            'parametros': Ext.encode(pars)            
        }, 
        reader: {
            type: 'json', 
            root: 'results',
            totalProperty: 'rows'
        }        
    }
});

var frhe_DtpTpa = new Ext.form.ComboBox({
    fieldLabel: 'Parametro',
    name:'frhe_DtpTpa',
    id:'frhe_DtpTpa',
    store: frhe_CmbStrTpa,
    mode: 'local',
    displayField: 'parnamc',
    valueField: 'parkeyi'
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
        },{   
            fieldLabel: 'N° Lote',
            name: 'frhe_DtpNom',
            id: 'frhe_DtpNom',
            xtype: 'textfield',
            editable:false,
            labelWidth: 120
        },
            frhe_DtpTpa
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
    items: [ frhe_DtpFds],
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
        {name: 'hekeyi'},
        {name: 'heparkey'},
        {name: 'helotkeyi'},
        {name: 'heparplant'},
        {name: 'hesysfecd'},
        {name: 'hesysusrc'},
        {name: 'hesysvigi'}
    ]
});

var pars = new Object();
pars.nombre = '%';
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
            'procedimiento': 'consultarHojaEnsayo',
            'parametros': Ext.encode(pars)
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
        {text: "IDHe", dataIndex: "hekeyi",width:60,hidden:true},
        {text: "N° Lote", dataIndex: "helotkeyi", flex:1},
        {text: "Parámetro", dataIndex: "heparkey", flex:1},
        {text: "Fec. Creación", dataIndex: "hesysfecd"},
        {text: "Hora Creación", dataIndex: "hesysfecd"},
        {text: "Usuario", dataIndex: "hesysusrc", flex:3}
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
            frp_RegPnl.show(); 
            Ext.getCmp('frhe_DtpId').setValue(record.get('hekeyi'));
            Ext.getCmp('frhe_DtpNom').setValue(record.get('hekeyi'));       
            Ext.getCmp('frhe_DtpAra').setValue(record.get('hekeyi'));  
            Ext.getCmp('frhe_DtpTpa').setValue(record.get('hekeyi'));     
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
        pars = new Object();
        pars.nombre=Ext.getCmp('frhe_txtBusPar').getValue();
        frhe_StrPrm.load({
            params:{
                'procedimiento': 'consultarParametro',
                'parametros': Ext.encode(pars)
            }
        });
    }
});

var frhe_BtnCanFlt = Ext.create('Ext.Action', {
    id: 'frhe_BtnCanFlt',
    text: '',
    iconCls: 'filtro_quitar',
    handler: function(){
        Ext.getCmp('frhe_txtBusPar').reset();
        pars = new Object();        
        pars.nombre='%';
        frhe_StrPrm.load({
            params:{
                'procedimiento': 'consultarParametro',
                'parametros': Ext.encode(pars)
            }
        });
    }
});

Ext.create('Ext.form.Panel', {
    name:'frmHojaEnsayo1',
    id:'frmHojaEnsayo1',
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
                    Ext.getCmp('frhe_DtpNom').focus();
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
                    fhe_procedimiento='guardarHojaEnsayo';
                } else{
                    pars.ide=Ext.getCmp('frhe_DtpId').getValue();                
                    fhe_procedimiento='actualizarHojaEnsayo';
                };
                /*
                pars.parametro=Ext.getCmp('frhe_DtpNom').getValue();
                pars.lote=Ext.getCmp('frhe_DtpNom').getValue();
                pars.plantilla=Ext.getCmp('frhe_DtpTpa').getValue();
                */
                pars.parametro=1;
                pars.lote=2;
                pars.plantilla=3;
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
                        frhe_RegPnl.load();
                        Ext.Msg.alert('Mensaje de EQUAS:', 'Se actualizó correctamente.');
                
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

                Ext.Msg.alert("Mensaje de EQUAS.", "Hoja Cargada.");
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
