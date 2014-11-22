Ext.define('Jalopy.app.AccountApplication', {
    extend : 'Ext.app.Application',

    appProperty : 'myaccount',
    paths : {
        'Ext' : '.'
    },
    views : [ 'Jalopy.common.view.JalopyCombo', 'account.AddAutoDlg', 'account.AddListingDlg' ],
    stores : [ 'User', 'UserAutomobile', 'UserListing' ],

    launch : function() {
        console.log('myaccount app launched');
    }
});