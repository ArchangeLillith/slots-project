<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="images/logo.png" alt="Logo" width="600" height="auto">
  </a>
</div>

<h3 align="center">Slots Project</h3>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
     <li><a href="#term-clarification">Terms Used</a></li>
     <li><a href="#ideals">Ideals for the Project</a></li>
     <li><a href="#symbols">Symbol Design</a></li>
     <li><a href="#side-game-stuff">Side Game Ideas</a></li>
     <li><a href="#algorithm-notes">Algorithm Notes</a></li>
     <li><a href="#file-structure">File Structure</a></li>
     <li><a href="#questions">Questions</a></li>
     <li><a href="#research">Research</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This will be a space to lay out the logistics while I'm working on this project

<!-- TERM CLARIFICATION -->

## Term Clarification

<br> -Symbols are the tiles on the reels of the slots</br>
<br> -Scatter symbols are symbols that are not regular symbols and can win even if they don't match the lines in play, see page 5 second bullet point in the Harrigan & Dixon paper</br>
<br> -Items are the bonus items dropped by the ruins, and are 'collected' on the side of the machine.</br>
<br> -Sticky Wilds: the symbol lands and 'sticks' in that spot. When the slot is rolled again, it moved vertically one space down and if it moves off the board is gone.</br>
<br> -Prime spins are discounted spins</br>
<br> -Picking game is a bonus game that lets you select something and gives you a prize off of it, typically payout is on average the same as what the spin would have been worth, example if the spin would have been calculated as 30 payout, the game averages a 30 payout. The base payout of the symbols doesn't matter when the game is complete, just a good way to calculate how much a bonus game should pay out to keep the balance of the payout percentages.</br>
<br> -Ruins items: Given by three/ three or more ruins, there are 4(?) slots to fill. Each item has a chance to drop, and if you get a dupe it gives you money instead.</br>

<!-- IDEALS -->

## Ideals

- Moving reels that can be stopped on button click
- Scoring system like a real slot machine
- Ability to bet min to max (this will multiply the return)
- Free or prime spins (prime spins are given as a reward for completing something and are cheaper spins)
- Jackpots
- Animations and sound bytes for
  <br>-Jackpots
  <br>-Spinning
  <br>-Stopping?
  <br>-Prizes, be it money payout or like a flip to prime spins
- UI to show:
  <br> -Money in
  <br>-Current bet
  <br>-Machine payout, ticking up both the payout and the money in as it does
  <br>-Line to display full payout, static
  <br>-A scrolling/fade in-out tooltips section for what symbols pay out ect
  <br>-Cash out button
  <br>-Perhaps a change game functionality? (Other game modes would be like the dragon slots game Bob never played with the picture, or other ideas like that. Sticky wilds, ect. The base game will only use ruins and base symbols)
  <br>-Lines in play if applicable, and bet per line if applicable
- Sound design for a small win (% less than 100 of total bet), medium win (% to be decided upon), large win (% to be decided upon), and jackpot. Perhaps separate sounds for ruins pick me as well.

<!-- SYMBOLS -->

## Symbols:

-15 can be displayed at a time

1. Otters
   Wilds
2. Cats
3. Moles
4. Vagabond
   Spin for which on your get?
5. Birds
6. WA
   Sticky wilds?
7. Corvids
   4-5 in a line, raid?
8. Lizards
   Blows up another symbol?
9. Ruins
   Three/ three in a row to explore, gives items

<!-- RUINS ITEMS -->

## Ruins Items

- Anvil
  - Changes one item, "crafts" it
- Sword
- Tea
  - Refresh one item in your stock
- Boot
- Bag
  - Can save a portion of the board

<!-- ALGORITHM NOTES -->

## Algorithm Notes

Keep in mind, what problems are we solving?

    function checkingForMatches(){
        * Check for anything that would override base payouts, like ruins or the image (different game mode). Tise(these) functions run, record stuff, then come back here to calculate the rest of the symbols
        * Check to calculate matches of base symbols
          * What symbols are matching?
          * Are the symbols in a winning position
            -Accounting for otters:
                (symbol == symbol ||
                symbol == otter)
          *!! How do we decide where to check?
          * If symbols match and are in position to score, what symbols are they (blacklist ruins in this as we have already checked that and we can store a variable from when we did saving where in the array they are and to ignore those)
          * Turn off mousedown events while the algorithm is running so no janky stuff can happen
    }

    function scoringAlgorithm(){
        * Passed values from checking algorithm
        * Values include
            -Ruins items
            -Money
            -Stats
        * For ruins, state management for (none)/(avaliable)/(exhausted)
            -Different visuals and sounds for each state change
        * Money += (variable passed in from checking algorithm)
        * Stats can be passed straight into the state that deals with them
            -Example, [crows += variable passed in from scoring loop] before loop variable is added to the cumulative variable that will be added into global MONEY variable
    }

    function scoringForRuins(){
        *
    }

<!-- Math behind the slots and choices for the two ways we could run this -->

## PAR Sheet study

-University paper on PAR sheets -https://www.nh.gov/gsc/calendar/documents/20091117_harrigan_dixon.pdf
Things learned from this paper:

- Scatter rewards saw for 25% of the wins on one version of one of the studied machines
- Different versions of the same game can very payback by over 10%, but look the same to the player
- As the hit frequency (the amount of times one wins) went up (a very small amount, like .1) so did the payback rate. There's coorelation there. Win more, get more payback.
- Max jackpot can only be won with max bet on a winning line
- `"Jackpot amount" is the amount of the highest prize. On the mechanical reel slots,
there is a bonus for wagering the maximum number of credits. For example, on
The Phantom of the Opera, a wager of one credit pays a bonus of 1,000 credits,
two credits pays 2,000, and three credits pays 5,000. The amount of the jackpot
for both video slots games is linear in that the jackpot is 10,000 times the credits
wagered and thus varies from 10,000 to 50,000, as the wager can vary from one to
five credits. " Page 6, top bullet`
- Larger payback games can be played longer than the ones with lower paybacks (logic)
- Classical and operant conditioning are present in slot machines
- A seasoned gambler to slots is expected to be mentally arounsed before they've even touched the machine
- Any amount of money is a "win" even if the gambler looses money on the spin (bets 50c but gets back less than the wager)
- Bonus games increase arousal and can lead to conditioning

## Math on the reels~

<a href="https://docs.google.com/spreadsheets/d/10H2LKh-HEUo4B-RwomgVCFnkDddrEigxqHOL4-jcXV4/edit?usp=sharing">Math doc</a>

- Current setup

  - The reels are pulled psuedo randomly from a list of 100 symbols as determined by the object controlling their appear rate

- Pros:
  - No refactor needed
  - No time devoted to math that doesn't serve a greater purpose in my learning journey (albeit interesting)
  - Doesn't require static wheels so therefore can have more flexibility for the user
- Cons:

  - Perhaps not as consistent with payouts. The psuedo randomness isn't as controlled - No math out there that I've found to back this up (not that there is much math on this topic...)

<img src="public/Top-start.png" />
<img src="public/Middle-start.png" />
<img src="public/Bottom-start.png" />
  <!-- SIDE GAME STUFF -->

## Side Game Stuff

- A button on UI to swap games
- Use of the board, maybe winter/autumn themes? \* What would this change?
- Sticky wilds, image to complete
<!-- FILE STRUCTURE -->

## Psychology ramblings

- https://www.youtube.com/watch?v=Fpj43qwSmtg&ab_channel=SciShowPsych
- Talks about reward schedules
- More varied rewards, more hooked people ar going to be
- Persistance is what makes the reward happen
- TAKEAWAY: we should make a timer for the first payout to be a bit bigger perhaps?

## Files needed

      * main.js
          * Setup and requestAnimationFrame
      * global context file
          * Holds currrent game object, can be accessed by everything
      * checking algorithm
          * The core of the scoring, determines if the spin is a winner or not
      * Ruins algorithm
          * Similar to scoring, runs before the scoring algorithm if ruins exist
      * Symbol creator
          * A factory function that creates and returns the symbols array, also able to call helper functions to make other types of tiles to add to the array. This will control the rarity of base symbols as well.
      //This is perhaps unecessary, however I feel it'd be good as a helper function because then if there's a game mode without ruins we can handle that better. It also allows us to add new functionality without habing to muddy up the symbols file.
      * Ruins creator
          * A factory that can be called by the symbols creator
      * Stats dump file
          * A component file that can return the stats values if the user wishes.
      *NO UI NEEDED
          * This is all handled by React and how we add componenets to the main file. Eventually app.tsx will become our UI and call everything acting as the main UI
          * We can handle different game modes here as well, adding checks for the game mode when we get there and only showing the game mode that's selected with (gamemode && <component>). We can then style all the different game modes, though watch for the canvas. We may need to extract and import that to each different game as the ID is what everything is based off of.

<!-- QUESTIONS / THINGS TO SOLVE -->

## Questions

- For ruins pick me game, when you get an item the first time should it pay out? Or do you just get the item?
  - I imagine it'd be a base for matching ruins and if you get a dupe it gives a small bonus, like 30 base +5 for dupe.
  <!-- - How do we structure the if then?
  - Maybe we could do a generic if then, saying `if (symbol === symbol) then ...` -->
- For prime spins, do we use a different set of reels?
- How do we handle symbol rarity?
  - We should do a flat rarity. Easier to handle, easier to build around for symbol distribution. Same with ruins items, but we can impliment a fluxuating rarity if so desire and test to see the feel.
- For the input methods, how do we handle the clicking?
  - We'll start with all buttons having an onclick, and the state enter will trigger a change in the buttons. For testing, this will remove the buttons with CSS but for production this will grey out buttons that user can't click. After beta testing with potential users, we'll determine if having an invivible button over the screen would contriute to UX
- For the stats state, how do we manage that?

  - I'm thinking we either hold those in /the/ global state, or we could make another global state just for stats so we don't make the main global state so muddy.

- For a professional:
  -When looking at the percent payback and the total average winnings, how do we balance those? Should the lowest percent symbol always be the highest value, or should I swap it around to ensure the winnings are similar? Will that have an adverse effect on the reward system? As betting more, I'd assume you'd see the "rarer" symbols more frequently...

<!-- RESEARCH -->

## Research

-Probability and the distribution of the symbols and math used to calculate winning potential
https://www.casinosmash.com/features/how-to-use-probability-to-win-at-slots

-More math, goes in depth on reels and the math to calculate the possibilities of a spin
https://www.youtube.com/watch?v=JyIWQIdxaOA

-Slots calculator from above vid, excel spreadsheet to calculate winning probs
https://docs.google.com/spreadsheets/d/1beGMKgDcoQguu8ZhHphPO5DLq48bAbk-vfuTty1X0pg/edit#gid=605918202

-Basic probabaility
https://www.mathsisfun.com/data/probability-events-independent.html

- PAR sheet example
  https://easy.vegas/games/slots/par_sheets/In-the-Money.gif

- Behind the

-University paper on PAR sheets
https://www.nh.gov/gsc/calendar/documents/20091117_harrigan_dixon.pdf

-Opernant Conditioning
https://www.youtube.com/watch?v=ne6o-uPJarA&ab_channel=Sprouts
https://www.youtube.com/watch?v=3xNggCrTWUo&ab_channel=ProfessorRoss

- Rewards every time get boring, or even on intervals

-Psychology of slots and gambling
https://youtube.com/watch?v=Fpj43qwSmtg&feature=shares

-More in depth psychology about the brain and it's reaction to slots, gambling addiciton covered here too
https://youtube.com/watch?v=V6HwVzjFndg&feature=shares

-Deep dive into psychology of gambling in a casino
https://youtube.com/watch?v=X2G__MV8cIg&feature=shares

-ROOT reference sheet for rules, maybe some use
https://www.reddit.com/r/boardgames/comments/9c04sn/root_reference_sheet/

-Free board game icons
https://www.reddit.com/r/boardgames/comments/s1fbzt/ive_created_250_icons_for_board_game_designers_to/

-ROOT font
https://www.reddit.com/r/rootgame/comments/woqa75/comment/ikcgubg/

-Some assets for ROOT
https://boardgamegeek.com/thread/2252658/share-your-assets-templates-variants

-Picture for some factions png blank background source
https://owenmcg.com/games/2020/01/22/root.html

-Use the logic from this in the logic for the clicking into place, and perhaps in the way each tile on the board is referred to

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<!-- ROADMAP 
## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
  - [ ] Nested Feature

See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>-->

Pseudo code for the logic behind the algorithm:

switch (column 0, row 0)
case (equals column 1, row 0){
if(equals column 2 row 0){
if(equals column 3 row 0){
if(equals column 4 row 0){
five in a row
}
}
}
}
