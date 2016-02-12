import roles from 'constants/roles';

export default {
  isAdmin(user) {
    return (
         user.role === roles.ADMIN
      || user.role === roles.TRAINER_ADMIN
    );
  },

  isAdminOrManager(user) {
    return (
         user.role === roles.MANAGER
      || user.role === roles.ADMIN
      || user.role === roles.TRAINER_ADMIN
      || user.role === roles.TRAINER_MANAGER
    );
  }
}
