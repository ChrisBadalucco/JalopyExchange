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
            text : 'ID',
            width : 60,
            dataIndex : 'id'
        }, {
            text : 'Activity',
            flex : 1,
            dataIndex : 'lock'
        },{
            text : 'User',
            flex : 1,
            dataIndex : 'username'
        }, {
            text : 'First Name',
            flex : 1,
            dataIndex : 'firstName',
            editor : 'textfield'
        }, {
            text : 'Last Name',
            flex : 1,
            dataIndex : 'lastName',
            editor : 'textfield'
        }, {
            text : 'Email',
            flex : 2,
            dataIndex : 'email',
            editor : { xtype : 'textfield', vtype : 'email' }
        }, {
            text : 'Age',
            width : 60,
            dataIndex : 'age',
            editor : {
                xtype : 'numberfield',
                minValue : 18,
                maxValue : 120
            }
        }, {
            text : 'Bio',
            flex : 2,
            dataIndex : 'bio',
            editor : 'textfield'
        }, {
            xtype : 'actioncolumn',
            text : 'Actions',
            fixed : true,
            width : 70,
            sortable : false,
            items : [ {
                iconCls : 'icon-lock-add',
                padding : '0 2',
                altText : 'Lock User',
                tooltip : 'Lock User',
                handler : function(grid, rowIdx, colIdx) {
                    var store = grid.getStore();
                    var rec = store.getAt(rowIdx);

                    if (rec.get('username') === JE.USERNAME) {
                        Ext.Msg.alert('Cannot Lock', 'You cannot lock yourself!');
                    } else {
                        Ext.Msg.confirm('Confirm Lock', 'Are you sure you want to lock this users account?', function(btn) {
                            if (btn === 'yes') {
                                rec.set('accountLocked', true);
                                store.sync({
                                    success : function() {
                                        Ext.Msg.alert('Success', 'User successully locked.');
                                    },
                                    failure : function() {
                                        Ext.Msg.alert('Lock Failed', 'Unable to lock user. Please try again. ');
                                        store.rejectChanges();
                                    }
                                });
                            }
                        });
                    }
                }
            }, {
                iconCls : 'icon-lock-delete',
                altText : 'Unlock User',
                tooltip : 'Unlock User',
                handler : function(grid, rowIdx, colIdx) {
                    var store = grid.getStore();
                    var rec = store.getAt(rowIdx);

                    if (rec.get('username') === JE.USERNAME) {
                        Ext.Msg.alert('Cannot Unlock', 'You cannot unlock yourself!');
                    } else if (rec.get('accountLocked') === false) {
                        Ext.Msg.alert('Cannot Unlock', 'User is already unlocked.');
                    } else {
                        Ext.Msg.confirm('Confirm Unlock', 'Are you sure you want to unlock this users account?', function(btn) {
                            if (btn === 'yes') {
                                rec.set('accountLocked', false);
                                store.sync({
                                    success : function() {
                                        Ext.Msg.alert('Success', 'User successully unlocked.');
                                    },
                                    failure : function() {
                                        Ext.Msg.alert('Lock Failed', 'Unable to unlock user. Please try again. ');
                                        store.rejectChanges();
                                    }
                                });
                            }
                        });
                    }
                }
//                iconCls : 'icon-delete',
//                altText : 'Delete',
//                tooltip : 'Delete User',
//                handler : function(grid, rowIdx, colIdx) {
//                    var store = grid.getStore();
//                    var rec = store.getAt(rowIdx);
//
//                    if (rec.get('username') === JE.USERNAME) {
//                        Ext.Msg.alert('Cannot Delete', 'You cannot delete yourself!');
//                    } else if (Ext.isEmpty(rec.get('listings')) === false || Ext.isEmpty(rec.get('automobiles')) === false) {
//                        Ext.Msg.confirm('Confirm Delete', 'This user has data associated to their account. Delete user and all their data?', function(btn) {
//                            if (btn === 'yes') {
//                                store.remove(rec);
//                                store.sync({
//                                    success : function() {
//                                        Ext.Msg.alert('Success', 'User successfully deleted.');
//                                    },
//                                    failure : function() {
//                                        Ext.Msg.alert('Failed to Delete', 'Delete was unsuccessful.');
//                                        store.rejectChanges();
//                                    }
//                                });
//                            }
//                        });
//                    } else {
//                        Ext.Msg.confirm('Confirm Delete', 'Are you sure you want to delete the selected user?', function(btn){
//                            if(btn === 'yes') {
//                                store.remove(rec);
//                                store.sync({
//                                    success : function() {
//                                        Ext.Msg.alert('Success', 'User successfully deleted.');
//                                    },
//                                    failure : function() {
//                                        Ext.Msg.alert('Failed to Delete', 'Delete was unsuccessful.');
//                                        store.rejectChanges();
//                                    }
//                                });
//                            }
//                        });
//                    }
//                }
            } ]
        } ];
        return {
            xtype : 'grid',
            title : 'All Users',
            iconCls : 'icon-group',
            columns : columns,
            plugins : [ {
                ptype : 'rowediting',
                listeners : {
                    edit : 'onEditUserGrid'
                }
            } ],
            reference : 'userGrid',
            itemId : 'userGrid',
            store : 'User'
        }
    }
});