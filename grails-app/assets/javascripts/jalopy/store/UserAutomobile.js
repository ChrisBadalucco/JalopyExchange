Ext.define('Jalopy.store.UserAutomobile', {
    extend : 'Jalopy.store.BaseStore',
    autoLoad : true,
    model : Ext.define('Jalopy.model.UserAutomobile', {
        extend : 'Jalopy.common.model.Base',
        proxy : { url : JE.CONTEXT + '/main/automobile/user' }
    })
});