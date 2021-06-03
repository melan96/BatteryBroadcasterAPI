import 'package:BatteryBroadcaster/components/DashboardScreen.dart';
import 'package:BatteryBroadcaster/components/LoginPage.dart';
import 'package:BatteryBroadcaster/controllers/userauth.dart';
import 'package:flutter/material.dart';


void main() {
  
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(

      
   
      home: Scaffold(body: FutureBuilder<String>(
        future: UserAuth().getUserAuthID(),
        builder: (context, snapshot) {
          return (snapshot.data!=null)? Dashboard() : LoginStls();
        }
      ),
      backgroundColor: Colors.black),
      debugShowCheckedModeBanner: false,
    );
  }
}