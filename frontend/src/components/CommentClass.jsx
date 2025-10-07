{
   /** Class to organize a Comment's information
    * Most likely remove when backend is set up
    */
}
export class Comment {
   constructor(id, text, username, date, likeCount, userLiked) {
      this.id = id;
      this.text = text;
      this.username = username;
      this.date = date;
      this.likes = likeCount;
      this.likeStatus = userLiked;
   }
}
