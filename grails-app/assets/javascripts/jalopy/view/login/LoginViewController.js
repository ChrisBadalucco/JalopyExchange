Ext.define('Jalopy.view.login.LoginViewController', {
    extend: 'Ext.app.ViewController',
    alias : 'controller.loginViewController',

    onLoginClick: function(btn){

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
});