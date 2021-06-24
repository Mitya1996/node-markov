/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    const words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== '');
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let chains = new Map();
    //loop through this.words
    for (let i=0; i<this.words.length; i++) {
		let word = this.words[i];
		let nextWord = this.words[i+1] || null;
        //if chains.get(words[i]) exists already, push the i+1 word on to the possible-next-word-set
        if (chains.has(word)) chains.get(word).push(nextWord);
    	//else chains.set(words[i], [words[i+1]])
		else chains.set(word, [nextWord]);		
    }
    this.chains = chains;
  }

  //random choice from array
  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
	let output = [];
	//first key is random
	let randomKey = MarkovMachine.choice(Array.from(this.chains.keys()));
	output.push(randomKey);

	let nextWord;

	//keep adding words onto the output until it grows to numWords or null is reached 
    while (output.length < numWords && nextWord !== null) {
		let lastWord = output[output.length - 1];
		let possibleNextWords = this.chains.get(lastWord); //array
		nextWord = MarkovMachine.choice(possibleNextWords);
		output.push(nextWord);
	}
	return output.join(" ").trim();
  }
}

module.exports = {
	MarkovMachine,
};