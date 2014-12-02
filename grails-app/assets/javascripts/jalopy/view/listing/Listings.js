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
            queryMode : 'local',
            editable : false,
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
            allowBlank : true,
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
            allowBlank : true,
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
            minWidth : 80,
            flex : 1,
            dataIndex : 'seller'
        }, {
            text : 'Asking Price',
            width : 120,
            align : 'right',
            dataIndex : 'price',
            formatter : 'usMoney'
        }, {
            text : 'Buyer',
            minWidth : 80,
            flex : 1,
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