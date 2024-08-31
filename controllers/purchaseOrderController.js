const PurchaseOrder = require("../models/purchaseOrder");

exports.createPurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = new PurchaseOrder(req.body);
    await purchaseOrder.save();
    res.status(201).json(purchaseOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPurchaseOrders = async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrder.find().populate("vendor");
    res.status(200).json(purchaseOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPurchaseOrderById = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findById(
      req.params.poId
    ).populate("vendor");
    if (!purchaseOrder)
      return res.status(404).json({ message: "Purchase Order not found" });
    res.status(200).json(purchaseOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findByIdAndUpdate(
      req.params.poId,
      req.body,
      { new: true }
    );
    if (!purchaseOrder)
      return res.status(404).json({ message: "Purchase Order not found" });
    res.status(200).json(purchaseOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findByIdAndDelete(
      req.params.poId
    );
    if (!purchaseOrder)
      return res.status(404).json({ message: "Purchase Order not found" });
    res.status(200).json({ message: "Purchase Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
