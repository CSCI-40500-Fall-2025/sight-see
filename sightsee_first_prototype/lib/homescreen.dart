import 'package:flutter/material.dart';
import 'package:sightsee_first_prototype/post.dart';

class Homescreen extends StatefulWidget {
  const Homescreen({super.key});

  @override
  State<Homescreen> createState() => _HomescreenState();
}

class _HomescreenState extends State<Homescreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color.fromARGB(255, 243, 183, 93),
      appBar: AppBar(
        backgroundColor: Color.fromARGB(255, 243, 183, 93),
        leading: Builder(
          builder: (context) {
            return IconButton(
              onPressed: () {
                Scaffold.of(context).openDrawer();
              },
              icon: Icon(Icons.menu),
            );
          },
        ),
        title: Container(
          height: MediaQuery.of(context).size.height * .1,
          width: MediaQuery.of(context).size.width * .4,
          color: Color.fromARGB(255, 217, 217, 217),
          alignment: Alignment.center,
          child: const Text(
            "SightSee",
            style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold),
          ),
        ),
        centerTitle: true,
      ),
      drawer: SizedBox(
        height: MediaQuery.of(context).size.height * .5,

        child: Drawer(
          backgroundColor: Color.fromARGB(255, 243, 183, 93),

          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // go back button
              Container(
                color: Color.fromARGB(255, 193, 9, 239),
                child: IconButton(
                  onPressed: () {
                    Navigator.pop(context);
                  },
                  icon: Icon(Icons.arrow_back),
                ),
              ),

              // My posts button
              TextButton(
                onPressed: () {},
                child: Container(
                  height: MediaQuery.of(context).size.height * .1,
                  width: MediaQuery.of(context).size.width * .5,
                  color: Color.fromARGB(255, 193, 9, 239),
                  alignment: Alignment.center,
                  child: const Text(
                    "My Posts",
                    style: TextStyle(
                      fontSize: 30,
                      fontWeight: FontWeight.bold,
                      color: Colors.black,
                    ),
                  ),
                ),
              ),

              // Settings button
              TextButton(
                // No settings page, so display message
                onPressed: () {
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text("Coming Soon!"),
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
                    "Settings",
                    style: TextStyle(
                      fontSize: 30,
                      fontWeight: FontWeight.bold,
                      color: Colors.black,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
      body: Column(
        children: [
          SizedBox(height: MediaQuery.of(context).size.height * .05),
          // Place holder for map feature
          GestureDetector(
            onTap: () {
              // move to post page
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => PostView()),
              );
            },

            child: Image.asset("assets/img/map.png"),
          ),
          SizedBox(height: MediaQuery.of(context).size.height * .2),
          Align(
            alignment: AlignmentGeometry.bottomCenter,

            // Take a Picture button
            child: TextButton(
              // Display Message
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text("Coming Soon!"),
                    duration: Duration(seconds: 2),
                    backgroundColor: Colors.black,
                  ),
                );
              },
              child: Container(
                height: MediaQuery.of(context).size.height * .1,
                width: MediaQuery.of(context).size.width * .5,
                color: Color.fromARGB(255, 217, 217, 217),
                alignment: Alignment.center,
                child: const Text(
                  "Take A Picture",
                  style: TextStyle(fontSize: 30, color: Colors.black),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
