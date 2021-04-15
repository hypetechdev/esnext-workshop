const dataController = (function () {
    const data = {
        movies: [],
        totalMoviesLength: 0,
    }

    // Movie constructor
    // function Movie(title, length, genre) {
    //     this.title = title
    //     this.length = length
    //     this.genre = genre
    // }

    // Movie.prototype.getInfo = function () {
    //     const genreAbb = getGenreAbbreviation(this.genre)
    //     return `${this.title}, duration: ${this.length}min, genre:${genreAbb}`
    // }
    class Movie {
        constructor(title, length, genre) {
            this.title = title
            this.length = length
            this.genre = genre
        }

        getInfo() {
            const genreAbb = getGenreAbbreviation(this.genre)
            return `${this.title}, duration: ${this.length}min, genre:${genreAbb}`
        }
    }

    // Private functions used within this module
    // Not exposed to the public
    const getGenreAbbreviation = (genreStr) => {
        const firstIndex = 0
        const lastIndex = genreStr.length - 1
        const output = genreStr.charAt(firstIndex) + genreStr.charAt(lastIndex)
        return output.toUpperCase()
    }

    function calculateTotalLength() {
        // let total = 0

        //// Iterate trough movies and calculate length
        // data.movies.forEach((currentMovie) => {
        //     total += currentMovie.length
        // })

        const reduceTotal = (prev, currentMovie) => {
            return prev + currentMovie.length
        }

        const total = data.movies.reduce(reduceTotal, 0)

        // Set our new total to our data object
        data.totalMoviesLength = total
    }

    // Functions to be exported to public
    function addMovie(...movieObj) {
        console.log(`movieObj`, movieObj)
        const [title, length, genre] = movieObj
        const movie = new Movie(title, parseFloat(length), genre)

        data.movies.push(movie)

        return movie
    }

    function getTotalLength() {
        // calculate total data before returning
        calculateTotalLength()

        return data.totalMoviesLength
    }

    // This is only for TEST
    function logData() {
        console.log(data)
    }

    return {
        addMovie,
        getTotalLength,
        // ONLY FOR TEST
        log: logData,
    }
})()

const UIController = (function () {
    const DOMStrings = {
        inputTitle: '.movie-title',
        inputLength: '.movie-length',
        selectGenre: '.genre-select',
        containerMovieList: '.movie-list ul',
        containerError: '.movie-error',
        buttonAddMovie: '.create-movie',
        formElement: 'form',
        containerTotalLength: '.total-length span',
    }

    function collectInput() {
        const titleElement = document.querySelector(DOMStrings.inputTitle)
        const lengthElement = document.querySelector(DOMStrings.inputLength)
        const genreSelectElement = document.querySelector(DOMStrings.selectGenre)
        const genreOptionElement =
            genreSelectElement.options[genreSelectElement.selectedIndex]

        const result = {
            title: titleElement.value,
            length: lengthElement.value,
            genre: genreOptionElement.value,
        }

        return result
    }

    function displayListItem(movie) {
        const listEl = document.querySelector(DOMStrings.containerMovieList)

        const htmlItem = `<li>${movie.getInfo()}</li>`

        listEl.insertAdjacentHTML('beforeend', htmlItem)
    }

    function clearFormInputs() {
        // Reset forma data
        document.querySelector(DOMStrings.formElement).reset()

        // Reset error if any
        document.querySelector(DOMStrings.containerError).textContent = ''

        // Set focus to title input
        document.querySelector(DOMStrings.inputTitle).focus()
    }

    function showError({ title, length, genre }) {
        const errorMsg = 'Unknown error!'

        // const { title, length, genre } = input

        if (!title) {
            errorMsg = 'Enter title!'
        } else if (!length) {
            errorMsg = 'Enter length!'
        } else if (!genre) {
            errorMsg = 'Select genre!'
        }

        document.querySelector(DOMStrings.containerError).textContent = errorMsg
    }

    function displayTotalLength(tLength) {
        // If length is not passed set default value
        tLength = tLength || '-'

        document.querySelector(DOMStrings.containerTotalLength).textContent = String(
            tLength
        )
    }

    function getDOMStrings() {
        return DOMStrings
    }

    return {
        getInput: collectInput,
        displayListItem,
        displayTotalLength,
        getDOMStrings,
        clearInputs: clearFormInputs,
        displayError: showError,
    }
})()

const mainController = (function (dataCtrl, UICtrl) {
    function setupEventListeners() {
        const DOM = UICtrl.getDOMStrings()

        // document.querySelector(DOM.buttonAddMovie).addEventListener('click', function () {
        //     ctrlAddMovieItem()
        // })
        document
            .querySelector(DOM.buttonAddMovie)
            .addEventListener('click', ctrlAddMovieItem)

        document.addEventListener('keydown', function (event) {
            if (event.keyCode === 13) {
                ctrlAddMovieItem()
            }
        })
    }

    function ctrlUpdateTotalLength() {
        // 1. Get calculated length
        const totalLength = dataCtrl.getTotalLength()

        // 2. Update the UI with new total length
        UICtrl.displayTotalLength(totalLength)
    }

    function ctrlAddMovieItem() {
        // 1. get form data (UI)
        const { title, length, genre } = UICtrl.getInput()
        // const { title, length, genre } = input

        // 1.1 Validate data validity
        if (!title || !length || !genre) {
            // throw new Error('Something bad happened');
            // alert("Error!")
            UICtrl.displayError({ genre, title, length })
            return
        }

        // 2. Add movie to list
        const movie = dataCtrl.addMovie(title, length, genre)
        // console.log(movie);

        // 3. Clear form inputs
        UICtrl.clearInputs()

        // 4. show list on UI
        UICtrl.displayListItem(movie)

        // 5. Update total length UI
        ctrlUpdateTotalLength()
    }

    return {
        init() {
            console.log('App has started')
            setupEventListeners()
        },
    }
})(dataController, UIController)

mainController.init()
