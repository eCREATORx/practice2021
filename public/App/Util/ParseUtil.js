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