/**
 * @author TimTsang
 * @date 2014年7月18日
 * @class dateWindow,textWindow,deltatWindow
 * @extends Ext.Window
 * @description 窗口工具
 */

var dr_date = new Ext.FormPanel({
			labelWidth : 60,
			frame : true,
			bodyStyle : 'padding:5px 5px 0',
			width : 150,
			items : [{
						fieldLabel : '开始时间',
						name : '开始时间',
						id : 'startdt_date',
						//vtype: 'datetimerange',
						xtype : "datetimefield",
						//endDateTimeField: 'enddt_date',
						format : 'Y-m-d H:i:s'
					}, {
						fieldLabel : '结束时间',
						name : '结束时间',
						id : 'enddt_date',
						//vtype: 'datetimerange',
						xtype : "datetimefield",
						//startDateTimeField: 'startdt_date',
						format : 'Y-m-d H:i:s'
					}],
			buttons : [{
				text : '保存',
				handler : function(grid) {
					if (dr_date.form.isValid()) {
						var s = "";
						var col = CONDITION.column;
						var row = CONDITION.row;
						var grid = CONDITION.grid;
						var store = CONDITION.grid.getStore();

						var gridView = grid.getView();
						Ext.iterate(dr_date.form.getValues(), function(key,
										value) {
									s += String.format("{0}:{1},", key, value);
								}, this);
						var rec = store.getAt(row);
						var defaultRec = {
							andor : rec.get('andor'),
							objName : rec.get('objName'),
							ChineseObjName : rec.get('ChineseObjName'),
							select : rec.get('select'),
							conditions : s,
							deltat : rec.get('deltat')
							,
						};
						var sm = grid.getSelectionModel();
						var cell = sm.getSelectedCell();
						var record = store.getAt(cell[0]);
						store.remove(record);
						var newRecord = new store.recordType(defaultRec);
						store.insert(row, newRecord);
						Ext.getCmp('date_window').hide();
					}
				}
				,

			}, {
				text : '重置',
				handler : function() {
					dr_date.form.reset();
				}
			}]
			,

		});

/*Ext.apply(Ext.form.VTypes, {
    datetimerange : function(val, field) {
        var date = field.parseDate(val);

        if(!date){
            return false;
        }
        if (field.startDateTimeField) {
            var start = Ext.getCmp(field.startDateTimeField);
            if (!start.maxValue || (date.getTime() != start.maxValue.getTime())) {
                start.setMaxValue(date);
                start.validate();
            }
        }
        else if (field.endDateTimeField) {
            var end = Ext.getCmp(field.endDateTimeField);
            if (!end.minValue || (date.getTime() != end.minValue.getTime())) {
                end.setMinValue(date);
                end.validate();
            }
        }
        return true;
    },

});*/

var dr_date2 = new Ext.FormPanel({
			labelWidth : 60,
			frame : true,
			bodyStyle : 'padding:5px 5px 0',
			width : 150,
			items : [{
						fieldLabel : '开始时间',
						name : '开始时间',
						id : 'startdt',
						vtype: 'daterange',
						xtype : "datefield",
						endDateField: 'enddt',
						format : 'Y-m-d'
					}, {
						fieldLabel : '结束时间',
						name : '结束时间',
						id : 'enddt',
						vtype: 'daterange',
						xtype : "datefield",
						startDateField: 'startdt',
						format : 'Y-m-d'
					}],
			buttons : [{
				text : '保存',
				handler : function(grid) {
					if (dr_date2.form.isValid()) {
						var s = "";
						var col = CONDITION.column;
						var row = CONDITION.row;
						var grid = CONDITION.grid;
						var store = CONDITION.grid.getStore();

						var gridView = grid.getView();
						Ext.iterate(dr_date2.form.getValues(), function(key,
										value) {
									s += String.format("{0}:{1},", key, value);
								}, this);
						var rec = store.getAt(row);
						var defaultRec = {
							andor : rec.get('andor'),
							objName : rec.get('objName'),
							ChineseObjName : rec.get('ChineseObjName'),
							select : rec.get('select'),
							conditions : s,
							deltat : rec.get('deltat')
						};
						var sm = grid.getSelectionModel();
						var cell = sm.getSelectedCell();
						var record = store.getAt(cell[0]);
						store.remove(record);
						var newRecord = new store.recordType(defaultRec);
						store.insert(row, newRecord);
						Ext.getCmp('date_window2').hide();
					}
				}
				,

			}, {
				text : '重置',
				handler : function() {
					dr_date2.form.reset();
				}
			}]
			,

		});

Ext.apply(Ext.form.VTypes, {
    daterange : function(val, field) {
        var date = field.parseDate(val);

        if(!date){
            return false;
        }
        if (field.startDateField) {
            var start = Ext.getCmp(field.startDateField);
            if (!start.maxValue || (date.getTime() != start.maxValue.getTime())) {
                start.setMaxValue(date);
                start.validate();
            }
        }
        else if (field.endDateField) {
            var end = Ext.getCmp(field.endDateField);
            if (!end.minValue || (date.getTime() != end.minValue.getTime())) {
                end.setMinValue(date);
                end.validate();
            }
        }
        return true;
    },

});



var dr_text = new Ext.FormPanel({
			labelWidth : 60,
			frame : true,
			title : '范围',
			bodyStyle : 'padding:5px 5px 0',
			width : 150,
			defaultType : 'textfield',
			items : [{
						fieldLabel : '起始',
						name : '起始',
						id : 'startdt_text'
						,
					}, {
						fieldLabel : '结束',
						name : '结束',
						id : 'enddt_text'
						,
					}],
			buttons : [{
				text : '保存',
				handler : function(grid) {
					if (dr_text.form.isValid()) {
						var s = "";
						var col = CONDITION.column;
						var row = CONDITION.row;
						var grid = CONDITION.grid;
						var store = CONDITION.grid.getStore();
						Ext.iterate(dr_text.form.getValues(), function(key,
										value) {
									s += String.format("{0}:{1},", key, value);
								}, this);
						var rec = store.getAt(row);
						var defaultRec = {
							andor : rec.get('andor'),
							objName : rec.get('objName'),
							ChineseObjName : rec.get('ChineseObjName'),
							select : rec.get('select'),
							conditions : s,
							deltat : rec.get('deltat')
							,
						};
						var sm = grid.getSelectionModel();
						var cell = sm.getSelectedCell();
						var record = store.getAt(cell[0]);
						store.remove(record);
						var newRecord = new store.recordType(defaultRec);
						store.insert(row, newRecord);
						Ext.getCmp('text_window').hide();
					}
				}
			}, {
				text : '重置',
				handler : function() {
					dr_text.form.reset();
				}
			}]
		});

var deltat_text = new Ext.FormPanel({
			labelWidth : 30,
			frame : true,
			title : '变量t',
			bodyStyle : 'padding:5px 5px 0',
			width : 100,
			defaultType : 'textfield',
			items : [{
						xtype : 'spinnerfield',
						fieldLabel : '小时',
						name : '小时',
						id : 'hour',
						minValue : 0,
						maxValue : 12,
						allowDecimals : true,
						decimalPrecision : 1,
						incrementValue : 1,
						accelerate : true
					}, {
						xtype : 'spinnerfield',
						fieldLabel : '分钟',
						name : '分钟',
						id : 'minute',
						minValue : 0,
						maxValue : 59,
						allowDecimals : true,
						decimalPrecision : 1,
						incrementValue : 1,
						accelerate : true
					}],
			buttons : [{
				text : '保存',
				handler : function(grid) {
					if (deltat_text.form.isValid()) {
						var s = "";
						var col = CONDITION.column;
						var row = CONDITION.row;
						var grid = CONDITION.grid;
						var store = CONDITION.grid.getStore();
						Ext.iterate(deltat_text.form.getValues(), function(key,
										value) {
									s += String.format("{1},", key, value);
								}, this);
						var rec = store.getAt(row);
						var defaultRec = {
							andor : rec.get('andor'),
							objName : rec.get('objName'),
							ChineseObjName : rec.get('ChineseObjName'),
							select : rec.get('select'),
							conditions : rec.get('conditions'),
							deltat : s
							,
						};
						var sm = grid.getSelectionModel();
						var cell = sm.getSelectedCell();
						var record = store.getAt(cell[0]);
						store.remove(record);
						var newRecord = new store.recordType(defaultRec);
						store.insert(row, newRecord);
						Ext.getCmp('deltat_text_window').hide();
					}
				}
			}, {
				text : '重置',
				handler : function() {
					deltat_text.form.reset();
				}
			}]
		});

var dateWindow = new Ext.Window({
			id : "date_window",
			title : '时间区间',
			iconCls : 'icon-time',
			layout : 'fit',
			width : 270,
			height : 150,
			resizable : false,
			plain : true,
			modal : true,
			items : [dr_date,]
		});

var dateWindow2 = new Ext.Window({
			id : "date_window2",
			title : '时间区间',
			iconCls : 'icon-time',
			layout : 'fit',
			width : 250,
			height : 150,
			resizable : false,
			plain : true,
			modal : true,
			items : [dr_date2,]
		});

var textWindow = new Ext.Window({
			id : "text_window",
			layout : 'fit',
			width : 280,
			height : 180,
			resizable : false,
			plain : true,
			modal : true,
			items : [dr_text,]
		});

var deltatWindow = new Ext.Window({
			id : "deltat_text_window",
			layout : 'fit',
			width : 280,
			height : 180,
			resizable : false,
			plain : true,
			modal : true,
			items : [deltat_text,]
		});

function showWindow(r) {
	var d1 = r.get('objName').toString();
	if (d1 == 'ZA_LYT_LKBH' || d1 == 'ZA_LYT_TH' || d1 == 'ZA_LYT_XM'
			|| d1 == 'ZA_LYT_XMPY' || d1 == 'ZA_LYT_XB' || d1 == 'ZA_LYT_MZ'
			|| d1 == 'ZA_LYT_ZJLX' || d1 == 'ZA_LYT_ZJHM'
			|| d1 == 'ZA_LYT_XZQH' || d1 == 'ZA_LYT_CZDZ'
			|| d1 == 'ZA_LYT_LGMC' || d1 == 'ZA_LYT_LGBH'
			|| d1 == 'ZA_LYT_LGDZ' || d1 == 'ZA_LYT_RZFH'
			|| d1 == 'ZA_LYT_RZDBRY' || d1 == 'ZA_LYT_TFDBRY'
			|| d1 == 'ZA_LYT_XYKLX' || d1 == 'ZA_LYT_XYKHM'
			|| d1 == 'ZA_LYT_ZPCD' || d1 == 'ZA_LYT_RZXH' || d1 == 'FLIGHT'
			|| d1 == 'STRT' || d1 == 'DEST' || d1 == 'CHINESE_NAME'
			|| d1 == 'ENGLISH_NAME' || d1 == 'FOID' || d1 == 'ASCR_CODE'
			|| d1 == 'ASCR_NAME' || d1 == 'PNR' || d1 == 'BDNO' || d1 == 'SEAT'
			|| d1 == 'CLASS' || d1 == 'NATION' || d1 == 'SEX' || d1 == 'PHONE'
			|| d1 == 'BAGUNIT' || d1 == 'BAGINFO' || d1 == 'OFFICE_NO'
			|| d1 == 'WINDOW_NO' || d1 == 'TICKET_NO'
			|| d1 == 'BOARD_TRAIN_CODE' || d1 == 'COACH_NO' || d1 == 'SEAT_NO'
			|| d1 == 'FROM_STATION_NAME' || d1 == 'TO_STATION_NAME'
			|| d1 == 'ID_NO' || d1 == 'ID_NAME' || d1 == 'YBZJ'
			|| d1 == 'XMTYIN' || d1 == 'XMTYUN' || d1 == 'RYWYH') {
		textWindow.show();
	} else if (d1 == 'ZA_LYT_RZSJ' || d1 == 'ZA_LYT_TFSJ'
			|| d1 == 'ZA_LYT_FSSJ' || d1 == 'ZA_LYT_JSSJ'
			|| d1 == 'ZA_LYT_RKSJ' || d1 == 'ZA_LYT_HTRKSJ'
			|| d1 == 'ZA_LYT_GXSJ' || d1 == 'DEPTTM' || d1 == 'ARVETM'
			|| d1 == 'CCTIME' || d1 == 'SALE_TIME' || d1 == 'START_TIME'
			|| d1 == 'JLRKSJ' || d1 == 'JLXGSJ') {
		dateWindow.show();
	} else if (d1 == 'ZA_LYT_CSRQ' || d1 == 'OFFDAY' || d1 == 'OFFDAY_C'
			|| d1 == 'BORTH' || d1 == 'TRAIN_DATE') {
		dateWindow2.show();
	}
}

function showDeltatWindow(r) {
	var d1 = r.get('objName').toString();
	if (d1 == 'ZA_LYT_CSRQ' || d1 == 'ZA_LYT_RZSJ' || d1 == 'ZA_LYT_TFSJ'
			|| d1 == 'ZA_LYT_FSSJ' || d1 == 'ZA_LYT_JSSJ'
			|| d1 == 'ZA_LYT_RKSJ' || d1 == 'ZA_LYT_HTRKSJ'
			|| d1 == 'ZA_LYT_GXSJ') {
		deltatWindow.show();
	}
}