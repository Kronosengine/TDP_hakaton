import { Programm } from "./Program.js";
import { Creater } from "./Creater.js";
class Money {
    CreateData = async () => {
        const response = await fetch("./Data/stipendia.json");
        const jsonData = await response.json(); // парсим JSON
        
        Programm.Money = jsonData; // сохраняем как объект
        console.log(Programm.Money); // отобразится как объект
        this.CreatePage();
    }
    CreatePage = () => {
        for(const Element of Programm.Money) {
            const MainContainer = document.getElementsByClassName("MainContainer")[0];
            const Block = Creater.CreateContainer();
            const Name = Creater.CreateH1(Element.name);
            const Amount = Creater.CreateP(`Размер: ${Element.amount}`);
            const Regularity = Creater.CreateP(`Интервал выплат: ${Element.regularity}`);
            const Rule = Creater.CreateP(`Правила для получения: ${Element.sessionCriteria}`);
            Block.appendChild(Name);
            Block.appendChild(Amount);
            Block.appendChild(Regularity);
            Block.appendChild(Rule);
            MainContainer.appendChild(Block);
        }
    }
}
document.addEventListener('DOMContentLoaded', async function() {
    const money = new Money();
    money.CreateData();
})