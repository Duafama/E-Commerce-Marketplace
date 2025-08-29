const Category = require('../models/category');

async function checkCategoryAccess(req, res, next) {
  try {
    const  categoryId  = req.body.categoryId || req.params.categoryId;
    const category = await Category.findById(categoryId).populate('storeId');
    if (!category) return res.status(404).json("Category doesn't exist");

    if (req.user.role === 'store-manager' &&req.user.storeId !== category.storeId.toString()) 
      return res.status(403).json("Forbidden Access - Category does not belong to this store");
    else if (req.user.role === 'vendor-admin' && req.user.vendorId !== category.storeId.vendorId.toString()) 
      return res.status(403).json("Forbidden Access - Category does not belong to this vendor");
    
    req.category = category;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
}

module.exports = { checkCategoryAccess };