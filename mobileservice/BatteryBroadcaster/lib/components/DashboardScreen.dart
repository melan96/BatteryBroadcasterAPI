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
    Future<AndroidBatteryInfo> myFuture;

  Future<AndroidBatteryInfo> checkingInfo() async{
   // Access current battery health - Android
   print("Battery Health: ${(await BatteryInfoPlugin().androidBatteryInfo).currentAverage}");
   AndroidBatteryInfo somevalue = await BatteryInfoPlugin().androidBatteryInfo;
   return await somevalue;
   
  }

@override
  void initState() {
    // TODO: implement initState
    super.initState();

     myFuture = checkingInfo();
  }
  @override
  Widget build(BuildContext context)  {

    

    return SafeArea(child: Column(

      
      
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
            Padding(
              padding: const EdgeInsets.all(10.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
  
                  Text('BatteryAPI',style: TextStyle(color: Colors.white, fontSize: 25)),
                  Icon(Icons.supervised_user_circle_sharp,size: 35,color: Colors.amberAccent,)
                ],
              ),
            ),

               Container(
                constraints: BoxConstraints(maxHeight: MediaQuery.of(context).size.width*0.7,minWidth: MediaQuery.of(context).size.width*0.7),
                 child: FutureBuilder<AndroidBatteryInfo>(
                  
                  future:  myFuture,
                  // ignore: missing_return
                  builder: (context, snapshot) {
                    
                    print(snapshot.data.technology);

                    return snapshot.data.batteryLevel == 100 ? 
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
                                color:Color(0x15000000),
                                fontSize: 60.0,

                                fontWeight: FontWeight.bold),
                          ),
                        ),):Text('data');
                  }
              ),
               ),
            
        
           
            
        ],
      ),
          
    );
  }
}
