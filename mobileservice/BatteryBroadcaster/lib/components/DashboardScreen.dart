
import 'dart:async';

import 'package:BatteryBroadcaster/components/LoginPage.dart';
import 'package:BatteryBroadcaster/controllers/batterydata_streamer.dart';
import 'package:BatteryBroadcaster/controllers/userauth.dart';
import 'package:BatteryBroadcaster/helper/HandleServerPersistance.dart';
import 'package:BatteryBroadcaster/main.dart';
import 'package:battery_info/battery_info_plugin.dart';
import 'package:battery_info/model/android_battery_info.dart';
import 'package:battery_info/enums/charging_status.dart';

import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:waveprogressbar_flutter/waveprogressbar_flutter.dart';

class Dashboard extends StatefulWidget {
  @override
  _DashboardState createState() => _DashboardState();
  var isValid = false;
}

class _DashboardState extends State<Dashboard> {

    
    List<String> chargingStatus =  ['Charging', 'Discharging', 'Full', 'Unknown' ];
    bool isSwitched = false;

  Future<AndroidBatteryInfo> checkingInfo() async{
   // Access current battery health - Android
   
   AndroidBatteryInfo somevalue = await BatteryInfoPlugin().androidBatteryInfo;
   return await somevalue;
   
  }


@override
  void initState() {
    // TODO: implement initState' StreamData();
     StreamData();
    super.initState();
    setState(() {
       new ServerPersistance().getPersistanceIsEmpty().then((value) => {

         print(value),

         if(value == null){
           ServerPersistance().setPersistanceIsEmpty(false),
           isSwitched = false
         }else{
           isSwitched = value
         }
          
      });
    });
   

  }


StreamData() async{
  Timer.periodic(Duration(seconds:10), (timer) { 
    print('runningg...');


     checkingInfo().then((snapshot) =>{
       print(snapshot.batteryLevel),

       
        new BatteryDataStreamer(snapshot.technology, snapshot.chargingStatus.toString(), snapshot.currentNow.toString(), snapshot.temperature.toString(), snapshot.batteryLevel.toString(), snapshot.chargeTimeRemaining.toString(), snapshot.health, snapshot.pluggedStatus, snapshot.remainingEnergy.toString(), snapshot.voltage.toString()).streamDataToAPI()
        
  });

  });}


  
   
  @override
  Widget build(BuildContext context)  {

    return SafeArea(
          child: Column(
            children: [
              FutureBuilder<String>(
        future: UserAuth().getUserAuthID(),
        builder: (context, snapshot) {

              print('[[AuthID]] FROM Shared Preferences :: '+snapshot.data);

              return (!(snapshot.data == null)) ? SafeArea(child: SingleChildScrollView(
                    child: Column(

                  
                  
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                        Padding(
                          padding: const EdgeInsets.all(10.0),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
  
                              Text('⚡️BatteryAPI',style: TextStyle(color: Colors.white, fontSize: 16)),
                              GestureDetector(onTap: (){
                                print('tapped');
                                UserAuth().disposeSession();
                                 Fluttertoast.showToast(
        msg: 'Logged out sucessfully .. ',
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.CENTER,
        timeInSecForIosWeb: 1,
        backgroundColor: Colors.red,
        textColor: Colors.white,
        fontSize: 16.0
    );

                                

                                Navigator.push(context, MaterialPageRoute(builder: (context)=>MyApp()));
                              },
                              child: Icon(Icons.logout,size: 30,color: Colors.amberAccent,))
                            ],
                          ),
                        ),
                          

                           Container(
                            constraints: BoxConstraints(maxHeight: MediaQuery.of(context).size.width*0.7,minWidth: MediaQuery.of(context).size.width*0.7),
                             child: StreamBuilder<AndroidBatteryInfo>(
                              
                              stream:  Stream.periodic(Duration(seconds: 1)).asyncMap((event) => checkingInfo()),
                              // ignore: missing_return
                              builder: (context, snapshot) {

                                // Timer.periodic(Duration(seconds: 10), (timer) { 
                                //   BatteryDataStreamer batteryDataStreamer = new BatteryDataStreamer(snapshot.data.technology, snapshot.data.chargingStatus.toString(), snapshot.data.currentNow.toString(), snapshot.data.temperature.toString(), snapshot.data.batteryLevel.toString(), snapshot.data.chargeTimeRemaining.toString(), snapshot.data.health, snapshot.data.pluggedStatus, snapshot.data.remainingEnergy.toString(), snapshot.data.voltage.toString());
                                // batteryDataStreamer.streamDataToAPI();
                                // });

                               
                                
   
                                
                  

                                return snapshot.data !=null ? 
                                  Container(
                                    margin: EdgeInsets.only(top: 80.0),
                                    child: new Center(
                                      child: new WaveProgressBar(
                                        
                                        flowSpeed: 1.0,
                                        waveDistance:45.0,
                                        waterColor: Colors.green[400],
                                        //strokeCircleColor: Color(0x50e16009),
                                        
                                        percentage: snapshot.data.batteryLevel/100,
                                        heightController: new WaterController(),
                                        size: new Size (MediaQuery.of(context).size.width*0.7,MediaQuery.of(context).size.width*0.7),
                                        textStyle: new TextStyle(
                                            color:Colors.white70,
                                            fontSize: 60.0,

                                            fontWeight: FontWeight.bold),
                                      ),
                                    ),):LinearProgressIndicator(backgroundColor: Colors.amberAccent,);

                                    
                              }
                          ),
                           ),

                       

                         
                         SizedBox(height:40),
                         Text('📦 Info',style: TextStyle(color: Colors.white, fontSize: 15)),
SizedBox(height:40),

StreamBuilder<AndroidBatteryInfo>(
  stream: Stream.periodic(Duration(seconds: 1)).asyncMap((event) => checkingInfo()),
  builder: (context, snapshot) {

              return snapshot.data != null ?     Column(
                children: [
              IntrinsicHeight(
                                      child: Row(
                    children: <Widget>[
                      Container(
                        width: MediaQuery.of(context).size.width/2.1,
                     
                        child: Column(
                          children: [
                            Row(
                              children: [
                                Icon(Icons.military_tech_rounded,color: Colors.white,size: 25,),
                                Text('Technology',style: TextStyle(fontSize: 12, color: Colors.white, fontWeight:FontWeight.w100 ),)
                              ],
                            ),
                            Row(
                              children: [
                                
                                Text(snapshot.data.technology.toString(),style: TextStyle(fontSize: 14, color: Colors.greenAccent ),)
                              ],
                            ),
                          ],
                        ),
                      ),
                      VerticalDivider(
                        color: Colors.white,
                        thickness: 0.7,
                        
                      ),
                      Container(
                        width: MediaQuery.of(context).size.width/2.2,
                       
                        child: Column(
                          children: [
                            Row(
                              children: [
                                Icon(Icons.wifi_tethering_sharp,color: Colors.white,size: 25,),
                                Text('Status',style: TextStyle(fontSize: 12, color: Colors.white, fontWeight:FontWeight.w100 ),)
                              ],
                            ),
                            Row(
                              children: [
                      
                                Text(chargingStatus.elementAt(snapshot.data.chargingStatus.index), style:TextStyle(fontSize: 14, color: Colors.greenAccent ))
                              ],
                            ),
                          ],
                        ),
                      ),
                    ],
                ),
              
              
                          ),
                          SizedBox(height:10),
              
                          Divider(color: Colors.white,),
                          SizedBox(height:10),
              
                          IntrinsicHeight(
                                      child: Row(
                    children: <Widget>[
                      Container(
                        width: MediaQuery.of(context).size.width/2.1,
                        
                        child: Column(
                          children: [
                            Row(
                              children: [
                                Icon(Icons.electrical_services_outlined,color: Colors.white,size: 25,),
                                Text('Current Now',style: TextStyle(fontSize: 12, color: Colors.white,fontWeight:FontWeight.w100 ),)
                              ],
                            ),
                            Row(
                              children: [
                                
                                Text(snapshot.data.currentAverage.toString(),style: TextStyle(fontSize: 14, color: Colors.greenAccent ),)
                              ],
                            ),
                          ],
                        ),
                      ),
                      VerticalDivider(
                        color: Colors.white,
                        thickness: 0.7,
                        
                      ),
                      Container(
                        width: MediaQuery.of(context).size.width/2.1,
                        
                        child: Column(
                          children: [
                            Row(
                              children: [
                                Icon(Icons.thermostat_sharp,color: Colors.white,size: 25,),
                                Text('Temperature',style: TextStyle(fontSize: 12, color: Colors.white, fontWeight:FontWeight.w100 ),)
                              ],
                            ),
                            Row(
                              children: [
                                
                                Text(snapshot.data.temperature.toString()+"C",style: TextStyle(fontSize: 14, color: Colors.greenAccent ),)
                              ],
                            ),
                          ],
                        ),
                      ),
                    ],
                ),
                          ),



                          
                ],
              ) : LinearProgressIndicator(backgroundColor: Colors.amber);
  }
),



                  
                      
                        
                    ],
                  ),
              ),
                    
              ):MyApp();
        }
      ),
            ],
          ),
    );
  }
  }
