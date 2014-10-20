Ext.define('Jalopy.app.ListingApplication', {
    extend : 'Ext.app.Application',

    appProperty : 'listing',
    paths : {
        'Ext' : '.'
    },
    views : [ 'listing.AddListingDlg'],
    stores : [ 'Listing' ],

    launch : function() {
        console.log('listing app launched');
    }
});