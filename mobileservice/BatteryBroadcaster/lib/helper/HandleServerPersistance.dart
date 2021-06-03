import 'package:shared_preferences/shared_preferences.dart';

class ServerPersistance{
  static bool isEnabled = false;


setPersistanceIsEmpty(bool value) async{
    final prefs = await SharedPreferences.getInstance();
    prefs.setBool('isEnabled', value);
    var ptemp =  prefs.getBool('isEnabled');
    print('isEnabled set pref ==========>' +ptemp.toString() );

  }



 Future<bool> getPersistanceIsEmpty() async{

    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool('isEnabled');
  }

}