const searchInput = $('#searchCity');
const searchBtn = $('#submitBtn');

searchBtn.on('click', function(event) {
    event.preventDefault();
    let searchValue = searchInput.val();
    console.log(searchValue);
})