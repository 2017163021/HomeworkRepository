let count = 0;
fetch('product.json')
.then(function(response){return response.json();})
.then(function(json){
    let products = json;
    initialize(products);
    })
.catch(function(err) {
    console.log('Fetch problem: ' + err.message);
})

function initialize(products){
    const category = document.querySelector('#category');
    const searchTerm = document.querySelector('#searchTerm');
    const searchBtn = document.querySelector('button');
    const main = document.querySelector('main');

    let lastCategory = category.value;
    let lastSearch = '';

    let categoryGroup;
    let finalGroup;
    
    finalGroup = products;
    scroll();

    window.onscroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight){
            scroll();
        }
    };
    categoryGroup = [];
    finalGroup = [];
    
    searchBtn.onclick = setcategory;

    function setcategory(e){
        e.preventDefault();

        categoryGroup = [];
        finalGroup = [];

        if (lastCategory == category.value && lastSearch == searchTerm.value.trim()){
            return;}

        else{
            lastCategory = category.value;
            lastSearch = searchTerm.value.trim();

            if (category.value == "All"){
                categoryGroup = products;
            }
            else{   
                for (let i = 0; i < products.length; i++){
                    if (category.value == products[i].type){
                        categoryGroup.push(products[i]);
                    }
                }
            }
        }
        setSearch();
    }
    
    function setSearch(){
        if (searchTerm.value.trim() == ''){
            finalGroup = categoryGroup;           
        }
        else{
            let st = searchTerm.value.trim();

            for (let x = 0; x < categoryGroup.length; x ++){
                if (st == categoryGroup[x].type){
                    finalGroup.push(categoryGroup[x]);
                }
            }
            for (let x = 0; x < categoryGroup.length; x++){
                if (st == categoryGroup[x].company){
                    finalGroup.push(categoryGroup[x]);
                }
            }  
            if (finalGroup.length == 0 && lastSearch != ''){
                window.alert("Please search in samsung/apple/phone/pad/watch!");
            }     
        }
        while(main.firstChild){
            main.removeChild(main.firstChild);
        }
        scroll();
    }

    function scroll(){
        if (finalGroup.length == 0 && lastSearch ==''){
            finalGroup = products;
        }
        console.log(finalGroup.length);
        while (count < finalGroup.length){
                update(count);
                count++;
        }
        count = 0;
       
    }
    
    function update(x){
        const section = document.createElement('section');
        const heading = document.createElement('h2');
        const img = document.createElement('img');


        img.setAttribute("id", finalGroup[x].image2);
        section.setAttribute("id", finalGroup[x].price);

        heading.textContent = finalGroup[x].name;
        img.src = finalGroup[x].image1;
        img.alt = finalGroup[x].name;

        main.appendChild(section);
        section.appendChild(heading);
        section.appendChild(img);
            
        img.onclick = function(e){
            const txt = document.createElement('p');
            txt.textContent = e.path[1].id + "won";
            e.target.setAttribute("src", e.target.id);
            e.path[1].appendChild(txt);
        };
        
    }
}