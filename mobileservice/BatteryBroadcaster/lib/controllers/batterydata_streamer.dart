import 'dart:convert';

import 'package:BatteryBroadcaster/controllers/userauth.dart';
import 'package:http/http.dart' as http;

class BatteryDataStreamer{


  String technology;
  String uid = UserAuth.userAuthID;
  String chargingStatus;
  String currentFlowNow;
  String batteryTemperature;
  String batteryLevel;
  String chargingTimeRemaining;
  String batteryHealth;
  String pluggedStatus;
  String reamainingEnergy;
  String volatage;

  BatteryDataStreamer(this.technology,this.chargingStatus,this.currentFlowNow,this.batteryTemperature,
  this.batteryLevel,this.chargingTimeRemaining,this.batteryHealth,this.pluggedStatus,this.reamainingEnergy,
  this.volatage){
    this.uid =UserAuth.userAuthID;
  }

  

  
  streamDataToAPI() async{

    print('Function called');
    var url = Uri.parse('https://batterybroadcaster.herokuapp.com/batteryinfo/60adc87c1ccc1e055979ff25');
    
      
     await http.post(url,headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: json.encode(
      {
    "technology": this.technology,
    "chargingStatus": this.chargingStatus,
    "currentFlowNow": this.currentFlowNow,
    "batteryTemperature": this.batteryTemperature,
    "batteryLevel": this.batteryLevel,
    "chargingTimeRemaining": this.chargingTimeRemaining,
    "batteryHealth": this.batteryHealth,
    "pluggedStatus": this.pluggedStatus,
    "reamainingEnergy": this.reamainingEnergy,
    "volatage": this.volatage
      },));



  }

}