const defaultPeople=[{name:"Amina",photo:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1400&q=80"},{name:"Noah",photo:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1400&q=80"},{name:"Lina",photo:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=80"},{name:"Milan",photo:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1400&q=80"}];
const peopleStorageKey="foto-naam-personen";
const startScreen=document.querySelector("#startScreen");
const emptyScreen=document.querySelector("#emptyScreen");
const quizScreen=document.querySelector("#quizScreen");
const presenterForm=document.querySelector("#presenterForm");
const presenterNameInput=document.querySelector("#presenterName");
const presenterLabel=document.querySelector("#presenterLabel");
const restartButton=document.querySelector("#restartButton");
const stage=document.querySelector("#stage");
const personPhoto=document.querySelector("#personPhoto");
const namePlate=document.querySelector("#namePlate");
const nextButton=document.querySelector("#nextButton");
const progressLabel=document.querySelector("#progressLabel");
let people=loadPeople();
let presenterName="";
let order=[];
let currentIndex=0;
let step=0;
function loadPeople(){const saved=localStorage.getItem(peopleStorageKey);if(!saved)return defaultPeople;try{const parsed=JSON.parse(saved);if(Array.isArray(parsed))return parsed.filter(function(person){return person.name&&person.photo;});}catch{localStorage.removeItem(peopleStorageKey);}return defaultPeople;}
function shuffle(items){const result=[...items];for(let index=result.length-1;index>0;index-=1){const randomIndex=Math.floor(Math.random()*(index+1));[result[index],result[randomIndex]]=[result[randomIndex],result[index]];}return result;}
function storageKey(name){return "foto-naam-volgorde:"+name.trim().toLowerCase()+":"+people.length;}
function createFreshOrder(name){const freshOrder=shuffle(people.map(function(_,index){return index;}));localStorage.setItem(storageKey(name),JSON.stringify(freshOrder));return freshOrder;}
function loadOrderForPresenter(name){const key=storageKey(name);const saved=localStorage.getItem(key);if(saved){try{const parsed=JSON.parse(saved);if(Array.isArray(parsed)&&parsed.length===people.length)return parsed;}catch{localStorage.removeItem(key);}}return createFreshOrder(name);}
function renderCurrentPerson(){const person=people[order[currentIndex]];personPhoto.src=person.photo;personPhoto.alt="Foto van "+person.name;namePlate.textContent=person.name;namePlate.classList.remove("is-hidden");nextButton.hidden=true;progressLabel.textContent=(currentIndex+1)+" van "+people.length;step=0;}
function startPresentation(name){people=loadPeople();if(people.length===0){startScreen.hidden=true;emptyScreen.hidden=false;return;}presenterName=name.trim();order=loadOrderForPresenter(presenterName);currentIndex=0;presenterLabel.textContent=presenterName;startScreen.hidden=true;emptyScreen.hidden=true;quizScreen.hidden=false;renderCurrentPerson();}
function advanceStep(){if(step===0){namePlate.classList.add("is-hidden");nextButton.hidden=true;step=1;return;}if(step===1){namePlate.classList.remove("is-hidden");nextButton.hidden=false;step=2;}}
function goToNextPerson(){currentIndex+=1;if(currentIndex>=order.length){order=createFreshOrder(presenterName);currentIndex=0;}renderCurrentPerson();}
presenterForm.addEventListener("submit",function(event){event.preventDefault();startPresentation(presenterNameInput.value);});
stage.addEventListener("click",advanceStep);
nextButton.addEventListener("click",function(event){event.stopPropagation();goToNextPerson();});
restartButton.addEventListener("click",function(){quizScreen.hidden=true;startScreen.hidden=false;presenterNameInput.focus();});
document.addEventListener("keydown",function(event){if(quizScreen.hidden||event.key!==" ")return;event.preventDefault();if(step===2)goToNextPerson();else advanceStep();});
