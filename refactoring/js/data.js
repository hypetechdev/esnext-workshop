import Movie from './movie.js'

const data = {
    movies: [],
    totalMoviesLength: 0,
}

function calculateTotalLength() {
    const reduceTotal = (prev, currentMovie) => {
        return prev + currentMovie.length
    }

    const total = data.movies.reduce(reduceTotal, 0)

    // Set our new total to our data object
    data.totalMoviesLength = total
}

// Functions to be exported to public
export function addMovie(...movieObj) {
    console.log(`movieObj`, movieObj)
    const [title, length, genre] = movieObj
    const movie = new Movie(title, parseFloat(length), genre)

    data.movies.push(movie)

    return movie
}

export function getTotalLength() {
    // calculate total data before returning
    calculateTotalLength()

    return data.totalMoviesLength
}

// This is only for TEST
function logData() {
    console.log(data)
}

// export { addMovie, getTotalLength }
