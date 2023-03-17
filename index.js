let searchInput = document.getElementById('searchInput')
let searchButton = document.getElementById('searchButton')
let searchResults = document.getElementById('searchResults')

searchButton.addEventListener('click', search)
searchInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    search()
  }
})

function search() {
  if (searchInput.value.length < 3) {
    alert('Введите больше 3 символов!')
    return
  }

  let xhr = new XMLHttpRequest()
  xhr.open(
    'GET',
    'https://api.github.com/search/repositories?q=' + searchInput.value,
    true
  )
  xhr.send()
  xhr.onload = () => {
    let response = JSON.parse(xhr.response)
    if (response.total_count === 0) {
      searchResults.innerHTML = '<p>Ничего не найдено</p>'
    } else {
      searchResults.innerHTML = ''
      for (let i = 0; i < 10; i++) {
        let repoName = response.items[i].name
        let repoUrl = response.items[i].html_url
        let repoDescription = response.items[i].description
        let repoLanguage = response.items[i].language
        searchResults.innerHTML += `
                        <div class="result">
                            <h3><a href="${repoUrl}" target="_blank">${repoName}</a></h3>
                            <p><strong>Описание:</strong> ${repoDescription}</p>
                            <p><strong>Язык:</strong> ${repoLanguage}</p>
                        </div>
                    `
      }
    }
  }
}
