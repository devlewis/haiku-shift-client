const handlersService = {
  handleChangeAnimal1(e) {
    if (e.target.value) {
      this.setState({
        animal1: {
          word: e.target.value,
          syllables: parseFloat(
            this.state.animalsArr.find((a) => a.word === e.target.value)
              .syllables
          ),
        },
      });
    }
  },

  handleChangeVerbA(e) {
    if (e.target.value) {
      this.setState({
        verb_a: {
          word: e.target.value,
          syllables: parseFloat(
            verbs_a.find((v) => v.present.word === e.target.value).present
              .syllables
          ),
        },
      });
    }
  },

  handleChangePlace(e) {
    if (e.target.value) {
      this.setState(
        {
          place: {
            word: e.target.value,
            syllables: parseFloat(
              places.find((p) => p.word === e.target.value).syllables
            ),
          },
        },
        () => {
          if (
            this.state.animal1.syllables === 4 &&
            this.state.place.syllables === 3
          ) {
            this.setState({
              verbs_aArr: verbs_a.filter((v) => v.present.syllables < 4),
            });
          }
        }
      );
    }
  },

  handleChangeAdjective(e) {
    if (e.target.value) {
      this.setState({
        adjective: {
          word: e.target.value,
          syllables: parseFloat(
            adjectives.find((ad) => ad.word === e.target.value).syllables
          ),
        },
      });
    }
  },

  handleChangeAdjective2(e) {
    if (e.target.value) {
      this.setState({
        adjective2: {
          word: e.target.value,
          syllables: parseFloat(
            adjectives.find((ad) => ad.word === e.target.value).syllables
          ),
        },
      });
    }
  },

  handleChangeVerbP1(e) {
    if (e.target.value) {
      this.setState(
        {
          verb_p1: {
            word: e.target.value,
            syllables: parseFloat(
              verbs_p.find((v) => v.present.word === e.target.value).present
                .syllables
            ),
          },
        },
        () => {
          if (this.state.verb_p1.syllables === 3) {
            this.setState({
              adjectivesArr2: adjectives.filter((ad) => ad.syllables === 1),
            });
          }
        }
      );
    }
  },

  handleChangeAnimal2(e) {
    if (e.target.value) {
      this.setState({
        animal2: {
          word: e.target.value,
          syllables: parseFloat(
            this.state.animalsArr.find((a) => a.word === e.target.value)
              .syllables
          ),
        },
      });
    }
  },

  handleChangeVerbP2(e) {
    if (e.target.value) {
      this.setState({
        verb_p2: {
          word: e.target.value,
          syllables: parseFloat(
            verbs_p.find((v) => v.present.word === e.target.value).present
              .syllables
          ),
        },
      });
    }
  },
};

export default handlersService;
