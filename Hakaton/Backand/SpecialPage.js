import { Programm } from "./Program";
class Main {
    CalcEGE = async () => {
        const SubjectsOne = document.getElementsByClassName("Subject")[0];
        const SubjectsTwo = document.getElementsByClassName("Subject")[1];
        const SubjectThree = document.getElementsByClassName("Subject")[2];
        const SubjectPointOne = document.getElementsByClassName("Subjects-point")[0];
        const SubjectPointTwo = document.getElementsByClassName("Subjects-point")[1];
        const SubjectPointThree = document.getElementsByClassName("Subjects-point")[2];

        
        let summ = Number(SubjectPointOne.value) + Number(SubjectPointTwo.value) + Number(SubjectPointThree.value);
        const SubjectsForBD = [SubjectsOne.value, SubjectsTwo.value, SubjectThree.value];
        
        const response = await fetch(`http://85.239.37.235:5500/api/educational_programs?points=${summ}&subjects=${SubjectsForBD.join(',')}`);
        const data = await response.json();
        
        
        console.log(data);
    }
    
}