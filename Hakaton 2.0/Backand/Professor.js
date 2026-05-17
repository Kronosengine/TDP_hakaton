import { Creater } from "./Creater.js";
import { Programm } from "./Program.js";
class Proff {
    CreateFiltre = async () => {
        const FiltCont = document.getElementsByClassName("filter")[0];
        const response = await fetch("./Data/institut.json");
        const jsonData = await response.json();
        Programm.Prof = jsonData;
        FiltCont.innerHTML = '';
        
        for (let i = 0; i < Programm.Prof.length; i++) {
            const container = Creater.CreateContainer("ProfCont", `ProfCont${i}`);
            const input = Creater.CreateInput("checkbox");
            const label = Creater.CreateP(Programm.Prof[i]);
            
            input.checked = true;
            input.value = Programm.Prof[i];
            input.id = `prof_${i}`;
            
            container.appendChild(input);
            container.appendChild(label);
            FiltCont.appendChild(container);
        }
    }
    CreateOther = async () => {
        try {
            const cat = [];
            const container = document.getElementsByClassName("filter")[0];
            if (container) {
                container.querySelectorAll("input").forEach(cb => {
                    if (cb.checked == true) {
                        cat.push(cb.value);
                    }
                });
            }
            let url = `http://85.239.37.235:5500/api/university_staff/all`;
            
            // ✅ Добавлен знак вопроса
            if (cat.length > 0) {
                url += `?professors=${encodeURIComponent(cat.join(','))}`;
            }
            
            console.log("URL:", url); // Для проверки
            
            const response = await fetch(url);
            const data = await response.json();
            Programm.dataProf = data;
            console.log(data);
            this.CreateAll();
        } catch (error) {
            console.error("Ошибка в GetFilter:", error);
        }
    }
    CreateAll = () => {
        const Main = document.getElementsByClassName("men")[0];
        Main.innerHTML = '';
        const Dir = Creater.CreateContainer("dir-cont", null);
        const Other = Creater.CreateContainer("other-cont", null);
        Programm.dataProf.forEach(element => {
            const humen = Creater.CreateContainer("humen", null);
            humen.appendChild(Creater.CreateH3(element.full_name));
            humen.appendChild(Creater.CreateP(element.degree));
            humen.appendChild(Creater.CreateP(element.position));
            humen.appendChild(Creater.CreateP(element.institute_name));
            humen.appendChild(Creater.CreateP(element.department_name));
            if (element.is_manager == 1) {
                Dir.appendChild(humen);
            }
            else {
                Other.appendChild(humen);
            }
        })
        Main.appendChild(Dir);
        Main.appendChild(Other);
    }
}
document.addEventListener('DOMContentLoaded', async function() {
    const load = new Proff();
    await load.CreateFiltre();
    await load.CreateOther();
    const applyBtn = document.getElementsByClassName("filter-btn")[0];
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            load.CreateOther();
        });
    }
});