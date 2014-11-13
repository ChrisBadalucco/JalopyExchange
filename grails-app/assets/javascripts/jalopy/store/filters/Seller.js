Ext.define('Jalopy.store.filters.Seller', {
    extend : 'Jalopy.store.BaseStore',
    autoLoad : true,
    model : Ext.define('Jalopy.model.Seller', {
        extend : 'Jalopy.common.model.Base',
        proxy : { url : 'main/user/sellers' }
    })
});