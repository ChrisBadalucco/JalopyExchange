Ext.Loader.setConfig({
    enabled : true,
    disableCaching : true,
    disableCachingParam : 'dc'
});

Ext.override(Ext.data.Connection, {
//    timeout : 900000,
    disableCaching : true,
    disableCachingParam : 'dc'
});

Ext.override(Ext.data.proxy.Ajax, {
//    timeout : 900000,
    disableCaching : true,
    disableCachingParam : 'dc'
});

Ext.define('Jalopy.overrides.Overrides', {
    update : function(responseText) {
        if (responseText) {
            var json = Ext.decode(responseText, true);

            if (json || !json.success) {
                if (json && json.message) {
                    Ext.Msg.alert('Error', json.message);
                } else {
                    Ext.Msg.alert('Error', 'Application Error Occurred. Please contact Jalopy Exchange for more details.');
                }
            }
        }
    }
});

Jalopy.Overrides = Ext.create('Jalopy.overrides.Overrides');

Ext.Ajax.on('requestexception', function(conn, response, requestOpts, listenerOpts) {
   Jalopy.Overrides.update(response.responseText);
});
//
//Ext.Ajax.on('requestcomplete', function(conn, response, requestOpts, listenerOpts) {
//    Jalopy.Overrides.update(response.responseText);
//});