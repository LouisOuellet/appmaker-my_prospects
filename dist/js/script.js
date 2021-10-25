API.Plugins.my_prospects = {
	element:{
		modal:{
			read:{},
		},
		table:{
			index:{},
		},
	},
	forms:{
		create:{
			0:"name",
			company_information:{
				0:"address",
				1:"city",
				2:"zipcode",
				3:"state",
				4:"country",
				5:"phone",
				6:"toll_free",
				7:"fax",
				8:"email",
				9:"website",
			},
		},
		update:{
			0:"name",
			1:"business_num",
			company_information:{
				0:"address",
				1:"city",
				2:"zipcode",
				3:"state",
				4:"country",
				5:"phone",
				6:"toll_free",
				7:"fax",
				8:"email",
				9:"website",
			},
		},
	},
	init:function(){
		API.GUI.Sidebar.Nav.add('my_prospects', 'main_navigation');
	},
	load:{
		index:function(){
			API.Builder.card($('#pagecontent'),{ title: 'my_prospects', icon: 'my_prospects'}, function(card){
				API.request('my_prospects','read',{data:{}},function(result) {
					var dataset = JSON.parse(result);
					if(dataset.success != undefined){
						for(const [key, value] of Object.entries(dataset.output.dom)){ API.Helper.set(API.Contents,['data','dom','my_prospects',value.name],value); }
						for(const [key, value] of Object.entries(dataset.output.raw)){ API.Helper.set(API.Contents,['data','raw','my_prospects',value.name],value); }
						API.Builder.table(card.children('.card-body'), dataset.output.dom, {
							headers:dataset.output.headers,
							id:'my_prospectsIndex',
							modal:true,
							key:'name',
							plugin:"organizations",
							import:{ key:'name', },
							clickable:{ enable:true, plugin:'organizations', view:'details'},
							set:{status:1,isActive:"true",isLead:"true"},
							controls:{
								toolbar:true,
								disable:['create'],
							}
						},function(response){
							API.Plugins.my_prospects.element.table.index = response.table;
						});
					}
				});
			});
		},
	},
	extend:{},
}

API.Plugins.my_prospects.init();
