import raw from "./glove-wiki-gigaword-50-tsne-2.txt"

class WordVectors {
    constructor(){
        this.size = 0
        this.dim = 2
        this.vectors = {}
        this.words = []
    }

    getWordForVec = vec => {
        let closestWord = ""
        let closestDistance = Infinity
        this.words.forEach((word) =>{
            const wordVec = this.vectors[word]
            const dist = ((wordVec[0] - vec[0]) ** 2 + (wordVec[1] - vec[1]) ** 2) ** 0.5;
            if (dist < closestDistance) {
                closestDistance = dist
                closestWord = word
            }
        })
        return {
            word: closestWord,
            vec: this.getVecForWord(closestWord)
        }
    }

    getVecForWord = word => {
        return this.vectors[word] || undefined;
    }

    loadFile() {
        return new Promise((res, rej) => {
            fetch(raw)
                .then(r => r.text())
                .then(text => res(text))
                .catch(e => rej(e))
        })
    } 

    loadVectors = () => {
        return new Promise((res, rej) => {
            this.loadFile().then(text => {
                const lines = text.split("\n");
                const vectors = {}
                for (let i = 1; i < lines.length; i++) {
                    const [word, x, y] = lines[i].split(" ")
                    vectors[word] = [Number(x), Number(y)]
                    this.words.push(word)
                }
                const [size, dim] = lines[0].split(" ")
                this.size = Number(size);
                this.dim =  Number(dim);
                this.vectors = vectors;
                res()
            }).catch(e => rej(e))
        })
    }
}

export default WordVectors;