Ext.define('Jalopy.store.Listing', {
    extend : 'Jalopy.store.BaseStore',
    autoLoad : true,
    model : Ext.define('Jalopy.model.Listing', {
        extend : 'Jalopy.common.model.Base'
    })
});