Ext.define('Jalopy.view.listing.Listings', {
    extend : 'Jalopy.common.view.Container',
    xtype : 'listingscreen',
    requires : [ 'Jalopy.view.listing.ListingViewController' ],
    controller : 'listingViewController',

    initComponent : function() {
        this.subTitle = 'Listings';
        this.content = this.buildListingsGrid();
        this.callParent();
    },

//    buildListingsToolbar : function() {
//        var create = {
//            xtype: 'button',
//            margin : 2,
//            itemId : 'createListingBtn',
//            text: 'Create Listing',
//            listeners: {
//                click: function() {
//                    Ext.widget('addlistingdlg');
//                }
//            }
//        };
//
//        var search = {
//            xtype : 'button',
//            text : 'Search',
//            iconCls : 'icon-magnifier',
//            reference : 'searchBtn',
//            listeners : { click : 'onClickSearch' }
//        };
//
//        var defaults = {
//            labelWidth : 140,
//            labelAlign : 'right',
//            width : 240,
//            margin : '0 10 0 0'
//        };
//
//        var status = {
//            xtype : 'combo',
//            fieldLabel : 'Status',
//            allowBlank : true,
//            forceSelection : true,
//            store : [ '', 'Active', 'Ended' ],
//            name : 'status'
//        };
//
//        var endDate = {
//            xtype : 'datefield',
//            width : 200,
//            fieldLabel : 'End Date',
//            name : 'endDate'
//        };
//        Ext.apply(endDate, defaults);
//
//        var seller = {
//            xtype : 'jalopycombo',
//            fieldLabel : 'Seller',
//            store : 'filters.Seller',
//            name : 'seller'
//        };
//        Ext.apply(seller, defaults);
//
//        var filter = {
//            xtype : 'form',
//            border : false,
//            margin : '0 0 5 0',
//            layout : 'hbox',
//            items : [ status, endDate, seller, search ]
//        };
//
//        return [ create, '->', filter ];
//    },

    buildListingsGrid : function() {
        var create = {
            xtype: 'button',
            margin : 2,
            itemId : 'createListingBtn',
            text: 'Create Listing',
            iconCls : 'icon-add',
            listeners: {
                click: function() {
                    Ext.widget('addlistingdlg');
                }
            }
        };

        var search = {
            xtype : 'button',
            text : 'Search',
            iconCls : 'icon-magnifier',
            reference : 'searchBtn',
            margin : '0 5 0 0',
            listeners : { click : 'onClickSearch' }
        };

        var defaults = {
            labelWidth : 80,
            labelAlign : 'right',
            width : 200,
            margin : '0 10 0 0',
            emptyText : 'All'
        };

        var status = {
            xtype : 'combo',
            fieldLabel : 'Status',
            allowBlank : true,
            forceSelection : true,
            store : [ '', 'Active', 'Ended' ],
            name : 'status'
        };
        Ext.apply(status, defaults);

        var endDate = {
            xtype : 'datefield',
            width : 200,
            fieldLabel : 'End Date',
            name : 'endDate'
        };
        Ext.apply(endDate, defaults);

        var seller = {
            xtype : 'jalopycombo',
            fieldLabel : 'Seller',
            store : 'filters.Seller',
            name : 'seller'
        };
        Ext.apply(seller, defaults);

        var filter = {
            xtype : 'form',
            border : false,
            layout : 'hbox',
            items : [ status, endDate, seller, search ]
        };

        var dockedItems = [ create, '->', filter ];

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
//            title : 'Automobile Listings',
//            tbar : tbar,
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                padding : 2,
                autoScroll : true,
                items: dockedItems
            }],
            columns : columns,
            reference : 'listingGrid',
            itemId : 'listingGrid',
            store : 'Listing'
        }
    }
});