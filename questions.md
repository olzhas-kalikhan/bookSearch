Questions:

1. How long did you spend on the coding assignment?
   a. What would you add to your solution if you had more time?
   b. If you didn&#39;t spend much time on the coding test, then use this as an opportunity to
   explain what you would add.

2. What was the most useful feature that was added to the latest version of your chosen
   language? Please include a snippet of code that shows how you&#39;ve used it.
3. How would you track down a performance issue in production? Have you ever had to do this?
4. How would you improve the API that you just used?
5. Please describe yourself using correctly formatted JSON.

Answers:

1. 14-16 Hours
   1.a. I would add:

   - functionality to search by authors or link to authors on book list. It will show all books published by that author.
   - add pagination for more results or send api call for next page on scroll down; I used only 100 results per search.
   - add table view instead of cards and functionality to save/mark books.

1.b. I would add more test code for more html elements to be present on the screen, and test its values to correspond to mock data.

2. One of the most useful features is optional chaining:
   ```js
   author_name?.map((author, idx) => (
     <h3 key={`${bookDataKey}-${idx}-author`}>{author}</h3>
   ))
   ```
3. I would use dev tools to track loading time and implemntation issues. Review code to find more efficient solutions.

4. I would reduce redundant data stored, like first publish year and array of publish years. Also add realtions to access minor details of the book, it will help to reduce overall size of response. Minor data can be accessed by making separate call through book key. I assume that data would be rarely accessed therefore extra calls wouldn't affect overalt api call rates.

5)

```json
{
  "name": "Olzhas Kalikhan",
  "education": "Diploma in Computer Programming 2020, Seneca Collge",
  "languages": ["English", "Russian"],
  "programmingLanguages": ["JavaScript", "C/C++", "Java"],
  "favariteTechnologies": ["ReactJS", "NodeJS", "SocketIO"],
  "softSkills": [
    "cooperation",
    "teamwork",
    "communication",
    "attention to details",
    "time management",
    "fast learning",
    "open minded"
  ],
  "hobbies": [
    "video games",
    "chess",
    "table tennis",
    "Youtube/Twitch",
    "Playing guitar",
    "card tricks"
  ],
  "videoGames": ["Dota 2", "Valorant", "Tetris"]
}
```
