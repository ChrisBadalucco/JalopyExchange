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

Ext.override(Ext.window.Window, {
    modal : true
});

Ext.define('Jalopy.overrides.Overrides', {
    update : function(response) {
        /*if (response.status === 401) {
            Ext.widget('window', {

                title: 'You must be logged in to perform this action',
                closable: true,
                autoShow: true,

                items: [{
                    xtype: 'form',
                    defaults : { padding: 10 },
                    reference: 'form',
                    items: [{
                        xtype: 'textfield',
                        name: 'j_username',
                        fieldLabel: 'Username',
                        allowBlank: false
                    }, {
                        xtype: 'textfield',
                        name: 'j_password',
                        inputType: 'password',
                        fieldLabel: 'Password',
                        allowBlank: false
                    }, {
                        xtype: 'displayfield',
                        hideEmptyLabel: false,
                        value: 'Enter any non-blank password'
                    }, {
                        xtype: 'checkboxfield',
                        name: 'remember_me',
                        boxLabel: 'Remember Me'
                    }],
                    buttons: [{
                        text: 'Login',
                        formBind: true,
                        listeners: {
                            click: function(btn){

                                // This would be the ideal location to verify the user's credentials via
                                // a server-side lookup. We'll just move forward for the sake of this example.
                                var form = btn.up('form').getForm();
                                if (form.isValid()) {
                                    form.submit({
                                        url: 'j_spring_security_check',
                                        success: function(form, action) {
                                            Ext.Msg.alert('Success', 'You are now logged in.');
                                        },
                                        failure: function(form, action) {
                                            switch (action.failureType) {
                                                case Ext.form.action.Action.CLIENT_INVALID:
                                                    Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
                                                    break;
                                                case Ext.form.action.Action.CONNECT_FAILURE:
                                                    Ext.Msg.alert('Failure', 'Ajax communication failed');
                                                    break;
                                                case Ext.form.action.Action.SERVER_INVALID:
                                                    Ext.Msg.alert('Failure', action.result.msg);
                                            }
                                        }
                                    });
                                    // Remove Login Window
                                    btn.up('window').close();
                                }
                            }
                        }
                    }]
                }]

            });
        } else */if (response.responseText) {
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