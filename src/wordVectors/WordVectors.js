import raw from "./glove-wiki-gigaword-50-tsne-2.txt"

class WordVectors {
    constructor(){
        this.size = 0
        this.dim = 2
        this.vectors = {}
    }

    getVecForWord = word => {
        return this.vectors[word] || [0,0];
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