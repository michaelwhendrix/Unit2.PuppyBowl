const baseURL = `https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-FT-SF`;


const state = {
    allPuppies: [],
    cards: [],
    singlePuppy: {},
    newPuppy: {}
};

const main = document.querySelector('main');
main.setAttribute('style', 'display:flex; flex-direction:row; flex-wrap:wrap');

try{
const getAllPuppies = async () => {
    const response = await fetch(`${baseURL}/players`);
    const jsonresponse = await response.json();
    state.allPuppies = jsonresponse.data.players;
    console.log(state.allPuppies);
    renderAllPuppies(state.allPuppies);
}


const getSinglePuppy = async (id) => {
    const response = await fetch(`${baseURL}/players/${id}`);
    const jsonresponse = await response.json();
    state.singlePuppy = jsonresponse.data.player;
    renderSinglePuppy(state.singlePuppy);
}

const addPuppy = async () => {
    state.newPuppy.name =  document.querySelector('#name');
    state.newPuppy.breed =  document.querySelector('#breed');
    state.newPuppy.status =  document.querySelector('#status');
    state.newPuppy.imageUrl =  document.querySelector('#imageUrl');
    console.log(state.newPuppy);

    const response = await fetch(`${baseURL}/players`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: state.newPuppy.name,
            breed: state.newPuppy.breed,
            status: state.newPuppy.status,
            imageUrl: state.newPuppy.imageUrl
        })
    }
    );
    const result = await response.json();
    console.log(result);
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

 const renderDetailCard = (puppy) => {
    return `
    <div style = "height:1000px; width:600px;
                    border:3px solid black;
                    margin:5px;
                    display:flex;
                    flex-direction:column;
                    justify-content:space-around;
                    align-items:center">
        <h2>${puppy.name}</h2>
        <img src = ${puppy.imageUrl} 
            style = "height: 500px; 
                    width: 400px"
            alt = "puppy image"/>
        <button id = "back-button">Back To All Puppies</button>
    </div>
`;
 }

 const renderForm = () => {
    return `
            <h1>Puppy Bowl Roster</h1>
            <h3>Add New Puppy</h3>
            <form>
                <label>Name</label>
                <input type= "text" id = "name"/>
                <label>Breed</label>
                <input type = "text" id = "breed"/>
                <label>Status</label>
                <input type= "text" id = "status"/>
                <label>Image URL</label>
                <input type = "url" id = "imageUrl"/>
                <button type = "submit" id = "form-button">Submit</button>
            </form>
    `

 }

 const renderAllPuppies = (puppies) => {
    for(let i = 0; i < puppies.length; i++){
        state.cards[i] = document.createElement('span');
        state.cards[i].innerHTML = renderCard(puppies[i]);
        main.appendChild(state.cards[i]);
    }

    for(let i = 0; i < puppies.length; i++){
        state.cards[i].addEventListener('click', () => {
            getSinglePuppy(puppies[i].id);
        })
    }


 }

 const renderSinglePuppy = (puppy) => {
    const detailCard = document.createElement('span');
    detailCard.innerHTML = renderDetailCard(puppy);
    main.replaceChildren(detailCard);

    const backButton = document.querySelector('#back-button');
    backButton.addEventListener('click',()=> {
        main.innerHTML = '';
        getAllPuppies();
    });
    

 }

 const renderHeader = () => {
    const header = document.querySelector('header');
    header.setAttribute('style', 'height:150px; border: 3px solid black');
    const form = document.createElement('form');
    form.innerHTML = renderForm();
    header.appendChild(form);
    const submitButton = document.querySelector('#form-button');
    submitButton.addEventListener('submit', (event) => {
    event.preventDefault();
    addPuppy();
} );

 }
 renderHeader();
getAllPuppies();
} catch(error){console.error(error);}
