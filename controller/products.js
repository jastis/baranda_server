const productModel = require("../models/Products");
const fs = require("fs");
const path = require("path");
const formidable = require("formidable");

exports.product_create =  (req, res) => {
	var name,
		image = "";

	// const newProduct = new productModel(req.body);
	const form = new formidable.IncomingForm();
	form.parse(req, async (err, fields, files) => {
		if (!files.profilePic === undefined){
		name = fields.name;
		const oldPath = files.profilePic.filepath;
		const newPath = path.join(__dirname,
			"public",
			"uploads",
			files.profilePic.originalFilename
		);
		image = newPath;
		const rawData = fs.readFileSync(oldPath);
		fs.writeFile(newPath, rawData, function (err) {
			if (err) return res.status(400).json({ message: "Image Upload Failed" });
		});
		try {
			if (name && image) {
				const oldproduct = await productModel.findOne({ name });
				if (oldproduct) {
					const updatedProduct = await productModel.findByIdAndUpdate(
						oldproduct._id,
						{ name, image }
					);
					return res.status(200).json(updatedProduct);
				}
				const newProduct = await new productModel({
					name,
					image,
				});
				const product = await newProduct.save();
				res.status(200).json(product);
			} else {
				return res.status(400).json({ message: "All inputs required!!" });
			}
		} catch (error) {
			return res
				.status(500)
				.json({ message: "Server error, contact administrator" });
		}
	} else{
		return res
				.status(500)
				.json({ message: "Image File Required!" });
	}
	});
};

exports.product_update = async (req, res) => {
	const { id } = req.params;
	try {
		const updatedProduct = await productModel.findByIdAndUpdate(id, req.body);
		if (updatedProduct) {
			return res.status(200).json(updatedProduct);
		}
		res.status(404).json({ message: "product not found!!!" });
	} catch (error) {
		return res.status(404).json({ message: "Product not found" });
	}
};

exports.product_delete = async (req, res) => {
	const { id } = req.params;
	try {
		const updatedProduct = await productModel.findByIdAndDelete(id);
		res.status(200).json({ message: "Product deleted successfully" });
	} catch (error) {
		return res.status(404).json({ message: "Product not found" });
	}
};

exports.product_delete_many = async (req, res) => {
	const { ids } = req.body;
	try {
		const deleted = await productModel.deleteMany({ _id: { $in: ids } });
		// ids.forEach(async (id) => {
		// 	const updatedProduct = await productModel.findByIdAndDelete(id);
		// });
		res.status(200).json({ message: "Product deleted successfully" });
	} catch (error) {
		return res.status(404).json({ message: "Product not found" });
	}
};

exports.product_list_all = async (req, res) => {
	try {
		const products = await productModel.find();
		if (!products) {
			return res.status(404).json({ message: "Product not found" });
		}
		res.status(200).json(products);
	} catch (error) {
		return res.status(404).json({ message: "Product not found" });
	}
};

exports.product_list_single = async (req, res) => {
	const { id } = req.params;
	try {
		const product = await productModel.findById(id);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}
		res.status(200).json(product);
	} catch (error) {
		return res.status(404).json({ message: "Product not found" });
	}
};
exports.product_search = async (req, res) => {
	const { search_terms } = req.params;
	try {
		const product = await productModel.find({ name: search_terms });
		if (product.length === 0) {
			return res.status(404).json({ message: "Product not found" });
		}
		res.status(200).json(product);
	} catch (error) {
		return res.status(404).json({ message: "Product not found" });
	}
};

const isFileValid = (file) => {
	const type = file.type.split("/").pop();
	const validTypes = ["jpg", "jpeg", "png", "pdf"];
	if (validTypes.indexOf(type) === -1) {
		return false;
	}
	return true;
};
