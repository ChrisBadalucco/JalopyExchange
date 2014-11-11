Ext.define('Jalopy.view.listing.Listings', {
    extend : 'Jalopy.common.view.Container',
    xtype : 'listingscreen',
    requires : [ 'Jalopy.view.listing.ListingViewController' ],
    controller : 'listingViewController',

    initComponent : function() {
        this.subTitle = 'Listings',
        this.content = this.buildListingsGrid();
        this.callParent();
    },

    buildListingsGrid : function() {
        var dockedItems = [{
            xtype: 'toolbar',
//            style : 'backgroundColor: #157fcc',
            dock: 'top',
            items: [ {
                xtype: 'button',
                margin : 2,
                itemId : 'createListingBtn',
                text: 'Create Listing',
                listeners: {
                    click: function() {
                        Ext.widget('addlistingdlg');
                    }
                }
            } ]
        }];

        var tbar =  [ {

        } ];

        var columns = [ {
            text : 'ID',
            dataIndex : 'id'
        }, {
            text : 'Year',
            dataIndex : 'autoYear'
        }, {
            text : 'Make',
            dataIndex : 'autoMake'
        }, {
            text : 'Model',
            dataIndex : 'autoModel'
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

        if (JE.ADMIN) {
            var actionCol = {
                xtype : 'actioncolumn',
                text : 'Delete',
                fixed : 'true',
                sortable : false,
                width : 75,
                items : [ {
                    iconCls : 'icon-delete',
                    tooltip : 'Delete listing',
                    handler : function(grid, rowIdx, colIdx) {
                        var store = grid.getStore();
                        var rec = store.getAt(rowIdx);
                        Ext.Msg.confirm('Confirm Delete', 'Are you sure you want to delete the selected listing?', function(btn) {
                            if (btn === 'yes') {
                                store.remove(rec);
                                store.sync({
                                    success : function() {
                                        Ext.Msg.alert('Success', 'Delete was successful.');
                                    },
                                    failure : function() {
                                        store.rejectChanges();
                                    }
                                });
                            }
                        });
                    }
                } ]
            };

            columns.push(actionCol)
        }

        return {
            xtype : 'grid',
            dockedItems: dockedItems,
            columns : columns,
            reference : 'listingGrid',
            itemId : 'listingGrid',
            store : 'Listing'
        }
    }
});