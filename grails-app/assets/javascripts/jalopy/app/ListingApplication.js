Ext.define('Jalopy.app.ListingApplication', {
    extend : 'Ext.app.Application',

    appProperty : 'listing',
    paths : {
        'Ext' : '.'
    },
    views : [ /*'listing.AddListingDlg',*/ 'Jalopy.common.view.JalopyCombo' ],
    stores : [ 'Listing', 'UserAutomobile', 'filters.Seller' ],

    launch : function() {
        console.log('listing app launched');
    }
});