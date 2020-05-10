lines.forEach((line, i) => {
  console.log("i:", i);
  let lineArr = Object.keys(line);
  lineArr.forEach((key, l) => {
    console.log("key:", key);
    if (key === "1" || key === "2") {
      /////////if either array is empty, push a 1-syllable verb/////////
      if (
        key === "1" &&
        lines[i][key]["arr"].length === 0 &&
        lines[i][parseFloat(key) + 1]["verb"] === false &&
        //rand4 === 1 &&
        lines[i]["syllables"] > 0
      ) {
        console.log("pushed a verb");
        lines[i][key]["arr"].push(randomVerb_p1.word);
        lines[i][key]["verb"] = true;
        lines[i]["syllables"] = lines[i]["syllables"] -=
          randomVerb_p1.syllables;
      }




















handleSubmit = (e) => {
  e.preventDefault();

  let firstLine = ``; //{};
  let secondLine = ``; //{};
  let thirdLine = ``; //{};

  const {
    animal1,
    verb_a,
    place,
    adjective,
    verb_p1,
    animal2,
    adjective2,
  } = this.state;

  const articlesBank = ["the", "a"];

  let randomArticle =
    articlesBank[Math.floor(Math.random() * articlesBank.length)];

  const helperBank = ["will", "did", "should", "could", "might"];

  let randomHelper1 = helperBank[Math.floor(Math.random() * helperBank.length)];

  console.log(randomHelper1);

  const verb_pArrWords = verbs_p.filter((v) => v.present.syllables === 1);

  const randomVerb_p =
    verb_pArrWords[Math.floor(Math.random() * verb_pArrWords.length)].present;

  //firstLine logic
  if (animal1.syllables === 4) {
    const firstLine1 =
      randomVerb_p.word[0].toUpperCase() +
      randomVerb_p.word.slice(1) +
      ", " +
      animal1.name;

    const firstLine2 =
      animal1.name[0].toLowerCase() +
      animal1.name.slice(1) +
      "s " +
      randomVerb_p.word;

    firstLine = [firstLine1, firstLine2][[Math.floor(Math.random() * 2)]];
  }

  //secondLine logic
  if (place.syllables === 3 && verb_a.syllables === 3) {
    if (
      (randomArticle === "a" && place.word[0].match("^[aieouAIEOU].*")) ||
      (randomArticle === "a" && adjective.word[0].match("^[aieouAIEOU].*"))
    ) {
      randomArticle = "an";
    }
    secondLine = verb_a.word + " " + randomArticle + " " + place.word;
  } else if (place.syllables === 3 && verb_a.syllables === 2) {
    secondLine =
      verb_a.word +
      " " +
      randomArticle +
      " " +
      adjective2.word +
      " " +
      place.word;
  } else if (place.syllables === 3 && verb_a.syllables === 1) {
    const adjArr = adjectives
      .filter((ad) => ad.syllables === 1 && ad.word !== adjective2.word)
      .map((ad) => ad.word);

    const randomAdj = adjArr[Math.floor(Math.random() * adjArr.length)];

    secondLine =
      verb_a.word +
      " " +
      randomArticle +
      " " +
      randomAdj +
      ", " +
      adjective2.word +
      " " +
      place.word;
  }

  //thirdLine logic

  console.log(randomHelper1);

  if (animal2.syllables === 2 && verb_p1.syllables === 2) {
    thirdLine = animal2.name + " " + randomHelper1 + " " + verb_p1.word;
  } else if (animal2.syllables === 1 && verb_p1.syllables === 2) {
    const adjArtArr = adjectives
      .filter((ad) => ad.syllables === 2)
      .map((ad) => ad.word)
      .concat(articlesBank);
    const firstW = adjArtArr[Math.floor(Math.random() * adjArtArr.length)];
    console.log(adjArtArr);
    console.log(firstW);

    thirdLine = firstW + " " + animal2.name + "s " + verb_p1.word;
  } else if (animal2.syllables === 1 && verb_p1.syllables === 1) {
    const adjArr = adjectives.filter((ad) => ad.syllables === 2);
    const adj2 = adjArr[Math.floor(Math.random() * adjArr.length)];

    console.log(adjArr);
    console.log(adj2);
    console.log(randomHelper1);

    thirdLine =
      adj2.word + " " + animal2.name + " " + randomHelper1 + " " + verb_p1.word;
  } else if (animal2.syllables === 2 && verb_p1.syllables === 1) {
    thirdLine =
      randomArticle +
      " " +
      animal2.name +
      " " +
      randomHelper1 +
      " " +
      verb_p1.word;
  }

  console.log("firstline", firstLine);
  console.log("secondline", secondLine);
  console.log("thirdline", thirdLine);

  const randomLine = [firstLine, thirdLine][Math.floor(Math.random() * 2)];

  let haikuHere = [
    randomLine + ";",
    secondLine,
    [firstLine, thirdLine].filter((i) => i !== randomLine) + ".",
  ];

  this.context.updateHaiku(haikuHere, this.props.history);
};
