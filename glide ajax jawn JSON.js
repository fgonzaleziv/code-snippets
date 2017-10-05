//Server-side script include
autoFill = Class.create();
autoFill.prototype = Object.extendsObject(AbstractAjaxProcessor, {
		fillValues: function () {
			//init
			var gr = new GlideRecord('TABLE_NAME_HERE');
			var obj = {};
			
			//query for sys_id
			gr.addQuery('sys_id', this.getParameter('sysparm_new'));
			gr.query();
			while (gr.next()) {
				//add "assignment group or something" to obj
				obj.group = String(gr.THING);
				//MAKE JSON and return string
				var data = JSON.stringify(obj); //JSON formatted string
				return data;
			}
		}
	},
		type: 'autoFill'
});



//client script (On Change)
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
	if (isLoading || newValue === '') {
		return;
	}
	//script include info
	var gAjax = new GlideAjax('autoFill');
	gAjax.addParam('sysparm_name', 'fillValues');
	//pull the new updated value
	gAjax.addParam('sysparm_new', newValue);
	gAjax.getXML(xmlResponse);
	function xmlResponse(response) {
		var answer = response.responseXML.documentElement.getAttribute("answer");
		answer = JSON.parse(answer); //JSON string back to an object
		console.log(answer); //log
		g_form.setValue('assignment_group', answer.group); //set value from ajax
	}
}
