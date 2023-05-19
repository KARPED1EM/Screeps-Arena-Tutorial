import { getObjectsByPrototype } from 'game/utils';
import { Creep } from 'game/prototypes';
import { ERR_NOT_IN_RANGE, ATTACK, RANGED_ATTACK, HEAL } from 'game/constants';

export function loop()
{
    var myCreeps = getObjectsByPrototype(Creep).filter(creep => creep.my);
    var enemyCreep = getObjectsByPrototype(Creep).find(creep => !creep.my);

    for(var creep of myCreeps)
    {
        if(creep.body.some(bodyPart => bodyPart.type == ATTACK))
        {
            if(creep.attack(enemyCreep) == ERR_NOT_IN_RANGE)
                creep.moveTo(enemyCreep);
        }
        if(creep.body.some(bodyPart => bodyPart.type == RANGED_ATTACK))
        {
            if(creep.rangedAttack(enemyCreep) == ERR_NOT_IN_RANGE) 
                creep.moveTo(enemyCreep);
        }
        if(creep.body.some(bodyPart => bodyPart.type == HEAL))
        {
            var myDamagedCreeps = myCreeps.filter(i => i.hits < i.hitsMax);
            if(myDamagedCreeps.length > 0)
            {
                if(creep.heal(myDamagedCreeps[0]) == ERR_NOT_IN_RANGE)
                    creep.moveTo(myDamagedCreeps[0]);
            }
        }
    }
}
