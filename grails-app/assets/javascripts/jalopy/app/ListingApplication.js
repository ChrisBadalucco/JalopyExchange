Ext.define('Jalopy.app.ListingApplication', {
    extend : 'Ext.app.Application',

    appProperty : 'listing',
    paths : {
        'Ext' : '.'
    },
    views : [ 'Jalopy.common.view.JalopyCombo', 'listing.PurchaseDlg' ],
    stores : [ 'Listing', 'filters.Seller', 'filters.AutomobileFilter' ],

    launch : function() {
        console.log('listing app launched');
    }
});