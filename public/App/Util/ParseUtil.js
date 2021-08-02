export const initTemplateVars = template => {
    const templateVarsMatches = template.matchAll(/{(.*?)}/gim);
    const templateVarsMatchesArr = Array.from(templateVarsMatches);

    let templateVars = {};

    templateVarsMatchesArr.forEach( value => {
        const textWithoutBrackets = value[1];
        if (textWithoutBrackets !== "imageUrl")
        {
            templateVars = Object.assign(templateVars, {
                [textWithoutBrackets]: 'Your ' + textWithoutBrackets
            })
        }
        else
        {
            templateVars = Object.assign(templateVars, {
                [textWithoutBrackets]: ""
            })
        }
    })

    return templateVars;
}

export const parseHtml = (template, imageUrl, changedVars) => {
    const templateVarsMatches = template.matchAll(/{(.*?)}/gim);
    const templateVarsMatchesArr = Array.from(templateVarsMatches);
    const defaultVarsValues = initTemplateVars(template);

    templateVarsMatchesArr.forEach( value => {
        const fullText = value[0];
        const textWithoutBrackets = value[1];

        if (textWithoutBrackets === "imageUrl" && imageUrl)
        {
            template = template.replace(fullText, imageUrl)
        }
        else
        {
            template = template.replace(fullText, changedVars[textWithoutBrackets] ?? defaultVarsValues[textWithoutBrackets]);
        }
    });

    return template;
}