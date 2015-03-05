/**
 * @author 曾家栩
 * @date 2014年7月18日
 * @class ResultGridPanel
 * @extends Ext.grid.GridPanel
 * @description 查询结果加载表格
 */
Ext.onReady(function(){
    var proxy  = new Ext.data.HttpProxy({ url: 'json/result-gridpanel.json'});//获取json数据  
    var reader = new Ext.data.JsonReader({  
             totalProperty: "results",  
             root: "rows",  
        },  
       [  
            {name : 'id'},
            {name : 'modelName'},
            {name : 'ObjectName'},
            {name : 'state'},
        ]  
    );       
    var ResultStore = new Ext.data.Store({  
          proxy  : proxy,  
          reader : reader  
    });
    var ResultGridPanel = new Ext.grid.GridPanel({
        store   : ResultStore,
        columns : [{
            id        : 'id',
            header    : "序号",
            sortable  : true, 
            align     : 'center',
            dataIndex : 'id'
        },{
            header    : "模型名称",
            sortable  : true, 
            align     : 'center',
            dataIndex : 'modelName'
        },{
            header    : "对象名称", 
            sortable  : true, 
            align     : 'center',
            dataIndex : 'ObjectName'
        },{
            header    : "状态",
            sortable  : true, 
            align     : 'center',
            dataIndex : 'state'
        },{
            header    : "查看详情",
            xtype     : 'actioncolumn',
            align     : 'center',
            items     : [{
                            icon    : 'images/zoom.png',
                            tooltip : '查看详情',
                            handler : function() {
								window.top.Ext.getCmp("my_center").add({
			                        // 设置新Tab页面的属性
			                        title: "查询结果",
			                        html: "<iframe src='detail.html' id='test' frameborder=0 width=100% height=100%></iframe>",
			                        closable: true,
			                        enableTabScroll: true,
			                        autoScroll: true,
			                        activeItem: 0,
			                        iconCls: 'icon-search'
			                    }).show();
                            }
                        }],
        }],
		loadMask         : true,  //加载时有加载的图标
        stripeRows       : true,
        //autoExpandColumn : 'modelName',
        height           : 330,
        frame            : true,
        title            : '操作结果',
        iconCls          : 'icon-search',
        plugins          : new Ext.ux.PanelResizer({
                                minHeight: 100
                            }),
        bbar             : new Ext.PagingToolbar({
                                pageSize    : 20,
                                store       : ResultStore,
                                displayInfo : true,
                                displayMsg  : '第 {0} - {1} 条  共 {2}条',
                                emptyMsg    : "没有记录",
                                plugins     : new Ext.ux.ProgressBarPager()
                            })
    });
	ResultStore.load({//加载数据
            params:{
                start : 0, 
                limit : 10
            }
    });
    ResultGridPanel.render('result-grid');
});