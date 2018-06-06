export default class View {
    render(template, data, target) {
        const render = Handlebars.compile(template);
        const renderHTML = render(data);
        target.innerHTML = renderHTML;
    }
}