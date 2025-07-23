const Favorite = require('../models/Favorite');
const Lawyer = require('../models/Lawyer');

exports.toggleFavorite = async (req, res) => {
  try {
    const { lawyerId } = req.body;
    const userId = req.user._id;

    const existingFavorite = await Favorite.findOne({
      user: userId,
      lawyer: lawyerId
    });

    if (existingFavorite) {
      await existingFavorite.remove();
      res.json({
        success: true,
        message: 'Lawyer removed from favorites',
        isFavorited: false
      });
    } else {
      await Favorite.create({
        user: userId,
        lawyer: lawyerId
      });
      res.json({
        success: true,
        message: 'Lawyer added to favorites',
        isFavorited: true
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling favorite status',
      error: error.message
    });
  }
};

exports.getFavoriteLawyers = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id })
      .populate('lawyer', 'fullName profilePicture experience practiceAreas location consultationFee rating languagesSpoken isVerified');

    res.json({
      success: true,
      data: favorites.map(f => f.lawyer)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching favorite lawyers',
      error: error.message
    });
  }
};
