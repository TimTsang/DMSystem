function addEmployee() {

	var win = new Ext.Window({
		title : "用户管理",
		width : 275,
		height : 260,
		modal : true,
		resizable : false,
		iconCls : "button_add2",
		items : {
			title : "添加用户",
			width : 260,
			height : 230,
			labelAlign : "left",
			labelWidth : 60,
			fileUpload : true,
			layout : "form",
			xtype : "form",
			id : "form",
			frame : true,
			iconCls : "button_add",
			buttons : [{
						text : "保存",
						handler : function() {
							win.getComponent(0).getForm().submit({
										url : "addUser",
										waitMsg : '请稍候',
										waitTitle : '正在提交表单数据，请稍候。。。。。。',
										success : function() {
											var proxy = new Ext.data.HttpProxy(
													{
														url : 'findAllUser',
														method : 'POST'
														,
													});// 获取json数据
											var reader = new Ext.data.JsonReader(
													{
														totalProperty : "results",
														root : "rows"
														,
													}, [{
																name : 'accounts'
															}, {
																name : 'password'
															}, {
																name : 'name'
															}, {
																name : 'department'
															}, {
																name : 'no'
															},]);
											// console.dir(reader.totalProperty);
											UserManagementStore = new Ext.data.Store(
													{
														proxy : proxy,
														reader : reader
													});
											Ext.Msg.alert('信息', '操作成功!');
											win.close();
											console.dir(UserManagementStore);
											UserManagementStore.load({// 加载数据
												params : {
													start : 0,
													limit : 8
												}
											});
											// UserManagementStore.reload();
											// Ext.onReady(UserManagement());
										}
									});
						},
						iconCls : "button1"
					}, {
						text : "取消",
						listeners : {
							'click' : function() {
								Ext.Msg.confirm('温馨提示', '您确定要取消添加此用户？',
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
						// xtype : "hidden",
						xtype : "textfield",
						fieldLabel : "登录帐号",
						name : "user.accounts",
						width : 150
					}, {
						xtype : "textfield",
						fieldLabel : "密码",
						inputType : "password",
						name : "user.password",
						width : 150
					}, {
						xtype : "textfield",
						fieldLabel : "用户姓名",
						name : "user.name",
						width : 150
					}, {
						xtype : "textfield",
						fieldLabel : "单位",
						name : "user.department",
						width : 150
					}, {
						xtype : "textfield",
						fieldLabel : "警号",
						name : "user.no",
						width : 150
					}]
		}
	}).show();
	/*
	 * win.on('beforeclose', function(target) { this.hide(); return false; });
	 */
}
function editEmployee() {
	var win = new Ext.Window({
				title : "用户管理系统",
				width : 315,
				height : 330,
				iconCls : "button_edit2",
				items : {
					title : "编辑用户",
					width : 300,
					height : 300,
					labelAlign : "left",
					labelWidth : 60,
					fileUpload : true,
					layout : "form",
					xtype : "form",
					id : "form",
					iconCls : "button_edit",
					buttons : [{
								text : "保存",
								handler : function() {
									win.getComponent(0).getForm().submit({
												url : "employee",
												success : function() {
													alert("提交成功！");
													win.close();
													vstore.reload();
												}
											});
								},
								iconCls : "button1"
							}, {
								text : "取消",
								handler : function() {
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
								xtype : "hidden",
								name : "id"
							}, {
								xtype : "textfield",
								fieldLabel : "姓名",
								name : "name",
								width : 200
							}, {
								xtype : "textfield",
								fieldLabel : "密码",
								inputType : "password",
								name : "password",
								width : 200
							}, {
								xtype : "textfield",
								fieldLabel : "电子邮件",
								name : "email",
								width : 200
							}, {
								xtype : "datefield",
								fieldLabel : "出生日期",
								name : "bornDate",
								format : "Y-m-d",
								width : 200
							}, {
								xtype : "textarea",
								fieldLabel : "简介",
								name : "intro",
								width : 220,
								height : 120
							}]
				}
			});
	// 获得当前选中的记录
	var record = grid.getSelectionModel().getSelected();
	if (record == null) {
		Ext.Msg.confirm("提示", "请选择要编辑的用户！");
	} else {
		win.show();
		win.getComponent(0).getForm().loadRecord(record);
	}
}
function removeEmployee() {
	Ext.Msg.confirm("提示", "数据删除后无法恢复，是否确认要删除？", function(btn) {
				if (btn == "yes") {
					var record = grid.getSelectionModel().getSelected();
					var vid = record.get("id");
					// 执行一Ajax请求,employee?cmd=remove&id=id
					// 如何发起
					Ext.Ajax.request({
								url : "employee",
								params : {
									cmd : "remove",
									id : vid
								},
								callback : function() {
									alert("已经删除！");
									vstore.reload();
								}
							})
				}
			});
}

/*
 * var grid = new Ext.grid.GridPanel({ title : "用户管理系统", store : vstore, iconCls :
 * "button_max", tbar : [{ text : "添加用户", iconCls : "button_add", handler :
 * addEmployee }, { text : "编辑用户", iconCls : "button_edit", handler :
 * editEmployee }, { text : "删除用户", iconCls : "button_delete", handler :
 * removeEmployee }, "-", "查询：", new Ext.form.TextField(), { text : "Go", cls :
 * 'x-btn-text-icon', icon : 'images/exticons/icon/user_go.png' // iconCls:
 * "button_go" }], columns : [{ header : "ID", dataIndex : "id", iconCls :
 * "button_id", width : 30 }, { header : "姓名", dataIndex : "name", sortable :
 * true }, { header : "密码", dataIndex : "password", width : 100 }, { header :
 * "电子邮件", dataIndex : "email", width : 200 }, { header : "出生日期", dataIndex :
 * "bornDate", width : 200, format : "Y-m-d" }, { header : "简介", dataIndex :
 * "intro", width : 100 }], bbar : new Ext.PagingToolbar({ store : vstore,
 * pageSize : 5 }) });
 */