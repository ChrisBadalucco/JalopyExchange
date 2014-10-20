Ext.define('Jalopy.view.listing.Listings', {
    extend : 'Ext.grid.Panel',
    xtype : 'listing',
    requires : [ 'Jalopy.view.listing.ListingViewController' ],
    controller : 'listingViewController',

    title : 'Listings',
    reference : 'listingGrid',
    itemId : 'listingGrid',
    store : 'Listing',
    tbar :  {
        xtype: 'button',
        reference : 'addListingBtn',
        text: 'Add',
        listeners: {
            click: function() {
                Ext.widget('addlistingdlg').show();
            }
        }
    },
    columns : [ {
        text : 'ID',
        dataIndex : 'id'
    }, {
        text : 'Seller',
        dataIndex : 'seller'
    }, {
        text : 'Asking Price',
        dataIndex : 'askingPrice'
    }, {
        text : 'Start Date',
        dataIndex : 'dateCreated'
    }, {
        text : 'End Date',
        dataIndex : 'endDate'
    } ]
});