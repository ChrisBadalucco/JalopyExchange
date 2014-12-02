Ext.define('Jalopy.common.view.JalopyCombo', {
    extend : 'Ext.form.field.ComboBox',
    xtype : 'jalopycombo',

    labelAlign : 'right',
    margin : '0 10 0 0',
    queryMode : 'local',
    displayField : 'name',
    valueField : 'value',
    forceSelection : true,
    matchFieldWidth : true,
    submitValue : true,
    labelWidth : 50,
    width : 200,
    editable : false
});