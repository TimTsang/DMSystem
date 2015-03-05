/**
 * @author 曾家栩
 * @date 2014年8月12日
 * @class multi_grid
 * @extends Ext.grid.EditorGridPanel
 * @description 查询操作表格
 */
Ext.onReady(function(){
    var CONDITION = null;
    setTimeout(function(){
        Ext.get('loading').remove();
        Ext.QuickTips.init();
        /****************************************** 加载hotel的JSON数据 ***************************************************/
        var multi_proxy = new Ext.data.HttpProxy({
            url: 'json/multi-grid.json'
        });//获取json数据  
        var multi_reader = new Ext.data.JsonReader({
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
        }, {
            name : 'conditions'
        }, {
            name : 'deltat'
        }, ]);
        var multi_store = new Ext.data.Store({
            proxy                : multi_proxy,
            reader               : multi_reader,
            pruneModifiedRecords : true
        });
        multi_store.load({
            /*callback: function(){
                var json = multi_reader.jsonData;
                title = json.title;
                multi_grid.setTitle(title);
            }*/
        }); //加载数据   


        /*****************************************************************************************************************/
        var proxy_select = new Ext.data.HttpProxy({
            url: 'json/editor-grid-select.json'
        });//获取json数据  
        var reader_select = new Ext.data.JsonReader({
            totalProperty: "results",
            root : "rows",
        }, [{
            name : 'id'
        }, {
            name : 'Eselect'
        }, {
            name : 'Cselect'
        }, ]);
        var store_select = new Ext.data.Store({
            proxy  : proxy_select,
            reader : reader_select,
        });
        store_select.load(); //加载数据   
        var proxy_andor = new Ext.data.HttpProxy({
            url: 'json/editor-grid-andor.json'
        });//获取json数据  
        var reader_andor = new Ext.data.JsonReader({
            totalProperty: "results",
            root : "rows",
        }, [{
            name : 'id'
        }, {
            name : 'Eandor'
        }, {
            name : 'Candor'
        }, ]);
        var store_andor = new Ext.data.Store({
            proxy  : proxy_andor,
            reader : reader_andor,
        });
        store_andor.load(); //加载数据   
        /*****************************************************************************************************************/
        
        /************************************************************************************************/
				
		var dr_date = new Ext.FormPanel({
            labelWidth: 60,
            frame: true,
            title: '时间区间',
            bodyStyle: 'padding:5px 5px 0',
            width: 150,
            items: [{
                fieldLabel: '开始时间',
                name: '开始时间',
                id: 'startdt_date',
                xtype: "datetimefield",
                format: 'Y-m-d H:i:s',
            }, {
                fieldLabel: '结束时间',
                name: '结束时间',
                id: 'enddt_date',
                xtype: "datetimefield",
                format: 'Y-m-d H:i:s',
            }],
            buttons: [{
				id: 'btn',
                text: '保存',
                handler: function(){
                    if (dr_date.form.isValid()) {
                        var s = "";
                        var col = CONDITION.column;
                        var row = CONDITION.row;
                        var grid = CONDITION.grid;
						var store = CONDITION.grid.getStore();
//                        var colModel = grid.colModel.config;
//                        console.dir(colModel[3]);
//                        var editor = colModel[3].editor;
//                        var el = editor.el;
//                        console.dir(el);
                        
                        
                        var gridView = grid.getView();
                        //var cell = gridView.getCell(row, col);
                        Ext.iterate(dr_date.form.getValues(), function(key, value){
                            //s += String.format("{0} = {1} ,", key, value);
							s += String.format("{0}:{1},", key, value);
                        }, this);
                        //alert(s);
                        //                      alert(cell);
                        //el.dom.innerHTML = s;
                        //                    console.dir(cell);
                        //cell.innerHTML = s;
						var rec = store.getAt(row);
						var defaultRec = {
	                        andor          : rec.get('andor'),
	                        objName        : rec.get('objName'),
							ChineseObjName : rec.get('ChineseObjName'),
	                        select         : rec.get('select'),
	                        conditions     : s,
	                        deltat         : rec.get('deltat'),
	                    };
						var sm = grid.getSelectionModel();
                        var cell = sm.getSelectedCell();
                        var record = store.getAt(cell[0]);
                        store.remove(record);
	                    var newRecord = new store.recordType(defaultRec);
	                    store.insert(row, newRecord);
						//Ext.getCmp("date_window").hide();
						//console.dir(Ext.getCmp('date_window'));
						Ext.getCmp('date_window').hide();
						//alert(Ext.getCmp("date_window"));
						//dateWindow.hide();
						//window.top.Ext.getCmp('date_window').hide();
						//parent.dateWindow.close();
						//Ext.getCmp('date_window').close();
                        //Ext.example.msg('Form Values', s);                        
                    }
                },
				
            }, {
                text: '重置',
                handler: function(){
                    dr_date.form.reset();
                }
            }],
			
        });
		
		
        
        var dr_text = new Ext.FormPanel({
            labelWidth: 60,
            frame: true,
            title: '范围',
            bodyStyle: 'padding:5px 5px 0',
           	width: 150,
            defaultType: 'textfield',
            items: [{
                fieldLabel: '起始',
                name: '起始',
                id: 'startdt_text',
            }, {
                fieldLabel: '结束',
                name: '结束',
                id: 'enddt_text',
            }],
            buttons: [{
                text: '保存',
                handler: function(){
                    if (dr_text.form.isValid()) {
                        var s = "";
                        var col = CONDITION.column;
                        var row = CONDITION.row;
                        var grid = CONDITION.grid;
						var store = CONDITION.grid.getStore();
                        Ext.iterate(dr_text.form.getValues(), function(key, value){
                            //s += String.format("{0} = {1} ,", key, value);
							s += String.format("{0}:{1},", key, value);
                        }, this);
						var rec = store.getAt(row);
						var defaultRec = {
	                        andor          : rec.get('andor'),
	                        objName        : rec.get('objName'),
							ChineseObjName : rec.get('ChineseObjName'),
	                        select         : rec.get('select'),
	                        conditions     : s,
	                        deltat         : rec.get('deltat'),
	                    };
						var sm = grid.getSelectionModel();
                        var cell = sm.getSelectedCell();
                        var record = store.getAt(cell[0]);
                        store.remove(record);
	                    var newRecord = new store.recordType(defaultRec);
	                    store.insert(row, newRecord);
						Ext.getCmp('text_window').hide();
                        //alert(s);
                        //Ext.example.msg('Form Values', s);                        
                    }
                }
            }, {
                text: '重置',
                handler: function(){
                    dr_text.form.reset();
                }
            }]
        });
        
        
        var deltat_text = new Ext.FormPanel({
            labelWidth: 30,
            frame: true,
            title: '变量t',
            bodyStyle: 'padding:5px 5px 0',
           	width: 100,
            defaultType: 'textfield',
            items: [/*new Ext.form.TimeField({
                fieldLabel: '小时',
                name: 'start_deltat_text',
                id: 'start_deltat_text',
                minValue: '0',
                maxValue: '12'
            }), new Ext.form.TimeField({
                fieldLabel: '分钟',
                name: 'end_deltat_text',
                id: 'end_deltat_text',
                minValue: '0',
                maxValue: '59'
            }),*/{
            	xtype: 'spinnerfield',
            	fieldLabel: '小时',
            	name: '小时',
                id: 'hour',
            	minValue: 0,
            	maxValue: 12,
            	allowDecimals: true,
            	decimalPrecision: 1,
            	incrementValue: 1,
            	accelerate: true
            },{
            	xtype: 'spinnerfield',
            	fieldLabel: '分钟',
            	name: '分钟',
                id: 'minute',
            	minValue: 0,
            	maxValue: 59,
            	allowDecimals: true,
            	decimalPrecision: 1,
            	incrementValue: 1,
            	accelerate: true
            }],
            buttons: [{
                text: '保存',
                handler: function(){
                    if (deltat_text.form.isValid()) {
                        var s = "";
                        var col = CONDITION.column;
                        var row = CONDITION.row;
                        var grid = CONDITION.grid;
						var store = CONDITION.grid.getStore();
                        Ext.iterate(deltat_text.form.getValues(), function(key, value){
                            //s += String.format("{0} = {1} ,", key, value);
							s += String.format("{0}:{1},", key, value);
                        }, this);
						var rec = store.getAt(row);
						var defaultRec = {
	                        andor          : rec.get('andor'),
	                        objName        : rec.get('objName'),
							ChineseObjName : rec.get('ChineseObjName'),
	                        select         : rec.get('select'),
	                        conditions     : rec.get('conditions'),
	                        deltat         : s,
	                    };
						var sm = grid.getSelectionModel();
                        var cell = sm.getSelectedCell();
                        var record = store.getAt(cell[0]);
                        store.remove(record);
	                    var newRecord = new store.recordType(defaultRec);
	                    store.insert(row, newRecord);
						Ext.getCmp('deltat_text_window').hide();
                        //alert(s);
                        //Ext.example.msg('Form Values', s);                        
                    }
                }
            }, {
                text: '重置',
                handler: function(){
                	deltat_text.form.reset();
                }
            }]
        });
        
        
		var dateWindow = new Ext.Window({
				id : 'date_window',
                layout: 'fit',
                width: 280,
                height: 180,
				resizable : false,
                closeAction: 'hide',
                plain: true,  
                modal: true,
                items: [dr_date, ]
            });
            
		
		var textWindow = new Ext.Window({
				id : 'text_window',
                layout: 'fit',
               	width: 280,
                height: 180,
				resizable : false,
                closeAction:'hide',  
                plain: true,  
                modal: true,
                items: [dr_text, ]
            });
		
		
		var deltatWindow = new Ext.Window({
			id : 'deltat_text_window',
            layout: 'fit',
           	width: 280,
            height: 180,
			resizable : false,
            closeAction:'hide',  
            plain: true,  
            modal: true,
            items: [deltat_text, ]
        });
        /************************************************************************************************/

        var multi_andor = {
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
        
        var multi_objName = {
            header: "属性",
            sortable: true,
            dataIndex: 'objName',
            align: 'center',
            width: 200,
            renderer: function(v){
                return VLMAP[v];
            },
            editor: new Ext.form.ComboBox({
                id: 'objName',
                store: multi_store,
                displayField: 'ChineseObjName',
                typeAhead: true,
                mode: 'local',
                forceSelection: true,
                valueField: 'objName',
                triggerAction: 'all',
                selectOnFocus: true,
                allowBlank: false,
                blankText: '不能为空！',
                //renderer: function(v){
                //					return v+"1";
                //                    if (v == '' || v == null) {
                //                        return '';
                //                    }
                //                    else {
                //                        var index = Ext.getCmp('objName').getStore().findExact('objName', v);
                //                        if (index == -1) 
                //                            return '';
                //                        return Ext.getCmp('objName').getStore().getAt(index).get('objName');
                //                    }
                //}
            }),
        
        };
        
        var multi_select = {
            id: 'select',
            header: "选择项",
            sortable: true,
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
        
        var multi_conditions0 = {
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
        
        var multi_conditions1 = {
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
        
        var multi_conditions2 = {
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
		
		var multi_conditions3 = {
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
//            renderer: function(value){
//				            if (typeof value == "string" || typeof value == "number") {
//				                		return value;
//				            }
//				            if (value instanceof Date) {
//				            		return value.format("Y-m-d H:i:s");
//				            }
//				            return value;
//		          		}
        };
		
		var multi_deltat0 = {
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
		
		var multi_deltat1 = {
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
		
        var multi_icon = {
            xtype: 'actioncolumn',
            id: "icon",
            width: 50,
            align: 'center',
            items: [{
                icon: 'images/delete.gif',
                tooltip: '删除此条属性',
                handler: function(multi_grid, rowIndex, colIndex){
                    var rec = multi_store.getAt(rowIndex);
                    Ext.Msg.confirm('温馨提示', '您确定要删除' + " “ " + rec.get('ChineseObjName') + " ” " + '这条记录吗？', function(btn){
                        if (btn == 'yes') {
                            var sm = multi_grid.getSelectionModel();
                            var cell = sm.getSelectedCell();
                            var record = multi_store.getAt(cell[0]);
                            multi_store.remove(record);
                        }
                    });
                }
            }, {
                icon: 'images/add.gif',
                tooltip: '增加此条属性',
                handler: function(multi_grid, rowIndex, colIndex){
                    var rec = multi_store.getAt(rowIndex);
                    defaultRec = {
                    	id             : rec.get('id'),
                        andor          : 'and',
                        objName        : rec.get('objName'),
						ChineseObjName : rec.get('ChineseObjName'),
                        select         : "=",
                        conditions     : " ",
                        deltat         : "",
                    };
                    newRecord = new multi_store.recordType(defaultRec);
                    multi_store.insert(0, newRecord);
                }
            }]
        };
        
        
        var multi_grid = new Ext.grid.EditorGridPanel({
            id: 'hotel',
            //header: true,
            //iconCls: 'icon-hotel',
            autoEncode: true,
            loadMask: true,
            stripeRows: true,
            clicksToEdit: 1,
            //sm : new Ext.grid.RowSelectionModel({singleSelect : false}),
            ds: multi_store,
            columns: [multi_andor, multi_objName, multi_select, multi_conditions0, multi_deltat0, multi_icon],
            stripeRows: true,
            //autoExpandColumn: 'objName',
            height: 520,
            frame: true,
            defaults: {
                sortable: true
            },
            viewConfig: {
                sortable: true,
                forceFit: true,//每列自动充满Grid
                stripeRows: true,
                enableRowBody: true,
                deferEmptyText: '请稍后...'
            },
            autoScroll: false,
            //tbar: [{
            	//layout : 'accordion',
                   items:[new Ext.tree.TreePanel({
						iconCls : 'icon-nav',
					    useArrows:true,
					    autoScroll:true,
					    animate:true,
					    enableDD:true,
					    containerScroll: true,
					    rootVisible: false,
					    frame: true,
						expanded : true,
					    root: {
					       nodeType: 'async'
					    },
					    loader : new Ext.tree.TreeLoader({
							dataUrl : 'getModel'
						}),
						//root : new Ext.tree.AsyncTreeNode(),
					    // auto create TreeLoader
					    //dataUrl: 'check-nodes.json',
					    listeners: {
				            'checkchange': function(node, checked,multi_grid){
				                if(checked){
									if(node.leaf){  //如果是叶子节点
									 	if(node.attributes.id == 1){
									 		defaultRec0 = {
									 				id             : "1",
							                        andor          : "and",
							                        objName        : "za_lyt_rzfh",
													ChineseObjName : "入住房号",
							                        select         : "=",
							                        conditions     : " ",
							                        deltat         : "",
							                    };
							                  newRecord0 = new multi_store.recordType(defaultRec0);
							                 multi_store.insert(0, newRecord0);
										}
										if(node.attributes.id == 2){
											defaultRec2 = {
							                        andor          : "and",
							                        objName        : "za_lyt_qtjlcjsj",
													ChineseObjName : "前台记录创建时间",
							                        select         : "=",
							                        conditions     : " ",
							                        deltat         : "",
							                    };
											defaultRec3 = {
							                        andor          : "and",
							                        objName        : "za_lyt_htrksj",
													ChineseObjName : "后台入库时间",
							                        select         : "=",
							                        conditions     : " ",
							                        deltat         : "",
							                    };
							                  newRecord2 = new multi_store.recordType(defaultRec2);
							                  newRecord3 = new multi_store.recordType(defaultRec3);
							                 multi_store.insert(0, newRecord2);
							                 multi_store.insert(1, newRecord3);
										}
									}
				                }else{
									if (node.leaf) { //如果是叶子节点
										if (node.attributes.id == 1) {
						                    Ext.Msg.confirm('温馨提示', '您确定要删除这个模型对应的所有属性吗？', function(btn){
						                        if (btn == 'yes') {
						                        		multi_store.remove(newRecord0);
						                        		var mr = multi_store.getModifiedRecords();//获取所有更新过的记录
						                        		console.dir(mr);
						                        		/*var sm = multi_grid.getSelectionModel();
						                        		var cell = sm.getSelectedCell();
						                                var record = multi_store.getAt(cell[0]);
						                                multi_store.remove(record);*/
							                            for (var i = 0; i < mr.length; i++) {
							                            	var id = mr[i].data["id"];
							                        		if(id == defaultRec0.id){
								                            	alert(id);
							                        			multi_store.remove(newRecord);
							                        		}
						                        		}
						                        }
						                    });
										}
										if (node.attributes.id == 2) {
											Ext.Msg.confirm('温馨提示', '您确定要删除这个模型对应的所有属性吗？', function(btn){
						                        if (btn == 'yes') {
														multi_store.remove(newRecord2);
														multi_store.remove(newRecord3);
						                        }
						                    });
										}
									}
				                }
								
				            },
				        },
					}),],
            //}],
					tbar: [ {
		                xtype: 'button',
		                text: '提交查询',
		                iconCls: 'icon-search',
		                handler: function(){
		                    Ext.Msg.confirm('温馨提示', '您确定要提交吗？', function(btn){
		                        if (btn == 'yes') {
		                            //alert(store_hotel.getCount());
		                            var mr = multi_store.getModifiedRecords();//获取所有更新过的记录
		                            //console.dir(mr);
		                            
		                            //begin 将记录对象转换为字符串（json格式的字符串）
		                            /*var vDatas = '[';
		                             for (var i = 0; i < mr.length; i++) {
		                             vDatas += Ext.util.JSON.encode(mr[i].data) + ',';
		                             }
		                             alert(vDatas);
		                             vDatas = vDatas.substr(0, vDatas.length - 1) + ']';
		                             alert(vDatas);*/
		                            //end 将记录对象转换为字符串（json格式的字符串）
		                           
		                            var resultArray = new Array();
		                            for (var i = 0; i < mr.length; i++) {
		                            	var id = mr[i].data["id"];
		                                var andor = mr[i].data["andor"];
		                                var objName = mr[i].data["objName"];
		                                var select = mr[i].data["select"];
		                                var conditions = mr[i].data["conditions"];
		                                var deltat = mr[i].data["deltat"];
		                                resultArray[i] = {
		                                		id : id,
		                                    andor: andor,
		                                    objName: objName,
		                                    select: select,
		                                    conditions: conditions,
		                                    deltat : deltat,
		                                };
		                            }
		                            var result = $.toJSON(resultArray);
		                            alert(result);
		                            
		                            Ext.Ajax.request({
		                                //请求地址
		                                url: 'getResults',
		                                //提交参数组
		                                params: {
		                                    result: result
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
                            //console.dir(e);
                            CONDITION = e;
                            showWindow(r);
                        }
                        else {
                            reRecode(1, r,multi_andor,multi_objName,multi_select,multi_icon);
                            reRecode_select(1, r,multi_andor,multi_objName,multi_select,multi_icon);
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
                        reRecode(2, r,multi_andor,multi_objName,multi_select,multi_icon); // 在选择“选择列”值后刷新cm
                        //alert("在选择“选择列”值后刷新cm");
                    }
                    else 
                        if (f == 'select') {
                            reRecode_select(2, r,multi_andor,multi_objName,multi_select,multi_icon);
                        }
                },
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
        function reRecode(type, r, andor, objName, select, icon){
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
                    colModel = new Ext.grid.ColumnModel([andor, objName, select, multi_conditions0, multi_deltat0, icon]);
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
                        colModel = new Ext.grid.ColumnModel([andor, objName, select, multi_conditions1, multi_deltat1, icon]);
                    }
                /*if(type == 2){   // 如果选中选择列，则清空动态输入值
                 if(d2 != ''){
                 r.set('conditions','');
                 }
                 }*/
                multi_grid.reconfigure(multi_grid.getStore(), colModel);
            }
        }
        
        
            
			
		function showWindow(r){
            var d1 = r.get('objName').toString();
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
                textWindow.show();
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
                    dateWindow.show();
                }
        }
		
		function showDeltatWindow(r){
            var d1 = r.get('objName').toString();
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
            		deltatWindow.show();
                }
        }
		
        /*
         : 1-- 编辑前 2-- 编辑后
         -- record
         */
        function reRecode_select(type, r, andor,objName, select, icon){
            var d1 = r.get('select').toString();
            if ((type == 1 || type == 2) && d1 != '') { // 无论编辑前编辑后都必须确保选择列有值
                if (d1 == 'isNull') { // 字符串类型
                    colModel = new Ext.grid.ColumnModel([andor, objName, select, multi_conditions2, multi_deltat0,icon]);
                }
                else 
                    if (d1 == 'between') {
                        colModel = new Ext.grid.ColumnModel([andor, objName, select, multi_conditions3, multi_deltat1,icon]);
                    }
                    else {
                        reRecode(type, r, andor, objName, select,icon);
                    }
                multi_grid.reconfigure(multi_grid.getStore(), colModel);
            }
        }
       
        
        multi_grid.render('multi_grid');
  
        
    }, 500);
    
});
