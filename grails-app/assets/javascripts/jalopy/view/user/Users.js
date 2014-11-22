Ext.define('Jalopy.view.user.Users', {
    extend : 'Jalopy.common.view.Container',
    xtype : 'userscreen',
    requires : [ 'Jalopy.view.user.UserViewController' ],
    controller : 'userViewController',

    initComponent : function() {
        this.subTitle = 'Users',
            this.content = this.buildUsersGrid();
        this.callParent();
    },

    buildUsersGrid : function() {
        var columns = [ {
            text : 'id',
            dataIndex : 'id'
        }, {
            text : 'User',
            width : 150,
            dataIndex : 'username'
        }, {
            text : 'First Name',
            dataIndex : 'firstName'
        }, {
            text : 'Last Name',
            dataIndex : 'lastName'
        }, {
            text : 'Email',
            width : 225,
            dataIndex : 'email'
        }, {
            text : 'Age',
            dataIndex : 'age'
        }, {
            text : 'Bio',
            flex : 1,
            dataIndex : 'bio'
        }, {
            xtype : 'actioncolumn',
            text : 'Delete',
            fixed : true,
            width : 70,
            sortable : false,
            items : [ {
                iconCls : 'icon-delete',
                altText : 'Delete',
                tooltip : 'Delete User',
                handler : function(grid, rowIdx, colIdx) {
                    var store = grid.getStore();
                    var rec = store.getAt(rowIdx);

                    if (rec.get('username') === JE.USERNAME) {
                        Ext.Msg.alert('Cannot Delete', 'You cannot delete yourself!');
                    } else if (Ext.isEmpty(rec.get('listings')) === false || Ext.isEmpty(rec.get('automobiles')) === false) {
                        Ext.Msg.confirm('Confirm Delete', 'This user has data associated to their account. Delete user and all their data?', function(btn) {
                            if (btn === 'yes') {
                                store.remove(rec);
                                store.sync({
                                    success : function() {
                                        Ext.Msg.alert('Success', 'User successfully deleted.');
                                    },
                                    failure : function() {
                                        Ext.Msg.alert('Failed to Delete', 'Delete was unsuccessful.');
                                        store.rejectChanges();
                                    }
                                });
                            }
                        });
                    } else {
                        Ext.Msg.confirm('Confirm Delete', 'Are you sure you want to delete the selected user?', function(btn){
                            if(btn === 'yes') {
                                store.remove(rec);
                                store.sync({
                                    success : function() {
                                        Ext.Msg.alert('Success', 'User successfully deleted.');
                                    },
                                    failure : function() {
                                        Ext.Msg.alert('Failed to Delete', 'Delete was unsuccessful.');
                                        store.rejectChanges();
                                    }
                                });
                            }
                        });
                    }
                }
            } ]
        } ];
        return {
            xtype : 'grid',
            tbar : [ {
                xtype : 'button',
                text : 'load chris',
                listeners : {
                    click : 'loadChris'
                }
            } ],
            columns : columns,
            reference : 'userGrid',
            itemId : 'userGrid',
            store : 'User'
        }
    }
});