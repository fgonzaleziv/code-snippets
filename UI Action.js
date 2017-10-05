function openPreview() {
	//call script include to pull name information
	var ajax = new GlideAjax('glideListAJAX');
	ajax.addParam('sysparm_name', 'getNameList');
	ajax.addParam('sysparm_new', g_form.getValue('u_applications_affected'));
	ajax.getXML(function (resp) {
		//list of names
		var nameList = '';
		var name = resp.responseXML.documentElement.getAttribute("answer");
		name = JSON.parse(name);
		nameList = name.names.join(', ');
		
		var eventType = g_form.getValue('type') === 'planned';
		var statusTF = false;
		if (g_form.getValue('u_status_update'))
			statusTF = true;
		
		//create popup or ui page and push information to the modal
		var previewEmail = new GlideModal('event_email_preview', false, 'modal-lg');
		previewEmail.setPreference('sysparm_short_description', g_form.getValue('short_description'));
		previewEmail.setPreference('sysparm_additionalTF', g_form.getValue('u_additonal_instruction_prompt'));
		previewEmail.setPreference('sysparm_u_additional_instructions', g_form.getValue('u_additional_instructions'));
		previewEmail.setPreference('sysparm_u_status_update', g_form.getValue('u_status_update'));
		previewEmail.setPreference('sysparm_statusTF', statusTF);
		previewEmail.setPreference('sysparm_begin', g_form.getValue('begin'));
		previewEmail.setPreference('sysparm_end', g_form.getValue('end'));
		previewEmail.setPreference('sysparm_eventType', eventType);
		previewEmail.setPreference('sysparm_subjectTF', g_form.getValue('u_subject_confirmation'));
		previewEmail.setPreference('sysparm_previewSub', g_form.getValue('u_preview_subject_line'));
		previewEmail.setPreference('sysparm_manualSub', g_form.getValue('u_manual_subject_line'));
		previewEmail.setPreference('sysparm_u_applications_affected', nameList);
		previewEmail.setTitle('Email Preview');
		previewEmail.render();
		//logging
		//console.log('status: ' + statusTF);
		//console.log('add: ' + g_form.getValue('u_additonal_instruction_prompt'));
	});
}
