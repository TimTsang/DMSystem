
Ext.ux.StatusBar = Ext.extend(Ext.Toolbar, {

    cls : 'x-statusbar',
   
    busyIconCls : 'x-status-busy',
  
    busyText : 'Loading...',
    
    emptyText : '&nbsp;',

    // private
    activeThreadId : 0,

    // private
    initComponent : function(){
        if(this.statusAlign=='right'){
            this.cls += ' x-status-right';
        }
        Ext.ux.StatusBar.superclass.initComponent.call(this);
    },

    // private
    afterRender : function(){
        Ext.ux.StatusBar.superclass.afterRender.call(this);

        var right = this.statusAlign == 'right';
        this.currIconCls = this.iconCls || this.defaultIconCls;
        this.statusEl = new Ext.Toolbar.TextItem({
            cls: 'x-status-text ' + (this.currIconCls || ''),
            text: this.text || this.defaultText || ''
        });

        if(right){
            this.add('->');
            this.add(this.statusEl);
        }else{
            this.insert(0, this.statusEl);
            this.insert(1, '->');
        }
        this.doLayout();
    },

 
    setStatus : function(o){
        o = o || {};

        if(typeof o == 'string'){
            o = {text:o};
        }
        if(o.text !== undefined){
            this.setText(o.text);
        }
        if(o.iconCls !== undefined){
            this.setIcon(o.iconCls);
        }

        if(o.clear){
            var c = o.clear,
                wait = this.autoClear,
                defaults = {useDefaults: true, anim: true};

            if(typeof c == 'object'){
                c = Ext.applyIf(c, defaults);
                if(c.wait){
                    wait = c.wait;
                }
            }else if(typeof c == 'number'){
                wait = c;
                c = defaults;
            }else if(typeof c == 'boolean'){
                c = defaults;
            }

            c.threadId = this.activeThreadId;
            this.clearStatus.defer(wait, this, [c]);
        }
        return this;
    },

   
    clearStatus : function(o){
        o = o || {};

        if(o.threadId && o.threadId !== this.activeThreadId){
           
            return this;
        }

        var text = o.useDefaults ? this.defaultText : this.emptyText,
            iconCls = o.useDefaults ? (this.defaultIconCls ? this.defaultIconCls : '') : '';

        if(o.anim){
            // animate the statusEl Ext.Element
            this.statusEl.el.fadeOut({
                remove: false,
                useDisplay: true,
                scope: this,
                callback: function(){
                    this.setStatus({
	                    text: text,
	                    iconCls: iconCls
	                });

                    this.statusEl.el.show();
                }
            });
        }else{
          
            this.statusEl.hide();
	        this.setStatus({
	            text: text,
	            iconCls: iconCls
	        });
            this.statusEl.show();
        }
        return this;
    },

   
    setText : function(text){
        this.activeThreadId++;
        this.text = text || '';
        if(this.rendered){
            this.statusEl.setText(this.text);
        }
        return this;
    },

    
    getText : function(){
        return this.text;
    },

    setIcon : function(cls){
        this.activeThreadId++;
        cls = cls || '';

        if(this.rendered){
	        if(this.currIconCls){
	            this.statusEl.removeClass(this.currIconCls);
	            this.currIconCls = null;
	        }
	        if(cls.length > 0){
	            this.statusEl.addClass(cls);
	            this.currIconCls = cls;
	        }
        }else{
            this.currIconCls = cls;
        }
        return this;
    },

   
    showBusy : function(o){
        if(typeof o == 'string'){
            o = {text:o};
        }
        o = Ext.applyIf(o || {}, {
            text: this.busyText,
            iconCls: this.busyIconCls
        });
        return this.setStatus(o);
    }
});
Ext.reg('statusbar', Ext.ux.StatusBar);


Ext.ux.ValidationStatus = Ext.extend(Ext.Component, {
    
    errorIconCls : 'x-status-error',
    
    errorListCls : 'x-status-error-list',
    
    validIconCls : 'x-status-valid',
   
    showText : '填写错误 (点击查看...)',
   
    hideText : '再次点击，隐藏错误',
    
    submitText : '保存中...',
    
    // private
    init : function(sb){
        sb.on('render', function(){
            this.statusBar = sb;
            this.monitor = true;
            this.errors = new Ext.util.MixedCollection();
            this.listAlign = (sb.statusAlign=='right' ? 'br-tr?' : 'bl-tl?');
            
            if(this.form){
                this.form = Ext.getCmp(this.form).getForm();
                this.startMonitoring();
                this.form.on('beforeaction', function(f, action){
                    if(action.type == 'submit'){
                        
                        this.monitor = false;
                    }
                }, this);
                var startMonitor = function(){
                    this.monitor = true;
                };
                this.form.on('actioncomplete', startMonitor, this);
                this.form.on('actionfailed', startMonitor, this);
            }
        }, this, {single:true});
        sb.on({
            scope: this,
            afterlayout:{
                single: true,
                fn: function(){
                    
                    sb.statusEl.getEl().on('click', this.onStatusClick, this, {buffer:200});
                } 
            }, 
            beforedestroy:{
                single: true,
                fn: this.onDestroy
            } 
        });
    },
    
    // private
    startMonitoring : function(){
        this.form.items.each(function(f){
            f.on('invalid', this.onFieldValidation, this);
            f.on('valid', this.onFieldValidation, this);
        }, this);
    },
    
    // private
    stopMonitoring : function(){
        this.form.items.each(function(f){
            f.un('invalid', this.onFieldValidation, this);
            f.un('valid', this.onFieldValidation, this);
        }, this);
    },
    
    // private
    onDestroy : function(){
        this.stopMonitoring();
        this.statusBar.statusEl.un('click', this.onStatusClick, this);
        Ext.ux.ValidationStatus.superclass.onDestroy.call(this);
    },
    
    // private
    onFieldValidation : function(f, msg){
        if(!this.monitor){
            return false;
        }
        if(msg){
            this.errors.add(f.id, {field:f, msg:msg});
        }else{
            this.errors.removeKey(f.id);
        }
        this.updateErrorList();
        if(this.errors.getCount() > 0){
            if(this.statusBar.getText() != this.showText){
                this.statusBar.setStatus({text:this.showText, iconCls:this.errorIconCls});
            }
        }else{
            this.statusBar.clearStatus().setIcon(this.validIconCls);
        }
    },
    
    // private
    updateErrorList : function(){
        if(this.errors.getCount() > 0){
            var msg = '<ul>';
            this.errors.each(function(err){
                msg += ('<li id="x-err-'+ err.field.id +'"><a href="#">' + err.msg + '</a></li>');
            }, this);
            this.getMsgEl().update(msg+'</ul>');
        }else{
            this.getMsgEl().update('');
        }
    },
    
    // private
    getMsgEl : function(){
        if(!this.msgEl){
            this.msgEl = Ext.DomHelper.append(Ext.getBody(), {
                cls: this.errorListCls+' x-hide-offsets'
            }, true);
            
            this.msgEl.on('click', function(e){
                var t = e.getTarget('li', 10, true);
                if(t){
                    Ext.getCmp(t.id.split('x-err-')[1]).focus();
                    this.hideErrors();
                }
            }, this, {stopEvent:true}); // prevent anchor click navigation
        }
        return this.msgEl;
    },
    
    // private
    showErrors : function(){
        this.updateErrorList();
        this.getMsgEl().alignTo(this.statusBar.getEl(), this.listAlign).slideIn('b', {duration:0.3, easing:'easeOut'});
        this.statusBar.setText(this.hideText);
        this.form.getEl().on('click', this.hideErrors, this, {single:true}); // hide if the user clicks directly into the form
    },
    
    // private
    hideErrors : function(){
        var el = this.getMsgEl();
        if(el.isVisible()){
            el.slideOut('b', {duration:0.2, easing:'easeIn'});
            this.statusBar.setText(this.showText);
        }
        this.form.getEl().un('click', this.hideErrors, this);
    },
    
    // private
    onStatusClick : function(){
        if(this.getMsgEl().isVisible()){
            this.hideErrors();
        }else if(this.errors.getCount() > 0){
            this.showErrors();
        }
    }
});