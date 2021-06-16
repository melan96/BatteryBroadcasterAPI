import 'dart:convert';

import 'package:BatteryBroadcaster/components/DashboardScreen.dart';
import 'package:BatteryBroadcaster/controllers/userauth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_login/flutter_login.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart' as http;




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
  TextEditingController usernameController = new TextEditingController();
  TextEditingController passwordController = new TextEditingController();

  _handlesUserLogin() async{

  
    var url = Uri.parse('https://batterybroadcaster.herokuapp.com/login');
    var errorState;
    var map = new Map<String, String>();

    http.Response response =  await http.post(url,headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: json.encode(
      {
        "username": usernameController.text,
        'password':passwordController.text
      },));

      if(await json.decode(response.body)['error']){
        Fluttertoast.showToast(
        msg: json.decode(response.body)['message'],
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.CENTER,
        timeInSecForIosWeb: 1,
        backgroundColor: Colors.red,
        textColor: Colors.white,
        fontSize: 16.0
    );

    return false;

      }else{
        UserAuth.userAuthID = await json.decode(response.body)["message"][0]["_id"];
        
        UserAuth().setUserAuthID(await json.decode(response.body)["message"][0]["_id"]);
      
        return true;
      }
  
  


   

   
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
                controller: usernameController,
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
                    labelText: 'Username',
                    labelStyle: TextStyle(color:Colors.white),
                    hintText: 'Enter valid username'),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(
                  left: 15.0, right: 15.0, top: 15, bottom: 0),
              //padding: EdgeInsets.symmetric(horizontal: 15),
              child: TextField(
                style: TextStyle(color:Colors.white),
                controller: passwordController,
                

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
                'Register by WebGUI',
                style: TextStyle(color: Colors.blueGrey[200], fontSize: 14),
              ),
            ),
            SizedBox(height:50),
            Container(
              height: 40,
              width: 200,
              decoration: BoxDecoration(
                  color: Colors.green, borderRadius: BorderRadius.circular(20)),
              child: FlatButton(
                onPressed: () async {
                  if(await _handlesUserLogin()){

                    
                   Navigator.push(
                     context, MaterialPageRoute(builder: (_) => Dashboard()));

                  }
                  
                },
                child: Text(
                    'Login',
                    style: TextStyle(color: Colors.white, fontSize: 20),
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