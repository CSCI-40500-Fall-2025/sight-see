import 'package:flutter/material.dart';
import 'package:sightsee_first_prototype/homescreen.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  late TextEditingController _username;
  late TextEditingController _password;

  late bool bothFieldsFilled;

  @override
  void initState() {
    _username = TextEditingController();
    _password = TextEditingController();
    bothFieldsFilled = false;

    // Create listeners for both text fields
    _username.addListener(updateLoginButtonColor);
    _password.addListener(updateLoginButtonColor);
    super.initState();
  }

  // Function to update Login button color, based on if username and password fields have something in them
  void updateLoginButtonColor() {
    setState(() {
      bothFieldsFilled = _username.text.isNotEmpty && _password.text.isNotEmpty;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color.fromARGB(255, 243, 183, 93),
      body: Center(
        child: Column(
          children: [
            SizedBox(height: MediaQuery.of(context).size.height * .2),
            Container(
              height: MediaQuery.of(context).size.height * .1,
              width: MediaQuery.of(context).size.width * .7,
              color: Color.fromARGB(255, 217, 217, 217),
              alignment: Alignment.center,
              child: const Text("SightSee", style: TextStyle(fontSize: 48)),
            ),

            SizedBox(height: MediaQuery.of(context).size.height * .05),
            Container(
              color: Colors.blue,
              width: MediaQuery.of(context).size.width * .7,
              padding: EdgeInsets.all(10),
              child: TextField(
                controller: _username,
                cursorColor: Colors.black,
                decoration: InputDecoration(
                  label: Text(
                    "Enter username",
                    style: TextStyle(color: Colors.black),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderSide: BorderSide(color: Colors.black),
                  ),
                  disabledBorder: OutlineInputBorder(
                    borderSide: BorderSide(color: Colors.black),
                  ),
                  border: OutlineInputBorder(
                    borderSide: BorderSide(color: Colors.black),
                  ),
                ),
              ),
            ),
            SizedBox(height: MediaQuery.of(context).size.height * .02),

            Container(
              color: Colors.blue,
              width: MediaQuery.of(context).size.width * .7,
              padding: EdgeInsets.all(10),
              child: TextField(
                controller: _password,
                cursorColor: Colors.black,
                decoration: InputDecoration(
                  label: Text(
                    "Enter password",
                    style: TextStyle(color: Colors.black),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderSide: BorderSide(color: Colors.black),
                  ),
                  disabledBorder: OutlineInputBorder(
                    borderSide: BorderSide(color: Colors.black),
                  ),
                  border: OutlineInputBorder(
                    borderSide: BorderSide(color: Colors.black),
                  ),
                ),
              ),
            ),

            SizedBox(height: MediaQuery.of(context).size.height * .05),

            TextButton(
              // When the login button is pressed: check if both fields have been filled, and proceed
              onPressed: () {
                if (bothFieldsFilled) {
                  // Move on to next page, while ensuring that all prev. pages are destroyed. Ensures that user can't go back to Login Page
                  Navigator.pushAndRemoveUntil(
                    context,
                    MaterialPageRoute(builder: (context) => Homescreen()),
                    (Route<dynamic> route) => false,
                  );
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text("Input Something!"),
                      duration: Duration(seconds: 2),
                      backgroundColor: Colors.black,
                    ),
                  );
                }
              },
              child: Container(
                height: MediaQuery.of(context).size.height * .1,
                width: MediaQuery.of(context).size.width * .5,
                color: bothFieldsFilled ? Colors.yellow : Colors.grey,
                alignment: Alignment.center,
                child: const Text(
                  "Login",
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.black,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
