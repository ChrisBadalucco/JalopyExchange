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
            width : 320,
            title : 'User Details',
            iconCls : 'icon-user-edit',
            itemId : 'userDetailsForm',
            split : true,
            collapsible : true,
            bodyPadding : '20 15',
            layout : 'anchor',
            defaults : { anchor : '100%' },
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
            items : [ {
                xtype : 'displayfield',
                fieldLabel : 'Username',
                value : '',
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
                emptyText : 'Tell us about you!',
                name : 'bio'
            } ]
        };

        var myListings = {
            xtype : 'grid',
            title : 'My Listings',
            reference : 'myListingsGrid',
            iconCls : 'icon-form',
            region : 'south',
            collapsible : true,
            flex : 1,
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
                dataIndex : 'id'
            }, {
                text : 'Asking Price',
                width : 120,
                dataIndex : 'price',
                formatter : 'usMoney'
            }, {
                text : 'Automobile',
                dataIndex : 'autoDescription',
                width : 250
            }, {
                xtype: 'datecolumn',
                width : 120,
                text : 'Last Updated',
                dataIndex : 'lastUpdated',
                format: 'm/d/Y'
            }, {
                text : 'Status',
                dataIndex : 'status'
            }, {
                xtype : 'widgetcolumn',
                width : 120,
                text : 'Manage',
                widget : {
                    xtype : 'button',
                    text : 'Open / Close',
                    margin : 2,
                    handler :'onClickManageListing'
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
                width : 200
            }, {
                text : 'Year',
                dataIndex : 'year'
            }, {
                text : 'Make',
                dataIndex : 'make'
            }, {
                text : 'Model',
                dataIndex : 'model'
//            }, {
//                xtype : 'actioncolumn',
//                text : 'Delete',
//                fixed : true,
//                width : 70,
//                sortable : false,
//                items : [ {
//                    iconCls : 'icon-delete',
//                    altText : 'Delete',
//                    tooltip : 'Delete User',
//                    handler : function(grid, rowIdx, colIdx) {
//                        var store = grid.getStore();
//                        var rec = store.getAt(rowIdx);
//
//                        Ext.Msg.confirm('Confirm Delete', 'Are you sure you want to delete the selected automobile?', function(btn){
//                            if(btn === 'yes') {
//                                store.remove(rec);
//                                store.sync({
//                                    success : function() {
//                                        Ext.Msg.alert('Success', 'Automobile successfully deleted.');
//                                    },
//                                    failure : function() {
////                                        Ext.Msg.alert('Failure', 'Delete has failed. Please try again.');
//                                        store.rejectChanges();
//                                    }
//                                });
//                            }
//                        });
//                    }
//                } ]
            } ],
//            store : 'UserAutomobile'
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