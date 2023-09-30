
export class TextUtil {

    static getOnlyNumbers(text: string): string {
        return text.replace(/\D/g, '')
    }
}