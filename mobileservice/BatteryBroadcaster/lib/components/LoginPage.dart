import 'package:BatteryBroadcaster/components/DashboardScreen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_login/flutter_login.dart';


const users = const {
  'dribbble@gmail.com': '12345',
  'hunter@gmail.com': 'hunter',
  'melanrashitha@outlook.com':'toor123'
};

class LoginScreen extends StatelessWidget {
  Duration get loginTime => Duration(milliseconds: 2250);

  Future<String> _authUser(LoginData data) {
    print('Name: ${data.name}, Password: ${data.password}');
    return Future.delayed(loginTime).then((_) {
      if (!users.containsKey(data.name)) {
        return 'Username not exists';
      }
      if (users[data.name] != data.password) {
        return 'Password does not match';
      }
      return null;
    });
  }


  Future<String> _recoverPassword(String name) {
    print('Name: $name');
    return Future.delayed(loginTime).then((_) {
      if (!users.containsKey(name)) {
        return 'Username not exists';
      }
      return null;
    });
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
    
        child: Column(
          children: <Widget>[
            SizedBox(height:MediaQuery.of(context).size.height*0.15),
            
            Text('⚡️Battery API',style: TextStyle(fontSize:30,color: Colors.white70),),
            SizedBox(height:MediaQuery.of(context).size.height*0.15),
            Padding(
              //padding: const EdgeInsets.only(left:15.0,right: 15.0,top:0,bottom: 0),
              padding: EdgeInsets.symmetric(horizontal: 15),
              child: TextField(
                
                style: TextStyle(color:Colors.white),
                decoration: InputDecoration(
                  fillColor: Colors.white38,
                     enabledBorder: new OutlineInputBorder(
        borderRadius: new BorderRadius.circular(25.0),
        borderSide:  BorderSide(color: Colors.blueGrey ),

      ),
      focusedBorder: new OutlineInputBorder(
        borderRadius: new BorderRadius.circular(25.0),
        borderSide:  BorderSide(color: Colors.blueGrey ),

      ),
                    labelText: 'Email',
                    labelStyle: TextStyle(color:Colors.white),
                    hintText: 'Enter valid email id as abc@gmail.com'),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(
                  left: 15.0, right: 15.0, top: 15, bottom: 0),
              //padding: EdgeInsets.symmetric(horizontal: 15),
              child: TextField(
                style: TextStyle(color:Colors.white),
                

                obscureText: true,
                
                decoration: InputDecoration(
                     enabledBorder: new OutlineInputBorder(
        borderRadius: new BorderRadius.circular(25.0),
        borderSide:  BorderSide(color: Colors.blueGrey ),

      ),
      focusedBorder: new OutlineInputBorder(
        borderRadius: new BorderRadius.circular(25.0),
        borderSide:  BorderSide(color: Colors.blueGrey ),

      ),
                    labelText: 'Password',
                    labelStyle: TextStyle(color:Colors.white),
                    fillColor: Colors.teal,
                    focusColor: Colors.white,
                    
                    hintText: 'Enter secure password'),
              ),
            ),
            FlatButton(
              onPressed: (){
                //TODO FORGOT PASSWORD SCREEN GOES HERE
              },
              child: Text(
                'Forgot Password',
                style: TextStyle(color: Colors.blueGrey[200], fontSize: 15),
              ),
            ),
            Container(
              height: 50,
              width: 250,
              decoration: BoxDecoration(
                  color: Colors.blue, borderRadius: BorderRadius.circular(20)),
              child: FlatButton(
                onPressed: () {
                  Navigator.push(
                      context, MaterialPageRoute(builder: (_) => Dashboard()));
                },
                child: Text(
                  'Login',
                  style: TextStyle(color: Colors.white, fontSize: 25),
                ),
              ),
            ),
            SizedBox(
              height: 130,
            ),
            Text('New User? Create Account')
          ],
        ),
      );
    
  }
}