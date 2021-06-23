/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) { 
   let startIndex = ( page * 9 ) - 9;
   let endIndex = page * 9;
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';
   
   for (let i = 0; i < list.length; i++){
      if ( i >= startIndex && i < endIndex){
         const studentAvatar = list[i].picture.large;
         const studentName = `${list[i].name.first} ${list[i].name.last}`;
         const studentEmail = list[i].email;
         const studentRegistration = list[i].registered.date;
         let studentItem =`
            <li class="student-item cf">
               <div class="student-details">
               <img class="avatar" src="${studentAvatar}" alt="Profile Picture">
               <h3>${studentName}</h3>
               <span class="email">${studentEmail}</span>
               </div>
               <div class="joined-details">
               <span class="date">${studentRegistration}</span>
               </div>
            </li>
         `;
         studentList.insertAdjacentHTML("beforeend", studentItem);
      }
   }
 }
/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   const numOfPages = Math.ceil(list.length / 9);
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML ='';
   for (i=1; i<=numOfPages; i++) {
      let button = `
         <li>
         <button type="button">${i}</button>
         </li>
      `;
      linkList.insertAdjacentHTML('beforeend', button);
   }
   const firstButtonActive = document.querySelector('li button');
   if (firstButtonActive) {
      firstButtonActive.className = 'active';
   };
   linkList.addEventListener ('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         const removeActiveClass = document.querySelector('.active');
         removeActiveClass.className = '';
         e.target.className = 'active';
         showPage(data, e.target.textContent);
      }
   });
}
/*
This function filters the search results and display them on the page.
*/
function searchName (searchInput, names) { 
   let filteredStudents = [];
   for (let i=0; i<names.length; i++){  
     let fullName = `${names[i].name.first} ${names[i].name.last}`;  
     if (searchInput.value.length !== 0 && fullName.toLowerCase().includes(searchInput.value.toLowerCase())) {
       filteredStudents.push(names[i]);
     } else if (searchInput.value.length === 0){
       filteredStudents = names;  
   }; 
   }
   showPage(filteredStudents, 1);
   addPagination(filteredStudents);  
 };
//Dynamically creates searchbar and add it to page
const header = document.querySelector('.header');
const searchBox = `
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
`;
header.insertAdjacentHTML('beforeend', searchBox);

//creates element for 'No results found' and add it to the page. 
const page = document.querySelector('.page');
const ul = document.querySelector('.student-list');
const noResultsElement = document.createElement('p');
noResultsElement.textContent = 'No results found. :(';
noResultsElement.className = 'no-results';
page.insertBefore(noResultsElement, ul);
noResultsElement.style.display = 'none';

// Declaration of the variables used for search listeners
const search = document.querySelector('#search');
const searchButton = document.querySelector('label button');

// Listener for the search box
search.addEventListener('keyup', (e) => {  
   searchName(search, data);
   ;
   //Display message to the page if no results are found.
   if (ul.children.length === 0) {
      noResultsElement.style.display = '';
      
   } else {
      noResultsElement.style.display = 'none';
   }
   
});
// Listener for the search button
searchButton.addEventListener('click', () => {
   searchName(search, data);
});

// Call functions
showPage(data, 1);
addPagination(data);
