// try to convert the received users array from the mongoDB to a more safe object without the password field.

const userResponse = (users) => {
  const usersResult = [];

  users.forEach((user) => {
    usersResult.push({
      name: user.name,
      email: user.email,
      userId: user.userId,
      email: user.email,
      userTypes: user.usersTypes,
      userStatus: user.userStatus,
    });
  });
  return usersResult;
};

module.exports = {
  userResponse,
};
