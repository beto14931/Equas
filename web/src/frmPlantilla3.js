
//var el = Ext.get('par1'); // get the LOG

//var valor;
//valor=<?php echo $_GET['par1']; ?>;
//alert(valor);
/*
function getVarsUrl(){
	alert('url:'+location);
    var url= location.search.replace("?", "");
    var arrUrl = url.split("&");
    var urlObj={}; 
    alert('len'+arrUrl.length);
    for(var i=0; i<arrUrl.length; i++){
        var x= arrUrl[i].split("=");
        alert('i:'+i);
        alert('x[0]'+x[0]);
        alert('x[1]'+x[1]);
        urlObj[x[0]]=x[1]
    }
    return urlObj;
}

*/
//var misVariablesGet = getVarsUrl();

//var el = $_GET("par1");
//alert(el);
//var el1 = $_GET("par2");
//alert(el1);
//alert(misVariablesGet.par1);
//alert(vardump(misVariablesGet.par1));
//var msgBox = Ext.get('par2');
//alert(msgBox);

//alert(MyHenData.ghenid+'/'+MyHenData.gparnamc+'/'+MyHenData.gnmrcodc);

Ext.create('Ext.form.Panel', {
    title: 'Llenar Hoja de Ensayo(frmPlantilla3)',    
    name:'frmPlantilla3',
    id:'frmPlantilla3',
    itemId:'frmPlantilla3',
    layout: 'border',
    closable: true,
    frame: true
});
