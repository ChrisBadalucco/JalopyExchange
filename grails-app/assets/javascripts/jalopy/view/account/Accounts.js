Ext.define('Jalopy.view.account.Accounts', {
    extend : 'Jalopy.common.view.Container',
    xtype : 'accountscreen',
    requires : [ 'Jalopy.view.account.AccountViewController' ],
    controller : 'accountViewController',

    initComponent : function() {
        this.subTitle = 'My Account',
        this.content = this.buildAccountCt();
        this.callParent();
    },

    buildAccountCt : function() {
        var west = {
            xtype : 'form',
            region : 'west',
            autoScroll : true,
            width : 320,
            title : 'User Details',
            iconCls : 'icon-user-edit',
            itemId : 'userDetailsForm',
            split : true,
            collapsible : true,
            bodyPadding : '20 15',
            layout : 'anchor',
            listeners : {
                afterRender : 'onAfterRenderUserDetails'
            },
            buttons : [ {
                text : 'Save Changes',
                iconCls : 'icon-accept',
                listeners : {
                    click : 'onClickSaveUserChanges'
                }
            } ],
            defaults : { anchor : '100%', padding : '30 0', disabled : JE.ADMIN },
            items : [ {
                xtype : 'displayfield',
                fieldLabel : 'Username',
                padding: '0',
                disabled : false,
                name : 'username'
            }, {
                xtype : 'textfield',
                fieldLabel : 'First Name',
                name : 'firstName'
            }, {
                xtype : 'textfield',
                fieldLabel : 'Last Name',
                name : 'lastName'
            }, {
                xtype : 'textfield',
                fieldLabel : 'Email',
                vtype : 'email',
                name : 'email'
            }, {
                xtype : 'numberfield',
                fieldLabel : 'Age',
                minValue : 18,
                maxValue : 100,
                name : 'age'
            }, {
                xtype : 'textarea',
                fieldLabel : 'About Me',
                grow : true,
                height : 100,
                resizable : true,
                emptyText : 'Tell us about you!',
                name : 'bio'
            } ]
        };

        var myListings = {
            xtype : 'grid',
            title : 'My Listings',
            reference : 'myListingsGrid',
            itemId : 'myListingsGrid',
            iconCls : 'icon-form',
            region : 'south',
            collapsible : true,
            flex : 1,
            multiColumnSort : true,
            tbar : [ '->', {
                xtype : 'button',
                text : 'Create Listing',
                iconCls : 'icon-form-add',
                handler : function() {
                    Ext.widget('addlistingdlg');
                }
            } ],
            columns : [ {
                text : 'Listing ID',
                width : 80,
                dataIndex : 'id'
            }, {
                text : 'Asking Price',
                width : 110,
                dataIndex : 'price',
                align : 'right',
                formatter : 'usMoney'
            }, {
                text : 'Automobile',
                dataIndex : 'autoDescription',
                width : 185
            }, {
                xtype: 'datecolumn',
                width : 110,
                text : 'Last Updated',
                dataIndex : 'lastUpdated',
                format: 'm/d/Y'
            }, {
                text : 'Status',
                width : 75,
                dataIndex : 'status'
            }, {
                xtype : 'widgetcolumn',
                width : 120,
                text : 'Manage',
                widget : {
                    xtype : 'button',
                    text : 'Close Listing',
                    margin : 2,
                    handler :'onClickCloseListing'
                }
            } ],
            store : Ext.create('Jalopy.store.Listing', {
                storeId : 'users-listings',
                filters : {
                    property : 'seller',
                    value : JE.USERNAME
                }
            })
        };

        var myAutos = {
            xtype : 'grid',
            title : 'My Automobiles',
            iconCls : 'icon-car',
            region : 'center',
            flex : 1,
            itemId : 'automobileGrid',
            multiColumnSort : true,
            tbar : [ '->', {
                xtype : 'button',
                text : 'Add Automobile',
                iconCls : 'icon-car-add',
                listeners : {
                    click: function() {
                        Ext.widget('addautodlg');
                    }
                }
            } ],
            columns : [ {
                text : 'Automobile ID',
                dataIndex : 'id',
                width : 120
            }, {
                text : 'VIN',
                dataIndex : 'vin',
                width : 185
            }, {
                text : 'Year',
                dataIndex : 'year'
            }, {
                text : 'Make',
                dataIndex : 'make'
            }, {
                text : 'Model',
                dataIndex : 'model'
            }, {
                xtype : 'actioncolumn',
                text : 'Delete',
                fixed : true,
                width : 70,
                sortable : false,
                items : [ {
                    iconCls : 'icon-delete',
                    altText : 'Delete',
                    tooltip : 'Delete Automobile',
                    handler : 'onDeleteAutomobile'
                } ]
            } ],
            store : Ext.create('Jalopy.store.Automobile', {
                storeId : 'users-autos',
                filters : {
                    property : 'owner',
                    value : JE.USERNAME
                }
            }).load()
        };

        var centerCt = {
            xtype : 'container',
            region : 'center',
            layout : 'border',
            defaults : { split : true },
            items : [ myListings, myAutos ]
        };

        return {
            xtype : 'container',
            layout : 'border',
            items : [ west, centerCt ]
        }
    }
});