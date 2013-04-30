//Define Profile Controller

var ProfilesController = function(){
	this.loadTab=this.checkCookie("loadTab");
	this.loadAccordion=this.checkCookie("loadAccordion");
};

ProfilesController.prototype = {
	index: function() {
		this.initData();
		this.initEventHandler();
	},

	//Controller read data from data.js using ProfilesModel and generate the HTML
	initData: function() {
		var profiles = new Profiles();
		var sortedDatabyName = profiles.getAllsortBy('firstName');
		var profileTabString = "";
		var profileTabContentString = "";
		var profileAccordionString = "";
		for (var index = 1; index <= sortedDatabyName.length; index++) {
			profileTabString += "<li id=\"tab"+index+"\" index=\""+index+"\"><a href=\"#tabProfile" + index + "\">" 
							 	+ sortedDatabyName[index-1].firstName + " " + sortedDatabyName[index-1].lastName + "</a></li>";
			profileTabContentString += "<div class=\"tab-pane\" id=\"tabProfile" + index + "\">" 
								+ "<img class=\"profileImg\" src=" + sortedDatabyName[index-1].picture 
								+ "><div class=\"profileName\">" + sortedDatabyName[index-1].firstName + " " 
								+ sortedDatabyName[index-1].lastName + "</div>"+ sortedDatabyName[index-1].bio + "</div>";
			profileAccordionString += "<div class=\"accordion-group\">"+"<div class=\"accordion-heading\" > <a id=\"accordion"+index+"\" index=\""+index
								+ "\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#profilesAccordionViewer\" href=\"#collapse"
								+index+"\" >"+ sortedDatabyName[index-1].firstName + " " + sortedDatabyName[index-1].lastName 
								+ "</a></div> <div id=\"collapse"+index+"\" class=\"accordion-body collapse\" > <div class=\"accordion-inner\">"
								+ "<div class=\"profileName\">" + sortedDatabyName[index-1].firstName + " " 
								+ sortedDatabyName[index-1].lastName + "</div>"+"<img class=\"profileImg\" src=" + sortedDatabyName[index-1].picture 
								+ ">"+ sortedDatabyName[index-1].bio + "</div></div></div>";
		};
		var div = document.getElementById('profileTab');
		div.innerHTML = div.innerHTML + profileTabString;
		var div = document.getElementById('profileContent');
		div.innerHTML = div.innerHTML + profileTabContentString;
		var div = document.getElementById('profilesAccordionViewer');
		div.innerHTML = div.innerHTML + profileAccordionString;					
		//alert(profiles.getAllsortBy('initData Success'));
	},

	//Controller initialize the events handler for clicks
	initEventHandler: function() {
		var activeTab = 1;
		var activeAccordion =1;
		var minWidth = 760;
		var view = "";
		var lastAccordion=null;

		$('.accordion-toggle').on('click', function () {
		  	activeAccordion=$(this).attr('index');
		 	$(this).parent().css('opacity','0');
		 	$(this).parent().css('height','0');
		 	if(lastAccordion!=null){
			 	lastAccordion.parent().css('opacity','1.0');
			 	lastAccordion.parent().css('height','42');
		 	}
		 	lastAccordion=$(this);

		 	//$(this).click(false);
		 	var tabName="#tab"+activeAccordion.toString()+" a";
		 	var accordionName = "#accordion"+activeAccordion.toString();
		 	var profiles_controller = new ProfilesController();
			profiles_controller.setCookie("loadTab",tabName,7);
			profiles_controller.setCookie("loadAccordion",accordionName,7);
		  	//alert(accordionName);
			if(activeAccordion!=activeTab){				
				$(tabName).click();
				//alert(activeAccordion.toString());
			}	
		})

		$('.nav-tabs li').on('click', function () {
		  activeTab=$(this).attr('index');
		  //alert(activeTab);

		  var accordionName="#accordion"+activeTab.toString();
		  var tabName="#tab"+activeTab.toString()+" a";	
		  var profiles_controller = new ProfilesController();
		  profiles_controller.setCookie("loadTab",tabName,7);
		  profiles_controller.setCookie("loadAccordion",accordionName,7);

		  if(activeAccordion!=activeTab){			
				$(accordionName).trigger("click");
			}    
		})
    	$(this.loadTab).tab('show');
    	$('#profileTab a').click(function (e) {
		  e.preventDefault();
		  $(this).tab('show');
		});
    	$(this.loadAccordion).click();
    	//alert("initEventHandler Success");			
	},

	//Controller(Javascript) do the responsive instead of CSS, not used now, for future use
	switchView: function() {
		var minWidth = 760;
		var view = "";
		if ($(window).width() > minWidth) {
				if (view != "tabs") {
					view = "tabs";		
				}
			} else {		
				if (view != "accordion") { 
				    view = "accordion";  

				}
			}
		$(document).ready(switchView);
		$(window).resize(switchView);
	},

	setCookie: function(c_name,value,exdays){
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=c_name + "=" + c_value;
		//alert(document.cookie);		
	},

	getCookie: function(c_name) {
		var c_value=document.cookie;

		var c_start = c_value.indexOf(" " + c_name + "=");

		if (c_start == -1)
		  {
		  c_start = c_value.indexOf(c_name + "=");
		  }

		if (c_start == -1)
		  {
		  	c_value = null;
		  }else
		  {
		  	c_start = c_value.indexOf("=", c_start) + 1;
		  	var c_end = c_value.indexOf(";", c_start);
			  if (c_end == -1)
			    {
			    c_end = c_value.length;
			    }
			  c_value = unescape(c_value.substring(c_start,c_end));
		  }

		return c_value;
	},

	checkCookie:function(c_name){
		var c_value=this.getCookie(c_name);
		if(c_value!=null&&c_value!=""){
			return c_value
		}else if(c_name=="loadTab"){
			return "#tab1 a";
		}else if(c_name=="loadAccordion"){
			return "#accordion1";
		}
	}
};

var profiles_controller = new ProfilesController();

profiles_controller.index();

