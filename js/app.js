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
            ('${singleCatagory.category_id}', '${singleCatagory.category_name}')">${singleCatagory.category_name}</a>
    `;
        categoriesContainer.appendChild(linkContainer);
    })
    

}

const fetchCategoryNews = (category_id, category_name) =>{
        const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
        fetch(url)
        .then(res => res.json())
        .then(data => showAllNews(data.data, category_name))
    }


const showAllNews = (data, category_name) =>{
    console.log(data, category_name)
    document.getElementById('news-count').innerText = data.length;
    document.getElementById('category-name').innerText = category_name;

    const newsContainer = document.getElementById('all-news');
    newsContainer.innerHTML = '';

    data.forEach(singleNews =>{
        const{_id, image_url, title, details, author, total_view} = singleNews;

        const card = document.createElement('div');
        card.classList.add('card', 'mb-3')
        card.innerHTML = `
        <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${image_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8 d-flex flex-column">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">
              ${details.slice(0, 200)}...
              </p>
            </div>
            <div class="card-footer border-0 bg-body d-flex justify-content-between">
                <div class="col-md-4 d-flex gap-2">
                    <img src="${author.img}" class="img-fluid rounded-circle" alt="..." height="40" width="40">
                    <div>
                    <p class="m-0 p-0">${author.name}</p>
                    <p class="m-0 p-0">${author.published_date}</p>
                    </div>
                </div>

                <div class="d-flex align-items-center">
                    <i class= "fas fa-eye"></i>
                    <p class="m-0 p-0">${total_view}</p>
                </div>

                <div>
                    <i class= "fas fa-star"></i>
                </div>

                <div>
                    <i class= "fas fa-arrow-right"></i>
                    <p class="m-0 p-0" onclick="fetchNewsDetail('${_id}')" data-bs-toggle="modal" data-bs-target="#exampleModal">Click Here</p>
                </div>
                
            </div>
          </div>
        </div>
      </div>
        `
        newsContainer.appendChild(card);
    });
};


const fetchNewsDetail = news_id =>{
    let url = `https://openapi.programming-hero.com/api/news/${news_id}`
    fetch(url)
        .then(res => res.json())
        .then(data => showNewDetail(data.data[0]))
}


const showNewDetail = newsDetail =>{
    // 
}



fetchCategories();