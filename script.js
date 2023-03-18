const APIURL = 'https://api.github.com/users/';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

//collecting username from API and passing it to card and repos functions
async function getUser(username) {
    const res = await fetch(APIURL + username);
    const resData = await res.json();

    createUserCard(resData);
    getRepos(username);
};

//fetching all repos and passing it to repoCard function 
async function getRepos(username){
    const res = await fetch(APIURL + username + '/repos');
    const resData = await res.json();

    addReposToCard(resData);
};

//creating the user card 
function createUserCard(user) {
    const cardHTML = `
        <div class = "card">
            <div>
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}"/>
            </div>

            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>

                <ul class="info">
                   <li>${user.followers}<strong>Followers</strong></li>
                   <li>${user.following}<strong>Following</strong></li>
                   <li>${user.public_repos}<strong>Repos</strong></li>
                </ul>

                <h4>Repos:</h4>
                <div id="repos"></div>
            </div>
        </div>
    `

    main.innerHTML = cardHTML;
};

//adding repos to card 
function addReposToCard(repos){
    const reposEl = document.getElementById('repos');
    
    // console.log(repos);
    //adding first ten sorted by starcount repos to card
    repos.sort((a,b) => b.stargazers_count - a.stargazers_count)
    .slice(0,10)
    .forEach((repo) => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repo');
        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;

        reposEl.appendChild(repoEl);
    });
};

//adding event listner to the form after collecting input value
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm){
        getUser(searchTerm);
        search.value = '';
    };
});



