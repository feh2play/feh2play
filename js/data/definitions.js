export const STATS = {
  HP: "hp",
  ATK: "atk",
  SPD: "spd",
  DEF: "def",
  RES: "res",
}

export const TERRAIN = {
  PLAINS: 0,
  FOREST: 1,
  FLIER: 2,
  WALL: 3,
  TRENCH: 4
};

export const MOVE_TYPE = {
  INFANTRY: {
    id: "INFANTRY",
    range: 2
  },
  FLIER: {
    id: "FLIER",
    range: 2
  },
  CAVALRY: {
    id: "CAVALRY",
    range: 3
  },
  ARMOURED: {
    id: "ARMOURED",
    range: 1
  },
}

export const ENTRY = {
  HEROES: "Heroes",
  SHADOW_DRAG_NEW_MYSTERY: "Shadow Dragon / (New) Mystery",
  ECHOS: "Echoes",
  GENEALOGY: "Genealogy of the Holy War",
  THRACIA: "Thracia 776",
  BINDING_BLADE: "The Binding Blade",
  BLAZING_BLADE: "The Blazing Blade",
  SACRED_STONES: "The Sacred Stones",
  PATH_OF_RADIANCE: "Path of Radiance",
  RADIANT_DAWN: "Radiant Dawn",
  AWAKENING: "Awakening",
  FATES: "Fates",
  THREE_HOUSES: "Three Houses",
  TOKYO_MIRAGE_SESSIONS: "Tokyo Mirage Sessions #FE Encore",
  ENGAGE: "Engage"
}

export const RARITY = {
  STORY: "Story",
  GRAIL: "Grail",
  THREE_STAR: "3 Star",
  FIVE_STAR: "5 Star",
  FOUR_STAR_SEASONAL: "4 Star Seasonal",
  FIVE_STAR_SEASONAL: "5 Star Seasonal",
}

export const SKILL_TYPE = {
  WEAPON: "Weapon",
  ASSIST: "Assist",
  SPECIAL: "Special",
  A: "A",
  B: "B",
  C: "C",
  S: "S"
}

export const SPECIAL_TYPE = {
  OFFENSIVE: "OFFENSIVE",
  DEFENSIVE: "DEFENSIVE",
  AOE: "AOE",
  MIRACLE: "MIRACLE",
  GALEFORCE: "GALEFORCE",
  HEALING: "HEALING"
}

export const ASSIST_TYPE = {
  MOVEMENT: "MOVEMENT",
  HEAL: "HEAL",
  REFRESH: "REFRESH",
  RALLY: "RALLY",
  SACRIFICE: "SACRIFICE",
  RECIPROCAL_AID: "RECIPROCAL_AID",
  HARSH_COMMAND: "HARSH_COMMAND"
}

export const MOVEMENT_TYPE = {
  // assists
  SWAP: "SWAP",
  SHOVE: "SHOVE",
  SMITE: "SMITE",
  DRAW_BACK: "DRAW_BACK",
  REPOSITION: "REPOSITION",
  PIVOT: "PIVOT",
  // post combat
  HIT_AND_RUN: "HIT_AND_RUN"
}

export const COLOUR = {
  RED: "red",
  GREEN: "green",
  BLUE: "blue",
  COLOURLESS: "colourless",
}

export const WEAPON_TYPE = {
  SWORD: {
    id: "SWORD",
    type: "sword",
    colour: COLOUR.RED,
    range: 1,
    defStat: STATS.DEF,
    img: "assets/weapons/Icon_Class_Red_Sword.webp"
  },
  RED_BOW: {
    id: "RED_BOW",
    type: "bow",
    colour: COLOUR.RED,
    range: 2,
    defStat: STATS.DEF,
    img: "assets/weapons/Icon_Class_Red_Bow.webp"
  },
  RED_DAGGER: {
    id: "RED_DAGGER",
    type: "dagger",
    colour: COLOUR.RED,
    range: 2,
    defStat: STATS.DEF,
    img: "assets/weapons/Icon_Class_Red_Dagger.webp"
  },
  RED_TOME: {
    id: "RED_TOME",
    type: "tome",
    colour: COLOUR.RED,
    range: 2,
    defStat: STATS.RES,
    img: "assets/weapons/Icon_Class_Red_Tome.webp"
  },
  RED_BREATH: {
    id: "RED_BREATH",
    type: "breath",
    colour: COLOUR.RED,
    range: 1,
    defStat: STATS.RES,
    img: "assets/weapons/Icon_Class_Red_Breath.webp"
  },
  RED_BEAST: {
    id: "RED_BEAST",
    type: "beast",
    colour: COLOUR.RED,
    range: 1,
    defStat: STATS.DEF,
    img: "assets/weapons/Icon_Class_Red_Beast.webp"
  },
  LANCE: {
    id: "LANCE",
    type: "lance",
    colour: COLOUR.BLUE,
    range: 1,
    defStat: STATS.DEF,
    img: "assets/weapons/Icon_Class_Blue_Lance.webp"
  },
  BLUE_BOW: {
    id: "BLUE_BOW",
    type: "bow",
    colour: COLOUR.BLUE,
    range: 2,
    defStat: STATS.DEF,
    img: "assets/weapons/Icon_Class_Blue_Bow.webp"
  },
  BLUE_DAGGER: {
    id: "BLUE_DAGGER",
    type: "dagger",
    colour: COLOUR.BLUE,
    range: 2,
    defStat: STATS.DEF,
    img: "assets/weapons/Icon_Class_Blue_Dagger.webp"
  },
  BLUE_TOME: {
    id: "BLUE_TOME",
    type: "tome",
    colour: COLOUR.BLUE,
    range: 2,
    defStat: STATS.RES,
    img: "assets/weapons/Icon_Class_Blue_Tome.webp"
  },
  BLUE_BREATH: {
    id: "BLUE_BREATH",
    type: "breath",
    colour: COLOUR.BLUE,
    range: 1,
    defStat: STATS.RES,
    img: "assets/weapons/Icon_Class_Blue_Breath.webp"
  },
  BLUE_BEAST: {
    id: "BLUE_BEAST",
    type: "beast",
    colour: COLOUR.BLUE,
    range: 1,
    defStat: STATS.DEF,
    img: "assets/weapons/Icon_Class_Blue_Beast.webp"
  },
  AXE: {
    id: "AXE",
    type: "axe",
    colour: COLOUR.GREEN,
    range: 1,
    defStat: STATS.DEF,
    img: "assets/weapons/Icon_Class_Green_Axe.webp"
  },
  GREEN_BOW: {
    id: "GREEN_BOW",
    type: "bow",
    colour: COLOUR.GREEN,
    range: 2,
    defStat: STATS.DEF,
    img: "assets/weapons/Icon_Class_Green_Bow.webp"
  },
  GREEN_DAGGER: {
    id: "GREEN_DAGGER",
    type: "dagger",
    colour: COLOUR.GREEN,
    range: 2,
    defStat: STATS.DEF,
    img: "assets/weapons/Icon_Class_Green_Dagger.webp"
  },
  GREEN_TOME: {
    id: "GREEN_TOME",
    type: "tome",
    colour: COLOUR.GREEN,
    range: 2,
    defStat: STATS.RES,
    img: "assets/weapons/Icon_Class_Green_Tome.webp"
  },
  GREEN_BREATH: {
    id: "GREEN_BREATH",
    type: "breath",
    colour: COLOUR.GREEN,
    range: 1,
    defStat: STATS.RES,
    img: "assets/weapons/Icon_Class_Green_Breath.webp"
  },
  GREEN_BEAST: {
    id: "GREEN_BEAST",
    type: "beast",
    colour: COLOUR.GREEN,
    range: 1,
    defStat: STATS.DEF,
    img: "assets/weapons/Icon_Class_Green_Beast.webp"
  },
  STAFF: {
    id: "STAFF",
    type: "staff",
    colour: COLOUR.COLOURLESS,
    range: 2,
    defStat: STATS.RES,
    img: "assets/weapons/Icon_Class_Colorless_Staff.webp"
  },
  C_BOW: {
    id: "C_BOW",
    type: "bow",
    colour: COLOUR.COLOURLESS,
    range: 2,
    defStat: STATS.DEF,
    img: "assets/weapons/Icon_Class_Colorless_Bow.webp"
  },
  C_DAGGER: {
    id: "C_DAGGER",
    type: "dagger",
    colour: COLOUR.COLOURLESS,
    range: 2,
    defStat: STATS.DEF,
    img: "assets/weapons/Icon_Class_Colorless_Dagger.webp"
  },
  C_TOME: {
    id: "C_TOME",
    type: "tome",
    colour: COLOUR.COLOURLESS,
    range: 2,
    defStat: STATS.RES,
    img: "assets/weapons/Icon_Class_Colorless_Tome.webp"
  },
  C_BREATH: {
    id: "C_BREATH",
    type: "breath",
    colour: COLOUR.COLOURLESS,
    range: 1,
    defStat: STATS.RES,
    img: "assets/weapons/Icon_Class_Colorless_Breath.webp"
  },
  C_BEAST: {
    id: "C_BEAST",
    type: "beast",
    colour: COLOUR.COLOURLESS,
    range: 1,
    defStat: STATS.DEF,
    img: "assets/weapons/Icon_Class_Colorless_Beast.webp"
  },
  BOW: {
    id: "BOW",
    type: "bow",
    range: 2,
    defStat: STATS.DEF,
    img: "assets/weapons/Icon_Type_Bow.webp"
  },
  DAGGER: {
    id: "DAGGER",
    type: "dagger",
    range: 2,
    defStat: STATS.DEF,
    img: "assets/weapons/Icon_Type_Dagger.webp"
  },
  BREATH: {
    id: "BREATH",
    type: "breath",
    range: 1,
    defStat: STATS.RES,
    img: "assets/weapons/Icon_Type_Dragonstone.webp"
  },
  BEAST: {
    id: "BEAST",
    type: "beast",
    range: 1,
    defStat: STATS.DEF,
    img: "assets/weapons/Icon_Type_Beast.webp"
  },
}

export const STATUS_TYPE = {
  POSITIVE: "POSITIVE",
  NEGATIVE: "NEGATIVE"
}

export const EFFECT_PHASE = {
  // field phases
  START_OF_TURN: "START_OF_TURN", // means at the start of your phase
  START_OF_ENEMY_PHASE: "START_OF_ENEMY_PHASE",
  START_OF_PLAYER_PHASE_OR_ENEMY_PHASE: "START_OF_PLAYER_PHASE_OR_ENEMY_PHASE",
  AFTER_START_OF_TURN: "AFTER_START_OF_TURN",
  CALCULATE_OWN_MOVEMENT: "CALCULATE_OWN_MOVEMENT",
  CALCULATE_ALLY_MOVEMENT: "CALCULATE_ALLY_MOVEMENT",
  CALCULATE_ENEMY_MOVEMENT: "CALCULATE_ENEMY_MOVEMENT",
  USED_MOVEMENT_ASSIST: "USED_MOVEMENT_ASSIST",
  USED_RALLY_ASSIST: "USED_RALLY_ASSIST",
  USED_DANCE: "USED_DANCE",
  USED_HEAL: "USED_HEAL",
  TARGETTED_BY_MOVEMENT_ASSIST: "TARGETTED_BY_MOVEMENT_ASSIST",
  TARGETTED_BY_RALLY_ASSIST: "TARGETTED_BY_RALLY_ASSIST",
  // combat phases
  BEFORE_COMBAT: "BEFORE_COMBAT", // effects that are always active / need to be active for aoes
  AS_COMBAT_BEGINS: "AS_COMBAT_BEGINS", // unused for now... cheat damage, bol4...
  AS_ALLY_COMBAT_BEGINS: "AS_ALLY_COMBAT_BEGINS",
  START_OF_COMBAT: "START_OF_COMBAT", // effects only active during combat, anything that gives temp stats should be here
  START_OF_ALLY_COMBAT: "START_OF_ALLY_COMBAT",
  DURING_COMBAT: "DURING_COMBAT", // use this if there is dependency on temp stats / other flags, should not add temp stats (exception: Guardian's bow)
  DURING_ALLY_COMBAT: "DURING_ALLY_COMBAT",
  DURING_COMBAT_2: "DURING_COMBAT_2",
  ON_OFFENSIVE_SPECIAL_TRIGGER: "ON_OFFENSIVE_SPECIAL_TRIGGER",
  ON_DEFENSIVE_SPECIAL_TRIGGER: "ON_DEFENSIVE_SPECIAL_TRIGGER",
  ON_HEALING_SPECIAL_TRIGGER: "ON_HEALING_SPECIAL_TRIGGER",
  AFTER_COMBAT_BEFORE_DEATH: "AFTER_COMBAT_BEFORE_DEATH",
  AFTER_COMBAT: "AFTER_COMBAT",
  AFTER_ALLY_COMBAT: "AFTER_ALLY_COMBAT",
  AFTER_COMBAT_DISPLACEMENT: "AFTER_COMBAT_DISPLACEMENT",
  // outside of battle
  ON_EQUIP: "ON_EQUIP"
}

export const EFFECT_CONDITION = {
  IS_TURN_COUNT: "IS_TURN_COUNT",
  IS_ODD_TURN: "IS_ODD_TURN",
  IS_EVEN_TURN: "IS_EVEN_TURN",
  EVERY_THIRD_TURN: "EVERY_THIRD_TURN",
  UNIT_INITIATES_COMBAT: "UNIT_INITIATES_COMBAT",
  FOE_INITIATES_COMBAT: "FOE_INITIATES_COMBAT",
  UNIT_HP_GREATER_THAN: "UNIT_HP_GREATER_THAN",
  UNIT_HP_GREATER_THAN_EQUAL_TO: "UNIT_HP_GREATER_THAN_EQUAL_TO",
  UNIT_HP_LESS_THAN: "UNIT_HP_LESS_THAN",
  UNIT_HP_LESS_THAN_EQUAL_TO: "UNIT_HP_LESS_THAN_EQUAL_TO",
  UNIT_HP_IS_MAX_HP: "UNIT_HP_IS_MAX_HP",
  FOE_HP_GREATER_THAN: "FOE_HP_GREATER_THAN",
  FOE_HP_GREATER_THAN_EQUAL_TO: "FOE_HP_GREATER_THAN_EQUAL_TO",
  FOE_HP_LESS_THAN: "FOE_HP_LESS_THAN",
  FOE_HP_LESS_THAN_EQUAL_TO: "FOE_HP_LESS_THAN_EQUAL_TO",
  FOE_HP_IS_MAX_HP: "FOE_HP_IS_MAX_HP",
  UNIT_STAT_GREATER_THAN_FOE: "UNIT_STAT_GREATER_THAN_FOE",
  UNIT_STAT_GREATER_THAN_EQUAL_TO_FOE: "UNIT_STAT_GREATER_THAN_EQUAL_TO_FOE",
  UNIT_STAT_LESS_THAN_FOE: "UNIT_STAT_LESS_THAN_FOE",
  UNIT_STAT_LESS_THAN_EQUAL_TO_FOE: "UNIT_STAT_LESS_THAN_EQUAL_TO_FOE",
  UNIT_STAT_GREATER_THAN_ALLY: "UNIT_STAT_GREATER_THAN_ALLY",
  BUFF_ACTIVE_ON_UNIT: "BUFF_ACTIVE_ON_UNIT",
  DEBUFF_ACTIVE_ON_UNIT: "DEBUFF_ACTIVE_ON_UNIT",
  BONUS_ACTIVE_ON_UNIT: "BONUS_ACTIVE_ON_UNIT",
  PENALTY_ACTIVE_ON_UNIT: "PENALTY_ACTIVE_ON_UNIT",
  UNIT_IS_ADJACENT_TO_ALLY: "UNIT_IS_ADJACENT_TO_ALLY",
  UNIT_NOT_ADJACENT_TO_ALLY: "UNIT_NOT_ADJACENT_TO_ALLY",
  UNIT_WITHIN_X_SPACES_OF_ALLY: "UNIT_WITHIN_X_SPACES_OF_ALLY",
  ALLY_IN_COMBAT_WITHIN_X_SPACES_OF_UNIT: "ALLY_IN_COMBAT_WITHIN_X_SPACES_OF_UNIT",
  MOVING_ALLY_WITHIN_X_SPACES_OF_UNIT: "MOVING_ALLY_WITHIN_X_SPACES_OF_UNIT",
  FOE_IS_MOVE_TYPE: "FOE_IS_MOVE_TYPE",
  FOE_IS_WEAPON_TYPE: "FOE_IS_WEAPON_TYPE",
  FOE_CAN_COUNTER: "FOE_CAN_COUNTER",
  FOE_HAS_X_RANGE: "FOE_HAS_X_RANGE",
  UNIT_ATTACKED_DURING_COMBAT: "UNIT_ATTACKED_DURING_COMBAT",
  FOES_ATTACK_CAN_TRIGGER_UNITS_SPECIAL: "FOES_ATTACK_CAN_TRIGGER_UNITS_SPECIAL",
  FIRST_COMBAT_IN_PHASE: "FIRST_COMBAT_IN_PHASE"
}

export const EFFECT_ACTION = {
  // process on equip
  EQUIP_STAT_MOD: "EQUIP_STAT_MOD",
  MAX_SPECIAL_COOLDOWN_MOD: "MAX_SPECIAL_COOLDOWN_MOD",
  PHANTOM_STAT: "PHANTOM_STAT",
  // some of these are used both during and outside of combat
  CURRENT_SPECIAL_COOLDOWN_MOD: "CURRENT_SPECIAL_COOLDOWN_MOD",
  COMBAT_STAT_MOD: "COMBAT_STAT_MOD",
  SET_COMBAT_FLAG: "SET_COMBAT_FLAG",
  DEAL_DAMAGE: "DEAL_DAMAGE",
  RESTORE_HP: "RESTORE_HP",
  APPLY_BUFF: "APPLY_BUFF",
  APPLY_DEBUFF: "APPLY_DEBUFF",
  APPLY_STATUS: "APPLY_STATUS",
  DAMAGE_REDUCTION: "DAMAGE_REDUCTION",
  REDUCE_DEF_RES_BY: "REDUCE_DEF_RES_BY",
  BASE_DAMAGE_INCREASE: "BASE_DAMAGE_INCREASE",
  // movement related
  MOVE_EXTRA_SPACES: "MOVE_EXTRA_SPACES",
  SET_MOVEMENT_FLAG: "SET_MOVEMENT_FLAG",
  OBSTRUCT_TILES: "OBSTRUCT_TILES",
  ENABLE_WARP: "ENABLE_WARP",
  POST_COMBAT_MOVEMENT: "POST_COMBAT_MOVEMENT"
}

export const EFFECT_TARGET = {
  SELF: "SELF",
  FOE: "FOE",
  ALL_ALLIES: "ALL_ALLIES",
  ALL_FOES: "ALL_FOES",
  ALLY_IN_COMBAT: "ALLY_IN_COMBAT",
  FOE_IN_COMBAT: "FOE_IN_COMBAT",
  FOE_POST_COMBAT: "FOE_POST_COMBAT",
  UNIT_AND_ALLIES_WITHIN_X_SPACES: "UNIT_AND_ALLIES_WITHIN_X_SPACES",
  ALLIES_WITHIN_X_SPACES: "ALLIES_WITHIN_X_SPACES",
  FOES_WITHIN_X_SPACES: "FOES_WITHIN_X_SPACES",
  FOES_WITHIN_X_SPACES_OF_FOE: "FOES_WITHIN_X_SPACES_OF_FOE",
  FOE_AND_FOES_WITHIN_X_SPACES_OF_FOE: "FOE_AND_FOES_WITHIN_X_SPACES_OF_FOE",
  FOES_IN_CARDINAL_DIRECTIONS: "FOES_IN_CARDINAL_DIRECTIONS",
  FOE_WITH_HIGHEST_STAT: "FOE_WITH_HIGHEST_STAT",
  FOE_WITH_LOWEST_STAT: "FOE_WITH_LOWEST_STAT",
  ASSIST_USER: "ASSIST_USER",
  ASSIST_TARGET: "ASSIST_TARGET",
  SPACES_WITHIN_UNIT: "SPACES_WITHIN_UNIT",
  SPACES_WITHIN_ALLIES: "SPACES_WITHIN_ALLIES"
}

export const EFFECT_CALCULATION = {
  TOTAL_BONUSES_ON_UNIT: "TOTAL_BONUSES_ON_UNIT",
  PERCENT_DAMAGE_DEALT: "PERCENT_DAMAGE_DEALT",
  PERCENT_OF_STAT: "PERCENT_OF_STAT",
  NUMBER_OF_ALLIES_WITHIN_X_SPACES: "NUMBER_OF_ALLIES_WITHIN_X_SPACES",
  // currently only used by heals
  VALUE: "VALUE",
  LOW_HP_BOOST: "LOW_HP_BOOST",
  MISSING_HP: "MISSING_HP",
  HP_RESTORED_TO_TARGET: "HP_RESTORED_TO_TARGET"
}

export const STAT_CHECK_TYPE = {
  VISIBLE: "VISIBLE",
  IN_COMBAT: "IN_COMBAT"
}

export const COMBAT_FLAG = {
  NEUTRALIZE_PENALTIES: "NEUTRALIZE_PENALTIES",
  NEUTRALIZE_BONUSES: "NEUTRALIZE_BONUSES",
  NEUTRALIZE_SPECIFIC_PENALTIES: "NEUTRALIZE_SPECIFIC_PENALTIES",
  NEUTRALIZE_SPECIFIC_BONUSES: "NEUTRALIZE_SPECIFIC_BONUSES",
  PANIC: "PANIC",
  CAN_COUNTERATTACK_REGARDLESS_OF_FOES_RANGE: "CAN_COUNTERATTACK_REGARDLESS_OF_FOES_RANGE",
  CANT_COUNTERATTACK: "CANT_COUNTERATTACK",
  ATTACKS_TWICE: "ATTACKS_TWICE",
  GUARANTEED_FOLLOW_UP: "GUARANTEED_FOLLOW_UP",
  CANT_FOLLOW_UP: "CANT_FOLLOW_UP",
  EFFECTIVE_AGAINST_MOVE_TYPE: "EFFECTIVE_AGAINST_MOVE_TYPE",
  EFFECTIVE_AGAINST_WEAPON_TYPE: "EFFECTIVE_AGAINST_WEAPON_TYPE",
  NEUTRALIZE_EFFECTIVE_AGAINST_MOVE_TYPE: "NEUTRALIZE_EFFECTIVE_DAMAGE_AGAINST_MOVE_TYPE",
  NEUTRALIZE_EFFECTIVE_AGAINST_WEAPON_TYPE: "NEUTRALIZE_EFFECTIVE_DAMAGE_AGAINST_WEAPON_TYPE",
  CALCULATE_DAMAGE_USING_LOWER_OF_DEF_RES: "CALCULATE_DAMAGE_USING_LOWER_OF_DEF_RES",
  SPECIAL_CHARGES_PER_ATTACK: "SPECIAL_CHARGES_PER_ATTACK",
  SPECIAL_CHARGES_PER_UNIT_ATTACK: "SPECIAL_CHARGES_PER_UNIT_ATTACK",
  SPECIAL_CHARGES_PER_FOE_ATTACK: "SPECIAL_ACCELERATION_PER_FOE_ATTACK",
  GUARD: "GUARD",
  DESPERATION: "DESPERATION",
  VANTAGE: "VANTAGE",
  HARDY_BEARING: "HARDY_BEARING",
  TRIANGLE_ADEPT: "TRIANGLE_ADEPT",
  CANCEL_AFFINITY: "CANCEL_AFFINITY",
  WTA_VS_COLOURLESS: "WTA_VS_COLOURLESS",
  WRATHFUL: "WRATHFUL",
  PERCENT_HEALING_ON_HIT: "PERCENT_HEALING_ON_HIT",
  CONSECUTIVE_HIT_DAMAGE_REDUCTION: "CONSECUTIVE_HIT_DAMAGE_REDUCTION"
}

export const MOVEMENT_FLAG = {
  PASS: "PASS",
  RESTRICT_MOVEMENT: "RESTRICT_MOVEMENT"
}

export const CONDITION_OPERATOR = {
  AND: "AND",
  OR: "OR"
}
