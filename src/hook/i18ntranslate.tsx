import { Language } from "../global-interface";
import en from "../locale/en";
import es from "../locale/es";
import { useLocalStorage } from "./localStorage";


export class I18n {
    static _instance: I18n;

    language = {
        es: es,
        en: en
    }

    translate: any;

    constructor() {}

    public static get instance(): I18n {
        if (!I18n._instance) {
            I18n._instance = new I18n();
        }
        return I18n._instance;
    }

    changeLanguage(language: Language) {
        this.translate = language.code === 'es' ? this.language.es : this.language.en
    }
}

function setDefaultLanguage() {
    const [language] = useLocalStorage<Language>('language',{code:'es'})
    I18n._instance.changeLanguage(language)
}

export function useI18n(path: string, replace? : string[]) {
    const keys = path.split('.')
    let value = I18n.instance.translate
    
    if (value === undefined) {
        setDefaultLanguage()
        value = I18n.instance.translate
    }

    keys.forEach((key) => {
        if (value[key] !== undefined) {
            value = value[key]
        }
    })

    if (replace) {
        replace.forEach((replacer, index) => {
            value = value.replace('$'+(index+1), replacer)
        })
    }
    return value
}