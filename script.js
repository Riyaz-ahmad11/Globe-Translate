let url = "https://api.mymemory.translated.net/get?q=i am fine&langpair=en-GB|hi-IN";

const selects = document.querySelectorAll('select');
const translateButton = document.querySelector('button');
let textarea = document.querySelectorAll('textarea');
const textArea1 = textarea[0];
const textArea2 =  textarea[1];
const controls = document.querySelector('.controls');

function addLangOptions(){

    selects.forEach(selectTag => {
        for(let countryCode in countryLangList ){

            let selected;
            if(countryCode==="hi-IN" && selectTag === selects[1]){
               selected="selected";
            }else if(countryCode==="en-GB" && selectTag === selects[0]){
                selected="selected";
            }
           let option = `<option value=${countryCode} ${selected}>${countryLangList[countryCode]}</option>`  
           selectTag.insertAdjacentHTML('beforeend',option);
        }
    });
}
addLangOptions();

translateButton.addEventListener('click' , ()=>{
   textArea2.value="";
   if(textArea1.value===""){
        alert("Please provide Valid Text in Text Box!");
        return;
    }
   
    let value = textArea1.value;
    let from = selects[0].value;
    let to = selects[1].value;

    url =`https://api.mymemory.translated.net/get?q=${value}&langpair=${from}|${to}`;
    

    textArea2.setAttribute('placeholder' , "Translating...");

    fetch(url)
    .then(response =>{
        if(!response.ok) throw new Error("slow Internet");
        textArea2.setAttribute('placeholder' , "Translate");
        return response.json();
    })
    .then(data =>{
        textArea2.value=data.responseData.translatedText;
    })
    .catch((error)=>{
        textArea2.setAttribute('placeholder' , "could'not translate");
        alert("There was some error in Translating Your text", error);
    })

});

function interChanageTextAndOption(){
    let value = textArea1.value;
    textArea1.value = textArea2.value;
    textArea2.value = value;
    
    let leftcode = selects[0].value;
    let rightode = selects[1].value;
   
    selects[0].value=rightode;
    selects[1].value=leftcode;
}
controls.addEventListener('click' , (event)=>{
   let targetElement  = event.target ;
   
   if(targetElement === document.querySelector('.arrow')) {
    interChanageTextAndOption();
   }
   
   else if(targetElement === document.querySelector('.copy1')){
      navigator.clipboard.writeText(textArea1.value);
   }

   else if(targetElement === document.querySelector('.copy2')){
      navigator.clipboard.writeText(textArea2.value);
   }
   
   else{
        //speaker
        let utterance;
        if(targetElement === document.querySelector('.speaker1')){
            utterance = new SpeechSynthesisUtterance(textArea1.value);
            utterance.lang=selects[0].value;
        } else if(targetElement === document.querySelector('.speaker2')) {
            utterance = new SpeechSynthesisUtterance(textArea2.value);
            utterance.lang=selects[1].value;
        }
        speechSynthesis.speak(utterance);
   }
   
   
});







