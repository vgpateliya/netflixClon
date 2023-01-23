const User = require("../models/UserModels");

module.exports.addToLiked = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { Liked } = user;
      const alreadyLiked = Liked.find(({ id }) => id === data.id);
      if (!alreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            Liked: [...user.Liked, data],
          },
          {
            new: true,
          }
        );
      } else return res.json({ msg: "Already Added To Liked!" });
    } else await User.create({ email, Liked: [data] });
    return res.json({ msg: "Added To Liked" });
  } catch (error) {
    return res.json({ msg: "Error Adding To Liked!" });
  }
};

module.exports.getLiked = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ msg: "Success", movies: user.Liked });
    } else {
      return res.json({ msg: "No User Found!" });
    }
  } catch (error) {
    return res.json({ msg: "Error Fatching Liked!" });
  }
};

module.exports.removeFromLiked = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const movies = user.Liked;
      const movieIndex = movies.findIndex(({ id }) => id === movieId);
      if (!movieIndex) {
        res.status(400).send({ msg: "Movie not found." });
      }
      movies.splice(movieIndex, 1);
      await User.findByIdAndUpdate(
        user._id,
        {
          Liked: movies,
        },
        { new: true }
      );
      return res.json({ msg: "Movie successfully removed.", movies });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error removing movie to the liked list" });
  }
};
