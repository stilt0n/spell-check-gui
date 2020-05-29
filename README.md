[I have this project deployed on netlify and you can check it out there](https://spell-check-stilt0n.netlify.app/)

## About

A while back I made a project that is based on this [Peter Norvig blog post](https://norvig.com/spell-correct.html), where he talks about the basics of how to write a spelling corrector.  What I think is really cool about Norvig's spelling corrector is that it showcases how little code you need to correct spelling at a basic level.  I wanted to try to see if I could write a JavaScript clone of that spelling corrector (Norvig's is written in Python) and keep it close to as few lines by taking advantage of map/filter/reduce methods and some of the more modern JavaScript features.  I think the code work pretty close to as short, but since I'm trying to emulate list comprehensions, sometimes I end up combining map and filter, which is probably not super effecient.  Nevertheless, for single words, this runs fast enough to use it in real time which is pretty cool.

This project is a remake of that my old [command line JavaScript spellchecker](https://github.com/stilt0n/Spell-Check).  I've converted the spelling corrector itself to TypeScript (a strange thing to do, since my original goal was brevity) and written a GUI for it in React.  The app listens for user input and updates its estimated correction each time you type a letter.  This is quite a bit of spell checking to do, and I'm pleasantly surprised how quickly the app performs.  It doesn't currently check sentences, and the app seems to run slow if you input a lot of characters.

I've also added a second spelling corrector to this app.  I haven't done much to test it at the moment so I've called it an experimental corrector, but it's
really just an extension of Norvig's version that is the same up to the decision rule.  In Norvig's, you prioritize minimizing edit distance and you break ties
among corrections with the same edit distance based on how frequently they occur.  In my experimental version you give your entire list of candidates to a
bigram language model along with the rest of the sentence, and choose the correction that results in the sentence that has the highest probability according to
the language model.  The language model is pretrained on three books from [project gutenberg](https://www.gutenberg.org/) (Great Expectations, Alice's Adventures in Wonderland and
Treasure Island) and then exported for use in other modules.  I wouldn't usually write a language model in TypeScript, and usually I'd want to use some sort
of Counter class.  So I built a counter utility class to make the language model easier to implement.  The Counter is not generic and only counts strings.
TypeScript allows for generics, but only strings and numbers can be used as indices, which I think would make implementing a generic counter sort of
difficult. 

### A note about the highlighting:
At the moment, my app is setup to highlight differences between the original word and the corrected word in red.  I think it's a pretty cool feature, but it'd be even cooler if it actually highlighted the corrections.  For this it'd need to work a little differently because a word can be corrected by using insertion or deletion.  I'd also want to add an additional color (or maybe use strikethroughs) to signify when a word has been deleted.
