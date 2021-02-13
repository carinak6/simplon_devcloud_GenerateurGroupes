let groupes=[]; /*liste des groupes, que j'afficherai a la fin de la creation des groupes*/
var array_eleves=[];/*liste des eleves, je l'utilise pour ajouter a chaque fois dans le champ du localstorage*/

if(localStorage.getItem('eleves')){
    let elevesLocal = localStorage.getItem('eleves');
    array_eleves = elevesLocal.split(',');

    for(eleve of array_eleves){
        document.querySelector("#listeEleves").innerHTML += "<li>"+eleve+"<i class=\"far fa-minus-square\"></i></li>";
    }
}

//recupere toutes les <i>
let balisesI = document.querySelectorAll('i');

for(balise of balisesI){
    
    balise.addEventListener('click',(e)=>{       
            
            e.target.parentElement.remove();
    });
}


/* Ajoute les noms dans la liste Eleves*/
document.querySelector('#envoyer').addEventListener('click', function(){    

    array_eleves.push(document.querySelector('.name').value);

    /* ajoute le nom dans la liste*/
    document.querySelector("#listeEleves").innerHTML += "<li>"+document.querySelector('.name').value+"  <i class=\"far fa-minus-square\"></i></li>";
           
    localStorage.setItem('eleves',array_eleves);
   
    document.querySelector('.name').value="";//reinitialise le champ nom
});



/**creation des groupes */
document.querySelector("#creation").addEventListener('click', function(){
    /*TODO il faudra factoriser le code avec des functions*/
    
    let nb= parseInt(document.querySelector("#tailleGroupe").value); /** je reçois la taille du groupe */

    let liste_elevesLI= document.querySelectorAll('li');
    console.log(liste_elevesLI);
    
    array_eleves=[];//reinitialise, se modifie entre temps avec la supression
    for(une_li of liste_elevesLI){
            console.log(une_li.textContent);
            array_eleves.push(une_li.textContent);
    }
    localStorage.setItem('eleves',array_eleves);

    /*copie de l'array original */
    copieArrayEleves = [...array_eleves];
    console.log(array_eleves);
    
    let taille = array_eleves.length;
        
    let sousGroupes=[];
    groupes.length=0;

    if(taille > 0){// pour savoir si il y a des eleves dans le local storage

        //je fait un loop que creera un groupe pour chaque tour        
        while(taille > 0 ){
        
            //generation des groupes d'une taille nb
            for(let i=0; i<nb; i++ ){ 

                /*console.log(i);*/

                //on choisie al hazar le nro d element
                let choix = Math.floor(Math.random() * taille);                          
                
                //on cree le subgroupe
                sousGroupes.push(copieArrayEleves[choix]);

                //j enleve le element de la liste des eleves                
                copieArrayEleves.splice(choix, 1);               
                
                taille --;//pour controler la sortie
               
            }
            
            //on enregistre dans la liste des groupes
            groupes.push(sousGroupes);   
            sousGroupes=[];

            //on verifie pour pas faire un autre loop avec les derniers eleves qui restent dans la liste qui sont la meme taille ou plus ppt que la taille demandé
            if(nb >= (copieArrayEleves.length)){
                groupes.push(copieArrayEleves);
                taille = 0; //pour sortir de la boucle                
            }           

        }
        
        //console.log(groupes);        
        document.querySelector("div#groupes").textContent="";

        for(let x =0; x < groupes.length; x++){
         
            document.querySelector("div#groupes").innerHTML += "<h3>Groupe : "+(x+1) +"</h3> ";
            document.querySelector("div#groupes").innerHTML += groupes[x].join(' - ');                       
            document.querySelector("div#groupes").innerHTML +="<br>";            

        }
        
       
    }
});

document.querySelector(".name").addEventListener('keydown', (e) => {
    if( e.keyCode == 13){
        document.querySelector("#envoyer").click();
    }
    
  });
