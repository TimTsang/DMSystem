/**
 * @author TimTsang
 * @date 2014年8月12日
 * @CopyRight 2014 Topview Inc
 * @version v1.0
 * @class grid
 * @extends Ext.grid.EditorGridPanel
 * @description 动态生成查询操作表格
 */

function creatObjectGridPanel() {

	Ext.Ajax.request({
		method : "POST",
		url : 'getModelMessage',
		success : function(response, options) {
			jsonObj = Ext.util.JSON.decode(response.responseText);
			var length = jsonObj.length;
			var storeArray = [];
			for (var i = 0; i < length; i++) {
				var proxy = new Ext.data.MemoryProxy(jsonObj[i]);
				var reader = new Ext.data.JsonReader({
							totalProperty : "results",
							root : "rows"
						}, [{
									name : 'id'
								}, {
									name : 'andor'
								}, {
									name : 'objName'
								}, {
									name : 'chineseObjName'
								}, {
									name : 'select'
								}, {
									name : 'conditions'
								}, {
									name : 'deltat'
								},]);

				var objdiv = document.createElement("div");// 动态生成div
				var objbr = document.createElement("br");
				var objname = "object_" + i;
				objdiv.id = objname;
				objdiv.style.border = "0px";
				document.body.appendChild(objdiv);
				document.body.appendChild(objbr);

				var store = new Ext.data.Store({
							proxy : proxy,
							reader : reader,
							pruneModifiedRecords : true
						});

				Ext.onReady(function() {

					Ext.QuickTips.init();

					var andor = {
						header : "且/或",
						align : 'center',
						width : 40,
						dataIndex : "andor",
						editable : true,
						renderer : function(v) {
							return VLMAP[v];
						},
						editor : new Ext.form.ComboBox({
									store : store_andor,
									displayField : 'Candor',
									typeAhead : true,
									mode : 'local',
									forceSelection : true,
									valueField : 'Eandor',
									triggerAction : 'all',
									selectOnFocus : true,
									allowBlank : false,
									blankText : '不能为空！'
								})
					};

					var objName = {
						header : "属性",
						sortable : true,
						dataIndex : 'objName',
						align : 'center',
						width : 200,
						renderer : function(v) {
							return VLMAP[v];
						},
						editor : new Ext.form.ComboBox({
									store : store,
									displayField : 'chineseObjName',
									typeAhead : true,
									mode : 'local',
									forceSelection : true,
									valueField : 'objName',
									triggerAction : 'all',
									selectOnFocus : true,
									allowBlank : false,
									blankText : '不能为空！'
								})

					};

					var select = {
						header : "限制项",
						sortable : true,
						dataIndex : 'select',
						align : 'center',
						width : 160,
						editable : true,
						renderer : function(v) {
							return VLMAP[v];
						},
						editor : new Ext.form.ComboBox({
									store : store_select,
									displayField : 'Cselect',
									typeAhead : true,
									mode : 'local',
									forceSelection : true,
									valueField : 'Eselect',
									triggerAction : 'all',
									selectOnFocus : true,
									allowBlank : false,
									blankText : '不能为空！'
								})
					};

					var conditions0 = {
						header : "条件",
						align : 'center',
						width : 160,
						dataIndex : 'conditions',
						editor : new Ext.form.TextField({
									allowBlank : false,
									blankText : '不能为空！',
									selectOnFocus : true
								}),
						renderer : function(value) {
							if (typeof value == "string"
									|| typeof value == "number") {
								return value;
							}
							if (value instanceof Date) {
								return value.format("Y-m-d H:i:s");
							}
							return value;
						}
					};

					var conditions1 = {
						header : "条件",
						sortable : true,
						align : 'center',
						width : 160,
						dataIndex : 'conditions',
						editor : new Ext.ux.form.DateTimeField({
									allowBlank : false,
									format : 'Y-m-d H:i:s',
									blankText : '不能为空！',
									selectOnFocus : true
								}),
						renderer : function(value) {
							if (typeof value == "string"
									|| typeof value == "number") {
								return value;
							}
							if (value instanceof Date) {
								return value.format("Y-m-d H:i:s");
							}
							return value;
						}
					};

					var conditions1_1 = {
						header : "条件",
						sortable : true,
						align : 'center',
						width : 160,
						dataIndex : 'conditions',
						editor : new Ext.form.DateField({
									allowBlank : false,
									format : 'Y-m-d',
									blankText : '不能为空！',
									selectOnFocus : true
								}),
						renderer : function(value) {
							if (typeof value == "string"
									|| typeof value == "number") {
								return value;
							}
							if (value instanceof Date) {
								return value.format("Y-m-d");
							}
							return value;
						}
					};

					var conditions2 = {
						header : "条件",
						sortable : true,
						align : 'center',
						width : 160,
						dataIndex : 'conditions',
						editor : new Ext.form.TextField({
									disabled : true
								}),
						renderer : function(value) {
							if (typeof value == "string"
									|| typeof value == "number") {
								return value;
							}
							if (value instanceof Date) {
								return value.format("Y-m-d H:i:s");
							}
							return value;
						}
					};

					var conditions3 = {
						header : "条件",
						align : 'center',
						width : 160,
						dataIndex : 'conditions',
						editor : new Ext.form.TextField({
									allowBlank : false,
									blankText : '不能为空！',
									selectOnFocus : true
								})

					};

					var deltat0 = {
						header : "变量t",
						dataIndex : 'deltat',
						align : 'center',
						width : 60,
						dataIndex : 'deltat',
						editor : new Ext.form.TextField({
									disabled : true
								})
					};

					var deltat1 = {
						header : "变量t",
						dataIndex : 'deltat',
						align : 'center',
						width : 60,
						dataIndex : 'deltat',
						editor : new Ext.form.TextField({
									id : 'deltat',
									displayField : 'deltat',
									typeAhead : true,
									valueField : 'deltat',
									allowBlank : false,
									blankText : '不能为空！'
								})
					};

					var icon = {
						xtype : 'actioncolumn',
						width : 50,
						align : 'center',
						items : [{
							icon : 'images/delete.gif',
							tooltip : '删除此条属性',
							handler : function(grid, rowIndex, colIndex) {
								var store = grid.getStore();
								var rec = store.getAt(rowIndex);
								Ext.Msg.confirm('温馨提示', '您确定要删除' + " “ "
												+ rec.get('chineseObjName')
												+ " ” " + '这条记录吗？', function(
												btn) {
											if (btn == 'yes') {
												var sm = grid
														.getSelectionModel();
												var cell = sm.getSelectedCell();
												var record = store
														.getAt(cell[0]);
												store.remove(record);
											}
										});
							}
						}, {
							icon : 'images/add.gif',
							tooltip : '增加此条属性',
							handler : function(grid, rowIndex, colIndex) {
								var store = grid.getStore();
								var rec = store.getAt(rowIndex);
								var defaultRec = {
									andor : rec.get('andor'),
									objName : rec.get('objName'),
									chineseObjName : rec.get('chineseObjName'),
									select : rec.get('select'),
									conditions : rec.get('conditions'),
									deltat : rec.get('deltat')
								};
								var newRecord = new store.recordType(defaultRec);
								store.insert(0, newRecord);
							}
						}]
					};

					var grid = new Ext.grid.EditorGridPanel({
						header : true,
						iconCls : 'icon-model',
						width : 950,
						autoEncode : true,
						loadMask : true,
						stripeRows : true,
						clicksToEdit : 1,
						store : store,
						renderTo : objdiv,
						layout : 'fit',
						columns : [andor, objName, select, conditions0,
								deltat0, icon],
						stripeRows : true,
						height : 320,
						frame : true,
						defaults : {
							sortable : true
						},
						viewConfig : {
							sortable : true,
							forceFit : true,// 每列自动充满Grid
							stripeRows : true,
							enableRowBody : true,
							deferEmptyText : '请稍后...'
						},
						autoScroll : false,
						tbar : [{
							xtype : 'button',
							text : '添加属性',
							iconCls : 'add',
							handler : function() {
								var defaultRec = {
									andor : "and",
									objName : "",
									chineseObjName : "",
									select : "=",
									conditions : "",
									deltat : ""
									,
								};
								var store = grid.getStore();
								var newRecord = new store.recordType(defaultRec);
								store.insert(0, newRecord);
							}
							,

						}],
						listeners : {
							"beforeedit" : function(e) { // 发生编辑事件前
								var f = e.field;
								var r = e.record;
								if (f == 'conditions') {
									if (r.get('select').toString() == 'between') {
										CONDITION = e;
										showWindow(r);
									} else {
										reRecode(1, r, andor, objName, select,
												icon);
										reRecode_select(1, r, andor, objName,
												select, icon);
									}
								}
								if (f == 'deltat') {
									CONDITION = e;
									showDeltatWindow(r);
								}
							},
							"afteredit" : function(e) { // 发生编辑事件后
								var f = e.field;
								var r = e.record;
								if (f == 'objName') {
									reRecode(2, r, andor, objName, select, icon);
								} else if (f == 'select') {
									reRecode_select(2, r, andor, objName,
											select, icon);
								}
							}
							,
						}
					});

					store.load({
								callback : function() {
									var json = reader.jsonData;
									title = json.title;
									grid.setTitle(title);
								}
							}); // 加载数据
					storeArray[i] = store;

					function reRecode(type, r, andor, objName, select, icon) {
						var d1 = r.get('objName').toString();
						if ((type == 1 || type == 2) && d1 != '') { // 无论编辑前编辑后都必须确保选择列有值
							if (d1 == 'ZA_LYT_LKBH' || d1 == 'ZA_LYT_TH'
									|| d1 == 'ZA_LYT_XM' || d1 == 'ZA_LYT_XMPY'
									|| d1 == 'ZA_LYT_XB' || d1 == 'ZA_LYT_MZ'
									|| d1 == 'ZA_LYT_ZJLX'
									|| d1 == 'ZA_LYT_ZJHM'
									|| d1 == 'ZA_LYT_XZQH'
									|| d1 == 'ZA_LYT_CZDZ'
									|| d1 == 'ZA_LYT_LGMC'
									|| d1 == 'ZA_LYT_LGBH'
									|| d1 == 'ZA_LYT_LGDZ'
									|| d1 == 'ZA_LYT_RZFH'
									|| d1 == 'ZA_LYT_RZDBRY'
									|| d1 == 'ZA_LYT_TFDBRY'
									|| d1 == 'ZA_LYT_XYKLX'
									|| d1 == 'ZA_LYT_XYKHM'
									|| d1 == 'ZA_LYT_ZPCD'
									|| d1 == 'ZA_LYT_RZXH' || d1 == 'FLIGHT'
									|| d1 == 'STRT' || d1 == 'DEST'
									|| d1 == 'CHINESE_NAME'
									|| d1 == 'ENGLISH_NAME' || d1 == 'FOID'
									|| d1 == 'ASCR_CODE' || d1 == 'ASCR_NAME'
									|| d1 == 'PNR' || d1 == 'BDNO'
									|| d1 == 'SEAT' || d1 == 'CLASS'
									|| d1 == 'NATION' || d1 == 'SEX'
									|| d1 == 'PHONE' || d1 == 'BAGUNIT'
									|| d1 == 'BAGINFO' || d1 == 'OFFICE_NO'
									|| d1 == 'WINDOW_NO' || d1 == 'TICKET_NO'
									|| d1 == 'BOARD_TRAIN_CODE'
									|| d1 == 'COACH_NO' || d1 == 'SEAT_NO'
									|| d1 == 'FROM_STATION_NAME'
									|| d1 == 'TO_STATION_NAME' || d1 == 'ID_NO'
									|| d1 == 'ID_NAME' || d1 == 'YBZJ'
									|| d1 == 'XMTYIN' || d1 == 'XMTYUN'
									|| d1 == 'RYWYH') {
								colModel = new Ext.grid.ColumnModel([andor,
										objName, select, conditions0, deltat0,
										icon]);
							} else if (d1 == 'ZA_LYT_RZSJ'
									|| d1 == 'ZA_LYT_TFSJ'
									|| d1 == 'ZA_LYT_FSSJ'
									|| d1 == 'ZA_LYT_JSSJ'
									|| d1 == 'ZA_LYT_RKSJ'
									|| d1 == 'ZA_LYT_HTRKSJ'
									|| d1 == 'ZA_LYT_GXSJ') {
								colModel = new Ext.grid.ColumnModel([andor,
										objName, select, conditions1, deltat1,
										icon]);
							} else if (d1 == 'ZA_LYT_CSRQ') {
								colModel = new Ext.grid.ColumnModel([andor,
										objName, select, conditions1_1,
										deltat1, icon]);
							} else if (d1 == 'DEPTTM' || d1 == 'ARVETM'
									|| d1 == 'CCTIME' || d1 == 'BORTH'
									|| d1 == 'SALE_TIME' || d1 == 'JLRKSJ'
									|| d1 == 'JLXGSJ') {
								colModel = new Ext.grid.ColumnModel([andor,
										objName, select, conditions1, deltat0,
										icon]);
							} else if (d1 == 'OFFDAY' || d1 == 'OFFDAY_C'
									|| d1 == 'TRAIN_DATE' || d1 == 'START_TIME') {
								colModel = new Ext.grid.ColumnModel([andor,
										objName, select, conditions1_1, deltat0,
										icon]);
							}
							if (type == 2) { // 如果选中选择列，则清空动态输入值

							}
							grid.reconfigure(grid.getStore(), colModel);
						}
					}

					function reRecode_select(type, r, andor, objName, select,
							icon) {
						var d1 = r.get('select').toString();
						if ((type == 1 || type == 2) && d1 != '') { // 无论编辑前编辑后都必须确保选择列有值
							if (d1 == 'isNull') {
								colModel = new Ext.grid.ColumnModel([andor,
										objName, select, conditions2, deltat0,
										icon]);
							} else if (d1 == 'between') {
								colModel = new Ext.grid.ColumnModel([andor,
										objName, select, conditions3, deltat1,
										icon]);
							} else {
								reRecode(type, r, andor, objName, select, icon);
							}
							grid.reconfigure(grid.getStore(), colModel);
						}
					}

				});

			}

			var topPanel = new Ext.FormPanel({
				labelWidth : 60,
				width : 180,
				frame : true,
				title : jsonObj[0].model,
				iconCls : 'icon-model',
				bodyStyle : 'padding:5px 5px 0;',
				defaults : {
					width : 80
				},
				defaultType : 'textfield',
				items : [{
							xtype : 'spinnerfield',
							fieldLabel : '同行次数N',
							name : '同行次数N',
							id : 'n',
							minValue : 1,
							allowDecimals : true,
							decimalPrecision : 1,
							incrementValue : 1,
							allowBlank : false,
							blankText : '不能为空！',
							accelerate : true
						}, {
							xtype : 'spinnerfield',
							fieldLabel : '层级数L',
							name : '层级数L',
							id : 'l',
							minValue : 0,
							maxValue : 3,
							allowDecimals : true,
							decimalPrecision : 1,
							incrementValue : 1,
							allowBlank : false,
							blankText : '不能为空！',
							accelerate : true
						}],
				buttons : [{
					text : '提交查询',
					iconCls : 'icon-search',
					handler : function() {
						var nValue = Ext.getCmp('n').getValue();
						var lValue = Ext.getCmp('l').getValue();
						n = 0;

						if (nValue == " " || lValue == " " && lValue != 0) {
							if (nValue == " ")
								Ext.Msg.confirm('温馨提示', '请输入“同行次数N”的值后再提交！');
							if (lValue == " " && lValue != 0)
								Ext.Msg.confirm('温馨提示', '请输入“层级数L”的值后再提交！');
						} else {
							var mr_test = new Array();
							var resultArray_test = new Array();
							var result_test = new Array();
							var flag = false;
							for (var i = 0; i < length; i++) {
								mr_test[i] = storeArray[i].getModifiedRecords();

								resultArray_test[i] = new Array();

								result_test[i] = '[';
								for (var j = 0; j < mr_test[i].length; j++) {
									result_test[i] += Ext.util.JSON
											.encode(mr_test[i][j].data)
											+ ',';
								}
								result_test[i] = result_test[i].substr(0,
										result_test[i].length - 1)
										+ ']';

								Ext.Msg.confirm('温馨提示', '您确定要提交吗？', function(
										btn) {
									if (btn == 'yes') {
										Ext.Ajax.request({
													method : "POST",
													url : 'cleanResult'
													,
												});
										var mr = new Array();
										var resultArray = new Array();
										var result = new Array();
										for (var i = 0; i < length; i++) {

											mr[i] = storeArray[i]
													.getModifiedRecords();

											resultArray[i] = new Array();

											result[i] = '[';
											for (var j = 0; j < mr[i].length; j++) {
												result[i] += Ext.util.JSON
														.encode(mr[i][j].data)
														+ ',';
											}
											result[i] = result[i].substr(0,
													result[i].length - 1)
													+ ']';
											Ext.Ajax.request({
												method : "POST",
												url : 'query',
												params : {
													modelId : jsonObj[i].modelId,
													dataSource : jsonObj[i].dataSource,
													link : jsonObj[i].link,
													model : jsonObj[i].model,
													tableName : jsonObj[i].tableName,
													result : result[i],
													n : nValue,
													l : lValue
												},
												success : function() {
													n++;
													if (n == length) {
														window.top.Ext
																.getCmp("my_center")
																.add({
																	title : "查询结果",
																	html : "<iframe src='detail.html' id='test' frameborder=0 width=100% height=100%></iframe>",
																	closable : true,
																	enableTabScroll : true,
																	autoScroll : true,
																	activeItem : 0,
																	iconCls : 'icon-search'
																}).show();
													}
												},
												failure : function(flag) {
													flag = false;
													alert("数据加载失败！");
													Ext.Msg.show({
																title : '错误提示',
																msg : '数据加载失败！',
																buttons : Ext.Msg.OK,
																icon : Ext.Msg.ERROR
															});
												}
											});
										}
									}
								});

							}

						}

					}
				}, {
					text : '查看记录',
					iconCls : 'icon-result',
					handler : function() {
						window.top.Ext.getCmp("my_center").add({
							title : "查看记录",
							html : "<iframe src='historical_records.html' id='test' frameborder=0 width=100% height=100%></iframe>",
							closable : true,
							enableTabScroll : true,
							autoScroll : true,
							activeItem : 0,
							iconCls : 'icon-search'
						}).show();
					}
					,
				}]
				,

			});

			topPanel.render('top_panel');

		},
		failure : function() {
			Ext.Msg.show({
						title : '错误提示',
						msg : '数据加载失败！',
						buttons : Ext.Msg.OK,
						icon : Ext.Msg.ERROR
					});
		}
	});

}