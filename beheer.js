const peopleStorageKey="foto-naam-personen";
const defaultPeople=[{name:"Amina",photo:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1400&q=80"},{name:"Noah",photo:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1400&q=80"},{name:"Lina",photo:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=80"},{name:"Milan",photo:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1400&q=80"}];
const personForm=document.querySelector("#personForm");
const personName=document.querySelector("#personName");
const photoUrl=document.querySelector("#photoUrl");
const photoFile=document.querySelector("#photoFile");
const personList=document.querySelector("#personList");
const countLabel=document.querySelector("#countLabel");
const exportButton=document.querySelector("#exportButton");
const importFile=document.querySelector("#importFile");
const resetButton=document.querySelector("#resetButton");
const statusMessage=document.querySelector("#statusMessage");
let people=loadPeople();
function loadPeople(){const saved=localStorage.getItem(peopleStorageKey);if(!saved)return defaultPeople;try{const parsed=JSON.parse(saved);if(Array.isArray(parsed))return parsed.filter(function(person){return person.name&&person.photo;});}catch{localStorage.removeItem(peopleStorageKey);}return defaultPeople;}
function savePeople(){localStorage.setItem(peopleStorageKey,JSON.stringify(people));}
function setStatus(message){statusMessage.textContent=message;}
function fileToDataUrl(file){return new Promise(function(resolve,reject){const reader=new FileReader();reader.addEventListener("load",function(){resolve(reader.result);});reader.addEventListener("error",function(){reject(reader.error);});reader.readAsDataURL(file);});}
function renderPeople(){countLabel.textContent=people.length+" "+(people.length===1?"persoon":"personen");personList.innerHTML="";if(people.length===0){personList.innerHTML='<p class="helper-text">Nog geen personen toegevoegd.</p>';return;}people.forEach(function(person,index){const card=document.createElement("article");card.className="person-card";const image=document.createElement("img");image.src=person.photo;image.alt="Foto van "+person.name;const text=document.createElement("div");const name=document.createElement("strong");name.textContent=person.name;const source=document.createElement("span");source.textContent=person.photo.startsWith("data:")?"Foto opgeslagen in browser":"Foto via link";text.append(name,source);const remove=document.createElement("button");remove.className="icon-button";remove.type="button";remove.textContent="Verwijder";remove.addEventListener("click",function(){people.splice(index,1);savePeople();renderPeople();setStatus(person.name+" verwijderd.");});card.append(image,text,remove);personList.append(card);});}
personForm.addEventListener("submit",async function(event){event.preventDefault();const name=personName.value.trim();const selectedFile=photoFile.files[0];let photo=photoUrl.value.trim();if(!photo&&selectedFile)photo=await fileToDataUrl(selectedFile);if(!name||!photo){setStatus("Vul een naam in en kies een foto of foto URL.");return;}people.push({name:name,photo:photo});savePeople();personForm.reset();renderPeople();setStatus(name+" toegevoegd.");});
exportButton.addEventListener("click",function(){const data=JSON.stringify(people,null,2);const blob=new Blob([data],{type:"application/json"});const url=URL.createObjectURL(blob);const link=document.createElement("a");link.href=url;link.download="foto-naam-personen.json";link.click();URL.revokeObjectURL(url);setStatus("Lijst geexporteerd als JSON-bestand.");});
importFile.addEventListener("change",async function(){const file=importFile.files[0];if(!file)return;try{const imported=JSON.parse(await file.text());if(!Array.isArray(imported))throw new Error("Geen lijst");people=imported.filter(function(person){return person.name&&person.photo;});savePeople();renderPeople();setStatus("Lijst geimporteerd.");}catch{setStatus("Importeren lukte niet. Kies een geldig JSON-bestand.");}finally{importFile.value="";}});
resetButton.addEventListener("click",function(){if(!confirm("Weet je zeker dat je alle personen wilt wissen?"))return;people=[];savePeople();renderPeople();setStatus("Alle personen zijn gewist.");});
renderPeople();
