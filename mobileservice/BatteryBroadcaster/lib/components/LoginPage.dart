import 'package:BatteryBroadcaster/components/DashboardScreen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_login/flutter_login.dart';




class LoginStls extends StatefulWidget {
  @override
  _LoginStlsState createState() => _LoginStlsState();
}

class _LoginStlsState extends State<LoginStls> {

  var users = '';

  setUserByID(){
    setState(() {
      users='value';
    });
  }
  @override
  Widget build(BuildContext context) {
    setUserByID();
    return LoginScreen(users: users);
  }
}

class LoginScreen extends StatelessWidget {
  var users;

  LoginScreen({this.users});

  

  

  
  @override
  Widget build(BuildContext context) {
    print(this.users);
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