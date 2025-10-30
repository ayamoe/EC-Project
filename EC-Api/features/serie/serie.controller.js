import { getSerie,setSerie } from "./serie.service.js";

export const getserieController = async(req,res) =>{
    const result = await getSerie();
    return res.json(result)
}
export const setserieController = async (req, res) => {
    const name = req.body.name;

    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }
    try {
        const result = await setSerie(name); // Pass name to function
        
        return res.json(result);
    } catch (error) {
        console.error("Error in setSerie:", error);
        return res.status(500).json({ error: "Server error" });
    }
}