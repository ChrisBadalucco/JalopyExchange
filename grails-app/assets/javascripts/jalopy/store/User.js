Ext.define('Jalopy.store.User', {
    extend : 'Jalopy.store.BaseStore',
    autoLoad : true,
    model : Ext.define('Jalopy.model.User', {
        extend : 'Jalopy.common.model.Base',
        identifier : 'sequential'
    }),
    listeners : {
        load : function(thisStore, records, successful, eOpts) {
//            if (successful) {
//                var formArr = Ext.ComponentQuery.query('userForm');
//                if(formArr.length > 0) {
//                    formArr[0].getForm.loadRecord(records[0]);
//                }
//            }
        }
    }
});