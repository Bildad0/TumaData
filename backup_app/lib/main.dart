import 'package:flutter/material.dart';
import 'package:localstorage/localstorage.dart';
import 'screens/login_screen.dart';
import 'screens/register_screen.dart';
import 'screens/backups_screen.dart';
import 'screens/backup_details_screen.dart';

Future<void> main() async {
   await initLocalStorage();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Backup App',
      initialRoute: '/',
      routes: {
        '/': (context) => const LoginScreen(),
        '/register': (context) => const RegisterScreen(),
        '/backups': (context) => const BackupsScreen(),
        '/backupDetails': (context) => BackupDetailsScreen(),
      },
    );
  }
}
