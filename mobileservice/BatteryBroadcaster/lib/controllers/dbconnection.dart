import 'package:mongo_dart/mongo_dart.dart';

String dbUrl = "mongodb+srv://root:toor@cluster0.rpbhq.mongodb.net/BatteryBroadcasterCluster?retryWrites=true&w=majority";

Future<Db> connectToDatabase() async{
 

 var DB = Db(dbUrl);
 await DB.open();

 return await DB;

}

findUserExist(String username) async {
  
  Db db = await Db(dbUrl).open();
  
 var response =  await db.collection('users').findOne(where.eq('username', username));
   print(response);
}