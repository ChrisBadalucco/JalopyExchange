Ext.define('Jalopy.store.UserListing', {
    extend : 'Jalopy.store.BaseStore',
    autoLoad : true,
    model : Ext.define('Jalopy.model.UserListing', {
        extend : 'Jalopy.common.model.Base',
        proxy : { url : JE.CONTEXT + '/main/listing/user' }
    })
});