import React                        from 'react';
import { Route, IndexRoute }        from 'react-router';

/* wrappers */
import CoreLayout                   from 'layouts/CoreLayout';

/* authorization views */
import RegisterView                 from 'views/account/RegisterView';
import LoginView                    from 'views/account/LoginView';
import ResendConfirmationEmailView  from 'views/account/ResendConfirmationEmailView';
import ChangeConfirmationEmailView  from 'views/account/ChangeConfirmationEmailView';
import ResetPasswordView1           from 'views/account/ResetPasswordView1';
import ResetPasswordView2           from 'views/account/ResetPasswordView2';
import TokenNotFoundView            from 'views/account/TokenNotFoundView';

/* user profile views */
import AccountSettingsView          from 'views/account/AccountSettingsView';

/* landing pages */
import DashboardView                from 'views/DashboardView';
import HomeView                     from 'views/HomeView';

/* managing related views */
import Manage                       from 'views/manage/Main';
import Staff                        from 'views/manage/staff/Main';
import StaffView                    from 'views/manage/staff/StaffView';
import EmailTemplatesView                    from 'views/manage/emailTemplates/EmailTemplatesView';
// import StaffMemberView              from 'views/manage/staff/StaffMemberView';
// import StaffInvitationView          from 'views/manage/staff/StaffInvitationView';
import StaffRegistrationView        from 'views/manage/staff/StaffRegistrationView';

/* menus related views */
import Menus                        from 'views/menu/Main';
import MenuLibraryView              from 'views/menu/MenuLibraryView';
import MenuSectionsView             from 'views/menu/MenuSectionsView';
import MenuDetailView               from 'views/menu/MenuDetailView';

export default (
  <Route component={CoreLayout} path='/'>
    <IndexRoute component={HomeView} name='home' />

    /* authorization related routes */
    <Route component={RegisterView}  path='/register' name='register' />
    <Route component={LoginView}  path='/login' name='login' />
    <Route component={ResendConfirmationEmailView}  path='/resend-confirmation-email' name='resend-confirmation-email' />
    <Route component={ChangeConfirmationEmailView}  path='/change-confirmation-email' name='change-confirmation-email' />
    <Route component={ResetPasswordView1}  path='/reset-password' name='reset-password1' />
    <Route component={ResetPasswordView2}  path='/reset-password/:token' name='reset-password2' />

    /* dashboard */
    <Route component={DashboardView}  path='/dashboard' name='dashboard' />

    /* user profile related routes */
    <Route component={AccountSettingsView}  path='/account-settings' name='account-settings' />

    /* menus related routes */
    <Route component={Menus} path='/menu' name="menu">
      <Route component={MenuLibraryView} path="/menu/library" name="menu-library" />
      <Route component={MenuSectionsView} path="/menu/sections" name="menu-sections" />
      <Route component={MenuDetailView} path="/menu/:id" name="menu-list" />
    </Route>

    /* managing related routes */
    <Route component={Manage} path="/manage" name="manage">

      /* staff management routes */
      <Route component={Staff}>
        <Route component={StaffView} path="/manage/staff" name="staff" />
      </Route>
      <Route component={EmailTemplatesView} path="/manage/emailTemplates" name="emailTemplates" />

    </Route>
    <Route      component={StaffRegistrationView}  path='/staff-register/:token' name='staff-register' />
    {/*<Route      component={StaffView}  path='/staff' name='staff' />
    <Route      component={StaffMemberView}  path='/staff/:id' name='staff' />
    <Route      component={StaffInvitationView}  path='/staff-invite' name='staff-invite' />*/}

  </Route>
);
