/**
 * @author 曾家栩
 * @date 2014年7月18日
 * @class grid_hotel , grid_passenger
 * @extends Ext.grid.EditorGridPanel
 * @description 查询操作表格
 */
Ext.onReady(function(){
    setTimeout(function(){
    	
        Ext.get('loading').remove();
        
        Ext.QuickTips.init();
    
        grid_hotel.render('grid_hotel');
        
        grid_passenger.render('grid_passenger');
        
        
    }, 500);
    
});
