class Movie {
    constructor(title, length, genre) {
        this.title = title
        this.length = length
        this.genre = genre
    }

    // Private functions used within this module
    // Not exposed to the public
    getGenreAbbreviation(genreStr) {
        const firstIndex = 0
        const lastIndex = genreStr.length - 1
        const output = genreStr.charAt(firstIndex) + genreStr.charAt(lastIndex)
        return output.toUpperCase()
    }

    getInfo() {
        const genreAbb = this.getGenreAbbreviation(this.genre)
        return `${this.title}, duration: ${this.length}min, genre:${genreAbb}`
    }
}

export default Movie
