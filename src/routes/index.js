import React                        from 'react';
import { Route, IndexRoute }        from 'react-router';
import CoreLayout                   from 'layouts/CoreLayout';
import HomeView                     from 'views/HomeView';
import DashboardView                from 'views/DashboardView';
import RegisterView                 from 'views/account/RegisterView';
import LoginView                    from 'views/account/LoginView';
import ResendConfirmationEmailView  from 'views/account/ResendConfirmationEmailView';
import ChangeConfirmationEmailView  from 'views/account/ChangeConfirmationEmailView';
import AccountSettingsView          from 'views/account/AccountSettingsView';
import ResetPasswordView1           from 'views/account/ResetPasswordView1';
import ResetPasswordView2           from 'views/account/ResetPasswordView2';
import TokenNotFoundView            from 'views/account/TokenNotFoundView';
import StaffView                    from 'views/staff/StaffView';
import StaffMemberView              from 'views/staff/StaffMemberView';
import StaffInvitationView          from 'views/staff/StaffInvitationView';
import StaffRegistrationView        from 'views/staff/StaffRegistrationView';
// import ExercisesView                from 'views/exercises/ExercisesView';
// import ExerciseView                 from 'views/exercises/ExerciseView';
// import AddExerciseView              from 'views/exercises/AddExerciseView';
// import EditExerciseView             from 'views/exercises/EditExerciseView';
// import WorkoutsView                 from 'views/workouts/WorkoutsView';
// import WorkoutView                  from 'views/workouts/WorkoutView';
// import AddWorkoutView               from 'views/workouts/AddWorkoutView';
// import EditWorkoutView              from 'views/workouts/EditWorkoutView';

export default (
  <Route        component={CoreLayout} path='/'>
    <IndexRoute component={HomeView} name='home'/>
    <Route      component={RegisterView}  path='/register' name='register' />
    <Route      component={LoginView}  path='/login' name='login' />
    <Route      component={DashboardView}  path='/dashboard' name='dashboard' />
    <Route      component={ResendConfirmationEmailView}  path='/resend_confirmation_email' name='resend_confirmation_email' />
    <Route      component={ChangeConfirmationEmailView}  path='/change_confirmation_email' name='change_confirmation_email' />
    <Route      component={ResetPasswordView1}  path='/reset-password' name='reset-password1' />
    <Route      component={ResetPasswordView2}  path='/reset-password/:token' name='reset-password2' />
    <Route      component={AccountSettingsView}  path='/account_settings' name='account_settings' />
    <Route      component={StaffView}  path='/staff' name='staff' />
    <Route      component={StaffMemberView}  path='/staff/:id' name='staff' />
    <Route      component={StaffInvitationView}  path='/staff-invite' name='staff-invite' />
    {/*<Route      component={ExercisesView}  path='/exercises' name='exercises' />
    <Route      component={ExerciseView}  path='/exercises/:exercise' name='exercise' />
    <Route      component={AddExerciseView}  path='/add_exercise' name='add_exercise' />
    <Route      component={EditExerciseView}  path='/exercises/edit/:exercise' name='edit_exercise' />
    <Route      component={WorkoutsView}  path='/workouts' name='workouts' />
    <Route      component={WorkoutView}  path='/workouts/:workout' name='workout' />
    <Route      component={AddWorkoutView}  path='/add_workout' name='add_workout' />
    <Route      component={EditWorkoutView}  path='/workouts/edit/:workout' name='edit_workout' />
    <Route      component={TokenNotFoundView}  path='/token-not-found' name='token-not-found' />*/}
    <Route      component={StaffRegistrationView}  path='/staff-register/:token' name='staff-register' />

  </Route>
);
