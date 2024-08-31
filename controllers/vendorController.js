const Vendor = require("../models/vendor");

exports.createVendor = async (req, res) => {
  try {
    const vendor = new Vendor(req.body);
    await vendor.save();
    res.status(201).json(vendor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.vendorId);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.vendorId,
      req.body,
      { new: true }
    );
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.status(200).json(vendor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.vendorId);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
