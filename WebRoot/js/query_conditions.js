/**
 * @author TimTsang
 * @date 2014年8月13日
 * @class QueryGridPanel
 * @extends Ext.grid.GridPanel
 * @description 查询条件数据加载表格
 */
Ext.onReady(function() {
			var proxy = new Ext.data.HttpProxy({
						url : 'getQueryRecordModle'
					});// 获取json数据
			var reader = new Ext.data.JsonReader({
						totalProperty : "results",
						root : "rows"
						,
					}, [{
								name : 'andor'
							}, {
								name : 'objName'
							}, {
								name : 'ChineseObjName'
							}, {
								name : 'select'
							}, {
								name : 'conditions'
							}, {
								name : 'deltat'
							}]);
			var QueryStore = new Ext.data.Store({
						proxy : proxy,
						reader : reader
					});

			var andor = {
				header : "且/或",
				align : 'center',
				width : 40,
				dataIndex : "andor",
				editable : true,
				renderer : function(v) {
					return VLMAP[v];
				}
				,
			};

			var objName = {
				header : "属性",
				sortable : true,
				dataIndex : 'objName',
				align : 'center',
				renderer : function(v) {
					return VLMAP[v];
				}
				,
			};

			var select = {
				header : "选择项",
				sortable : true,
				dataIndex : 'select',
				align : 'center',
				editable : true,
				renderer : function(v) {
					return VLMAP[v];
				}
				,
			};

			var conditions = {
				header : "条件",
				align : 'center',
				dataIndex : 'conditions',
				renderer : function(value) {
					if (typeof value == "string" || typeof value == "number") {
						return value;
					}
					if (value instanceof Date) {
						return value.format("Y-m-d H:i:s");
					}
					return value;
				}
			};

			var deltat = {
				header : "变量t",
				dataIndex : 'deltat',
				align : 'center',
				width : 60,
				dataIndex : 'deltat'
				,
			};

			var QueryGridPanel = new Ext.grid.GridPanel({
						store : QueryStore,
						autoEncode : true,
						loadMask : true, // 加载时有加载的图标
						stripeRows : true,
						height : 335,
						frame : true,
						columns : [andor, objName, select, conditions, deltat],
						viewConfig : {
							sortable : true,
							forceFit : true,// 每列自动充满Grid
							stripeRows : true,
							enableRowBody : true,
							deferEmptyText : '请稍后...'
						},
						plugins : new Ext.ux.PanelResizer({
									minHeight : 10
								}),
						bbar : new Ext.PagingToolbar({
									pageSize : 20,
									store : QueryStore,
									displayInfo : true,
									displayMsg : '第 {0} - {1} 条  共 {2}条',
									emptyMsg : "没有记录",
									plugins : new Ext.ux.ProgressBarPager()
								})
					});

			QueryStore.load({// 加载数据
				params : {
					start : 0,
					limit : 10
				}
			});

			QueryGridPanel.render('query_conditions_grid');
		});