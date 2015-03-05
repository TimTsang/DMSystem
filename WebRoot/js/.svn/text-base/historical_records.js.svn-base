/**
 * @author TimTsang
 * @date 2014年8月13日
 * @class HistoricalGridPanel
 * @extends Ext.grid.GridPanel
 * @description 查询记录数据加载表格
 */
Ext.onReady(function() {
	var proxy = new Ext.data.HttpProxy({
				url : 'getQueryRecord',
				method : "POST"
			});// 获取json数据
	var reader = new Ext.data.JsonReader({
				totalProperty : "results",
				root : "rows"
				,
			}, [{
						name : 'createTime'
					}, {
						name : 'model'
					}, {
						name : 'content'
					},]);
	var HistoricalStore = new Ext.data.Store({
				proxy : proxy,
				reader : reader
			});
	var HistoricalGridPanel = new Ext.grid.GridPanel({
		store : HistoricalStore,
		height : 520,
		columns : [{
					id : 'createTime',
					header : "查询时间",
					width : 40,
					sortable : true,
					align : 'center',
					dataIndex : 'createTime'
				}, {
					header : "模型名称",
					sortable : true,
					align : 'center',
					dataIndex : 'model'
				}, {
					header : "查询条件",
					xtype : 'actioncolumn',
					align : 'center',
					dataIndex : 'content',
					items : [{
						icon : 'images/book_open.png',
						tooltip : '查询条件',
						handler : function(grid, rowIndex, colIndex) {
							var store = grid.getStore();
							var rec = store.getAt(rowIndex);
							Ext.Ajax.request({
								method : "POST",
								url : 'setQueryRecordContent',
								params : {
									result : rec.get('content')
									,
								},
								success : function() {
									new Ext.Window({
										title : "查询条件",
										iconCls : 'query-conditions',
										layout : 'fit',
										width : 800,
										height : 370,
										resizable : false,
										plain : true,
										modal : true,
										html : '<iframe frameborder=0 width="100%" height="100%" allowtransparency="true" scrolling=auto src="query_conditions.html"></iframe>'
									}).show();
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
					}]
					,
				}, {
					header : "查看详情",
					xtype : 'actioncolumn',
					align : 'center',
					items : [{
						icon : 'images/zoom.png',
						tooltip : '查看详情',
						handler : function(grid, rowIndex, colIndex) {
							var store = grid.getStore();
							var rec = store.getAt(rowIndex);
							Ext.Ajax.request({
								method : "POST",
								url : 'setQueryRecordContent',
								params : {
									result : rec.get('content')
									,
								},
								success : function(responsoptions) {
									window.top.Ext.getCmp("my_center").add({
										title : "查询结果",
										html : "<iframe src='detail.html' id='test' frameborder=0 width=100% height=100%></iframe>",
										closable : true,
										enableTabScroll : true,
										autoScroll : true,
										activeItem : 0,
										iconCls : 'icon-search'
									}).show();
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
					}]
					,
				}],
		loadMask : true, // 加载时有加载的图标
		stripeRows : true,
		layout : 'fit',
		viewConfig : {
			forceFit : true,
			scrollOffset : 0
		},
		frame : true,
		title : '查看记录',
		iconCls : 'icon-search',
		plugins : new Ext.ux.PanelResizer({
					minHeight : 100
				}),
		bbar : new Ext.PagingToolbar({
					pageSize : 20,
					store : HistoricalStore,
					displayInfo : true,
					displayMsg : '第 {0} - {1} 条  共 {2}条',
					emptyMsg : "没有记录",
					plugins : new Ext.ux.ProgressBarPager()
				})
	});
	HistoricalStore.load({// 加载数据
		params : {
			start : 0,
			limit : 20
		}
	});
	HistoricalGridPanel.render('historical_records_grid');
});