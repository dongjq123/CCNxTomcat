$(document).ready(function($) {
	$('#loginModal').on('shown', function () {  
		$(".app-flash").attr("style","visibility: hidden;");
	});
	$('#loginModal').on('hidden', function () {  
		$(".app-flash").attr("style","visibility: visible;");
	});
	/*console.log("未登录");*/
	AJAX_CCNx({
		url: "ccnx://bupt/servlet/SessionServlet",
		type: "GET",
		async: true,
		params: "",
		success: function(lodata){
			console.log("------------");
			console.log(lodata);
			if(lodata.islogin=="0"){
				console.log("未登录");//ccnx://bupt/servlet/GetHotModuleServlet
				AJAX_CCNx({
					url: "ccnx://bupt/servlet/GetHotModuleServlet",
					type: "GET",
					async: true,
					params: "",
					success: function(data){
					        console.log("111111111111111111gethot111111");
					        console.log(data);
				   			$("#column1").append(data.modulevalue);
				   			$("#column2").append(data.videovalue);
				   			var iNettuts = {
								    jQuery : $,
								    
								    settings : {
								        columns : '.column',
								        widgetSelector: '.widget',
								        handleSelector: '.widget-head',
								        contentSelector: '.widget-content',
								        widgetDefault : {
								            movable: true,
								            removable: true,
								            collapsible: true,
								            editable: true,
								            colorClasses : ['color-yellow', 'color-red', 'color-blue', 'color-white', 'color-orange', 'color-green']
								        },
								        widgetIndividual : {
								            intro : {
								                movable: false,
								                removable: false,
								                collapsible: false,
								                editable: false
								            }
								        }
								    },

								    init : function () {
								        this.attachStylesheet('css/inettuts.js.css');
								        this.addWidgetControls();
								        this.makeSortable();
								    }, 
								    
								    getWidgetSettings : function (id) {
								        var $ = this.jQuery,
								            settings = this.settings;
								        return (id&&settings.widgetIndividual[id]) ? $.extend({},settings.widgetDefault,settings.widgetIndividual[id]) : settings.widgetDefault;
								    },
								    
								   addWidgetControls : function () {
										        var iNettuts = this,
										            $ = this.jQuery,
										            settings = this.settings;
										            
										        $(settings.widgetSelector, $(settings.columns)).each(function () {
										        	console.log(this.id);
										            var thisWidgetSettings = iNettuts.getWidgetSettings(this.id);
										            if (thisWidgetSettings.removable) {
										            	// $(".color-red").children(".widget-head").children("a.remove");
										            	if ($(this).children(".widget-head").children("a.remove").length == 0) {
										            		$('<a href="#" class="remove">CLOSE</a>').mousedown(function (e) {
												                    e.stopPropagation();    
												                }).click(function () {
												                    if(confirm('This widget will be removed, ok?')) {
												                        $(this).parents(settings.widgetSelector).animate({
												                            opacity: 0    
												                        },function () {
												                            $(this).wrap('<div/>').parent().slideUp(function () {
									                                $(this).remove();
									                            });
									                        });

								                    }
								                    return false;
								                }).appendTo($(settings.handleSelector, this));
											   }
								            }
								            
								             if (thisWidgetSettings.editable) {
										       if ($(this).children(".widget-head").children("a.edit").length == 0) {
								                $('<a href="#" class="edit">EDIT</a>').mousedown(function (e) {
								                    e.stopPropagation();    
								                }).toggle(function () {
								                    $(this).css({backgroundPosition: '-66px 0', width: '55px'})
								                        .parents(settings.widgetSelector)
								                            .find('.edit-box').show().find('input').focus();
								                    return false;
								                },function () {
								                    $(this).css({backgroundPosition: '', width: ''})
								                        .parents(settings.widgetSelector)
								                            .find('.edit-box').hide();
								                    return false;
								                }).appendTo($(settings.handleSelector,this));
								                $('<div class="edit-box" style="display:none;"/>')
								                    .append('<ul><li class="item"><label>Change the title?</label><input value="' + $('h3',this).text() + '"/></li>')
								                    .append((function(){
								                        var colorList = '<li class="item"><label>Available colors:</label><ul class="colors">';
								                        $(thisWidgetSettings.colorClasses).each(function () {
								                            colorList += '<li class="' + this + '"/>';
								                        });
								                        return colorList + '</ul>';
								                    })())
								                    .append('</ul>')
								                    .insertAfter($(settings.handleSelector,this));
									            }
									        }
								            
								            if (thisWidgetSettings.collapsible) {
										            	if ($(this).children(".widget-head").children("a.collapse").length == 0) {
								                $('<a href="#" class="collapse">COLLAPSE</a>').mousedown(function (e) {
								                    e.stopPropagation();    
								                }).toggle(function () {
								                    $(this).css({backgroundPosition: '-38px 0'})
								                        .parents(settings.widgetSelector)
								                            .find(settings.contentSelector).hide();
								                    return false;
								                },function () {
								                    $(this).css({backgroundPosition: ''})
								                        .parents(settings.widgetSelector)
								                            .find(settings.contentSelector).show();
								                    return false;
								                }).prependTo($(settings.handleSelector,this));
									            }
									        }
								        });
								        
								        $('.edit-box').each(function () {
								            $('input',this).keyup(function () {
								                $(this).parents(settings.widgetSelector).find('h3').text( $(this).val().length>20 ? $(this).val().substr(0,20)+'...' : $(this).val() );
								            });
								            $('ul.colors li',this).click(function () {
								                
								                var colorStylePattern = /\bcolor-[\w]{1,}\b/,
								                    thisWidgetColorClass = $(this).parents(settings.widgetSelector).attr('class').match(colorStylePattern);
								                if (thisWidgetColorClass) {
								                    $(this).parents(settings.widgetSelector)
								                        .removeClass(thisWidgetColorClass[0])
								                        .addClass($(this).attr('class').match(colorStylePattern)[0]);
								                }
								                return false;
								                
								            });
								        });
								        
								    },
								    
								    attachStylesheet : function (href) {
								        var $ = this.jQuery;
								        return $('<link href="' + href + '" rel="stylesheet" type="text/css" />').appendTo('head');
								    },
								    
								    makeSortable : function () {

								        var iNettuts = this,
								            $ = this.jQuery,
								            settings = this.settings;
								            
								        var $sortableItems = (function () {
								                var notSortable = null;
								                $(settings.widgetSelector,$(settings.columns)).each(function (i) {
								                    if (!iNettuts.getWidgetSettings(this.id).movable) {
								                        if(!this.id) {
								                            this.id = 'widget-no-id-' + i;
								                        }
								                        notSortable += '#' + this.id + ',';
								                    }
								                });
								                return $('> li:not(' + notSortable + ')', settings.columns);
								            })();
								            //settings.columns

								        $sortableItems.find(settings.handleSelector).css({
								            cursor: 'move'
								             }).mousedown(function (e) {
								          
								            $sortableItems.css({width:''});
								            $(this).parent().css({
								                width: $(this).parent().width() + 'px'
								            });
								            }).mouseup(function () {
								            
								            if(!$(this).parent().hasClass('dragging')) {
								                $(this).parent().css({width:''});

								            } else {
								                $(settings.columns).sortable('disable');
								            }
								        });
								        
								        $("#appid-4").sortable({
								            items: $sortableItems,
								            connectWith: $(settings.columns),
								            handle: settings.handleSelector,
								            placeholder: 'widget-placeholder',
								            forcePlaceholderSize: true,
								            helper: 'clone',
								            revert: 300,
								            delay: 100,
								            opacity: 0.8,
								            containment: 'document',
								            start : function (e,ui) {
								                $(ui.helper).addClass('dragging');
								            },
								            stop : function (e,ui) {

								                $(ui.item).css({width:''}).removeClass('dragging');
								                $(settings.columns).sortable('enable');
								            }
								        });
								        $("#appid-6").sortable({
								            items: $sortableItems,
								            connectWith: $(settings.columns),
								            handle: settings.handleSelector,
								            placeholder: 'widget-placeholder',
								            forcePlaceholderSize: true,
								            helper: 'clone',
								            revert: 300,
								            delay: 100,
								            opacity: 0.8,
								            containment: 'document',
								            start : function (e,ui) {
								                $(ui.helper).addClass('dragging');
								            },
								            stop : function (e,ui) {

								                $(ui.item).css({width:''}).removeClass('dragging');
								                $(settings.columns).sortable('enable');
								            }
								        });

								    }
								  
								};
							iNettuts.init();
				   		}});
			}
			else{ //$.post("ccnx://bupt/servlet/ModuleInitServlet", {username: $("#username").attr("title") },
				$("#username").attr("title",lodata.staticusrname);
				AJAX_CCNx({
					url: "ccnx://bupt/servlet/ModuleInitServlet",
					type: "GET",
					async: true,
					params: username=$("#username").attr("title"),
					success: function(data){
					        console.log("已登录");
				   			console.log(data);
				   			console.log("#"+data.module_id1[0]);
				   			for (var i=0;i<data.module_html1.length;i++)
							{
								var app_id;
								if(data.module_id1[i]=='intro'){
			    	                app_id = "intro";
								}else{
									var arr = (data.module_id1[i]+"").split("-");
			    	            	app_id = "appid-"+arr[1];
								}
							    $("#"+data.module_id1[i]).children(":first-child").attr("class","icon-remove");
							    $("#"+data.module_id1[i]).attr("title","删除");
							    //var username;
							    var actiongoal;
							    var module_id = data.module_id1[i]+"";
							    console.log(data.module_html1[i]);
							    console.log("---------------------");
							    console.log("#"+app_id);

							    
							    var plusmodules = { addmodules : function (data,app_id,module_id) {
					            	$("#column1").append(data.module_html1[i]);

									var iNettuts = {
									    
									    jQuery : $,
									    
									    settings : {
									        columns : '.column',
									        widgetSelector: '.widget',
									        handleSelector: '.widget-head',
									        contentSelector: '.widget-content',
									        widgetDefault : {
									            movable: true,
									            removable: true,
									            collapsible: true,
									            editable: true,
									            colorClasses : ['color-yellow', 'color-red', 'color-blue', 'color-white', 'color-orange', 'color-green']
									        },
									        widgetIndividual : {
									            intro : {
									                movable: false,
									                removable: false,
									                collapsible: false,
									                editable: false
									            }
									        }
									    },

									    init : function () {
									        this.attachStylesheet('css/inettuts.js.css');
									        this.addWidgetControls();
									        this.makeSortable();
									    },
									    
									    getWidgetSettings : function (id) {
									        var $ = this.jQuery,
									            settings = this.settings;
									        return (id&&settings.widgetIndividual[id]) ? $.extend({},settings.widgetDefault,settings.widgetIndividual[id]) : settings.widgetDefault;
									    },
									    
									    addWidgetControls : function () {
									        var iNettuts = this,
									            $ = this.jQuery,
									            settings = this.settings;
									            
									        $(settings.widgetSelector, $(settings.columns)).each(function () {
									        	console.log(this.id);
									            var thisWidgetSettings = iNettuts.getWidgetSettings(this.id);
									            if (thisWidgetSettings.removable) {
									            	// $(".color-red").children(".widget-head").children("a.remove");
									            	if ($(this).children(".widget-head").children("a.remove").length == 0) {
									            		$('<a href="#" class="remove">CLOSE</a>').mousedown(function (e) {
										                    e.stopPropagation();    
										                }).click(function () {
										                    if(confirm('This widget will be removed, ok?')) {
										                        $(this).parents(settings.widgetSelector).animate({
										                            opacity: 0    
										                        },function () {
										                            $(this).wrap('<div/>').parent().slideUp(function () {
										                            	//applications.app_process();

										                                $("#"+module_id).attr("title","添加");
															    		actiongoal = "remove";
															    		var new_order1 = []; 
															             var new_order2 = []; 
															             var new_order3 = []; 
															             var arr = (module_id+"").split("-");
															             $("#column1 .widget").each(function() { 
															                new_order1.push(this.id); 
															             }); 
															             Array.prototype.indexOf = function(val) {
																            for (var i = 0; i < this.length; i++) {
																                if (this[i] == val) return i;
																            }
																            return -1;
																        };
																        Array.prototype.remove = function(val) {
																            var index = this.indexOf(val);
																            if (index > -1) {
																                this.splice(index, 1);
																            }
																        };
															             new_order1.remove("appid-"+arr[1]); 
															             $("#column2 .widget").each(function() { 
															                new_order2.push(this.id); 
															             }); 
															             $("#column3 .widget").each(function() { 
															                new_order3.push(this.id); 
															             }); 
															             var newid1 = new_order1.join(',')+""; 
															             var newid2 = new_order2.join(',')+""; 
															             var newid3 = new_order3.join(',')+""; 
															            console.log($("#username").attr("title"));
															            console.log(newid1);
															            console.log(newid2);
															            console.log(newid3);
															            // $.post("ccnx://bupt/servlet/ModuleSortServlet", {username: $("#username").attr("title"), newid1: newid1, newid2: newid2, newid3: newid3}, 
															            AJAX_CCNx({
																			url: "ccnx://bupt/servlet/ModuleSortServlet",
																			type: "GET",
																			async: true,
																			params: "username="+$("#username").attr("title")+"&newid1="+newid1+"&newid2="+newid2+"&newid3="+newid3,
																			success: function(dat){
															            }});
															            //$.post("ccnx://bupt/servlet/ModuleProcessServlet", {actiongoal: actiongoal, username: $("#username").attr("title"), module_id: module_id }, 
															            AJAX_CCNx({
																			url: "ccnx://bupt/servlet/ModuleSortServlet",
																			type: "GET",
																			async: true,
																			params: "actiongoal="+actiongoal+"&username="+$("#username").attr("title")+"&module_id="+module_id,
																			success: function(dat){
															            }});
										                                $(this).remove();
										                                $("#"+module_id).children(":first-child").attr("class","icon-plus");
										                            });
										                        });
										                    }
										                    return false;
										                }).appendTo($(settings.handleSelector, this));	
									            	}
									            }
									            
									            if (thisWidgetSettings.editable) {
									            	if ($(this).children(".widget-head").children("a.edit").length == 0) {
									            		console.log("get in edit");
									            		$('<a href="#" class="edit">EDIT</a>').mousedown(function (e) {
										                    e.stopPropagation();    
										                }).toggle(function () {
										                    $(this).css({backgroundPosition: '-66px 0', width: '55px'})
										                        .parents(settings.widgetSelector)
										                            .find('.edit-box').show().find('input').focus();
										                    return false;
										                },function () {
										                    $(this).css({backgroundPosition: '', width: ''})
										                        .parents(settings.widgetSelector)
										                            .find('.edit-box').hide();
										                    return false;
										                }).appendTo($(settings.handleSelector,this));

										                $('<div class="edit-box" style="display:none;"/>')
									                    .append('<ul><li class="item"><label>Change the title?</label><input value="' + $('h3',this).text() + '"/></li>')
									                    .append((function(){
									                        var colorList = '<li class="item"><label>Available colors:</label><ul class="colors">';
									                        $(thisWidgetSettings.colorClasses).each(function () {
									                            colorList += '<li class="' + this + '"/>';
									                        });
									                        return colorList + '</ul>';
									                    })())
									                    .append('</ul>')
									                    .insertAfter($(settings.handleSelector,this));
									            	}
									            }
									            
									            if (thisWidgetSettings.collapsible) {
									            	if ($(this).children(".widget-head").children("a.collapse").length == 0) {
									            		$('<a href="#" class="collapse">COLLAPSE</a>').mousedown(function (e) {
										                    e.stopPropagation();    
										                }).toggle(function () {
										                    $(this).css({backgroundPosition: '-38px 0'})
										                        .parents(settings.widgetSelector)
										                            .find(settings.contentSelector).hide();
										                    return false;
										                },function () {
										                    $(this).css({backgroundPosition: ''})
										                        .parents(settings.widgetSelector)
										                            .find(settings.contentSelector).show();
										                    return false;
										                }).prependTo($(settings.handleSelector,this));	
									            	}
									            }
									        });
									        
									        $('#'+app_id+' .edit-box').each(function () {
									            $('input',this).keyup(function () {
									                $(this).parents(settings.widgetSelector).find('h3').text( $(this).val().length>20 ? $(this).val().substr(0,20)+'...' : $(this).val() );
									                console.log($(this).val());
									               // $.post("ccnx://bupt/servlet/ModuleTextServlet", {username: $("#username").attr("title"), module_id: module_id, textvalue: $(this).val()},
									                AJAX_CCNx({
														url: "ccnx://bupt/servlet/ModuleTextServlet",
														type: "GET",
														async: true,
														params: "textvalue="+$(this).val()+"&username="+$("#username").attr("title")+"&module_id="+module_id,
														success: function(dat){
									                }});
									            });
									            $('ul.colors li',this).click(function () {
									                
									                var colorStylePattern = /\bcolor-[\w]{1,}\b/,
									                    thisWidgetColorClass = $(this).parents(settings.widgetSelector).attr('class').match(colorStylePattern);
									                if (thisWidgetColorClass) {
									                    $(this).parents(settings.widgetSelector)
									                        .removeClass(thisWidgetColorClass[0])
									                        .addClass($(this).attr('class').match(colorStylePattern)[0]);
									                }
									                //$.post("ccnx://bupt/servlet/ModuleColorServlet", {username: $("#username").attr("title"), module_id: module_id, colorvalue: $(this).attr('class').match(colorStylePattern)[0]}, 
									                AJAX_CCNx({
														url: "ccnx://bupt/servlet/ModuleColorServlet",
														type: "GET",
														async: true,
														params: "colorvalue="+$(this).attr('class').match(colorStylePattern)[0]+"&username="+$("#username").attr("title")+"&module_id="+module_id,
														success: function(dat){
									                }});
									                console.log($(this).attr('class').match(colorStylePattern)[0]);
									                console.log(thisWidgetColorClass);
									                return false;
									                
									            });
									        });
									        
									    },
									    
									    attachStylesheet : function (href) {
									        var $ = this.jQuery;
									        return $('<link href="' + href + '" rel="stylesheet" type="text/css" />').appendTo('head');
									    },
									    
									    makeSortable : function () {
									        var iNettuts = this,
									            $ = this.jQuery,
									            settings = this.settings,
									            $sortableItems = (function () {
									                var notSortable = null;
									                $(settings.widgetSelector,$(settings.columns)).each(function (i) {
									                    if (!iNettuts.getWidgetSettings(this.id).movable) {
									                        if(!this.id) {
									                            this.id = 'widget-no-id-' + i;
									                        }
									                        notSortable += '#' + this.id + ',';
									                    }
									                });
									               // notSortable += '#' + this.id + ',';
									                return $('> li:not(' + notSortable + ')', settings.columns);
									            })();
									        //settings.handleSelector
			                                $sortableItems.find(settings.handleSelector).css({
									            cursor: 'move'
									             }).mousedown(function (e) {
									            $sortableItems.css({width:''});
									            $(this).parent().css({
									                width: $(this).parent().width() + 'px'
									            });
									            }).mouseup(function () {
									            
									            if(!$(this).parent().hasClass('dragging')) {
									                $(this).parent().css({width:''});

									            } else {
									                $(settings.columns).sortable('disable');
									            }
									        });
									        $("#"+app_id).sortable({
									            items: $sortableItems,
									            connectWith: $(settings.columns),
									            handle: settings.handleSelector,
									            placeholder: 'widget-placeholder',
									            forcePlaceholderSize: true,
									            helper: 'clone',
									            revert: 300,
									            delay: 100,
									            opacity: 0.8,
									            containment: 'document',
									            update : function(){ 
									                 console.log("444444");
									                 /*var $orderlist1 = $("#orderlist1");
									                 var $orderlist2 = $("#orderlist2");
									                 var $orderlist3 = $("#orderlist3");*/
									                 var new_order1 = []; 
									                 var new_order2 = []; 
									                 var new_order3 = []; 
									                 $("#column1 .widget").each(function() { 
									                    new_order1.push(this.id); 
									                 }); 
									                 $("#column2 .widget").each(function() { 
									                    new_order2.push(this.id); 
									                 }); 
									                 $("#column3 .widget").each(function() { 
									                    new_order3.push(this.id); 
									                 }); 
									                 var newid1 = new_order1.join(',')+""; 
									                 //var oldid1 = $orderlist1.val(); 
									                 var newid2 = new_order2.join(',')+""; 
									                 //var oldid2 = $orderlist2.val(); 
									                 var newid3 = new_order3.join(',')+""; 
									                 //var oldid3 = $orderlist3.val(); 
									                //  console.log(newid1);
									                 //if (newid1!=oldid1||newid2!=oldid2||newid3!=oldid3){
									                console.log($("#username").attr("title"));
									                console.log(newid1);
									                console.log(newid2);
									                console.log(newid3);
									                $.post("ccnx://bupt/servlet/ModuleSortServlet", {username: $("#username").attr("title"), newid1: newid1, newid2: newid2, newid3: newid3}, function(data){
									                },"json");
									                // }
									                 
									            },
									            start : function (e,ui) {
									                $(ui.helper).addClass('dragging');
									            },
									            stop : function (e,ui) {
									                $(ui.item).css({width:''}).removeClass('dragging');
									                $(settings.columns).sortable('enable');
									            }
									        });
									         
									    }
									  
									};

									iNettuts.init();
						   		     }
						   	    };
						   		plusmodules.addmodules(data,app_id,module_id);
						   		$.post("ccnx://bupt/servlet/ModuleTextInitServlet", {username: $("#username").attr("title"), module_id: module_id, app_id: app_id}, function(texts){
							    	    console.log(texts.textvalue+"");
							    	    console.log("#"+texts.app_id);
							    	    if(texts.textvalue!=""&&texts.textvalue!=null){
							    	    	//$("#"+texts.app_id).html("111");
							    	    	$("#"+texts.app_id+" div h3").html(texts.textvalue);
							    	    }

									},"json");
						   		$.post("ccnx://bupt/servlet/ModuleColorInitServlet", {username: $("#username").attr("title"), module_id: module_id, app_id: app_id}, function(texts){
							    	    console.log(texts.colorvalue+"");
							    	    console.log("#"+texts.app_id);
							    	    if(texts.colorvalue!=""&&texts.colorvalue!=null){
							    	    	//$("#"+texts.app_id).html("111");
							    	    	$("#"+texts.app_id).removeClass().addClass("widget "+texts.colorvalue);
							    	    }

									},"json");

							}
							for (var i=0;i<data.module_html2.length;i++)
							{
								var arr = (data.module_id2[i]+"").split("-");
			    	            var app_id = "appid-"+arr[1];
							    $("#"+data.module_id2[i]).children(":first-child").attr("class","icon-remove");
							    $("#"+data.module_id2[i]).attr("title","删除");
							    //var username;
							    var actiongoal;
							    var module_id = data.module_id2[i]+"";
							    console.log(data.module_html2[i]);
							    
							    var plusmodules = { addmodules : function (data,app_id,module_id) {
					            	$("#column2").append(data.module_html2[i]);

									var iNettuts = {
									    
									    jQuery : $,
									    
									    settings : {
									        columns : '.column',
									        widgetSelector: '.widget',
									        handleSelector: '.widget-head',
									        contentSelector: '.widget-content',
									        widgetDefault : {
									            movable: true,
									            removable: true,
									            collapsible: true,
									            editable: true,
									            colorClasses : ['color-yellow', 'color-red', 'color-blue', 'color-white', 'color-orange', 'color-green']
									        },
									        widgetIndividual : {
									            intro : {
									                movable: false,
									                removable: false,
									                collapsible: false,
									                editable: false
									            }
									        }
									    },

									    init : function () {
									        this.attachStylesheet('css/inettuts.js.css');
									        this.addWidgetControls();
									        this.makeSortable();
									    },
									    
									    getWidgetSettings : function (id) {
									        var $ = this.jQuery,
									            settings = this.settings;
									        return (id&&settings.widgetIndividual[id]) ? $.extend({},settings.widgetDefault,settings.widgetIndividual[id]) : settings.widgetDefault;
									    },
									    
									    addWidgetControls : function () {
									        var iNettuts = this,
									            $ = this.jQuery,
									            settings = this.settings;
									            
									        $(settings.widgetSelector, $(settings.columns)).each(function () {
									        	console.log(this.id);
									            var thisWidgetSettings = iNettuts.getWidgetSettings(this.id);
									            if (thisWidgetSettings.removable) {
									            	// $(".color-red").children(".widget-head").children("a.remove");
									            	if ($(this).children(".widget-head").children("a.remove").length == 0) {
									            		$('<a href="#" class="remove">CLOSE</a>').mousedown(function (e) {
										                    e.stopPropagation();    
										                }).click(function () {
										                    if(confirm('This widget will be removed, ok?')) {
										                        $(this).parents(settings.widgetSelector).animate({
										                            opacity: 0    
										                        },function () {
										                            $(this).wrap('<div/>').parent().slideUp(function () {
										                            	//applications.app_process();

										                                $("#"+module_id).attr("title","添加");
															    		actiongoal = "remove";
															    		var new_order1 = []; 
															             var new_order2 = []; 
															             var new_order3 = []; 
															             var arr = (module_id+"").split("-");
															             $("#column1 .widget").each(function() { 
															                new_order1.push(this.id); 
															             }); 
															             Array.prototype.indexOf = function(val) {
																            for (var i = 0; i < this.length; i++) {
																                if (this[i] == val) return i;
																            }
																            return -1;
																        };
																        Array.prototype.remove = function(val) {
																            var index = this.indexOf(val);
																            if (index > -1) {
																                this.splice(index, 1);
																            }
																        };
															             new_order1.remove("appid-"+arr[1]); 
															             $("#column2 .widget").each(function() { 
															                new_order2.push(this.id); 
															             }); 
															             $("#column3 .widget").each(function() { 
															                new_order3.push(this.id); 
															             }); 
															             var newid1 = new_order1.join(',')+""; 
															             var newid2 = new_order2.join(',')+""; 
															             var newid3 = new_order3.join(',')+""; 
															            console.log($("#username").attr("title"));
															            console.log(newid1);
															            console.log(newid2);
															            console.log(newid3);
															            $.post("ccnx://bupt/servlet/ModuleSortServlet", {username: $("#username").attr("title"), newid1: newid1, newid2: newid2, newid3: newid3}, function(data){
															            },"json");
															    		$.post("ccnx://bupt/servlet/ModuleProcessServlet", {actiongoal: actiongoal, username: $("#username").attr("title"), module_id: module_id }, function(data){
															            },"json");
										                                $(this).remove();
										                                $("#"+module_id).children(":first-child").attr("class","icon-plus");
										                            });
										                        });
										                    }
										                    return false;
										                }).appendTo($(settings.handleSelector, this));	
									            	}
									            }
									            
									            if (thisWidgetSettings.editable) {
									            	if ($(this).children(".widget-head").children("a.edit").length == 0) {
									            		console.log("get in edit");
									            		$('<a href="#" class="edit">EDIT</a>').mousedown(function (e) {
										                    e.stopPropagation();    
										                }).toggle(function () {
										                    $(this).css({backgroundPosition: '-66px 0', width: '55px'})
										                        .parents(settings.widgetSelector)
										                            .find('.edit-box').show().find('input').focus();
										                    return false;
										                },function () {
										                    $(this).css({backgroundPosition: '', width: ''})
										                        .parents(settings.widgetSelector)
										                            .find('.edit-box').hide();
										                    return false;
										                }).appendTo($(settings.handleSelector,this));

										                $('<div class="edit-box" style="display:none;"/>')
									                    .append('<ul><li class="item"><label>Change the title?</label><input value="' + $('h3',this).text() + '"/></li>')
									                    .append((function(){
									                        var colorList = '<li class="item"><label>Available colors:</label><ul class="colors">';
									                        $(thisWidgetSettings.colorClasses).each(function () {
									                            colorList += '<li class="' + this + '"/>';
									                        });
									                        return colorList + '</ul>';
									                    })())
									                    .append('</ul>')
									                    .insertAfter($(settings.handleSelector,this));
									            	}
									            }
									            
									            if (thisWidgetSettings.collapsible) {
									            	if ($(this).children(".widget-head").children("a.collapse").length == 0) {
									            		$('<a href="#" class="collapse">COLLAPSE</a>').mousedown(function (e) {
										                    e.stopPropagation();    
										                }).toggle(function () {
										                    $(this).css({backgroundPosition: '-38px 0'})
										                        .parents(settings.widgetSelector)
										                            .find(settings.contentSelector).hide();
										                    return false;
										                },function () {
										                    $(this).css({backgroundPosition: ''})
										                        .parents(settings.widgetSelector)
										                            .find(settings.contentSelector).show();
										                    return false;
										                }).prependTo($(settings.handleSelector,this));	
									            	}
									            }
									        });
									        
									        $('#'+app_id+' .edit-box').each(function () {
									            $('input',this).keyup(function () {
									                $(this).parents(settings.widgetSelector).find('h3').text( $(this).val().length>20 ? $(this).val().substr(0,20)+'...' : $(this).val() );
									                console.log($(this).val());
									                $.post("ccnx://bupt/servlet/ModuleTextServlet", {username: $("#username").attr("title"), module_id: module_id, textvalue: $(this).val()}, function(data){
									                },"json");
									            });
									            $('ul.colors li',this).click(function () {
									                
									                var colorStylePattern = /\bcolor-[\w]{1,}\b/,
									                    thisWidgetColorClass = $(this).parents(settings.widgetSelector).attr('class').match(colorStylePattern);
									                if (thisWidgetColorClass) {
									                    $(this).parents(settings.widgetSelector)
									                        .removeClass(thisWidgetColorClass[0])
									                        .addClass($(this).attr('class').match(colorStylePattern)[0]);
									                }
									                $.post("ccnx://bupt/servlet/ModuleColorServlet", {username: $("#username").attr("title"), module_id: module_id, colorvalue: $(this).attr('class').match(colorStylePattern)[0]}, function(data){
									                },"json");
									                console.log($(this).attr('class').match(colorStylePattern)[0]);
									                console.log(thisWidgetColorClass);
									                return false;
									                
									            });
									        });
									        
									    },
									    
									    attachStylesheet : function (href) {
									        var $ = this.jQuery;
									        return $('<link href="' + href + '" rel="stylesheet" type="text/css" />').appendTo('head');
									    },
									    
									    makeSortable : function () {
									        var iNettuts = this,
									            $ = this.jQuery,
									            settings = this.settings,
									            $sortableItems = (function () {
									                var notSortable = null;
									                $(settings.widgetSelector,$(settings.columns)).each(function (i) {
									                    if (!iNettuts.getWidgetSettings(this.id).movable) {
									                        if(!this.id) {
									                            this.id = 'widget-no-id-' + i;
									                        }
									                        notSortable += '#' + this.id + ',';
									                    }
									                });
									               // notSortable += '#' + this.id + ',';
									                return $('> li:not(' + notSortable + ')', settings.columns);
									            })();
									        //settings.handleSelector
			                                $sortableItems.find(settings.handleSelector).css({
									            cursor: 'move'
									             }).mousedown(function (e) {
									          
									            $sortableItems.css({width:''});
									            $(this).parent().css({
									                width: $(this).parent().width() + 'px'
									            });
									            }).mouseup(function () {
									            
									            if(!$(this).parent().hasClass('dragging')) {
									                $(this).parent().css({width:''});

									            } else {
									                $(settings.columns).sortable('disable');
									            }
									        });
									        $("#"+app_id).sortable({
									            items: $sortableItems,
									            connectWith: $(settings.columns),
									            handle: settings.handleSelector,
									            placeholder: 'widget-placeholder',
									            forcePlaceholderSize: true,
									            helper: 'clone',
									            revert: 300,
									            delay: 100,
									            opacity: 0.8,
									            containment: 'document',
									            update : function(){ 
									                 console.log("555555");
									                 /*var $orderlist1 = $("#orderlist1");
									                 var $orderlist2 = $("#orderlist2");
									                 var $orderlist3 = $("#orderlist3");*/
									                 var new_order1 = []; 
									                 var new_order2 = []; 
									                 var new_order3 = []; 
									                 $("#column1 .widget").each(function() { 
									                    new_order1.push(this.id); 
									                 }); 
									                 $("#column2 .widget").each(function() { 
									                    new_order2.push(this.id); 
									                 }); 
									                 $("#column3 .widget").each(function() { 
									                    new_order3.push(this.id); 
									                 }); 
									                 var newid1 = new_order1.join(',')+""; 
									                 //var oldid1 = $orderlist1.val(); 
									                 var newid2 = new_order2.join(',')+""; 
									                 //var oldid2 = $orderlist2.val(); 
									                 var newid3 = new_order3.join(',')+""; 
									                 //var oldid3 = $orderlist3.val(); 
									                //  console.log(newid1);
									                 //if (newid1!=oldid1||newid2!=oldid2||newid3!=oldid3){
									                console.log($("#username").attr("title"));
									                console.log(newid1);
									                console.log(newid2);
									                console.log(newid3);
									                $.post("ccnx://bupt/servlet/ModuleSortServlet", {username: $("#username").attr("title"), newid1: newid1, newid2: newid2, newid3: newid3}, function(data){
									                },"json");
									                // }
									                 
									            },
									            start : function (e,ui) {
									                $(ui.helper).addClass('dragging');
									            },
									            stop : function (e,ui) {
									                $(ui.item).css({width:''}).removeClass('dragging');
									                $(settings.columns).sortable('enable');
									            }
									        });						         
									    }
									  
									};

									iNettuts.init();
						   		     }
						   	    };
						   		plusmodules.addmodules(data,app_id,module_id);
						   		$.post("ccnx://bupt/servlet/ModuleTextInitServlet", {username: $("#username").attr("title"), module_id: module_id, app_id: app_id}, function(texts){
							    	    console.log(texts.textvalue+"");
							    	    console.log("#"+texts.app_id);
							    	    if(texts.textvalue!=""&&texts.textvalue!=null){
							    	    	//$("#"+texts.app_id).html("111");
							    	    	$("#"+texts.app_id+" div h3").html(texts.textvalue);
							    	    }

									},"json");
						   		$.post("ccnx://bupt/servlet/ModuleColorInitServlet", {username: $("#username").attr("title"), module_id: module_id, app_id: app_id}, function(texts){
							    	    console.log(texts.colorvalue+"");
							    	    console.log("#"+texts.app_id);
							    	    if(texts.colorvalue!=""&&texts.colorvalue!=null){
							    	    	//$("#"+texts.app_id).html("111");
							    	    	$("#"+texts.app_id).removeClass().addClass("widget "+texts.colorvalue);
							    	    }

									},"json");

							}
							for (var i=0;i<data.module_html3.length;i++)
							{
								var arr = (data.module_id3[i]+"").split("-");
			    	            var app_id = "appid-"+arr[1];
							    $("#"+data.module_id3[i]).children(":first-child").attr("class","icon-remove");
							    $("#"+data.module_id3[i]).attr("title","删除");
							   // var username;
							    var actiongoal;
							    var module_id = data.module_id3[i]+"";
							    console.log(data.module_html3[i]);
							    
							    var plusmodules = { addmodules : function (data,app_id,module_id) {
					            	$("#column3").append(data.module_html3[i]);

									var iNettuts = {
									    
									    jQuery : $,
									    
									    settings : {
									        columns : '.column',
									        widgetSelector: '.widget',
									        handleSelector: '.widget-head',
									        contentSelector: '.widget-content',
									        widgetDefault : {
									            movable: true,
									            removable: true,
									            collapsible: true,
									            editable: true,
									            colorClasses : ['color-yellow', 'color-red', 'color-blue', 'color-white', 'color-orange', 'color-green']
									        },
									        widgetIndividual : {
									            intro : {
									                movable: false,
									                removable: false,
									                collapsible: false,
									                editable: false
									            }
									        }
									    },

									    init : function () {
									        this.attachStylesheet('css/inettuts.js.css');
									        this.addWidgetControls();
									        this.makeSortable();
									    },
									    
									    getWidgetSettings : function (id) {
									        var $ = this.jQuery,
									            settings = this.settings;
									        return (id&&settings.widgetIndividual[id]) ? $.extend({},settings.widgetDefault,settings.widgetIndividual[id]) : settings.widgetDefault;
									    },
									    
									    addWidgetControls : function () {
									        var iNettuts = this,
									            $ = this.jQuery,
									            settings = this.settings;
									            
									        $(settings.widgetSelector, $(settings.columns)).each(function () {
									        	console.log(this.id);
									            var thisWidgetSettings = iNettuts.getWidgetSettings(this.id);
									            if (thisWidgetSettings.removable) {
									            	// $(".color-red").children(".widget-head").children("a.remove");
									            	if ($(this).children(".widget-head").children("a.remove").length == 0) {
									            		$('<a href="#" class="remove">CLOSE</a>').mousedown(function (e) {
										                    e.stopPropagation();    
										                }).click(function () {
										                    if(confirm('This widget will be removed, ok?')) {
										                        $(this).parents(settings.widgetSelector).animate({
										                            opacity: 0    
										                        },function () {
										                            $(this).wrap('<div/>').parent().slideUp(function () {

										                                $("#"+module_id).attr("title","添加");
															    		actiongoal = "remove";
															    		var new_order1 = []; 
															             var new_order2 = []; 
															             var new_order3 = []; 
															             var arr = (module_id+"").split("-");
															             $("#column1 .widget").each(function() { 
															                new_order1.push(this.id); 
															             }); 
															             Array.prototype.indexOf = function(val) {
																            for (var i = 0; i < this.length; i++) {
																                if (this[i] == val) return i;
																            }
																            return -1;
																        };
																        Array.prototype.remove = function(val) {
																            var index = this.indexOf(val);
																            if (index > -1) {
																                this.splice(index, 1);
																            }
																        };
															             new_order1.remove("appid-"+arr[1]); 
															             $("#column2 .widget").each(function() { 
															                new_order2.push(this.id); 
															             }); 
															             $("#column3 .widget").each(function() { 
															                new_order3.push(this.id); 
															             }); 
															             var newid1 = new_order1.join(',')+""; 
															             var newid2 = new_order2.join(',')+""; 
															             var newid3 = new_order3.join(',')+""; 
															            console.log($("#username").attr("title"));
															            console.log(newid1);
															            console.log(newid2);
															            console.log(newid3);
															            $.post("ccnx://bupt/servlet/ModuleSortServlet", {username: $("#username").attr("title"), newid1: newid1, newid2: newid2, newid3: newid3}, function(data){
															            },"json");
															    		$.post("ccnx://bupt/servlet/ModuleProcessServlet", {actiongoal: actiongoal, username: $("#username").attr("title"), module_id: module_id }, function(data){
															            },"json");
										                                $(this).remove();
										                                $("#"+module_id).children(":first-child").attr("class","icon-plus");
										                            });
										                        });
										                    }
										                    return false;
										                }).appendTo($(settings.handleSelector, this));	
									            	}
									            }
									            
									            if (thisWidgetSettings.editable) {
									            	if ($(this).children(".widget-head").children("a.edit").length == 0) {
									            		console.log("get in edit");
									            		$('<a href="#" class="edit">EDIT</a>').mousedown(function (e) {
										                    e.stopPropagation();    
										                }).toggle(function () {
										                    $(this).css({backgroundPosition: '-66px 0', width: '55px'})
										                        .parents(settings.widgetSelector)
										                            .find('.edit-box').show().find('input').focus();
										                    return false;
										                },function () {
										                    $(this).css({backgroundPosition: '', width: ''})
										                        .parents(settings.widgetSelector)
										                            .find('.edit-box').hide();
										                    return false;
										                }).appendTo($(settings.handleSelector,this));

										                $('<div class="edit-box" style="display:none;"/>')
									                    .append('<ul><li class="item"><label>Change the title?</label><input value="' + $('h3',this).text() + '"/></li>')
									                    .append((function(){
									                        var colorList = '<li class="item"><label>Available colors:</label><ul class="colors">';
									                        $(thisWidgetSettings.colorClasses).each(function () {
									                            colorList += '<li class="' + this + '"/>';
									                        });
									                        return colorList + '</ul>';
									                    })())
									                    .append('</ul>')
									                    .insertAfter($(settings.handleSelector,this));
									            	}
									            }
									            
									            if (thisWidgetSettings.collapsible) {
									            	if ($(this).children(".widget-head").children("a.collapse").length == 0) {
									            		$('<a href="#" class="collapse">COLLAPSE</a>').mousedown(function (e) {
										                    e.stopPropagation();    
										                }).toggle(function () {
										                    $(this).css({backgroundPosition: '-38px 0'})
										                        .parents(settings.widgetSelector)
										                            .find(settings.contentSelector).hide();
										                    return false;
										                },function () {
										                    $(this).css({backgroundPosition: ''})
										                        .parents(settings.widgetSelector)
										                            .find(settings.contentSelector).show();
										                    return false;
										                }).prependTo($(settings.handleSelector,this));	
									            	}
									            }
									        });
									        
									        $('#'+app_id+' .edit-box').each(function () {
									            $('input',this).keyup(function () {
									                $(this).parents(settings.widgetSelector).find('h3').text( $(this).val().length>20 ? $(this).val().substr(0,20)+'...' : $(this).val() );
									                console.log($(this).val());
									                $.post("ccnx://bupt/servlet/ModuleTextServlet", {username: $("#username").attr("title"), module_id: module_id, textvalue: $(this).val()}, function(data){
									                },"json");
									            });
									            $('ul.colors li',this).click(function () {
									                
									                var colorStylePattern = /\bcolor-[\w]{1,}\b/,
									                    thisWidgetColorClass = $(this).parents(settings.widgetSelector).attr('class').match(colorStylePattern);
									                if (thisWidgetColorClass) {
									                    $(this).parents(settings.widgetSelector)
									                        .removeClass(thisWidgetColorClass[0])
									                        .addClass($(this).attr('class').match(colorStylePattern)[0]);
									                }
									                $.post("ccnx://bupt/servlet/ModuleColorServlet", {username: $("#username").attr("title"), module_id: module_id, colorvalue: $(this).attr('class').match(colorStylePattern)[0]}, function(data){
									                },"json");
									                console.log($(this).attr('class').match(colorStylePattern)[0]);
									                console.log(thisWidgetColorClass);
									                return false;
									                
									            });
									        });
									        
									    },
									    
									    attachStylesheet : function (href) {
									        var $ = this.jQuery;
									        return $('<link href="' + href + '" rel="stylesheet" type="text/css" />').appendTo('head');
									    },
									    
									    makeSortable : function () {
									        var iNettuts = this,
									            $ = this.jQuery,
									            settings = this.settings,
									            $sortableItems = (function () {
									                var notSortable = null;
									                $(settings.widgetSelector,$(settings.columns)).each(function (i) {
									                    if (!iNettuts.getWidgetSettings(this.id).movable) {
									                        if(!this.id) {
									                            this.id = 'widget-no-id-' + i;
									                        }
									                        notSortable += '#' + this.id + ',';
									                    }
									                });
									               // notSortable += '#' + this.id + ',';
									                return $('> li:not(' + notSortable + ')', settings.columns);
									            })();
									        //settings.handleSelector
			                                $sortableItems.find(settings.handleSelector).css({
									            cursor: 'move'
									             }).mousedown(function (e) {
									          
									            $sortableItems.css({width:''});
									            $(this).parent().css({
									                width: $(this).parent().width() + 'px'
									            });
									            }).mouseup(function () {
									            
									            if(!$(this).parent().hasClass('dragging')) {
									                $(this).parent().css({width:''});

									            } else {
									                $(settings.columns).sortable('disable');
									            }
									        });
									        $("#"+app_id).sortable({
									            items: $sortableItems,
									            connectWith: $(settings.columns),
									            handle: settings.handleSelector,
									            placeholder: 'widget-placeholder',
									            forcePlaceholderSize: true,
									            helper: 'clone',
									            revert: 300,
									            delay: 100,
									            opacity: 0.8,
									            containment: 'document',
									            update : function(){ 
									                 console.log("66666");
									                 /*var $orderlist1 = $("#orderlist1");
									                 var $orderlist2 = $("#orderlist2");
									                 var $orderlist3 = $("#orderlist3");*/
									                 var new_order1 = []; 
									                 var new_order2 = []; 
									                 var new_order3 = []; 
									                 $("#column1 .widget").each(function() { 
									                    new_order1.push(this.id); 
									                 }); 
									                 $("#column2 .widget").each(function() { 
									                    new_order2.push(this.id); 
									                 }); 
									                 $("#column3 .widget").each(function() { 
									                    new_order3.push(this.id); 
									                 }); 
									                 var newid1 = new_order1.join(',')+""; 
									                 //var oldid1 = $orderlist1.val(); 
									                 var newid2 = new_order2.join(',')+""; 
									                 //var oldid2 = $orderlist2.val(); 
									                 var newid3 = new_order3.join(',')+""; 
									                 //var oldid3 = $orderlist3.val(); 
									                //  console.log(newid1);
									                 //if (newid1!=oldid1||newid2!=oldid2||newid3!=oldid3){
									                console.log($("#username").attr("title"));
									                console.log(newid1);
									                console.log(newid2);
									                console.log(newid3);
									                $.post("ccnx://bupt/servlet/ModuleSortServlet", {username: $("#username").attr("title"), newid1: newid1, newid2: newid2, newid3: newid3}, function(data){
									                },"json");
									                // }
									                 
									            },
									            start : function (e,ui) {
									                $(ui.helper).addClass('dragging');
									            },
									            stop : function (e,ui) {
									                $(ui.item).css({width:''}).removeClass('dragging');
									                $(settings.columns).sortable('enable');
									            }
									        });				         
									    }
									  
									};

									iNettuts.init();
						   		     }
						   	    };
						   		plusmodules.addmodules(data,app_id,module_id);
						   		$.post("ccnx://bupt/servlet/ModuleTextInitServlet", {username: $("#username").attr("title"), module_id: module_id, app_id: app_id}, function(texts){
							    	    console.log(texts.textvalue+"");
							    	    console.log("#"+texts.app_id);
							    	    if(texts.textvalue!=""&&texts.textvalue!=null){
							    	    	//$("#"+texts.app_id).html("111");
							    	    	$("#"+texts.app_id+" div h3").html(texts.textvalue);
							    	    }

									},"json");
						   		$.post("ccnx://bupt/servlet/ModuleColorInitServlet", {username: $("#username").attr("title"), module_id: module_id, app_id: app_id}, function(texts){
							    	    console.log(texts.colorvalue+"");
							    	    console.log("#"+texts.app_id);
							    	    if(texts.colorvalue!=""&&texts.colorvalue!=null){
							    	    	//$("#"+texts.app_id).html("111");
							    	    	$("#"+texts.app_id).removeClass().addClass("widget "+texts.colorvalue);
							    	    }

									},"json");

							}

				   		}});
				   		                 
			    $(".app-module").click( function(){
			    	//var user_id = $("#user_id").attr("title");
			    	//var username;
			    	var actiongoal;
			    	var module_id = $(this).attr('id');
			    	var arr = module_id.split("-");
			    	var app_id = "appid-"+arr[1];
			    	var status = $(this).children(":first-child").attr("class");

					console.log(module_id);
					console.log($(this).children(":first-child").attr("class"));
			    	if (status == "icon-plus") {
						$(this).children(":first-child").attr("class","icon-remove");
						$(this).attr("title","删除");
						actiongoal = "plus";
						$.post("ccnx://bupt/servlet/ModuleProcessServlet", {actiongoal: actiongoal, username: $("#username").attr("title"), module_id: module_id },
					   		function(data){
					   			console.log("ajax callback function");
					     		console.log(data.module_html);
					

					     		//module_html = app_weather;//'<div id="appid-1">\
					     		                  
								               // </div>';

				            	$("#column1").append(data.module_html);

				                /*
								 * Script from NETTUTS.com [by James Padolsey]
								 * @requires jQuery($), jQuery UI & sortable/draggable UI modules
								 */


								var iNettuts = {
								    
								    jQuery : $,
								    
								    settings : {
								        columns : '.column',
								        widgetSelector: '.widget',
								        handleSelector: '.widget-head',
								        contentSelector: '.widget-content',
								        widgetDefault : {
								            movable: true,
								            removable: true,
								            collapsible: true,
								            editable: true,
								            colorClasses : ['color-yellow', 'color-red', 'color-blue', 'color-white', 'color-orange', 'color-green']
								        },
								        widgetIndividual : {
								            intro : {
								                movable: false,
								                removable: false,
								                collapsible: false,
								                editable: false
								            }
								        }
								    },

								    init : function () {
								        this.attachStylesheet('css/inettuts.js.css');
								        this.addWidgetControls();
								        this.makeSortable();
								    },
								    
								    getWidgetSettings : function (id) {
								        var $ = this.jQuery,
								            settings = this.settings;
								        return (id&&settings.widgetIndividual[id]) ? $.extend({},settings.widgetDefault,settings.widgetIndividual[id]) : settings.widgetDefault;
								    },
								    
								    addWidgetControls : function () {
								        var iNettuts = this,
								            $ = this.jQuery,
								            settings = this.settings;
								            
								        $(settings.widgetSelector, $(settings.columns)).each(function () {
								        	console.log(this.id);
								            var thisWidgetSettings = iNettuts.getWidgetSettings(this.id);
								            if (thisWidgetSettings.removable) {
								            	// $(".color-red").children(".widget-head").children("a.remove");
								            	if ($(this).children(".widget-head").children("a.remove").length == 0) {
								            		$('<a href="#" class="remove">CLOSE</a>').mousedown(function (e) {
									                    e.stopPropagation();    
									                }).click(function () {
									                    if(confirm('This widget will be removed, ok?')) {
									                        $(this).parents(settings.widgetSelector).animate({
									                            opacity: 0    
									                        },function () {
									                            $(this).wrap('<div/>').parent().slideUp(function () {
														    		$("#"+module_id).attr("title","添加");
														    		actiongoal = "remove";
														    		var new_order1 = []; 
															             var new_order2 = []; 
															             var new_order3 = []; 
															             var arr = (module_id+"").split("-");
															             $("#column1 .widget").each(function() { 
															                new_order1.push(this.id); 
															             }); 
															             Array.prototype.indexOf = function(val) {
																            for (var i = 0; i < this.length; i++) {
																                if (this[i] == val) return i;
																            }
																            return -1;
																        };
																        Array.prototype.remove = function(val) {
																            var index = this.indexOf(val);
																            if (index > -1) {
																                this.splice(index, 1);
																            }
																        };
															             new_order1.remove("appid-"+arr[1]); 
															             $("#column2 .widget").each(function() { 
															                new_order2.push(this.id); 
															             }); 
															             $("#column3 .widget").each(function() { 
															                new_order3.push(this.id); 
															             }); 
															             var newid1 = new_order1.join(',')+""; 
															             var newid2 = new_order2.join(',')+""; 
															             var newid3 = new_order3.join(',')+""; 
															            console.log($("#username").attr("title"));
															            console.log(newid1);
															            console.log(newid2);
															            console.log(newid3);
															            $.post("ccnx://bupt/servlet/ModuleSortServlet", {username: $("#username").attr("title"), newid1: newid1, newid2: newid2, newid3: newid3}, function(data){
															            },"json");
															    		$.post("ccnx://bupt/servlet/ModuleProcessServlet", {actiongoal: actiongoal, username: $("#username").attr("title"), module_id: module_id }, function(data){
															            },"json");
									                                $(this).remove();
									                                $("#"+module_id).children(":first-child").attr("class","icon-plus");
									                            });
									                        });
									                    }
									                    return false;
									                }).appendTo($(settings.handleSelector, this));	
								            	}
								            }
								            
								            if (thisWidgetSettings.editable) {
								            	if ($(this).children(".widget-head").children("a.edit").length == 0) {
								            		console.log("get in edit");
								            		$('<a href="#" class="edit">EDIT</a>').mousedown(function (e) {
									                    e.stopPropagation();    
									                }).toggle(function () {
									                    $(this).css({backgroundPosition: '-66px 0', width: '55px'})
									                        .parents(settings.widgetSelector)
									                            .find('.edit-box').show().find('input').focus();
									                    return false;
									                },function () {
									                    $(this).css({backgroundPosition: '', width: ''})
									                        .parents(settings.widgetSelector)
									                            .find('.edit-box').hide();
									                    return false;
									                }).appendTo($(settings.handleSelector,this));

									                $('<div class="edit-box" style="display:none;"/>')
								                    .append('<ul><li class="item"><label>Change the title?</label><input value="' + $('h3',this).text() + '"/></li>')
								                    .append((function(){
								                        var colorList = '<li class="item"><label>Available colors:</label><ul class="colors">';
								                        $(thisWidgetSettings.colorClasses).each(function () {
								                            colorList += '<li class="' + this + '"/>';
								                        });
								                        return colorList + '</ul>';
								                    })())
								                    .append('</ul>')
								                    .insertAfter($(settings.handleSelector,this));
								            	}
								            }
								            
								            if (thisWidgetSettings.collapsible) {
								            	if ($(this).children(".widget-head").children("a.collapse").length == 0) {
								            		$('<a href="#" class="collapse">COLLAPSE</a>').mousedown(function (e) {
									                    e.stopPropagation();    
									                }).toggle(function () {
									                    $(this).css({backgroundPosition: '-38px 0'})
									                        .parents(settings.widgetSelector)
									                            .find(settings.contentSelector).hide();
									                    return false;
									                },function () {
									                    $(this).css({backgroundPosition: ''})
									                        .parents(settings.widgetSelector)
									                            .find(settings.contentSelector).show();
									                    return false;
									                }).prependTo($(settings.handleSelector,this));	
								            	}
								            }
								        });
								        
							         $('#'+app_id+' .edit-box').each(function () {
								            $('input',this).keyup(function () {
								                $(this).parents(settings.widgetSelector).find('h3').text( $(this).val().length>20 ? $(this).val().substr(0,20)+'...' : $(this).val() );
								                console.log($(this).val());
								                $.post("ccnx://bupt/servlet/ModuleTextServlet", {username: $("#username").attr("title"), module_id: module_id, textvalue: $(this).val()}, function(data){
								                },"json");
								            });
								            $('ul.colors li',this).click(function () {
								                
								                var colorStylePattern = /\bcolor-[\w]{1,}\b/,
								                    thisWidgetColorClass = $(this).parents(settings.widgetSelector).attr('class').match(colorStylePattern);
								                if (thisWidgetColorClass) {
								                    $(this).parents(settings.widgetSelector)
								                        .removeClass(thisWidgetColorClass[0])
								                        .addClass($(this).attr('class').match(colorStylePattern)[0]);
								                }
								                $.post("ccnx://bupt/servlet/ModuleColorServlet", {username: $("#username").attr("title"), module_id: module_id, colorvalue: $(this).attr('class').match(colorStylePattern)[0]}, function(data){
								                },"json");
								                console.log($(this).attr('class').match(colorStylePattern)[0]);
								                console.log(thisWidgetColorClass);
								                return false;
								                
								            });
								        });
								        
								    },
								    
								    attachStylesheet : function (href) {
								        var $ = this.jQuery;
								        return $('<link href="' + href + '" rel="stylesheet" type="text/css" />').appendTo('head');
								    },
								    
								    makeSortable : function () {
								        var iNettuts = this,
								            $ = this.jQuery,
								            settings = this.settings,
								            $sortableItems = (function () {
								                var notSortable = null;
								                $(settings.widgetSelector,$(settings.columns)).each(function (i) {
								                    if (!iNettuts.getWidgetSettings(this.id).movable) {
								                        if(!this.id) {
								                            this.id = 'widget-no-id-' + i;
								                        }
								                        notSortable += '#' + this.id + ',';
								                    }
								                });
								               // notSortable += '#' + this.id + ',';
								                return $('> li:not(' + notSortable + ')', settings.columns);
								            })();
								        //settings.handleSelector
								        $sortableItems.find(settings.handleSelector).css({
								            cursor: 'move'
								        }).mousedown(function (e) {
								            $sortableItems.css({width:''});
								            $(this).parent().css({
								                width: $(this).parent().width() + 'px'
								            });
								        }).mouseup(function () {
								            if(!$(this).parent().hasClass('dragging')) {
								                $(this).parent().css({width:''});
								            } else {
								                $(settings.columns).sortable('disable');
								            }
								        });
				                 //settings.columns
								        $("#"+app_id).sortable({
								            items: $sortableItems,
								            connectWith: $(settings.columns),
								            handle: settings.handleSelector,
								            placeholder: 'widget-placeholder',
								            forcePlaceholderSize: true,
								            revert: 300,
								            delay: 100,
								            opacity: 0.8,
								            containment: 'document',
								            update : function(){ 
								                 console.log("22222");
								                 /*var $orderlist1 = $("#orderlist1");
								                 var $orderlist2 = $("#orderlist2");
								                 var $orderlist3 = $("#orderlist3");*/
								                 var new_order1 = []; 
								                 var new_order2 = []; 
								                 var new_order3 = []; 
								                 $("#column1 .widget").each(function() { 
								                    new_order1.push(this.id); 
								                 }); 
								                 $("#column2 .widget").each(function() { 
								                    new_order2.push(this.id); 
								                 }); 
								                 $("#column3 .widget").each(function() { 
								                    new_order3.push(this.id); 
								                 }); 
								                 var newid1 = new_order1.join(',')+""; 
								                 //var oldid1 = $orderlist1.val(); 
								                 var newid2 = new_order2.join(',')+""; 
								                 //var oldid2 = $orderlist2.val(); 
								                 var newid3 = new_order3.join(',')+""; 
								                 //var oldid3 = $orderlist3.val(); 
								                //  console.log(newid1);
								                 //if (newid1!=oldid1||newid2!=oldid2||newid3!=oldid3){
								                console.log($("#username").attr("title"));
								                console.log(newid1);
								                console.log(newid2);
								                console.log(newid3);
								                $.post("ccnx://bupt/servlet/ModuleSortServlet", {username: $("#username").attr("title"), newid1: newid1, newid2: newid2, newid3: newid3}, function(data){
								                },"json");
								                // }
								                 
								            },
								            start: function (e,ui) {
								                $(ui.helper).addClass('dragging');
								            },
								            stop: function (e,ui) {
								                $(ui.item).css({width:''}).removeClass('dragging');
								                $(settings.columns).sortable('enable');
								            }
								        });
								    }
								  
								};

								iNettuts.init();

					     		// $("#column1").append(data.module_html);
					     		// $("#column1>li:last-child").append(data.module_html);
					   		}, "json"
				   	    );
						console.log("22222");
			             /*var $orderlist1 = $("#orderlist1");
			             var $orderlist2 = $("#orderlist2");
			             var $orderlist3 = $("#orderlist3");*/
			             var new_order1 = []; 
			             var new_order2 = []; 
			             var new_order3 = []; 
			             var arr = (module_id+"").split("-");
			             $("#column1 .widget").each(function() { 
			                new_order1.push(this.id); 
			             }); 
			             new_order1.push('appid-'+arr[1]); 
			             $("#column2 .widget").each(function() { 
			                new_order2.push(this.id); 
			             }); 
			             $("#column3 .widget").each(function() { 
			                new_order3.push(this.id); 
			             }); 
			             var newid1 = new_order1.join(',')+""; 
			             //var oldid1 = $orderlist1.val(); 
			             var newid2 = new_order2.join(',')+""; 
			             //var oldid2 = $orderlist2.val(); 
			             var newid3 = new_order3.join(',')+""; 
			             //var oldid3 = $orderlist3.val(); 
			            //  console.log(newid1);
			             //if (newid1!=oldid1||newid2!=oldid2||newid3!=oldid3){
			            console.log($("#username").attr("title"));
			            console.log(newid1);
			            console.log(newid2);
			            console.log(newid3);
			            $.post("ccnx://bupt/servlet/ModuleSortServlet", {username: $("#username").attr("title"), newid1: newid1, newid2: newid2, newid3: newid3}, function(data){
			            },"json");
			    	} else {
			    		$(this).children(":first-child").attr("class", "icon-plus");
			    		$(this).attr("title","添加");
			    		actiongoal = "remove";
			    		console.log("22222");
			             /*var $orderlist1 = $("#orderlist1");
			             var $orderlist2 = $("#orderlist2");
			             var $orderlist3 = $("#orderlist3");*/
			             var new_order1 = []; 
			             var new_order2 = []; 
			             var new_order3 = []; 
			             var arr = (module_id+"").split("-");
			             $("#column1 .widget").each(function() { 
			                new_order1.push(this.id); 
			             }); 
			             Array.prototype.indexOf = function(val) {
				            for (var i = 0; i < this.length; i++) {
				                if (this[i] == val) return i;
				            }
				            return -1;
				        };
				        Array.prototype.remove = function(val) {
				            var index = this.indexOf(val);
				            if (index > -1) {
				                this.splice(index, 1);
				            }
				        };
			             new_order1.remove("appid-"+arr[1]); 
			             $("#column2 .widget").each(function() { 
			                new_order2.push(this.id); 
			             }); 
			             $("#column3 .widget").each(function() { 
			                new_order3.push(this.id); 
			             }); 
			             var newid1 = new_order1.join(',')+""; 
			             //var oldid1 = $orderlist1.val(); 
			             var newid2 = new_order2.join(',')+""; 
			             //var oldid2 = $orderlist2.val(); 
			             var newid3 = new_order3.join(',')+""; 
			             //var oldid3 = $orderlist3.val(); 
			            //  console.log(newid1);
			             //if (newid1!=oldid1||newid2!=oldid2||newid3!=oldid3){
			            console.log($("#username").attr("title"));
			            console.log(newid1);
			            console.log(newid2);
			            console.log(newid3);
			            $.post("ccnx://bupt/servlet/ModuleSortServlet", {username: $("#username").attr("title"), newid1: newid1, newid2: newid2, newid3: newid3}, function(data){
			            },"json");
			    		$.post("ccnx://bupt/servlet/ModuleProcessServlet", {actiongoal: actiongoal, username: $("#username").attr("title"), module_id: module_id }, function(data){
			            },"json");
			    		$("#"+app_id).remove();
			    	}


					

			        return false;
				   }
			    	);
			}
		
	     }
	});
	
	
});
function hotchange(){
	console.log("1111111111111111111111111");
	$.post("ccnx://bupt/servlet/HotLinkChangeServlet" , function(data){
		console.log(data.module_html);
		$("#appid-4 .widget-content ul").html(data.module_html);
    },"json");
}
function refreshsite(){
	console.log("111111111333311");
	window.location.reload();
}
