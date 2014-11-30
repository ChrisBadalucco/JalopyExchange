Ext.define('Jalopy.app.AccountApplication', {
    extend : 'Ext.app.Application',

    appProperty : 'myaccount',
    paths : {
        'Ext' : '.'
    },
    views : [ 'Jalopy.common.view.JalopyCombo', 'account.AddAutoDlg', 'account.AddListingDlg' ],
    stores : [ 'User', 'Automobile', 'AutomobileListing', 'Listing' ],

    launch : function() {
        console.log('myaccount app launched');
    }
});