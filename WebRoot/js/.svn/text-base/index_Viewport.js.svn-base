/**
 * @author TimTsang
 * @date 2014年7月18日
 * @class MainViewport
 * @extends Ext.Viewport
 * @description 查询主界面
 */

Ext.BLANK_IMAGE_URL = 'resources/images/default/s.gif';

Ext.QuickTips.init();

Ext.Ajax.request({
	method : "POST",
	url : 'getUserMsg',
	success : function(response, options) {
		var jsonObj = Ext.util.JSON.decode(response.responseText);
		currentUser = '当前用户 ： ' + jsonObj.accounts;
		
		var user_management = new Ext.Panel({});

		if (jsonObj.accounts == "admin") {
			user_management = new Ext.tree.TreePanel({
				title : '用户管理',
				iconCls : 'icon-nav',
				useArrows : true,
				autoScroll : true,
				animate : true,
				enableDD : true,
				containerScroll : true,
				rootVisible : false,
				frame : true,
				expanded : true,
				root : {
					nodeType : 'async'
				},
				loader : new Ext.tree.TreeLoader({
							dataUrl : 'json/use-management.json'
						}),
				listeners : {
					'click' : function(node) {
						if (node.leaf) {
							var tabPanel = Ext.getCmp('my_center');
							if (node.attributes.id == 4) {
								var tab = tabPanel.add({
									id : node.id,
									title : node.text,
									html : "<iframe src='use_management.html' id='test' frameborder=0 width=100% height=100%></iframe>",
									closable : true,
									enableTabScroll : true,
									autoScroll : true,
									activeItem : 0,
									iconCls : 'icon-search'
								}).show();
							}
						}
					}
				}
				,
			});
		}

		var west = new Ext.Panel({
			title : currentUser,
			iconCls : 'icon-user',
			id : 'accordion-panel',
			layout : 'border',
			region : 'west',
			margins : '2 0 5 5',
			width : 200,
			minSize : 200,
			maxSize : 250,
			enableRerfesh : true,
			bodyStyle : 'background-color:#DFE8F6',
			defaults : {
				border : false
			},
			items : [{
				layout : 'accordion',
				region : 'center',
				items : [new Ext.tree.TreePanel({
					title : '单模型查询',
					iconCls : 'icon-nav',
					useArrows : true,
					autoScroll : true,
					animate : true,
					enableDD : true,
					containerScroll : true,
					rootVisible : false,
					frame : true,
					expanded : true,
					root : {
						nodeType : 'async'
					},
					loader : new Ext.tree.TreeLoader({
								dataUrl : 'getModel'
							}),

					listeners : {
						'checkchange' : function(node, checked) {
							if (checked) {
								if (node.leaf) {
									var tabPanel = Ext.getCmp('my_center');
									Ext.Ajax.request({
										method : "POST",
										url : 'setModelsId',
										params : {
											modelId : node.attributes.id,
											model : node.attributes.text
											,
										},
										success : function(response, options) {
											var tab1 = tabPanel.add({
												id : node.id,
												title : node.text,
												html : "<iframe src='VLsearch.html' frameborder=0 width=100% height=100%></iframe>",
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
							} else {
								if (node.leaf) {
									var tabPanel = Ext.getCmp('my_center');
									var tabPanel1 = Ext
											.getCmp(node.attributes.id);
									tabPanel.remove(tabPanel1);
								}
							}

						}
						,

					}
					,
				}), /*new Ext.tree.TreePanel({
					title : '多模型查询',
					iconCls : 'icon-nav',
					useArrows : true,
					autoScroll : true,
					animate : true,
					enableDD : true,
					containerScroll : true,
					rootVisible : false,
					frame : true,
					expanded : true,
					root : {
						nodeType : 'async'
					},
					loader : new Ext.tree.TreeLoader({
								dataUrl : 'json/multi-model-check.json'
							}),
					listeners : {
						'click' : function(node) {
							if (node.leaf) {
								var tabPanel = Ext.getCmp('my_center');
								if (node.attributes.id == 3) {
									var tab = tabPanel.add({
										id : node.id,
										title : "多模型查询",
										html : "<iframe src='multi_search.html' id='test' frameborder=0 width=100% height=100%></iframe>",
										closable : true,
										enableTabScroll : true,
										autoScroll : true,
										activeItem : 0,
										iconCls : 'icon-search'
									}).show();
								}
							}
						}
					}
					,
				}),*/ new Ext.tree.TreePanel({
					title : '查看常用信息',
					iconCls : 'icon-nav',
					useArrows : true,
					autoScroll : true,
					animate : true,
					enableDD : true,
					containerScroll : true,
					rootVisible : false,
					frame : true,
					expanded : true,
					root : {
						nodeType : 'async'
					},
					loader : new Ext.tree.TreeLoader({
								dataUrl : 'json/common-information.json'
							}),
					listeners : {
						'checkchange' : function(node, checked) {
							if (checked) {
								if (node.leaf) {
									var tabPanel = Ext.getCmp('my_center');
									if (node.attributes.id == 1) {
										var tab1 = tabPanel.add({
											id : node.id,
											title : node.text,
											html : "<iframe src='area_code.html' frameborder=0 width=100% height=100%></iframe>",
											closable : true,
											enableTabScroll : true,
											autoScroll : true,
											activeItem : 0,
											iconCls : 'icon-search'
										}).show();
									}
									if (node.attributes.id == 2) {
										var tab2 = tabPanel.add({
											id : node.id,
											title : node.text,
											html : "<iframe src='civil_airport_code.html' frameborder=0 width=100% height=100%></iframe>",
											closable : true,
											enableTabScroll : true,
											autoScroll : true,
											activeItem : 0,
											iconCls : 'icon-search'
										}).show();
									}
								}
							} else {
								if (node.leaf) {
									var tabPanel = Ext.getCmp('my_center');
									var tabPanel1 = Ext.getCmp(1);
									var tabPanel2 = Ext.getCmp(2);
									if (node.attributes.id == 1) {
										tabPanel.remove(tabPanel1);
									}
									if (node.attributes.id == 2) {
										tabPanel.remove(tabPanel2);
									}
								}
							}

						}
						,
					}
					,
				}), user_management]

			}],
			bbar : [{
				text : '开始',
				iconCls : 'icon-plugin',
				menu : new Ext.menu.Menu({
					items : [{
						text : '修改密码',
						iconCls : 'x-icon-cog_edit',
						handler : function() {

							var win = new Ext.Window({
								title : "修改密码",
								width : 275,
								height : 160,
								modal : true,
								resizable : false,
								iconCls : 'x-icon-cog_edit',
								items : {
									width : 260,
									height : 130,
									labelAlign : "left",
									labelWidth : 60,
									fileUpload : true,
									layout : "form",
									xtype : "form",
									id : "form",
									frame : true,
									iconCls : 'x-icon-cog_edit',
									buttons : [{
										text : "保存",
										handler : function() {
											win.getComponent(0).getForm()
													.submit({
														url : "changePassword",
														waitMsg : '请稍候',
														waitTitle : '正在修改密码，请稍候。。。。。。',
														success : function() {
															win.close();
															Ext.Msg
																	.confirm(
																			'温馨提示',
																			'修改完密码是否需要重新登录?',
																			function(
																					btn) {
																				if ('yes' == btn) {
																					Ext.Ajax
																							.request(
																									{
																										url : 'exit',
																										success : function() {
																											location = 'login.html';
																										},
																										failure : function() {
																											Ext.Msg
																													.show(
																															{
																																title : '错误提示',
																																msg : '退出系统失败!',
																																icon : Ext.Msg.ERROR,
																																buttons : Ext.Msg.OK
																															});
																										}
																									});
																				}
																			});
														}
													});
										},
										iconCls : "button1"
									}, {
										text : "取消",
										listeners : {
											'click' : function() {
												Ext.Msg.confirm('温馨提示',
														'您确定要取消修改密码？',
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
												fieldLabel : "原密码",
												inputType : "password",
												id : "old_password",
												name : "old_password",
												width : 150,
												vtype : "checkuserpassword",// 自定义的验证类型
												vtypeText : "您输入的密码有误！"
											}, {
												xtype : "textfield",
												fieldLabel : "新密码",
												inputType : "password",
												id : "new_password",
												name : "new_password",
												width : 150
											}, {
												xtype : "textfield",
												fieldLabel : "确认密码",
												inputType : "password",
												id : "password",
												name : "password",
												width : 150,
												vtype : "checkpassword",// 自定义的验证类型
												vtypeText : "两次密码不一致！",
												confirmTo : "new_password"
											}]
								}
							}).show();

							Ext.apply(Ext.form.VTypes, {
										checkuserpassword : function(value,
												field) {
											return (value == jsonObj.password);
										}
									});

							Ext.apply(Ext.form.VTypes, {
										checkpassword : function(val, field) {
											if (field.confirmTo) {
												var pwd = Ext
														.get(field.confirmTo);
												return (val == pwd.getValue());
											}
											return true;
										}
									});
						}

					}, {
						text : '退出系统',
						iconCls : 'icon-delete',
						handler : function() {
							Ext.Msg.confirm('温馨提示', '您确定要退出本系统?',
									function(btn) {
										if ('yes' == btn) {
											Ext.Ajax.request({
												url : 'exit',
												success : function() {
													location = 'login.html';
												},
												failure : function() {
													Ext.Msg.show({
																title : '错误提示',
																msg : '退出系统失败!',
																icon : Ext.Msg.ERROR,
																buttons : Ext.Msg.OK
															});
												}
											});
										}
									});
						}
					}]
				})
			}]
			,

		});

		var center = new Ext.TabPanel({
					id : 'my_center',
					style : "padding:3px 0 5px 0",
					region : "center",
					activeItem : 0,
					enableTabScroll : true,
					items : [{
								xtype : "panel",
								id : "index",
								iconCls : "icon-home",
								title : "首页",
								html : '<img src="images/bg.jpg"/>'
							}]
				});

		Ext.onReady(function() {
					setTimeout(function() {
								Ext.get('loading').remove();
								Ext.getDom('header').style.visibility = 'visible';
								Ext.getDom('footer').style.visibility = 'visible';
								var MainViewport = new Ext.Viewport({
											layout : 'border',
											defaults : {
												split : true
											},
											items : [{
														xtype : 'box',
														region : 'north',
														applyTo : 'header',
														height : 30,
														split : false
													}, west, center, {
														xtype : 'box',
														region : 'south',
														applyTo : 'footer',
														height : 40,
														split : false
													}]
										});
							}, 500);
				});

	},
	failure : function() {
		Ext.Msg.show({
					title : '错误提示',
					msg : '登录失败！请检查您用户名和密码是否填写正确！',
					buttons : Ext.Msg.OK,
					icon : Ext.Msg.ERROR
				});
	}
});
