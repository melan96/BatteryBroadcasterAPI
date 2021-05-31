import 'package:BatteryBroadcaster/components/LoginPage.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      
   
      home: Scaffold(body: LoginStls(),
      backgroundColor: Colors.black),
      debugShowCheckedModeBanner: false,
    );
  }
}