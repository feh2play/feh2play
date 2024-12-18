import { CONDITION } from "./conditions.js";
import { COMBAT_FLAG, CONDITION_OPERATOR, EFFECT_ACTION, EFFECT_CALCULATION, EFFECT_CONDITION, EFFECT_PHASE, EFFECT_TARGET, MOVE_TYPE, MOVEMENT_TYPE, SKILL_TYPE, SPECIAL_TYPE, STAT_CHECK_TYPE, STATS, WEAPON_TYPE } from "./definitions.js";
import { EFFECT } from "./effects.js";
import STATUS from "./status.js";

// todo handle refines that don't fit this e.g. Arden's Blade, hewn lance
const MELEE_REFINE_OPTIONS = {
  EFF: { hp: 3 },
  ATK: { hp: 5, atk: 2 },
  SPD: { hp: 5, spd: 3 },
  DEF: { hp: 5, def: 4 },
  RES: { hp: 5, res: 4 }
};

const RANGED_REFINE_OPTIONS = {
  EFF: {},
  ATK: { hp: 2, atk: 1 },
  SPD: { hp: 2, spd: 2 },
  DEF: { hp: 2, def: 3 },
  RES: { hp: 2, res: 3 }
};

const STAFF_REFINE_EFFECTS = {
  WRATHFUL: {
    description: "Calculates damage from staff like other weapons.",
    effect: EFFECT.wrathful()
  },
  DAZZLE: {
    description: "Foe cannot counterattack.",
    effect: EFFECT.foeCantCounterattack()
  }
};

const REFINE_IMAGE_MAP = {
  ATK: "assets/icons/Attack_Plus_W.webp",
  SPD: "assets/icons/Speed_Plus_W.webp",
  DEF: "assets/icons/Defense_Plus_W.webp",
  RES: "assets/icons/Resistance_Plus_W.webp",
  WRATHFUL: "assets/icons/Wrathful_Staff_W.webp",
  DAZZLE: "assets/icons/Dazzling_Staff_W.webp"
}

function createRefinedWeapon(baseWeapon, refineType) {
  const refineStats = baseWeapon.range === 1 ? MELEE_REFINE_OPTIONS[refineType] : RANGED_REFINE_OPTIONS[refineType];
  const id = `${baseWeapon.id}_REFINE_${refineType.toUpperCase()}`;
  let description = baseWeapon.refinedBaseUpgrade?.description ?? baseWeapon.description;
  const effects = baseWeapon.refinedBaseUpgrade
    ? [...baseWeapon.refinedBaseUpgrade.effects, EFFECT.visibleStats(refineStats)]
    : [...baseWeapon.effects, EFFECT.visibleStats(refineStats)];

  if (refineType === "EFF") {
    description += `\n${baseWeapon.effectRefine.description}`;
    effects.push(...baseWeapon.effectRefine.effects);
  }

  return {
    ...baseWeapon,
    id,
    description,
    effects,
    refined: true,
    img: REFINE_IMAGE_MAP[refineType] ?? baseWeapon.refineImg
  };
}

function createRefinedStaffWeapon(baseWeapon, refineType) {
  const id = `${baseWeapon.id}_REFINE_${refineType.toUpperCase()}`;
  let description = baseWeapon.description;
  let effects = [...baseWeapon.effects];

  description += `\n${STAFF_REFINE_EFFECTS[refineType].description}`;
  effects.push(STAFF_REFINE_EFFECTS[refineType].effect);

  if (refineType === "EFF") {
    description += `\n${baseWeapon.effectRefine.description}`;
    effects.push(...baseWeapon.effectRefine.effects);
  }

  return {
    ...baseWeapon,
    id,
    description,
    effects,
    refined: true,
    img: REFINE_IMAGE_MAP[refineType] ?? baseWeapon.refineImg
  };
}


const INHERITABLE_WEAPONS = {
  SILVER_SWORD_PLUS: {
    name: "Silver Sword+",
    description: "",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.SWORD.id,
    might: 15,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 15 })],
    canBeRefined: true
  },
  SILVER_LANCE_PLUS: {
    name: "Silver Lance+",
    description: "",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.LANCE.id,
    might: 15,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 15 })],
    canBeRefined: true
  },
  SILVER_AXE_PLUS: {
    name: "Silver Axe+",
    description: "",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.AXE.id,
    might: 15,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 15 })],
    canBeRefined: true
  },
  SILVER_BOW_PLUS: {
    name: "Silver Bow+",
    description: "Effective against flying foes.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.BOW.id,
    might: 13,
    range: 2,
    effects: [EFFECT.visibleStats({ atk: 13 }), EFFECT.effectiveAgainstMoveType(MOVE_TYPE.FLIER.id)],
    canBeRefined: true
  },
  SILVER_DAGGER_PLUS: {
    name: "Silver Dagger+",
    description: "After combat, if unit attacked, inflicts Def/Res-7 on foe through its next action.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.DAGGER.id,
    might: 10,
    range: 2,
    effects: [EFFECT.visibleStats({ atk: 10 }), EFFECT.dagger(7)],
    canBeRefined: true
  },
  BOLGANONE_PLUS: {
    name: "Bolganone+",
    description: "",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.RED_TOME.id,
    might: 13,
    range: 2,
    effects: [EFFECT.visibleStats({ atk: 13 })],
    canBeRefined: true
  },
  FENRIR_PLUS: {
    name: "Fenrir+",
    description: "",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.RED_TOME.id,
    might: 13,
    range: 2,
    effects: [EFFECT.visibleStats({ atk: 13 })],
    canBeRefined: true
  },
  THORON_PLUS: {
    name: "Thoron+",
    description: "",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.BLUE_TOME.id,
    might: 13,
    range: 2,
    effects: [EFFECT.visibleStats({ atk: 13 })],
    canBeRefined: true
  },
  SHINE_PLUS: {
    name: "Shine+",
    description: "",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.BLUE_TOME.id,
    might: 13,
    range: 2,
    effects: [EFFECT.visibleStats({ atk: 13 })],
    canBeRefined: true
  },
  REXCALIBUR_PLUS: {
    name: "Rexcalibur+",
    description: "",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.GREEN_TOME.id,
    might: 13,
    range: 2,
    effects: [EFFECT.visibleStats({ atk: 13 })],
    canBeRefined: true
  },
  ATLAS_PLUS: {
    name: "Atlas+",
    description: "",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.C_TOME.id,
    might: 13,
    range: 2,
    effects: [EFFECT.visibleStats({ atk: 13 })],
    canBeRefined: true
  },
  FLAMETONGUE_PLUS: {
    name: "Flametongue+",
    description: "",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.BREATH.id,
    might: 15,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 15 })],
    canBeRefined: true,
    refinedBaseUpgrade: {
      description: "If foe's Range = 2, calculates damage using the lower of foe's Def or Res.",
      effects: [EFFECT.visibleStats({ atk: 15 }), EFFECT.adaptiveVsRanged()]
    }
  },
  BRAVE_SWORD_PLUS: {
    name: "Brave Sword+",
    description: "Inflicts Spd-5. If unit initiates combat, unit attacks twice.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.SWORD.id,
    might: 8,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 8, spd: -5 }), EFFECT.playerPhaseBrave()],
    canBeRefined: false
  },
  BRAVE_LANCE_PLUS: {
    name: "Brave Lance+",
    description: "Inflicts Spd-5. If unit initiates combat, unit attacks twice.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.LANCE.id,
    might: 8,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 8, spd: -5 }), EFFECT.playerPhaseBrave()],
    canBeRefined: false
  },
  BRAVE_AXE_PLUS: {
    name: "Brave Axe+",
    description: "Inflicts Spd-5. If unit initiates combat, unit attacks twice.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.AXE.id,
    might: 8,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 8, spd: -5 }), EFFECT.playerPhaseBrave()],
    canBeRefined: false
  },
  BRAVE_BOW_PLUS: {
    name: "Brave Bow+",
    description: "Effective against flying foes. Inflicts Spd-5. If unit initiates combat, unit attacks twice.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.BOW.id,
    might: 7,
    range: 2,
    effects: [EFFECT.visibleStats({ atk: 7, spd: -5 }), EFFECT.playerPhaseBrave(), EFFECT.effectiveAgainstMoveType(MOVE_TYPE.FLIER.id)],
    canBeRefined: false
  },
  SLAYING_EDGE_PLUS: {
    name: "Slaying Edge+",
    description: "Accelerates Special trigger (cooldown count-1).",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.SWORD.id,
    might: 14,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 14 }), EFFECT.slaying()],
    canBeRefined: true
  },
  SLAYING_LANCE_PLUS: {
    name: "Slaying Lance+",
    description: "Accelerates Special trigger (cooldown count-1).",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.LANCE.id,
    might: 14,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 14 }), EFFECT.slaying()],
    canBeRefined: true
  },
  SLAYING_AXE_PLUS: {
    name: "Slaying Axe+",
    description: "Accelerates Special trigger (cooldown count-1).",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.AXE.id,
    might: 14,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 14 }), EFFECT.slaying()],
    canBeRefined: true
  },
  SLAYING_BOW_PLUS: {
    name: "Slaying Bow+",
    description: "Accelerates Special trigger (cooldown count-1). Effective against flying foes.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.BOW.id,
    might: 12,
    range: 2,
    effects: [EFFECT.visibleStats({ atk: 12 }), EFFECT.slaying(), EFFECT.effectiveAgainstMoveType(MOVE_TYPE.FLIER.id)],
    canBeRefined: true
  },
  BARB_SHURIKEN_PLUS: {
    name: "Barb Shuriken+",
    description: "Accelerates Special trigger (cooldown count-1). After combat, if unit attacked, inflicts Def/Res-7 on target and foes within 2 spaces of target through their next actions.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.DAGGER.id,
    might: 12,
    range: 2,
    effects: [EFFECT.visibleStats({ atk: 12 }), EFFECT.slaying(), EFFECT.dagger(7)],
    canBeRefined: true
  },
  WO_DAO_PLUS: {
    name: "Wo Dao+",
    description: "Deals +10 damage when Special triggers.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.SWORD.id,
    might: 13,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 13 }), EFFECT.damageOnSpecialTrigger(10)],
    canBeRefined: true
  },
  HARMONIC_LANCE_PLUS: {
    name: "Harmonic Lance+",
    description: "Deals +10 damage when Special triggers.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.LANCE.id,
    might: 13,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 13 }), EFFECT.damageOnSpecialTrigger(10)],
    canBeRefined: true
  },
  WO_GUN_PLUS: {
    name: "Wo Gùn+",
    description: "Deals +10 damage when Special triggers.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.AXE.id,
    might: 13,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 13 }), EFFECT.damageOnSpecialTrigger(10)],
    canBeRefined: true
  },
  SHORT_BOW_PLUS: {
    name: "Short Bow+",
    description: "Effective against flying foes. Deals +10 damage when Special triggers.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.BOW.id,
    might: 12,
    range: 2,
    effects: [EFFECT.visibleStats({ atk: 12 }), EFFECT.damageOnSpecialTrigger(10), EFFECT.effectiveAgainstMoveType(MOVE_TYPE.FLIER.id)],
    canBeRefined: true
  },
  ARMOURSMASHER_PLUS: {
    name: "Armoursmasher+",
    description: "Effective against armoured foes.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.SWORD.id,
    might: 14,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 14 }), EFFECT.effectiveAgainstMoveType(MOVE_TYPE.ARMOURED.id)],
    canBeRefined: true,
    effectRefine: {
      description: "Neutralizes armoured foes' bonuses (from skills like Fortify, Rally, etc.) during combat.",
      effects: [EFFECT.neutralizeMoveTypeBonuses(MOVE_TYPE.ARMOURED.id)]
    }
  },
  SLAYING_SPEAR_PLUS: {
    name: "Slaying Spear+",
    description: "Effective against armoured foes.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.LANCE.id,
    might: 14,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 14 }), EFFECT.effectiveAgainstMoveType(MOVE_TYPE.ARMOURED.id)],
    canBeRefined: true,
    effectRefine: {
      description: "Neutralizes armoured foes' bonuses (from skills like Fortify, Rally, etc.) during combat.",
      effects: [EFFECT.neutralizeMoveTypeBonuses(MOVE_TYPE.ARMOURED.id)]
    }
  },
  SLAYING_HAMMER_PLUS: {
    name: "Slaying Hammer+",
    description: "Effective against armoured foes.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.AXE.id,
    might: 14,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 14 }), EFFECT.effectiveAgainstMoveType(MOVE_TYPE.ARMOURED.id)],
    canBeRefined: true,
    effectRefine: {
      description: "Neutralizes armoured foes' bonuses (from skills like Fortify, Rally, etc.) during combat.",
      effects: [EFFECT.neutralizeMoveTypeBonuses(MOVE_TYPE.ARMOURED.id)]
    }
  },
  ZANBATO_PLUS: {
    name: "Zanbato+",
    description: "Effective against cavalry foes.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.SWORD.id,
    might: 14,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 14 }), EFFECT.effectiveAgainstMoveType(MOVE_TYPE.CAVALRY.id)],
    canBeRefined: true,
    effectRefine: {
      description: "Neutralizes armoured foes' bonuses (from skills like Fortify, Rally, etc.) during combat.",
      effects: [EFFECT.neutralizeMoveTypeBonuses(MOVE_TYPE.CAVALRY.id)]
    }
  },
  RIDERSBANE_PLUS: {
    name: "Ridersbane+",
    description: "Effective against cavalry foes.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.LANCE.id,
    might: 14,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 14 }), EFFECT.effectiveAgainstMoveType(MOVE_TYPE.CAVALRY.id)],
    canBeRefined: true,
    effectRefine: {
      description: "Neutralizes armoured foes' bonuses (from skills like Fortify, Rally, etc.) during combat.",
      effects: [EFFECT.neutralizeMoveTypeBonuses(MOVE_TYPE.CAVALRY.id)]
    }
  },
  POLEAXE_PLUS: {
    name: "Poleaxe+",
    description: "Effective against cavalry foes.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.AXE.id,
    might: 14,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 14 }), EFFECT.effectiveAgainstMoveType(MOVE_TYPE.CAVALRY.id)],
    canBeRefined: true,
    effectRefine: {
      description: "Neutralizes armoured foes' bonuses (from skills like Fortify, Rally, etc.) during combat.",
      effects: [EFFECT.neutralizeMoveTypeBonuses(MOVE_TYPE.CAVALRY.id)]
    }
  },
  KEEN_RAUDRWOLF_PLUS: {
    name: "Keen Rauðrwolf+",
    description: "Effective against cavalry foes.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.RED_TOME.id,
    might: 12,
    range: 2,
    effects: [EFFECT.visibleStats({ atk: 12 }), EFFECT.effectiveAgainstMoveType(MOVE_TYPE.CAVALRY.id)],
    canBeRefined: true,
    effectRefine: {
      description: "Neutralizes armoured foes' bonuses (from skills like Fortify, Rally, etc.) during combat.",
      effects: [EFFECT.neutralizeMoveTypeBonuses(MOVE_TYPE.CAVALRY.id)]
    }
  },
  KEEN_BLARWOLF_PLUS: {
    name: "Keen Blárwolf+",
    description: "Effective against cavalry foes.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.BLUE_TOME.id,
    might: 12,
    range: 2,
    effects: [EFFECT.visibleStats({ atk: 12 }), EFFECT.effectiveAgainstMoveType(MOVE_TYPE.CAVALRY.id)],
    canBeRefined: true,
    effectRefine: {
      description: "Neutralizes armoured foes' bonuses (from skills like Fortify, Rally, etc.) during combat.",
      effects: [EFFECT.neutralizeMoveTypeBonuses(MOVE_TYPE.CAVALRY.id)]
    }
  },
  KEEN_GRONNWOLF_PLUS: {
    name: "Keen Gronnwolf+",
    description: "Effective against cavalry foes.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.GREEN_TOME.id,
    might: 12,
    range: 2,
    effects: [EFFECT.visibleStats({ atk: 12 }), EFFECT.effectiveAgainstMoveType(MOVE_TYPE.CAVALRY.id)],
    canBeRefined: true,
    effectRefine: {
      description: "Neutralizes armoured foes' bonuses (from skills like Fortify, Rally, etc.) during combat.",
      effects: [EFFECT.neutralizeMoveTypeBonuses(MOVE_TYPE.CAVALRY.id)]
    }
  },
  RUBY_SWORD_PLUS: {
    name: "Ruby Sword+",
    description: "If unit has weapon-triangle advantage, boosts Atk by 20%. If unit has weapon-triangle disadvantage, reduces Atk by 20%.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.SWORD.id,
    might: 12,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 12 }), EFFECT.triangleAdept()],
    canBeRefined: false
  },
  SAPPHIRE_LANCE_PLUS: {
    name: "Sapphire Lance+",
    description: "If unit has weapon-triangle advantage, boosts Atk by 20%. If unit has weapon-triangle disadvantage, reduces Atk by 20%.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.LANCE.id,
    might: 12,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 12 }), EFFECT.triangleAdept()],
    canBeRefined: false
  },
  EMERALD_AXE_PLUS: {
    name: "Emerald Axe+",
    description: "If unit has weapon-triangle advantage, boosts Atk by 20%. If unit has weapon-triangle disadvantage, reduces Atk by 20%.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.AXE.id,
    might: 12,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 12 }), EFFECT.triangleAdept()],
    canBeRefined: false
  },
  FIRESWEEP_S_PLUS: {
    name: "Firesweep S+",
    description: "Unit and foe cannot counterattack.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.SWORD.id,
    might: 15,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 15 }), EFFECT.unitCantCounterattack(), EFFECT.foeCantCounterattack()],
    canBeRefined: false
  },
  FIRESWEEP_L_PLUS: {
    name: "Firesweep L+",
    description: "Unit and foe cannot counterattack.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.LANCE.id,
    might: 15,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 15 }), EFFECT.unitCantCounterattack(), EFFECT.foeCantCounterattack()],
    canBeRefined: false
  },
  FIRESWEEP_AXE_PLUS: {
    name: "Firesweep Axe+",
    description: "Unit and foe cannot counterattack.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.AXE.id,
    might: 15,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 15 }), EFFECT.unitCantCounterattack(), EFFECT.foeCantCounterattack()],
    canBeRefined: false
  },
  FIRESWEEP_BOW_PLUS: {
    name: "Firesweep Bow+",
    description: "Unit and foe cannot counterattack.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.BOW.id,
    might: 11,
    range: 2,
    effects: [EFFECT.visibleStats({ atk: 11 }), EFFECT.unitCantCounterattack(), EFFECT.foeCantCounterattack()],
    canBeRefined: false
  },
  RAUDRBLADE_PLUS: {
    name: "Rauðrblade+",
    description: "Slows Special trigger (cooldown count+1). Grants bonus to unit’s Atk = total bonuses on unit during combat.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.RED_TOME.id,
    might: 13,
    range: 2,
    effects: [EFFECT.visibleStats({ atk: 13 }), EFFECT.reverseSlaying(), EFFECT.blade()],
    canBeRefined: false
  },
  BLARBLADE_PLUS: {
    name: "Blárblade+",
    description: "Slows Special trigger (cooldown count+1). Grants bonus to unit’s Atk = total bonuses on unit during combat.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.BLUE_TOME.id,
    might: 13,
    range: 2,
    effects: [EFFECT.visibleStats({ atk: 13 }), EFFECT.reverseSlaying(), EFFECT.blade()],
    canBeRefined: false
  },
  GRONNBLADE_PLUS: {
    name: "Gronnblade+",
    description: "Slows Special trigger (cooldown count+1). Grants bonus to unit’s Atk = total bonuses on unit during combat.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.GREEN_TOME.id,
    might: 13,
    range: 2,
    effects: [EFFECT.visibleStats({ atk: 13 }), EFFECT.reverseSlaying(), EFFECT.blade()],
    canBeRefined: false
  },
  RAUDRRAVEN_PLUS: {
    name: "Rauðrraven+",
    description: "Grants weapon-triangle advantage against colorless foes, and inflicts weapon-triangle disadvantage on colorless foes during combat.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.RED_TOME.id,
    might: 11,
    range: 2,
    effects: [EFFECT.visibleStats({ atk: 11 }), EFFECT.raven()],
    canBeRefined: false
  },
  BLARRAVEN_PLUS: {
    name: "Blárraven+",
    description: "Grants weapon-triangle advantage against colorless foes, and inflicts weapon-triangle disadvantage on colorless foes during combat.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.BLUE_TOME.id,
    might: 11,
    range: 2,
    effects: [EFFECT.visibleStats({ atk: 11 }), EFFECT.raven()],
    canBeRefined: false
  },
  GRONNRAVEN_PLUS: {
    name: "Gronnraven+",
    description: "Grants weapon-triangle advantage against colorless foes, and inflicts weapon-triangle disadvantage on colorless foes during combat.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.GREEN_TOME.id,
    might: 11,
    range: 2,
    effects: [EFFECT.visibleStats({ atk: 11 }), EFFECT.raven()],
    canBeRefined: false
  },
  BERKUTS_LANCE_PLUS: {
    name: "Berkut's Lance+",
    description: "If foe initiates combat, grants Res+4 during combat.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.LANCE.id,
    might: 14,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 14 }), EFFECT.enemyPhaseStats({ res: 4 })],
    canBeRefined: true,
    refinedBaseUpgrade: {
      description: "If foe initiates combat, grants Res+7 during combat.",
      effects: [EFFECT.visibleStats({ atk: 14 }), EFFECT.enemyPhaseStats({ res: 7 })],
    }
  },
  ABSORB_PLUS: {
    name: "Absorb+",
    description: "Restores HP = 50% of damage dealt. After combat, if unit attacked, restores 7 HP to allies within 2 spaces of unit.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.STAFF.id,
    might: 7,
    range: 2,
    effects: [
      EFFECT.visibleStats({ atk: 7 }),
      {
        phase: EFFECT_PHASE.DURING_COMBAT,
        actions: [{ type: EFFECT_ACTION.SET_COMBAT_FLAG, flag: COMBAT_FLAG.PERCENT_HEALING_ON_HIT, percent: 50, target: { type: EFFECT_TARGET.SELF } }]
      },
      {
        phase: EFFECT_PHASE.AFTER_COMBAT_BEFORE_DEATH,
        condition: { type: EFFECT_CONDITION.UNIT_ATTACKED_DURING_COMBAT },
        actions: [{ type: EFFECT_ACTION.RESTORE_HP, value: 7, target: { type: EFFECT_TARGET.ALLIES_WITHIN_X_SPACES, spaces: 2 } }]
      }
    ],
    canBeRefined: true
  },
  CANDLELIGHT_PLUS: {
    name: "Candlelight+",
    description: "After combat, if unit attacked, inflicts status on target and foes within 2 spaces of target preventing counterattacks through their next actions.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.STAFF.id,
    might: 11,
    range: 2,
    effects: [
      EFFECT.visibleStats({ atk: 11 }),
      {
        phase: EFFECT_PHASE.AFTER_COMBAT_BEFORE_DEATH,
        condition: { type: EFFECT_CONDITION.UNIT_ATTACKED_DURING_COMBAT },
        actions: [{ type: EFFECT_ACTION.APPLY_STATUS, status: STATUS.COUNTERATTACKS_DISRUPTED.id, target: { type: EFFECT_TARGET.FOE_AND_FOES_WITHIN_X_SPACES_OF_FOE, spaces: 2 } }]
      }
    ],
    canBeRefined: true
  },
  FEAR_PLUS: {
    name: "Fear+",
    description: "After combat, if unit attacked, inflicts Atk-7 on target and foes within 2 spaces of target through their next actions.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.STAFF.id,
    might: 12,
    range: 2,
    effects: [
      EFFECT.visibleStats({ atk: 12 }),
      {
        phase: EFFECT_PHASE.AFTER_COMBAT_BEFORE_DEATH,
        condition: { type: EFFECT_CONDITION.UNIT_ATTACKED_DURING_COMBAT },
        actions: [{ type: EFFECT_ACTION.APPLY_DEBUFF, stat: STATS.ATK, value: 7, target: { type: EFFECT_TARGET.FOE_AND_FOES_WITHIN_X_SPACES_OF_FOE, spaces: 2 } }]
      }
    ],
    canBeRefined: true,
  },
  GRAVITY_PLUS: {
    name: "Gravity+",
    description: "After combat, if unit attacked, inflicts status on target and foes within 1 space of target restricting movement to 1 space through their next actions.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.STAFF.id,
    might: 10,
    range: 2,
    effects: [
      EFFECT.visibleStats({ atk: 10 }),
      {
        phase: EFFECT_PHASE.AFTER_COMBAT_BEFORE_DEATH,
        condition: { type: EFFECT_CONDITION.UNIT_ATTACKED_DURING_COMBAT },
        actions: [{ type: EFFECT_ACTION.APPLY_STATUS, status: STATUS.GRAVITY.id, target: { type: EFFECT_TARGET.FOE_AND_FOES_WITHIN_X_SPACES_OF_FOE, spaces: 1 } }]
      }
    ],
    canBeRefined: true
  },
  PAIN_PLUS: {
    name: "Pain+",
    description: "Deals 10 damage to target and foes within 2 spaces of target after combat.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.STAFF.id,
    might: 10,
    range: 2,
    effects: [
      EFFECT.visibleStats({ atk: 10 }),
      {
        phase: EFFECT_PHASE.AFTER_COMBAT_BEFORE_DEATH,
        condition: { type: EFFECT_CONDITION.UNIT_ATTACKED_DURING_COMBAT },
        actions: [{ type: EFFECT_ACTION.DEAL_DAMAGE, value: 10, target: { type: EFFECT_TARGET.FOE_AND_FOES_WITHIN_X_SPACES_OF_FOE, spaces: 2 } }]
      }
    ],
    canBeRefined: true,
  },
  PANIC_PLUS: {
    name: "Panic+",
    description: "After combat, if unit attacked, converts bonuses on target and foes within 2 spaces of target into penalties through their next actions.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.STAFF.id,
    might: 11,
    range: 2,
    effects: [
      EFFECT.visibleStats({ atk: 11 }),
      {
        phase: EFFECT_PHASE.AFTER_COMBAT_BEFORE_DEATH,
        condition: { type: EFFECT_CONDITION.UNIT_ATTACKED_DURING_COMBAT },
        actions: [{ type: EFFECT_ACTION.APPLY_STATUS, status: STATUS.PANIC.id, target: { type: EFFECT_TARGET.FOE_AND_FOES_WITHIN_X_SPACES_OF_FOE, spaces: 2 } }]
      }
    ],
    canBeRefined: true
  },
  SLOW_PLUS: {
    name: "Slow+",
    description: "After combat, if unit attacked, inflicts Spd-7 on target and foes within 2 spaces of target through their next actions.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.STAFF.id,
    might: 12,
    range: 2,
    effects: [
      EFFECT.visibleStats({ atk: 12 }),
      {
        phase: EFFECT_PHASE.AFTER_COMBAT_BEFORE_DEATH,
        condition: { type: EFFECT_CONDITION.UNIT_ATTACKED_DURING_COMBAT },
        actions: [{ type: EFFECT_ACTION.APPLY_DEBUFF, stat: STATS.SPD, value: 7, target: { type: EFFECT_TARGET.FOE_AND_FOES_WITHIN_X_SPACES_OF_FOE, spaces: 2 } }]
      }
    ],
    canBeRefined: true
  },
  DARK_BREATH_PLUS: {
    name: "Dark Breath+",
    description: "If unit initiates combat, inflicts Atk/Spd-5 on foes within 2 spaces of target through their next actions after combat.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.BREATH.id,
    might: 13,
    range: 1,
    effects: [
      EFFECT.visibleStats({ atk: 13 }),
      {
        phase: EFFECT_PHASE.AFTER_COMBAT,
        condition: { type: EFFECT_CONDITION.UNIT_INITIATES_COMBAT },
        actions: [
          { type: EFFECT_ACTION.APPLY_DEBUFF, stat: STATS.ATK, value: 5, target: { type: EFFECT_TARGET.FOES_WITHIN_X_SPACES_OF_FOE, spaces: 2 } },
          { type: EFFECT_ACTION.APPLY_DEBUFF, stat: STATS.SPD, value: 5, target: { type: EFFECT_TARGET.FOES_WITHIN_X_SPACES_OF_FOE, spaces: 2 } }
        ]
      }
    ],
    canBeRefined: true,
    refinedBaseUpgrade: {
      description: "After combat, if unit attacked, inflicts Atk/Spd-7 on target and foes within 2 spaces of target through their next actions. If foe's Range = 2, calculates damage using the lower of foe's Def or Res.",
      effects: [
        EFFECT.visibleStats({ atk: 13 }),
        {
          phase: EFFECT_PHASE.AFTER_COMBAT_BEFORE_DEATH,
          condition: { type: EFFECT_CONDITION.UNIT_ATTACKED_DURING_COMBAT },
          actions: [
            { type: EFFECT_ACTION.APPLY_BUFF, stat: STATS.ATK, value: 7, target: { type: EFFECT_TARGET.FOE_AND_FOES_WITHIN_X_SPACES_OF_FOE, spaces: 2 } },
            { type: EFFECT_ACTION.APPLY_BUFF, stat: STATS.SPD, value: 7, target: { type: EFFECT_TARGET.FOE_AND_FOES_WITHIN_X_SPACES_OF_FOE, spaces: 2 } }
          ]
        },
        EFFECT.adaptiveVsRanged()
      ]
    }
  },
  LIGHT_BREATH_PLUS: {
    name: "Light Breath+",
    description: "If unit initiates combat, grants Def/Res+4 to adjacent allies for 1 turn after combat.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.BREATH.id,
    might: 13,
    range: 1,
    effects: [
      EFFECT.visibleStats({ atk: 13 }),
      {
        phase: EFFECT_PHASE.AFTER_COMBAT,
        condition: { type: EFFECT_CONDITION.UNIT_INITIATES_COMBAT },
        actions: [
          { type: EFFECT_ACTION.APPLY_BUFF, stat: STATS.DEF, value: 4, target: { type: EFFECT_TARGET.ALLIES_WITHIN_X_SPACES, spaces: 1 } },
          { type: EFFECT_ACTION.APPLY_BUFF, stat: STATS.RES, value: 4, target: { type: EFFECT_TARGET.ALLIES_WITHIN_X_SPACES, spaces: 1 } }
        ]
      }
    ],
    canBeRefined: true,
    refinedBaseUpgrade: {
      description: "After combat, if unit attacked, grants Atk/Spd/Def/Res+5 to unit and allies within 2 spaces of unit for 1 turn. If foe's Range = 2, calculates damage using the lower of foe's Def or Res.",
      effects: [
        EFFECT.visibleStats({ atk: 13 }),
        {
          phase: EFFECT_PHASE.AFTER_COMBAT_BEFORE_DEATH,
          condition: { type: EFFECT_CONDITION.UNIT_ATTACKED_DURING_COMBAT },
          actions: [
            { type: EFFECT_ACTION.APPLY_BUFF, stat: STATS.ATK, value: 5, target: { type: EFFECT_TARGET.UNIT_AND_ALLIES_WITHIN_X_SPACES, spaces: 2 } },
            { type: EFFECT_ACTION.APPLY_BUFF, stat: STATS.SPD, value: 5, target: { type: EFFECT_TARGET.UNIT_AND_ALLIES_WITHIN_X_SPACES, spaces: 2 } },
            { type: EFFECT_ACTION.APPLY_BUFF, stat: STATS.DEF, value: 5, target: { type: EFFECT_TARGET.UNIT_AND_ALLIES_WITHIN_X_SPACES, spaces: 2 } },
            { type: EFFECT_ACTION.APPLY_BUFF, stat: STATS.RES, value: 5, target: { type: EFFECT_TARGET.UNIT_AND_ALLIES_WITHIN_X_SPACES, spaces: 2 } }
          ]
        },
        EFFECT.adaptiveVsRanged()
      ]
    }
  },
  LIGHTNING_BREATH_PLUS: {
    name: "Lightning Breath+",
    description: "Slows Special trigger (cooldown count+1). Unit can counterattack regardless of foe's range.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.BREATH.id,
    might: 11,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 11 }), EFFECT.reverseSlaying(), EFFECT.distantCloseCounter()
    ],
    canBeRefined: true,
    refinedBaseUpgrade: {
      description: "Slows Special trigger (cooldown count+1). Unit can counterattack regardless of foe's range. If foe's Range = 2, calculates damage using the lower of foe's Def or Res.",
      effects: [EFFECT.visibleStats({ atk: 11 }), EFFECT.reverseSlaying(), EFFECT.distantCloseCounter(), EFFECT.adaptiveVsRanged()
      ]
    }
  },
  CARROT_AXE_PLUS: {
    name: "Carrot Axe+",
    description: "If unit initiates combat, restores 4 HP after combat.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.AXE.id,
    might: 13,
    range: 1,
    effects: [
      EFFECT.visibleStats({ atk: 13 }),
      {
        phase: EFFECT_PHASE.AFTER_COMBAT,
        condition: { type: EFFECT_CONDITION.UNIT_INITIATES_COMBAT },
        actions: [{ type: EFFECT_ACTION.RESTORE_HP, value: 4, target: { type: EFFECT_TARGET.SELF } }]
      }
    ],
    canBeRefined: true,
    refinedBaseUpgrade: {
      description: "After combat, if unit attacked, restores 4 HP.",
      effects: [
        EFFECT.visibleStats({ atk: 13 }),
        {
          phase: EFFECT_PHASE.AFTER_COMBAT_BEFORE_DEATH,
          condition: { type: EFFECT_CONDITION.UNIT_ATTACKED_DURING_COMBAT },
          actions: [{ type: EFFECT_ACTION.RESTORE_HP, value: 4, target: { type: EFFECT_TARGET.SELF } }]
        }
      ]
    }
  },
  CARROT_LANCE_PLUS: {
    name: "Carrot Lance+",
    description: "If unit initiates combat, restores 4 HP after combat.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.LANCE.id,
    might: 13,
    range: 1,
    effects: [
      EFFECT.visibleStats({ atk: 13 }),
      {
        phase: EFFECT_PHASE.AFTER_COMBAT,
        condition: { type: EFFECT_CONDITION.UNIT_INITIATES_COMBAT },
        actions: [{ type: EFFECT_ACTION.RESTORE_HP, value: 4, target: { type: EFFECT_TARGET.SELF } }]
      }
    ],
    canBeRefined: true,
    refinedBaseUpgrade: {
      description: "After combat, if unit attacked, restores 4 HP.",
      effects: [
        EFFECT.visibleStats({ atk: 13 }),
        {
          phase: EFFECT_PHASE.AFTER_COMBAT_BEFORE_DEATH,
          condition: { type: EFFECT_CONDITION.UNIT_ATTACKED_DURING_COMBAT },
          actions: [{ type: EFFECT_ACTION.RESTORE_HP, value: 4, target: { type: EFFECT_TARGET.SELF } }]
        }
      ]
    }
  },
  DEFT_HARPOON_PLUS: {
    name: "Deft Harpoon+",
    description: "At start of combat, if unit's HP = 100%, grants Atk/Spd/Def/Res+2, but after combat, if unit attacked, deals 2 damage to unit.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.LANCE.id,
    might: 14,
    range: 1,
    effects: [
      EFFECT.visibleStats({ atk: 14 }),
      {
        phase: EFFECT_PHASE.START_OF_COMBAT,
        condition: { type: EFFECT_CONDITION.UNIT_HP_IS_MAX_HP },
        actions: [
          { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.ATK, value: 2, target: { type: EFFECT_TARGET.SELF } },
          { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.SPD, value: 2, target: { type: EFFECT_TARGET.SELF } },
          { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.DEF, value: 2, target: { type: EFFECT_TARGET.SELF } },
          { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.RES, value: 2, target: { type: EFFECT_TARGET.SELF } }
        ]
      },
      {
        phase: EFFECT_PHASE.AFTER_COMBAT,
        condition: CONDITION.and(
          { type: EFFECT_CONDITION.UNIT_HP_IS_MAX_HP, checkStartOfCombatHp: true },
          { type: EFFECT_CONDITION.UNIT_ATTACKED_DURING_COMBAT }
        ),
        actions: [
          { type: EFFECT_ACTION.DEAL_DAMAGE, value: 2, target: { type: EFFECT_TARGET.SELF } }
        ]
      }
    ],
    canBeRefined: true
  },
  FIRST_BITE_PLUS: {
    name: "First Bite+",
    description: "If unit initiates combat, grants Def/Res+2 to allies within 2 spaces for 1 turn after combat.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.LANCE.id,
    might: 14,
    range: 1,
    effects: [
      EFFECT.visibleStats({ atk: 14 }),
      {
        phase: EFFECT_PHASE.AFTER_COMBAT,
        condition: { type: EFFECT_CONDITION.UNIT_INITIATES_COMBAT },
        actions: [
          { type: EFFECT_ACTION.APPLY_BUFF, stat: STATS.DEF, value: 2, target: { type: EFFECT_TARGET.ALLIES_WITHIN_X_SPACES, spaces: 1 } },
          { type: EFFECT_ACTION.APPLY_BUFF, stat: STATS.RES, value: 2, target: { type: EFFECT_TARGET.ALLIES_WITHIN_X_SPACES, spaces: 1 } }
        ]
      }
    ],
    canBeRefined: true,
    refinedBaseUpgrade: {
      description: "After combat, if unit attacked, grants Def/Res+5 to unit and allies within 2 spaces of unit for 1 turn.",
      effects: [
        EFFECT.visibleStats({ atk: 14 }),
        {
          phase: EFFECT_PHASE.AFTER_COMBAT_BEFORE_DEATH,
          condition: { type: EFFECT_CONDITION.UNIT_ATTACKED_DURING_COMBAT },
          actions: [
            { type: EFFECT_ACTION.APPLY_BUFF, stat: STATS.DEF, value: 5, target: { type: EFFECT_TARGET.UNIT_AND_ALLIES_WITHIN_X_SPACES, spaces: 2 } },
            { type: EFFECT_ACTION.APPLY_BUFF, stat: STATS.RES, value: 5, target: { type: EFFECT_TARGET.UNIT_AND_ALLIES_WITHIN_X_SPACES, spaces: 2 } }
          ]
        }
      ]
    }
  },
};

const EXCLUSIVE_WEAPONS = {
  ARMADS: {
    name: "Armads",
    description: "If unit's HP ≥ 80% and foe initiates combat, unit makes a guaranteed follow-up attack.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.AXE.id,
    might: 16,
    range: 1,
    effects: [
      EFFECT.visibleStats({ atk: 16 }),
      {
        phase: EFFECT_PHASE.START_OF_COMBAT,
        condition: CONDITION.and(
          { type: EFFECT_CONDITION.UNIT_HP_GREATER_THAN_EQUAL_TO, percent: 80 },
          { type: EFFECT_CONDITION.FOE_INITIATES_COMBAT }
        ),
        actions: [{ type: EFFECT_ACTION.SET_COMBAT_FLAG, flag: COMBAT_FLAG.GUARANTEED_FOLLOW_UP, target: { type: EFFECT_TARGET.SELF } }]
      }
    ],
    canBeRefined: false
  },
  AXE_OF_VIRILITY: {
    name: "Axe of Virility",
    description: "Effective against armoured foes.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.AXE.id,
    might: 16,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 16 }), EFFECT.effectiveAgainstMoveType(MOVE_TYPE.ARMOURED.id)],
    canBeRefined: true,
    effectRefine: {
      description: "Grants Atk/Spd/Def/Res+3. After combat, deals 6 damage to unit.",
      effects: [EFFECT.visibleStats({ atk: 3, spd: 3, def: 3, res: 3 }), EFFECT.postCombatSelfDamage(6)]
    },
    refineImg: "assets/refines/Fury_W.webp"
  },
  ARTHURS_AXE: {
    name: "Arthur's Axe",
    description: "If a bonus granted by a skill like Rally or Hone is active on unit, grants Atk/Spd/Def/Res+3 during combat.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.AXE.id,
    might: 16,
    range: 1,
    effects: [
      EFFECT.visibleStats({ atk: 16 }),
      {
        phase: { type: EFFECT_PHASE.START_OF_COMBAT },
        condition: { type: EFFECT_CONDITION.BUFF_ACTIVE_ON_UNIT },
        actions: [
          { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.ATK, value: 3, target: { type: EFFECT_TARGET.SELF } },
          { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.SPD, value: 3, target: { type: EFFECT_TARGET.SELF } },
          { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.DEF, value: 3, target: { type: EFFECT_TARGET.SELF } },
          { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.RES, value: 3, target: { type: EFFECT_TARGET.SELF } }
        ]
      }
    ],
    canBeRefined: true,
    effectRefine: {
      description: "At start of combat, if【Penalty】 is active on unit or if unit's HP < 100%, grants Atk/Spd/Def/Res+5 during combat.",
      effects: [
        {
          phase: { type: EFFECT_PHASE.START_OF_COMBAT },
          condition: CONDITION.or(
            { type: EFFECT_CONDITION.PENALTY_ACTIVE_ON_UNIT },
            { type: EFFECT_CONDITION.UNIT_HP_LESS_THAN, percent: 100 }
          ),
          actions: [
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.ATK, value: 5, target: { type: EFFECT_TARGET.SELF } },
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.SPD, value: 5, target: { type: EFFECT_TARGET.SELF } },
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.DEF, value: 5, target: { type: EFFECT_TARGET.SELF } },
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.RES, value: 5, target: { type: EFFECT_TARGET.SELF } }
          ]
        }
      ]
    },
    refineImg: "assets/refines/Arthurs_Axe_W.webp"
  },
  BERUKAS_AXE: {
    name: "Beruka's Axe",
    description: "Accelerates Special trigger (cooldown count-1).",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.AXE.id,
    might: 16,
    range: 1,
    effects: [
      EFFECT.visibleStats({ atk: 16 }),
      EFFECT.slaying()
    ],
    canBeRefined: true,
    effectRefine: {
      description: "At start of combat, if unit's HP ≥ 50%, inflicts Atk-4 on foe during combat and Special cooldown charge -1 on foe per attack. (Only highest value applied. Does not stack.)",
      effects: [
        {
          phase: EFFECT_PHASE.START_OF_COMBAT,
          condition: { type: EFFECT_CONDITION.UNIT_HP_GREATER_THAN_EQUAL_TO, percent: 50 },
          actions: [
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.ATK, value: -4, target: { type: EFFECT_TARGET.FOE } },
            { type: EFFECT_ACTION.SET_COMBAT_FLAG, flag: COMBAT_FLAG.GUARD, target: { type: EFFECT_TARGET.FOE } }
          ]
        }
      ]
    },
    refineImg: "assets/refines/Berukas_Axe_W.webp"
  },
  BULL_BLADE: {
    name: "Bull Blade",
    description: "During combat, boosts unit's Atk/Def by number of allies within 2 spaces × 2. (Maximum bonus of +6 to each stat.)",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.SWORD.id,
    might: 16,
    range: 1,
    effects: [
      EFFECT.visibleStats({ atk: 16 }),
      {
        phase: EFFECT_PHASE.START_OF_COMBAT,
        actions: [
          {
            type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.ATK,
            calculation: { type: EFFECT_CALCULATION.NUMBER_OF_ALLIES_WITHIN_X_SPACES, spaces: 2, multiplier: 2, max: 6 },
            target: { type: EFFECT_TARGET.SELF }
          },
          {
            type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.DEF,
            calculation: { type: EFFECT_CALCULATION.NUMBER_OF_ALLIES_WITHIN_X_SPACES, spaces: 2, multiplier: 2, max: 6 },
            target: { type: EFFECT_TARGET.SELF }
          }
        ]
      }
    ],
    canBeRefined: true,
    effectRefine: {
      description: "If cavalry allies within 2 spaces use sword, lance, or axe and unit initiates combat, unit attacks twice.",
      effects: [
        {
          phase: EFFECT_PHASE.START_OF_COMBAT,
          condition: CONDITION.and(
            { type: EFFECT_CONDITION.UNIT_INITIATES_COMBAT },
            CONDITION.or(
              { type: EFFECT_CONDITION.UNIT_WITHIN_X_SPACES_OF_ALLY, spaces: 2, moveType: MOVE_TYPE.CAVALRY.id, weaponType: WEAPON_TYPE.SWORD.id },
              { type: EFFECT_CONDITION.UNIT_WITHIN_X_SPACES_OF_ALLY, spaces: 2, moveType: MOVE_TYPE.CAVALRY.id, weaponType: WEAPON_TYPE.LANCE.id },
              { type: EFFECT_CONDITION.UNIT_WITHIN_X_SPACES_OF_ALLY, spaces: 2, moveType: MOVE_TYPE.CAVALRY.id, weaponType: WEAPON_TYPE.AXE.id })
          ),
          actions: [{ type: EFFECT_ACTION.SET_COMBAT_FLAG, flag: COMBAT_FLAG.ATTACKS_TWICE, target: { type: EFFECT_TARGET.SELF } }]
        }
      ]
    },
    refineImg: "assets/refines/Consecutive_Attack_RG_W.webp"
  },
  CAMILLAS_AXE: {
    name: "Camilla's Axe",
    description: "If unit is within 2 spaces of a cavalry or flying ally, grants Atk/Spd+4 during combat.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.AXE.id,
    might: 16,
    range: 1,
    effects: [
      EFFECT.visibleStats({ atk: 16 }),
      {
        phase: EFFECT_PHASE.START_OF_COMBAT,
        condition: CONDITION.or(
          { type: EFFECT_CONDITION.UNIT_WITHIN_X_SPACES_OF_ALLY, spaces: 2, moveType: MOVE_TYPE.CAVALRY.id },
          { type: EFFECT_CONDITION.UNIT_WITHIN_X_SPACES_OF_ALLY, spaces: 2, moveType: MOVE_TYPE.FLIER.id }
        ),
        actions: [
          { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.ATK, value: 4, target: { type: EFFECT_TARGET.SELF } },
          { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.SPD, value: 4, target: { type: EFFECT_TARGET.SELF } }
        ]
      }
    ],
    canBeRefined: true,
    effectRefine: {
      description: "Grants Atk/Spd+3 to cavalry and flying allies within 2 spaces during combat.",
      effects: [
        {
          phase: EFFECT_PHASE.START_OF_ALLY_COMBAT,
          condition: CONDITION.or(
            { type: EFFECT_CONDITION.ALLY_IN_COMBAT_WITHIN_X_SPACES_OF_UNIT, spaces: 2, moveType: MOVE_TYPE.CAVALRY.id },
            { type: EFFECT_CONDITION.ALLY_IN_COMBAT_WITHIN_X_SPACES_OF_UNIT, spaces: 2, moveType: MOVE_TYPE.FLIER.id }
          ),
          actions: [
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.ATK, value: 3, target: { type: EFFECT_TARGET.ALLY_IN_COMBAT } },
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.SPD, value: 3, target: { type: EFFECT_TARGET.ALLY_IN_COMBAT } }
          ]
        }
      ]
    },
    refineImg: "assets/refines/Camillas_Axe_W.webp"
  },
  CORDELIAS_LANCE: {
    name: "Cordelia's Lance",
    description: "Inflicts Spd-2. If unit initiates combat, unit attacks twice.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.LANCE.id,
    might: 10,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 10, spd: -2 }), EFFECT.playerPhaseBrave()],
    canBeRefined: true,
    effectRefine: {
      description: "At start of combat, if unit's HP ≥ 70%, grants Atk/Spd+4 during combat.",
      effects: [
        {
          phase: EFFECT_PHASE.START_OF_COMBAT,
          condition: { type: EFFECT_CONDITION.UNIT_HP_GREATER_THAN_EQUAL_TO, percent: 70 },
          actions: [
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.ATK, value: 4, target: { type: EFFECT_TARGET.SELF } },
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.SPD, value: 4, target: { type: EFFECT_TARGET.SELF } }
          ]
        }
      ]
    },
    refineImg: "assets/refines/Cordelias_Lance_W.webp"
  },
  CORVUS_TOME: {
    name: "Corvus Tome",
    description: "Grants weapon-triangle advantage against colorless foes, and inflicts weapon-triangle disadvantage on colorless foes during combat.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.RED_TOME.id,
    might: 14,
    range: 2,
    effects: [EFFECT.visibleStats({ atk: 14 }), EFFECT.raven()],
    canBeRefined: true,
    effectRefine: {
      description: "At start of combat, if foe's Atk ≥ unit's Atk+3, inflicts Atk/Res-6 on foe during combat and Special cooldown charge -1 on foe per attack. (Only highest value applied. Does not stack.)",
      effects: [
        {
          phase: EFFECT_PHASE.START_OF_COMBAT,
          condition: { type: EFFECT_CONDITION.UNIT_STAT_LESS_THAN_EQUAL_TO_FOE, unitModifier: 3 },
          actions: [
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.ATK, value: -6, target: { type: EFFECT_TARGET.FOE } },
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.RES, value: -6, target: { type: EFFECT_TARGET.FOE } },
            { type: EFFECT_ACTION.SET_COMBAT_FLAG, flag: COMBAT_FLAG.GUARD, target: { type: EFFECT_TARGET.FOE } }
          ]
        }
      ]
    },
    refineImg: "assets/refines/Corvus_Tome_W.webp"
  },
  DEVIL_AXE: {
    name: "Devil Axe",
    description: "Grants Atk/Spd/Def/Res+4 during combat, but if unit attacked, deals 4 damage to unit after combat.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.AXE.id,
    might: 16,
    range: 1,
    effects: [
      EFFECT.visibleStats({ atk: 16 }),
      {
        phase: EFFECT_PHASE.START_OF_COMBAT,
        actions: [
          { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.ATK, value: 4, target: { type: EFFECT_TARGET.SELF } },
          { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.SPD, value: 4, target: { type: EFFECT_TARGET.SELF } },
          { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.DEF, value: 4, target: { type: EFFECT_TARGET.SELF } },
          { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.RES, value: 4, target: { type: EFFECT_TARGET.SELF } }
        ]
      },
      {
        phase: EFFECT_PHASE.AFTER_COMBAT,
        condition: { type: EFFECT_CONDITION.UNIT_ATTACKED_DURING_COMBAT },
        actions: [{ type: EFFECT_ACTION.DEAL_DAMAGE, value: 4, target: { type: EFFECT_TARGET.SELF } }]
      }
    ],
    canBeRefined: true,
    effectRefine: {
      description: "At start of turn, if unit's HP ≤ 75% and unit's attack triggers Special, grants Special cooldown count-1, and deals +10 damage when Special triggers.",
      effects: [
        {
          phase: EFFECT_PHASE.START_OF_TURN,
          condition: { type: EFFECT_CONDITION.UNIT_HP_LESS_THAN_EQUAL_TO, percent: 75 },
          actions: [{ type: EFFECT_ACTION.CURRENT_SPECIAL_COOLDOWN_MOD, value: -1, target: { type: EFFECT_TARGET.SELF } }]
        },
        {
          phase: EFFECT_PHASE.ON_OFFENSIVE_SPECIAL_TRIGGER,
          condition: { type: EFFECT_CONDITION.UNIT_HP_LESS_THAN_EQUAL_TO, percent: 75 },
          actions: [{ type: EFFECT_ACTION.DEAL_DAMAGE, value: 10 }]
        }
      ]
    },
    refineImg: "assets/refines/Wrath_W.webp"
  },
  DURANDAL: {
    name: "Durandal",
    description: "If unit initiates combat, grants Atk+4 during combat.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.SWORD.id,
    might: 16,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 16 }), EFFECT.playerPhaseStats({ atk: 4 })],
    canBeRefined: true,
    refinedBaseUpgrade: {
      description: "If unit initiates combat, grants Atk+6 during combat.",
      effects: [EFFECT.visibleStats({ atk: 16 }), EFFECT.playerPhaseStats({ atk: 6 })],
    },
    effectRefine: {
      description: "If unit initiates combat, grants Atk/Spd+4 during combat.",
      effects: [EFFECT.playerPhaseStats({ atk: 4, spd: 4 })]
    },
    refineImg: "assets/refines/Swift_Sparrow_W.webp"
  },
  EFFIES_LANCE: {
    name: "Effie's Lance",
    description: "At start of combat, if unit's HP ≥ 50%, grants Atk+6 during combat.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.LANCE.id,
    might: 16,
    range: 1,
    effects: [
      EFFECT.visibleStats({ atk: 16 }),
      {
        phase: EFFECT_PHASE.START_OF_COMBAT,
        condition: { type: EFFECT_CONDITION.UNIT_HP_GREATER_THAN_EQUAL_TO, percent: 50 },
        actions: [{ type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.ATK, value: 6, target: { type: EFFECT_TARGET.SELF } }]
      }
    ],
    canBeRefined: true,
    effectRefine: {
      description: "During unit's first combat in player phase or enemy phase, Inflicts Atk/Def-5 on foe and neutralizes foe's bonuses to Atk/Def (from skills like Fortify, Rally, etc.) during combat.",
      effects: [
        {
          phase: EFFECT_PHASE.START_OF_COMBAT,
          condition: { type: EFFECT_CONDITION.FIRST_COMBAT_IN_PHASE },
          actions: [
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.ATK, value: -5, target: { type: EFFECT_TARGET.FOE } },
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.DEF, value: -5, target: { type: EFFECT_TARGET.FOE } },
            { type: EFFECT_ACTION.SET_COMBAT_FLAG, flag: COMBAT_FLAG.NEUTRALIZE_SPECIFIC_BONUSES, stat: STATS.ATK, target: { type: EFFECT_TARGET.FOE } },
            { type: EFFECT_ACTION.SET_COMBAT_FLAG, flag: COMBAT_FLAG.NEUTRALIZE_SPECIFIC_BONUSES, stat: STATS.DEF, target: { type: EFFECT_TARGET.FOE } }
          ]
        }
      ]
    },
    refineImg: "assets/refines/Effies_Lance_W.webp"
  },
  ETERNAL_BREATH: {
    name: "Eternal Breath",
    description: "At start of turn, if an ally is within 2 spaces of unit, grants Atk/Spd/Def/Res+5 to unit and allies within 2 spaces for 1 turn. If foe's Range = 2, calculates damage using the lower of foe's Def or Res.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.BREATH.id,
    might: 16,
    range: 1,
    effects: [
      EFFECT.visibleStats({ atk: 16 }),
      {
        phase: EFFECT_PHASE.START_OF_PLAYER_PHASE_OR_ENEMY_PHASE,
        condition: { type: EFFECT_CONDITION.UNIT_WITHIN_X_SPACES_OF_ALLY, spaces: 2 },
        actions: [
          { type: EFFECT_ACTION.APPLY_BUFF, stat: STATS.ATK, value: 5, target: { type: EFFECT_TARGET.UNIT_AND_ALLIES_WITHIN_X_SPACES, spaces: 2 } },
          { type: EFFECT_ACTION.APPLY_BUFF, stat: STATS.SPD, value: 5, target: { type: EFFECT_TARGET.UNIT_AND_ALLIES_WITHIN_X_SPACES, spaces: 2 } },
          { type: EFFECT_ACTION.APPLY_BUFF, stat: STATS.DEF, value: 5, target: { type: EFFECT_TARGET.UNIT_AND_ALLIES_WITHIN_X_SPACES, spaces: 2 } },
          { type: EFFECT_ACTION.APPLY_BUFF, stat: STATS.RES, value: 5, target: { type: EFFECT_TARGET.UNIT_AND_ALLIES_WITHIN_X_SPACES, spaces: 2 } }
        ]
      },
      EFFECT.adaptiveVsRanged()
    ],
    canBeRefined: true,
    effectRefine: {
      description: "If【Bonus】is active on unit, inflicts Atk/Res-4 on foe and grants Special cooldown charge +1 per foe's attack during combat. (Only highest value applied. Does not stack. Special cooldown charge granted even if foe's attack deals 0 damage.)",
      effects: [
        {
          phase: EFFECT_PHASE.START_OF_COMBAT,
          condition: CONDITION.or(
            { type: EFFECT_CONDITION.BUFF_ACTIVE_ON_UNIT },
            { type: EFFECT_CONDITION.BONUS_ACTIVE_ON_UNIT }
          ),
          actions: [
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.ATK, value: -4, target: { type: EFFECT_TARGET.FOE } },
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.RES, value: -4, target: { type: EFFECT_TARGET.FOE } },
            { type: EFFECT_ACTION.SET_COMBAT_FLAG, flag: COMBAT_FLAG.SPECIAL_CHARGES_PER_FOE_ATTACK, target: { type: EFFECT_TARGET.SELF } }
          ]
        }
      ]
    },
    refineImg: "assets/refines/Eternal_Breath_W.webp"
  },
  FALCHION_AWAKENING: {
    name: "Falchion",
    description: "	Effective against dragon foes. At the start of every third turn, restores 10 HP.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.SWORD.id,
    might: 16,
    range: 1,
    effects: [
      EFFECT.visibleStats({ atk: 16 }),
      EFFECT.effectiveAgainstWeaponType(WEAPON_TYPE.RED_BREATH.id),
      EFFECT.effectiveAgainstWeaponType(WEAPON_TYPE.BLUE_BREATH.id),
      EFFECT.effectiveAgainstWeaponType(WEAPON_TYPE.GREEN_BREATH.id),
      EFFECT.effectiveAgainstWeaponType(WEAPON_TYPE.C_BREATH.id),
      {
        phase: EFFECT_PHASE.START_OF_TURN,
        condition: { type: EFFECT_CONDITION.EVERY_THIRD_TURN },
        actions: [{ type: EFFECT_ACTION.RESTORE_HP, value: 10, target: { type: EFFECT_TARGET.SELF } }]
      }
    ],
    canBeRefined: true,
    refinedBaseUpgrade: {
      description: "Effective against dragon foes. At start of odd-numbered turns, restores 10 HP.",
      effects: [
        EFFECT.visibleStats({ atk: 16 }),
        EFFECT.effectiveAgainstWeaponType(WEAPON_TYPE.RED_BREATH.id),
        EFFECT.effectiveAgainstWeaponType(WEAPON_TYPE.BLUE_BREATH.id),
        EFFECT.effectiveAgainstWeaponType(WEAPON_TYPE.GREEN_BREATH.id),
        EFFECT.effectiveAgainstWeaponType(WEAPON_TYPE.C_BREATH.id),
        {
          phase: EFFECT_PHASE.START_OF_TURN,
          condition: { type: EFFECT_CONDITION.IS_ODD_TURN },
          actions: [{ type: EFFECT_ACTION.RESTORE_HP, value: 10, target: { type: EFFECT_TARGET.SELF } }]
        }
      ]
    },
    effectRefine: {
      description: "If unit is adjacent to an ally, grants Atk/Spd/Def/Res+4 during combat.",
      effects: [
        {
          phase: EFFECT_PHASE.START_OF_COMBAT,
          condition: { type: EFFECT_CONDITION.UNIT_IS_ADJACENT_TO_ALLY },
          actions: [
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.ATK, value: 4, target: { type: EFFECT_TARGET.SELF } },
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.SPD, value: 4, target: { type: EFFECT_TARGET.SELF } },
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.DEF, value: 4, target: { type: EFFECT_TARGET.SELF } },
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.RES, value: 4, target: { type: EFFECT_TARGET.SELF } }
          ]
        }
      ]
    },
    refineImg: "assets/refines/Falchion_Awakening_W.webp"
  },
  FELICIAS_PLATE: {
    name: "Felicia's Plate",
    description: "After combat, if unit attacked, inflicts Def/Res-7 on target and foes within 2 spaces through their next actions. Calculates damage using the lower of foe's Def or Res.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.DAGGER.id,
    might: 14,
    range: 2,
    effects: [
      EFFECT.visibleStats({ atk: 14 }),
      EFFECT.dagger(7),
      {
        phase: EFFECT_PHASE.BEFORE_COMBAT,
        actions: [{ type: EFFECT_ACTION.SET_COMBAT_FLAG, flag: COMBAT_FLAG.CALCULATE_DAMAGE_USING_LOWER_OF_DEF_RES, target: { type: EFFECT_TARGET.SELF } }]
      }
    ],
    canBeRefined: true,
    effectRefine: {
      description: "If foe uses magic, grants Special cooldown charge +1 per attack. (Only highest value applied. Does not stack.)",
      effects: [
        {
          phase: EFFECT_PHASE.START_OF_COMBAT,
          conditions: CONDITION.or(
            { type: EFFECT_CONDITION.FOE_IS_WEAPON_TYPE, weaponType: WEAPON_TYPE.RED_TOME.id },
            { type: EFFECT_CONDITION.FOE_IS_WEAPON_TYPE, weaponType: WEAPON_TYPE.BLUE_TOME.id },
            { type: EFFECT_CONDITION.FOE_IS_WEAPON_TYPE, weaponType: WEAPON_TYPE.GREEN_TOME.id },
            { type: EFFECT_CONDITION.FOE_IS_WEAPON_TYPE, weaponType: WEAPON_TYPE.C_TOME.id }
          ),
          actions: [{ type: EFFECT_ACTION.SET_COMBAT_FLAG, flag: COMBAT_FLAG.SPECIAL_CHARGES_PER_ATTACK, target: { type: EFFECT_TARGET.SELF } }]
        }
      ]
    },
    refineImg: "assets/refines/Felicias_Plate_W.webp"
  },
  FLORINAS_LANCE: {
    name: "Florina's Lance",
    description: "Effective against armoured foes.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.LANCE.id,
    might: 16,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 16 }), EFFECT.effectiveAgainstMoveType(MOVE_TYPE.ARMOURED.id)],
    canBeRefined: true,
    effectRefine: {
      description: "If foe initiates combat and uses sword, lance, axe, dragonstone, or beast damage, grants Atk/Spd/Def/Res+4 during combat.",
      effects: [
        {
          phase: EFFECT_PHASE.START_OF_COMBAT,
          condition: CONDITION.and(
            { type: EFFECT_CONDITION.FOE_INITIATES_COMBAT },
            { type: EFFECT_CONDITION.FOE_HAS_X_RANGE, range: 1 }
          ),
          actions: [
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.ATK, value: 4, target: { type: EFFECT_TARGET.SELF } },
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.SPD, value: 4, target: { type: EFFECT_TARGET.SELF } },
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.DEF, value: 4, target: { type: EFFECT_TARGET.SELF } },
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.RES, value: 4, target: { type: EFFECT_TARGET.SELF } }
          ]
        }
      ]
    },
    refineImg: "assets/refines/Florinas_Lance_W.webp"
  },
  FOLKVANGR: {
    name: "Fólkvangr",
    description: "At start of turn, if unit's HP ≤ 50%, grants Atk+5 for 1 turn.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.SWORD.id,
    might: 16,
    range: 1,
    effects: [
      EFFECT.visibleStats({ atk: 16 }),
      {
        phase: EFFECT_PHASE.START_OF_TURN,
        condition: { type: EFFECT_CONDITION.UNIT_HP_LESS_THAN_EQUAL_TO, percent: 50 },
        actions: [{ type: EFFECT_ACTION.APPLY_BUFF, stat: STATS.ATK, value: 5, target: { type: EFFECT_TARGET.SELF } }]
      }
    ],
    canBeRefined: true,
    refinedBaseUpgrade: {
      description: "At start of combat, if unit's HP ≤ 80%, grants Atk/Def+7 during combat.",
      effects: [
        EFFECT.visibleStats({ atk: 16 }),
        {
          phase: EFFECT_PHASE.START_OF_COMBAT,
          condition: { type: EFFECT_CONDITION.UNIT_HP_LESS_THAN_EQUAL_TO, percent: 80 },
          actions: [
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.ATK, value: 7, target: { type: EFFECT_TARGET.SELF } },
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.DEF, value: 7, target: { type: EFFECT_TARGET.SELF } }
          ]
        }
      ]
    },
    effectRefine: {
      description: "If unit has weapon-triangle advantage, boosts Atk by 20%. If unit has weapon-triangle disadvantage, reduces Atk by 20%.",
      effects: [EFFECT.triangleAdept()]
    },
    refineImg: "assets/refines/Triangle_Adept_W.webp"
  },
  FREDERICKS_AXE: {
    name: "Frederick's Axe",
    description: "Effective against armoured foes.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.AXE.id,
    might: 16,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 16 }), EFFECT.effectiveAgainstMoveType(MOVE_TYPE.ARMOURED.id)],
    canBeRefined: true,
    effectRefine: {
      description: "If unit initiates combat, grants Atk+6 during combat.",
      effects: [
        EFFECT.playerPhaseStats({ atk: 6 })
      ]
    },
    refineImg: "assets/refines/Death_Blow_W.webp"
  },
  HANAS_KATANA: {
    name: "Hana's Katana",
    description: "Effective against armoured foes.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.SWORD.id,
    might: 16,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 16 }), EFFECT.effectiveAgainstMoveType(MOVE_TYPE.ARMOURED.id)],
    canBeRefined: true,
    effectRefine: {
      description: "If unit initiates combat, grants Atk/Spd+4 during combat.",
      effects: [EFFECT.playerPhaseStats({ atk: 4, spd: 4 })]
    },
    refineImg: "assets/refines/Swift_Sparrow_W.webp"
  },
  HEWN_LANCE: {
    name: "Hewn Lance",
    description: "Inflicts Spd-5. If unit initiates combat, unit attacks twice.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.LANCE.id,
    might: 11,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 11, spd: -5 }), EFFECT.playerPhaseBrave()],
    canBeRefined: true,
    effectRefine: {
      description: "If unit initiates combat, grants Atk/Def+4 during combat and foe cannot make a follow-up attack.",
      effects: [EFFECT.playerPhaseStats({ atk: 4, def: 4 }), EFFECT.impact()]
    },
    refineImg: "assets/refines/Hewn_Lance_W.webp"
  },
  HINOKAS_SPEAR: {
    name: "Hinoka's Spear",
    description: "If unit is within 2 spaces of a flying or infantry ally, grants Atk/Spd+4 during combat.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.LANCE.id,
    might: 16,
    range: 1,
    effects: [
      EFFECT.visibleStats({ atk: 16 }),
      {
        phase: EFFECT_PHASE.START_OF_COMBAT,
        condition: CONDITION.or(
          { type: EFFECT_CONDITION.UNIT_WITHIN_X_SPACES_OF_ALLY, spaces: 2, moveType: MOVE_TYPE.INFANTRY.id },
          { type: EFFECT_CONDITION.UNIT_WITHIN_X_SPACES_OF_ALLY, spaces: 2, moveType: MOVE_TYPE.FLIER.id }
        ),
        actions: [
          { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.ATK, value: 4, target: { type: EFFECT_TARGET.SELF } },
          { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.SPD, value: 4, target: { type: EFFECT_TARGET.SELF } }
        ]
      }
    ],
    canBeRefined: true,
    effectRefine: {
      description: "Infantry and flying allies within 2 spaces can move to a space adjacent to unit.",
      effects: [
        {
          phase: EFFECT_PHASE.CALCULATE_ALLY_MOVEMENT,
          condition: { type: EFFECT_CONDITION.MOVING_ALLY_WITHIN_X_SPACES_OF_UNIT, spaces: 2, moveType: [MOVE_TYPE.INFANTRY, MOVE_TYPE.FLIER] },
          actions: [{ type: EFFECT_ACTION.ENABLE_WARP, target: { type: EFFECT_TARGET.SPACES_WITHIN_UNIT, spaces: 1 } }]
        }
      ]
    },
    refineImg: "assets/refines/Hinokas_Spear_W.webp"
  },
  INVETERATE_AXE: {
    name: "Inveterate Axe",
    description: "At start of turn, if unit's HP ≥ 50%, inflicts Atk/Def-5 on foe on the enemy team with the lowest Spd through its next action.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.AXE.id,
    might: 16,
    range: 1,
    effects: [
      EFFECT.visibleStats({ atk: 16 }),
      {
        phase: EFFECT_PHASE.START_OF_TURN,
        condition: { type: EFFECT_CONDITION.UNIT_HP_GREATER_THAN_EQUAL_TO, percent: 50 },
        actions: [
          { type: EFFECT_ACTION.APPLY_DEBUFF, stat: STATS.ATK, value: 5, target: { type: EFFECT_TARGET.FOE_WITH_LOWEST_STAT, stat: STATS.SPD } },
          { type: EFFECT_ACTION.APPLY_DEBUFF, stat: STATS.DEF, value: 5, target: { type: EFFECT_TARGET.FOE_WITH_LOWEST_STAT, stat: STATS.SPD } }
        ]
      }
    ],
    canBeRefined: true,
    effectRefine: {
      description: "Grants Atk/Def+4 to infantry and cavalry allies within 2 spaces during combat. If unit is within 2 spaces of an infantry or cavalry ally, grants Atk/Def+4 to unit during combat.",
      effects: [
        {
          phase: EFFECT_PHASE.START_OF_ALLY_COMBAT,
          condition: CONDITION.or(
            { type: EFFECT_CONDITION.ALLY_IN_COMBAT_WITHIN_X_SPACES_OF_UNIT, spaces: 2, moveType: MOVE_TYPE.INFANTRY.id },
            { type: EFFECT_CONDITION.ALLY_IN_COMBAT_WITHIN_X_SPACES_OF_UNIT, spaces: 2, moveType: MOVE_TYPE.CAVALRY.id }
          ),
          actions: [
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.ATK, value: 4, target: { type: EFFECT_TARGET.ALLY_IN_COMBAT } },
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.DEF, value: 4, target: { type: EFFECT_TARGET.ALLY_IN_COMBAT } }
          ]
        },
        {
          phase: EFFECT_PHASE.START_OF_COMBAT,
          condition: CONDITION.or(
            { type: EFFECT_CONDITION.UNIT_WITHIN_X_SPACES_OF_ALLY, spaces: 2, moveType: MOVE_TYPE.INFANTRY.id },
            { type: EFFECT_CONDITION.UNIT_WITHIN_X_SPACES_OF_ALLY, spaces: 2, moveType: MOVE_TYPE.CAVALRY.id }
          ),
          actions: [
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.ATK, value: 4, target: { type: EFFECT_TARGET.SELF } },
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.DEF, value: 4, target: { type: EFFECT_TARGET.SELF } }
          ]
        }
      ]
    },
    refineImg: "assets/refines/Inveterate_Axe_W.webp"
  },
  IRISS_TOME: {
    name: "Iris's Tome",
    description: "Grants bonus to unit's Atk = total bonuses on unit during combat.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.GREEN_TOME.id,
    might: 14,
    range: 2,
    effects: [EFFECT.visibleStats({ atk: 14 }), EFFECT.blade()],
    canBeRefined: true,
    effectRefine: {
      description: "At start of even-numbered turns, grants Atk+6 to unit and adjacent allies for 1 turn. (Bonus granted to unit even if no allies are adjacent.)",
      effects: [
        {
          phase: EFFECT_PHASE.START_OF_TURN,
          condition: { type: EFFECT_CONDITION.IS_EVEN_TURN },
          actions: [
            { type: EFFECT_ACTION.APPLY_BUFF, stat: STATS.ATK, value: 6, target: { type: EFFECT_TARGET.SELF } },
            { type: EFFECT_ACTION.APPLY_BUFF, stat: STATS.ATK, value: 6, target: { type: EFFECT_TARGET.ALLIES_WITHIN_X_SPACES, spaces: 1 } }
          ]
        }
      ]
    },
    refineImg: "assets/refines/Even_Atk_Wave_W.webp"
  },
  NAMELESS_BLADE: {
    name: "Nameless Blade",
    description: "Accelerates Special trigger (cooldown count-1).",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.SWORD.id,
    might: 16,
    range: 1,
    effects: [
      EFFECT.visibleStats({ atk: 16 }),
      EFFECT.slaying()
    ],
    canBeRefined: true,
    effectRefine: {
      description: "Deals +10 damage when Special triggers.",
      effects: [EFFECT.damageOnSpecialTrigger(10)]
    },
    refineImg: "assets/refines/Special_Damage_W.webp"
  },
  NOATUN: {
    name: "Nóatún",
    description: "If unit's HP ≤ 40%, unit can move to a space adjacent to any ally.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.AXE.id,
    might: 16,
    range: 1,
    effects: [
      EFFECT.visibleStats({ atk: 16 }),
      {
        phase: EFFECT_PHASE.CALCULATE_OWN_MOVEMENT,
        condition: { type: EFFECT_CONDITION.UNIT_HP_LESS_THAN_EQUAL_TO, percent: 40 },
        actions: [{ type: EFFECT_ACTION.ENABLE_WARP, target: { type: EFFECT_TARGET.SPACES_WITHIN_ALLIES, warpRange: 1 } }]
      }
    ],
    canBeRefined: true,
    refinedBaseUpgrade: {
      description: "If unit's HP ≤ 50%, unit can move to a space adjacent to any ally.",
      effects: [
        EFFECT.visibleStats({ atk: 16 }),
        {
          phase: EFFECT_PHASE.CALCULATE_OWN_MOVEMENT,
          condition: { type: EFFECT_CONDITION.UNIT_HP_LESS_THAN_EQUAL_TO, percent: 50 },
          actions: [{ type: EFFECT_ACTION.ENABLE_WARP, target: { type: EFFECT_TARGET.SPACES_WITHIN_ALLIES, warpRange: 1 } }]
        }
      ]
    },
    effectRefine: {
      description: "If unit's HP ≥ 50%, unit can move to a space adjacent to any ally within 2 spaces.",
      effects: [
        {
          phase: EFFECT_PHASE.CALCULATE_OWN_MOVEMENT,
          condition: { type: EFFECT_CONDITION.UNIT_HP_GREATER_THAN_EQUAL_TO, percent: 50 },
          actions: [{ type: EFFECT_ACTION.ENABLE_WARP, target: { type: EFFECT_TARGET.SPACES_WITHIN_ALLIES, allyRange: 2, warpRange: 1 } }]
        }
      ]
    },
    refineImg: "assets/refines/Follow_W.webp"
  },
  PANTHER_LANCE: {
    name: "Panther Lance",
    description: "During combat, boosts unit's Atk/Def by number of allies within 2 spaces × 2. (Maximum bonus of +6 to each stat.)",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.LANCE.id,
    might: 16,
    range: 1,
    effects: [
      EFFECT.visibleStats({ atk: 16 }),
      {
        phase: EFFECT_PHASE.START_OF_COMBAT,
        actions: [
          {
            type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.ATK,
            calculation: { type: EFFECT_CALCULATION.NUMBER_OF_ALLIES_WITHIN_X_SPACES, spaces: 2, multiplier: 2, max: 6 },
            target: { type: EFFECT_TARGET.SELF }
          },
          {
            type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.DEF,
            calculation: { type: EFFECT_CALCULATION.NUMBER_OF_ALLIES_WITHIN_X_SPACES, spaces: 2, multiplier: 2, max: 6 },
            target: { type: EFFECT_TARGET.SELF }
          }
        ]
      }
    ],
    canBeRefined: true,
    effectRefine: {
      description: "If cavalry allies within 2 spaces use sword, lance, or axe and unit initiates combat, unit attacks twice.",
      effects: [
        {
          phase: EFFECT_PHASE.START_OF_COMBAT,
          condition: CONDITION.and(
            { type: EFFECT_CONDITION.UNIT_INITIATES_COMBAT },
            CONDITION.or(
              { type: EFFECT_CONDITION.UNIT_WITHIN_X_SPACES_OF_ALLY, spaces: 2, moveType: MOVE_TYPE.CAVALRY.id, weaponType: WEAPON_TYPE.SWORD.id },
              { type: EFFECT_CONDITION.UNIT_WITHIN_X_SPACES_OF_ALLY, spaces: 2, moveType: MOVE_TYPE.CAVALRY.id, weaponType: WEAPON_TYPE.LANCE.id },
              { type: EFFECT_CONDITION.UNIT_WITHIN_X_SPACES_OF_ALLY, spaces: 2, moveType: MOVE_TYPE.CAVALRY.id, weaponType: WEAPON_TYPE.AXE.id })
          ),
          actions: [{ type: EFFECT_ACTION.SET_COMBAT_FLAG, flag: COMBAT_FLAG.ATTACKS_TWICE, target: { type: EFFECT_TARGET.SELF } }]
        }
      ]
    },
    refineImg: "assets/refines/Consecutive_Attack_RG_W.webp"
  },
  PURIFYING_BREATH: {
    name: "Purifying Breath",
    description: "Slows Special trigger (cooldown count+1). Unit can counterattack regardless of foe's range. If foe's Range = 2, calculates damage using the lower of foe's Def or Res.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.BREATH.id,
    might: 14,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 14 }), EFFECT.reverseSlaying(), EFFECT.distantCloseCounter(), EFFECT.adaptiveVsRanged()
    ],
    canBeRefined: true,
    effectRefine: {
      description: "At start of combat, if units HP ≥ 50%, grants Atk/Spd/Def/Res+4 to unit during combat and neutralizes unit's penalties.",
      effects: [
        {
          phase: EFFECT_PHASE.START_OF_COMBAT,
          condition: { type: EFFECT_CONDITION.UNIT_HP_GREATER_THAN_EQUAL_TO, percent: 50 },
          actions: [
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.ATK, value: 4, target: { type: EFFECT_TARGET.SELF } },
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.SPD, value: 4, target: { type: EFFECT_TARGET.SELF } },
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.DEF, value: 4, target: { type: EFFECT_TARGET.SELF } },
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.RES, value: 4, target: { type: EFFECT_TARGET.SELF } },
            { type: EFFECT_ACTION.SET_COMBAT_FLAG, flag: COMBAT_FLAG.NEUTRALIZE_PENALTIES, target: { type: EFFECT_TARGET.SELF } }
          ]
        }
      ]
    },
    refineImg: "assets/refines/Purifying_Breath_W.webp"
  },
  STALWART_SWORD: {
    name: "Stalwart Sword",
    description: "If foe initiates combat, inflicts Atk-6 on foe during combat.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.SWORD.id,
    might: 16,
    range: 1,
    effects: [
      EFFECT.visibleStats({ atk: 16 }),
      {
        phase: EFFECT_PHASE.START_OF_COMBAT,
        condition: { type: EFFECT_CONDITION.FOE_INITIATES_COMBAT },
        actions: [{ type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.ATK, value: -6, target: { type: EFFECT_TARGET.FOE } }]
      }
    ],
    canBeRefined: true,
    effectRefine: {
      description: "If unit is within 2 spaces of an ally, grants Atk/Def+5 to unit and neutralizes unit's penalties to Atk/Def during combat.",
      effects: [
        {
          phase: EFFECT_PHASE.START_OF_COMBAT,
          condition: { type: EFFECT_CONDITION.UNIT_WITHIN_X_SPACES_OF_ALLY, spaces: 2 },
          actions: [
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.ATK, value: 5, target: { type: EFFECT_TARGET.SELF } },
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.DEF, value: 5, target: { type: EFFECT_TARGET.SELF } },
            { type: EFFECT_ACTION.SET_COMBAT_FLAG, flag: COMBAT_FLAG.NEUTRALIZE_SPECIFIC_PENALTIES, stat: STATS.ATK, target: { type: EFFECT_TARGET.SELF } },
            { type: EFFECT_ACTION.SET_COMBAT_FLAG, flag: COMBAT_FLAG.NEUTRALIZE_SPECIFIC_PENALTIES, stat: STATS.DEF, target: { type: EFFECT_TARGET.SELF } }
          ]
        }
      ]
    },
    refineImg: "assets/refines/Stalwart_Sword_W.webp"
  },
  TOME_OF_ORDER: {
    name: "Tome of Order",
    description: "Effective against flying foes. Grants weapon-triangle advantage against colorless foes, and inflicts weapon-triangle disadvantage on colorless foes during combat.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.GREEN_TOME.id,
    might: 14,
    range: 2,
    effects: [EFFECT.visibleStats({ atk: 14 }), EFFECT.effectiveAgainstMoveType(MOVE_TYPE.FLIER.id), EFFECT.raven()],
    canBeRefined: true,
    effectRefine: {
      description: "If unit has weapon-triangle advantage, boosts Atk by 20%. If unit has weapon-triangle disadvantage, reduces Atk by 20%.",
      effects: [EFFECT.triangleAdept()]
    },
    refineImg: "assets/refines/Triangle_Adept_W.webp"
  },
  WEIGHTED_LANCE: {
    name: "Weighted Lance",
    description: "Accelerates Special trigger (cooldown count-1).",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.LANCE.id,
    might: 16,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 16 }), EFFECT.slaying()],
    canBeRefined: true,
    effectRefine: {
      description: "At start of combat, if unit's HP ≥ 50%, grants Def/Res+4 and Special cooldown charge +1 per foe's attack during combat. (Only highest value applied. Does not stack. Special cooldown charge granted even if foe's attack deals 0 damage.)",
      effects: [
        {
          phase: EFFECT_PHASE.START_OF_COMBAT,
          condition: { type: EFFECT_CONDITION.UNIT_HP_GREATER_THAN_EQUAL_TO, percent: 50 },
          actions: [
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.DEF, value: 4, target: { type: EFFECT_TARGET.SELF } },
            { type: EFFECT_ACTION.COMBAT_STAT_MOD, stat: STATS.RES, value: 4, target: { type: EFFECT_TARGET.SELF } },
            { type: EFFECT_ACTION.SET_COMBAT_FLAG, flag: COMBAT_FLAG.SPECIAL_CHARGES_PER_FOE_ATTACK, target: { type: EFFECT_TARGET.SELF } }
          ]
        }
      ]
    },
    refineImg: "assets/refines/Weighted_Lance_W.webp"
  },
  WHITEWING_BLADE: {
    name: "Whitewing Blade",
    description: "If unit has weapon-triangle advantage, boosts Atk by 20%. If unit has weapon-triangle disadvantage, reduces Atk by 20%.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.SWORD.id,
    might: 16,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 16 }), EFFECT.triangleAdept()],
    canBeRefined: true,
    effectRefine: {
      description: "If the number of flying allies within 2 spaces ≥ 2, grants Atk/Spd/Def/Res+3 during combat, and if unit initiates combat, unit attacks twice.",
      effects: [EFFECT.whitewingStats(), EFFECT.whitewingBrave()]
    },
    refineImg: "assets/refines/Triangle_W.webp"
  },
  WHITEWING_LANCE: {
    name: "Whitewing Lance",
    description: "Accelerates Special trigger (cooldown count-1).",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.LANCE.id,
    might: 16,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 16 }), EFFECT.slaying()],
    canBeRefined: true,
    effectRefine: {
      description: "If the number of flying allies within 2 spaces ≥ 2, grants Atk/Spd/Def/Res+3 during combat, and if unit initiates combat, unit attacks twice.",
      effects: [EFFECT.whitewingStats(), EFFECT.whitewingBrave()]
    },
    refineImg: "assets/refines/Triangle_W.webp"
  },
  WHITEWING_SPEAR: {
    name: "Whitewing Spear",
    description: "Effective against armoured foes.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.LANCE.id,
    might: 16,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 16 }), EFFECT.effectiveAgainstMoveType(MOVE_TYPE.ARMOURED.id)],
    canBeRefined: true,
    effectRefine: {
      description: "If the number of flying allies within 2 spaces ≥ 2, grants Atk/Spd/Def/Res+3 during combat, and if unit initiates combat, unit attacks twice.",
      effects: [EFFECT.whitewingStats(), EFFECT.whitewingBrave()]
    },
    refineImg: "assets/refines/Triangle_W.webp"
  },
  WING_SWORD: {
    name: "Wing Sword",
    description: "Effective against armoured and cavalry foes.",
    type: SKILL_TYPE.WEAPON,
    weaponType: WEAPON_TYPE.SWORD.id,
    might: 16,
    range: 1,
    effects: [EFFECT.visibleStats({ atk: 16 }), EFFECT.effectiveAgainstMoveType(MOVE_TYPE.ARMOURED.id), EFFECT.effectiveAgainstMoveType(MOVE_TYPE.CAVALRY.id)],
    canBeRefined: true,
    effectRefine: {
      description: "If unit's Spd > foe's Spd, grants Special cooldown charge +1 per unit's attack. (Only highest value applied. Does not stack.)",
      effects: [
        {
          phase: EFFECT_PHASE.DURING_COMBAT,
          condition: { type: EFFECT_CONDITION.UNIT_STAT_GREATER_THAN_FOE, unitStat: STATS.SPD, foeStat: STATS.SPD, statType: STAT_CHECK_TYPE.IN_COMBAT },
          actions: [{ type: EFFECT_ACTION.SET_COMBAT_FLAG, flag: COMBAT_FLAG.SPECIAL_CHARGES_PER_UNIT_ATTACK, target: { type: EFFECT_TARGET.SELF } }]
        }
      ]
    },
    refineImg: "assets/refines/Flashing_Blade_W.webp"
  }
};

const WEAPON_SKILLS = { ...INHERITABLE_WEAPONS, ...EXCLUSIVE_WEAPONS }

console.log(`${Object.keys(INHERITABLE_WEAPONS).length} inheritable weapons
${Object.keys(INHERITABLE_WEAPONS).length} exclusive weapons`);

Object.entries(WEAPON_SKILLS).forEach(([key, value]) => WEAPON_SKILLS[key] = { id: key, ...value });

Object.values(WEAPON_SKILLS).forEach(weapon => {
  if (weapon.canBeRefined) {
    if (weapon.weaponType === WEAPON_TYPE.STAFF.id) {
      ["WRATHFUL", "DAZZLE"].forEach(refineType => {
        const refinedWeapon = createRefinedStaffWeapon(weapon, refineType);
        WEAPON_SKILLS[refinedWeapon.id] = refinedWeapon;
      });
      return;
    }
    ["ATK", "SPD", "DEF", "RES"].forEach(stat => {
      const refinedWeapon = createRefinedWeapon(weapon, stat);
      WEAPON_SKILLS[refinedWeapon.id] = refinedWeapon;
    });
    if (weapon.effectRefine) {
      const effectRefinedWeapon = createRefinedWeapon(weapon, "EFF");
      WEAPON_SKILLS[effectRefinedWeapon.id] = effectRefinedWeapon;
    }
  }
});

export default WEAPON_SKILLS;
