export class Creater {
    static CreateContainer = (ContClass, ContId) => {
        const container = document.createElement("div");
        Object.assign(container, {
            id: ContId,
            className: ContClass
        });
        return container;
    }
    static CreateH1 = (Content) => {
        const text = document.createElement("h1");
        text.textContent = Content;
        return text;
    }
    static CreateP = (Content) => {
        const text = document.createElement("p");
        text.textContent = Content;
        return text;
    }
}