module.exports = (app) => {  // Corrected module export syntax
  const usercontroller = require('../controller/usercontroller');  // Import the user controller
  const accountinfocontroller=require('../controller/accountinfocontroller');
  const loginhistory=require('../controller/loginhistory');

  app.post('/signup', usercontroller.signup_datas);  // POST endpoint for signup
  app.post('/login',usercontroller.check_name_mail);

  app.get('/user-details/:user_id',accountinfocontroller.accountinfo)

  app.get('/login-history/:user_id',loginhistory.loginhistory)
};
