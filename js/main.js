let elUsersList = document.querySelector('.users__list');
let elUsersTemplate = document.querySelector('.users__template').content;
let elPostsLlist = document.querySelector(".posts__list");
let elPostsTemplate = document.querySelector(".posts__template").content;
let elCommitsLlist = document.querySelector(".comments__list");
let elCommitsTemplate = document.querySelector(".comments__template").content;
const usersBox = [];

function renderUsers(array, node) {
	const userFragment = document.createDocumentFragment();
	
	array.forEach(element => {
		const newUsersTemplate = elUsersTemplate.cloneNode(true);
		usersBox.push(element.id);
		newUsersTemplate.querySelector('.item__id').textContent = element.id;
		newUsersTemplate.querySelector('.item__usersname').textContent = element.username;
		newUsersTemplate.querySelector('.item__name').textContent = element.name;
		newUsersTemplate.querySelector('.address__street').textContent = element.address.street;
		newUsersTemplate.querySelector('.address__suite').textContent = element.address.suite;
		newUsersTemplate.querySelector('.address__city').textContent = element.address.city;
		newUsersTemplate.querySelector('.address__zipcode').textContent = element.address.zipcode;
		newUsersTemplate.querySelector('.company__name').textContent = element.company.name;
		newUsersTemplate.querySelector('.company__catch').textContent = element.company.catchPhrase;
		newUsersTemplate.querySelector('.company__bs').textContent = element?.company.bs;
		newUsersTemplate.querySelector('.contacts__tel').textContent = `📱Phone: ${element?.phone}`;
		newUsersTemplate.querySelector('.contacts__tel').href = `tel:${element?.phone}`;
		newUsersTemplate.querySelector('.contacts__website').textContent = `Email: ${element?.website}`;
		newUsersTemplate.querySelector('.contacts__website').href = `mailto:${element?.website}`;
		
		newUsersTemplate.querySelector('.item__location').href = `http://www.google.com/maps/place/${element.address.geo.lat},${element.address.geo.lng}`;
		newUsersTemplate.querySelector('.item__emaile').textContent = `${element.email}`;
		newUsersTemplate.querySelector('.item__emaile').href = `moilto:${element.email}`;
		newUsersTemplate.querySelector('.users__item').dataset.id = element.id;
		userFragment.appendChild(newUsersTemplate);
	})
	
	node.appendChild(userFragment);
}

const renderPosts = function(array, node)  {
	node.innerHTML = "";
	const postsFragment = document.createDocumentFragment();
	
	array.forEach((ele) => {
		postsBox.push(ele.id);
		const newPostesTemplate = elPostsTemplate.cloneNode(true);
		newPostesTemplate.querySelector(".posts__userid").textContent = ele.userId;
		newPostesTemplate.querySelector(".posts__id").textContent = `id: ${ele.id}`;
		newPostesTemplate.querySelector(".posts__title").textContent = ele.title;
		newPostesTemplate.querySelector(".posts__text").textContent = ele.body;
		newPostesTemplate.querySelector(".posts__item").dataset.id = ele.id
		postsFragment.appendChild(newPostesTemplate);
	});
	node.appendChild(postsFragment);
};

const renderCommits = (array, elementbox) => {
	elementbox.innerHTML = "";
	const commitsFragment = document.createDocumentFragment();
	
	array.forEach((el) => {
		const newCommitsTemplate = elPostsTemplate.cloneNode(true);
		
		newCommitsTemplate.querySelector(".comments__postId").textContent = el.postId;
		newCommitsTemplate.querySelector(".comments__id").textContent = `id: ${el.id}`;
		newCommitsTemplate.querySelector(".comments__name").textContent = el.name;
		newCommitsTemplate.querySelector(".comments__email").href = `mailto:${el.email}`;
		newCommitsTemplate.querySelector(".comments__email").textContent = `Email: ${el.email}`;
		newCommitsTemplate.querySelector(".comments__text").textContent = el.body;
		
		commitsFragment.appendChild(newCommitsTemplate);
	})
	
	
	elementbox.appendChild(commitsFragment);
}

async function getUsers() {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
	const data = await response.json();
	renderUsers(data, elUsersList);
}

getUsers()

async function getPost(userId){
	const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
	const data = await response.json();
	renderPosts(data, elPostsLlist)
};

async function getComment(postId){
	const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
	const data = await response.json();
	renderCommits(data, elCommitsLlist);
};


const postsBox = [];

elUsersList.addEventListener("click", (evt) => {
	elCommitsLlist.innerHTML = "";
	if(evt.target.matches(".users__item")) {
		const userItemId = evt.target.dataset.id - 0;
		usersBox.forEach((userId) => {
			if(userItemId === userId){
				getPost(userId)
			}
		})
	}
	console.log(elPostsLlist);
});

elPostsLlist.addEventListener("click", (evt) => {
	
	if(evt.target.matches(".posts__item")) {
		const postItemId = evt.target.dataset.id - 0;
		postsBox.forEach((postId) => {
			if(postItemId === postId){
				getComment(postId)
			}
		});
	}
	console.log(elCommitsLlist);
});

