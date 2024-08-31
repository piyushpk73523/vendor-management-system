const mongoose = require("mongoose");

const PurchaseOrderSchema = new mongoose.Schema({
  poNumber: { type: String, required: true },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  orderDate: { type: Date, required: true },
  deliveryDate: { type: Date },
  items: { type: Map, of: String },
  quantity: { type: Number, required: true },
  status: { type: String, required: true },
  qualityRating: { type: Number },
  issueDate: { type: Date, required: true },
  acknowledgmentDate: { type: Date },
});

module.exports = mongoose.model("PurchaseOrder", PurchaseOrderSchema);
