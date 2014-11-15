Ext.define('Jalopy.app.AccountApplication', {
    extend : 'Ext.app.Application',

    appProperty : 'myaccount',
    paths : {
        'Ext' : '.'
    },
    views : [ 'account.AddAutoDlg' ],
    stores : [ 'User', 'UserAutomobile', 'UserListing' ],

    launch : function() {
        console.log('myaccount app launched');
    }
});