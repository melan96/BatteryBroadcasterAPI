import 'package:shared_preferences/shared_preferences.dart';

class UserAuth{


  static String userAuthID;




  setUserAuthID(String value) async{
    final prefs = await SharedPreferences.getInstance();
    prefs.setString('authID', value);
    var ptemp =  prefs.getString('authID');
    print('AuthID set pref ==========>' +ptemp.toString() );

  }



 Future<String> getUserAuthID() async{

    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('authID');
  }

  disposeSession() async{
    final prefs = await SharedPreferences.getInstance();
    userAuthID = null;
    await prefs.setString('authID',null);
  }





}