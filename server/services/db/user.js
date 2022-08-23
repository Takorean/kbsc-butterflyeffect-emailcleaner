const { Op } = require("sequelize");
const { hashingPw } = require("../../utils/bcrypt");
const { User } = require("../../models");

exports.selectUserFromPassport = async (id) => {
  const result = await User.findOne({
    attributes: ["no", "id", "name", "password"],
    where: { id },
    raw: true,
  });

  return result;
};

exports.insertUser = async ({ id, name, password }) => {
  const userData = {
    id,
    name,
    password: await hashingPw(password),
  };

  const result = await User.create(userData);

  return result;
};

exports.updateIsConnectionEmail = async (no) => {
  const result = await User.update(
    { is_connection_email: true },
    { where: { no: no } }
  );
  return result;
};

exports.selectIsConnectionEmail = async (no) => {
  const result = await User.findOne({
    attributes: ["is_connection_email"],
    where: { no },
    raw: true,
  });

  return result;
};

exports.updateExperience = async ({ user_no, emailLen }) => {
  const result = await User.increment(
    { experience: emailLen },
    { where: { no: user_no } }
  );
  return result;
};
