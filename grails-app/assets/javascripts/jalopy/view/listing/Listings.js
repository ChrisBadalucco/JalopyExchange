Ext.define('Jalopy.view.listing.Listings', {
    extend : 'Jalopy.common.view.Container',
    xtype : 'listing',
    requires : [ 'Jalopy.view.listing.ListingViewController' ],
    controller : 'listingViewController',

    initComponent : function() {
        this.subTitle = 'Listings',
        this.content = this.buildListingsGrid();
        this.callParent();
    },

    buildListingsGrid : function() {
        var tbar =  [{
            xtype: 'button',
            reference : 'addListingBtn',
            text: 'Add',
            listeners: {
                click: function() {
                    Ext.widget('addlistingdlg');
                }
            }
        }];

        var columns = [ {
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
        }, {
            text : 'Last Updated',
            dataIndex : 'lastUpdated'
        } ];

        return {
            xtype : 'grid',
            tbar : tbar,
            columns : columns,
            reference : 'listingGrid',
            itemId : 'listingGrid',
            store : 'Listing'
        }
    }

});