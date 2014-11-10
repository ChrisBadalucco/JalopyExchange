Ext.define('Jalopy.store.Automobile', {
    extend : 'Jalopy.store.BaseStore',
    model : Ext.define('Jalopy.model.Automobile', {
        extend : 'Jalopy.common.model.Base'
    }),

    fields : [ {
        name : 'description',
        mapping : function(data) {
            return data.year + ' ' + data.make + ' ' + data.model;
        }
    } ]
});