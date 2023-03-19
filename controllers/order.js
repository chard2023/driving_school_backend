const Orders = require('../models/order');

const getOrders = (req, res) => {
    Orders.find()
    .then((data) => {
    res.json(data);
    })
    .catch((err) => {
    console.log(err);
    res.status(500).json({ error: 'Error getting Orders' });
    });
};

const getOrderById = (req, res) => {
    const { id } = req.params;

    Orders.findById(id)
    .then((data) => {
    if (!data) {
        return res.status(404).json({ error: 'Order not found' });
    }

    res.json(data);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Error getting Order' });
    });
};

const createOrder = (req, res) => {
    const { fname,
        mname,
        lname,
        phone,
        email,
        customer,
        payment,
        courses } = req.body;
    console.log("Request Body: ",req.body);
    const order = new Orders({ fname,
        mname,
        lname,
        phone,
        email,
        customer,
        payment,
        courses });

        order.save()
    .then((data) => {
        console.log('Order saved to database:', data);
        res.status(201).json(data);
    })
    .catch((err) => {
        console.error('Error saving Order to database:', err);
        res.status(500).json({ error: 'Error creating Order' });
    });
};

const updateOrder = (req, res) => {
    const { id } = req.params;
    const update = req.body;

    Orders.findByIdAndUpdate(id, update, { new: true })
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Error updating Order' });
    });
};

const deleteOrder = (req, res) => {
    const { id } = req.params;
    
    Orders.findByIdAndDelete(id)
    .then(() => {
        res.json({ success: true });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Error deleting Order' });
    });
};

module.exports = {
getOrders,
getOrderById,
createOrder,
updateOrder,
deleteOrder,
};