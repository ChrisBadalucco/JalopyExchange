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
            text : 'User',
            dataIndex : 'username'
        }, {
            xtype : 'actioncolumn',
            text : 'Delete',
            fixed : true,
            width : 60,
            sortable : false,
            items : [ {
                iconCls : 'icon-delete',
                altText : 'Delete',
                tooltip : 'Delete User',
                handler : function(grid, rowIdx, colIdx) {
                    var store = grid.getStore();
                    var rec = store.getAt(rowIdx);

                    Ext.Msg.confirm('Confirm Delete', 'Are you sure you want to delete the selected user?', function(btn){
                        if(btn === 'yes') {
                            store.remove(rec);
                            store.sync({
                                success : function() {
                                    Ext.Msg.alert('Success', 'User successfully deleted.');
                                },
                                failure : function() {
                                    store.rejectChanges();
                                }
                            });
                        }
                    });
                }
            } ]
        } ];
        return {
            xtype : 'grid',
            columns : columns,
            reference : 'userGrid',
            itemId : 'userGrid',
            store : 'User'
        }
    }
});