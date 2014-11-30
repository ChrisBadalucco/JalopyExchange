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

    buildListingsGrid : function() {
        var search = {
            xtype : 'button',
            text : 'Search',
            iconCls : 'icon-magnifier',
            reference : 'searchBtn',
            margin : '0 5 0 0',
            listeners : { click : 'onClickSearch' }
        };

        var defaults = {
            labelAlign : 'right',
            width : 200,
            margin : '0 10 0 0',
            emptyText : 'All'
        };

        var status = {
            xtype : 'combo',
            fieldLabel : 'Status',
            labelWidth : 40,
            allowBlank : true,
            typeAhead : true,
            queryMode : 'local',
            forceSelection : true,
            store : [
                [ null, 'All' ],
                [ true, 'Active' ],
                [ false, 'Closed' ]
            ],
            displayField : 'name',
            valueField : 'value',
            name : 'isActive'
        };
        Ext.apply(status, defaults);

        var make = {
            xtype : 'jalopycombo',
            labelWidth : 80,
            fieldLabel : 'Make',
            forceSelection : true,
            allowBlank : false,
            typeAhead : true,
            queryMode : 'local',
            store : 'filters.AutomobileFilter',
            displayField : 'make',
            valueField : 'make',
            name : 'make'
        };
        Ext.apply(make, defaults);

        var seller = {
            xtype : 'jalopycombo',
            labelWidth : 80,
            fieldLabel : 'Seller',
            forceSelection : true,
            allowBlank : false,
            typeAhead : true,
            queryMode : 'local',
            store : 'filters.Seller',
            displayField : 'username',
            valueField : 'id',
            name : 'seller'
        };
        Ext.apply(seller, defaults);

        var filterForm = {
            xtype : 'form',
            border : false,
            layout : 'hbox',
            reference : 'filterForm',
            items : [ status, make, seller, search ]
        };

        var purchase = {
            xtype : 'button',
            text : 'Purchase',
            iconCls : 'icon-money',
            disabled : true,
            reference : 'purchaseBtn',
            tooltip : 'Select an active listing',
            handler : 'onClickPurchaseBtn'
        };

        var dockedItems = [ filterForm ];
        if (!JE.ADMIN) {
            dockedItems.push('->', purchase);
        }

        var columns = [ {
            text : 'ID',
            dataIndex : 'id',
            hidden : true
        }, {
            text : 'Status',
            dataIndex : 'status'
        }, {
            text : 'Year',
            dataIndex : 'autoYear'
        }, {
            text : 'Make',
            width : 110,
            dataIndex : 'autoMake'
        }, {
            text : 'Model',
            width : 110,
            dataIndex : 'autoModel'
        }, {
            text : 'Seller',
            width : 150,
            dataIndex : 'seller'
        }, {
            text : 'Asking Price',
            width : 120,
            dataIndex : 'price',
            formatter : 'usMoney'
        }, {
            text : 'Buyer',
            width : 150,
            dataIndex : 'buyer'
        }, {
            xtype: 'datecolumn',
            text : 'Last Updated',
            width : 120,
            dataIndex : 'lastUpdated',
            format: 'm/d/Y'
        } ];

        if (JE.ADMIN) {
            columns.push({
                xtype : 'widgetcolumn',
                width : 120,
                text : 'Admin Task',
                widget : {
                    xtype : 'button',
                    text : 'Open / Close',
                    margin : 2,
                    handler :'onAdminClickManageListing'
                }
            });
        }
//        if (JE.ADMIN) {
//            var actionCol = {
//                xtype : 'actioncolumn',
//                text : 'Delete',
//                fixed : 'true',
//                sortable : false,
//                width : 75,
//                items : [ {
//                    iconCls : 'icon-delete',
//                    tooltip : 'Delete listing',
//                    handler : function(grid, rowIdx, colIdx) {
//                        var store = grid.getStore();
//                        var rec = store.getAt(rowIdx);
//                        Ext.Msg.confirm('Confirm Delete', 'Are you sure you want to delete the selected listing?', function(btn) {
//                            if (btn === 'yes') {
//                                store.remove(rec);
//                                store.sync({
//                                    success : function() {
//                                        Ext.Msg.alert('Success', 'Delete was successful.');
//                                    },
//                                    failure : function() {
//                                        store.rejectChanges();
//                                    }
//                                });
//                            }
//                        });
//                    }
//                } ]
//            };
//
//            columns.push(actionCol)
//        }

        return {
            xtype : 'grid',
            title : 'All Listings',
            iconCls : 'icon-form',
            multiColumnSort : true,
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                autoScroll : true,
                items: dockedItems
            }],
            listeners : {
                selectionchange : 'onSelectionChange'
            },
            columns : columns,
            reference : 'listingGrid',
            itemId : 'listingGrid',
            store : 'Listing'
        }
    }
});