Ext.define('Jalopy.model.Base', {
    extend : 'Ext.data.Model',

    fields : [ {
        name : 'id',
        type : 'int'
    } ],

    schema : {
        namespace : 'Jalopy.model',
        proxy : {
            type : 'rest',
            url : '/JalopyExchange/main/{entityName:lowercase}',
            reader : {
                type : 'json',
                rootProperty : ''
            }
            //writer : {}
        }
    }
});