import express from "express";
import Product from "../models/Product.js";
import {authMiddleware, isAdmin} from "../middleware/auth.js";

const router = express.Router();
router.post("/", authMiddleware, isAdmin, async (req, res) => {
    const {name, price, img} = req.body;
    if(!name || !price || !img){
        return res.status(400).json({ message: "All fields are required" });
    }
    try{
        const product = new Product({ name, price, img });
        await product.save();
        return res.status(201).json({ message: "Product created successfully" });
    }catch(err){
        console.log(err);
        return res.status(500).json({ message: "Server Error" });
    }   
});
router.get("/", async (req, res) => {
    try{
        const products = await Product.find();
        return res.json(products);
    }catch(err){
        console.log(err);
        return res.status(500).json({ message: "Server Error" });
    }
});

router.delete("/:id", authMiddleware, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.json({ message: "Product deleted successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Error" });
    }
});

export default router;
