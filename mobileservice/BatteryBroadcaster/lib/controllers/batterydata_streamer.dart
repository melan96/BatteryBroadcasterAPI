import 'dart:convert';

import 'package:BatteryBroadcaster/controllers/userauth.dart';
import 'package:http/http.dart' as http;

class BatteryDataStreamer{


  String technology;
  static String uid ;
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

    
    
  }

  

  
  streamDataToAPI() async{

    
    await new UserAuth().getUserAuthID().then((value) => {
      uid = value.toString()
    });

print('Function called'+uid.toString());
    var url = Uri.parse('https://batterybroadcaster.herokuapp.com/batteryinfo/'+uid);
    
      
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