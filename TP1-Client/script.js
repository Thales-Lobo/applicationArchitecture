/*VARIABLES*/
let msgs = [
    { "msg" : "Hello World!" },
    { "msg" : "Blah Blah" },
    { "msg" : "I love cats" },
  ];
  
  /*FONCTIONS*/
  //mettre à jour la liste des messages 'msgList' dans la page
  function update(msgs){
    const list = document.querySelector("#msgList");
  
    //efface la liste 'msgList'
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
  
    //recrée la liste avec la taille de la liste interne 'msgs'
    for (let i = 0; i < msgs.length; i++) {
      const item = document.createElement("li");
      item.textContent = msgs[i]["msg"];
      list.appendChild(item);
    }
  }
  
  /*EVENTS*/
  //associe le bouton 'updateButton' avec la fonction 'update'
  const updateButton = document.querySelector('#updateButton');
  
  updateButton.addEventListener('click', function() {
    update(msgs);
  });
  
  //cacher le 'placeholder' de la balise 'textArea' lorsque celle-la est sélectionnée
  const textArea = document.querySelector('#textArea');
  const defaultMsg = 'Insérez ici votre nouveau message...';
  textArea.placeholder = defaultMsg;
  
  textArea.addEventListener('focus', function() {
    textArea.placeholder = '';
  });
  
  textArea.addEventListener('blur', function() {
    textArea.placeholder = defaultMsg;
  });
  
  
  /*TEST FUNCTIONS*/
  
  /*
  
  function fact(n) {
   if(n <= 1){
     return 1;
   } 
    else{
      return n*fact(n-1);
    } 
  }
  
  function applique(f,tab){
    let result = [];
    
    for (let i = 0; i < tab.length; i++){
      result.push(f(tab[i]));
    }
    return result;
  }
  
  //console.log(fact(6));
  //console.log(applique(fact,[1,2,3,4,5,6]));
  //console.log(applique(function(n){ return (n+1); }, [1,2,3,4,5,6]));
  
  */
  
  