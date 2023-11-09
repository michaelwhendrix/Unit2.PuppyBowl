const baseURL = `https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-FT-SF`;


const state = {
    allPuppies: []
};

const main = document.querySelector('main');
main.setAttribute('style', 'display:flex; flex-direction:row; flex-wrap:wrap');

const getAllPuppies = async () => {
    const response = await fetch(`${baseURL}/players`);
    const jsonresponse = await response.json();
    state.allPuppies = jsonresponse.data;
    console.log(state.allPuppies);
}

getAllPuppies();