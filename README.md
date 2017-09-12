# Falling Blocks

This is a quick demo application meant to demonstrate reinforcement learning through [evolutionary computation](https://en.wikipedia.org/wiki/Evolutionary_computation).

## Goal of the Game

![Falling Blocks](resources/falling_blocks.gif =250x250)

The goal is to control the blue block in order to avoid the red blocks that are falling. The score is the number of blocks avoided.

## Noted Observations
Initially, every species in each population was tested using the same block patterns (using a seeded random generator), but this caused the population to evolve with a strategy of just pressing the left arrow key, which for that particular seed was a local maximum.

Also, when the player makes an illegal move (moving the blue block left when it is already the furthest left possible), I made that trigger a game over. Hopefully, that should help with the learning process.


## Future Additions

I plan to implement the [HyperNEAT]() algorithm when I get the chance to do so. This would probably enhance the learning capacity by allowing different topologies for the neural network to have.
