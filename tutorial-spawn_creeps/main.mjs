import { getObjectsByPrototype } from 'game/utils';
import { Flag, StructureSpawn } from 'game/prototypes';
import { MOVE } from 'game/constants';

var creep1, creep2;

export function loop()
{
    var mySpawn = getObjectsByPrototype(StructureSpawn)[0];
    var flags = getObjectsByPrototype(Flag);

    if(!creep1) creep1 = mySpawn.spawnCreep([MOVE]).object;
    else
    {
        creep1.moveTo(flags[0]);
        if(!creep2) creep2 = mySpawn.spawnCreep([MOVE]).object;
        else creep2.moveTo(flags[1]);
    }
}