/**
 * @author 曾家栩
 * @date 2014年7月18日
 * @class  grid_passenger
 * @extends Ext.grid.EditorGridPanel
 * @description 查询操作表格
 */
 /****************************************** 加载passenger的JSON数据 ************************************************/
        var proxy_passenger = new Ext.data.HttpProxy({
            url: 'json/editor-grid-passenger.json'
        });//获取json数据  
        var reader_passenger = new Ext.data.JsonReader({
            totalProperty: "results",
            root : "rows",
        }, [{
            name : 'id'
        }, { 
            name : 'andor'
        }, {
            name : 'objName'
        }, {
            name : 'ChineseObjName'
        }, {
            name : 'select'
        }, ]);
        var store_passenger = new Ext.data.Store({
            proxy  				 : proxy_passenger,
            reader 				 : reader_passenger,
            pruneModifiedRecords : true
        });
        store_passenger.load({
            callback: function(){
                var json = reader_passenger.jsonData;
                title = json.title;
                grid_passenger.setTitle(title);
            }
        }); //加载数据   
        /*****************************************************************************************************************/
        
/**************************************************passenger部分***********************************************************************/        
        var passenger_andor = {
            header: "且/或",
            align: 'center',
            width: 40,
            dataIndex: "andor",
            editable: true,
            renderer: function(v){
                return VLMAP[v];
            },
            editor: new Ext.form.ComboBox({
                store: store_andor,
                displayField: 'Candor',
                typeAhead: true,
                mode: 'local',
                forceSelection: true,
                valueField: 'Eandor',
                triggerAction: 'all',
                selectOnFocus: true,
                allowBlank: false,
                blankText: '不能为空！',
            })
        };
        
        var passenger_objName = {
            id: 'objName',
            header: "属性",
            sortable: true,
            dataIndex: 'objName',
            align: 'center',
            width: 200,
            renderer: function(v){
                return VLMAP[v];
            },
            editor: new Ext.form.ComboBox({
                store: store_passenger,
                displayField: 'objName',
                displayField: 'ChineseObjName',
                typeAhead: true,
                mode: 'local',
                forceSelection: true,
                valueField: 'objName',
                triggerAction: 'all',
                selectOnFocus: true,
                allowBlank: false,
                blankText: '不能为空！',
            }),
        
        };
        
		var passenger_conditions0 = {
            id: 'conditions',
            header: "条件",
            align: 'center',
            width: 160,
            dataIndex: 'conditions',
            editor: new Ext.form.TextField({
                allowBlank: false,
                blankText: '不能为空！',
                selectOnFocus: true,
            }),
            renderer: function(value){
				            if (typeof value == "string" || typeof value == "number") {
				                		return value;
				            }
				            if (value instanceof Date) {
				            		return value.format("Y-m-d H:i:s");
				            }
				            return value;
		          		}
        };
        
        var passenger_conditions1 = {
            id: 'conditions',
            header: "条件",
            sortable: true,
            align: 'center',
            width: 160,
            dataIndex: 'conditions',
            editor: new Ext.ux.form.DateTimeField({
                allowBlank: false,
                format: 'Y-m-d H:i:s',
                blankText: '不能为空！',
                selectOnFocus: true,
            }),
            renderer: function(value){
		                 	if (typeof value == "string" || typeof value == "number") {
		                            return value;
		                  	}
		                  	if (value instanceof Date) {
		                 			return value.format("Y-m-d H:i:s");
		                 	}
		                  	return value;
		              }
        };
        
        var passenger_conditions2 = {
            id: 'conditions',
            header: "条件",
            sortable: true,
            align: 'center',
            width: 160,
            dataIndex: 'conditions',
            editor: new Ext.form.TextField({
                disabled: true,
            }),
			renderer: function(value){
		                 	if (typeof value == "string" || typeof value == "number") {
		                            return value;
		                  	}
		                  	if (value instanceof Date) {
		                 			return value.format("Y-m-d H:i:s");
		                 	}
		                  	return value;
		              }
        };
		
        var passenger_select = {
            id: 'select',
            header: "选择项", 
            dataIndex: 'select',
            align: 'center',
            width: 160,
            editable: true,
            renderer: function(v){
                return VLMAP[v];
            },
            editor: new Ext.form.ComboBox({
                store: store_select,
                displayField: 'Cselect',
                typeAhead: true,
                mode: 'local',
                forceSelection: true,
                valueField: 'Eselect',
                triggerAction: 'all',
                selectOnFocus: true,
                allowBlank: false,
                blankText: '不能为空！',
            }),
        
        };
        
        var passenger_deltat0 = {
	            id: 'deltat',
	            header: "变量t",
	            //sortable: true,
	            align: 'center',
	            width: 60,
	            dataIndex: 'deltat',
	            editor: new Ext.form.TextField({
	                disabled: true,
	            }),
	        };
		
		var passenger_deltat1 = {
	            id: 'deltat',
	            header: "变量t",
	            //sortable: true,
	            align: 'center',
	            width: 60,
	            dataIndex: 'deltat',
	            editor: new Ext.form.TextField({
	                //disabled: true,
	            }),
	        };
      
        var passenger_icon = {
            xtype: 'actioncolumn',
            width: 50,
            align: 'center',
            items: [{
                icon: 'images/delete.gif',
                tooltip: '删除此条属性',
                handler: function(grid_passenger, rowIndex, colIndex){
                    var rec = store_passenger.getAt(rowIndex);
                    Ext.Msg.confirm('温馨提示', '您确定要删除' + " “ " + rec.get('ChineseObjName') + " ” " + '这条记录吗？', function(btn){
                        if (btn == 'yes') {
                            var sm = grid_passenger.getSelectionModel();
                            var cell = sm.getSelectedCell();
                            var record = store_passenger.getAt(cell[0]);
                            store_passenger.remove(record);
                        }
                    });
                }
            }, {
                icon: 'images/add.gif', 
                tooltip: '增加此条属性',
                handler: function(grid_passenger, rowIndex, colIndex){
                    var rec = store_passenger.getAt(rowIndex);
                    var defaultRec = {
                        andor          : 'and',
                        objName        : rec.get('objName'),
						ChineseObjName : rec.get('ChineseObjName'),
                        select         : "=",
                        conditions     : " ",
                        deltat         : "",
                        active         : true,
                    };
                    var newRecord_passenger = new store_passenger.recordType(defaultRec);
                    store_passenger.insert(0, newRecord_passenger);
                }
            }]
        };
        
        var grid_passenger = new Ext.grid.EditorGridPanel({
            id: 'passenger',
            header: true,
            iconCls: 'icon-passenger',
            autoEncode: true,
            loadMask: true,
            stripeRows: true,
            clicksToEdit: 1,
            ds: store_passenger,
            columns: [passenger_andor, passenger_objName, passenger_select, passenger_conditions0, passenger_deltat0, passenger_icon],
            stripeRows: true,
            //autoExpandColumn: 'objName',
            height: 320,
            frame: true,
            defaults: {
                sortable: true
            },
            viewConfig: {
                sortable: true,
                forceFit: true, //每列自动充满Grid
                stripeRows: true,
                enableRowBody: true,
                deferEmptyText: '请稍后...'
            },
            autoScroll: false,
            tbar: [{
                xtype: 'button',
                text: '添加属性',
                iconCls: 'add',
                handler: function(){
                    var defaultRec = {
                        andor          : "and",
                        objName 	   : "za_lyt_lkbh", 
			    		ChineseObjName : "旅客编号", 
                        select         : "=",
                        conditions     : " ",
                        deltat         : "",
                    };
                    var newRecord_passenger = new store_passenger.recordType(defaultRec);
                    store_passenger.insert(0, newRecord_passenger);
                },
            
            }, {
                xtype: 'button',
                text: '提交查询',
                iconCls: 'icon-search',
                handler: function(){
                    Ext.Msg.confirm('温馨提示', '您确定要提交吗？', function(btn){
                        if (btn == 'yes') {
                            var mr = store_passenger.getModifiedRecords();//获取所有更新过的记录
                            
                            //begin 将记录对象转换为字符串（json格式的字符串）
                            /*var vDatas = '[';
                             for (var i = 0; i < mr.length; i++) {
                             vDatas += Ext.util.JSON.encode(mr[i].data) + ',';
                             }
                             vDatas = vDatas.substr(0, vDatas.length - 1) + ']';
                             alert(vDatas);*/
                            //end 将记录对象转换为字符串（json格式的字符串）
                            
                            var resultArray = new Array();
                            for (var i = 0; i < mr.length; i++) {
                                var andor = mr[i].data["andor"];
                                var objName = mr[i].data["objName"];
                                var select = mr[i].data["select"];
                                var conditions = mr[i].data["conditions"];
                                var deltat = mr[i].data["deltat"];
                                resultArray[i] = {
                                    andor: andor,
                                    objName: objName,
                                    select: select,
                                    conditions: conditions,
                                    deltat:deltat,
                                };
                            }
                            var result_passenger = $.toJSON(resultArray);
                            alert(result_passenger);
                            
                            Ext.Ajax.request({
                                //请求地址
                                url: 'getResults',
                                //提交参数组
                                params: {
                                    result: result_passenger
                                },
                                //成功时回调
                                success: function(response, options){
                                    //获取响应的json字符串
                                    var responseArray = Ext.util.JSON.decode(response.responseText);
                                    /*if(responseArray.success==true){
                                     Ext.Msg.alert('恭喜','您提交成功！');
                                     }else{
                                     Ext.Msg.alert('失败','提交失败，请重新提交！');
                                     }*/
                                    Ext.Msg.alert(responseArray);
                                }
                            });
                            
                        }
                        
                    });
                }
            }, {
                xtype: 'button',
                text: '查看结果',
                iconCls: 'icon-result',
                handler: function(){
                    //console.log(123);
                    window.top.Ext.getCmp("my_center").add({
                        // 设置新Tab页面的属性
                        title: "查询结果",
                        html: "<iframe src='result.html' id='test' frameborder=0 width=100% height=100%></iframe>",
                        closable: true,
                        enableTabScroll: true,
                        autoScroll: true,
                        activeItem: 0,
                        iconCls: 'icon-search'
                    }).show();
                },
            
            }],
            listeners: {
                "beforeedit": function(e){ // 发生编辑事件前
                    var f = e.field;
                    var r = e.record;
                    if (f == 'conditions') { // 在编辑“动态输入”值前执行刷新cm
                        if (r.get('select').toString() == 'between') {
                            console.dir(e);
                            CONDITION = e;
                            showWindow(r);
                        }
                        else {
                            reRecode_two(1, r,passenger_andor,passenger_objName,passenger_select,passenger_icon);
                            reRecode_select_two(1, r,passenger_andor,passenger_objName,passenger_select,passenger_icon);
                            //alert("在编辑“动态输入”值前执行刷新cm");
                        }
                    }
                    if(f == 'deltat'){
                    	CONDITION = e;
                    	showDeltatWindow(r);
                    }
                },
                "afteredit": function(e){ // 发生编辑事件后
                    var f = e.field;
                    var r = e.record;
                    if (f == 'objName') {
                        reRecode_two(2, r,passenger_andor,passenger_objName,passenger_select,passenger_icon); // 在选择“选择列”值后刷新cm
                        //alert("在选择“选择列”值后刷新cm");
                    }
                    else 
                        if (f == 'select') {
                            reRecode_select_two(2, r,passenger_andor,passenger_objName,passenger_select,passenger_icon);
                        }
                }
            }
        });
        
        //1 ======== 功能方法 ==========================
        function checkValue(objName){
            if (typeof objName == "string" || typeof objName == "number") {
                return objName;
            }
            if (objName instanceof Date) {
                return objName.format("Y-m-d");
            }
            return objName;
        }
        /*
         : 1-- 编辑前 2-- 编辑后
         -- record
         */
        function reRecode_two(type, r,andor, objName, select, icon){
            var d1 = r.get('objName').toString();
            //var d2 = r.get('conditions').toString().replace(/(^\s*)|(\s*$)/g, "");
            if ((type == 1 || type == 2) && d1 != '') { // 无论编辑前编辑后都必须确保选择列有值
                if (d1 == 'za_lyt_lkbh' || 
				d1 == 'za_lyt_th' || 
				d1 == 'za_lyt_xm' ||
                d1 == 'za_lyt_xmpy' ||
                d1 == 'za_lyt_xb' ||
                d1 == 'za_lyt_mz' ||
                d1 == 'za_lyt_zjlx' ||
                d1 == 'za_lyt_zjhm' ||
                d1 == 'za_lyt_xzqh' ||
                d1 == 'za_lyt_czdz' ||
                d1 == 'za_lyt_rzjd' ||
                d1 == 'za_lyt_rzfh' ||
                d1 == 'za_lyt_rzdbry' ||
                d1 == 'za_lyt_tfdbry' ||
                d1 == 'za_lyt_xyklx' ||
                d1 == 'za_lyt_xykhm' ||
                d1 == 'za_lyt_zpcd' ||
                d1 == 'za_lyt_rzxh' ||
                d1 == 'za_lyt_bjw' ||
                d1 == 'za_lyt_sss') { // 字符串类型
                    colModel = new Ext.grid.ColumnModel([andor, objName, select, passenger_conditions0, passenger_deltat0,icon]);
                }
                else 
                    if (d1 == 'za_lyt_csrq' || 
					d1 == 'za_lyt_rzsj' || 
					d1 == 'za_lyt_tfsj' ||
                    d1 == 'za_lyt_fssj' ||
                    d1 == 'za_lyt_jssj' ||
                    d1 == 'za_lyt_qtjlcjsj' ||
                    d1 == 'za_lyt_htrksj' ||
                    d1 == 'za_lyt_rksj' ||
                    d1 == 'za_lyt_gxsj' ||
                    d1 == 'rksj') {
                        colModel = new Ext.grid.ColumnModel([andor, objName, select, passenger_conditions1,passenger_deltat1, icon]);
                    }
                /*if(type == 2){   // 如果选中选择列，则清空动态输入值
                 if(d2 != ''){
                 r.set('conditions','');
                 }
                 }*/
                grid_passenger.reconfigure(grid_passenger.getStore(), colModel);
            }
        }
        
        /*
         : 1-- 编辑前 2-- 编辑后
         -- record
         */
        function reRecode_select_two(type, r, andor,objName, select,icon){
            var d1 = r.get('select').toString();
            if ((type == 1 || type == 2) && d1 != '') { // 无论编辑前编辑后都必须确保选择列有值
                if (d1 == 'isNull') { // 字符串类型
                    colModel = new Ext.grid.ColumnModel([andor, objName, select, passenger_conditions2,passenger_deltat0,icon]);
                }
                else 
                    if (d1 == 'between') {
                        colModel = new Ext.grid.ColumnModel([andor, objName, select, passenger_conditions0,passenger_deltat1,icon]);
                    }
                    else {
                        reRecode_two(type, r,andor, objName, select,icon);
                    }
                grid_passenger.reconfigure(grid_passenger.getStore(), colModel);
            }
        }
        
        

