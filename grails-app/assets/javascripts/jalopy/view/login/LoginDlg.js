Ext.define("Jalopy.view.login.LoginDlg",{
    extend: 'Ext.window.Window',
    xtype: 'login',

    requires: [ 'Jalopy.view.login.LoginViewController' ],

    controller: 'loginViewController',
    title: 'Login',
    autoShow: true,

    items: {
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
                click: 'onLoginClick'
            }
        }]
    }
});