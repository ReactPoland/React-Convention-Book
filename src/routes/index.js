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
import MenuListView                 from 'views/menu/MenuListView';

export default (
  <Route        component={CoreLayout} path='/'>
    <IndexRoute component={HomeView} name='home'/>

    <Route      component={RegisterView}  path='/register' name='register' />
    <Route      component={LoginView}  path='/login' name='login' />
    <Route      component={ResendConfirmationEmailView}  path='/resend_confirmation_email' name='resend_confirmation_email' />
    <Route      component={ChangeConfirmationEmailView}  path='/change_confirmation_email' name='change_confirmation_email' />
    <Route      component={ResetPasswordView1}  path='/reset-password' name='reset-password1' />
    <Route      component={ResetPasswordView2}  path='/reset-password/:token' name='reset-password2' />

    <Route      component={AccountSettingsView}  path='/account_settings' name='account_settings' />

    <Route      component={DashboardView}  path='/dashboard' name='dashboard' />
    <Route      component={StaffView}  path='/staff' name='staff' />
    <Route      component={StaffMemberView}  path='/staff/:id' name='staff' />
    <Route      component={StaffInvitationView}  path='/staff-invite' name='staff-invite' />
    <Route      component={StaffRegistrationView}  path='/staff-register/:token' name='staff-register' />

    <Route      component={MenuListView} path="/menu/:id" name="menu-list" />
  </Route>
);
