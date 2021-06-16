import 'package:shared_preferences/shared_preferences.dart';

class ServerPersistance{
  static bool isEnabled = false;


setPersistanceIsEmpty(bool value) async{
    final prefs = await SharedPreferences.getInstance();
    prefs.setBool('isEnabled', value);
   prefs.getBool('isEnabled');
    

  }



 Future<bool> getPersistanceIsEmpty() async{

    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool('isEnabled');
  }

}