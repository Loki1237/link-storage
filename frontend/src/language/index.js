import Texts from './texts';

export let language = new Texts("eng");

export function translate(lang) {
    switch (lang) {
        case "rus":
            language = new Texts("rus");
            localStorage.setItem("lang", "rus");
            break;

        case "eng":
            language = new Texts("eng");
            localStorage.setItem("lang", "eng");
            break;

        default:
            language = new Texts("eng");
            localStorage.setItem("lang", "eng");
            break;
    }
}
