const baseURL = `https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-FT-SF`;


const state = {
    allPuppies: [],
    cards: []
};

const main = document.querySelector('main');
main.setAttribute('style', 'display:flex; flex-direction:row; flex-wrap:wrap');


const getAllPuppies = async () => {
    const response = await fetch(`${baseURL}/players`);
    const jsonresponse = await response.json();
    state.allPuppies = jsonresponse.data.players;
    console.log(state.allPuppies);
    renderAllPuppies(state.allPuppies);
}


 const renderCard = (puppy) => {
    return `
            <div style = "height:500px; width:300px;
                            border:3px solid black;
                            margin:5px;
                            display:flex;
                            flex-direction:column;
                            justify-content:space-around;
                            align-items:center">
                <h2>${puppy.name}</h2>
                <img src = ${puppy.imageUrl} 
                    style = "height: 250px; 
                            width: 200px"
                    alt = "puppy image"/>
            </div>
    `
 }

 const renderAllPuppies = (puppies) => {
    for(let i = 0; i < puppies.length; i++){
        state.cards[i] = document.createElement('span');
        state.cards[i].innerHTML = renderCard(puppies[i]);
        main.appendChild(state.cards[i]);
    }


 }
getAllPuppies();