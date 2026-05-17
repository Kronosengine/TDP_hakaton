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
    static CreateH3 = (text) => {
        const h3 = document.createElement('h3');
        h3.textContent = text;
        return h3;
    }
    static CreateUl = (items) => {
        const ul = document.createElement('ul');
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
        });
        return ul;
    }
    static CreateA = (text, href) => {
        const a = document.createElement('a');
        a.textContent = text;
        a.href = href;
        return a;
    }
    static CreateBr = () => {
        return document.createElement("br");
    }
    static CreateP = (Content) => {
        const text = document.createElement("p");
        text.textContent = Content;
        return text;
    }
    static CreateInput = (InputType) => {
        const input = document.createElement("input");
        input.type = InputType;
        return input;
    }
}