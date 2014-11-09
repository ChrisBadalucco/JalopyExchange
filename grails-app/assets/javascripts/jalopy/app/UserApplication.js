Ext.define('Jalopy.app.UserApplication', {
    extend : 'Ext.app.Application',

    appProperty : 'user',
    paths : {
        'Ext' : '.'
    },
    stores : [ 'User' ],

    launch : function() {
        console.log('user app launched');
    }
});