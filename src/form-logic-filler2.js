import formHelpers from "./form-helpers";

export default function filler2(lines, adjs2, adjectivesArr) {
  lines.forEach((line, i) => {
    console.log(line);
    while (line["syllables"] > 0) {
      let lineArr = Object.keys(line);
      lineArr.forEach((key) => {
        if (key === "1" || key || "2") {
          if (
            lines[i][key]["verb"] === false &&
            lines[i][key]["arr"].length > 0 &&
            (adjs2.includes(lines[i][key]["arr"][0]) ||
              adjs2.includes(lines[i][key]["arr"][1]) ||
              adjs2.includes(lines[i][key]["arr"][2]) ||
              adjs2.includes(lines[i][key]["arr"][3]))
          ) {
            let adj = adjectivesArr
              .filter((adj) => adj.syllables <= lines[i]["syllables"])
              .splice([Math.floor(Math.random() * adjectivesArr.length)], 1)[0];

            if (adj) {
              lines[i][key]["arr"].unshift(adj.word.concat(","));

              lines[i]["syllables"] = lines[i]["syllables"] -= adj.syllables;
            }
          } else if (
            lines[i][key]["verb"] === false &&
            lines[i]["syllables"] > 0 &&
            lines[i][key]["arr"].length > 0
          ) {
            let adjectives = adjectivesArr.filter(
              (a) => a.syllables <= lines[i]["syllables"]
            );
            let adj = adjectives.splice(
              [Math.floor(Math.random() * adjectives.length)],
              1
            )[0];

            lines[i][key]["arr"].unshift(adj.word);

            lines[i]["syllables"] = lines[i]["syllables"] -= adj.syllables;
          }
          if (
            key === "1" &&
            lines[i]["art"] === false &&
            lines[i][key]["arr"].length > 0
          ) {
            let art = formHelpers.randomArticle();

            lines[i][key]["arr"].unshift(art);
            lines[i][key]["art"] = art;

            lines[i]["syllables"] = lines[i]["syllables"] -= 1;
          }
        }
      });
    }
  });
}
