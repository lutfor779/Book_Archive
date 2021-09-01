 // search
const getData = () => {
    document.getElementById('search-result').textContent = '';
    document.getElementById('info').textContent = '';
    let search = document.getElementById('search-text');
    if (search.value == '') {
        document.getElementById('spinner').style.display = 'none';
        const div = document.createElement('div');
        div.classList.add('text-center', 'fs-1', 'text-primary');
        div.innerText = 'Write what you want to show.';
        document.getElementById('search-result').appendChild(div);
    }
    else {
        const url = `http://openlibrary.org/search.json?q=${search.value}`;
            fetch(url)
            .then(res => res.json())
                .then(data => displayResults(data));
        document.getElementById('spinner').style.display = 'block';
    }
    search.value = '';
}


// display results
const displayResults = results => {
    document.getElementById('spinner').style.display = 'none';
    let i = 0;
    if (results.numFound == 0) {
        document.getElementById('spinner').style.display = 'none';
        const div = document.createElement('div');
        div.classList.add('text-center', 'fs-1', 'fw-bold', 'text-danger');
        div.innerText = 'No results found!';
        document.getElementById('search-result').appendChild(div);
        document.getElementById('info').style.display = 'none';
    }

    else {
        results.docs.forEach(result => {
            const url = `https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg`;
            
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card h-100">
                    <img src="${result.cover_i ? url : ''}"
                        height = "350px"
                        class="card-img-top"
                           alt="No Image found">
                        <div class="card-body">
                            <h3 class="card-title">${result.title}</h3>
                            <p>${result.author_name ? result.author_name : ''}</p>
                            <p>${result.first_publish_year ? result.first_publish_year: ''}</p>
                        </div>
                </div>`;
            document.getElementById('search-result').appendChild(div);
            i++;        
        })
    }
    itemsFound(i, results);
}

// display Items found
const itemsFound = (items, total) => {
    const div = document.createElement('div');
    div.classList.add('text-center', 'fs-3', 'text-danger', 'border', 'border-danger', 'rounded-3', 'w-25', 'mx-auto');
    div.innerText = `${items} of ${total.numFound} results`;
    document.getElementById('info').appendChild(div);
}