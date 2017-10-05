autoFill = Class.create();
autoFill.prototype = Object.extendsObject(AbstractAjaxProcessor, {
		fillValues: function () {
			var gr = new GlideRecord('TABLE_NAME_HERE');
			var obj = {};

			gr.addQuery('sys_id', this.getParameter('sysparm_new'));
			gr.query();
			while (gr.next()) {

				obj.group = String(gr.THING);

				var data = JSON.stringify(obj);
				return data;
			}
		}
	},
		type: 'autoFill'
});

function onChange(control, oldValue, newValue, isLoading, isTemplate) {
	if (isLoading || newValue === '') {
		return;
	}

	var gAjax = new GlideAjax('autoFill');
	gAjax.addParam('sysparm_name', 'fillValues');

	gAjax.addParam('sysparm_new', newValue);
	gAjax.getXML(xmlResponse);
	function xmlResponse(response) {
		var answer = response.responseXML.documentElement.getAttribute("answer");
		answer = JSON.parse(answer);
		console.log(answer);
		g_form.setValue('assignment_group', answer.group);
	}
}
