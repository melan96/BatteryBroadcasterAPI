
import 'package:BatteryBroadcaster/components/LoginPage.dart';
import 'package:BatteryBroadcaster/controllers/userauth.dart';
import 'package:BatteryBroadcaster/main.dart';
import 'package:battery_info/battery_info_plugin.dart';
import 'package:battery_info/model/android_battery_info.dart';
import 'package:battery_info/enums/charging_status.dart';

import 'package:flutter/material.dart';
import 'package:waveprogressbar_flutter/waveprogressbar_flutter.dart';

class Dashboard extends StatefulWidget {
  @override
  _DashboardState createState() => _DashboardState();
  var isValid = false;
}

class _DashboardState extends State<Dashboard> {

    double batteryVal=0.0;
    String authID;
    Future<AndroidBatteryInfo> myFuture;
    List<String> chargingStatus =  ['Charging', 'Discharging', 'Full', 'Unknown' ];

  Future<AndroidBatteryInfo> checkingInfo() async{
   // Access current battery health - Android
   print("Battery Health: ${(await BatteryInfoPlugin().androidBatteryInfo).currentAverage}");
   AndroidBatteryInfo somevalue = await BatteryInfoPlugin().androidBatteryInfo;
   return await somevalue;
   
  }

  Future<Stream<AndroidBatteryInfo>> getBatteryStream() async{
    Stream.periodic(Duration(seconds: 3), (_){
      return BatteryInfoPlugin().androidBatteryInfo.asStream();
    });
  }

@override
  void initState() {
    // TODO: implement initState
    super.initState();

    

     myFuture = checkingInfo();
    
    
  }
  @override
  Widget build(BuildContext context)  {

    return SafeArea(
          child: FutureBuilder<String>(
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

                            

                            Navigator.push(context, MaterialPageRoute(builder: (context)=>MyApp()));
                          },
                          child: Icon(Icons.supervised_user_circle_sharp,size: 30,color: Colors.amberAccent,))
                        ],
                      ),
                    ),
                      

                       Container(
                        constraints: BoxConstraints(maxHeight: MediaQuery.of(context).size.width*0.7,minWidth: MediaQuery.of(context).size.width*0.7),
                         child: StreamBuilder<AndroidBatteryInfo>(
                          
                          stream:  Stream.periodic(Duration(seconds: 120)).asyncMap((event) => checkingInfo()),
                          // ignore: missing_return
                          builder: (context, snapshot) {
                            
                            print(snapshot.data.currentNow);

                            return snapshot.data.batteryLevel <= 100 ? 
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
                                ),):CircularProgressIndicator(backgroundColor: Colors.amberAccent,);

                                
                          }
                      ),
                       ),
                     
                     SizedBox(height:40),
                     Text('📦 Info',style: TextStyle(color: Colors.white, fontSize: 15)),
SizedBox(height:40),

StreamBuilder<AndroidBatteryInfo>(
  stream: Stream.periodic(Duration(seconds: 2)).asyncMap((event) => checkingInfo()),
  builder: (context, snapshot) {

          return snapshot.data.batteryLevel > 0 ?     Column(
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
          ) : CircularProgressIndicator(backgroundColor: Colors.amber,);
  }
),

StreamBuilder<AndroidBatteryInfo>(stream: Stream.periodic(Duration(seconds: 20)).asyncMap((event) => checkingInfo(),), builder: (context,snapshot){
  return Text(chargingStatus.elementAt(snapshot.data.chargingStatus.index));
},)

              
                  
                    
                ],
              ),
          ),
                
          ):MyApp();
        }
      ),
    );
  }
}
