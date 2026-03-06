import Graph from '../models/Graph.js'

export const createGraph = async(req, res) => {
    try {
        const {title, nodes, edges, isDirected, isWeighted} = req.body

        const graph = await Graph.create({
            title, nodes, edges, isDirected, isWeighted, user: req.user._id
        })
        res.status(201).json({graph})

    } catch(error){
        res.status(500).json({message: error.message})
    }
};

export const getUserGraphs = async(req, res) => {
    try{
        const userId = req.user._id

        const graph = await Graph.find({user: userId})

        res.status(200).json({graph})

    } catch(error){
        res.status(500).json({message: error.message})
    }
}

export const getGraphById = async(req, res) => {
    try {
        const graph = await Graph.findById(req.params.id)

        if (!graph){
            res.status(404).json({message: "Graph not found"})
        }
        res.status(200).json({graph})

    } catch(error){
        res.status(500).json({error: error.message})
    }
}

export const updateGraph = async(req, res) => {
    try {
        const graph = await Graph.findById(req.params.id)
        if (!graph){
            return res.status(404).json({message: "Graph not found"})
        }
        if (graph.user.toString() != req.user._id.toString()){
            return res.status(403).json({message: "Invalid access"})
        }

        const updatedGraph = await Graph.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
        res.status(201).json({updatedGraph})

    } catch(error){
        res.status(500).json({message: error.message})
    }
}

export const deleteGraph = async(req, res) => {
    try {
        const graph = await Graph.findById(req.params.id)
        if (!graph){
            return res.status(404).json({message: "Graph not found"})
        }
        if (graph.user.toString() != req.user._id.toString()){
            return res.status(403).json({message: "Invalid access"})
        }

        await graph.deleteOne()

        return res.status(201).json({message: "Graph deleted successfully"})

    } catch(error){
        res.status(500).json({error: error.message})
    }
}

export const getPublicGraphs = async (req, res) => {
    try {
        const graphs = await Graph.find({isPublic: true})
                            .populate('user', 'username')
                            .sort({createdAt: -1})
        res.status(200).json({graphs})                    

    } catch(error){
        res.status(500).json({message: error.message})
    }
}