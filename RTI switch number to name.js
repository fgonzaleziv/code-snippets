var survey = new GlideRecord('survey_response');
survey.addQuery('question.question_text', 'How would you rate the overall service you received from ITS on this ticket?');
survey.query();
while (survey.next()) {
	switch (String(survey.response)) {
	case '5':
		survey.response = 'Very Satisfied';
		survey.answer = 'Very Satisfied';
		break;
	case '4':
		survey.response = 'Satisfied';
		survey.answer = 'Satisfied';
		break;
	case '3':
		survey.response = 'Somewhat Satisfied';
		survey.answer = 'Somewhat Satisfied';
		break;
	case '2':
		survey.response = 'Somewhat Dissatisfied';
		survey.answer = 'Somewhat Dissatisfied';
		break;
	case '1':
		survey.response = 'Dissatisfied';
		survey.answer = 'Dissatisfied';
		break;

	}
	survey.update();
}
