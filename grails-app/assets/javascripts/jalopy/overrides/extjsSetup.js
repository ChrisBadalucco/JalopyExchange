Ext.Loader.setConfig({
    enabled : true,
    disableCaching : true,
    disableCachingParam : 'dc'
});

Ext.override(Ext.data.Connection, {
    disableCaching : true,
    disableCachingParam : 'dc'
});

Ext.override(Ext.data.proxy.Ajax, {
    disableCaching : true,
    disableCachingParam : 'dc'
});

Ext.override(Ext.window.Window, {
    modal : true
});

Ext.define('Jalopy.overrides.Overrides', {
    update : function(response) {
        if (response.responseText) {
            if(response.status === 401 || (response.responseText.indexOf('j_username') >= 0 && response.responseText.indexOf('j_password') >= 0)) {
                Ext.Msg.alert('Timeout', 'You have been logged out.', function() {
                    window.location = 'j_spring_security_logout';
                }, this);
            } else {
                var json = Ext.decode(response.responseText, true);

                if (json && json.success === false) {
                    if (Ext.isEmpty(json.message) === false) {
                        Ext.Msg.alert('Error', json.message);
                    } else {
                        Ext.Msg.alert('Error', 'Application Error Occurred. Please contact Jalopy Exchange for more details.');
                    }
                }
            }
        }
    }
});

Jalopy.overrides = Ext.create('Jalopy.overrides.Overrides');

Ext.Ajax.on('requestexception', function(conn, response, requestOpts, listenerOpts) {
   Jalopy.overrides.update(response);
});

Ext.Ajax.on('requestcomplete', function(conn, response, requestOpts, listenerOpts) {
    Jalopy.overrides.update(response);
});