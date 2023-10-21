const Items = require("../model/item.js");

exports.getAllItems = (req, res, next) => {
    Items.findAll().then(result => {
        res.status(200).json({
            message: "successfully fetched all data",
            data: result
        })
    }).catch(err => {
        console.log(`${err} in getAllItems`);
        res.status(500).json({ message: "failed to fetch Items" });
    })
}

exports.addItem = (req, res, next) => {
    const { name, quantity, desc, price } = req.body;
    const item = { name, quantity, desc, price };
    Items.create(item).then(result => {
        res.status(200).json({
            message: "Added item successfully",
            data: result
        })
    }).catch(err => {
        console.log(`${err} in addItem`);
        res.status(500).json({ message: "failed to add Item" });
    })
}

exports.EditItemQuantity = (req, res, next) => {
    const { id } = req.params;
    let { quantity } = req.query;
    console.log(quantity, id);
    Items.findByPk(id).then(item => {
        if (!item) {
            console.log('Item not found');
            return res.status(404).json({ message: "no item found" })
        }
        quantity = item.quantity - quantity;
        if (quantity < 0) {
            return res.status(409).json({
                message: 'item inventory is empty'
            });
        }
        item.update({ quantity }).then(result => {
            return res.status(200).json({ message: "qunatity updated successfully", item: result })
        }).catch(err => {
            console.log(`${err} in EditItemQuantity`);
            return res.status(500).json({ message: "failed to edit Item quantity" });
        })
    }).catch(err => {
        console.log(`${err} in EditItemQuantity`);
        res.status(500).json({ message: "failed to edit Item quantity" });
    })
}