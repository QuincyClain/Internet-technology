document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();
    performSearch();
});


function performSearch() {
    var searchTerm = document.querySelector("#searchForm input").value.toLowerCase();

    var elementsToSearch = document.querySelectorAll("body *");

    var firstMatchedElement = null;

    elementsToSearch.forEach(function(element) {
        var text = element.innerText.toLowerCase();

        if (text.includes(searchTerm)) {
            var regex = new RegExp(searchTerm, "gi");
            element.innerHTML = element.innerHTML.replace(regex, "<mark>$&</mark>");

            if (!firstMatchedElement) {
                firstMatchedElement = element;
            }
        } else {
            element.innerHTML = element.innerHTML.replace(/<\/?mark>/g, ""); // Удалить тег <mark> из содержимого элемента, если не является первым найденным элементом
        }
    });

    if (firstMatchedElement) {
        firstMatchedElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }
}