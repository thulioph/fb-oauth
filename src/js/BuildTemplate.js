const Handlebars = window.Handlebars;

const BuildTemplate = (templateId, templateData, element) => {
	let template = Handlebars.compile(templateId);
	element.innerHTML = template(templateData);
};

export default BuildTemplate;