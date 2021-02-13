/*document.addEventListener('DOMContentLoaded', (event) => {
    //VOTRE CODE... à utiliser pour savoir si
    console.log('Dom bien chargé')
  })*/

let listeEleves = [];/*liste des eleves, je l'utilise pour ajouter a chaque fois dans le champ du localstorage*/
let groupes=[]; /*liste des groupes, que j'afficherai a la fin de la creation des groupes*/



/* Ajoute les noms dans la liste Eleves*/
document.querySelector('#envoyer').addEventListener('click', function(){
   
    listeEleves.push(document.querySelector('.name').value);//enregistre dans la liste

    /* ajoute le nom dans la liste*/
    document.querySelector("#listeEleves").innerHTML += "<li>"+document.querySelector('.name').value+"</li>";
    
    
    localStorage.setItem('eleves',listeEleves);//enregistre dans le localstorage la liste eleves
   // console.log(localStorage.getItem('eleves'));

    document.querySelector('.name').value="";//reinitialise le champ nom
});



/**creation des groupes */
document.querySelector("#creation").addEventListener('click', function(){
    /*il faudra factoriser le code avec des functions*/

    /*****utilise le local storage *****/
    let nb= parseInt(document.querySelector("#tailleGroupe").value); /** je reçois la taille du groupe */

    let eleves = localStorage.getItem('eleves');// il return en un type string
    arrayEleves = eleves.split(','); //je cree un tableaux des noms
    console.log(arrayEleves);
    
    let taille = arrayEleves.length;
        
    /** mais je pourrai utiliser listeEleves */
    //il y a listeEleves comme variable avec le noms je peut l utiliser

    let sousGroupes=[];
    groupes.length=0;

    if(taille > 0){// pour savoir si il y a des eleves dans le local storage
                
        while(taille >0){
        
            //generation des groupes
            for(let i=0; i<nb; i++ ){ 
                /*console.log(i);*/
                
                //on choisie al hazar le nro d element
                let choix = Math.floor(Math.random() * taille);  
                
                
                //on cree le subgroupe
                sousGroupes.push(arrayEleves[choix]);

                //j enleve le element de la liste des eleves                
                arrayEleves.splice(choix, 1)
                
                taille -=1;//pour controler la sortie

                if(i== arrayEleves.length){
                    break;
                }

                
               
            }
            groupes.push(sousGroupes);
            
            sousGroupes=[];

        }
        
        console.log(groupes);        
        document.querySelector("div#groupes").textContent="";

        for(let x =0; x < groupes.length; x++){
         
            document.querySelector("div#groupes").innerHTML += "<h3>Groupe : "+(x+1) +"</h3> ";            


            document.querySelector("div#groupes").innerHTML += groupes[x].join(' - ');
                       
            document.querySelector("div#groupes").innerHTML +="<br>";

            localStorage.setItem('groupe'+x,groupes[x].join(' - ')); //je l utiliser apres

        }
        
       
    }
});

document.querySelector(".name").addEventListener('keydown', (e) => {
    if( e.keyCode == 13){
        document.querySelector("#envoyer").click();
    }
    
  });
