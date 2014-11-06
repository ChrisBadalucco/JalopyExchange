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
            margin : 2,
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
            dataIndex : 'askingPrice',
            formatter : 'usMoney'
        }, {
            xtype: 'datecolumn',
            text : 'Start Date',
            dataIndex : 'startDate',
            format: 'm/d/Y'
        }, {
            xtype: 'datecolumn',
            text : 'End Date',
            dataIndex : 'endDate',
            format: 'm/d/Y'
        }, {
            xtype: 'datecolumn',
            text : 'Last Updated',
            dataIndex : 'lastUpdated',
            format: 'm/d/Y'
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