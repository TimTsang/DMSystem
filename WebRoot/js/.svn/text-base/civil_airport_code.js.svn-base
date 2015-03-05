/**
 * @author TimTsang
 * @date 2014年7月18日
 * @class CivilAirportCodeGridPanel
 * @extends Ext.grid.GridPanel
 * @description 民航机场代码表加载表格
 */
Ext.onReady(function() {
			var proxy = new Ext.data.HttpProxy({
						url : 'findAirportCode',
						method : 'POST',
					});// 获取json数据
			var reader = new Ext.data.JsonReader({
						totalProperty : "results",
						root : "rows"
					}, [{
								name : 'code'
							}, {
								name : 'name'
							},]);
			 CivilAirportCodeStore = new Ext.data.Store({
						proxy : proxy,
						reader : reader
					});
			var CivilAirportCodeGridPanel = new Ext.grid.GridPanel({
						store : CivilAirportCodeStore,
						columns : [{
									id : 'code',
									header : "民航机场代码",
									sortable : true,
									align : 'center',
									dataIndex : 'code'
								}, {
									header : "民航机场名",
									sortable : true,
									align : 'center',
									dataIndex : 'name'
								}],
						loadMask : true, // 加载时有加载的图标
						stripeRows : true,
						height : 545,
						frame : true,
						title : '查看民航机场代码',
						iconCls : 'icon-search',
						layout : 'fit',
						viewConfig : {
							forceFit : true, 
							scrollOffset : 0
						},
						plugins : new Ext.ux.PanelResizer({
									minHeight : 100
								}),
						tbar : [{
									text : "查询民航机场代码",
									iconCls : "icon-search2",
									listeners : {
										'click' : function() {
											searchCivilAirportCode();
										}
									}
								}],
						bbar : new Ext.PagingToolbar({
									pageSize : 20,
									store : CivilAirportCodeStore,
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
								})
					});
			
			function searchCivilAirportCode() {
	    		var win = new Ext.Window({
	    			title : "查询民航机场代码",
	    			width : 275,
	    			height : 130,
	    			modal : true,
	    			resizable : false,
	    			iconCls : "button_add2",
	    			items : {
	    				width : 260,
	    				height : 100,
	    				labelAlign : "left",
	    				labelWidth : 80,
	    				fileUpload : true,
	    				layout : "form",
	    				xtype : "form",
	    				id : "form",
	    				frame : true,
	    				iconCls : "button_add",
	    				buttons : [{
	    							text : "提交",
	    							handler : function() {
	    								var codeValue = Ext.getCmp('code').getValue();
	    								var nameValue = Ext.getCmp('name').getValue();
	    								CivilAirportCodeGridPanel.getStore().load({
	    									params : {
												"airportCode.code" : codeValue,
												"airportCode.name" : nameValue
											},
		    								callback:function(){
		    									//win.close();
		    								}
	    								});
	    								win.close();
	    							},
	    							iconCls : "button1"
	    						}, {
	    							text : "取消",
	    							listeners : {
	    								'click' : function() {
	    									Ext.Msg.confirm('温馨提示', '您确定要取消此次查找？',
	    											function(btn) {
	    												if (btn == 'yes') {
	    													win.close();
	    												}
	    											})
	    								}
	    							},
	    							iconCls : "button2"
	    						}, {
	    							text : "重置",
	    							handler : function() {
	    								var form = Ext.getCmp("form");
	    								form.getForm().reset();
	    							},
	    							iconCls : "button3"
	    						}],
	    				items : [{
	    							xtype : "textfield",
	    							id : 'code',
	    							fieldLabel : "民航机场代码",
	    							name : "code",
	    							width : 150
	    						}, {
	    							xtype : "textfield",
	    							id : 'name',
	    							fieldLabel : "民航机场名",
	    							name : "name",
	    							width : 150
	    						}]
	    			}
	    		}).show();
	    		
	    	}
			
			CivilAirportCodeStore.load({// 加载数据
				params : {
					start : 0,
					limit : 20
				}
			});
			CivilAirportCodeGridPanel.render('civil_airport_code_grid');
		});