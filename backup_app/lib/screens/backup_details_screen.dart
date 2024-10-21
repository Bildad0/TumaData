import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class BackupDetailsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final int backupId = ModalRoute.of(context)!.settings.arguments as int;

    return Scaffold(
      appBar: AppBar(title: Text('Backup Details')),
      body: FutureBuilder(
        future: _fetchBackupDetails(backupId),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else {
            final backup = snapshot.data;
            return Padding(
              padding: EdgeInsets.all(16.0),
              child: Column(
                children: [
                  Text(backup['name'], style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
                  SizedBox(height: 10),
                  Text('Created on: ${backup['date']}'),
                  SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: () => _restoreBackup(backupId),
                    child: Text('Restore Backup'),
                  ),
                ],
              ),
            );
          }
        },
      ),
    );
  }

  Future _fetchBackupDetails(int id) async {
    final response = await http.get(Uri.parse('https://your-api.com/api/backups/$id'));
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load backup details');
    }
  }

  Future _restoreBackup(int id) async {
    final response = await http.post(Uri.parse('https://your-api.com/api/backups/restore/$id'));
    if (response.statusCode == 200) {
      // Handle successful restoration
      print('Backup restored!');
    } else {
      // Handle error
      print('Failed to restore backup');
    }
  }
}
