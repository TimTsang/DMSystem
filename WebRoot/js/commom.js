/**
 * @author TimTsang
 * @date 2014年7月18日
 * @description 公用json数据源
 */
var proxy_select = new Ext.data.HttpProxy({
			url : 'json/editor-grid-select.json'
		});// 获取json数据
var reader_select = new Ext.data.JsonReader({
			totalProperty : "results",
			root : "rows"
		}, [{
					name : 'id'
				}, {
					name : 'Eselect'
				}, {
					name : 'Cselect'
				},]);
var store_select = new Ext.data.Store({
			proxy : proxy_select,
			reader : reader_select
		});
store_select.load(); // 加载数据
var proxy_andor = new Ext.data.HttpProxy({
			url : 'json/editor-grid-andor.json'
		});// 获取json数据
var reader_andor = new Ext.data.JsonReader({
			totalProperty : "results",
			root : "rows"
			,
		}, [{
					name : 'id'
				}, {
					name : 'Eandor'
				}, {
					name : 'Candor'
				},]);
var store_andor = new Ext.data.Store({
			proxy : proxy_andor,
			reader : reader_andor
		});
store_andor.load(); // 加载数据

