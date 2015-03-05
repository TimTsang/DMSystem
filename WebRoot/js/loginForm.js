/**
 * @author TimTsang
 * @date 2014年8月18日
 * @class loginForm
 * @extends Ext.FormPanel
 * @description 登录界面
 */
var username = {
	xtype : 'textfield',
	fieldLabel : '帐号',
	name : 'username',
	id : 'username',
	allowBlank : false,
	blankText : '请填写账号',
	msgTarget : 'side',
	minLength : 4,
	minLengthText : '帐号·至少4个字符',
	maxLength : 20,
	maxLengthText : '帐号·最多20个字符'

};

var password = {
	xtype : 'textfield',
	fieldLabel : '密码',
	inputType : 'password',
	name : 'password',
	id : 'password',
	allowBlank : false,
	blankText : '请填写密码',
	msgTarget : 'side',
	minLength : 4,
	minLengthText : '密码·至少4个字符',
	maxLength : 20,
	maxLengthText : '密码·最多20个字符'

};

Ext.onReady(function() {

			Ext.QuickTips.init();
			Ext.apply(Ext.QuickTips.getQuickTip(), {
						maxWidth : 200,
						minWidth : 100,
						showDelay : 50,
						trackMouse : true
					});
			function submitForm() {
				var username = document.getElementById("username").value;
				var password = document.getElementById("password").value;

				Ext.Ajax.request({
							method : "POST",
							url : 'login',
							params : {
								accounts : username,
								password : password
								,
							},
							success : function(response, option) {
								jsonObj = Ext.util.JSON
										.decode(response.responseText);
								if (jsonObj.success) {
									location.href = "index.html";
								} else {
									Ext.Msg.show({
												title : '错误提示',
												msg : '登录失败！请检查您的用户名和密码是否填写正确！',
												buttons : Ext.Msg.OK,
												icon : Ext.Msg.ERROR
											});
								}
							},
							failure : function() {
								Ext.Msg.show({
											title : '错误提示',
											msg : '登录失败！请检查您的用户名和密码是否填写正确！',
											buttons : Ext.Msg.OK,
											icon : Ext.Msg.ERROR
										});
							}
						});

			}
			var loginForm = new Ext.FormPanel({

						xtype : 'fieldset',
						labelAlign : 'right',
						labelWidth : 100,
						id : 'loginForm',
						frame : true,
						border : false,
						title : '<center>系统登录</center>',
						iconCls : 'icon-house_go',
						height : 160,
						items : [{
									xtype : 'box',
									height : 16
								}, username, password],
						bbar : [new Ext.ux.StatusBar({
											id : 'form-statusbar',
											iconCls : 'x-icon-accept',
											plugins : new Ext.ux.ValidationStatus(
													{
														form : 'loginForm'
													})
										}), '->', {
									iconCls : 'x-icon-help',
									xtype : 'button',
									text : '帮助',
									handler : project_help
									,

								}]

					});

			function project_help() {
				new Ext.Window({
							closeAction : 'close',
							resizable : false,
							bodyStyle : 'padding: 7',
							modal : true,
							title : '帮助',
							iconCls : 'x-icon-help',
							html : "账号长度至少4个字符，至多20个字符<br>密码长度至少4个字符，至多20个字符！",
							width : 300,
							height : 200
						}).show();
			}
			function register_newAccount() {

			}

			var enterBtn = {
				text : '登录',
				id : 'enter',
				iconCls : 'icon-door_in',
				name : 'enter',
				handler : submitForm

			};

			var resetBtn = {
				text : '重置',
				id : 'reset',
				name : 'reset',
				iconCls : 'icon-refresh',
				handler : resetForm

			};

			var window = new Ext.Window({

						width : 370,
						height : 210,
						resizable : false,
						closable : false,
						items : [loginForm],
						buttonAlign : 'center',
						buttons : [enterBtn, resetBtn]
					});
			window.show();
			window.on('beforeclose', function(target) {
						this.hide();
						return false;
					});

			function resetForm() {
				loginForm.form.reset();
			}

			login();

		});
function login() {

	Ext.QuickTips.register({
				target : Ext.getCmp('username'),
				title : '请输入您的帐号',
				width : 100,
				dismissDelay : 10000
			});
	Ext.QuickTips.register({
				target : Ext.getCmp('password'),
				title : '请输入您的密码',
				width : 100,
				dismissDelay : 10000
			});

};
