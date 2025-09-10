import 'package:flutter/material.dart';
import "package:sightsee_first_prototype/choose_auth.dart";

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(home: ChooseAuth());
  }
}
