"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
/*const diaryEntries: DiaryEntry[] = [
    {
      "id": 1,
      "date": "2017-01-01",
      "weather": "rainy",
      "visibility": "poor",
      "comment": "Pretty scary flight, I'm glad I'm alive"
    },
    {
      "id": 2,
      "date": "2017-04-01",
      "weather": "sunny",
      "visibility": "good",
      "comment": "Everything went better than expected, I'm learning much"
    },
    
];*/
const data = [
    {
        "id": 1,
        "date": "2017-01-01",
        "weather": "rainy",
        "visibility": "poor",
        "comment": "Pretty scary flight, I'm glad I'm alive"
    },
    {
        "id": 2,
        "date": "2017-04-01",
        "weather": "sunny",
        "visibility": "good",
        "comment": "Everything went better than expected, I'm learning much"
    },
];
const diaryEntries = data.map(obj => {
    const object = (0, utils_1.toNewDiaryEntry)(obj);
    object.id = obj.id;
    return object;
});
exports.default = diaryEntries;
