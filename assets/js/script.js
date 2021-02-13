/*document.addEventListener('DOMContentLoaded', (event) => {
    //VOTRE CODE... à utiliser pour savoir si
    console.log('Dom bien chargé')
  })*/

let listeEleves = [];/*liste des eleves, je l'utilise pour ajouter a chaque fois dans le champ du localstorage*/
let groupes=[]; /*liste des groupes, que j'afficherai a la fin de la creation des groupes*/


if(localStorage.getItem('eleves')){
    let elevesLocal = localStorage.getItem('eleves');
    array_eleves = elevesLocal.split(',');
    for(eleve of array_eleves){
        document.querySelector("#listeEleves").innerHTML += "<li>"+eleve+"</li>";
    }
}


/* Ajoute les noms dans la liste Eleves*/
document.querySelector('#envoyer').addEventListener('click', function(){
   
    listeEleves.push(document.querySelector('.name').value);//enregistre dans la liste

    /* ajoute le nom dans la liste*/
    document.querySelector("#listeEleves").innerHTML += "<li>"+document.querySelector('.name').value+"</li>";
    
    
    localStorage.setItem('eleves',listeEleves);//enregistre dans le localstorage la liste eleves
   
    document.querySelector('.name').value="";//reinitialise le champ nom
});



/**creation des groupes */
document.querySelector("#creation").addEventListener('click', function(){
    /*il faudra factoriser le code avec des functions*/

    
    let nb= parseInt(document.querySelector("#tailleGroupe").value); /** je reçois la taille du groupe */

    let eleves = localStorage.getItem('eleves');// il return en un type string
    arrayEleves = eleves.split(','); //je cree un tableaux des noms

    /*copie de l'array original */
    copieArrayEleves = [...arrayEleves];
    console.log(arrayEleves);
    
    let taille = arrayEleves.length;
        
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
