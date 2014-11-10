Ext.define('Jalopy.app.ListingApplication', {
    extend : 'Ext.app.Application',

    appProperty : 'listing',
    paths : {
        'Ext' : '.'
    },
    views : [ 'login.LoginDlg', 'listing.AddListingDlg'],
    stores : [ 'Listing', 'Automobile' ],

    launch : function() {
        console.log('listing app launched');
    }
});