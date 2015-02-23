/*
    **NOMENCLATURA**
    frp - formulario registro parametros
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

var fbl_SlfNrl = Ext.create('Ext.form.field.Text', {
    fieldLabel: 'Nro. de Lote',
    name: 'fbl_SlfNrl',
    id: 'fbl_SlfNrl',
    emptyText: '(Ninguno)'
});

var fbl_SlfFrd = Ext.create('Ext.form.DateField', {
    fieldLabel: 'Fecha Recep. Desde',
    labelWidth: 120,
    name: 'fbl_SlfFrd',
    id: 'fbl_SlfFrd',
    format: 'd/m/Y',
    emptyText: '(Ninguno)'
});

var fbl_SlfFrh = Ext.create('Ext.form.DateField', {
    fieldLabel: 'Fecha Recep. Hasta',
    labelWidth: 120,    
    name: 'fbl_SlfFrh',
    id: 'fbl_SlfFrh',
    format: 'd/m/Y',
    emptyText: '(Ninguno)'
});

var fbl_SlfCli = generarCombobox('Cliente', 'fbl_SlfCli', 'consultarCliente', { filtro: '%' }, 'hetero');
fbl_SlfCli.setWidth(350);

var fbl_FrmSlf = {
    xtype:'fieldset',        
    title: 'Seleccionar filtro',
    region: 'north',
    padding: 10,
    defaults: {
        //xtype: 'panel',
        //flex: 1,
        //layout: 'form',
        margins: '0 0 0 20'
    },
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 80
        //msgTarget: 'side'
    },        
    layout: 'hbox',
    items :[
        fbl_SlfNrl,
        fbl_SlfFrd,
        fbl_SlfFrh,
        fbl_SlfCli
    ]
};

var fbl_MdlLot = Ext.regModel('fbl_MdlLot', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'lotkeyi'},
        {name: 'lotcodc'},
        {name: 'lotclic'},
        {name: 'lotpryc'},
        {name: 'lotproc'},
        {name: 'lotfecd'},
        {name: 'lotresc'},
        {name: 'loteslc'}
    ]
});

var pars = new Object();
pars.lotcodc = '%';
pars.lotfecd = '(Ninguno)';
pars.lotfech = '(Ninguno)';
pars.lotclic = '%';
var fbl_StrTpm = null;
fbl_StrLot = new Ext.data.Store({
    id:'fbl_StrLot',
    storeId: 'fbl_StrLot',
    model: fbl_MdlLot,
    autoLoad: true,
    pageSize: 100,    
    proxy: {
        type: 'ajax',
        url : 'app/src/ejecutarProcedimiento.php',
        extraParams: {
            'procedimiento': 'consultarLotesFiltro',
            'parametros': Ext.encode(pars)
        }, 
        reader: {
            type: 'json', 
            root: 'results',
            totalProperty: 'rows'
        }
    }
});

var fbl_GrdLot = new Ext.grid.GridPanel({
    id:'fbl_GrdLot',
    header: false,
    region: 'center',
    //padding: '0 10 10 10',
    store: fbl_StrLot, 
    columns: [
        { xtype: 'rownumberer', width:30 },
        { text: "Id lot.", dataIndex: "lotkeyi", hidden:true },
        { text: "Codigo", dataIndex: "lotcodc", width: 80 },
        { text: "Cliente", dataIndex: "lotclic", flex: 2 },
        { text: "Proyecto", dataIndex: "lotpryc", flex:2 },
        { text: "Fecha recepción", dataIndex: "lotfecd" },
        { text: "Responsable muestreo", dataIndex: "lotresc" },
        { text: "Estado lote", dataIndex: "loteslc" }
    ],
    viewConfig: {
        forceFit: true,
        emptyText: 'No se encontraron registros.',
        stripeRows: false
    },
    iconCls: 'icon-grid',
    listeners: {
        beforeitemcontextmenu:  function(view,record,item, index, e){
          e.stopEvent();
        },
        beforeitemclick: function(dv, record, item, index, e) {
        },
        beforeitemdblclick: function(dv, record, item, index, e) {
            /*fbl_RegPnl.show(); */            
        }
    }
});

/*PANEL PRINCIPAL*/
var fbl_BtnFltLot = Ext.create('Ext.Action', {
    id: 'fbl_BtnFltLot',
    text: 'Buscar',
    iconCls: 'filtro',
    handler: function(){
        var pars = new Object();
        if (isempty(Ext.getCmp('fbl_SlfNrl').getValue())) {
            pars.lotcodc = '(Ninguno)';
        } else {
            pars.lotcodc = Ext.getCmp('fbl_SlfNrl').getValue();
        }

        if (isempty(Ext.getCmp('fbl_SlfFrd').getValue())) {
            pars.lotfecd = '(Ninguno)';
        } else {
            pars.lotfecd = Ext.getCmp('fbl_SlfFrd').getValue();
        }

        if (isempty(Ext.getCmp('fbl_SlfFrh').getValue())) {
            pars.lotfech = '(Ninguno)';
        } else {
            pars.lotfech = Ext.getCmp('fbl_SlfFrh').getValue();
        }

        if (Ext.getCmp('fbl_SlfCli').getValue() != '(Ninguno)') {
            pars.lotclic = Ext.getCmp('fbl_SlfCli').getValue();
        } else {
            pars.lotclic = '(Ninguno)';
        }

        fbl_StrLot.load({
            params:{
                'procedimiento': 'consultarLotesFiltro',
                'parametros': Ext.encode(pars)
            }
        });
    }
});

var fbl_BtnCanFltLot = Ext.create('Ext.Action', {
    id: 'fbl_BtnCanFltLot',
    text: 'Limpiar',
    iconCls: 'filtro_quitar',
    handler: function(){

        Ext.getCmp('fbl_SlfNrl').setValue('');
        Ext.getCmp('fbl_SlfFrd').setValue('');
        Ext.getCmp('fbl_SlfFrh').setValue('');
        Ext.getCmp('fbl_SlfCli').setValue('');

        var pars = new Object();
        pars.lotcodc = '(Ninguno)';
        pars.lotfecd = '(Ninguno)';
        pars.lotfech = '(Ninguno)';
        pars.lotclic = '(Ninguno)';

        fbl_StrLot.load({
            params:{
                'procedimiento': 'consultarLotesFiltro',
                'parametros': Ext.encode(pars)
            }
        });
    }
});

Ext.create('Ext.form.Panel', {
    title: 'Buscar lote',
    name:'frmBuscarLote',
    id:'frmBuscarLote',
    itemId: 'frmBuscarLote',
    layout: 'border',
    closable: true,
    frame: false,
    items: [
            fbl_FrmSlf,
            fbl_GrdLot
    ],
    tbar:[{
    id: 'fbl_id_car',
        text: 'Cargar',
        handler: function() {
            sLots = fbl_GrdLot.getSelectionModel().getSelection();

            if (isempty(sLots)) {
                Ext.Msg.alert("Mensaje de EQUAS.", "Seleccione el lote que desea cargar.");
                return false;
            }

            Ext.each(sLots, function (itemLot) {
                var pars = new Object();
                pars.lotkeyi = itemLot.data.lotkeyi;

                Ext.Ajax.request({
                    url: 'app/src/ejecutarProcedimiento.php',
                    method: 'GET',
                    async: false,
                    params : {
                        'procedimiento': 'obtenerLote',
                        'parametros': Ext.encode(pars)
                    },            
                    success: function(response, request){

                        var resobj = Ext.decode(response.responseText);
                        if (resobj.status == false) {
                            return false;
                        }
                        
                        var item = resobj.results[0];

                        Todoclass.Global.lotkeyi = item.lotkeyi;
                        Todoclass.Global.lotcodc = item.lotcodc;
                        Todoclass.Global.lotespc = item.lotespc;
                        Todoclass.Global.loteslc = item.loteslc;
                        Todoclass.Global.lotobsc = item.lotobsc;
                        Todoclass.Global.clirucc = item.clirucc;
                        Todoclass.Global.clirazc = item.clirazc;

                        Todoclass.Global.lotprcc = item.lotprcc;
                        Todoclass.Global.lotresc = item.lotresc;
                        Todoclass.Global.lotpryc = item.lotpryc;
                        Todoclass.Global.lotproc = item.lotproc;
                        Todoclass.Global.lotptec = item.lotptec;
                        Todoclass.Global.lotcmtc = item.lotcmtc;
                        Todoclass.Global.lotfecd = item.lotfecd;
                        Todoclass.Global.lotrdcd = item.lotrdcd;
                        Todoclass.Global.lotingd = item.lotingd;
                        Todoclass.Global.lotrlmd = item.lotrlmd;
                        Todoclass.Global.lotfded = item.lotfded;

                        addNewTab("todo-tab-panel", "frmRegistrarLote", "1. Registro de Lote");                        

                    },
                    failure : function(response, request){
                        Ext.Msg.alert("Mensaje de EQUAS.", "Hubo algún error en el proceso.");
                        return false;
                    }
                });
            });                            
        }
    }
    ,'-',fbl_BtnFltLot
    ,'-',fbl_BtnCanFltLot,{ xtype: 'tbfill' },
    ,'-',{
        text: 'Exportar',
        handler: function() {

        }
    }
    ,'-',{
        text: 'Actualizar',
        handler: function() {       
            var pars = new Object();
            pars.lotcodc = '(Ninguno)';
            pars.lotfecd = '(Ninguno)';
            pars.lotfech = '(Ninguno)';
            pars.lotclic = '(Ninguno)';

            fbl_StrLot.load({
                params:{
                    'procedimiento': 'consultarLotesFiltro',
                    'parametros': Ext.encode(pars)
                }
            });
        }
    }],
    dockedItems: [{    
        xtype: 'pagingtoolbar',
        store: fbl_StrLot,
        dock: 'bottom',
        displayInfo: true
    }]
});
