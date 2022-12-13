var Supplier = require("../../models/supplier");

async function addSupplier(reqSupplier){
    const {supplier_name, image} = reqSupplier;

    const newSupplier = new Supplier({
        supplier_name,
        image,
    });

    try {
        await newSupplier.save();
        return {
            error: false,
            message: "Tạo supplier thành công"
        }

    }
    catch (err) {
        return {
            error: true,
            message: err.message,
        }
    }
}

async function getSuppliers(page){
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await Supplier.countDocuments();
        const suppliers = await Supplier.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        return {
            error: false,
            message: `Lấy suppliers trang ${page} thành công`,
            current_page: Number(page),
            number_of_pages: Math.ceil(total / LIMIT),
            suppliers,
        }
    }
    catch (err) {
        return {
            error: true,
            message: err.message,
        }
    }
}

module.exports = {
    addSupplier,
    getSuppliers
}
