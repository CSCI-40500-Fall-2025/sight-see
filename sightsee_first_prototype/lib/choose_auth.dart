import 'package:flutter/material.dart';
import 'package:sightsee_first_prototype/login.dart';

class ChooseAuth extends StatelessWidget {
  const ChooseAuth({super.key});

  // Function to show message at bottom of screen

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

            TextButton(
              // When Existing User Button is Pressed, move to the next page
              onPressed: () {
                Navigator.of(
                  context,
                ).push(MaterialPageRoute(builder: (context) => LoginPage()));
              },
              child: Container(
                height: MediaQuery.of(context).size.height * .1,
                width: MediaQuery.of(context).size.width * .5,
                color: Color.fromARGB(255, 193, 9, 239),
                alignment: Alignment.center,
                child: const Text(
                  "New User",
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.black,
                  ),
                ),
              ),
            ),

            SizedBox(height: MediaQuery.of(context).size.height * .05),

            TextButton(
              // When New User Button is Pressed, display message that feature is not there yet
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Feature Coming Soon!'),
                    duration: Duration(seconds: 2),
                    backgroundColor: Colors.black,
                  ),
                );
              },
              child: Container(
                height: MediaQuery.of(context).size.height * .1,
                width: MediaQuery.of(context).size.width * .5,
                color: Color.fromARGB(255, 193, 9, 239),
                alignment: Alignment.center,
                child: const Text(
                  "Existing User",
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
