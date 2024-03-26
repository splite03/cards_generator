import type {App, DirectiveBinding} from "vue";

/**
 * Plugin Class
 */
export class Directives {
    /**
     * Создание директив
     * @param app - приложение Vue
     */
    static install(app: App<Element>){
        /**
         * Обработчики аутклика
         */
        let isOutclick: any = () => {};

        /**
         * Out-click
         */
        app.directive("outclick", {
            mounted(_node: HTMLElement, binding: DirectiveBinding<Function>) {

                /**
                 * Получение колбэка
                 */
                const {value: callback} = binding

                /**
                 * Функция для проверка
                 */
                isOutclick = (e: any) => {
                    /**
                     * Проверка, что клик был по элементу
                     */
                    if(e.composedPath().includes(_node)){
                        return;
                    }else{
                        callback()
                    }
                }

                /**
                 * Добавление слушателя
                 */
                window.addEventListener('click', isOutclick, {capture: true});

            },unmounted(){
                /**
                 * Удаление слушателя
                 */
                window.removeEventListener('click', isOutclick, {capture: true});
            }
        });

        /**
         * Textarea Autoheight
         */
        app.directive("autoheight", {
            mounted(el: HTMLTextAreaElement) {

                /**
                 * Проверка на ноду
                 */
                if(!el) return;

                /**
                 * Создаем экземпляр
                 */
                const p = document.createElement('p');

                /**
                 * El Styles
                 */
                const styles = getComputedStyle(el);

                /**
                 * Set Fonts Styles
                 */
                p.style.fontSize = styles.fontSize;
                p.style.fontWeight = styles.fontWeight;
                p.style.lineHeight = styles.lineHeight;
                p.style.fontFamily = styles.fontFamily;
                p.style.fontStyle = styles.fontStyle;
                p.style.fontStretch = styles.fontStretch;
                p.style.margin = styles.margin;
                p.style.padding = styles.padding;
                p.style.border = styles.border;
                p.style.outline = styles.outline;

                document.body.append(p);

                let lastLength = 0;

                /**
                 * On Input Callback
                 */
                const onInput = (e: any) => {

                    /**
                     * Установка текста
                     */
                    p.innerText = e.target.value

                    /**
                     * Current Value Length
                     */
                    const currentLength = e.target.value.length;

                    /**
                     * Высота текста
                     */
                    let textHeight: any;

                    if(e.inputType === 'insertLineBreak' || lastLength > currentLength){
                        textHeight = el.scrollHeight;
                    }else{
                        textHeight = p.offsetHeight;
                        console.log(textHeight);
                    }

                    /**
                     * Установка значения
                     */
                    el.style.height = `${textHeight > 42 ? textHeight : 42}px`;

                    lastLength = currentLength;
                };

                /**
                 * Добавление слушателей
                 */
                el.addEventListener("input", onInput);
            }
        })

        /**
         * Focus on Mount
         */
        app.directive("focus", {
            mounted(_node: HTMLInputElement){

                /**
                 * Устанавливаем фокус
                 */
                _node.focus();

            }, beforeUnmount(){}
        })
    }
}
