export class UnionFind{
    constructor(elements){
        this.parent = {}
        this.rank = {}

        elements.forEach((e1)=> {
        this.parent[e1] = e1
        this.rank[e1] = 0
    })
    };

    find(x){
        if (this.parent[x] != x){
            this.parent[x] = this.find(this.parent[x])
        }
        return this.parent[x]
    }

    union(x, y){
        const rootX = this.find(x)
        const rootY = this.find(y)

        if (rootX == rootY) return false

        if (this.rank[rootX] < this.rank[rootY]){
            this.parent[rootX] = rootY
        } else if (this.rank[rootX] > this.rank[rootY]){
            this.parent[rootY] = rootX
        } else {
            this.parent[rootY] = rootX
            this.rank[rootX]++
        }
        return true
    }
}