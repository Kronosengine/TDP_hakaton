import { Programm } from "./Program.js";
import { Creater } from "./Creater.js";
import { SemanticSearch } from "./Finder.js";

class Main {
    constructor() {
        this.search = null;
    }
    
    MainLoad = async () => {
        const response = await fetch(`http://85.239.37.235:5500/api/educational_programs/full`);
        const data = await response.json();
        Programm.data = data;
        this.CreateCont();
        this.initSearch();
    }
    
    initSearch() {
        if (this.search) {
            this.search.updateContainer('programContainer');
        } else {
            this.search = new SemanticSearch('programContainer', 'searchInput');
        }
    }
    
    GetFilter = async () => {
        try {
            const cat = [];
            const container = document.getElementsByClassName("Subjects")[0];
            if (container) {
                container.querySelectorAll("input").forEach(cb => {
                    if (cb.checked == true) {
                        cat.push(cb.value);
                    }
                });
            }
            const form = document.getElementById("form")?.value || "любая";
            let url = `http://85.239.37.235:5500/api/educational_programs/filter?`;
            if (cat.length > 0) {
                url += `subjects=${encodeURIComponent(cat.join(','))}`;
            }
            if (form && form !== "любая") {
                if (cat.length > 0) url += `&`;
                url += `form=${encodeURIComponent(form)}`;
            }
            
            const response = await fetch(url);
            const data = await response.json();
            Programm.data = data;
            
            this.ClearContainer();
            this.CreateCont();
            this.initSearch();
        } catch (error) {
            console.error("Ошибка в GetFilter:", error);
        }
    }
    
    ClearContainer = () => {
        const container = document.getElementById('programContainer');
        if (container) {
            container.innerHTML = '';
        }
    }
    
    CreateSub = async () => {
        const response = await fetch("./Data/subj.json");
        const jsonData = await response.json();
        Programm.Subj = jsonData;
        
        const MainContainer = document.getElementsByClassName("Subjects")[0];
        if (!MainContainer) {
            console.error("Контейнер Subjects не найден");
            return;
        }
        
        MainContainer.innerHTML = '';
        
        for (let i = 0; i < Programm.Subj.length; i++) {
            const container = Creater.CreateContainer("SubCont", `SubCont${i}`);
            const input = Creater.CreateInput("checkbox");
            const label = Creater.CreateP(Programm.Subj[i]);
            
            input.checked = true;
            input.value = Programm.Subj[i];
            input.id = `subj_${i}`;
            
            container.appendChild(input);
            container.appendChild(label);
            MainContainer.appendChild(container);
        }
    }
    
    CreateMainList = () => {
        const container = document.getElementById('programContainer');
        if (!container) return;
        
        container.innerHTML = '';
        
        for (let i = 0; i < Programm.data.length; i++) {
            const item = document.createElement('div');
            item.className = 'program-item';
            item.setAttribute('data-index', i);
            item.innerHTML = `
                <div class="program-header">
                    <span style="font-weight: bold;" class="head"></span>
                    <span class="arrow">▼</span>
                </div>
                <div class="program-content">
                    <div class="inner-text"></div>
                </div>
            `;
            
            const header = item.querySelector('.program-header');
            header.addEventListener('click', (e) => {
                e.stopPropagation();
                item.classList.toggle('active');
            });
            container.appendChild(item);
        }
    }
    
    CreateCont = () => {
        if (!Programm.data?.length) {
            const container = document.getElementById('programContainer');
            if (container) {
                container.innerHTML = '<p style="text-align:center; padding:20px;">Нет программ, соответствующих фильтрам</p>';
            }
            return;
        }
        
        this.CreateMainList();
        
        const fields = [
            { name: "curriculum_link", label: "Ссылка на учебный план" },
            { name: "annotations_link", label: "Аннотации" },
            { name: "academic_calendar_link", label: "Календарь" },
            { name: "methodical_docs_link", label: "Методические документы" },
            { name: "practice_programs_link", label: "Практика" }
        ];

        Programm.data.forEach((spec, i) => {
            const head = document.getElementsByClassName("head")[i];
            if (head) {
                head.innerHTML = '';
                const code = spec["code"] || '';
                const name = spec["name"] || '';
                head.appendChild(Creater.CreateP(code));
                head.appendChild(Creater.CreateP(name));
            }
            
            const Main = document.getElementsByClassName("inner-text")[i];
            if (!Main) return;
            
            Main.innerHTML = '';
            
            fields.forEach(field => {
                const value = spec[field.name];
                if (!value || value === "") return;
                
                const fieldContainer = document.createElement("div");
                fieldContainer.className = 'field-container';
                fieldContainer.style.marginBottom = "15px";
                
                const label = document.createElement("strong");
                label.textContent = `${field.label}: `;
                label.style.display = "block";
                label.style.marginBottom = "5px";
                fieldContainer.appendChild(label);
                
                let htmlText = value.replace(
                    /(https?:\/\/[^\s]+)/g,
                    '<a href="$1" target="_blank" style="color:#0066cc; text-decoration:underline;">$1</a>'
                );
                htmlText = htmlText.replace(/\r?\n/g, '<br>');
                
                const contentDiv = document.createElement("div");
                contentDiv.innerHTML = htmlText;
                fieldContainer.appendChild(contentDiv);
                
                Main.appendChild(fieldContainer);
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    const load = new Main();
    await load.CreateSub();
    await load.MainLoad();
    
    const applyBtn = document.getElementsByClassName("apply-btn")[0];
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            load.GetFilter();
        });
    }
});