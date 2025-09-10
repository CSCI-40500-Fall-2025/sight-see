import 'package:flutter/material.dart';

class PostView extends StatefulWidget {
  const PostView({super.key});

  @override
  State<PostView> createState() => _PostViewState();
}

class _PostViewState extends State<PostView> {
  final postWidth = .8;

  // Sample comments
  final List<Comment> sampleComments = [
    Comment(
      username: 'SwiftTiger23',
      comment:
          'Like a tall oak, standing strong through all seasons, weathering storms and providing shelter for those around it.',
    ),
    Comment(
      username: 'CalmEagle77',
      comment:
          'A gentle willow, bending gracefully in the wind, showing that flexibility is just as powerful as strength.',
    ),
    Comment(
      username: 'HappyNinja9',
      comment:
          'Quick as a pine’s needle in the breeze, agile and sharp—always adapting swiftly to changing environments.',
    ),
    Comment(
      username: 'BrightWizard45',
      comment:
          'Wise as an ancient cedar, full of stories and strength, its roots digging deep into the earth, symbolizing timeless knowledge.',
    ),
    Comment(
      username: 'BoldFalcon12',
      comment:
          'Rooted like a mighty redwood, unshakable and proud, towering above the forest as a beacon of resilience and endurance.',
    ),
    Comment(
      username: 'SilentDragon8',
      comment:
          'Mysterious as a shadowy mangrove in twilight, thriving where others cannot, quietly supporting diverse life around it.',
    ),
    Comment(
      username: 'MightyWolf56',
      comment:
          'Resilient like a birch, thriving even in tough climates, its white bark shining bright amidst the snow.',
    ),
    Comment(
      username: 'FiercePhoenix34',
      comment:
          'Renewing like a maple’s leaves in autumn fire, constantly shedding the old to welcome vibrant new growth.',
    ),
    Comment(
      username: 'CleverShark90',
      comment:
          'Ever-growing like a young sapling reaching for the sun, full of potential and eager to flourish with every passing day.',
    ),
    Comment(
      username: 'BraveLion11',
      comment:
          'Standing tall like a sequoia, a guardian of the forest, silently watching over generations and inspiring awe in all who see it.',
    ),
  ];

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
                Navigator.pop(context);
              },
              icon: Icon(Icons.arrow_back),
            );
          },
        ),
        title: Container(
          height: MediaQuery.of(context).size.height * .1,
          width: MediaQuery.of(context).size.width * .4,
          color: Color.fromARGB(255, 217, 217, 217),
          alignment: Alignment.center,
          child: const Text(
            "Post",
            style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold),
          ),
        ),
        centerTitle: true,
      ),

      body: Center(
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Top portion that has profile pic and name()
              Container(
                width: MediaQuery.of(context).size.width * postWidth,
                color: Color.fromARGB(255, 217, 217, 217),
                child: Row(
                  children: [
                    Padding(
                      padding: const EdgeInsets.fromLTRB(8, 0, 0, 0),
                      child: Icon(Icons.account_circle, color: Colors.red),
                    ),
                    SizedBox(width: MediaQuery.of(context).size.width * .05),
                    Text(
                      "random_person",
                      style: TextStyle(color: Colors.black),
                    ),
                  ],
                ),
              ),

              // the image the post is about
              Container(
                color: Colors.white,
                width: MediaQuery.of(context).size.width * postWidth,
                child: Image.asset("assets/img/tree.png"),
              ),

              // like button + post information
              Container(
                width: MediaQuery.of(context).size.width * postWidth,
                color: Color.fromARGB(255, 217, 217, 217),
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Row(
                    children: [
                      Icon(Icons.thumb_up, color: Colors.grey),
                      SizedBox(width: MediaQuery.of(context).size.width * .05),
                      Container(
                        alignment: Alignment.topRight,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Posted 09/08/2024"),
                            Text("5 minutes ago"),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),

              // Caption of the picture
              Container(
                padding: const EdgeInsets.all(8),
                width: MediaQuery.of(context).size.width * postWidth,
                color: Color.fromARGB(255, 217, 217, 217),
                child: Text(
                  "Just had to share this—found the most incredible tree on my walk today 🌳✨. Look at those twisted branches reaching out like they’re telling a secret. It’s been standing here for who knows how long, watching everything change around it. Makes me think about how sometimes, all you need is to stay rooted and keep growing, no matter what. Anyone else find peace in places like this? #TreeMagic #NatureVibes #RootedAndStrong",
                ),
              ),

              // Spacer
              SizedBox(height: MediaQuery.of(context).size.height * .02),

              // Comment Header
              Container(
                width: MediaQuery.of(context).size.width * postWidth,
                decoration: BoxDecoration(
                  color: Color.fromARGB(255, 217, 217, 217),
                  border: Border.all(
                    color: Colors.black,
                    style: BorderStyle.solid,
                    width: 2,
                  ),
                ),
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(8.0, 8, 8, 3),
                  child: Text("Comments:"),
                ),
              ),

              // Comments
              SizedBox(
                width: MediaQuery.of(context).size.width * postWidth,
                child: ListView.builder(
                  physics: const NeverScrollableScrollPhysics(),
                  itemCount: sampleComments.length,
                  shrinkWrap: true,
                  itemBuilder: (context, index) {
                    final current = sampleComments[index];
                    return CommentBox(
                      username: current.username,
                      comment: current.comment,
                      postWidth: MediaQuery.of(context).size.height * postWidth,
                    );
                  },
                ),
              ),

              // Space
              SizedBox(height: MediaQuery.of(context).size.height * .02),
            ],
          ),
        ),
      ),
    );
  }
}

// Class that holds Comment Information
class Comment {
  const Comment({required this.username, required this.comment});

  final String username;
  final String comment;
}

// Class to build a comment box
class CommentBox extends StatelessWidget {
  const CommentBox({
    super.key,
    required this.username,
    required this.comment,
    required this.postWidth,
  });
  final String username;
  final String comment;
  final double postWidth;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: postWidth,
      color: Color.fromARGB(255, 217, 217, 217),
      padding: EdgeInsets.all(8),
      child: Row(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(8, 0, 0, 0),
            child: Icon(Icons.account_circle, color: Colors.black),
          ),
          SizedBox(width: MediaQuery.of(context).size.width * .05),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  username,
                  style: TextStyle(
                    color: Colors.black,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Text(comment, style: TextStyle(color: Colors.black)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
