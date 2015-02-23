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
*/

var fvl_MdlLot = Ext.regModel('fvl_MdlLot', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'lotcodc'},
        {name: 'lotresd'},
        {name: 'lotingd'},        
        {name: 'loteslc'}
    ]
});

var pars = new Object();
pars.numres = 10;
var fvl_StrLot = null;
fvl_StrLot = new Ext.data.Store({
    id:'fvl_StrLot',
    storeId: 'fvl_StrLot',
    model: fvl_MdlLot,
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
            'procedimiento': 'consultarLotesReserva',
            'parametros': Ext.encode(pars)
        }, 
        reader: {
            type: 'json', 
            root: 'results',
            totalProperty: 'rows'
        }
    }
});

var sm = new Ext.selection.CheckboxModel({
    checkOnly: true
});

var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 1
});

function formatDate(val) {
    if (typeof val == 'object') {
        val = Ext.util.Format.date(val, 'd/m/Y');
    }
    return val;
}

var fvl_GrdLot = new Ext.grid.GridPanel({
    id:'fvl_GrdLot',
    header: false,
    selModel : sm,
    store: fvl_StrLot,
    plugins: [ cellEditing ],
    columns: [
        {   
            xtype: "rownumberer", width:30 
        },{
            text: "Número de Lote",
            dataIndex: "lotcodc",
            width:120
        },{
            text: "Fecha de reserva", 
            dataIndex: "lotresd", 
            width:160, 
            renderer: formatDate
        },{
            text: "Fecha de ingreso", 
            dataIndex: "lotingd", 
            width:160, 
            renderer: formatDate, 
            field: {
                xtype: 'datefield',
                format: 'd/m/Y',
                disabledDays: [0, 6],
                submitFormat: 'Y-m-d H:i:s',
                disabledDaysText: 'No se permite el registro dias feriados.'
            } 
        }, 
        { text: "Estado del lote", dataIndex: "loteslc", width:120 }
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
            
        }
    }
});

var fvl_ResPnl = Ext.create('Ext.panel.Panel',{
    layout: 'fit',
    //region: 'center',
    autoScroll: true,
    frame: false,
    border: false,
    items: [
        fvl_GrdLot
    ]
});

Ext.create('Ext.form.Panel', {
    title: 'Reservar Lote',    
    layout:'fit',
    id:'frmReservarLote',
    itemId: 'frmReservarLote',
    closable: true,
    autoScroll:true,
    border: false,
    bodyStyle: 'padding: 0px;',
    items: [
        fvl_ResPnl
    ],
    listeners: {
        afterrender: function(){

        }
    },
    tbar:[{
        text: 'Reservar',
        //iconCls: 'cargar_archivo',
        handler: function() {
            var s = fvl_GrdLot.getSelectionModel().getSelection();
            
            if (isempty(s)) {
                Ext.Msg.alert("Mensaje de EQUAS.", "Debe seleccionar un lote para reservar.");
                return false;
            }

            var l_cntnot = 0;
            Ext.each(s, function (item) {
                if (isempty(item.data.lotingd) || (item.data.lotingd === '00/00/0000')) {
                    l_cntnot++;
                }
            });
            if (l_cntnot > 0) {
                Ext.Msg.alert("Mensaje de EQUAS.", "Debe elegir la fecha de ingreso.");
                return false;
            }

            Ext.each(s, function (item) {

                pars = new Object();
                pars.lotcodc = item.data.lotcodc;
                pars.lotingd = item.data.lotingd;

                Ext.Ajax.request({
                    url: 'app/src/ejecutarProcedimiento.php',
                    method: 'GET',
                    async:false,
                    params : {
                        'procedimiento': 'reservarLote',
                        'parametros': Ext.encode(pars)
                    },
                    success: function(response, request){
                        var resobj = Ext.decode(response.responseText);
                        if (resobj.status == false) {
                            return false;
                        } else {
                            Ext.Msg.alert("Mensaje de EQUAS.", "Se ha reservado el lote.");                            
                        }

                    },
                    failure : function(response, request){
                        Ext.Msg.alert("Mensaje de WKBOOK.", "Hubo errores en el proceso.");
                        return false;
                    }                    
                });

            });

            var pars = new Object();
            pars.numres = 10;
            fvl_StrLot.load({
                params:{
                    'procedimiento': 'consultarLotesReserva',
                    'parametros': Ext.encode(pars)
                }
            });

        }
    },{ 
        xtype: 'tbfill' 
    },{
            text: 'Actualizar',
            handler: function() {
                var pars = new Object();
                pars.numres = 10;
                fvl_StrLot.load({
                    params:{
                        'procedimiento': 'consultarLotesReserva',
                        'parametros'   : Ext.encode(pars)
                    }
                });
            }
    }]
});