

class TemplateProcessor{
    replaceValues(template, values){
        for (const key in values){
            template = template.replaceAll(`{{${key}}}`, values[key])
        }
        return template;
    }
}

export default new TemplateProcessor();