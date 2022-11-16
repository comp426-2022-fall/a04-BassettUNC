export function roll(sides, numDice, numRolled) {
        var rolls = [];
        var i = 0;
        while (i < numRolled) {
                rolls[i] = Math.floor(Math.random() * (sides*numDice+1));
                i = i + 1;
        }

        const result = {
                sides: sides,
                dice: numDice,
                rolls: numRolled,
                results: rolls
        }

        return result;
}

