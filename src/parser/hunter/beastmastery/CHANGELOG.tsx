import { Putro } from 'CONTRIBUTORS';
import { change, date } from 'common/changelog';
import SpellLink from 'common/SpellLink';
import SPELLS from 'common/SPELLS';
import React from 'react';

export default [
  change(date(2020, 12, 12), 'Fix translation library causing suggestions not showing correct values', Putro),
  change(date(2020, 12, 4), <> Implement the 100% focus generation increase to focus generators from <SpellLink id={SPELLS.NESINGWARYS_TRAPPING_APPARATUS_EFFECT.id} />. </>, Putro),
  change(date(2020, 10, 1), 'Updated all Beast Mastery modules for Shadowlands', Putro),
];
