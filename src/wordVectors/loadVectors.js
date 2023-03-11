import raw from "./glove-wiki-gigaword-50-tsne-2.txt"

export const loadVectors = () => {
    return new Promise((res, rej) => {
        loadFile().then(text => {
            const lines = text.split("\n");
            const vectors = {}
            for (let i = 1; i < lines.length; i++) {
                const [word, x, y] = lines[i].split(" ")
                vectors[word] = [Number(x), Number(y)]
            }
            const [size, dim] = lines[0].split(" ")
            res({
                size: Number(size),
                dim:  Number(dim),
                vectors: vectors
            })
        }).catch(e => rej(e))
    })
}

const loadFile = () => {
    return new Promise((res, rej) => {
        fetch(raw)
            .then(r => r.text())
            .then(text => res(text))
            .catch(e => rej(e))
    })
}