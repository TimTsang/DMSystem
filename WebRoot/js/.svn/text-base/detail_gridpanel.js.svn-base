/**
 * @author TimTsang
 * @date 2014年8月18日
 * @class DetailGridPanel
 * @extends Ext.grid.GridPanel
 * @description 查询结果数据加载表格
 */
Ext.onReady(function() {
	/**
	 * 同步ajax调用 返回json Object
	 * 
	 * @param {}
	 *            urlStr
	 * @param {}
	 *            paramsStr 为字符串键值对形式"key=value&key2=value2"
	 * @return {} 返回json Object
	 */
	function ajaxSyncCall(urlStr) {

		var obj;
		var result;
		// For IE
		if (window.ActiveXObject) {
			obj = new ActiveXObject('Microsoft.XMLHTTP');
		}
		// For Not IE
		else if (window.XMLHttpRequest) {
			obj = new XMLHttpRequest();
		}
		obj.onreadystatechange = function() {

			if (obj.readyState == 4 && obj.status == 200) {
				result = obj.responseText;

			}
		};
		// param:Type:'get/post';URL;sync(是否异步传输)
		obj.open('POST', urlStr, false);
		// obj.setRequestHeader('Content-Type',
		// 'application/x-www-form-urlencoded');
		obj.send(null);

		return result;
	}
	// var sm = new Ext.grid.CheckboxSelectionModel();
	var rn = new Ext.grid.RowNumberer();

	// 返回model和store的fields字段值
	function getFields() {
		var col = "[rn,";
		var stor_str = "[";
		var result = "";
		json = Ext.util.JSON.decode(ajaxSyncCall("getQueryRerult"));
		
		console.dir(json);
		if (json) {
			// 遍历外层对象
			for (data in json) {
				// 第二层循环,遍历数组
				for (dt1 in json[data]) {
					// 第三层循环，遍历hash数据
					for (dt2 in json[data][dt1]) {
						// 将header和dataIndex的值一hash格式传到数组中，在声明columnModel时用
						// var temp = {};
						col += "{header:" + "'" + dt2 + "',";
						col += "dataIndex:" + "'" + dt2 + "'},";
						// col += "dataIndex:" + "'" + dt2 + "',";
						// col += sm+"'"+dt2+"',";
						// col +=new Ext.grid.RowNumberer()+"'"+dt2+"',";
						// col += "editor:{ xtype:'textfield',allowBlank:
						// false}},";
						stor_str += "{name:" + "'" + dt2 + "'},";
					}
					col = col.substring(0, col.lastIndexOf(","));
					stor_str = stor_str.substring(0, stor_str.lastIndexOf(","));
					col += "]";
					stor_str += "]";
					result = col + "$" + stor_str;
					return result;
				}
			}
		} else {
			Ext.Msg.show({
						title : '错误提示',
						msg : '数据加载失败！',
						buttons : Ext.Msg.OK,
						icon : Ext.Msg.ERROR
					});
		}

	}

	var result = getFields();
	// alert(result);
	var index = result.indexOf("$");
	var columnModel = result.substring(0, index);
	var storeStr = result.substring(index + 1);
	// var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel(
			// new Ext.grid.RowNumberer(),
			// sm,
			eval(columnModel)

	);
	cm.defaultSortable = true;
	// ArrayReader
	var store = new Ext.data.Store({
				// totalProperty : "results",
				root : 'coders',
				proxy : new Ext.data.MemoryProxy(json),
				reader : new Ext.data.JsonReader({
							// totalProperty : "results",
							idProperty : "threadid",
							root : "coders"
							,
						}, eval(storeStr))
			});
	store.load({
				params : {
					start : 0,
					limit : 5
				}
			});

	var grid = new Ext.grid.GridPanel({
				store : store,
				title : '查看结果',
				iconCls : 'icon-search',
				cm : cm,
				el : grid,
				height : 520,
				loadMask : true,
				stripeRows : true,
				frame : true,
				layout : 'fit',
				plugins : new Ext.ux.PanelResizer({
							minHeight : 100
						}),
				tbar : [{
					text : "查看VisuaLinks操作结果",
					iconCls : "query-conditions",
					listeners : {
						'click' : function() {
							Ext.Ajax.request({
										method : "POST",
										url : 'VisualLink',
										success : function(response, options) {
											jsonObj = Ext.util.JSON.decode(response.responseText);
											if(jsonObj.success == false){
												Ext.Msg.show({
													title : '警告',
													msg : '条件模糊，请进行精确查询！',
													buttons : Ext.Msg.OK,
													icon : Ext.Msg.ERROR
												});
											}
										}
									});
						}
					}
					,
				}, {
					text : "打印Excel表",
					iconCls : "icon-excel",
					listeners : {
						'click' : function() {
							location.href = "getExcel";
						}
					}
					,
				}],
				bbar : new Ext.PagingToolbar({
							pageSize : 5,
							store : store,
							beforePageText : "当前第",
							afterPageText : "页，共{0}页",
							lastText : "尾页",
							nextText : "下一页",
							prevText : "上一页",
							firstText : "首页",
							refreshText : "刷新页面",
							displayInfo : true,
							displayMsg : '第 {0} - {1} 条  共 {2}条',
							emptyMsg : "没有记录",
							plugins : new Ext.ux.ProgressBarPager()
							,
						})
				,

			});
	grid.render('detail-grid');

});