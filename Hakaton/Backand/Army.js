import { Creater } from "./Creater.js";
import { Programm } from "./Program.js";

class Army {
    CreateInfo = async () => {
        const InfoCont = document.getElementsByClassName("Info-Block")[0];
        const response = await fetch("./Data/voenka.json");
        const jsonData = await response.json();
        Programm.Arm = jsonData.blocks;
        jsonData.blocks.forEach(block => {
            const blockDiv = Creater.CreateContainer("info-block", null);
            const title = Creater.CreateH1(block.title);
            
            blockDiv.appendChild(title);
            
            if (block.list) {
                blockDiv.appendChild(Creater.CreateUl(block.list));
            }
            if (block.link) {
                blockDiv.appendChild(Creater.CreateA(block.name || "Ссылка", block.link));
            }
            if (block.description) {
                blockDiv.appendChild(Creater.CreateP(block.description));
            }
            if (block.note) {
                blockDiv.appendChild(Creater.CreateP(block.note));
            }
            if (block.items && Array.isArray(block.items)) {
                block.items.forEach(item => {
                    if (item.link || item.pdf) {
                        const link = Creater.CreateA(item.name, item.link || item.pdf);
                        link.target = "_blank";
                        blockDiv.appendChild(link);
                        blockDiv.appendChild(Creater.CreateBr());
                    }
                });
            }
            if (block.items && typeof block.items === 'object' && !Array.isArray(block.items)) {
                Object.entries(block.items).forEach(([key, value]) => {
                    blockDiv.appendChild(Creater.CreateP(`<strong>${key}:</strong> ${value}`));
                });
            }
            
            InfoCont.appendChild(blockDiv);
        });
    }
    CreatePrepod = async () => {
        const InfoCont = document.getElementsByClassName("Info-Block")[0];
        const response = await fetch(`http://85.239.37.235:5500/api/vuc_staff/full`);
        const data = await response.json();
        console.log(data);
        Programm.ArmPrepod = data;
        const DirCont = Creater.CreateContainer("dir-cont", null);
        const OtherCont = Creater.CreateContainer("other-cont", null);
        Programm.ArmPrepod.forEach(element => {
            const PeopleCont = Creater.CreateContainer("people-cont", null)
            if (element.is_leadership == 1) {
                PeopleCont.appendChild(Creater.CreateH3(element.full_name));
                PeopleCont.appendChild(Creater.CreateP(element.position));
                PeopleCont.appendChild(Creater.CreateP(element.military_rank));
                DirCont.appendChild(PeopleCont);
            }
            else {
                PeopleCont.appendChild(Creater.CreateH3(element.full_name));
                PeopleCont.appendChild(Creater.CreateP(element.position));
                PeopleCont.appendChild(Creater.CreateP(element.military_rank));
                PeopleCont.appendChild(Creater.CreateP(element.department));
                OtherCont.appendChild(PeopleCont);
            }
            InfoCont.appendChild(PeopleCont);
        })
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    const arm = new Army();
    await arm.CreatePrepod();  
    await arm.CreateInfo();
});