const fetchCategories = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => showCategories(data.data))
}

const showCategories = data =>{
    // console.log(data)
    // Capture Categroies Container
    const categoriesContainer = document.getElementById('categories-container');
    data.news_category.forEach(singleCatagory =>{
        // <a class="nav-link" href="#">${singleCatagory?.category_name}</a>
        let linkContainer = document.createElement('p');
        linkContainer.innerHTML = `
            <a class="nav-link" href="#" onclick="fetchCategoryNews
            ('${singleCatagory.category_id}')">${singleCatagory?.category_name}</a>
    `;
        categoriesContainer.appendChild(linkContainer);
    })
    

}

const fetchCategoryNews = (category_id) =>{
        const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
        fetch(url)
        .then(res => res.json())
        .then(data => console.log(data))
    }

fetchCategories();