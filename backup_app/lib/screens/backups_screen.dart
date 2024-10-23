import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class BackupsScreen extends StatefulWidget {
  const BackupsScreen({super.key});

  @override
  _BackupsScreenState createState() => _BackupsScreenState();
}

class _BackupsScreenState extends State<BackupsScreen> {
  List backups = [];

  @override
  void initState() {
    super.initState();
    _fetchBackups();
  }

  void _fetchBackups() async {
    final response = await http.get(
      Uri.parse('http://localhost:3000/backups'),
      headers: {
        'Authorization': 'Bearer your_jwt_token_here', // Add your token here
      },
    );
    if (response.statusCode == 200) {
      setState(() {
        backups = json.decode(response.body);
      });
    } else {
      // Handle error
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to fetch backups')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Your Backups')),
      body: ListView.builder(
        itemCount: backups.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text(backups[index]['name']),
            subtitle: Text(backups[index]['date']),
            onTap: () {
              Navigator.pushNamed(context, '/backupDetails', arguments: backups[index]['id']);
            },
          );
        },
      ),
    );
  }
}
