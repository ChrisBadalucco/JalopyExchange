Ext.define('Jalopy.store.User', {
    extend : 'Jalopy.store.BaseStore',
    autoLoad : true,
    model : Ext.define('Jalopy.model.User', {
        extend : 'Jalopy.common.model.Base',
        identifier : 'sequential'
    })
});