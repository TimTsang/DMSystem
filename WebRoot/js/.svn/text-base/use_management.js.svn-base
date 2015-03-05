/**
 * @author TimTsang
 * @date 2014年8月16日
 * @class UserManagementGridPanel
 * @extends Ext.grid.GridPanel
 * @description 用户管理信息列表
 */

Ext.onReady(function() {
	var proxy = new Ext.data.HttpProxy({
				url : 'findAllUser',
				method : 'POST'
				,
			});// 获取json数据
	var reader = new Ext.data.JsonReader({
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
	UserManagementStore = new Ext.data.Store({
				proxy : proxy,
				reader : reader
			});

	UserManagementGridPanel = new Ext.grid.GridPanel({
				store : UserManagementStore,
				columns : [{
							id : 'accounts',
							header : "登录帐号",
							sortable : true,
							align : 'center',
							dataIndex : 'accounts'
						}, {
							header : "密码",
							sortable : true,
							align : 'center',
							dataIndex : 'password'
						}, {
							header : "用户姓名",
							sortable : true,
							align : 'center',
							dataIndex : 'name'
						}, {
							header : "单位",
							sortable : true,
							align : 'center',
							dataIndex : 'department'
						}, {
							header : "警号",
							sortable : true,
							align : 'center',
							dataIndex : 'no'
						}],
				loadMask : true, // 加载时有加载的图标
				stripeRows : true,
				height : 550,
				frame : true,
				title : '用户信息列表',
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
							text : "添加用户",
							iconCls : "button_add",
							listeners : {
								'click' : function() {
									addUser();
								}
							}
							,
						}, {
							text : "删除用户",
							iconCls : "button_delete",
							handler : removeUser
							,
						}, {
							text : "编辑用户",
							iconCls : "button_edit",
							listeners : {
								'click' : function() {
									editUser();
								}
							}
							,
						}],
				bbar : new Ext.PagingToolbar({
							pageSize : 20,
							store : UserManagementStore,
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

	function addUser() {
		var win = new Ext.Window({
			title : "添加用户",
			width : 275,
			height : 210,
			modal : true,
			resizable : false,
			iconCls : "button_add2",
			items : {
				width : 260,
				height : 180,
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
												win.close();
												UserManagementStore.reload();
											},
											failure : function() {
												Ext.Msg.show({
															title : '错误提示',
															msg : '请将表单填写完整！',
															buttons : Ext.Msg.OK,
															icon : Ext.Msg.ERROR
														});
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
							xtype : "textfield",
							id : 'accounts',
							fieldLabel : "登录帐号",
							name : "user.accounts",
							width : 150,
							allowBlank : false,
							blankText : '请填写账号',
							minLength : 4,
							minLengthText : '帐号·至少4个字符',
							maxLength : 20,
							maxLengthText : '帐号·最多20个字符'
							,
						}, {
							xtype : "textfield",
							id : 'password',
							fieldLabel : "密码",
							name : "user.password",
							width : 150,
							inputType : "password",
							allowBlank : false,
							blankText : '请填写密码',
							minLength : 4,
							minLengthText : '密码·至少4个字符',
							maxLength : 20,
							maxLengthText : '密码·最多20个字符'
							,
						}, {
							xtype : "textfield",
							id : 'name',
							fieldLabel : "用户姓名",
							name : "user.name",
							width : 150,
							allowBlank : false,
							blankText : '请填写用户姓名'
							,
						}, {
							xtype : "textfield",
							id : 'department',
							fieldLabel : "单位",
							name : "user.department",
							width : 150,
							allowBlank : false,
							blankText : '请填写单位'
							,
						}, {
							xtype : "textfield",
							id : 'no',
							fieldLabel : "警号",
							name : "user.no",
							width : 150,
							allowBlank : false,
							blankText : '请填写警号'
							,
						}]

			}

		}).show();

	}

	function editUser() {
		var win = new Ext.Window({
			title : "编辑用户",
			width : 275,
			height : 210,
			modal : true,
			resizable : false,
			iconCls : "button_edit2",
			items : {
				width : 260,
				height : 180,
				labelAlign : "left",
				labelWidth : 60,
				fileUpload : true,
				layout : "form",
				xtype : "form",
				id : "form",
				frame : true,
				iconCls : "button_edit",
				buttons : [{
							text : "保存",
							handler : function() {
								var userId = record.id;
								var userAuthority = record.authority;
								win.getComponent(0).getForm().submit({
											url : "updateUserMsg",
											params : {
												"user.id" : userId,
												"user.authority" : userAuthority
											},
											waitMsg : '请稍候',
											waitTitle : '正在提交表单数据，请稍候。。。。。。',
											success : function() {
												win.close();
												UserManagementStore.reload();
											},
											failure : function() {
												Ext.Msg.show({
															title : '错误提示',
															msg : '请将表单填写完整！',
															buttons : Ext.Msg.OK,
															icon : Ext.Msg.ERROR
														});
											}
										});
							},
							iconCls : "button1"
						}, {
							text : "取消",
							listeners : {
								'click' : function() {
									Ext.Msg.confirm('温馨提示', '您确定要取消编辑此用户？',
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
							id : 'accounts',
							fieldLabel : "登录帐号",
							name : "user.accounts",
							width : 150,
							allowBlank : false,
							blankText : '请填写账号',
							minLength : 4,
							minLengthText : '帐号·至少4个字符',
							maxLength : 20,
							maxLengthText : '帐号·最多20个字符'
						}, {
							xtype : "textfield",
							id : 'password',
							fieldLabel : "密码",
							name : "user.password",
							width : 150,
							allowBlank : false,
							blankText : '请填写密码',
							minLength : 4,
							minLengthText : '密码·至少4个字符',
							maxLength : 20,
							maxLengthText : '密码·最多20个字符'
						}, {
							xtype : "textfield",
							id : 'name',
							fieldLabel : "用户姓名",
							name : "user.name",
							width : 150,
							allowBlank : false,
							blankText : '请填写用户姓名'
						}, {
							xtype : "textfield",
							id : 'department',
							fieldLabel : "单位",
							name : "user.department",
							width : 150,
							allowBlank : false,
							blankText : '请填写单位'
						}, {
							xtype : "textfield",
							id : 'no',
							fieldLabel : "警号",
							name : "user.no",
							width : 150,
							allowBlank : false,
							blankText : '请填写警号'
						}]
			}
		});
		// 获得当前选中的记录
		var record = UserManagementGridPanel.getSelectionModel().getSelected();
		if (record == null) {
			Ext.Msg.confirm("提示", "请选择要编辑的用户！");
		} else {
			win.show();
			win.getComponent(0).getForm().loadRecord(record);
		}

	}

	function removeUser() {
		Ext.Msg.confirm('温馨提示', '您确定要删除该用户吗？', function(btn) {
					if (btn == 'yes') {
						var record = UserManagementGridPanel
								.getSelectionModel().getSelected();
						if (record == null) {
							Ext.Msg.confirm("温馨提示", "请选择您要删除的用户！");
						} else {
							var userId = record.id;
							var accounts = record.data.accounts;
							if (accounts != "admin") {
								Ext.Ajax.request({
											url : "deleteUser",
											params : {
												"user.id" : userId
												,
											},
											callback : function() {
												UserManagementGridPanel.store
														.remove(record);
												Ext.Msg
														.confirm("温馨提示",
																"删除成功！");
											}
										});
							} else {
								Ext.Msg.show({
											title : '警告',
											msg : '管理员用户不能删除！',
											buttons : Ext.Msg.OK,
											icon : Ext.Msg.ERROR
										});
							}

						}
					}
				});
	}

	UserManagementStore.load({// 加载数据
		params : {
			start : 0,
			limit : 20
		}
	});
	UserManagementGridPanel.render('use_management');
});