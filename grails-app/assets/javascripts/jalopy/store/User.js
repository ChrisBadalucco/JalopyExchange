Ext.define('Jalopy.store.User', {
    extend : 'Jalopy.store.BaseStore',
    autoLoad : true,
    model : Ext.define('Jalopy.model.User', {
        extend : 'Jalopy.common.model.Base',
        identifier : 'sequential',

        fields : [ {
            name : 'accountLocked',
            type : 'boolean'
        }, {
            name : 'lock',
            calculate : function(data) {
                return data.accountLocked ? 'Locked' : 'Active';
            }
        } ]
    }),
    listeners : {
        load : function(thisStore, records, successful, eOpts) { }
    }
});